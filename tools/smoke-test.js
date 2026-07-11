/* Headless render smoke test for the unified site: a minimal DOM shim so app.js
   can run, then for EACH language load its data and render every route (home,
   all lessons, review, glossary), asserting nothing throws.
   Run: node tools/smoke-test.js */
const fs = require("fs");
const path = require("path");
const SITE = path.join(__dirname, "..");

/* ---- minimal DOM ---- */
function El(tag) {
  this.tagName = (tag || "").toUpperCase();
  this.className = "";
  this._children = [];
  this._attrs = {};
  this.style = {};
  this._text = "";
  this._html = "";
  this._listeners = {};
  var self = this;
  this.classList = {
    _s: {},
    add: function (c) { self.classList._s[c] = 1; },
    remove: function (c) { delete self.classList._s[c]; },
    toggle: function (c, f) { if (f === undefined) f = !self.classList._s[c]; if (f) self.classList._s[c] = 1; else delete self.classList._s[c]; return f; },
    contains: function (c) { return !!self.classList._s[c]; }
  };
}
Object.defineProperty(El.prototype, "children", { get: function () { return this._children; } });
Object.defineProperty(El.prototype, "childNodes", { get: function () { return this._children; } });
Object.defineProperty(El.prototype, "firstChild", { get: function () { return this._children[0] || null; } });
Object.defineProperty(El.prototype, "innerHTML", {
  get: function () { return this._html; },
  set: function (v) { this._html = v; if (v === "") this._children = []; }
});
Object.defineProperty(El.prototype, "textContent", {
  get: function () { return this._text || this._children.map(function (c) { return c._text || c.nodeValue || ""; }).join(""); },
  set: function (v) { this._text = String(v); this._children = []; }
});
El.prototype.appendChild = function (c) { this._children.push(c); c.parentNode = this; return c; };
El.prototype.insertBefore = function (n, ref) { var i = this._children.indexOf(ref); if (i < 0) i = 0; this._children.splice(i, 0, n); return n; };
El.prototype.removeChild = function (c) { var i = this._children.indexOf(c); if (i >= 0) this._children.splice(i, 1); return c; };
El.prototype.setAttribute = function (k, v) { this._attrs[k] = v; };
El.prototype.getAttribute = function (k) { return this._attrs[k]; };
El.prototype.addEventListener = function (ev, fn) { (this._listeners[ev] = this._listeners[ev] || []).push(fn); };
El.prototype.focus = function () {};

var registry = {};
["sidebar", "content", "menu-toggle"].forEach(function (id) { registry[id] = new El("div"); });

global.document = {
  readyState: "complete",
  title: "",
  createElement: function (t) { return new El(t); },
  createTextNode: function (s) { return { nodeValue: String(s), _text: String(s), _children: [] }; },
  getElementById: function (id) { return registry[id] || null; },
  addEventListener: function () {},
  execCommand: function () {}
};

var store = {};
global.localStorage = {
  getItem: function (k) { return k in store ? store[k] : null; },
  setItem: function (k, v) { store[k] = String(v); },
  removeItem: function (k) { delete store[k]; }
};

var hashListeners = [];
global.window = {
  COURSE: undefined,
  scrollTo: function () {},
  addEventListener: function (ev, fn) { if (ev === "hashchange") hashListeners.push(fn); },
  getSelection: function () { return { removeAllRanges: function () {}, addRange: function () {} }; },
  location: { hash: "" }
  // no speechSynthesis -> TTS disabled in app.js
};
global.location = global.window.location;
global.navigator = {};

/* ---- load config, manifest, engine ---- */
require(path.join(SITE, "config.js"));
require(path.join(SITE, "manifest.js"));
require(path.join(SITE, "app.js")); // defines window.startCourse
const LANGS = global.window.SITE_LANGS;
const MANIFEST = global.window.SITE_MANIFEST;

var errors = [];
function go(hash, label) {
  try {
    global.location.hash = hash;
    hashListeners.forEach(function (fn) { fn(); });
    if (registry.content._children.length === 0 && hash !== "") errors.push(label + ": rendered empty content");
  } catch (e) {
    errors.push(label + ": " + (e && e.message) + "\n" + (e && e.stack ? e.stack.split("\n").slice(0, 3).join("\n") : ""));
  }
}

Object.keys(LANGS).forEach(function (code) {
  var cfg = LANGS[code];
  var files = MANIFEST[code];
  var before = errors.length;

  // reset per-language state
  hashListeners.length = 0;
  registry.content._children = [];
  registry.sidebar._children = [];
  global.location.hash = "";
  global.window.COURSE = undefined;

  files.forEach(function (f) { require(path.join(SITE, code, "data", f)); });
  var lessonCount = global.window.COURSE.lessons.length;
  var expected = files.length - 1; // course.js + one file per lesson
  if (lessonCount !== expected)
    errors.push(code + ": loaded " + lessonCount + " lessons, expected " + expected);

  // every vocab/flashcard item must carry the language field + en
  global.window.COURSE.lessons.forEach(function (l) {
    (l.vocab || []).concat(l.flashcards || []).forEach(function (v) {
      if (v && (!v[cfg.field] || !v.en))
        errors.push(code + " lesson " + l.id + ": vocab item missing ." + cfg.field + " or .en: " + JSON.stringify(v).slice(0, 80));
    });
  });

  // seed an SRS deck so the active review UI renders too
  var todayNum = Math.floor(Date.now() / 86400000);
  var c1 = { en: "hello", lessonId: "00", ease: 2.3, interval: 0, due: todayNum };
  c1[cfg.field] = "word-one";
  var c2 = { en: "thanks", lessonId: "00", ease: 2.3, interval: 0, due: todayNum };
  c2[cfg.field] = "word-two";
  store[cfg.srsKey] = JSON.stringify({ cards: { "word-one": c1, "word-two": c2 } });

  try {
    global.window.startCourse(cfg);
    if (registry.content._children.length === 0) errors.push(code + " home: empty after start");
  } catch (e) {
    errors.push(code + " startCourse: " + (e && e.message));
  }

  go("home", code + " home");
  global.window.COURSE.lessons.forEach(function (l) { go("lesson/" + l.id, code + " lesson-" + l.id); });
  go("review", code + " review");
  go("glossary", code + " glossary");

  console.log(code + ": " + lessonCount + " lessons rendered" + (errors.length > before ? " — " + (errors.length - before) + " ERROR(S)" : " ✓"));
});

if (errors.length) {
  console.log("\nSMOKE TEST FAILED — " + errors.length + " error(s):");
  errors.slice(0, 20).forEach(function (e) { console.log("  • " + e); });
  process.exit(1);
} else {
  console.log("\nSMOKE TEST PASSED — all 5 languages: home + all lessons + review + glossary rendered with no errors.");
}
