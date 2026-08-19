#!/usr/bin/env node
/* Dump every string the app can speak for a language, as JSON on stdout:
   [{t: text, v: voiceSlot}] where v is "f1" (default voice), "m1", "f2" or "m2".
   Dialogue lines are tagged per speaker via window.assignVoices (speakers.js).
   Mirrors the speak() call sites in app.js — keep the two in sync.
   Run: node tools/dump-strings.js fr */
const fs = require("fs");
const path = require("path");

const code = process.argv[2];
if (!code) { console.error("usage: node tools/dump-strings.js <lang-code>"); process.exit(1); }
// "en" is the standalone English app: different folder, same spoken-field convention
const dataDir = path.join(__dirname, "..", code === "en" ? "english" : code, "data");
if (!fs.existsSync(dataDir)) { console.error("no data dir: " + dataDir); process.exit(1); }

global.window = { COURSE: { lessons: [] } };
// speakers.js defines window.SPEAKERS (name -> "f"/"m") and window.assignVoices
require(path.join(__dirname, "..", code === "en" ? "english" : "", "speakers.js"));
const GENDER = (global.window.SPEAKERS || {})[code] || {};
const assignVoices = global.window.assignVoices;
require(path.join(dataDir, "course.js"));
fs.readdirSync(dataDir).filter(f => /^lesson-\d+\.js$/.test(f)).sort()
  .forEach(f => require(path.join(dataDir, f)));

const F = code; // spoken-text field name == language code (fr/de/ru/it/es/en)
const texts = new Map(); // key -> {t, v}
const add = (t, v) => {
  if (!t || !String(t).trim()) return;
  v = v || "f1";
  const key = (v === "f1" ? "" : "[" + v + "] ") + String(t).trim();
  if (!texts.has(key)) texts.set(key, { t: String(t).trim(), v });
};
const addDialogue = (lines) => {
  const voices = assignVoices(lines, GENDER);
  lines.forEach(d => add(d[F], d.sp ? voices[d.sp] : "f1"));
};

for (const l of global.window.COURSE.lessons) {
  (l.vocab || []).forEach(v => add(v[F]));                       // vocab table + glossary + SRS
  (l.flashcards || []).forEach(v => add(v[F]));                  // lesson deck + SRS
  if (l.dialogue && l.dialogue.length) addDialogue(l.dialogue);  // per-line buttons + sequential "Play"
  if (l.reading && l.reading[F]) {
    String(l.reading[F]).split(/\n\n+/).forEach(p => add(p));    // per-paragraph buttons
    add(l.reading[F]);                                           // reading "Play all"
  }
  (l.discussion || []).forEach(q => add(typeof q === "string" ? q : q[F]));
  (l.exercises || []).forEach(ex => {
    if (ex.type === "listen")
      add(ex.audio || (ex.answers && ex.answers.length ? ex.answers[0] : ex.answer));
    if (ex.type === "listen-dialogue" && ex.lines && ex.lines.length)  // English app only
      addDialogue(ex.lines);                                     // transcript buttons + sequential play
  });
}

process.stdout.write(JSON.stringify([...texts.values()], null, 0));
