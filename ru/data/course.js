// Russian A1 → C2 — course data root.
// Each data/lesson-NN.js file pushes one lesson into window.COURSE.lessons.
// Loaded via <script> tags in index.html (no fetch, so it works from file://).
window.COURSE = window.COURSE || { lessons: [] };

// CEFR levels, in order, with a short "can-do" summary for the dashboard.
window.COURSE.levels = [
  { code: "A1", name: "Beginner",            blurb: "Read Cyrillic, greet people, introduce yourself, handle numbers, and use your first cases and verbs." },
  { code: "A2", name: "Elementary",          blurb: "Use all six cases, talk about the past and future, master verb aspect, and describe daily life." },
  { code: "B1", name: "Intermediate",        blurb: "Handle verbs of motion, give commands, use the conditional, narrate, and manage travel and work." },
  { code: "B2", name: "Upper-Intermediate",  blurb: "Use participles and gerunds, decline numerals, debate, report speech, and discuss society." },
  { code: "C1", name: "Advanced",            blurb: "Argue with nuance, use discourse markers and word-formation, read media and literature." },
  { code: "C2", name: "Mastery",             blurb: "Command register, style, regional varieties, irony and near-native subtlety." }
];

// Unit groupings used to organise the sidebar navigation. A1 opens with a
// dedicated Cyrillic foundation unit (the alphabet is a non-Latin script).
window.COURSE.units = [
  { name: "A1 · Unit 0 — The Cyrillic Alphabet", level: "A1", ids: ["00", "01", "02", "03"] },
  { name: "A1 · Unit 1 — First Steps",           level: "A1", ids: ["04", "05", "06", "07", "08"] },
  { name: "A1 · Unit 2 — Everyday Basics",       level: "A1", ids: ["09", "10", "11", "12", "13"] },
  { name: "A2 · Unit 3 — Cases & The Past",      level: "A2", ids: ["14", "15", "16", "17", "18"] },
  { name: "A2 · Unit 4 — Daily Life & Needs",    level: "A2", ids: ["19", "20", "21", "22", "23"] },
  { name: "B1 · Unit 5 — Motion & Nuance",       level: "B1", ids: ["24", "25", "26", "27", "28"] },
  { name: "B1 · Unit 6 — Getting Things Done",   level: "B1", ids: ["29", "30", "31", "32", "33"] },
  { name: "B2 · Unit 7 — Advanced Structures",   level: "B2", ids: ["34", "35", "36", "37", "38"] },
  { name: "B2 · Unit 8 — Ideas & Society",       level: "B2", ids: ["39", "40", "41", "42", "43"] },
  { name: "C1 · Unit 9 — Sophistication",        level: "C1", ids: ["44", "45", "46", "47", "48"] },
  { name: "C1 · Unit 10 — Real-World Mastery",   level: "C1", ids: ["49", "50", "51", "52", "53"] },
  { name: "C2 · Unit 11 — Style & Subtlety",     level: "C2", ids: ["54", "55", "56", "57", "58"] },
  { name: "C2 · Unit 12 — Native-Like Command",  level: "C2", ids: ["59", "60", "61", "62", "63"] }
];

// Canonical lesson outline (title + slug per id). The dashboard and a few
// fallbacks read this so the app still works before every lesson file loads.
window.COURSE.outline = [
  { id: "00", level: "A1", slug: "cyrillic-1-familiar",     title: "Cyrillic I: Letters That Look & Sound Familiar" },
  { id: "01", level: "A1", slug: "cyrillic-2-false-friends", title: "Cyrillic II: False Friends" },
  { id: "02", level: "A1", slug: "cyrillic-3-new-letters",  title: "Cyrillic III: Brand-New Letters & Sounds" },
  { id: "03", level: "A1", slug: "cyrillic-4-signs-stress", title: "Cyrillic IV: Signs, Stress & Vowel Reduction" },

  { id: "04", level: "A1", slug: "greetings",           title: "Greetings & Introductions" },
  { id: "05", level: "A1", slug: "gender-pronouns",     title: "Noun Gender & Personal Pronouns" },
  { id: "06", level: "A1", slug: "to-be-this",          title: "“To Be”, Это & Simple Sentences" },
  { id: "07", level: "A1", slug: "present-tense",       title: "Present Tense: Verb Conjugation" },
  { id: "08", level: "A1", slug: "numbers-age",         title: "Numbers, Counting & Age" },

  { id: "09", level: "A1", slug: "prepositional-place", title: "Prepositional Case: Saying Where" },
  { id: "10", level: "A1", slug: "accusative-objects",  title: "Accusative Case: Direct Objects" },
  { id: "11", level: "A1", slug: "family-possessives",  title: "Family & Possessive Pronouns" },
  { id: "12", level: "A1", slug: "food-cafe",           title: "Food & Ordering at a Café" },
  { id: "13", level: "A1", slug: "questions-directions", title: "Questions, Directions & Places" },

  { id: "14", level: "A2", slug: "genitive-case",       title: "The Genitive Case: Of, Have & None" },
  { id: "15", level: "A2", slug: "dative-case",         title: "The Dative Case: To/For & Liking" },
  { id: "16", level: "A2", slug: "instrumental-case",   title: "The Instrumental Case: With & By" },
  { id: "17", level: "A2", slug: "past-tense",          title: "The Past Tense" },
  { id: "18", level: "A2", slug: "aspect-intro",        title: "Verb Aspect: Imperfective vs Perfective" },

  { id: "19", level: "A2", slug: "future-tense",        title: "The Future Tense (Both Aspects)" },
  { id: "20", level: "A2", slug: "reflexive-routine",   title: "Reflexive Verbs & Daily Routine" },
  { id: "21", level: "A2", slug: "plurals-cases",       title: "Plural Nouns Across the Cases" },
  { id: "22", level: "A2", slug: "adjectives",          title: "Adjectives & Agreement" },
  { id: "23", level: "A2", slug: "shopping-clothing",   title: "Shopping, Clothing & Money" },

  { id: "24", level: "B1", slug: "verbs-of-motion-1",   title: "Verbs of Motion: Going" },
  { id: "25", level: "B1", slug: "verbs-of-motion-2",   title: "Verbs of Motion: Prefixes" },
  { id: "26", level: "B1", slug: "comparatives",        title: "Comparatives & Superlatives" },
  { id: "27", level: "B1", slug: "imperative",          title: "Commands (the Imperative)" },
  { id: "28", level: "B1", slug: "conditional-by",      title: "The Conditional & «бы»" },

  { id: "29", level: "B1", slug: "time-expressions",    title: "Telling Time, Dates & Duration" },
  { id: "30", level: "B1", slug: "travel-transport",    title: "Travel & Transport" },
  { id: "31", level: "B1", slug: "work-studies",        title: "Work & Studies" },
  { id: "32", level: "B1", slug: "relative-clauses",    title: "Relative Clauses (который)" },
  { id: "33", level: "B1", slug: "narrating",           title: "Narrating a Story" },

  { id: "34", level: "B2", slug: "aspect-advanced",     title: "Aspect in Depth: Nuance & Pairs" },
  { id: "35", level: "B2", slug: "participles-active",  title: "Active Participles" },
  { id: "36", level: "B2", slug: "participles-passive", title: "Passive Participles & Constructions" },
  { id: "37", level: "B2", slug: "gerunds",             title: "Verbal Adverbs (Деепричастия)" },
  { id: "38", level: "B2", slug: "numbers-quantifiers", title: "Numerals & Quantifier Agreement" },

  { id: "39", level: "B2", slug: "opinions-debate",     title: "Expressing Opinions & Debating" },
  { id: "40", level: "B2", slug: "environment-society", title: "Environment & Society" },
  { id: "41", level: "B2", slug: "reported-speech",     title: "Reported Speech" },
  { id: "42", level: "B2", slug: "register-formal",     title: "Register: Formal vs Informal" },
  { id: "43", level: "B2", slug: "idiomatic-verbs",     title: "Prefixed Verbs & Idiomatic Meanings" },

  { id: "44", level: "C1", slug: "discourse-markers",   title: "Advanced Connectors & Discourse Markers" },
  { id: "45", level: "C1", slug: "nuance-connotation",  title: "Nuance, Connotation & Register" },
  { id: "46", level: "C1", slug: "word-formation",      title: "Word Formation: Roots, Prefixes & Suffixes" },
  { id: "47", level: "C1", slug: "argumentative-essay", title: "The Argumentative Essay" },
  { id: "48", level: "C1", slug: "media-language",      title: "News & Media Language" },

  { id: "49", level: "C1", slug: "literature",          title: "Literature & Cultural Analysis" },
  { id: "50", level: "C1", slug: "colloquialisms",      title: "Colloquialisms & Slang" },
  { id: "51", level: "C1", slug: "precision-synonyms",  title: "Precision: Synonyms & Word Choice" },
  { id: "52", level: "C1", slug: "diminutives-expressives", title: "Diminutives & Expressive Morphology" },
  { id: "53", level: "C1", slug: "error-correction",    title: "Advanced Error Correction" },

  { id: "54", level: "C2", slug: "stylistics",          title: "Stylistics & Tone" },
  { id: "55", level: "C2", slug: "idiomatic-mastery",   title: "Idiomatic Mastery" },
  { id: "56", level: "C2", slug: "regional-colloquial", title: "Regional & Colloquial Varieties" },
  { id: "57", level: "C2", slug: "professional-registers", title: "Specialized & Professional Registers" },
  { id: "58", level: "C2", slug: "subtle-grammar",      title: "Subtle Grammatical Distinctions" },

  { id: "59", level: "C2", slug: "rhetoric",            title: "Rhetoric & Persuasion" },
  { id: "60", level: "C2", slug: "authentic-texts",     title: "Analyzing Authentic Texts" },
  { id: "61", level: "C2", slug: "humor-wordplay",      title: "Humor, Irony & Wordplay" },
  { id: "62", level: "C2", slug: "native-pitfalls",     title: "Near-Native Pitfalls" },
  { id: "63", level: "C2", slug: "capstone",            title: "Capstone: Synthesis & Mastery" }
];
