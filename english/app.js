/* English A1→C2 interactive course (for Spanish speakers) — rendering + audio +
   exercises + listening + SRS + dashboard. Pure vanilla JS, no dependencies, no
   network. Works when index.html is opened directly from disk (file://). State
   persists in localStorage.

   Data convention: each vocab/dialogue/etc item carries `en` (the English term —
   the language being learned, spoken by TTS and shown prominently) and `es` (the
   Spanish gloss/translation, shown muted and hidden by the translation toggle).

   FUTURE (deferred): an in-app live AI voice conversation partner. It would need an
   always-connected AI backend (API key + network), which breaks this offline,
   open-the-file design, so it is intentionally not built here. */
(function () {
  "use strict";

  var COURSE = window.COURSE || { lessons: [], units: [], levels: [], outline: [] };
  var STORE_KEY = "englishCourseProgress.v1";
  var SRS_KEY = "englishCourseSRS.v1";
  var STREAK_KEY = "englishCourseStreak.v1";

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

  /* ---------- audio: pre-generated MP3s (audio/manifest.js) with TTS fallback ---------- */
  var TTS = !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  var HAS_FILES = !!window.AUDIO_FILES && typeof Audio !== "undefined";
  // CAN_AUDIO gates the 🔊 UI: pre-generated audio or device speech synthesis
  var CAN_AUDIO = HAS_FILES || TTS;
  var BAD_VOICE = /eddy|flo\b|grandma|grandpa|reed|rocko|sandy|shelley|albert|jester|whisper|zarvox|bad news|good news|bells|boing|bubbles|cellos|organ|superstar|trinoids|wobble|junior|ralph|kathy|fred/i;
  var GOOD_VOICE = /premium|enhanced|neural|natural|siri|google/i;
  function pickEnglishVoice() {
    if (!TTS) return null;
    var voices = window.speechSynthesis.getVoices() || [];
    var prefs = ["en-us", "en-gb", "en-au", "en-ca", "en-ie", "en"];
    var best = null, bestScore = -Infinity;
    for (var i = 0; i < voices.length; i++) {
      var lang = (voices[i].lang || "").toLowerCase().replace("_", "-");
      var rank = -1;
      for (var p = 0; p < prefs.length; p++) {
        if (lang.indexOf(prefs[p]) === 0) { rank = p; break; }
      }
      if (rank === -1) continue;
      var name = voices[i].name || "";
      // language-preference order dominates; within a language, avoid Apple's
      // novelty voices and prefer premium/neural ones
      var score = (prefs.length - rank) * 100 + (GOOD_VOICE.test(name) ? 50 : 0) - (BAD_VOICE.test(name) ? 500 : 0);
      if (score > bestScore) { bestScore = score; best = voices[i]; }
    }
    return best;
  }
  var speakChain = null; // holds current utterances: guards stale onend chains + Chrome GC bug
  var audioEl = null;    // single reused element so clips never overlap
  function playFile(file, fallbackText) {
    if (!audioEl) audioEl = new Audio();
    audioEl.pause();
    audioEl.src = "audio/" + file;
    var p = audioEl.play();
    if (p && p.catch) p.catch(function (err) {
      // missing/broken file -> use device TTS; autoplay-block -> nothing to do
      if (err && err.name !== "NotAllowedError") ttsSpeak(fallbackText);
    });
    return true;
  }
  function speak(text) {
    if (!text) return false;
    var t = String(text).trim();
    if (TTS) window.speechSynthesis.cancel();
    if (audioEl) audioEl.pause();
    speakChain = null;
    var file = HAS_FILES && window.AUDIO_FILES[t];
    if (file && playFile(file, t)) return true;
    return ttsSpeak(t);
  }
  function ttsSpeak(text) {
    if (!TTS || !text) return false;
    try {
      window.speechSynthesis.cancel();
      // "hi / hello" would be read run-together; speak each alternative as its own
      // utterance with an explicit 300ms pause between them
      var parts = String(text).split(/\s*\/\s*/).filter(function (p) { return p.trim(); });
      var v = pickEnglishVoice();
      var utts = parts.map(function (part) {
        var u = new SpeechSynthesisUtterance(part);
        if (v) { u.voice = v; u.lang = v.lang; } else { u.lang = "en-US"; }
        u.rate = 0.95;
        return u;
      });
      utts.forEach(function (u, i) {
        if (i < utts.length - 1) u.onend = function () {
          setTimeout(function () {
            if (speakChain === utts) window.speechSynthesis.speak(utts[i + 1]);
          }, 300);
        };
      });
      speakChain = utts;
      window.speechSynthesis.speak(utts[0]);
      return true;
    } catch (e) { return false; }
  }
  if (TTS && window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = function () { /* voices now cached */ };
  }
  function audioBtn(text, extraClass) {
    if (!CAN_AUDIO || !text) return null;
    return el("button", {
      class: "audio-btn" + (extraClass ? " " + extraClass : ""),
      type: "button", title: "Escuchar", "aria-label": "Escuchar",
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

  /* ---------- spaced-repetition deck (SRS) ----------
     Cards are keyed/fronted by the English term (`en`); `es` is the Spanish back. */
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
    return (items || []).filter(function (v) { return v && v.en && v.es; });
  }
  function srsSeedFromLesson(lesson) {
    var d = loadSRS();
    var changed = false;
    srsDeckItems(lesson).forEach(function (v) {
      var k = srsKey(v.en);
      if (!d.cards[k]) {
        d.cards[k] = { en: v.en, es: v.es, lessonId: lesson.id, ease: 2.3, interval: 0, due: today() };
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
    var c = d.cards[srsKey(card.en)];
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
    return stripAccents(normalize(s)).replace(/['']/g, "").replace(/-/g, " ").replace(/\s+/g, " ").trim();
  }
  // sequence form for word-order grading: drop ALL punctuation & accents, keep word order
  function seqNorm(s) {
    return stripAccents(String(s).toLowerCase())
      .replace(/[¿¡?!.,;:"“”'’()]/g, " ")
      .replace(/\s+/g, " ").trim();
  }
  function judge(input, answers) {
    var ni = normalize(input);
    if (!ni) return "no";
    for (var i = 0; i < answers.length; i++)
      if (ni === normalize(answers[i])) return "exact";
    for (var j = 0; j < answers.length; j++)
      if (loose(ni) === loose(answers[j])) return "close";
    return "no";
  }
  function asAnswers(ex) {
    if (ex.answers && ex.answers.length) return ex.answers;
    if (ex.answer != null) return [ex.answer];
    return [];
  }

  /* ---------- sidebar navigation ---------- */
  function renderNav() {
    var nav = document.getElementById("side-nav");
    if (!nav) return;
    var progress = loadProgress();
    var hash = (location.hash || "").replace("#", "");
    var currentId = hash.indexOf("lesson/") === 0 ? hash.slice(7) : "";
    nav.innerHTML = "";

    nav.appendChild(el("a", {
      class: "nav-home" + (hash === "" || hash === "home" ? " active" : ""),
      href: "#home", html: "🏠 Inicio del curso"
    }));
    nav.appendChild(el("a", {
      class: "nav-tool" + (hash === "review" ? " active" : ""),
      href: "#review", text: "🃏 Repaso (tarjetas)"
    }));
    nav.appendChild(el("a", {
      class: "nav-tool" + (hash === "glossary" ? " active" : ""),
      href: "#glossary", text: "📖 Glosario"
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
          el("span", { class: "nav-badge badge-" + level, text: level })
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

  function statCard(emoji, tint, value, label, href, linkText) {
    var foot = el("div", { class: "stat-foot" });
    if (href) foot.appendChild(el("a", { class: "stat-link", href: href, text: linkText }));
    return el("div", { class: "stat" }, [
      el("div", { class: "stat-top" }, [
        el("div", { class: "stat-ico " + tint, text: emoji }),
        el("div", {}, [
          el("div", { class: "stat-num", text: String(value) }),
          el("div", { class: "stat-label", text: label })
        ])
      ]),
      foot
    ]);
  }

  function renderHome() {
    var c = document.getElementById("content");
    c.innerHTML = "";
    var progress = loadProgress();
    var doneCount = Object.keys(progress).filter(function (k) { return progress[k].done; }).length;
    var total = (COURSE.outline || []).length;
    var due = srsDue().length;

    c.appendChild(el("h1", { html: "🇬🇧 English A1 → C2" }));
    c.appendChild(el("p", { class: "lead", text:
      "Curso completo de inglés, de principiante absoluto a dominio total. Lee cada lección, escucha el audio y practica con ejercicios interactivos, comprensión auditiva y tarjetas de repaso espaciado." }));

    // search-first: one field over lessons + vocabulary
    var searchInput = el("input", {
      class: "dash-search", id: "dash-search", type: "search",
      placeholder: "Buscar lecciones y vocabulario…  pulsa /", autocomplete: "off"
    });
    var results = el("div", { class: "search-results" });
    results.style.display = "none";
    c.appendChild(el("div", { class: "dash-search-wrap" }, [
      el("span", { class: "search-ico", text: "🔍" }), searchInput
    ]));
    c.appendChild(results);

    // bento stat cards
    var cont = firstIncompleteId();
    c.appendChild(el("div", { class: "stat-row" }, [
      statCard("📘", "tint-blue", doneCount + "/" + total, "lecciones hechas",
        cont ? "#lesson/" + cont : null, doneCount ? "Continuar · Lección " + cont + " →" : "Empezar · Lección 00 →"),
      statCard("🔥", "tint-orange", streakCount(), "días seguidos", null, null),
      statCard("🃏", "tint-green", due, "tarjetas por repasar", "#review", "Repasar →"),
      statCard("📖", "tint-purple", srsCount(), "palabras aprendidas", "#glossary", "Glosario →")
    ]));

    if (!CAN_AUDIO) {
      c.appendChild(el("p", { class: "warn", text:
        "Nota: tu navegador no ofrece síntesis de voz, así que los botones 🔊 de escucha están ocultos. Todo lo demás funciona." }));
    }

    // default panel: levels + how-to (hidden while searching)
    var defaultPanel = el("div", {});
    defaultPanel.appendChild(el("h2", { class: "sec-title", text: "Niveles" }));
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
        el("div", { class: "level-meta", text: st.done + " / " + st.total + " lecciones · " + pct + "%" })
      ]);
      grid.appendChild(card);
    });
    defaultPanel.appendChild(grid);

    var howto = el("div", { class: "card" }, [
      el("h2", { text: "Cómo usar este curso" }),
      el("ul", {}, [
        el("li", { html: "Haz las lecciones <strong>en orden</strong>: cada nivel se apoya en el anterior." }),
        el("li", { html: "Toca cualquier <strong>🔊</strong> para oír el inglés." }),
        el("li", { html: "Haz la <strong>Comprensión auditiva</strong>: escucha una conversación y responde las preguntas." }),
        el("li", { html: "Haz los <strong>Ejercicios</strong> — rellenar huecos, opción múltiple, traducción, dictado, emparejar, ordenar y conjugar, todos corregidos al instante." }),
        el("li", { html: "Las lecciones terminadas alimentan el <strong>Repaso con tarjetas</strong>: repetición espaciada que te trae las palabras justo antes de olvidarlas." }),
        el("li", { html: "Tu progreso, puntuaciones y racha se guardan automáticamente en este navegador." })
      ])
    ]);
    defaultPanel.appendChild(howto);
    c.appendChild(defaultPanel);

    // search behavior (element-level listeners only)
    var vocabCache = null;
    var firstHref = null;
    function paintResults() {
      var raw = searchInput.value.trim();
      var q = loose(raw);
      firstHref = null;
      if (!q) {
        results.style.display = "none";
        results.innerHTML = "";
        defaultPanel.style.display = "";
        return;
      }
      if (!vocabCache) vocabCache = allVocab();
      results.innerHTML = "";
      defaultPanel.style.display = "none";
      results.style.display = "";

      var lessons = (COURSE.outline || []).filter(function (o) {
        return loose(o.title).indexOf(q) !== -1 || String(o.id).indexOf(raw) === 0;
      }).slice(0, 8);
      var vocab = vocabCache.filter(function (v) {
        return loose(v.en).indexOf(q) !== -1 || loose(v.es).indexOf(q) !== -1;
      });

      if (lessons.length) {
        results.appendChild(el("div", { class: "sr-head", text: "Lecciones" }));
        lessons.forEach(function (o) {
          var loaded = !!lessonById(o.id);
          var href = "#lesson/" + o.id;
          if (loaded && !firstHref) firstHref = href;
          var attrs = { class: "sr-row" + (loaded ? "" : " disabled") };
          if (loaded) attrs.href = href;
          results.appendChild(el(loaded ? "a" : "div", attrs, [
            el("span", { class: "nav-num", text: o.id }),
            el("span", { class: "sr-title", text: o.title }),
            el("span", { class: "nav-badge badge-" + String(o.level).replace(/[^A-Za-z0-9]/g, ""), text: o.level })
          ]));
        });
      }
      if (vocab.length) {
        results.appendChild(el("div", { class: "sr-head", text: "Vocabulario" }));
        vocab.slice(0, 12).forEach(function (v) {
          if (!firstHref) firstHref = "#lesson/" + v.lessonId;
          results.appendChild(el("div", { class: "sr-row" }, [
            audioBtn(v.en),
            el("span", { class: "term", text: v.en }),
            el("span", { class: "sr-title muted", text: v.es }),
            el("a", { class: "gloss-link", href: "#lesson/" + v.lessonId, text: "L" + v.lessonId })
          ]));
        });
        if (vocab.length > 12) {
          results.appendChild(el("a", { class: "sr-more", href: "#glossary", text: vocab.length - 12 + " coincidencias más — abre el glosario →" }));
        }
      }
      if (!lessons.length && !vocab.length) {
        results.appendChild(el("p", { class: "muted", text: "Sin resultados." }));
      }
    }
    searchInput.addEventListener("input", paintResults);
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && firstHref) location.hash = firstHref.slice(1);
      else if (e.key === "Escape") { searchInput.value = ""; paintResults(); searchInput.blur(); }
    });

    window.scrollTo(0, 0);
  }

  /* ---------- lesson content sections ---------- */
  function sectionTitle(t) { return el("h2", { class: "sec-title", text: t }); }

  function renderVocab(lesson) {
    if (!lesson.vocab || !lesson.vocab.length) return null;
    var rows = [el("tr", {}, [
      CAN_AUDIO ? el("th", { text: "" }) : null,
      el("th", { text: "English" }), el("th", { text: "Pronunciación" }), el("th", { text: "Español" })
    ])];
    lesson.vocab.forEach(function (v) {
      rows.push(el("tr", {}, [
        CAN_AUDIO ? el("td", { class: "audio-cell" }, [audioBtn(v.en)]) : null,
        el("td", { class: "term", text: v.en }),
        el("td", { class: "say", text: v.say || "" }),
        el("td", { text: v.es })
      ]));
    });
    return el("section", {}, [sectionTitle("Vocabulario"), el("table", { class: "vocab" }, [el("tbody", {}, rows)])]);
  }

  function renderDialogue(lesson) {
    if (!lesson.dialogue || !lesson.dialogue.length) return null;
    var lines = lesson.dialogue.map(function (d) {
      return el("p", { class: "dline" }, [
        audioBtn(d.en, "inline"),
        d.sp ? el("span", { class: "spk", text: d.sp + ": " }) : null,
        el("span", { class: "term", text: d.en }),
        el("span", { class: "gloss", text: " — " + d.es })
      ]);
    });
    var wrap = el("div", { class: "dialogue" }, lines);
    var toggle = el("button", { class: "btn small", onclick: function () {
      wrap.classList.toggle("show-tr");
      toggle.textContent = wrap.classList.contains("show-tr") ? "Ocultar español" : "Mostrar español";
    } }, ["Mostrar español"]);
    var playAll = CAN_AUDIO ? el("button", { class: "btn small ghost", onclick: function () {
      speak(lesson.dialogue.map(function (d) { return d.en; }).join(". "));
    } }, ["🔊 Reproducir todo"]) : null;
    return el("section", {}, [sectionTitle("Diálogo"), el("div", { class: "row-controls" }, [toggle, playAll]), wrap]);
  }

  function renderReading(lesson) {
    if (!lesson.reading || !lesson.reading.en) return null;
    var r = lesson.reading;
    var enParas = String(r.en).split(/\n\n+/);
    var esParas = String(r.es || "").split(/\n\n+/);
    var enWrap = el("div", { class: "reading-term" }, enParas.map(function (p, i) {
      return el("p", {}, [audioBtn(p, "inline"), el("span", { text: p })]);
    }));
    var esWrap = el("div", { class: "reading-gloss" }, esParas.map(function (p) { return el("p", { text: p }); }));
    var box = el("div", { class: "reading" }, [enWrap, esWrap]);
    var toggle = el("button", { class: "btn small", onclick: function () {
      box.classList.toggle("show-tr");
      toggle.textContent = box.classList.contains("show-tr") ? "Ocultar traducción" : "Mostrar traducción";
    } }, ["Mostrar traducción"]);
    var playAll = CAN_AUDIO ? el("button", { class: "btn small ghost", onclick: function () { speak(r.en); } }, ["🔊 Reproducir todo"]) : null;
    return el("section", {}, [
      sectionTitle("Lectura" + (r.title ? " — " + r.title : "")),
      el("div", { class: "row-controls" }, [toggle, playAll]), box
    ]);
  }

  function renderDiscussion(lesson) {
    if (!lesson.discussion || !lesson.discussion.length) return null;
    var items = lesson.discussion.map(function (q) {
      var text = typeof q === "string" ? q : q.en;
      var gloss = typeof q === "object" ? q.es : null;
      return el("li", {}, [audioBtn(text, "inline"), el("span", { class: "term", text: text }), gloss ? el("span", { class: "gloss", text: " — " + gloss }) : null]);
    });
    return el("section", { class: "discussion" }, [
      sectionTitle("Conversación y debate"),
      el("p", { class: "muted", text: "Responde en voz alta con frases completas, o escribe unas líneas. Esta es tu etapa de producción libre: prioriza comunicar sobre la perfección." }),
      el("ul", {}, items)
    ]);
  }

  /* ---------- exercises ---------- */
  function renderExercises(lesson, scoreState) {
    if (!lesson.exercises || !lesson.exercises.length) return null;
    var sec = el("section", { class: "exercises" }, [sectionTitle("Ejercicios")]);
    var scoreLine = el("p", { class: "score-line" });
    sec.appendChild(scoreLine);

    function updateScore() {
      var correct = 0;
      scoreState.results.forEach(function (r) { if (r === "correct") correct++; });
      scoreLine.textContent = "Puntuación: " + correct + " / " + scoreState.results.length;
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
      } else if (ex.type === "listen-dialogue") {
        renderListenDialogue(ex, card, feedback, mark);
      } else if (ex.type === "match") {
        renderMatch(ex, card, feedback, mark);
      } else if (ex.type === "order") {
        renderOrder(ex, card, feedback, mark);
      } else if (ex.type === "conjugate") {
        renderConjugate(ex, card, feedback, mark);
      } else {
        card.appendChild(el("p", { class: "muted", text: "(tipo de ejercicio desconocido: " + ex.type + ")" }));
        scoreState.results[i] = "correct"; // don't block scoring
      }

      card.appendChild(feedback);
      sec.appendChild(card);
    });

    var reset = el("button", { class: "btn small ghost", onclick: function () { location.reload(); } }, ["Reiniciar ejercicios"]);
    sec.appendChild(reset);
    updateScore();
    return sec;
  }

  function revealLink(answers, feedback, label) {
    return el("a", { class: "ex-show", href: "javascript:void 0", onclick: function () {
      feedback.className = "ex-feedback";
      feedback.innerHTML = (label || "Respuesta") + ": <strong>" + answers[0] + "</strong>";
    }, text: "Ver respuesta" });
  }

  function renderFill(ex, card, feedback, mark) {
    var answers = asAnswers(ex);
    var input = el("input", { class: "ex-input", type: "text", placeholder: "tu respuesta", autocomplete: "off", autocapitalize: "off", spellcheck: "false" });
    var line = el("p", { class: "ex-fill" }, [
      ex.before ? el("span", { text: ex.before + " " }) : null,
      input,
      ex.after ? el("span", { text: " " + ex.after }) : null,
      ex.cue ? el("span", { class: "ex-cue", text: " (" + ex.cue + ")" }) : null
    ]);
    var check = el("button", { class: "btn small", onclick: function () {
      var v = judge(input.value, answers);
      if (v === "exact" || v === "close") mark("correct", "✓ ¡Correcto!");
      else mark("incorrect", "✗ Casi. Respuesta: <strong>" + answers[0] + "</strong>");
    } }, ["Comprobar"]);
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
        if (normalize(choice) === normalize(ex.answer)) { b.classList.add("right"); mark("correct", "✓ ¡Correcto!"); }
        else {
          b.classList.add("wrong");
          mark("incorrect", "✗ Respuesta: <strong>" + ex.answer + "</strong>");
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
    var input = el("input", { class: "ex-input wide", type: "text", placeholder: "escribe en inglés…", autocomplete: "off", spellcheck: "false" });
    var check = el("button", { class: "btn small", onclick: function () {
      var v = judge(input.value, answers);
      if (v === "exact" || v === "close") mark("correct", "✓ ¡Correcto!");
      else mark("incorrect", "✗ Una buena respuesta: <strong>" + answers[0] + "</strong>");
    } }, ["Comprobar"]);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check.click(); });
    card.appendChild(el("div", { class: "ex-controls" }, [input, check, revealLink(answers, feedback, "Respuesta de ejemplo")]));
  }

  function renderListen(ex, card, feedback, mark) {
    var answers = asAnswers(ex);
    var phrase = ex.audio || answers[0];
    if (!CAN_AUDIO) {
      // graceful fallback: show the text so the exercise is still doable
      card.appendChild(el("p", { class: "muted", text: "(Audio no disponible en este navegador — aquí está la frase para transcribir:) " + phrase }));
    }
    var play = el("button", { class: "btn small", onclick: function () { speak(phrase); } }, ["🔊 Reproducir"]);
    var input = el("input", { class: "ex-input wide", type: "text", placeholder: "escribe lo que oyes…", autocomplete: "off", spellcheck: "false" });
    var check = el("button", { class: "btn small", onclick: function () {
      var v = judge(input.value, answers);
      if (v === "exact" || v === "close") mark("correct", "✓ ¡Correcto!");
      else mark("incorrect", "✗ Era: <strong>" + answers[0] + "</strong>");
    } }, ["Comprobar"]);
    input.addEventListener("keydown", function (e) { if (e.key === "Enter") check.click(); });
    card.appendChild(el("div", { class: "ex-controls" }, [play, input, check, revealLink(answers, feedback)]));
  }

  /* Listening comprehension: play a short conversation (TTS), hidden transcript,
     then comprehension questions checked together. */
  function renderListenDialogue(ex, card, feedback, mark) {
    var lines = ex.lines || [];
    var joined = lines.map(function (d) { return d.en; }).join(".  ");
    var questions = ex.questions || [];

    if (!CAN_AUDIO) {
      card.appendChild(el("p", { class: "muted", text: "(Audio no disponible en este navegador — lee la transcripción y responde.)" }));
    }
    var playBtn = el("button", { class: "btn", onclick: function () { speak(joined); } }, ["▶ Reproducir conversación"]);
    var againBtn = CAN_AUDIO ? el("button", { class: "btn small ghost", onclick: function () { speak(joined); } }, ["↻ Repetir"]) : null;

    var transcript = el("div", { class: "ld-transcript hidden" }, lines.map(function (d) {
      return el("p", { class: "dline" }, [
        audioBtn(d.en, "inline"),
        d.sp ? el("span", { class: "spk", text: d.sp + ": " }) : null,
        el("span", { class: "term", text: d.en }),
        d.es ? el("span", { class: "gloss", text: " — " + d.es }) : null
      ]);
    }));
    var trToggle = el("button", { class: "btn small ghost", onclick: function () {
      var hidden = transcript.classList.toggle("hidden");
      trToggle.textContent = hidden ? "Ver transcripción" : "Ocultar transcripción";
    } }, ["Ver transcripción"]);
    if (!CAN_AUDIO) transcript.classList.remove("hidden");

    card.appendChild(el("div", { class: "row-controls" }, [playBtn, againBtn, trToggle]));
    card.appendChild(transcript);

    var answered = [];
    var correctFlags = [];
    questions.forEach(function (q, qi) {
      answered.push(false);
      correctFlags.push(false);
      var qWrap = el("div", { class: "ld-q" });
      qWrap.appendChild(el("p", { class: "ex-prompt", text: (qi + 1) + ". " + q.q }));
      var choicesWrap = el("div", { class: "mc-choices" });
      var lockedLocal = false;
      (q.choices || []).forEach(function (choice) {
        var b = el("button", { class: "mc-choice", onclick: function () {
          if (lockedLocal) return;
          lockedLocal = true;
          answered[qi] = true;
          if (normalize(choice) === normalize(q.answer)) { b.classList.add("right"); correctFlags[qi] = true; }
          else {
            b.classList.add("wrong");
            Array.prototype.forEach.call(choicesWrap.children, function (cb) {
              if (normalize(cb.textContent) === normalize(q.answer)) cb.classList.add("right");
            });
          }
          if (answered.every(Boolean)) {
            var allRight = correctFlags.every(Boolean);
            var got = correctFlags.filter(Boolean).length;
            if (allRight) mark("correct", "✓ ¡Todo correcto! (" + got + "/" + questions.length + ")");
            else mark("incorrect", "✗ " + got + "/" + questions.length + " correctas. Vuelve a escuchar.");
          }
        } }, [choice]);
        choicesWrap.appendChild(b);
      });
      qWrap.appendChild(choicesWrap);
      card.appendChild(qWrap);
    });
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
          if (matched === total) mark("correct", "✓ ¡Todo emparejado!");
        } else {
          b.classList.add("miss"); other.classList.add("miss");
          setTimeout(function () { b.classList.remove("miss"); other.classList.remove("miss"); }, 500);
        }
      });
      return b;
    }

    shuffle(pairs.map(function (p, i) { return i; })).forEach(function (i) {
      left.appendChild(makeTile("L", i, pairs[i].en));
    });
    shuffle(pairs.map(function (p, i) { return i; })).forEach(function (i) {
      right.appendChild(makeTile("R", i, pairs[i].es));
    });
    grid.appendChild(left); grid.appendChild(right);
    card.appendChild(el("p", { class: "muted", text: "Toca una palabra en inglés y luego su traducción al español." }));
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
      if (seqNorm(built) === seqNorm(answer)) mark("correct", "✓ ¡Correcto!");
      else mark("incorrect", "✗ Respuesta: <strong>" + answer + "</strong>");
    } }, ["Comprobar"]);
    card.appendChild(el("p", { class: "muted", text: "Toca las palabras en orden para construir la frase. Toca una palabra elegida para devolverla." }));
    card.appendChild(build);
    card.appendChild(bank);
    card.appendChild(el("div", { class: "ex-controls" }, [check, revealLink([answer], feedback)]));
  }

  function renderConjugate(ex, card, feedback, mark) {
    var rows = ex.rows || [];
    var inputs = [];
    if (ex.verb) card.appendChild(el("p", { class: "ex-prompt", text: "Verbo: " + ex.verb }));
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
      if (allRight) mark("correct", "✓ ¡Correcto!");
      else mark("incorrect", "✗ Revisa: <strong>" + anyWrong.join(", ") + "</strong>");
    } }, ["Comprobar todo"]);
    card.appendChild(table);
    card.appendChild(el("div", { class: "ex-controls" }, [check]));
  }

  /* ---------- per-lesson flashcards (quick local deck) ---------- */
  function renderFlashcards(lesson) {
    var deck = (lesson.flashcards && lesson.flashcards.length) ? lesson.flashcards : lesson.vocab;
    if (!deck || !deck.length) return null;

    var order = [], idx = 0, frontTerm = true, flipped = false;
    function reset() { order = deck.map(function (_, i) { return i; }); idx = 0; flipped = false; }
    reset();

    var sec = el("section", {}, [sectionTitle("Tarjetas")]);
    var dirBtn = el("button", { class: "btn small ghost" });
    var counter = el("span", { class: "fc-counter" });
    var card = el("div", { class: "flashcard" });
    var sayBtn = CAN_AUDIO ? el("button", { class: "btn small ghost", text: "🔊 Decir" }) : null;
    var gotIt = el("button", { class: "btn small", text: "La sé ✓" });
    var review = el("button", { class: "btn small ghost", text: "Repasar ↻" });
    var restart = el("button", { class: "btn small ghost", text: "Reiniciar mazo" });

    function current() { return deck[order[idx % order.length]]; }
    function draw() {
      if (!order.length) {
        card.className = "flashcard done"; card.textContent = "🎉 ¡Mazo completo!";
        counter.textContent = ""; gotIt.disabled = review.disabled = true;
        if (sayBtn) sayBtn.disabled = true;
        return;
      }
      gotIt.disabled = review.disabled = false;
      if (sayBtn) sayBtn.disabled = false;
      flipped = false;
      var item = current();
      card.className = "flashcard";
      card.textContent = frontTerm ? item.en : item.es;
      counter.textContent = order.length + " tarjeta" + (order.length > 1 ? "s" : "") + " restante" + (order.length > 1 ? "s" : "");
    }
    card.addEventListener("click", function () {
      if (!order.length) return;
      var item = current();
      flipped = !flipped;
      card.textContent = flipped ? (frontTerm ? item.es : item.en) : (frontTerm ? item.en : item.es);
      card.classList.toggle("flipped", flipped);
    });
    if (sayBtn) sayBtn.addEventListener("click", function () { if (order.length) speak(current().en); });
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
      frontTerm = !frontTerm;
      dirBtn.textContent = frontTerm ? "Frente: inglés → español" : "Frente: español → inglés";
      draw();
    });
    dirBtn.textContent = "Frente: inglés → español";

    sec.appendChild(el("p", { class: "fc-hint", text: "Haz clic en la tarjeta para girarla. Estas palabras también entran en tu mazo de repetición espaciada." }));
    sec.appendChild(el("div", { class: "fc-top" }, [dirBtn, counter]));
    sec.appendChild(card);
    sec.appendChild(el("div", { class: "fc-controls" }, [sayBtn, gotIt, review, restart]));
    draw();
    return sec;
  }

  /* ---------- full lesson ---------- */
  function renderLesson(id) {
    var lesson = lessonById(id);
    var c = document.getElementById("content");
    c.innerHTML = "";
    if (!lesson) { renderHome(); return; }

    c.appendChild(el("div", { class: "lesson-head" }, [
      el("span", { class: "lesson-eyebrow", text: "Lección " + lesson.id + " · " + lesson.level + " · " + lesson.time }),
      el("h1", { text: lesson.title })
    ]));

    if (lesson.objectives && lesson.objectives.length) {
      c.appendChild(el("section", { class: "objectives" }, [
        sectionTitle("Objetivos"),
        el("ul", {}, lesson.objectives.map(function (o) { return el("li", { text: o }); }))
      ]));
    }

    [renderVocab(lesson), renderDialogue(lesson), renderReading(lesson)].forEach(function (s) { if (s) c.appendChild(s); });

    if (lesson.grammarHTML) c.appendChild(el("section", {}, [sectionTitle("Gramática"), el("div", { class: "prose", html: lesson.grammarHTML })]));
    if (lesson.pronTipHTML) c.appendChild(el("section", { class: "tip" }, [sectionTitle("Pronunciación"), el("div", { class: "prose", html: lesson.pronTipHTML })]));

    var scoreState = { results: [] };
    var ex = renderExercises(lesson, scoreState);
    if (ex) c.appendChild(ex);

    var disc = renderDiscussion(lesson);
    if (disc) c.appendChild(disc);

    var fc = renderFlashcards(lesson);
    if (fc) c.appendChild(fc);

    if (lesson.cultureHTML) c.appendChild(el("section", { class: "culture" }, [sectionTitle("Nota cultural"), el("div", { class: "prose", html: lesson.cultureHTML })]));

    // prev / next
    var ids = COURSE.lessons.map(function (l) { return l.id; });
    var pos = ids.indexOf(id);
    var navRow = el("div", { class: "lesson-nav" }, [
      pos > 0 ? el("a", { class: "btn ghost", href: "#lesson/" + ids[pos - 1], text: "← Lección " + ids[pos - 1] }) : el("span"),
      pos < ids.length - 1 ? el("a", { class: "btn primary", href: "#lesson/" + ids[pos + 1], text: "Lección " + ids[pos + 1] + " →" }) : el("span")
    ]);
    c.appendChild(navRow);

    window.scrollTo(0, 0);
    c.focus();
  }

  /* ---------- flashcard review (SRS) ---------- */
  function renderReview() {
    var c = document.getElementById("content");
    c.innerHTML = "";
    c.appendChild(el("h1", { text: "🃏 Repaso con tarjetas" }));

    var queue = shuffle(srsDue());
    var totalToday = queue.length;
    if (!srsCount()) {
      c.appendChild(el("p", { class: "lead", text: "Tu mazo está vacío. Termina los ejercicios de una lección y su vocabulario se añade aquí automáticamente." }));
      c.appendChild(el("a", { class: "btn primary", href: "#home", text: "← Volver al inicio" }));
      return;
    }
    if (!totalToday) {
      c.appendChild(el("p", { class: "lead", text: "🎉 Nada pendiente por ahora: estás al día. Vuelve mañana, o adelanta abajo." }));
      var ahead = el("button", { class: "btn ghost", onclick: function () {
        var d = loadSRS();
        queue = shuffle(Object.keys(d.cards).map(function (k) { return d.cards[k]; }));
        if (queue.length) { totalToday = queue.length; start(); }
      } }, ["Adelantar (todas las palabras)"]);
      c.appendChild(el("a", { class: "btn primary", href: "#home", text: "← Volver al inicio" }));
      c.appendChild(ahead);
      return;
    }
    start();

    function start() {
      c.innerHTML = "";
      c.appendChild(el("h1", { text: "🃏 Repaso con tarjetas" }));
      var progressLine = el("p", { class: "muted" });
      var card = el("div", { class: "flashcard review-card" });
      var sayBtn = CAN_AUDIO ? el("button", { class: "btn small ghost", text: "🔊 Decir" }) : null;
      var flipBtn = el("button", { class: "btn", text: "Ver respuesta" });
      var graded = el("div", { class: "grade-row" });
      var done = 0, flipped = false, cur = null;

      var grades = [
        { g: 0, label: "Otra vez", cls: "g-again" },
        { g: 1, label: "Difícil", cls: "g-hard" },
        { g: 2, label: "Bien", cls: "g-good" },
        { g: 3, label: "Fácil", cls: "g-easy" }
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
        card.textContent = cur.en;
        graded.style.display = "none";
        flipBtn.style.display = "";
        progressLine.textContent = "Tarjeta " + Math.min(done + 1, totalToday) + " de " + totalToday + " · " + queue.length + " en cola";
      }
      function reveal() {
        flipped = true;
        card.className = "flashcard review-card flipped";
        card.innerHTML = "<div class='rc-term'>" + cur.en + "</div><div class='rc-gloss'>" + cur.es + "</div>";
        flipBtn.style.display = "none";
        graded.style.display = "flex";
      }
      function next() {
        if (!queue.length) {
          c.innerHTML = "";
          c.appendChild(el("h1", { text: "🃏 Repaso completo" }));
          c.appendChild(el("p", { class: "lead", text: "✓ Repasaste " + done + " tarjeta" + (done === 1 ? "" : "s") + ". ¡Bien hecho!" }));
          c.appendChild(el("a", { class: "btn primary", href: "#home", text: "← Volver al inicio" }));
          touchStreak();
          renderNav();
          return;
        }
        cur = queue.shift();
        show();
      }
      card.addEventListener("click", function () { if (!flipped) reveal(); });
      flipBtn.addEventListener("click", reveal);
      if (sayBtn) sayBtn.addEventListener("click", function () { if (cur) speak(cur.en); });

      c.appendChild(progressLine);
      c.appendChild(card);
      c.appendChild(el("div", { class: "row-controls" }, [sayBtn, flipBtn]));
      c.appendChild(graded);
      c.appendChild(el("p", { class: "fc-hint", text: "Califica qué tan bien la sabías: el mazo programa el próximo repaso en consecuencia." }));
      next();
    }
    window.scrollTo(0, 0);
  }

  /* ---------- glossary (search all vocab) ---------- */
  function allVocab() {
    var out = [], seen = {};
    COURSE.lessons.forEach(function (l) {
      (l.vocab || []).forEach(function (v) {
        if (!v || !v.en) return;
        var k = v.en.toLowerCase();
        if (seen[k]) return;
        seen[k] = 1;
        out.push({ en: v.en, es: v.es, say: v.say, lessonId: l.id, lessonTitle: l.title });
      });
    });
    out.sort(function (a, b) { return a.en.localeCompare(b.en, "en"); });
    return out;
  }
  function renderGlossary() {
    var c = document.getElementById("content");
    c.innerHTML = "";
    c.appendChild(el("h1", { text: "📖 Glosario" }));
    var vocab = allVocab();
    c.appendChild(el("p", { class: "lead", text: vocab.length + " palabras de cada lección cargada. Busca en inglés o en español." }));
    var search = el("input", { class: "ex-input wide", id: "glossary-search", type: "search", placeholder: "buscar…", autocomplete: "off" });
    c.appendChild(search);
    var list = el("div", { class: "glossary-list" });
    c.appendChild(list);

    function paint(q) {
      list.innerHTML = "";
      var nq = loose(q || "");
      var rows = vocab.filter(function (v) {
        if (!nq) return true;
        return loose(v.en).indexOf(nq) !== -1 || loose(v.es).indexOf(nq) !== -1;
      }).slice(0, 400);
      rows.forEach(function (v) {
        list.appendChild(el("div", { class: "gloss-row" }, [
          audioBtn(v.en),
          el("span", { class: "term", text: v.en }),
          el("span", { class: "gloss-trans", text: v.es }),
          el("a", { class: "gloss-link", href: "#lesson/" + v.lessonId, text: "L" + v.lessonId })
        ]));
      });
      if (!rows.length) list.appendChild(el("p", { class: "muted", text: "Sin resultados." }));
    }
    search.addEventListener("input", function () { paint(search.value); });
    paint("");
    window.scrollTo(0, 0);
  }

  /* ---------- routing ---------- */
  function route() {
    var sb = document.getElementById("sidebar");
    if (sb) sb.classList.remove("open");
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
        "<h1>No se cargaron las lecciones</h1><p>Los archivos de datos no se cargaron. Asegúrate de que la carpeta <code>data/</code> esté junto a <code>index.html</code>.</p>";
      renderNav();
      return;
    }
    COURSE.lessons.sort(function (a, b) { return a.id < b.id ? -1 : a.id > b.id ? 1 : 0; });
    route();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
