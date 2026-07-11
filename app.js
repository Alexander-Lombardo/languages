/* Unified language course engine — rendering + audio + exercises + SRS + dashboard.
   Pure vanilla JS, no dependencies, no network. Parameterized per language via cfg
   (see config.js); loader.js injects the selected language's data files and then
   calls window.startCourse(cfg). State persists in localStorage, per-language keys. */
window.startCourse = function (cfg) {
  "use strict";

  var COURSE = window.COURSE || { lessons: [], units: [], levels: [], outline: [] };
  var F = cfg.field; // property holding target-language text in data files (fr/de/ru/it/es)
  var STORE_KEY = cfg.storeKey;
  var SRS_KEY = cfg.srsKey;
  var STREAK_KEY = cfg.streakKey;

  /* ---------- tiny DOM helpers ---------- */
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "class") node.className = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
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
  function lessonById(id) {
    for (var i = 0; i < COURSE.lessons.length; i++)
      if (COURSE.lessons[i].id === id) return COURSE.lessons[i];
    return null;
  }
  function levelOfId(id) {
    var l = lessonById(id);
    if (l && l.level) return l.level;
    for (var i = 0; i < (COURSE.outline || []).length; i++)
      if (COURSE.outline[i].id === id) return COURSE.outline[i].level;
    return "";
  }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }
  function today() { return Math.floor(Date.now() / 86400000); }

  /* ---------- text-to-speech (Web Speech API) ---------- */
  var TTS = !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  function pickVoice() {
    if (!TTS) return null;
    var voices = window.speechSynthesis.getVoices() || [];
    var prefs = cfg.voicePrefs;
    for (var p = 0; p < prefs.length; p++) {
      for (var i = 0; i < voices.length; i++) {
        if ((voices[i].lang || "").toLowerCase().replace("_", "-").indexOf(prefs[p]) === 0)
          return voices[i];
      }
    }
    return null;
  }
  function speak(text) {
    if (!TTS || !text) return false;
    try {
      window.speechSynthesis.cancel();
      // "hi / hello" would be read run-together; a comma makes TTS pause between alternatives
      var u = new SpeechSynthesisUtterance(String(text).replace(/\s*\/\s*/g, ", "));
      var v = pickVoice();
      if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = cfg.ttsLang; }
      u.rate = 0.95;
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }
  if (TTS && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = function () { /* voices now cached */ };
  }
  function audioBtn(text, extraClass) {
    if (!TTS || !text) return null;
    return el("button", {
      class: "audio-btn" + (extraClass ? " " + extraClass : ""),
      type: "button", title: "Listen", "aria-label": "Listen",
      onclick: function (e) { e.stopPropagation(); speak(text); }
    }, ["🔊"]);
  }

  /* ---------- progress (localStorage) ---------- */
  function loadProgress() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; }
    catch (e) { return {}; }
  }
  function saveProgress(p) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(p)); } catch (e) {}
  }
  function recordScore(id, correct, total) {
    var p = loadProgress();
    var prev = p[id] || { best: 0, total: total, done: false };
    p[id] = {
      best: Math.max(prev.best || 0, correct),
      total: total,
      done: prev.done || correct === total
    };
    saveProgress(p);
    touchStreak();
    var lesson = lessonById(id);
    if (lesson) srsSeedFromLesson(lesson);
    renderNav();
  }

  /* ---------- daily streak ---------- */
  function loadStreak() {
    try { return JSON.parse(localStorage.getItem(STREAK_KEY)) || { last: -1, count: 0 }; }
    catch (e) { return { last: -1, count: 0 }; }
  }
  function touchStreak() {
    var s = loadStreak();
    var d = today();
    if (s.last === d) return s;
    if (s.last === d - 1) s.count = (s.count || 0) + 1;
    else s.count = 1;
    s.last = d;
    try { localStorage.setItem(STREAK_KEY, JSON.stringify(s)); } catch (e) {}
    return s;
  }
  function streakCount() {
    var s = loadStreak();
    if (s.last === today() || s.last === today() - 1) return s.count || 0;
    return 0; // streak lapsed
  }

  /* ---------- spaced-repetition deck (SRS) ---------- */
  function loadSRS() {
    try { return JSON.parse(localStorage.getItem(SRS_KEY)) || { cards: {} }; }
    catch (e) { return { cards: {} }; }
  }
  function saveSRS(d) {
    try { localStorage.setItem(SRS_KEY, JSON.stringify(d)); } catch (e) {}
  }
  function srsKey(s) { return String(s).trim().toLowerCase(); }
  function srsDeckItems(lesson) {
    var items = (lesson.flashcards && lesson.flashcards.length) ? lesson.flashcards : lesson.vocab;
    return (items || []).filter(function (v) { return v && v[F] && v.en; });
  }
  function srsSeedFromLesson(lesson) {
    var d = loadSRS();
    var changed = false;
    srsDeckItems(lesson).forEach(function (v) {
      var k = srsKey(v[F]);
      if (!d.cards[k]) {
        var card = { en: v.en, lessonId: lesson.id, ease: 2.3, interval: 0, due: today() };
        card[F] = v[F];
        d.cards[k] = card;
        changed = true;
      }
    });
    if (changed) saveSRS(d);
  }
  function srsDue() {
    var d = loadSRS();
    var t = today();
    return Object.keys(d.cards)
      .map(function (k) { return d.cards[k]; })
      .filter(function (c) { return (c.due || 0) <= t; });
  }
  function srsCount() {
    var d = loadSRS();
    return Object.keys(d.cards).length;
  }
  function srsGrade(card, grade) { // grade: 0 again, 1 hard, 2 good, 3 easy
    var d = loadSRS();
    var c = d.cards[srsKey(card[F])];
    if (!c) return;
    if (grade === 0) {
      c.interval = 0;
      c.ease = Math.max(1.3, (c.ease || 2.3) - 0.2);
    } else {
      if (!c.interval) c.interval = grade === 1 ? 1 : (grade === 2 ? 1 : 2);
      else if (c.interval === 1) c.interval = grade === 1 ? 2 : (grade === 2 ? 3 : 5);
      else c.interval = Math.max(c.interval + 1, Math.round(c.interval * (grade === 1 ? 1.2 : (c.ease || 2.3) * (grade === 3 ? 1.3 : 1))));
      c.ease = Math.min(2.8, Math.max(1.3, (c.ease || 2.3) + (grade === 1 ? -0.05 : grade === 3 ? 0.1 : 0)));
    }
    c.due = today() + c.interval;
    saveSRS(d);
  }

  /* ---------- answer normalisation ---------- */
  function normalize(s) {
    return String(s)
      .trim()
      .toLowerCase()
      .replace(/[’`]/g, "'")
      .replace(/\s+/g, " ")
      .replace(/[.!?¿¡;:]+$/g, "");
  }
  function stripAccents(s) {
    return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
  }
  function loose(s) {
    return stripAccents(normalize(s)).replace(/['’]/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim();
  }
  // sequence form for word-order grading: drop ALL punctuation & accents, keep word order
  function seqNorm(s) {
    return stripAccents(String(s).toLowerCase())
      .replace(/[¿¡?!.,;:"“”'’«»()]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  function judge(input, answers) {
    var ni = normalize(input);
    if (!ni) return "no";
    for (var i = 0; i < answers.length; i++)
      if (ni === normalize(answers[i])) return "exact";
    for (var j = 0; j < answers.length; j++)
      if (loose(ni) === loose(answers[j])) return "accent";
    return "no";
  }
  function asAnswers(ex) {
    if (ex.answers && ex.answers.length) return ex.answers;
    if (ex.answer != null) return [ex.answer];
    return [];
  }

  /* ---------- sidebar navigation ---------- */
  function renderNav() {
    var nav = document.getElementById("sidebar");
    if (!nav) return;
    var progress = loadProgress();
    var hash = (location.hash || "").replace("#", "");
    var currentId = hash.indexOf("lesson/") === 0 ? hash.slice(7) : "";
    nav.innerHTML = "";

    nav.appendChild(el("a", {
      class: "nav-home" + (hash === "" || hash === "home" ? " active" : ""),
      href: "#home", html: "🏠 Course home"
    }));
    nav.appendChild(el("a", {
      class: "nav-tool" + (hash === "review" ? " active" : ""),
      href: "#review", text: "🃏 Flashcard review"
    }));
    nav.appendChild(el("a", {
      class: "nav-tool" + (hash === "glossary" ? " active" : ""),
      href: "#glossary", text: "📖 Glossary"
    }));

    (COURSE.units || []).forEach(function (unit) {
      nav.appendChild(el("div", { class: "nav-unit", text: unit.name }));
      unit.ids.forEach(function (id) {
        var lesson = lessonById(id);
        var out = (COURSE.outline || []).filter(function (o) { return o.id === id; })[0];
        var title = lesson ? lesson.title : (out ? out.title : id);
        var level = lesson ? lesson.level : (out ? out.level : "");
        var pr = progress[id];
        var link = el("a", {
          class: "nav-lesson" + (id === currentId ? " active" : "") + (lesson ? "" : " disabled"),
          href: lesson ? "#lesson/" + id : "javascript:void 0"
        }, [
          el("span", { class: "nav-num", text: id }),
          el("span", { class: "nav-title", text: title }),
          el("span", { class: "nav-badge badge-" + String(level).replace(/[^A-Za-z0-9]/g, ""), text: level })
        ]);
        if (pr && pr.done) link.insertBefore(el("span", { class: "nav-done", text: "✓" }), link.firstChild);
        nav.appendChild(link);
      });
    });
  }

  /* ---------- dashboard / home ---------- */
  function firstIncompleteId() {
    var progress = loadProgress();
    var ids = (COURSE.outline || []).map(function (o) { return o.id; });
    for (var i = 0; i < ids.length; i++) {
      if (!lessonById(ids[i])) continue;
      if (!(progress[ids[i]] && progress[ids[i]].done)) return ids[i];
    }
    return ids.length ? ids[0] : null;
  }
  function levelStats(code) {
    var progress = loadProgress();
    var ids = (COURSE.outline || []).filter(function (o) { return o.level === code; }).map(function (o) { return o.id; });
    var done = ids.filter(function (id) { return progress[id] && progress[id].done; }).length;
    return { total: ids.length, done: done, ids: ids };
  }

  function renderHome() {
    var c = document.getElementById("content");
    c.innerHTML = "";
    var progress = loadProgress();
    var doneCount = Object.keys(progress).filter(function (k) { return progress[k].done; }).length;
    var total = (COURSE.outline || []).length || COURSE.lessons.length;
    var due = srsDue().length;

    c.appendChild(el("h1", { html: cfg.flag + " " + cfg.name + " A1 → C2" }));
    c.appendChild(el("p", { class: "lead", text:
      "A complete self-study course from absolute beginner to mastery. Read each lesson, listen to the audio, then drill with interactive exercises and spaced-repetition flashcards." }));

    // stat tiles
    c.appendChild(el("div", { class: "stat-row" }, [
      el("div", { class: "stat" }, [el("div", { class: "stat-num", text: doneCount + "/" + total }), el("div", { class: "stat-label", text: "lessons done" })]),
      el("div", { class: "stat" }, [el("div", { class: "stat-num", text: "🔥 " + streakCount() }), el("div", { class: "stat-label", text: "day streak" })]),
      el("div", { class: "stat" }, [el("div", { class: "stat-num", text: String(due) }), el("div", { class: "stat-label", text: "cards due" })]),
      el("div", { class: "stat" }, [el("div", { class: "stat-num", text: String(srsCount()) }), el("div", { class: "stat-label", text: "words learned" })])
    ]));

    var cont = firstIncompleteId();
    var actions = el("div", { class: "home-actions" }, [
      cont ? el("a", { class: "btn primary", href: "#lesson/" + cont, text: (doneCount ? "Continue · Lesson " + cont + " →" : "Start · Lesson 00 →") }) : null,
      el("a", { class: "btn ghost", href: "#review", text: "🃏 Review " + due + " card" + (due === 1 ? "" : "s") }),
      el("a", { class: "btn ghost", href: "#glossary", text: "📖 Glossary" })
    ]);
    c.appendChild(actions);

    if (!TTS) {
      c.appendChild(el("p", { class: "warn", text:
        "Note: your browser doesn't expose speech synthesis, so the 🔊 listen buttons are hidden. Everything else works." }));
    }

    // level cards
    c.appendChild(el("h2", { class: "sec-title", text: "Levels" }));
    var grid = el("div", { class: "level-grid" });
    (COURSE.levels || []).forEach(function (lv) {
      var st = levelStats(lv.code);
      var pct = st.total ? Math.round((st.done / st.total) * 100) : 0;
      var firstId = st.ids[0];
      var firstLoaded = st.ids.filter(function (id) { return lessonById(id); })[0] || firstId;
      var card = el("a", { class: "level-card", href: firstLoaded ? "#lesson/" + firstLoaded : "javascript:void 0" }, [
        el("div", { class: "level-top" }, [
          el("span", { class: "level-badge badge-" + lv.code, text: lv.code }),
          el("span", { class: "level-name", text: lv.name })
        ]),
        el("p", { class: "level-blurb", text: lv.blurb }),
        el("div", { class: "bar" }, [el("div", { class: "bar-fill", style: "width:" + pct + "%" })]),
        el("div", { class: "level-meta", text: st.done + " / " + st.total + " lessons · " + pct + "%" })
      ]);
      grid.appendChild(card);
    });
    c.appendChild(grid);

    var howto = el("div", { class: "card" }, [
      el("h2", { text: "How to use this" }),
      el("ul", {}, [
        el("li", { html: "Work through lessons <strong>in order</strong> — each level builds on the last." }),
        el("li", { html: "Tap any <strong>🔊</strong> to hear native-style " + cfg.name + " (uses your device's voice)." }),
        el("li", { html: "Do the <strong>Exercises</strong> — fill-in, multiple choice, translation, listening, matching, sentence-building and conjugation, all auto-checked." }),
        el("li", { html: "Finished lessons feed the <strong>Flashcard review</strong> — a spaced-repetition deck that brings words back just before you'd forget them." }),
        el("li", { html: "Progress, scores and your streak save automatically in this browser." })
      ])
    ]);
    c.appendChild(howto);
    window.scrollTo(0, 0);
  }

  /* ---------- lesson content sections ---------- */
  function sectionTitle(t) { return el("h2", { class: "sec-title", text: t }); }

  function renderVocab(lesson) {
    if (!lesson.vocab || !lesson.vocab.length) return null;
    var rows = [el("tr", {}, [
      TTS ? el("th", { text: "" }) : null,
      el("th", { text: cfg.name }), el("th", { text: "Say it like" }), el("th", { text: "English" })
    ])];
    lesson.vocab.forEach(function (v) {
      rows.push(el("tr", {}, [
        TTS ? el("td", { class: "audio-cell" }, [audioBtn(v[F])]) : null,
        el("td", { class: "l2", text: v[F] }),
        el("td", { class: "say", text: v.say || "" }),
        el("td", { text: v.en })
      ]));
    });
    return el("section", {}, [sectionTitle("Vocabulary"), el("table", { class: "vocab" }, [el("tbody", {}, rows)])]);
  }

  function renderDialogue(lesson) {
    if (!lesson.dialogue || !lesson.dialogue.length) return null;
    var lines = lesson.dialogue.map(function (d) {
      return el("p", { class: "dline" }, [
        audioBtn(d[F], "inline"),
        d.sp ? el("span", { class: "spk", text: d.sp + ": " }) : null,
        el("span", { class: "l2", text: d[F] }),
        el("span", { class: "en", text: " — " + d.en })
      ]);
    });
    var wrap = el("div", { class: "dialogue show-en" }, lines);
    var toggle = el("button", { class: "btn small", onclick: function () {
      wrap.classList.toggle("show-en");
      toggle.textContent = wrap.classList.contains("show-en") ? "Hide English" : "Show English";
    } }, ["Hide English"]);
    var playAll = TTS ? el("button", { class: "btn small ghost", onclick: function () {
      speak(lesson.dialogue.map(function (d) { return d[F]; }).join(". "));
    } }, ["🔊 Play all"]) : null;
    return el("section", {}, [sectionTitle("Dialogue"), el("div", { class: "row-controls" }, [toggle, playAll]), wrap]);
  }

  function renderReading(lesson) {
    if (!lesson.reading || !lesson.reading[F]) return null;
    var r = lesson.reading;
    var l2Paras = String(r[F]).split(/\n\n+/);
    var enParas = String(r.en || "").split(/\n\n+/);
    var l2Wrap = el("div", { class: "reading-l2" }, l2Paras.map(function (p) {
      return el("p", {}, [audioBtn(p, "inline"), el("span", { text: p })]);
    }));
    var enWrap = el("div", { class: "reading-en" }, enParas.map(function (p) { return el("p", { text: p }); }));
    var box = el("div", { class: "reading show-en" }, [l2Wrap, enWrap]);
    var toggle = el("button", { class: "btn small", onclick: function () {
      box.classList.toggle("show-en");
      toggle.textContent = box.classList.contains("show-en") ? "Hide translation" : "Show translation";
    } }, ["Hide translation"]);
    var playAll = TTS ? el("button", { class: "btn small ghost", onclick: function () { speak(r[F]); } }, ["🔊 Play all"]) : null;
    return el("section", {}, [
      sectionTitle("Reading" + (r.title ? " — " + r.title : "")),
      el("div", { class: "row-controls" }, [toggle, playAll]), box
    ]);
  }

  function renderDiscussion(lesson) {
    if (!lesson.discussion || !lesson.discussion.length) return null;
    var items = lesson.discussion.map(function (q) {
      var text = typeof q === "string" ? q : q[F];
      var gloss = typeof q === "object" ? q.en : null;
      return el("li", {}, [audioBtn(text, "inline"), el("span", { class: "l2", text: text }), gloss ? el("span", { class: "en", text: " — " + gloss }) : null]);
    });
    return el("section", { class: "discussion" }, [
      sectionTitle("Speaking & discussion"),
      el("p", { class: "muted", text: "Answer aloud in full sentences, or write a few lines. Use the read-aloud prompt below to practise with an AI tutor." }),
      el("ul", {}, items)
    ]);
  }

  /* ---------- exercises ---------- */
  function renderExercises(lesson, scoreState) {
    if (!lesson.exercises || !lesson.exercises.length) return null;
    var sec = el("section", { class: "exercises" }, [sectionTitle("Exercises")]);
    var scoreLine = el("p", { class: "score-line" });
    sec.appendChild(scoreLine);

    function updateScore() {
      var correct = 0;
      scoreState.results.forEach(function (r) { if (r === "correct") correct++; });
      scoreLine.textContent = "Score: " + correct + " / " + scoreState.results.length;
      if (scoreState.results.every(function (r) { return r !== null; })) {
        recordScore(lesson.id, correct, scoreState.results.length);
      }
    }

    lesson.exercises.forEach(function (ex, i) {
      scoreState.results.push(null);
      var card = el("div", { class: "ex-card" });
      card.appendChild(el("p", { class: "ex-instr", html: "<strong>" + (i + 1) + ".</strong> " + ex.instructions }));
      var feedback = el("p", { class: "ex-feedback" });

      function mark(state, msg) {
        scoreState.results[i] = state;
        feedback.className = "ex-feedback " + (state === "correct" ? "ok" : "bad");
        feedback.innerHTML = msg;
        updateScore();
      }

      if (ex.type === "fill") {
        renderFill(ex, card, feedback, mark);
      } else if (ex.type === "mc") {
        renderMC(ex, card, feedback, mark);
      } else if (ex.type === "translate") {
        renderTranslate(ex, card, feedback, mark);
      } else if (ex.type === "listen") {
        renderListen(ex, card, feedback, mark);
      } else if (ex.type === "match") {
        renderMatch(ex, card, feedback, mark);
      } else if (ex.type === "order") {
        renderOrder(ex, card, feedback, mark);
      } else if (ex.type === "conjugate") {
        renderConjugate(ex, card, feedback, mark);
      } else {
        card.appendChild(el("p", { class: "muted", text: "(unknown exercise type: " + ex.type + ")" }));
        scoreState.results[i] = "correct"; // don't block scoring
      }

      card.appendChild(feedback);
      sec.appendChild(card);
    });

    var reset = el("button", { class: "btn small ghost", onclick: function () { location.reload(); } }, ["Reset exercises"]);
    sec.appendChild(reset);
    updateScore();
    return sec;
  }

  function revealLink(answers, feedback, label) {
    return el("a", { class: "ex-show", href: "javascript:void 0", onclick: function () {
      feedback.className = "ex-feedback";
      feedback.innerHTML = (label || "Answer") + ": <strong>" + answers[0] + "</strong>";
    }, text: "Show answer" });
  }

  function renderFill(ex, card, feedback, mark) {
    var answers = asAnswers(ex);
    var input = el("input", { class: "ex-input", type: "text", placeholder: "your answer", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
    var line = el("p", { class: "ex-fill" }, [
      ex.before ? el("span", { text: ex.before + " " }) : null,
      input,
      ex.after ? el("span", { text: " " + ex.after }) : null,
      ex.cue ? el("span", { class: "ex-cue", text: " (" + ex.cue + ")" }) : null
    ]);
    var check = el("button", { class: "btn small", onclick: function () {
      var v = judge(input.value, answers);
      if (v === "exact") mark("correct", "✓ Correct!");
      else if (v === "accent") mark("correct", "✓ Correct! Watch the accents: <strong>" + answers[0] + "</strong>");
      else mark("incorrect", "✗ Not quite. Answer: <strong>" + answers[0] + "</strong>");
    } }, ["Check"]);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check.click(); });
    card.appendChild(line);
    card.appendChild(el("div", { class: "ex-controls" }, [check, revealLink(answers, feedback)]));
  }

  function renderMC(ex, card, feedback, mark) {
    if (ex.prompt) card.appendChild(el("p", { class: "ex-prompt", text: ex.prompt }));
    var choicesWrap = el("div", { class: "mc-choices" });
    var locked = false;
    ex.choices.forEach(function (choice) {
      var b = el("button", { class: "mc-choice", onclick: function () {
        if (locked) return;
        locked = true;
        if (normalize(choice) === normalize(ex.answer)) { b.classList.add("right"); mark("correct", "✓ Correct!"); }
        else {
          b.classList.add("wrong");
          mark("incorrect", "✗ Answer: <strong>" + ex.answer + "</strong>");
          Array.prototype.forEach.call(choicesWrap.children, function (cb) {
            if (normalize(cb.textContent) === normalize(ex.answer)) cb.classList.add("right");
          });
        }
      } }, [choice]);
      choicesWrap.appendChild(b);
    });
    card.appendChild(choicesWrap);
  }

  function renderTranslate(ex, card, feedback, mark) {
    var answers = asAnswers(ex);
    if (ex.prompt) card.appendChild(el("p", { class: "ex-prompt", text: "“" + ex.prompt + "”" }));
    var input = el("input", { class: "ex-input wide", type: "text", placeholder: "type in " + cfg.name + "…", autocomplete: "off", spellcheck: "false" });
    var check = el("button", { class: "btn small", onclick: function () {
      var v = judge(input.value, answers);
      if (v === "exact") mark("correct", "✓ Correct!");
      else if (v === "accent") mark("correct", "✓ Correct! Watch the accents: <strong>" + answers[0] + "</strong>");
      else mark("incorrect", "✗ One good answer: <strong>" + answers[0] + "</strong>");
    } }, ["Check"]);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check.click(); });
    card.appendChild(el("div", { class: "ex-controls" }, [input, check, revealLink(answers, feedback, "Sample answer")]));
  }

  function renderListen(ex, card, feedback, mark) {
    var answers = asAnswers(ex);
    var phrase = ex.audio || answers[0];
    if (!TTS) {
      // graceful fallback: show the text so the exercise is still doable
      card.appendChild(el("p", { class: "muted", text: "(Audio unavailable in this browser — here is the phrase to transcribe:) " + phrase }));
    }
    var play = el("button", { class: "btn small", onclick: function () { speak(phrase); } }, ["🔊 Play again"]);
    var input = el("input", { class: "ex-input wide", type: "text", placeholder: "type what you hear…", autocomplete: "off", spellcheck: "false" });
    var check = el("button", { class: "btn small", onclick: function () {
      var v = judge(input.value, answers);
      if (v === "exact") mark("correct", "✓ Correct!");
      else if (v === "accent") mark("correct", "✓ Correct! Watch the accents: <strong>" + answers[0] + "</strong>");
      else mark("incorrect", "✗ It was: <strong>" + answers[0] + "</strong>");
    } }, ["Check"]);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check.click(); });
    if (TTS) speak(phrase);
    card.appendChild(el("div", { class: "ex-controls" }, [play, input, check, revealLink(answers, feedback)]));
  }

  function renderMatch(ex, card, feedback, mark) {
    var pairs = ex.pairs || [];
    var total = pairs.length, matched = 0;
    var selected = null; // {side, key, btn}
    var grid = el("div", { class: "match-grid" });
    var left = el("div", { class: "match-col" });
    var right = el("div", { class: "match-col" });

    function makeTile(side, key, label) {
      var b = el("button", { class: "match-tile", type: "button" }, [label]);
      b.addEventListener("click", function () {
        if (b.classList.contains("done")) return;
        if (selected && selected.side === side) { // re-pick same side
          selected.btn.classList.remove("sel"); selected = null;
        }
        if (!selected) {
          selected = { side: side, key: key, btn: b };
          b.classList.add("sel");
          return;
        }
        // selected is the other side
        var ok = selected.key === key;
        var other = selected.btn;
        selected.btn.classList.remove("sel");
        selected = null;
        if (ok) {
          b.classList.add("done"); other.classList.add("done");
          matched++;
          if (matched === total) mark("correct", "✓ All matched!");
        } else {
          b.classList.add("miss"); other.classList.add("miss");
          setTimeout(function () { b.classList.remove("miss"); other.classList.remove("miss"); }, 500);
        }
      });
      return b;
    }

    shuffle(pairs.map(function (p, i) { return i; })).forEach(function (i) {
      left.appendChild(makeTile("l2", i, pairs[i][F]));
    });
    shuffle(pairs.map(function (p, i) { return i; })).forEach(function (i) {
      right.appendChild(makeTile("en", i, pairs[i].en));
    });
    grid.appendChild(left); grid.appendChild(right);
    card.appendChild(el("p", { class: "muted", text: "Tap a " + cfg.name + " tile, then its English match." }));
    card.appendChild(grid);
  }

  function renderOrder(ex, card, feedback, mark) {
    var answer = (asAnswers(ex)[0]) || "";
    var tokens = ex.tokens || [];
    var bank = el("div", { class: "order-bank" });
    var build = el("div", { class: "order-build" });

    function addToBuild(tok, fromBtn) {
      var t = el("button", { class: "tok", type: "button" }, [tok]);
      t.addEventListener("click", function () { build.removeChild(t); fromBtn.style.display = ""; });
      build.appendChild(t);
      fromBtn.style.display = "none";
    }
    shuffle(tokens).forEach(function (tok) {
      var b = el("button", { class: "tok", type: "button" }, [tok]);
      b.addEventListener("click", function () { addToBuild(tok, b); });
      bank.appendChild(b);
    });
    var check = el("button", { class: "btn small", onclick: function () {
      var built = Array.prototype.map.call(build.children, function (c) { return c.textContent; }).join(" ");
      if (seqNorm(built) === seqNorm(answer)) mark("correct", "✓ Correct!");
      else mark("incorrect", "✗ Answer: <strong>" + answer + "</strong>");
    } }, ["Check"]);
    card.appendChild(el("p", { class: "muted", text: "Tap the words in order to build the sentence. Tap a chosen word to send it back." }));
    card.appendChild(build);
    card.appendChild(bank);
    card.appendChild(el("div", { class: "ex-controls" }, [check, revealLink([answer], feedback)]));
  }

  function renderConjugate(ex, card, feedback, mark) {
    var rows = ex.rows || [];
    var inputs = [];
    if (ex.verb) card.appendChild(el("p", { class: "ex-prompt", text: "Verb: " + ex.verb }));
    var table = el("table", { class: "conj-table" });
    var tbody = el("tbody", {});
    rows.forEach(function (r) {
      var inp = el("input", { class: "ex-input", type: "text", placeholder: "…", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
      inputs.push({ inp: inp, answer: r.answer });
      tbody.appendChild(el("tr", {}, [
        el("td", { class: "conj-pron", text: r.pronoun }),
        el("td", {}, [inp])
      ]));
    });
    table.appendChild(tbody);
    var check = el("button", { class: "btn small", onclick: function () {
      var allRight = true, anyWrong = [];
      inputs.forEach(function (it) {
        var v = judge(it.inp.value, [it.answer]);
        if (v === "no") { allRight = false; it.inp.classList.add("wrong-input"); anyWrong.push(it.answer); }
        else it.inp.classList.remove("wrong-input");
      });
      if (allRight) mark("correct", "✓ Correct!");
      else mark("incorrect", "✗ Check: <strong>" + anyWrong.join(", ") + "</strong>");
    } }, ["Check all"]);
    card.appendChild(table);
    card.appendChild(el("div", { class: "ex-controls" }, [check]));
  }

  /* ---------- per-lesson flashcards (quick local deck) ---------- */
  function renderFlashcards(lesson) {
    var deck = (lesson.flashcards && lesson.flashcards.length) ? lesson.flashcards : lesson.vocab;
    if (!deck || !deck.length) return null;

    var order = [], idx = 0, frontL2 = true, flipped = false;
    function reset() { order = deck.map(function (_, i) { return i; }); idx = 0; flipped = false; }
    reset();

    var sec = el("section", {}, [sectionTitle("Flashcards")]);
    var dirBtn = el("button", { class: "btn small ghost" });
    var counter = el("span", { class: "fc-counter" });
    var card = el("div", { class: "flashcard" });
    var sayBtn = TTS ? el("button", { class: "btn small ghost", text: "🔊 Say it" }) : null;
    var gotIt = el("button", { class: "btn small", text: "Got it ✓" });
    var review = el("button", { class: "btn small ghost", text: "Review ↻" });
    var restart = el("button", { class: "btn small ghost", text: "Restart deck" });

    function current() { return deck[order[idx % order.length]]; }
    function draw() {
      if (!order.length) {
        card.className = "flashcard done"; card.textContent = "🎉 Deck complete!";
        counter.textContent = ""; gotIt.disabled = review.disabled = true;
        if (sayBtn) sayBtn.disabled = true;
        return;
      }
      gotIt.disabled = review.disabled = false;
      if (sayBtn) sayBtn.disabled = false;
      flipped = false;
      var item = current();
      card.className = "flashcard";
      card.textContent = frontL2 ? item[F] : item.en;
      counter.textContent = order.length + " card" + (order.length > 1 ? "s" : "") + " left";
    }
    card.addEventListener("click", function () {
      if (!order.length) return;
      var item = current();
      flipped = !flipped;
      card.textContent = flipped ? (frontL2 ? item.en : item[F]) : (frontL2 ? item[F] : item.en);
      card.classList.toggle("flipped", flipped);
    });
    if (sayBtn) sayBtn.addEventListener("click", function () { if (order.length) speak(current()[F]); });
    gotIt.addEventListener("click", function () {
      if (!order.length) return;
      order.splice(idx % order.length, 1);
      if (idx >= order.length) idx = 0;
      draw();
    });
    review.addEventListener("click", function () {
      if (order.length <= 1) { draw(); return; }
      var moved = order.splice(idx % order.length, 1)[0];
      order.push(moved);
      if (idx >= order.length) idx = 0;
      draw();
    });
    restart.addEventListener("click", function () { reset(); draw(); });
    dirBtn.addEventListener("click", function () {
      frontL2 = !frontL2;
      dirBtn.textContent = frontL2 ? "Front: " + cfg.name + " → English" : "Front: English → " + cfg.name;
      draw();
    });
    dirBtn.textContent = "Front: " + cfg.name + " → English";

    sec.appendChild(el("p", { class: "fc-hint", text: "Click the card to flip it. These words also join your spaced-repetition deck." }));
    sec.appendChild(el("div", { class: "fc-top" }, [dirBtn, counter]));
    sec.appendChild(card);
    sec.appendChild(el("div", { class: "fc-controls" }, [sayBtn, gotIt, review, restart]));
    draw();
    return sec;
  }

  /* ---------- read-aloud prompt with copy ---------- */
  function renderReadAloud(lesson) {
    if (!lesson.readAloud) return null;
    var pre = el("pre", { class: "prompt-box", text: lesson.readAloud });
    var copyBtn = el("button", { class: "btn small", onclick: function () {
      var done = function () { copyBtn.textContent = "Copied!"; setTimeout(function () { copyBtn.textContent = "Copy prompt"; }, 1500); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(lesson.readAloud).then(done, function () { fallbackCopy(pre); done(); });
      } else { fallbackCopy(pre); done(); }
    } }, ["Copy prompt"]);
    return el("section", {}, [
      sectionTitle("🔊 Read-aloud prompt (paste into ChatGPT)"),
      el("p", { class: "muted", text: "The 🔊 buttons above use your device voice. For richer practice, paste this into an AI tutor with voice mode." }),
      copyBtn, pre
    ]);
  }
  function fallbackCopy(node) {
    var r = document.createRange(); r.selectNodeContents(node);
    var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    try { document.execCommand("copy"); } catch (e) {}
    sel.removeAllRanges();
  }

  /* ---------- full lesson ---------- */
  function renderLesson(id) {
    var lesson = lessonById(id);
    var c = document.getElementById("content");
    c.innerHTML = "";
    if (!lesson) { renderHome(); return; }

    c.appendChild(el("div", { class: "lesson-head" }, [
      el("span", { class: "lesson-eyebrow", text: "Lesson " + lesson.id + " · " + lesson.level + " · " + lesson.time }),
      el("h1", { text: lesson.title })
    ]));

    if (lesson.objectives && lesson.objectives.length) {
      c.appendChild(el("section", { class: "objectives" }, [
        sectionTitle("Objectives"),
        el("ul", {}, lesson.objectives.map(function (o) { return el("li", { text: o }); }))
      ]));
    }

    [renderVocab(lesson), renderDialogue(lesson), renderReading(lesson)].forEach(function (s) { if (s) c.appendChild(s); });

    if (lesson.grammarHTML) c.appendChild(el("section", {}, [sectionTitle("Grammar focus"), el("div", { class: "prose", html: lesson.grammarHTML })]));
    if (lesson.pronTipHTML) c.appendChild(el("section", { class: "tip" }, [sectionTitle("Pronunciation / spelling tip"), el("div", { class: "prose", html: lesson.pronTipHTML })]));

    var scoreState = { results: [] };
    var ex = renderExercises(lesson, scoreState);
    if (ex) c.appendChild(ex);

    var disc = renderDiscussion(lesson);
    if (disc) c.appendChild(disc);

    var fc = renderFlashcards(lesson);
    if (fc) c.appendChild(fc);

    if (lesson.cultureHTML) c.appendChild(el("section", { class: "culture" }, [sectionTitle("Culture note"), el("div", { class: "prose", html: lesson.cultureHTML })]));

    var ra = renderReadAloud(lesson);
    if (ra) c.appendChild(ra);

    // prev / next
    var ids = COURSE.lessons.map(function (l) { return l.id; });
    var pos = ids.indexOf(id);
    var navRow = el("div", { class: "lesson-nav" }, [
      pos > 0 ? el("a", { class: "btn ghost", href: "#lesson/" + ids[pos - 1], text: "← Lesson " + ids[pos - 1] }) : el("span"),
      pos < ids.length - 1 ? el("a", { class: "btn primary", href: "#lesson/" + ids[pos + 1], text: "Lesson " + ids[pos + 1] + " →" }) : el("span")
    ]);
    c.appendChild(navRow);

    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo(0, 0);
    c.focus();
  }

  /* ---------- flashcard review (SRS) ---------- */
  function renderReview() {
    var c = document.getElementById("content");
    c.innerHTML = "";
    c.appendChild(el("h1", { text: "🃏 Flashcard review" }));

    var queue = shuffle(srsDue());
    var totalToday = queue.length;
    if (!srsCount()) {
      c.appendChild(el("p", { class: "lead", text: "Your deck is empty. Finish a lesson's exercises and its vocabulary is added here automatically." }));
      c.appendChild(el("a", { class: "btn primary", href: "#home", text: "← Back to home" }));
      return;
    }
    if (!totalToday) {
      c.appendChild(el("p", { class: "lead", text: "🎉 Nothing due right now — you're all caught up. Come back tomorrow, or study ahead below." }));
      var ahead = el("button", { class: "btn ghost", onclick: function () {
        var d = loadSRS();
        queue = shuffle(Object.keys(d.cards).map(function (k) { return d.cards[k]; }));
        if (queue.length) { totalToday = queue.length; start(); }
      } }, ["Study ahead (all words)"]);
      c.appendChild(el("a", { class: "btn primary", href: "#home", text: "← Back to home" }));
      c.appendChild(ahead);
      return;
    }
    start();

    function start() {
      c.innerHTML = "";
      c.appendChild(el("h1", { text: "🃏 Flashcard review" }));
      var progressLine = el("p", { class: "muted" });
      var card = el("div", { class: "flashcard review-card" });
      var sayBtn = TTS ? el("button", { class: "btn small ghost", text: "🔊 Say it" }) : null;
      var flipBtn = el("button", { class: "btn", text: "Show answer" });
      var graded = el("div", { class: "grade-row" });
      var done = 0, flipped = false, cur = null;

      var grades = [
        { g: 0, label: "Again", cls: "g-again" },
        { g: 1, label: "Hard", cls: "g-hard" },
        { g: 2, label: "Good", cls: "g-good" },
        { g: 3, label: "Easy", cls: "g-easy" }
      ];
      grades.forEach(function (gr) {
        graded.appendChild(el("button", { class: "btn small " + gr.cls, onclick: function () {
          if (!cur) return;
          srsGrade(cur, gr.g);
          if (gr.g === 0) queue.push(cur); // show again this session
          done++;
          next();
        } }, [gr.label]));
      });

      function show() {
        flipped = false;
        card.className = "flashcard review-card";
        card.textContent = cur[F];
        graded.style.display = "none";
        flipBtn.style.display = "";
        progressLine.textContent = "Card " + Math.min(done + 1, totalToday) + " of " + totalToday + " · " + queue.length + " in queue";
      }
      function reveal() {
        flipped = true;
        card.className = "flashcard review-card flipped";
        card.innerHTML = "<div class='rc-l2'>" + cur[F] + "</div><div class='rc-en'>" + cur.en + "</div>";
        flipBtn.style.display = "none";
        graded.style.display = "flex";
      }
      function next() {
        if (!queue.length) {
          c.innerHTML = "";
          c.appendChild(el("h1", { text: "🃏 Review complete" }));
          c.appendChild(el("p", { class: "lead", text: "✓ You reviewed " + done + " card" + (done === 1 ? "" : "s") + ". Nicely done." }));
          c.appendChild(el("a", { class: "btn primary", href: "#home", text: "← Back to home" }));
          touchStreak();
          renderNav();
          return;
        }
        cur = queue.shift();
        show();
      }
      card.addEventListener("click", function () { if (!flipped) reveal(); });
      flipBtn.addEventListener("click", reveal);
      if (sayBtn) sayBtn.addEventListener("click", function () { if (cur) speak(cur[F]); });

      c.appendChild(progressLine);
      c.appendChild(card);
      c.appendChild(el("div", { class: "row-controls" }, [sayBtn, flipBtn]));
      c.appendChild(graded);
      c.appendChild(el("p", { class: "fc-hint", text: "Rate how well you knew it — the deck schedules the next review accordingly." }));
      next();
    }
    window.scrollTo(0, 0);
  }

  /* ---------- glossary (search all vocab) ---------- */
  function allVocab() {
    var out = [], seen = {};
    COURSE.lessons.forEach(function (l) {
      (l.vocab || []).forEach(function (v) {
        if (!v || !v[F]) return;
        var k = v[F].toLowerCase();
        if (seen[k]) return;
        seen[k] = 1;
        var row = { en: v.en, say: v.say, lessonId: l.id, lessonTitle: l.title };
        row[F] = v[F];
        out.push(row);
      });
    });
    out.sort(function (a, b) { return a[F].localeCompare(b[F], cfg.locale); });
    return out;
  }
  function renderGlossary() {
    var c = document.getElementById("content");
    c.innerHTML = "";
    c.appendChild(el("h1", { text: "📖 Glossary" }));
    var vocab = allVocab();
    c.appendChild(el("p", { class: "lead", text: vocab.length + " words from every loaded lesson. Search in " + cfg.name + " or English." }));
    var search = el("input", { class: "ex-input wide", type: "search", placeholder: "search…", autocomplete: "off" });
    c.appendChild(search);
    var list = el("div", { class: "glossary-list" });
    c.appendChild(list);

    function paint(q) {
      list.innerHTML = "";
      var nq = loose(q || "");
      var rows = vocab.filter(function (v) {
        if (!nq) return true;
        return loose(v[F]).indexOf(nq) !== -1 || loose(v.en).indexOf(nq) !== -1;
      }).slice(0, 400);
      rows.forEach(function (v) {
        list.appendChild(el("div", { class: "gloss-row" }, [
          audioBtn(v[F]),
          el("span", { class: "l2", text: v[F] }),
          el("span", { class: "gloss-en", text: v.en }),
          el("a", { class: "gloss-link", href: "#lesson/" + v.lessonId, text: "L" + v.lessonId })
        ]));
      });
      if (!rows.length) list.appendChild(el("p", { class: "muted", text: "No matches." }));
    }
    search.addEventListener("input", function () { paint(search.value); });
    paint("");
    window.scrollTo(0, 0);
  }

  /* ---------- routing ---------- */
  function route() {
    var hash = (location.hash || "").replace("#", "");
    renderNav();
    if (hash === "" || hash === "home") renderHome();
    else if (hash === "review") renderReview();
    else if (hash === "glossary") renderGlossary();
    else if (hash.indexOf("lesson/") === 0) renderLesson(hash.slice(7));
    else if (/^\d+$/.test(hash)) renderLesson(hash); // legacy #NN
    else renderHome();
  }

  function init() {
    var toggle = document.getElementById("menu-toggle");
    if (toggle) toggle.addEventListener("click", function () {
      document.getElementById("sidebar").classList.toggle("open");
    });
    window.addEventListener("hashchange", route);
    if (TTS) window.speechSynthesis.getVoices(); // warm the voice list
    if (!COURSE.lessons.length) {
      document.getElementById("content").innerHTML =
        "<h1>No lessons loaded</h1><p>The lesson data files didn't load. Make sure the <code>data/</code> folder sits next to <code>index.html</code>.</p>";
      renderNav();
      return;
    }
    COURSE.lessons.sort(function (a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });
    route();
  }

  init();
};
