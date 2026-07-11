/* Language selection + data loading for the unified course site.
   Shows a landing page until a language is chosen; then injects that language's
   data files (which populate window.COURSE) and calls startCourse(cfg).
   Switching languages does a full reload — app.js keeps closure state, so a
   clean boot per language is the simplest correct approach. */
(function () {
  "use strict";

  var LANG_KEY = "activeLanguage.v1";
  var LANGS = window.SITE_LANGS;
  var MANIFEST = window.SITE_MANIFEST;

  function chosenLang() {
    try { return localStorage.getItem(LANG_KEY); } catch (e) { return null; }
  }
  function setLang(code) {
    try {
      if (code) localStorage.setItem(LANG_KEY, code);
      else localStorage.removeItem(LANG_KEY);
    } catch (e) {}
  }
  function goHome() {
    setLang(null);
    if (location.hash) location.hash = "";
    location.reload();
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "text") node.textContent = attrs[k];
        else if (k.slice(0, 2) === "on" && typeof attrs[k] === "function")
          node.addEventListener(k.slice(2), attrs[k]);
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) {
      if (c == null) return;
      node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    });
    return node;
  }

  function lessonTotal(code) {
    // manifest lists course.js + one file per lesson
    return (MANIFEST[code] || []).length - 1;
  }
  function doneCount(code) {
    try {
      var p = JSON.parse(localStorage.getItem(LANGS[code].storeKey)) || {};
      return Object.keys(p).filter(function (k) { return p[k].done; }).length;
    } catch (e) { return 0; }
  }

  /* ---------- landing page ---------- */
  function renderLanding() {
    document.body.classList.add("landing");
    document.title = "Language Courses";
    var c = document.getElementById("content");
    c.innerHTML = "";
    c.appendChild(el("h1", { text: "🌐 Language Courses" }));
    c.appendChild(el("p", { class: "lead", text:
      "Complete self-study courses from absolute beginner (A1) to mastery (C2) — lessons, audio, interactive exercises and spaced-repetition flashcards. Pick a language:" }));

    var grid = el("div", { class: "lang-grid" });
    Object.keys(LANGS).forEach(function (code) {
      var cfg = LANGS[code];
      var total = lessonTotal(code);
      var done = doneCount(code);
      var pct = total ? Math.round((done / total) * 100) : 0;
      grid.appendChild(el("a", {
        class: "lang-card", href: "#",
        onclick: function (e) { e.preventDefault(); setLang(code); location.reload(); }
      }, [
        el("div", { class: "lang-flag", text: cfg.flag }),
        el("div", { class: "lang-name", text: cfg.name }),
        el("div", { class: "lang-meta", text: total + " lessons · A1 → C2" }),
        el("div", { class: "bar" }, [el("div", { class: "bar-fill", style: "width:" + pct + "%" })]),
        el("div", { class: "lang-meta", text: done + " / " + total + " done" })
      ]));
    });
    // English is its own standalone app (built for Spanish speakers)
    grid.appendChild(el("a", { class: "lang-card", href: "english/" }, [
      el("div", { class: "lang-flag", text: "🇬🇧" }),
      el("div", { class: "lang-name", text: "English" }),
      el("div", { class: "lang-meta", text: "Curso para hispanohablantes" }),
      el("div", { class: "lang-meta", text: "60 lecciones · A1 → C2" })
    ]));
    c.appendChild(grid);
  }

  /* ---------- active language ---------- */
  function renderHeader(code) {
    var cfg = LANGS[code];
    document.title = cfg.name + " · Language Courses";
    var brand = document.getElementById("brand");
    brand.textContent = cfg.flag + " " + cfg.name + " A1 → C2";

    var sel = document.getElementById("lang-switch");
    sel.hidden = false;
    Object.keys(LANGS).forEach(function (k) {
      sel.appendChild(el("option", { value: k, text: LANGS[k].flag + " " + LANGS[k].name }));
    });
    sel.value = code;
    sel.addEventListener("change", function () {
      setLang(sel.value);
      if (location.hash) location.hash = "";
      location.reload();
    });
  }

  function loadLanguage(code) {
    var cfg = LANGS[code];
    var files = MANIFEST[code];
    renderHeader(code);

    window.COURSE = undefined; // data files initialise it
    var loaded = 0, failed = false;
    var total = files.length + (cfg.audio ? 1 : 0);
    function tick() {
      loaded++;
      if (loaded === total && !failed) window.startCourse(cfg);
    }
    if (cfg.audio) {
      // optional: text -> mp3 map for pre-generated audio; app falls back to TTS without it
      var a = document.createElement("script");
      a.src = code + "/audio/manifest.js";
      a.async = false;
      a.onload = tick;
      a.onerror = tick;
      document.body.appendChild(a);
    }
    files.forEach(function (f) {
      var s = document.createElement("script");
      s.src = code + "/data/" + f;
      s.async = false; // preserve execution order (course.js first, lessons in order)
      s.onload = tick;
      s.onerror = function () {
        if (failed) return;
        failed = true;
        document.getElementById("content").innerHTML =
          "<h1>Loading failed</h1><p>Couldn't load <code>" + s.src + "</code>. Try reloading the page.</p>";
      };
      document.body.appendChild(s);
    });
  }

  function boot() {
    document.getElementById("brand").addEventListener("click", function (e) {
      e.preventDefault();
      goHome();
    });
    var code = chosenLang();
    if (code && LANGS[code] && MANIFEST[code]) loadLanguage(code);
    else renderLanding();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
