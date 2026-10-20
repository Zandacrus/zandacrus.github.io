# Arkanil Paul's personal website

A GitHub Pages site based on [Academic Pages](https://github.com/academicpages/academicpages.github.io), retaining its Jekyll layouts, profile sidebar, responsive navigation, and light/dark themes.

Live address after deployment: **https://zandacrus.github.io/**

## Content

- `_pages/about.md`: introduction, research interests, and contact.
- `_pages/research.md`: five research experiences.
- `_pages/landslide-mapping.md`: dissertation methods, results, map, and limitations.
- `_pages/projects.md` and `_pages/project-*.md`: six projects and contribution details.
- `_pages/cv.md`: web CV; `files/Arkanil_Paul_CV.pdf`: downloadable original CV.
- `_config.yml`: identity, profile links, site URL, and build configuration.
- `_data/navigation.yml`: main navigation.
- `assets/css/custom.css`: small visual and accessibility refinements.

Content was prepared from `Arkanil_Paul_CV.pdf` and `detailed-experience-and-projects.md`, supplied by Arkanil Paul in October 2026. The map is from the supplied dissertation materials. Planned research, small-sample results, approximate estimates, and unfinished team work retain their qualifications. No publication, teaching, or blog placeholders are published.

The sidebar selects a photograph using the visitor's local clock. Profile photographs are stored in `files/profile_pics/` with matching filenames in the local source project's `profile_pics/` folder:

- `yellow-jacket-sunglasses.jpg`: yellow jacket and sunglasses, seated outdoors.
- `yellow-jacket-snow-selfie.jpg`: yellow hood and scarf, snowy background.
- `black-suit-outdoors.jpg`: black suit and glasses, standing outdoors.
- `suit-red-tie-headshot.jpg`: formal portrait with a red tie and white background.

The image variables and paths are in `_data/profile_photos.yml`. The selection order is:

1. `holiday_image`: all day on Saturdays, Sundays, and national public holidays in the country inferred from the visitor's IANA timezone.
2. `night_image`: 18:00–06:00 on other days.
3. `lunch_hours_image`: during the inferred country's lunch window. `_data/profile_schedule.yml` contains 50 editable country settings across the Americas, Europe, Asia, and Oceania. Other or unknown countries use 12:00–15:00.
4. `formal_image`: the remaining time from 06:00–18:00. This is also the default if JavaScript is disabled.

End times are exclusive. The photo updates on minute boundaries and when the visitor returns to the tab. Lunch windows are approximate presentation defaults chosen for this site; they are not official national schedules or predictions of an individual's meal break. For example, the configured windows are 12:30–14:30 for India, 11:30–14:00 for the United States, and 13:00–16:00 for Spain. Background references include [Spain's tourism guide](https://www.spain.info/en/about-spain/), [Portugal's tourism guide](https://www.visitportugal.com/en/node/195722), [Italy's tourism guide](https://www.italia.it/en/italy/practical-information/time-zones-and-public-holidays-italy), and [China Highlights' meal guide](https://www.chinahighlights.com/travelguide/chinese-food/dining-time.htm). Settings without a direct country-specific reference are broad heuristic defaults.

`assets/data/profile-calendar.json` is generated from [IANA timezone data](https://data.iana.org/time-zones/tzdb/zone.tab) and [python-holidays](https://holidays.readthedocs.io/), using country-level public calendars including observed dates. Country inference is approximate: shared timezones, device settings, or travel can produce the wrong country. State/city-specific and personal holidays are not inferred, and announced or estimated holidays depend on the source calendar. Unrecognized timezones, unavailable calendar data, or dates outside the generated years retain the Saturday/Sunday and local-clock rules. No visitor geolocation request or third-party holiday API is used.

The generated snapshot covers the previous, current, and next UTC year. GitHub Actions regenerates it before every deployment and on the monthly schedule. Python runs during the build; GitHub Pages only serves static HTML, JavaScript, JSON, and image files. The tracked snapshot also allows ordinary local Jekyll builds without installing Python dependencies.

To refresh the snapshot locally on Linux:

```bash
python3 -m venv .calendar-venv
.calendar-venv/bin/python -m pip install -r tools/requirements-calendar.txt
.calendar-venv/bin/python tools/generate_profile_calendar.py
```

To change the default photograph, update `author.avatar` in `_config.yml`. No index or gallery is published for `/files/profile_pics/`; GitHub Pages serves its 404 page for the folder URL. Individual image URLs remain public because browsers need them to render the photographs.

## Local development

Use Ruby 3.2 and Bundler. On Ubuntu, native gem compilation may require `ruby3.2-dev` and `build-essential`.

```bash
bundle config set --local path vendor/bundle
bundle install
bundle exec jekyll serve --host 127.0.0.1
```

Open http://127.0.0.1:4000. Some Ubuntu installations name the Bundler executable `bundle3.2`; substitute that for `bundle` if needed.

Before publishing:

```bash
JEKYLL_ENV=production bundle exec jekyll build --strict_front_matter --trace
python3 tools/check_site.py
node tools/test-profile-photo.cjs
```

The link checker validates rendered local pages, asset references, and fragment targets. Scheduling checks exercise the browser script against the rendered configuration, including exact boundaries, all 50 country windows, holiday priority, midnight, and missing data. Neither check makes external network requests.

## GitHub Pages

1. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main`. `.github/workflows/pages.yml` builds the site, checks internal links, and deploys the `_site` artifact.
3. Check the **Build and deploy website** workflow in the Actions tab for the deployment result.

Pull requests run the build and link checks without deploying. No personal access token is stored in the site; the deployment uses GitHub's automatic workflow token.

## Theme attribution

The theme is adapted from Academic Pages at commit `7b958332ce9970cfb6987a049d7684ac615397e8`, a fork of Michael Rose's Minimal Mistakes. Its MIT license is retained in `LICENSE`, and the original theme attribution remains in the site footer. Site-specific content and assets belong to their respective authors.
Personal Website
