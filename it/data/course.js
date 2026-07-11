// Italian A1 → C2 — course data root.
// Each data/lesson-NN.js file pushes one lesson into window.COURSE.lessons.
// Loaded via <script> tags in index.html (no fetch, so it works from file://).
window.COURSE = window.COURSE || { lessons: [] };

// CEFR levels, in order, with a short "can-do" summary for the dashboard.
window.COURSE.levels = [
  { code: "A1", name: "Beginner",            blurb: "Survival basics: greet people, introduce yourself, handle numbers, food and simple questions." },
  { code: "A2", name: "Elementary",          blurb: "Talk about the past (passato prossimo & imperfetto) and routines, shop, describe weather and health, express likes." },
  { code: "B1", name: "Intermediate",        blurb: "Use the future and conditional, the particles ne/ci and object pronouns, narrate, give opinions, handle travel and work." },
  { code: "B2", name: "Upper-Intermediate",  blurb: "Debate, report speech, master the congiuntivo, the passive and si-constructions, discuss society in detail." },
  { code: "C1", name: "Advanced",            blurb: "Argue with nuance, use the periodo ipotetico, discourse markers and idioms, read media and literature." },
  { code: "C2", name: "Mastery",             blurb: "Command register, style, regional varieties, irony and near-native subtlety." }
];

// Unit groupings used to organise the sidebar navigation (two per level).
window.COURSE.units = [
  { name: "A1 · Unit 1 — First Steps",          level: "A1", ids: ["00", "01", "02", "03", "04"] },
  { name: "A1 · Unit 2 — Everyday Basics",      level: "A1", ids: ["05", "06", "07", "08", "09"] },
  { name: "A2 · Unit 3 — Talking About the Past", level: "A2", ids: ["10", "11", "12", "13", "14"] },
  { name: "A2 · Unit 4 — Daily Life & Needs",   level: "A2", ids: ["15", "16", "17", "18", "19"] },
  { name: "B1 · Unit 5 — Mood & Nuance",        level: "B1", ids: ["20", "21", "22", "23", "24"] },
  { name: "B1 · Unit 6 — Getting Things Done",  level: "B1", ids: ["25", "26", "27", "28", "29"] },
  { name: "B2 · Unit 7 — Advanced Structures",  level: "B2", ids: ["30", "31", "32", "33", "34"] },
  { name: "B2 · Unit 8 — Ideas & Society",      level: "B2", ids: ["35", "36", "37", "38", "39"] },
  { name: "C1 · Unit 9 — Sophistication",       level: "C1", ids: ["40", "41", "42", "43", "44"] },
  { name: "C1 · Unit 10 — Real-World Mastery",  level: "C1", ids: ["45", "46", "47", "48", "49"] },
  { name: "C2 · Unit 11 — Style & Subtlety",    level: "C2", ids: ["50", "51", "52", "53", "54"] },
  { name: "C2 · Unit 12 — Native-Like Command", level: "C2", ids: ["55", "56", "57", "58", "59"] }
];

// Canonical lesson outline (title + slug per id). The dashboard and a few
// fallbacks read this so the app still works before every lesson file loads.
window.COURSE.outline = [
  { id: "00", level: "A1", slug: "alphabet-sounds",      title: "Alphabet, Sounds & Survival Phrases" },
  { id: "01", level: "A1", slug: "greetings",            title: "Greetings & Introductions" },
  { id: "02", level: "A1", slug: "essere-avere",         title: "Essere & Avere (to be / to have)" },
  { id: "03", level: "A1", slug: "gender-articles",      title: "Gender, Articles & Plurals" },
  { id: "04", level: "A1", slug: "present-regular",      title: "Present Tense: Regular Verbs" },
  { id: "05", level: "A1", slug: "numbers-time",         title: "Numbers, Time & Dates" },
  { id: "06", level: "A1", slug: "family-possessives",   title: "Family & Possessives" },
  { id: "07", level: "A1", slug: "food-ordering",        title: "Food & Ordering at the Bar" },
  { id: "08", level: "A1", slug: "irregular-verbs",      title: "Common Irregular Verbs (andare, fare, venire)" },
  { id: "09", level: "A1", slug: "questions-directions", title: "Questions, Directions & Places" },

  { id: "10", level: "A2", slug: "passato-prossimo-avere", title: "Passato Prossimo with Avere" },
  { id: "11", level: "A2", slug: "passato-prossimo-essere", title: "Passato Prossimo with Essere" },
  { id: "12", level: "A2", slug: "imperfetto",           title: "The Imperfetto" },
  { id: "13", level: "A2", slug: "passato-vs-imperfetto", title: "Passato Prossimo vs Imperfetto" },
  { id: "14", level: "A2", slug: "reflexives-routine",   title: "Reflexive Verbs & Daily Routine" },
  { id: "15", level: "A2", slug: "comparatives",         title: "Comparatives & Superlatives" },
  { id: "16", level: "A2", slug: "piacere",              title: "Piacere & Similar Verbs" },
  { id: "17", level: "A2", slug: "weather-seasons",      title: "Weather & Seasons" },
  { id: "18", level: "A2", slug: "shopping-clothing",    title: "Shopping & Clothing" },
  { id: "19", level: "A2", slug: "health-body",          title: "Health & the Body" },

  { id: "20", level: "B1", slug: "future",               title: "The Future Tense (futuro semplice)" },
  { id: "21", level: "B1", slug: "prepositions",         title: "Articulated Prepositions (di, a, da, in, su)" },
  { id: "22", level: "B1", slug: "conditional",          title: "The Conditional & Polite Requests" },
  { id: "23", level: "B1", slug: "ne-ci",                title: "The Particles Ne & Ci" },
  { id: "24", level: "B1", slug: "object-pronouns",      title: "Object Pronouns (direct, indirect & combined)" },
  { id: "25", level: "B1", slug: "travel-transport",     title: "Travel & Transport" },
  { id: "26", level: "B1", slug: "work-studies",         title: "Work & Studies" },
  { id: "27", level: "B1", slug: "imperative",           title: "Commands (the Imperative)" },
  { id: "28", level: "B1", slug: "narrating",            title: "Narrating a Story" },
  { id: "29", level: "B1", slug: "idioms-connectors",    title: "Idioms & Connectors" },

  { id: "30", level: "B2", slug: "subjunctive-intro",    title: "Present Subjunctive: Wishes, Doubt & Emotion" },
  { id: "31", level: "B2", slug: "subjunctive-conjunctions", title: "Subjunctive after Conjunctions & Impersonals" },
  { id: "32", level: "B2", slug: "trapassato",           title: "The Trapassato Prossimo (pluperfect)" },
  { id: "33", level: "B2", slug: "passive-si",           title: "The Passive & \"si\" Constructions" },
  { id: "34", level: "B2", slug: "reported-speech",      title: "Reported Speech (discorso indiretto)" },
  { id: "35", level: "B2", slug: "opinions-debate",      title: "Expressing Opinions & Debating" },
  { id: "36", level: "B2", slug: "environment-society",  title: "Environment & Society" },
  { id: "37", level: "B2", slug: "abstract-description", title: "Describing the Abstract" },
  { id: "38", level: "B2", slug: "register",             title: "Register: Formal vs Informal (Lei vs tu)" },
  { id: "39", level: "B2", slug: "idiomatic-verbs",      title: "Pronominal & Idiomatic Verbs (farcela, andarsene)" },

  { id: "40", level: "C1", slug: "imperfect-subjunctive", title: "Imperfect & Pluperfect Subjunctive" },
  { id: "41", level: "C1", slug: "hypotheticals",        title: "The Periodo Ipotetico & Hypotheticals" },
  { id: "42", level: "C1", slug: "discourse-markers",    title: "Advanced Connectors & Discourse Markers" },
  { id: "43", level: "C1", slug: "nuance-connotation",   title: "Nuance, Connotation & Register" },
  { id: "44", level: "C1", slug: "argumentative-essay",  title: "The Argumentative Essay" },
  { id: "45", level: "C1", slug: "media-language",       title: "News & Media Language" },
  { id: "46", level: "C1", slug: "literature",           title: "Literature & the Passato Remoto" },
  { id: "47", level: "C1", slug: "colloquialisms",       title: "Colloquialisms & Slang" },
  { id: "48", level: "C1", slug: "precision-synonyms",   title: "Precision: Synonyms & Word Choice" },
  { id: "49", level: "C1", slug: "error-correction",     title: "Advanced Error Correction" },

  { id: "50", level: "C2", slug: "stylistics",           title: "Stylistics & Tone" },
  { id: "51", level: "C2", slug: "idiomatic-mastery",    title: "Idiomatic Mastery" },
  { id: "52", level: "C2", slug: "regional-varieties",   title: "Regional Varieties (North, South & Tuscan)" },
  { id: "53", level: "C2", slug: "professional-registers", title: "Specialized & Professional Registers" },
  { id: "54", level: "C2", slug: "subtle-grammar",       title: "Subtle Grammatical Distinctions" },
  { id: "55", level: "C2", slug: "rhetoric",             title: "Rhetoric & Persuasion" },
  { id: "56", level: "C2", slug: "authentic-texts",      title: "Analyzing Authentic Texts" },
  { id: "57", level: "C2", slug: "humor-wordplay",       title: "Humor, Irony & Wordplay" },
  { id: "58", level: "C2", slug: "native-pitfalls",      title: "Near-Native Pitfalls (false friends & calques)" },
  { id: "59", level: "C2", slug: "capstone",             title: "Capstone: Synthesis & Mastery" }
];
