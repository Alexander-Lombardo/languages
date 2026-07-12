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
        else if (k === "html") node.innerHTML = attrs[k];
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
    var sub = document.getElementById("brand-sub");
    if (sub) sub.textContent = "Self-study course";
    var ctx = document.getElementById("page-context");
    if (ctx) ctx.textContent = cfg.name + " · A1 → C2";

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

  /* ================= shell features (theme / zen / shortcuts / pomodoro) =================
     These live here (not app.js) so the headless smoke test never executes them. */

  var THEME_KEY = "siteTheme.v1";
  var ZEN_KEY = "siteZen";       // sessionStorage: survives in-tab language switches only
  var POMO_KEY = "sitePomodoro.v1";

  /* ---------- theme ---------- */
  function initTheme() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    function icon() {
      btn.textContent = document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙";
    }
    btn.addEventListener("click", function () {
      var dark = document.documentElement.getAttribute("data-theme") === "dark";
      if (dark) document.documentElement.removeAttribute("data-theme");
      else document.documentElement.setAttribute("data-theme", "dark");
      try { localStorage.setItem(THEME_KEY, dark ? "light" : "dark"); } catch (e) {}
      icon();
    });
    icon();
  }

  /* ---------- zen mode ---------- */
  var zenPill = null;
  function setZen(on) {
    if (document.body.classList.contains("landing")) on = false;
    document.body.classList.toggle("zen", on);
    try { sessionStorage.setItem(ZEN_KEY, on ? "1" : ""); } catch (e) {}
    if (on && !zenPill) {
      zenPill = el("button", { class: "zen-exit", type: "button", onclick: function () { setZen(false); } },
        ["⛶ exit zen · z"]);
      document.body.appendChild(zenPill);
    }
  }
  function initZen() {
    var btn = document.getElementById("zen-toggle");
    if (btn) btn.addEventListener("click", function () {
      setZen(!document.body.classList.contains("zen"));
    });
    try { if (sessionStorage.getItem(ZEN_KEY) === "1") setZen(true); } catch (e) {}
  }

  /* ---------- keyboard shortcuts + help overlay ---------- */
  var overlay = null;
  function ensureOverlay() {
    if (overlay) return overlay;
    function row(keys, what) {
      return el("div", { class: "kbd-row" }, [
        el("span", { text: what }),
        el("span", { class: "kbd-keys", html: keys })
      ]);
    }
    var panel = el("div", { class: "kbd-panel" }, [
      el("h2", { text: "Keyboard shortcuts" }),
      row("<kbd>←</kbd> <kbd>→</kbd>", "Previous / next lesson"),
      row("<kbd>h</kbd>", "Course home"),
      row("<kbd>g</kbd>", "Glossary"),
      row("<kbd>r</kbd>", "Flashcard review"),
      row("<kbd>/</kbd>", "Focus search"),
      row("<kbd>z</kbd>", "Zen mode (hide everything but the lesson)"),
      row("<kbd>?</kbd>", "This help"),
      row("<kbd>Esc</kbd>", "Close / exit"),
      el("p", { class: "kbd-hint", text: "Shortcuts pause automatically while you're typing in an exercise." })
    ]);
    // row() uses html for the kbd markup
    overlay = el("div", { class: "kbd-overlay", onclick: function (e) { if (e.target === overlay) toggleOverlay(false); } }, [panel]);
    overlay.hidden = true;
    document.body.appendChild(overlay);
    return overlay;
  }
  function toggleOverlay(show) {
    var o = ensureOverlay();
    o.hidden = show === undefined ? !o.hidden : !show;
  }

  function initShortcuts() {
    var help = document.getElementById("kbd-help");
    if (help) help.addEventListener("click", function () { toggleOverlay(); });

    document.addEventListener("keydown", function (e) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.isComposing) return;

      // Escape always works: close overlay > blur input > exit zen
      if (e.key === "Escape") {
        if (overlay && !overlay.hidden) { toggleOverlay(false); return; }
        var a = document.activeElement;
        if (a && /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName)) { a.blur(); return; }
        if (document.body.classList.contains("zen")) setZen(false);
        return;
      }

      // don't hijack typing
      var t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;

      if (e.key === "?") { toggleOverlay(); e.preventDefault(); return; }
      if (overlay && !overlay.hidden) return;            // overlay swallows the rest
      if (document.body.classList.contains("landing")) return;

      var hash = (location.hash || "").replace("#", "");
      var lessons = window.COURSE && window.COURSE.lessons;

      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        var id = hash.indexOf("lesson/") === 0 ? hash.slice(7) : (/^\d+$/.test(hash) ? hash : null);
        if (!id || !lessons || !lessons.length) return;
        var ids = lessons.map(function (l) { return l.id; });
        var pos = ids.indexOf(id);
        if (pos === -1) return;
        var next = e.key === "ArrowRight" ? pos + 1 : pos - 1;
        if (next < 0 || next >= ids.length) return;
        location.hash = "lesson/" + ids[next];
        e.preventDefault();
      }
      else if (e.key === "h") location.hash = "home";
      else if (e.key === "g") location.hash = "glossary";
      else if (e.key === "r") location.hash = "review";
      else if (e.key === "z") setZen(!document.body.classList.contains("zen"));
      else if (e.key === "/") {
        e.preventDefault();
        var target = document.getElementById("dash-search") || document.getElementById("glossary-search");
        if (target) { target.focus(); return; }
        location.hash = "home";
        setTimeout(function () {
          var s = document.getElementById("dash-search");
          if (s) s.focus();
        }, 80);
      }
    });
  }

  /* ---------- pomodoro (25 focus / 5 break) ---------- */
  var FOCUS_MS = 25 * 60 * 1000;
  var BREAK_MS = 5 * 60 * 1000;
  var pomoTimer = null;
  var baseTitle = "";

  function pomoLoad() {
    try { return JSON.parse(localStorage.getItem(POMO_KEY)) || null; } catch (e) { return null; }
  }
  function pomoSave(s) {
    try {
      if (s) localStorage.setItem(POMO_KEY, JSON.stringify(s));
      else localStorage.removeItem(POMO_KEY);
    } catch (e) {}
  }
  function phaseLen(phase) { return phase === "break" ? BREAK_MS : FOCUS_MS; }

  function initPomodoro() {
    var box = document.getElementById("pomodoro");
    if (!box) return;
    baseTitle = document.title;

    var label = el("span", { class: "pomo-label", text: "focus" });
    var time = el("span", { class: "pomo-time", text: "25:00" });
    var startBtn = el("button", { class: "tool-btn", type: "button", title: "Start/pause pomodoro" }, ["▶"]);
    var resetBtn = el("button", { class: "tool-btn", type: "button", title: "Reset pomodoro" }, ["↺"]);
    box.appendChild(label); box.appendChild(time); box.appendChild(startBtn); box.appendChild(resetBtn);

    var state = pomoLoad() || { phase: "focus", running: false, remaining: FOCUS_MS };

    function remainingNow() {
      return state.running ? Math.max(0, state.endAt - Date.now()) : state.remaining;
    }
    function fmt(ms) {
      var s = Math.round(ms / 1000);
      return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
    }
    function render() {
      var ms = remainingNow();
      time.textContent = fmt(ms);
      label.textContent = state.phase;
      box.setAttribute("data-state", state.running ? state.phase : "paused-" + state.phase);
      startBtn.textContent = state.running ? "⏸" : "▶";
      document.title = state.running ? "(" + fmt(ms) + ") " + baseTitle : baseTitle;
    }
    function stopTimer() { if (pomoTimer) { clearInterval(pomoTimer); pomoTimer = null; } }
    function phaseEnd() {
      stopTimer();
      var finished = state.phase;
      state = { phase: finished === "focus" ? "break" : "focus", running: false, remaining: phaseLen(finished === "focus" ? "break" : "focus") };
      pomoSave(state);
      render();
      // flash the tab title a few times so the phase change is noticeable
      var msg = finished === "focus" ? "🍅 Break time!" : "🍅 Back to focus!";
      var flashes = 0;
      var fl = setInterval(function () {
        document.title = (flashes % 2 === 0) ? msg : baseTitle;
        if (++flashes >= 6) { clearInterval(fl); render(); }
      }, 800);
    }
    function tick() {
      if (remainingNow() <= 0) { phaseEnd(); return; }
      render();
    }
    function start() {
      state = { phase: state.phase, running: true, endAt: Date.now() + remainingNow() };
      pomoSave(state);
      stopTimer();
      pomoTimer = setInterval(tick, 1000);
      render();
    }
    function pause() {
      state = { phase: state.phase, running: false, remaining: remainingNow() };
      pomoSave(state);
      stopTimer();
      render();
    }
    startBtn.addEventListener("click", function () { state.running ? pause() : start(); });
    resetBtn.addEventListener("click", function () {
      stopTimer();
      state = { phase: "focus", running: false, remaining: FOCUS_MS };
      pomoSave(null);
      render();
    });

    // hydrate: resume a running timer, or advance one phase if it expired while away
    if (state.running) {
      if (state.endAt > Date.now()) { pomoTimer = setInterval(tick, 1000); }
      else { phaseEnd(); }
    }
    render();
    box.hidden = false;
  }

  function boot() {
    document.getElementById("brand").addEventListener("click", function (e) {
      e.preventDefault();
      goHome();
    });
    var code = chosenLang();
    if (code && LANGS[code] && MANIFEST[code]) loadLanguage(code);
    else renderLanding();

    initTheme();
    initZen();
    initShortcuts();
    initPomodoro(); // after renderHeader/renderLanding so it captures the right base title
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
