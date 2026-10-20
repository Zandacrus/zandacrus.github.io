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

The sidebar currently uses `/files/profile_pics/yellow-jacket-sunglasses.jpg`. Profile photographs are stored in `files/profile_pics/` with matching filenames in the local source project's `profile_pics/` folder:

- `yellow-jacket-sunglasses.jpg`: yellow jacket and sunglasses, seated outdoors.
- `yellow-jacket-snow-selfie.jpg`: yellow hood and scarf, snowy background.
- `black-suit-outdoors.jpg`: black suit and glasses, standing outdoors.
- `suit-red-tie-headshot.jpg`: formal portrait with a red tie and white background.

To change the default photograph, update `author.avatar` in `_config.yml`. No index or gallery is published for `/files/profile_pics/`; GitHub Pages serves its 404 page for the folder URL. Individual image URLs remain public because browsers need them to render the photographs. Visitor-local time selection can be added after the desired schedule is specified.

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
```

The link checker validates rendered local pages, asset references, and fragment targets. It does not make external network requests.

## GitHub Pages

1. In the repository's **Settings → Pages**, set **Source** to **GitHub Actions**.
2. Push to `main`. `.github/workflows/pages.yml` builds the site, checks internal links, and deploys the `_site` artifact.
3. Check the **Build and deploy website** workflow in the Actions tab for the deployment result.

Pull requests run the build and link checks without deploying. No personal access token is stored in the site; the deployment uses GitHub's automatic workflow token.

## Theme attribution

The theme is adapted from Academic Pages at commit `7b958332ce9970cfb6987a049d7684ac615397e8`, a fork of Michael Rose's Minimal Mistakes. Its MIT license is retained in `LICENSE`, and the original theme attribution remains in the site footer. Site-specific content and assets belong to their respective authors.
Personal Website
