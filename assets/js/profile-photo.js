// Choose photographs using the visitor's clock and an approximate IANA country.
(() => {
  const image = document.querySelector("[data-profile-photo]");
  const settingsElement = document.getElementById("profile-photo-settings");
  if (!image || !settingsElement) return;

  const settings = JSON.parse(settingsElement.textContent);
  const holiday_image = settings.holiday_image;
  const night_image = settings.night_image;
  const lunch_hours_image = settings.lunch_hours_image;
  const formal_image = settings.formal_image;
  let calendar = null;
  let timer;

  function inferredCountry() {
    try {
      const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      return calendar?.timezones?.[zone] ?? null;
    } catch {
      return null;
    }
  }

  function localDate(date) {
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${date.getFullYear()}-${month}-${day}`;
  }

  function lunchWindow(country) {
    const windows = settings.lunch_hours;
    const window = windows.countries?.[country] ?? windows.default;
    const minutes = (value) => {
      if (typeof value !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
        return NaN;
      }
      const [hour, minute] = value.split(":").map(Number);
      return hour * 60 + minute;
    };
    const start = minutes(window.start);
    const end = minutes(window.end);
    // Preserve the requested night schedule if an override is invalid.
    return start >= 360 && end <= 1080 && start < end ? [start, end] : [720, 900];
  }

  function selectedImage(date) {
    const country = inferredCountry();
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const isPublicHoliday = calendar?.holidays?.[country]?.includes(localDate(date));
    if (isWeekend || isPublicHoliday) return holiday_image;

    const minutes = date.getHours() * 60 + date.getMinutes();
    if (minutes < 360 || minutes >= 1080) return night_image;
    const [lunchStart, lunchEnd] = lunchWindow(country);
    if (minutes >= lunchStart && minutes < lunchEnd) return lunch_hours_image;
    return formal_image;
  }

  function refresh() {
    clearTimeout(timer);
    if (document.hidden) return;
    const now = new Date();
    const selected = selectedImage(now);
    if (image.getAttribute("src") !== selected) image.setAttribute("src", selected);
    // Recheck exactly at the next minute, including date and timezone changes.
    timer = setTimeout(refresh, 60000 - now.getSeconds() * 1000 - now.getMilliseconds());
  }

  document.addEventListener("visibilitychange", refresh);
  window.addEventListener("pageshow", refresh);
  window.addEventListener("focus", refresh);
  refresh();

  // This is a same-site static file; no geolocation or third-party API is used.
  fetch(settings.calendar_url)
    .then((response) => {
      if (!response.ok) throw new Error("Calendar unavailable");
      return response.json();
    })
    .then((data) => {
      if (data && typeof data.timezones === "object" && typeof data.holidays === "object") {
        calendar = data;
        refresh();
      }
    })
    .catch(() => {
      // Keep the local-clock and Saturday/Sunday schedule if data is unavailable.
    });
})();
