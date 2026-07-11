// Lesson 04 — Present Tense: Regular Verbs (A1 · Unit 1 — First Steps)
window.COURSE = window.COURSE || { lessons: [] };
window.COURSE.lessons.push({
  id: "04",
  slug: "present-regular",
  unit: "A1 · Unit 1 — First Steps",
  title: "Present Tense: Regular Verbs",
  level: "A1",
  time: "~40 min",
  objectives: [
    "Conjugate regular -are, -ere and -ire verbs in the present tense.",
    "Use -isc- verbs like capire and finire correctly.",
    "Drop subject pronouns because the verb ending shows the person.",
    "Make any sentence negative with non before the verb."
  ],
  vocab: [
    { it: "parlare", say: "par-LA-reh", en: "to speak / to talk" },
    { it: "abitare", say: "ah-bee-TA-reh", en: "to live (reside)" },
    { it: "lavorare", say: "lah-vo-RA-reh", en: "to work" },
    { it: "mangiare", say: "man-JA-reh", en: "to eat" },
    { it: "prendere", say: "PREN-deh-reh", en: "to take / to have (food)" },
    { it: "scrivere", say: "SKREE-veh-reh", en: "to write" },
    { it: "leggere", say: "LEJ-jeh-reh", en: "to read" },
    { it: "dormire", say: "dor-MEE-reh", en: "to sleep" },
    { it: "aprire", say: "ah-PREE-reh", en: "to open" },
    { it: "capire", say: "kah-PEE-reh", en: "to understand" },
    { it: "finire", say: "fee-NEE-reh", en: "to finish" },
    { it: "preferire", say: "preh-feh-REE-reh", en: "to prefer" },
    { it: "non", say: "non", en: "not" },
    { it: "un po’", say: "oon PO", en: "a little / a bit" },
    { it: "insieme", say: "een-SYEH-meh", en: "together" },
    { it: "stasera", say: "stah-SEH-rah", en: "this evening / tonight" }
  ],
  dialogue: [
    { sp: "Luca", it: "Ciao Sara! Cosa fai? Lavori oggi?", en: "Hi Sara! What are you doing? Are you working today?" },
    { sp: "Sara", it: "No, oggi non lavoro. Scrivo un’email e poi leggo un libro.", en: "No, today I’m not working. I’m writing an email and then I’m reading a book." },
    { sp: "Luca", it: "Capisci sempre tutto, tu! Io non capisco questo libro.", en: "You always understand everything! I don’t understand this book." },
    { sp: "Sara", it: "Parli inglese? L’autore scrive in inglese.", en: "Do you speak English? The author writes in English." },
    { sp: "Luca", it: "Parlo un po’ inglese, ma preferisco l’italiano.", en: "I speak a little English, but I prefer Italian." },
    { sp: "Sara", it: "Stasera mangiamo insieme? Prendo io la pizza.", en: "Shall we eat together tonight? I’ll get the pizza." },
    { sp: "Luca", it: "Volentieri! A che ora finisci di lavorare di solito?", en: "Gladly! What time do you usually finish working?" },
    { sp: "Sara", it: "Finisco alle sette. Poi dormo un’ora e arrivo da te.", en: "I finish at seven. Then I sleep for an hour and come to your place." },
    { sp: "Luca", it: "Perfetto. Ti aspetto!", en: "Perfect. I’ll wait for you!" }
  ],
  reading: null,
  grammarHTML:
    "<h3>The three verb families</h3>" +
    "<p>Every Italian infinitive ends in <strong>-are</strong>, <strong>-ere</strong> or <strong>-ire</strong>. To conjugate a regular verb in the present, drop that ending to find the <em>stem</em>, then add the endings for each person.</p>" +
    "<table>" +
    "<tr><th>Pronoun</th><th>-are<br>parlare</th><th>-ere<br>prendere</th><th>-ire<br>dormire</th></tr>" +
    "<tr><td>io</td><td>parl<strong>o</strong></td><td>prend<strong>o</strong></td><td>dorm<strong>o</strong></td></tr>" +
    "<tr><td>tu</td><td>parl<strong>i</strong></td><td>prend<strong>i</strong></td><td>dorm<strong>i</strong></td></tr>" +
    "<tr><td>lui / lei</td><td>parl<strong>a</strong></td><td>prend<strong>e</strong></td><td>dorm<strong>e</strong></td></tr>" +
    "<tr><td>noi</td><td>parl<strong>iamo</strong></td><td>prend<strong>iamo</strong></td><td>dorm<strong>iamo</strong></td></tr>" +
    "<tr><td>voi</td><td>parl<strong>ate</strong></td><td>prend<strong>ete</strong></td><td>dorm<strong>ite</strong></td></tr>" +
    "<tr><td>loro</td><td>parl<strong>ano</strong></td><td>prend<strong>ono</strong></td><td>dorm<strong>ono</strong></td></tr>" +
    "</table>" +
    "<p>Notice that the <em>io</em>, <em>tu</em> and <em>noi</em> endings are identical for all three families (<strong>-o, -i, -iamo</strong>). Only the <em>lui/lei</em>, <em>voi</em> and <em>loro</em> forms differ.</p>" +
    "<h3>-ire verbs with -isc-</h3>" +
    "<p>Many common <strong>-ire</strong> verbs (such as <em>capire</em>, <em>finire</em>, <em>preferire</em>, <em>pulire</em>) insert <strong>-isc-</strong> in every singular form and in <em>loro</em>. The <em>noi</em> and <em>voi</em> forms stay regular.</p>" +
    "<table>" +
    "<tr><th>Pronoun</th><th>capire</th><th>finire</th></tr>" +
    "<tr><td>io</td><td>cap<strong>isc</strong>o</td><td>fin<strong>isc</strong>o</td></tr>" +
    "<tr><td>tu</td><td>cap<strong>isc</strong>i</td><td>fin<strong>isc</strong>i</td></tr>" +
    "<tr><td>lui / lei</td><td>cap<strong>isc</strong>e</td><td>fin<strong>isc</strong>e</td></tr>" +
    "<tr><td>noi</td><td>capiamo</td><td>finiamo</td></tr>" +
    "<tr><td>voi</td><td>capite</td><td>finite</td></tr>" +
    "<tr><td>loro</td><td>cap<strong>isc</strong>ono</td><td>fin<strong>isc</strong>ono</td></tr>" +
    "</table>" +
    "<p>Plain <em>-ire</em> verbs like <em>dormire</em>, <em>aprire</em>, <em>partire</em> and <em>sentire</em> take no <em>-isc-</em>. There is no rule of sound to predict the type, so learn each verb’s group as you meet it.</p>" +
    "<h3>Dropping the subject pronoun</h3>" +
    "<p>Because each ending already names the person, Italians normally <strong>omit</strong> the subject pronoun. <em>Parlo italiano</em> already means <em>I speak Italian</em> — you do not need <em>io</em>. Add the pronoun only for emphasis or contrast: <em>Io lavoro, tu dormi!</em> (<em>I work, you sleep!</em>).</p>" +
    "<h3>Negation with non</h3>" +
    "<p>To make a sentence negative, place <strong>non</strong> directly before the verb. <em>Capisco</em> → <em>Non capisco</em> (<em>I don’t understand</em>). <em>Lavoriamo oggi</em> → <em>Non lavoriamo oggi</em> (<em>We don’t work today</em>). English needs <em>do/does</em> for questions and negatives, but Italian does not — the verb form alone carries the meaning.</p>",
  pronTipHTML:
    "<p>In the <em>loro</em> forms (<em>parlano</em>, <em>prendono</em>, <em>dormono</em>, <em>capiscono</em>) the stress falls on the syllable <em>before</em> the ending — say <strong>PAR-lano</strong>, not <em>par-LA-no</em>. The endings <em>-ano</em> and <em>-ono</em> are unstressed and pronounced quickly.</p>",
  exercises: [
    {
      type: "conjugate",
      instructions: "Conjugate the -are verb <em>parlare</em> (to speak) in the present.",
      verb: "parlare",
      rows: [
        { pronoun: "io", answer: "parlo" },
        { pronoun: "tu", answer: "parli" },
        { pronoun: "lui/lei", answer: "parla" },
        { pronoun: "noi", answer: "parliamo" },
        { pronoun: "voi", answer: "parlate" },
        { pronoun: "loro", answer: "parlano" }
      ]
    },
    {
      type: "conjugate",
      instructions: "Conjugate the -isc- verb <em>capire</em> (to understand) in the present.",
      verb: "capire",
      rows: [
        { pronoun: "io", answer: "capisco" },
        { pronoun: "tu", answer: "capisci" },
        { pronoun: "lui/lei", answer: "capisce" },
        { pronoun: "noi", answer: "capiamo" },
        { pronoun: "voi", answer: "capite" },
        { pronoun: "loro", answer: "capiscono" }
      ]
    },
    {
      type: "mc",
      instructions: "Which form is correct? <em>Noi ___ una pizza.</em> (to take / have)",
      choices: ["prendo", "prendiamo", "prendono"],
      answer: "prendiamo"
    },
    {
      type: "mc",
      instructions: "Choose the -ire verb that does <strong>not</strong> use -isc-.",
      choices: ["finire", "dormire", "preferire"],
      answer: "dormire"
    },
    {
      type: "fill",
      instructions: "Complete with the present of <em>scrivere</em> (to write).",
      before: "Marco",
      after: "un’email.",
      cue: "lui — scrivere",
      answers: ["scrive"]
    },
    {
      type: "fill",
      instructions: "Make it negative: add the right word before the verb.",
      before: "Oggi io",
      after: "lavoro.",
      cue: "negation",
      answers: ["non"]
    },
    {
      type: "translate",
      instructions: "Translate into Italian (drop the subject pronoun).",
      prompt: "We finish at seven.",
      answers: ["Finiamo alle sette.", "Finiamo alle sette"]
    },
    {
      type: "translate",
      instructions: "Translate into Italian (drop the subject pronoun).",
      prompt: "I don’t understand.",
      answers: ["Non capisco.", "Non capisco"]
    },
    {
      type: "order",
      instructions: "Build the sentence: 'They sleep a little this evening.'",
      tokens: ["Stasera", "dormono", "un", "po’"],
      answers: ["Stasera dormono un po’.", "Stasera dormono un po’"]
    },
    {
      type: "match",
      instructions: "Match the Italian verb to its English meaning.",
      pairs: [
        { it: "leggere", en: "to read" },
        { it: "dormire", en: "to sleep" },
        { it: "lavorare", en: "to work" },
        { it: "preferire", en: "to prefer" },
        { it: "aprire", en: "to open" }
      ]
    },
    {
      type: "listen",
      instructions: "Type what you hear.",
      audio: "Non capisco, parli troppo veloce.",
      answers: ["Non capisco, parli troppo veloce."]
    }
  ],
  readAloud:
    "Sei il mio insegnante d’italiano. Aiutami a studiare la Lezione 4: il presente dei verbi regolari.\n" +
    "\n" +
    "Prima, leggi la lista di vocaboli. Per ogni parola: di’ la parola italiana, fai una pausa, poi di’ il significato in inglese, poi un’altra pausa prima della parola successiva.\n" +
    "parlare — to speak\n" +
    "abitare — to live (reside)\n" +
    "lavorare — to work\n" +
    "mangiare — to eat\n" +
    "prendere — to take / to have\n" +
    "scrivere — to write\n" +
    "leggere — to read\n" +
    "dormire — to sleep\n" +
    "aprire — to open\n" +
    "capire — to understand\n" +
    "finire — to finish\n" +
    "preferire — to prefer\n" +
    "non — not\n" +
    "un po’ — a little\n" +
    "insieme — together\n" +
    "stasera — this evening\n" +
    "\n" +
    "Adesso leggi il dialogo due volte. La prima volta, leggi lentamente e con chiarezza; la seconda volta, a velocità naturale.\n" +
    "Luca: Ciao Sara! Cosa fai? Lavori oggi?\n" +
    "Sara: No, oggi non lavoro. Scrivo un’email e poi leggo un libro.\n" +
    "Luca: Capisci sempre tutto, tu! Io non capisco questo libro.\n" +
    "Sara: Parli inglese? L’autore scrive in inglese.\n" +
    "Luca: Parlo un po’ inglese, ma preferisco l’italiano.\n" +
    "Sara: Stasera mangiamo insieme? Prendo io la pizza.\n" +
    "Luca: Volentieri! A che ora finisci di lavorare di solito?\n" +
    "Sara: Finisco alle sette. Poi dormo un’ora e arrivo da te.\n" +
    "Luca: Perfetto. Ti aspetto!\n" +
    "\n" +
    "Infine, chiedimi di coniugare ad alta voce un verbo regolare di ogni gruppo: parlare, prendere, dormire e capire.",
  discussion: null,
  flashcards: null,
  cultureHTML:
    "<p>In Italy, when friends arrange to <em>mangiare insieme</em> (eat together), splitting the bill is common but so is the warm gesture of one person offering: <em>“Offro io!”</em> (<em>It’s on me!</em>). Insisting to pay for the whole table — especially when you invited someone — is a sign of generosity and affection, and friends often take playful turns being the one who pays.</p>"
});
