#!/usr/bin/env node
/* Generate crawlable static HTML pages for every lesson + a course landing page
   per language, plus sitemap.xml and robots.txt.

   Why: the app is a client-side SPA (language in localStorage, lessons behind
   #lesson/NN), so search engines see one page. These pages give every lesson a
   real URL, <title>, description and readable content, and deep-link into the
   interactive app for exercises/audio/flashcards.

   Output (all idempotent, safe to re-run):
     site/<code>/lessons/index.html          course landing (fr, de, ru, it, es, english)
     site/<code>/lessons/<slug>/index.html   one page per lesson
     site/pages.css                          standalone stylesheet for these pages
     site/sitemap.xml, site/robots.txt

   Usage:  node tools/gen-static.js            (run after tools/sync.js)
           SITE_URL=https://example.com node tools/gen-static.js
   Set SITE_URL (or edit DEFAULT_SITE_URL) once a custom domain exists — it is
   used for canonical/OG URLs and the sitemap. */

"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const SITE = path.resolve(__dirname, "..");
const DEFAULT_SITE_URL = "https://alexander-lombardo.github.io/languages";
const SITE_URL = (process.env.SITE_URL || DEFAULT_SITE_URL).replace(/\/+$/, "");
const BRAND = process.env.SITE_BRAND || "Language Courses";

/* ---------- per-language page config ---------- */
// ui: language of the page chrome; field: target-language text key; gloss: translation key
const PAGES = {
  fr: { name: "French", native: "Français", ui: "en", field: "fr", gloss: "en", dir: "fr", app: "../../../index.html", appSetsLang: true },
  de: { name: "German", native: "Deutsch", ui: "en", field: "de", gloss: "en", dir: "de", app: "../../../index.html", appSetsLang: true },
  ru: { name: "Russian", native: "Русский", ui: "en", field: "ru", gloss: "en", dir: "ru", app: "../../../index.html", appSetsLang: true },
  it: { name: "Italian", native: "Italiano", ui: "en", field: "it", gloss: "en", dir: "it", app: "../../../index.html", appSetsLang: true },
  es: { name: "Spanish", native: "Español", ui: "en", field: "es", gloss: "en", dir: "es", app: "../../../index.html", appSetsLang: true },
  english: { name: "English", native: "Inglés", ui: "es", field: "en", gloss: "es", dir: "english", app: "../../index.html", appSetsLang: false },
};

// UI strings, English and Spanish (the English course is written for Spanish speakers)
const T = {
  en: {
    courseTitle: (n) => `${n} A1 → C2 — Complete Self-Study Course`,
    courseDesc: (n, L, E) => `Free ${n} course from absolute beginner (A1) to mastery (C2): ${L} lessons with grammar explained in plain English, vocabulary with pronunciation, dialogues, readings, ${E} interactive exercises, native-quality audio and spaced-repetition flashcards.`,
    lessonTitle: (t, n, lvl) => `${t} — ${n} ${lvl}`,
    allLessons: "All lessons", lesson: "Lesson", level: "Level", unit: "Unit", time: "Time",
    objectives: "What you'll learn", vocab: "Vocabulary", word: "Word", say: "Say it", meaning: "Meaning",
    dialogue: "Dialogue", grammar: "Grammar", pron: "Pronunciation tip", reading: "Reading", culture: "Culture note",
    discussion: "Talk about it", practice: "Practice this lesson",
    practiceBlurb: (n) => `This lesson has <strong>${n} interactive exercises</strong> (${"{types}"}) with instant feedback, plus audio for every word and line of dialogue, and flashcards that go into your spaced-repetition deck.`,
    openApp: "Open the interactive lesson — free", openCourse: "Start the course — free",
    prev: "Previous lesson", next: "Next lesson", backToCourse: (n) => `${n} course overview`,
    otherCourses: "Other courses", home: "All courses", inApp: "in the app",
    stats: (L, E, A) => `${L} lessons · ${E} exercises · ${A} audio clips`,
    levelsHeading: "The six CEFR levels", lessonsHeading: "Lessons",
    whyTitle: "How this course works",
    why: [
      "Every lesson explains the grammar in plain English first, then gives you vocabulary with pronunciation, a dialogue, a reading and a culture note.",
      "Exercises are interactive — fill-in, multiple choice, translation, conjugation, sentence building, matching and listening — with instant feedback.",
      "Every word and dialogue line has native-quality audio; finished lessons feed a spaced-repetition flashcard deck.",
      "Nothing to install, works offline once loaded, progress saved in your browser. Goes all the way to C2 — not just the basics.",
    ],
    exTypes: { fill: "fill-in-the-blank", mc: "multiple choice", translate: "translation", conjugate: "conjugation", order: "sentence building", match: "matching", listen: "listening", "listen-dialogue": "dialogue listening" },
    footer: `${BRAND} · self-study language courses A1 → C2`,
  },
  es: {
    courseTitle: (n) => `Curso de ${n} A1 → C2 — Completo y autodidacta`,
    courseDesc: (n, L, E) => `Curso de ${n.toLowerCase()} gratis para hispanohablantes, de principiante absoluto (A1) a dominio (C2): ${L} lecciones con gramática explicada en español, vocabulario con pronunciación, diálogos, lecturas, ${E} ejercicios interactivos, audio de calidad nativa y tarjetas de repaso espaciado.`,
    lessonTitle: (t, n, lvl) => `${t} — ${n} ${lvl}`,
    allLessons: "Todas las lecciones", lesson: "Lección", level: "Nivel", unit: "Unidad", time: "Duración",
    objectives: "Qué vas a aprender", vocab: "Vocabulario", word: "Palabra", say: "Se pronuncia", meaning: "Significado",
    dialogue: "Diálogo", grammar: "Gramática", pron: "Consejo de pronunciación", reading: "Lectura", culture: "Nota cultural",
    discussion: "Para conversar", practice: "Practica esta lección",
    practiceBlurb: (n) => `Esta lección tiene <strong>${n} ejercicios interactivos</strong> (${"{types}"}) con corrección inmediata, audio de cada palabra y línea del diálogo, y tarjetas que van a tu mazo de repaso espaciado.`,
    openApp: "Abrir la lección interactiva — gratis", openCourse: "Empezar el curso — gratis",
    prev: "Lección anterior", next: "Siguiente lección", backToCourse: (n) => `Índice del curso de ${n.toLowerCase()}`,
    otherCourses: "Otros cursos", home: "Todos los cursos", inApp: "en la app",
    stats: (L, E, A) => `${L} lecciones · ${E} ejercicios · ${A} audios`,
    levelsHeading: "Los seis niveles del MCER", lessonsHeading: "Lecciones",
    whyTitle: "Cómo funciona este curso",
    why: [
      "Cada lección explica la gramática en español primero y luego te da vocabulario con pronunciación, un diálogo, una lectura y una nota cultural.",
      "Los ejercicios son interactivos — completar, opción múltiple, traducción, conjugación, ordenar frases, emparejar y escuchar — con corrección inmediata.",
      "Cada palabra y cada línea del diálogo tiene audio de calidad nativa; las lecciones terminadas alimentan un mazo de tarjetas de repaso espaciado.",
      "Nada que instalar, funciona sin conexión una vez cargado, el progreso se guarda en tu navegador. Llega hasta C2, no solo lo básico.",
    ],
    exTypes: { fill: "completar", mc: "opción múltiple", translate: "traducción", conjugate: "conjugación", order: "ordenar frases", match: "emparejar", listen: "escuchar", "listen-dialogue": "comprensión del diálogo" },
    footer: `${BRAND} · cursos de idiomas autodidactas A1 → C2`,
  },
};

/* ---------- helpers ---------- */
function esc(s) {
  return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function attr(s) { return esc(s).replace(/'/g, "&#39;"); }
function stripTags(html) { return String(html || "").replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(); }
function truncate(s, n) {
  s = String(s || "").trim();
  if (s.length <= n) return s;
  const cut = s.slice(0, n - 1);
  return cut.slice(0, Math.max(cut.lastIndexOf(" "), n - 30)) + "…";
}
function paras(text) {
  return String(text || "").split(/\n+/).map((p) => p.trim()).filter(Boolean);
}
function write(rel, content) {
  const abs = path.join(SITE, rel);
  fs.mkdirSync(path.dirname(abs), { recursive: true });
  fs.writeFileSync(abs, content);
}
function countFiles(dir) {
  try { return fs.readdirSync(dir).filter((f) => f.endsWith(".mp3")).length; } catch (e) { return 0; }
}

function loadCourse(code) {
  const dir = path.join(SITE, PAGES[code].dir, "data");
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".js")).sort();
  const ctx = { window: { COURSE: { lessons: [] } } };
  ctx.window.window = ctx.window;
  vm.createContext(ctx);
  vm.runInContext(fs.readFileSync(path.join(dir, "course.js"), "utf8"), ctx, { filename: "course.js" });
  for (const f of files) {
    if (f === "course.js") continue;
    vm.runInContext(fs.readFileSync(path.join(dir, f), "utf8"), ctx, { filename: f });
  }
  const course = ctx.window.COURSE;
  course.lessons.sort((a, b) => a.id.localeCompare(b.id));
  return course;
}

/* ---------- page chrome ---------- */
function head({ title, desc, canonical, lang, ogType, jsonld, cssRel }) {
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${attr(desc)}">
<link rel="canonical" href="${attr(canonical)}">
<meta property="og:type" content="${ogType || "article"}">
<meta property="og:title" content="${attr(title)}">
<meta property="og:description" content="${attr(desc)}">
<meta property="og:url" content="${attr(canonical)}">
<meta property="og:site_name" content="${attr(BRAND)}">
<meta name="twitter:card" content="summary">
<link rel="stylesheet" href="${cssRel}">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ""}
</head>
<body>`;
}

function appLink(cfg, hash, text, cls) {
  // The unified app picks the language from localStorage, so set it before navigating.
  const onclick = cfg.appSetsLang ? ` onclick="try{localStorage.setItem('activeLanguage.v1','${cfg.code}')}catch(e){}"` : "";
  return `<a class="${cls || "btn"}" href="${cfg.app}${hash}"${onclick} rel="nofollow">${esc(text)}</a>`;
}

function footer(cfg, t, depthToRoot) {
  const others = Object.keys(PAGES).filter((c) => c !== cfg.code)
    .map((c) => `<a href="${depthToRoot}${PAGES[c].dir}/lessons/">${esc(PAGES[c].name)}</a>`).join(" · ");
  return `<footer class="site-footer">
<p><strong>${esc(t.otherCourses)}:</strong> ${others} · <a href="${depthToRoot}index.html">${esc(t.home)}</a></p>
<p>${esc(t.footer)}</p>
</footer>
</body>
</html>
`;
}

/* ---------- lesson page ---------- */
function exerciseSummary(lesson, t) {
  const counts = {};
  for (const ex of lesson.exercises || []) counts[ex.type] = (counts[ex.type] || 0) + 1;
  const types = Object.keys(counts).map((k) => t.exTypes[k] || k);
  return { n: (lesson.exercises || []).length, types };
}

function uiName(cfg) { return cfg.ui === "es" ? cfg.native : cfg.name; }

function lessonPage(cfg, course, lesson, idx, stats) {
  const t = T[cfg.ui], F = cfg.field, G = cfg.gloss, N = uiName(cfg);
  const prev = course.lessons[idx - 1], next = course.lessons[idx + 1];
  const url = `${SITE_URL}/${cfg.dir}/lessons/${lesson.slug}/`;
  const title = t.lessonTitle(lesson.title, N, lesson.level);
  const descSrc = (lesson.objectives || []).join(" ") || stripTags(lesson.grammarHTML);
  const desc = truncate(`${N} ${lesson.level}: ${descSrc}`, 158);
  const ex = exerciseSummary(lesson, t);

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lesson.title,
    description: desc,
    inLanguage: cfg.ui,
    teaches: `${N} (${lesson.level})`,
    educationalLevel: lesson.level,
    learningResourceType: "lesson",
    isPartOf: { "@type": "Course", name: t.courseTitle(N), url: `${SITE_URL}/${cfg.dir}/lessons/` },
    url,
  };

  let h = head({ title, desc, canonical: url, lang: cfg.ui, jsonld, cssRel: "../../../pages.css" });
  h += `<nav class="crumbs"><a href="../../../index.html">${esc(t.home)}</a> › <a href="../">${esc(N)} A1 → C2</a> › ${esc(t.lesson)} ${esc(lesson.id)}</nav>
<main class="lesson">
<header class="lesson-head">
<p class="kicker">${esc(N)} · ${esc(lesson.level)} · ${esc(lesson.unit)}${lesson.time ? " · " + esc(lesson.time) : ""}</p>
<h1>${esc(lesson.title)}</h1>
<p class="cta-row">${appLink(cfg, "#lesson/" + lesson.id, t.openApp, "btn primary")}</p>
</header>
`;

  if (lesson.objectives && lesson.objectives.length) {
    h += `<section><h2>${esc(t.objectives)}</h2><ul class="objectives">${lesson.objectives.map((o) => `<li>${esc(o)}</li>`).join("")}</ul></section>\n`;
  }

  if (lesson.vocab && lesson.vocab.length) {
    h += `<section><h2>${esc(t.vocab)}</h2><div class="table-wrap"><table class="vocab"><thead><tr><th>${esc(t.word)}</th><th>${esc(t.say)}</th><th>${esc(t.meaning)}</th></tr></thead><tbody>`;
    for (const v of lesson.vocab) {
      h += `<tr><td class="l2" lang="${cfg.field}">${esc(v[F])}</td><td class="say">${esc(v.say || "")}</td><td>${esc(v[G])}</td></tr>`;
    }
    h += `</tbody></table></div></section>\n`;
  }

  if (lesson.dialogue && lesson.dialogue.length) {
    h += `<section><h2>${esc(t.dialogue)}</h2><div class="dialogue">`;
    for (const d of lesson.dialogue) {
      h += `<div class="line"><span class="sp">${esc(d.sp || "")}</span><p class="l2" lang="${cfg.field}">${esc(d[F])}</p><p class="gloss">${esc(d[G])}</p></div>`;
    }
    h += `</div></section>\n`;
  }

  if (lesson.grammarHTML) h += `<section class="prose"><h2>${esc(t.grammar)}</h2>${lesson.grammarHTML}${lesson.grammarHTML2 || ""}</section>\n`;
  if (lesson.pronTipHTML) h += `<section class="prose tip"><h2>${esc(t.pron)}</h2>${lesson.pronTipHTML}</section>\n`;

  if (lesson.reading && lesson.reading[F]) {
    const r = lesson.reading;
    h += `<section class="reading"><h2>${esc(t.reading)}${r.title ? ": " + esc(r.title) : ""}</h2>
<div class="reading-l2" lang="${cfg.field}">${paras(r[F]).map((p) => `<p class="l2">${esc(p)}</p>`).join("")}</div>
<details><summary>${esc(cfg.ui === "es" ? "Traducción" : "Translation")}</summary>${paras(r[G]).map((p) => `<p>${esc(p)}</p>`).join("")}</details></section>\n`;
  }

  if (lesson.cultureHTML) h += `<section class="prose culture"><h2>${esc(t.culture)}</h2>${lesson.cultureHTML}</section>\n`;

  if (lesson.discussion && lesson.discussion.length) {
    h += `<section><h2>${esc(t.discussion)}</h2><ul class="discussion">`;
    for (const d of lesson.discussion) {
      if (typeof d === "string") h += `<li>${esc(d)}</li>`;
      else h += `<li><span class="l2" lang="${cfg.field}">${esc(d[F])}</span>${d[G] ? ` <span class="gloss">— ${esc(d[G])}</span>` : ""}</li>`;
    }
    h += `</ul></section>\n`;
  }

  h += `<section class="practice"><h2>${esc(t.practice)}</h2>
<p>${t.practiceBlurb(ex.n).replace("{types}", esc(ex.types.join(", ")))}</p>
<p class="cta-row">${appLink(cfg, "#lesson/" + lesson.id, t.openApp, "btn primary")}</p>
</section>
<nav class="pager">
${prev ? `<a href="../${prev.slug}/" rel="prev">← ${esc(t.prev)}: ${esc(prev.title)}</a>` : "<span></span>"}
${next ? `<a href="../${next.slug}/" rel="next">${esc(t.next)}: ${esc(next.title)} →</a>` : "<span></span>"}
</nav>
<p class="back"><a href="../">${esc(t.backToCourse(N))}</a> · ${esc(t.stats(stats.lessons, stats.exercises, stats.audio))}</p>
</main>
`;
  h += footer(cfg, t, "../../../");
  return h;
}

/* ---------- course landing page ---------- */
function coursePage(cfg, course, stats) {
  const t = T[cfg.ui], N = uiName(cfg);
  const url = `${SITE_URL}/${cfg.dir}/lessons/`;
  const title = t.courseTitle(N);
  const desc = truncate(t.courseDesc(N, stats.lessons, stats.exercises), 158);
  const first = course.lessons[0];
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description: desc,
    inLanguage: cfg.ui,
    teaches: N,
    url,
    provider: { "@type": "Organization", name: BRAND, url: SITE_URL + "/" },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: `PT${stats.lessons * 45}M` },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  let h = head({ title, desc, canonical: url, lang: cfg.ui, ogType: "website", jsonld, cssRel: "../../pages.css" });
  h += `<nav class="crumbs"><a href="../../index.html">${esc(t.home)}</a> › ${esc(N)} A1 → C2</nav>
<main class="course">
<header class="course-head">
<p class="kicker">${esc(t.stats(stats.lessons, stats.exercises, stats.audio))}</p>
<h1>${esc(title)}</h1>
<p class="lede">${esc(t.courseDesc(N, stats.lessons, stats.exercises))}</p>
<p class="cta-row">${first ? appLink(cfg, "#lesson/" + first.id, t.openCourse, "btn primary") : ""}</p>
</header>
<section><h2>${esc(t.whyTitle)}</h2><ul class="why">${t.why.map((w) => `<li>${esc(w)}</li>`).join("")}</ul></section>
`;

  if (course.levels && course.levels.length) {
    h += `<section><h2>${esc(t.levelsHeading)}</h2><div class="levels">`;
    for (const lv of course.levels) {
      const n = course.lessons.filter((l) => String(l.level).indexOf(lv.code) === 0).length;
      h += `<div class="level"><h3>${esc(lv.code)} · ${esc(lv.name)}</h3><p>${esc(lv.blurb || "")}</p>${n ? `<p class="muted">${n} ${esc(cfg.ui === "es" ? "lecciones" : "lessons")}</p>` : ""}</div>`;
    }
    h += `</div></section>\n`;
  }

  h += `<section><h2>${esc(t.lessonsHeading)}</h2>`;
  const byId = Object.fromEntries(course.lessons.map((l) => [l.id, l]));
  const units = (course.units && course.units.length) ? course.units : [{ name: t.allLessons, ids: course.lessons.map((l) => l.id) }];
  const seen = new Set();
  for (const u of units) {
    const ls = (u.ids || []).map((id) => byId[id]).filter(Boolean);
    if (!ls.length) continue;
    h += `<h3 class="unit-name">${esc(u.name)}${u.level ? ` <span class="badge">${esc(u.level)}</span>` : ""}</h3><ol class="lesson-list">`;
    for (const l of ls) { seen.add(l.id); h += `<li><a href="${l.slug}/"><span class="num">${esc(l.id)}</span> ${esc(l.title)}</a> <span class="muted">${esc(l.level)}${l.time ? " · " + esc(l.time) : ""}</span></li>`; }
    h += `</ol>`;
  }
  const rest = course.lessons.filter((l) => !seen.has(l.id));
  if (rest.length) {
    h += `<ol class="lesson-list">${rest.map((l) => `<li><a href="${l.slug}/"><span class="num">${esc(l.id)}</span> ${esc(l.title)}</a> <span class="muted">${esc(l.level)}</span></li>`).join("")}</ol>`;
  }
  h += `</section>
<p class="cta-row">${first ? appLink(cfg, "#lesson/" + first.id, t.openCourse, "btn primary") : ""}</p>
</main>
`;
  h += footer(cfg, t, "../../");
  return h;
}

/* ---------- stylesheet ---------- */
const CSS = `/* Generated by tools/gen-static.js — styles for the static lesson/course pages.
   Self-contained on purpose (does not depend on styles.css). */
:root{--navy:#1E2A47;--accent:#F97316;--ink:#1f2937;--muted:#6b7280;--bg:#f6f7fb;--card:#fff;--line:#e5e7eb;--l2:#1E2A47}
@media (prefers-color-scheme:dark){:root{--ink:#e5e7eb;--muted:#9ca3af;--bg:#0f172a;--card:#1e293b;--line:#334155;--l2:#fbbf24}}
*{box-sizing:border-box}
body{margin:0;font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--ink);background:var(--bg)}
a{color:var(--accent)}
main{max-width:820px;margin:0 auto;padding:0 20px 40px}
.crumbs{max-width:820px;margin:0 auto;padding:16px 20px;font-size:.9rem;color:var(--muted)}
.crumbs a{color:var(--muted)}
.kicker{color:var(--muted);font-size:.9rem;margin:0 0 6px;text-transform:uppercase;letter-spacing:.04em}
h1{font-size:2rem;line-height:1.2;margin:0 0 12px;color:var(--l2)}
h2{font-size:1.3rem;margin:36px 0 12px;padding-bottom:6px;border-bottom:2px solid var(--line)}
h3{font-size:1.05rem;margin:18px 0 8px}
.lede{font-size:1.1rem}
.btn{display:inline-block;padding:12px 20px;border-radius:10px;background:var(--card);border:1px solid var(--line);color:var(--ink);text-decoration:none;font-weight:600}
.btn.primary{background:var(--accent);border-color:var(--accent);color:#fff}
.btn.primary:hover{filter:brightness(.95)}
.cta-row{margin:16px 0}
section{background:var(--card);border:1px solid var(--line);border-radius:14px;padding:4px 20px 18px;margin:18px 0}
section h2{margin-top:14px}
.objectives,.why{padding-left:20px}
.table-wrap{overflow-x:auto}
table.vocab{width:100%;border-collapse:collapse;font-size:.97rem}
table.vocab th{text-align:left;font-weight:600;color:var(--muted);font-size:.85rem;padding:8px 10px;border-bottom:1px solid var(--line)}
table.vocab td{padding:8px 10px;border-bottom:1px solid var(--line);vertical-align:top}
.l2{color:var(--l2);font-weight:600}
.say{color:var(--muted);font-style:italic}
.dialogue .line{display:grid;grid-template-columns:7.5em 1fr;gap:4px 12px;padding:8px 0;border-bottom:1px dashed var(--line)}
.dialogue .line:last-child{border-bottom:0}
.dialogue .sp{color:var(--muted);font-size:.9rem;grid-row:span 2;padding-top:2px}
.dialogue p{margin:0}
.dialogue .gloss{color:var(--muted);font-size:.95rem}
.prose p{margin:10px 0}
.prose table{border-collapse:collapse;margin:10px 0;width:100%}
.prose td,.prose th{border:1px solid var(--line);padding:6px 10px;text-align:left}
.reading-l2 p{font-size:1.05rem}
details summary{cursor:pointer;color:var(--muted);margin-top:8px}
.discussion{padding-left:20px}
.discussion .gloss{color:var(--muted)}
.practice{border-color:var(--accent);background:linear-gradient(0deg,rgba(249,115,22,.06),rgba(249,115,22,.06)),var(--card)}
.pager{display:flex;justify-content:space-between;gap:16px;margin:24px 0;font-size:.95rem}
.pager a{text-decoration:none;max-width:48%}
.back{color:var(--muted);font-size:.9rem}
.levels{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}
.level{border:1px solid var(--line);border-radius:10px;padding:4px 14px 10px}
.level h3{margin:10px 0 4px;color:var(--l2)}
.level p{margin:4px 0;font-size:.95rem}
.muted{color:var(--muted);font-size:.9rem}
.unit-name{margin-top:22px}
.badge{display:inline-block;font-size:.75rem;background:var(--navy);color:#fff;border-radius:999px;padding:1px 8px;vertical-align:middle;margin-left:6px}
.lesson-list{padding-left:0;list-style:none;margin:6px 0}
.lesson-list li{padding:6px 0;border-bottom:1px solid var(--line)}
.lesson-list a{text-decoration:none;color:var(--ink);font-weight:500}
.lesson-list a:hover{color:var(--accent)}
.lesson-list .num{display:inline-block;min-width:2.2em;color:var(--muted);font-variant-numeric:tabular-nums}
.site-footer{max-width:820px;margin:0 auto;padding:20px;color:var(--muted);font-size:.9rem;border-top:1px solid var(--line)}
.site-footer a{color:var(--muted)}
@media (max-width:560px){h1{font-size:1.6rem}.dialogue .line{grid-template-columns:1fr}.dialogue .sp{grid-row:auto}.pager{flex-direction:column}.pager a{max-width:none}}
`;

/* ---------- main ---------- */
function main() {
  const urls = [`${SITE_URL}/`];
  let totalPages = 0;
  write("pages.css", CSS);

  for (const code of Object.keys(PAGES)) {
    const cfg = Object.assign({ code }, PAGES[code]);
    const dataDir = path.join(SITE, cfg.dir, "data");
    if (!fs.existsSync(dataDir)) { console.error(`skip ${code}: no ${dataDir}`); continue; }
    const course = loadCourse(code);
    const stats = {
      lessons: course.lessons.length,
      exercises: course.lessons.reduce((n, l) => n + (l.exercises || []).length, 0),
      audio: countFiles(path.join(SITE, cfg.dir, "audio")),
    };

    // clear previously generated lesson dirs so renamed slugs don't linger
    const outDir = path.join(SITE, cfg.dir, "lessons");
    if (fs.existsSync(outDir)) {
      for (const e of fs.readdirSync(outDir, { withFileTypes: true })) {
        if (e.isDirectory() && fs.existsSync(path.join(outDir, e.name, "index.html"))) fs.rmSync(path.join(outDir, e.name), { recursive: true });
      }
    }

    write(`${cfg.dir}/lessons/index.html`, coursePage(cfg, course, stats));
    urls.push(`${SITE_URL}/${cfg.dir}/lessons/`);
    course.lessons.forEach((lesson, i) => {
      write(`${cfg.dir}/lessons/${lesson.slug}/index.html`, lessonPage(cfg, course, lesson, i, stats));
      urls.push(`${SITE_URL}/${cfg.dir}/lessons/${lesson.slug}/`);
    });
    totalPages += course.lessons.length + 1;
    console.log(`${code.padEnd(8)} ${String(course.lessons.length).padStart(3)} lessons  ${stats.exercises} exercises  ${stats.audio} audio`);
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls.map((u) => `  <url><loc>${esc(u)}</loc></url>`).join("\n") + `\n</urlset>\n`;
  write("sitemap.xml", sitemap);
  write("robots.txt", `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`);
  console.log(`wrote ${totalPages} pages, sitemap.xml (${urls.length} urls), robots.txt, pages.css  [SITE_URL=${SITE_URL}]`);
}

main();
