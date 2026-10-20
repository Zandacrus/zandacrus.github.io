const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { test } = require('node:test');
const vm = require('node:vm');

const root = resolve(__dirname, '..');
const source = readFileSync(resolve(root, 'assets/js/profile-photo.js'), 'utf8');
const calendar = JSON.parse(readFileSync(resolve(root, 'assets/data/profile-calendar.json'), 'utf8'));
// Fixed dates keep scheduling tests stable as the generated calendar rolls forward.
const fixture = { ...calendar, holidays: { IN: ['2026-01-26'], US: ['2026-07-03'] } };
const html = readFileSync(resolve(root, '_site/index.html'), 'utf8');
const rendered = JSON.parse(html.match(/<script type="application\/json" id="profile-photo-settings">([\s\S]*?)<\/script>/)[1]);
const paths = Object.fromEntries(Object.entries(rendered).filter(([key]) => key.endsWith('_image')));
const local = (year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0) =>
  new Date(year, month - 1, day, hour, minute, second, millisecond);

function browser(initial, { zone = 'Asia/Kolkata', data = fixture, failFetch = false, countries = rendered.lunch_hours.countries } = {}) {
  let now = initial;
  let src = paths.formal_image;
  let nextId = 0;
  const pending = new Map();
  const events = {};
  const requests = [];
  const settings = {
    ...paths,
    calendar_url: '/assets/data/profile-calendar.json',
    lunch_hours: { default: { start: '12:00', end: '15:00' }, countries },
  };
  const document = {
    hidden: false,
    querySelector: () => ({ getAttribute: () => src, setAttribute: (_, value) => { src = value; } }),
    getElementById: () => ({ textContent: JSON.stringify(settings) }),
    addEventListener: (event, callback) => { events[event] = callback; },
  };
  class Clock extends Date {
    constructor(...args) { super(...(args.length ? args : [now.getTime()])); }
  }
  vm.runInNewContext(source, {
    document,
    window: { addEventListener: (event, callback) => { events[event] = callback; } },
    Date: Clock,
    Intl: { DateTimeFormat: () => ({ resolvedOptions: () => ({ timeZone: zone }) }) },
    setTimeout: (callback, delay) => {
      const id = ++nextId;
      pending.set(id, { callback, delay });
      return id;
    },
    clearTimeout: (id) => { pending.delete(id); },
    fetch: async (url) => {
      requests.push(url);
      if (failFetch) throw new Error('Offline');
      return { ok: true, json: async () => data };
    },
  });
  return {
    get image() { return src; },
    document, pending, requests,
    ready: () => new Promise((resolve) => setImmediate(resolve)),
    at(date, event = 'focus') { now = date; events[event](); },
    tick(date) {
      now = date;
      const [id, timer] = pending.entries().next().value;
      pending.delete(id);
      timer.callback();
    },
  };
}

test('weekday boundaries honor 06:00, 12:00, 15:00 and 18:00 exactly', async () => {
  const view = browser(local(2026, 10, 19), { zone: 'Etc/UTC' });
  await view.ready();
  for (const [hour, minute, expected] of [
    [0, 0, 'night_image'], [5, 59, 'night_image'], [6, 0, 'formal_image'],
    [11, 59, 'formal_image'], [12, 0, 'lunch_hours_image'], [14, 59, 'lunch_hours_image'],
    [15, 0, 'formal_image'], [17, 59, 'formal_image'], [18, 0, 'night_image'], [23, 59, 'night_image'],
  ]) {
    view.at(local(2026, 10, 19, hour, minute));
    assert.equal(view.image, paths[expected], `${hour}:${minute}`);
  }
});

test('Saturday and Sunday override every hour, including night and lunch', async () => {
  const view = browser(local(2026, 10, 17), { failFetch: true });
  await view.ready();
  for (const day of [17, 18]) {
    for (let hour = 0; hour < 24; hour++) {
      view.at(local(2026, 10, day, hour));
      assert.equal(view.image, paths.holiday_image);
    }
  }
});

test('national holidays override every hour for an inferred country', async () => {
  const view = browser(local(2026, 1, 26));
  await view.ready();
  for (let hour = 0; hour < 24; hour++) {
    view.at(local(2026, 1, 26, hour, 30));
    assert.equal(view.image, paths.holiday_image);
  }
  // Adjacent local dates must not inherit a holiday because of their UTC date.
  view.at(local(2026, 1, 27, 0, 30));
  assert.equal(view.image, paths.night_image);
});

test('IANA legacy aliases resolve to the same country', async () => {
  assert.equal(calendar.timezones['Asia/Calcutta'], 'IN');
  const view = browser(local(2026, 1, 26, 12), { zone: 'Asia/Calcutta' });
  await view.ready();
  assert.equal(view.image, paths.holiday_image);
});

test('observed public holidays are included', async () => {
  const view = browser(local(2026, 7, 3, 10), { zone: 'America/New_York' });
  await view.ready();
  assert.equal(view.image, paths.holiday_image);
});

test('UTC, unknown zones, unavailable data, and failed requests retain clock rules', async () => {
  for (const options of [
    { zone: 'Etc/UTC' }, { zone: 'Unknown/Zone' }, { failFetch: true }, { data: null },
    { data: { timezones: {}, holidays: {} } },
  ]) {
    const view = browser(local(2026, 1, 26, 12), options);
    await view.ready();
    assert.equal(view.image, paths.lunch_hours_image);
  }
});

test('country-specific lunch windows override the default and retain night priority', async () => {
  const view = browser(local(2026, 10, 19), {
    countries: { IN: { start: '13:30', end: '16:00' } },
    data: { timezones: { 'Asia/Kolkata': 'IN' }, holidays: {} },
  });
  await view.ready();
  for (const [hour, minute, expected] of [
    [12, 0, 'formal_image'], [13, 29, 'formal_image'], [13, 30, 'lunch_hours_image'],
    [15, 59, 'lunch_hours_image'], [16, 0, 'formal_image'], [18, 0, 'night_image'],
  ]) {
    view.at(local(2026, 10, 19, hour, minute));
    assert.equal(view.image, paths[expected]);
  }
});

test('invalid lunch overrides safely use 12:00–15:00', async () => {
  for (const window of [
    { start: '25:00', end: '26:00' }, { start: '14:00', end: '12:00' },
    { start: '17:00', end: '19:00' }, { start: 'invalid', end: '14:00' },
  ]) {
    const view = browser(local(2026, 10, 19, 12), {
      countries: { IN: window }, data: { timezones: { 'Asia/Kolkata': 'IN' }, holidays: {} },
    });
    await view.ready();
    assert.equal(view.image, paths.lunch_hours_image);
  }
});

test('an open page switches at boundaries and across weekend midnight', async () => {
  const view = browser(local(2026, 10, 16, 17, 59, 59, 500), { failFetch: true });
  await view.ready();
  assert.equal(view.image, paths.formal_image);
  assert.equal(view.pending.size, 1);
  assert.equal([...view.pending.values()][0].delay, 500);
  view.tick(local(2026, 10, 16, 18));
  assert.equal(view.image, paths.night_image);
  view.tick(local(2026, 10, 17));
  assert.equal(view.image, paths.holiday_image);
  view.tick(local(2026, 10, 19));
  assert.equal(view.image, paths.night_image);
});

test('hidden tabs resume with the current local time without duplicate timers', async () => {
  const view = browser(local(2026, 10, 19, 11), { failFetch: true });
  await view.ready();
  view.document.hidden = true;
  view.at(local(2026, 10, 19, 12), 'visibilitychange');
  assert.equal(view.pending.size, 0);
  view.document.hidden = false;
  view.at(local(2026, 10, 19, 13), 'visibilitychange');
  assert.equal(view.image, paths.lunch_hours_image);
  view.at(local(2026, 10, 19, 18), 'pageshow');
  assert.equal(view.image, paths.night_image);
  assert.equal(view.pending.size, 1);
  assert.deepEqual(view.requests, ['/assets/data/profile-calendar.json']);
});

test('all 50 published country lunch windows switch correctly at both boundaries', async () => {
  const countries = rendered.lunch_hours.countries;
  assert.equal(Object.keys(countries).length, 50);
  for (const [country, window] of Object.entries(countries)) {
    assert.ok(Object.values(calendar.timezones).includes(country), country);
    const [startHour, startMinute] = window.start.split(':').map(Number);
    const [endHour, endMinute] = window.end.split(':').map(Number);
    assert.ok(startHour * 60 + startMinute < endHour * 60 + endMinute, country);
    const view = browser(local(2026, 10, 19), {
      zone: 'Test/Zone', data: { timezones: { 'Test/Zone': country }, holidays: {} },
    });
    await view.ready();
    view.at(local(2026, 10, 19, startHour, startMinute - 1));
    assert.equal(view.image, paths.formal_image, `${country} before lunch`);
    view.at(local(2026, 10, 19, startHour, startMinute));
    assert.equal(view.image, paths.lunch_hours_image, `${country} start`);
    view.at(local(2026, 10, 19, endHour, endMinute - 1));
    assert.equal(view.image, paths.lunch_hours_image, `${country} before end`);
    view.at(local(2026, 10, 19, endHour, endMinute));
    assert.equal(view.image, paths.formal_image, `${country} end`);
  }
});

test('published calendars contain distinct local dates within the three generated years', () => {
  assert.equal(calendar.years.length, 3);
  assert.equal(calendar.timezones.UTC, undefined);
  assert.equal(calendar.timezones['Etc/UTC'], undefined);
  for (const dates of Object.values(calendar.holidays)) {
    assert.equal(dates.length, new Set(dates).size);
    for (const date of dates) {
      assert.match(date, /^\d{4}-\d{2}-\d{2}$/);
      assert.ok(calendar.years.includes(Number(date.slice(0, 4))));
    }
  }
});
