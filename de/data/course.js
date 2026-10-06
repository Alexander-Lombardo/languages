// German A1 → C2 — course data root.
// Each data/lesson-NN.js file pushes one lesson into window.COURSE.lessons.
// Loaded via <script> tags in index.html (no fetch, so it works from file://).
window.COURSE = window.COURSE || { lessons: [] };

// CEFR levels, in order, with a short "can-do" summary for the dashboard.
window.COURSE.levels = [
  { code: "A1", name: "Beginner",            blurb: "Survival basics: the sounds of German, greetings, numbers, family, ordering food, the accusative case and modal verbs." },
  { code: "A2", name: "Elementary",          blurb: "Describe people, talk about the past (Perfekt & Präteritum), the dative case, routines, separable verbs, work and health." },
  { code: "B1", name: "Intermediate",        blurb: "Handle two-way prepositions, subordinate clauses, adjective endings, the future, genitive, relative clauses and polite Konjunktiv II." },
  { code: "B2", name: "Upper-Intermediate",  blurb: "Use hypotheticals, the passive, reported speech (Konjunktiv I), report and debate, switch register, discuss society in detail." },
  { code: "C1", name: "Advanced",            blurb: "Argue with nuance, handle extended attributes and modal particles, read media and literature, choose words with precision." },
  { code: "C2", name: "Mastery",             blurb: "Command register, style, the German-speaking varieties, rhetoric, irony and near-native subtlety." }
];

// Unit groupings used to organise the sidebar navigation.
window.COURSE.units = [
  { name: "Unit 0 — Getting Started",            level: "A1", ids: ["00"] },
  { name: "Unit 1 — First Contact",              level: "A1", ids: ["01", "02", "03"] },
  { name: "Unit 2 — People & Things",            level: "A1", ids: ["04", "05", "06"] },
  { name: "Unit 3 — Everyday Life",              level: "A1", ids: ["07", "08", "09"] },
  { name: "Unit 4 — Food & Shopping",            level: "A1", ids: ["10", "11", "12"] },
  { name: "Unit 5 — Describing the World",       level: "A2", ids: ["13", "14", "15"] },
  { name: "Unit 6 — Talking About the Past",     level: "A2", ids: ["16", "17", "18"] },
  { name: "Unit 7 — Routine & Getting Around",   level: "A2", ids: ["19", "20", "21"] },
  { name: "Unit 8 — Self & Society",             level: "A2", ids: ["22", "23", "24"] },
  { name: "B1 · Unit 9 — Cases & Clauses",       level: "B1", ids: ["25", "26", "27", "28", "29"] },
  { name: "B1 · Unit 10 — Getting Things Done",  level: "B1", ids: ["30", "31", "32", "33", "34"] },
  { name: "B2 · Unit 11 — Advanced Structures",  level: "B2", ids: ["35", "36", "37", "38", "39"] },
  { name: "B2 · Unit 12 — Ideas & Society",      level: "B2", ids: ["40", "41", "42", "43", "44"] },
  { name: "C1 · Unit 13 — Sophistication",       level: "C1", ids: ["45", "46", "47", "48", "49"] },
  { name: "C1 · Unit 14 — Real-World Mastery",   level: "C1", ids: ["50", "51", "52", "53", "54"] },
  { name: "C2 · Unit 15 — Style & Subtlety",     level: "C2", ids: ["55", "56", "57", "58", "59"] },
  { name: "C2 · Unit 16 — Native-Like Command",  level: "C2", ids: ["60", "61", "62", "63", "64"] }
];

// Canonical lesson outline (title + slug per id). The dashboard and a few
// fallbacks read this so the app still works before every lesson file loads.
window.COURSE.outline = [
  { id: "00", level: "A1", slug: "getting-started",          title: "Getting Started: The Sounds of German" },
  { id: "01", level: "A1", slug: "greetings",                title: "Greetings & Introductions" },
  { id: "02", level: "A1", slug: "sein-and-pronouns",        title: "sein, Subject Pronouns & Where You're From" },
  { id: "03", level: "A1", slug: "numbers-and-age",          title: "Numbers 0–100, Age & Phone Numbers" },
  { id: "04", level: "A1", slug: "nouns-and-articles",       title: "Nouns, Gender & Articles (der/die/das)" },
  { id: "05", level: "A1", slug: "haben-and-family",         title: "haben, Family & Possessives" },
  { id: "06", level: "A1", slug: "present-verbs",            title: "Regular Verbs & Word Order (verb-second)" },
  { id: "07", level: "A1", slug: "time-and-dates",           title: "Telling Time, Days & Dates" },
  { id: "08", level: "A1", slug: "asking-questions",         title: "Asking Questions (W-Fragen & yes/no)" },
  { id: "09", level: "A1", slug: "accusative-case",          title: "The Accusative Case & kein" },
  { id: "10", level: "A1", slug: "cafe-and-ordering",        title: "At the Café: Ordering Food & Drink" },
  { id: "11", level: "A1", slug: "shopping-quantities",      title: "Shopping, Quantities & Prices" },
  { id: "12", level: "A1", slug: "modal-verbs",             title: "Modal Verbs (können, müssen, wollen…)" },

  { id: "13", level: "A2", slug: "adjectives-predicate",     title: "Describing People & Things" },
  { id: "14", level: "A2", slug: "comparatives",             title: "Comparing Things (Komparativ & Superlativ)" },
  { id: "15", level: "A2", slug: "weather-and-clothing",     title: "Weather, Seasons & Clothing" },
  { id: "16", level: "A2", slug: "perfekt-haben",            title: "The Past: Perfekt with haben" },
  { id: "17", level: "A2", slug: "perfekt-sein",             title: "Perfekt with sein" },
  { id: "18", level: "A2", slug: "praeteritum",              title: "The Präteritum (war, hatte & common verbs)" },
  { id: "19", level: "A2", slug: "dative-case",              title: "The Dative Case" },
  { id: "20", level: "A2", slug: "reflexive-routine",        title: "Reflexive Verbs & Daily Routine" },
  { id: "21", level: "A2", slug: "separable-verbs",          title: "Separable & Inseparable Verbs" },
  { id: "22", level: "A2", slug: "directions-imperative",    title: "Directions, Transport & the Imperative" },
  { id: "23", level: "A2", slug: "work-and-studies",         title: "Work, Studies & Professions" },
  { id: "24", level: "A2", slug: "health-and-advice",        title: "Health, the Body & Giving Advice" },

  { id: "25", level: "B1", slug: "two-way-prepositions",     title: "Two-Way Prepositions (Wechselpräpositionen)" },
  { id: "26", level: "B1", slug: "prepositions-cases",       title: "Prepositions with Accusative & Dative" },
  { id: "27", level: "B1", slug: "subordinate-clauses",      title: "Subordinate Clauses (weil, dass, wenn)" },
  { id: "28", level: "B1", slug: "adjective-endings",        title: "Adjective Endings" },
  { id: "29", level: "B1", slug: "future-tense",             title: "The Future (Futur I with werden)" },
  { id: "30", level: "B1", slug: "genitive-case",            title: "The Genitive Case" },
  { id: "31", level: "B1", slug: "relative-clauses",         title: "Relative Clauses" },
  { id: "32", level: "B1", slug: "konjunktiv-politeness",    title: "Konjunktiv II: Polite Requests & Wishes" },
  { id: "33", level: "B1", slug: "narrating-past",           title: "Narrating a Story in the Past" },
  { id: "34", level: "B1", slug: "connectors-idioms",        title: "Connectors & Everyday Idioms" },

  { id: "35", level: "B2", slug: "konjunktiv-hypothetical",  title: "Konjunktiv II: Hypotheticals & Conditions" },
  { id: "36", level: "B2", slug: "plusquamperfekt",          title: "The Pluperfect (Plusquamperfekt)" },
  { id: "37", level: "B2", slug: "passive-voice",            title: "The Passive (Vorgangspassiv)" },
  { id: "38", level: "B2", slug: "passive-advanced",         title: "Passive: Zustandspassiv, Modals & Alternatives" },
  { id: "39", level: "B2", slug: "reported-speech",          title: "Reported Speech (Konjunktiv I)" },
  { id: "40", level: "B2", slug: "opinions-debate",          title: "Expressing Opinions & Debating" },
  { id: "41", level: "B2", slug: "environment-society",      title: "Environment & Society" },
  { id: "42", level: "B2", slug: "abstract-description",     title: "Describing the Abstract & Nominalization" },
  { id: "43", level: "B2", slug: "register",                 title: "Register: Formal vs Informal" },
  { id: "44", level: "B2", slug: "verbs-prepositions",       title: "Verbs with Fixed Prepositions & da-/wo- Compounds" },

  { id: "45", level: "C1", slug: "extended-attributes",      title: "Participial & Extended Attributes" },
  { id: "46", level: "C1", slug: "hypotheticals-advanced",   title: "Advanced Hypotheticals (als ob & irreal comparisons)" },
  { id: "47", level: "C1", slug: "discourse-markers",        title: "Modal Particles & Discourse Markers (doch, mal, ja, eben)" },
  { id: "48", level: "C1", slug: "nuance-connotation",       title: "Nuance, Connotation & Register" },
  { id: "49", level: "C1", slug: "argumentative-essay",      title: "The Argumentative Essay (Erörterung)" },
  { id: "50", level: "C1", slug: "media-language",           title: "News & Media Language" },
  { id: "51", level: "C1", slug: "literature",               title: "Literature & Cultural Analysis" },
  { id: "52", level: "C1", slug: "colloquialisms",           title: "Colloquialisms & Umgangssprache" },
  { id: "53", level: "C1", slug: "precision-synonyms",       title: "Precision: Synonyms & Word Choice" },
  { id: "54", level: "C1", slug: "error-correction",         title: "Advanced Error Correction" },

  { id: "55", level: "C2", slug: "stylistics",               title: "Stylistics & Tone" },
  { id: "56", level: "C2", slug: "idiomatic-mastery",        title: "Idiomatic Mastery (Redewendungen & Sprichwörter)" },
  { id: "57", level: "C2", slug: "regional-varieties",       title: "German Varieties (Germany, Austria, Switzerland)" },
  { id: "58", level: "C2", slug: "professional-registers",   title: "Specialized & Professional Registers" },
  { id: "59", level: "C2", slug: "subtle-grammar",           title: "Subtle Grammatical Distinctions" },
  { id: "60", level: "C2", slug: "rhetoric",                 title: "Rhetoric & Persuasion" },
  { id: "61", level: "C2", slug: "authentic-texts",          title: "Analyzing Authentic Texts" },
  { id: "62", level: "C2", slug: "humor-wordplay",           title: "Humour, Irony & Wordplay" },
  { id: "63", level: "C2", slug: "native-pitfalls",          title: "Near-Native Pitfalls (false friends & Denglisch)" },
  { id: "64", level: "C2", slug: "capstone",                 title: "Capstone: Synthesis & Mastery" }
];
