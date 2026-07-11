window.COURSE.lessons.push({
  id: "07",
  slug: "food-ordering",
  unit: "A1 · Unit 2 — Everyday Basics",
  title: "Food & Ordering at a Café",
  level: "A1",
  time: "~45 min",
  objectives: [
    "Name common café foods and drinks in Spanish.",
    "Order politely with “quiero” and “para mí”.",
    "Ask for the price and the bill.",
    "Use the verb querer (to want) in the present tense.",
    "Handle a short, natural café exchange from start to finish."
  ],
  vocab: [
    { es: "el café", say: "el kah-FEH", en: "coffee" },
    { es: "el té", say: "el TEH", en: "tea" },
    { es: "el agua", say: "el AH-gwah", en: "water" },
    { es: "el jugo", say: "el HOO-goh", en: "juice" },
    { es: "la leche", say: "lah LEH-cheh", en: "milk" },
    { es: "el pan", say: "el PAHN", en: "bread" },
    { es: "el sándwich", say: "el SAHND-weech", en: "sandwich" },
    { es: "la torta", say: "lah TOR-tah", en: "cake" },
    { es: "el azúcar", say: "el ah-SOO-kar", en: "sugar" },
    { es: "la cuenta", say: "lah KWEN-tah", en: "the bill / check" },
    { es: "el menú", say: "el meh-NOO", en: "menu" },
    { es: "quiero", say: "KYEH-roh", en: "I want" },
    { es: "para mí", say: "PAH-rah MEE", en: "for me" },
    { es: "¿cuánto cuesta?", say: "KWAN-toh KWES-tah", en: "how much is it?" },
    { es: "rico", say: "REE-koh", en: "delicious / tasty" },
    { es: "la mesa", say: "lah MEH-sah", en: "table" }
  ],
  dialogue: [
    { sp: "Mesero", es: "Buenas tardes. ¿Qué desea?", en: "Good afternoon. What would you like?" },
    { sp: "Cliente", es: "Hola. Quiero un café con leche, por favor.", en: "Hi. I want a coffee with milk, please." },
    { sp: "Mesero", es: "Muy bien. ¿Algo de comer?", en: "Very good. Anything to eat?" },
    { sp: "Cliente", es: "Sí, un sándwich y una torta.", en: "Yes, a sandwich and a slice of cake." },
    { sp: "Mesero", es: "¿La torta es para usted?", en: "Is the cake for you?" },
    { sp: "Cliente", es: "Sí, para mí. ¿Cuánto cuesta?", en: "Yes, for me. How much is it?" },
    { sp: "Mesero", es: "Cinco dólares en total.", en: "Five dollars in total." },
    { sp: "Cliente", es: "Perfecto. Aquí tiene.", en: "Perfect. Here you go." },
    { sp: "Mesero", es: "Gracias. ¡Buen provecho!", en: "Thank you. Enjoy your meal!" },
    { sp: "Cliente", es: "¡Muy rico! La cuenta, por favor.", en: "Very tasty! The bill, please." }
  ],
  grammarHTML:
    "<h3>The verb <em>querer</em> (to want)</h3>" +
    "<p>To order, you mostly need one verb: <strong>querer</strong>. It is a little irregular — the <em>e</em> becomes <em>ie</em> in most forms. Just say <em>quiero</em> + the thing you want.</p>" +
    "<table><tr><th>Pronoun</th><th>Querer</th><th>English</th></tr>" +
    "<tr><td>yo</td><td>quiero</td><td>I want</td></tr>" +
    "<tr><td>tú</td><td>quieres</td><td>you want</td></tr>" +
    "<tr><td>él / ella / usted</td><td>quiere</td><td>he/she wants, you (formal) want</td></tr>" +
    "<tr><td>nosotros</td><td>queremos</td><td>we want</td></tr>" +
    "<tr><td>ellos / ustedes</td><td>quieren</td><td>they / you (plural) want</td></tr></table>" +
    "<h3>Articles: un / una</h3>" +
    "<p>“A / an” is <strong>un</strong> for masculine words and <strong>una</strong> for feminine words.</p>" +
    "<table><tr><th>Gender</th><th>Article</th><th>Example</th></tr>" +
    "<tr><td>masculine</td><td>un</td><td><em>un café</em>, <em>un jugo</em></td></tr>" +
    "<tr><td>feminine</td><td>una</td><td><em>una torta</em>, <em>una mesa</em></td></tr></table>" +
    "<h3>Ordering politely</h3>" +
    "<ul>" +
    "<li><em>Quiero un café, por favor.</em> — I want a coffee, please.</li>" +
    "<li><em>Para mí, un té.</em> — For me, a tea.</li>" +
    "<li><em>¿Cuánto cuesta?</em> — How much is it?</li>" +
    "<li><em>La cuenta, por favor.</em> — The bill, please.</li>" +
    "</ul>",
  pronTipHTML:
    "<p><strong>The “qu” combination</strong> always sounds like a hard <em>k</em>, and the <em>u</em> is silent: <em>quiero</em> = KYEH-roh, <em>¿qué?</em> = KEH. Never an English “kw” sound there.</p>" +
    "<p><strong>But “cu” keeps the w sound:</strong> <em>cuenta</em> = KWEN-tah, <em>¿cuánto?</em> = KWAN-toh. So <em>qu</em> = k, <em>cu</em> = kw.</p>",
  reading: null,
  discussion: null,
  flashcards: null,
  exercises: [
    { type: "conjugate", instructions: "Conjugate <em>querer</em> (present tense).", verb: "querer (present)", rows: [
      { pronoun: "yo", answer: "quiero" },
      { pronoun: "tú", answer: "quieres" },
      { pronoun: "él/ella/usted", answer: "quiere" },
      { pronoun: "nosotros", answer: "queremos" },
      { pronoun: "ellos/ustedes", answer: "quieren" }
    ] },
    { type: "mc", instructions: "Which article goes with <em>torta</em>?", choices: ["un", "una", "el"], answer: "una" },
    { type: "fill", instructions: "Complete the order: “I want a coffee, please.”", before: "", after: "un café, por favor.", cue: "I want", answers: ["Quiero", "quiero"] },
    { type: "translate", instructions: "Translate: “How much is it?”", prompt: "How much is it?", answers: ["¿cuánto cuesta?", "cuanto cuesta", "¿Cuánto cuesta?"] },
    { type: "translate", instructions: "Translate: “The bill, please.”", prompt: "The bill, please.", answers: ["la cuenta, por favor", "la cuenta por favor"] },
    { type: "listen", instructions: "Type the phrase you hear.", audio: "Quiero un café con leche", answers: ["Quiero un café con leche", "quiero un cafe con leche"] },
    { type: "match", instructions: "Match Spanish to English.", pairs: [
      { es: "el café", en: "coffee" },
      { es: "el agua", en: "water" },
      { es: "el pan", en: "bread" },
      { es: "la cuenta", en: "the bill" },
      { es: "la mesa", en: "table" }
    ] },
    { type: "order", instructions: "Build the sentence: “I want a tea, please.”", tokens: ["Quiero", "un", "té,", "por", "favor."], answers: ["Quiero un té, por favor."] }
  ],
  readAloud:
    "You are my Spanish tutor. I'm an absolute beginner.\n" +
    "First, read this vocabulary aloud one item at a time — Spanish word, pause, English meaning, pause:\n" +
    "el café / el té / el agua / el jugo / la leche / el pan / el sándwich / la torta / el azúcar / la cuenta / el menú / quiero / para mí / ¿cuánto cuesta? / rico / la mesa.\n" +
    "Then read this dialogue aloud TWICE — first slowly, then at natural speed. Read ONLY the Spanish, with a clear accent:\n\n" +
    "Buenas tardes. ¿Qué desea?\n" +
    "Hola. Quiero un café con leche, por favor.\n" +
    "Muy bien. ¿Algo de comer?\n" +
    "Sí, un sándwich y una torta.\n" +
    "¿La torta es para usted?\n" +
    "Sí, para mí. ¿Cuánto cuesta?\n" +
    "Cinco dólares en total.\n" +
    "Perfecto. Aquí tiene.\n" +
    "Gracias. ¡Buen provecho!\n" +
    "¡Muy rico! La cuenta, por favor.",
  cultureHTML:
    "<p>In much of Latin America, the café is a place to <strong>sit and linger</strong>, not grab-and-go. You'll usually wait to be seated, and the waiter (<em>el mesero</em> in Mexico, <em>el mozo</em> in much of South America) brings a menu to the table.</p>" +
    "<p>The bill rarely comes until you ask: a simple <em>“La cuenta, por favor”</em> signals you're ready. Tipping (<em>la propina</em>) is common but modest — around 10% — and before eating, people often say <strong>¡Buen provecho!</strong>, a friendly “enjoy your meal.”</p>"
});
