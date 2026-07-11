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
node tools/sync.js     # re-copies <Lang>/output/data → <code>/data, English/output → english/, regenerates manifest.js
node tools/smoke-test.js   # headless render of every route in all 5 languages
git commit -am "sync content" && git push
```

## Local development

```sh
python3 -m http.server 8000
# open http://localhost:8000
```
