# Language Courses

Static site hosting six self-study language courses (A1 → C2): a unified app for
**French, German, Russian, Italian and Spanish**, plus the standalone
**English course for Spanish speakers** at `/english/`.

Live: https://alexander-lombardo.github.io/languages/

## How it works

- `index.html` + `loader.js` — shell, landing page and language switcher. The chosen
  language is stored in `localStorage` (`activeLanguage.v1`).
- `app.js` — the course engine (rendering, audio, exercises, SRS flashcards, progress),
  parameterized per language via `config.js`. `loader.js` injects the selected language's
  data files (`<code>/data/*.js`, listed in the generated `manifest.js`) with
  `script.async = false`, then calls `startCourse(cfg)`.
- Progress/SRS/streak live in per-language `localStorage` keys, so each course tracks
  independently.
- `english/` — verbatim copy of the standalone English app; untouched by the engine.

No build step, no dependencies. Everything is plain static files.

## Updating content

Lesson content is authored in the sibling per-language repos
(`../French`, `../German`, `../Russian`, `../Italian`, `../Spanish`, `../English`),
each generating an `output/` app. To pull fresh content into this site:

```sh
node tools/sync.js     # re-copies <Lang>/output/data → <code>/data, English/output → english/, regenerates manifest.js + static pages
node tools/smoke-test.js   # headless render of every route in all 5 languages
git commit -am "sync content" && git push
```

## Local development

```sh
python3 -m http.server 8000
# open http://localhost:8000
```

## Static lesson pages (SEO)

The app is a client-side SPA, so search engines only see one page. `tools/gen-static.js`
(run automatically at the end of `sync.js`, or by hand) renders a crawlable HTML page for
every lesson plus a course landing page per language:

```
<code>/lessons/              course overview (levels, unit-by-unit lesson index)
<code>/lessons/<slug>/       one page per lesson: objectives, vocab, dialogue, grammar,
                             reading, culture note + "Open the interactive lesson" deep link
pages.css                    standalone stylesheet for these pages
sitemap.xml, robots.txt
```

The "open interactive lesson" buttons set `activeLanguage.v1` in localStorage and jump to
`index.html#lesson/NN` (the English course links straight to `english/index.html#lesson/NN`).

Canonical/OG URLs and the sitemap use `SITE_URL` — once there is a custom domain, run
`SITE_URL=https://yourdomain.com node tools/gen-static.js` (or change `DEFAULT_SITE_URL`
in the script). `SITE_BRAND` overrides the site name in titles/footers.
