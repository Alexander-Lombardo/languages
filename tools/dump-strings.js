#!/usr/bin/env node
/* Dump every string the app can speak for a language, as JSON on stdout.
   Mirrors the speak() call sites in app.js — keep the two in sync.
   Run: node tools/dump-strings.js fr */
const fs = require("fs");
const path = require("path");

const code = process.argv[2];
if (!code) { console.error("usage: node tools/dump-strings.js <lang-code>"); process.exit(1); }
const dataDir = path.join(__dirname, "..", code, "data");
if (!fs.existsSync(dataDir)) { console.error("no data dir: " + dataDir); process.exit(1); }

global.window = { COURSE: { lessons: [] } };
require(path.join(dataDir, "course.js"));
fs.readdirSync(dataDir).filter(f => /^lesson-\d+\.js$/.test(f)).sort()
  .forEach(f => require(path.join(dataDir, f)));

const F = code; // vocab field name == language code (fr/de/ru/it/es)
const texts = new Set();
const add = (t) => { if (t && String(t).trim()) texts.add(String(t).trim()); };

for (const l of global.window.COURSE.lessons) {
  (l.vocab || []).forEach(v => add(v[F]));                       // vocab table + glossary + SRS
  (l.flashcards || []).forEach(v => add(v[F]));                  // lesson deck + SRS
  (l.dialogue || []).forEach(d => add(d[F]));                    // per-line buttons
  if (l.dialogue && l.dialogue.length)
    add(l.dialogue.map(d => d[F]).join(". "));                   // dialogue "Play all"
  if (l.reading && l.reading[F]) {
    String(l.reading[F]).split(/\n\n+/).forEach(p => add(p));    // per-paragraph buttons
    add(l.reading[F]);                                           // reading "Play all"
  }
  (l.discussion || []).forEach(q => add(typeof q === "string" ? q : q[F]));
  (l.exercises || []).forEach(ex => {
    if (ex.type === "listen")
      add(ex.audio || (ex.answers && ex.answers.length ? ex.answers[0] : ex.answer));
  });
}

process.stdout.write(JSON.stringify([...texts], null, 0));
