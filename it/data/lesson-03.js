// Italian A1 — Lesson 03: Gender, Articles & Plurals
window.COURSE.lessons.push({
  id: "03",
  slug: "gender-articles",
  unit: "A1 · Unit 1 — First Steps",
  title: "Gender, Articles & Plurals",
  level: "A1",
  time: "~40 min",
  objectives: [
    "Tell whether a noun is masculine or feminine from its ending",
    "Choose the right definite article: il, lo, l’, la, i, gli, le",
    "Use the indefinite articles un, uno, una, un’",
    "Form the plural of regular nouns (-o→-i, -a→-e, -e→-i)"
  ],
  vocab: [
    { it: "il libro", say: "eel LEE-bro", en: "the book (m.)" },
    { it: "la casa", say: "lah KAH-zah", en: "the house (f.)" },
    { it: "lo studente", say: "loh stoo-DEN-teh", en: "the student (m.)" },
    { it: "lo zaino", say: "loh DZAH-ee-no", en: "the backpack (m.)" },
    { it: "l’amico", say: "lah-MEE-ko", en: "the friend (m.)" },
    { it: "l’amica", say: "lah-MEE-kah", en: "the friend (f.)" },
    { it: "la chiave", say: "lah kee-AH-veh", en: "the key (f.)" },
    { it: "il fiore", say: "eel fee-OH-reh", en: "the flower (m.)" },
    { it: "la stazione", say: "lah stah-tsee-OH-neh", en: "the station (f.)" },
    { it: "il ragazzo", say: "eel rah-GAHT-tso", en: "the boy" },
    { it: "la ragazza", say: "lah rah-GAHT-tsah", en: "the girl" },
    { it: "lo specchio", say: "loh SPEK-kee-oh", en: "the mirror (m.)" },
    { it: "gli gnocchi", say: "lyee NYOK-kee", en: "the gnocchi (m. pl.)" },
    { it: "uno psicologo", say: "OO-no see-KOH-lo-go", en: "a psychologist (m.)" }
  ],
  dialogue: [
    { sp: "Sara", it: "Guarda, è la casa nuova di Marco!", en: "Look, it’s Marco’s new house!" },
    { sp: "Luca", it: "Bella! E quello è il giardino?", en: "Nice! And is that the garden?" },
    { sp: "Sara", it: "Sì. Ci sono i fiori e gli alberi.", en: "Yes. There are the flowers and the trees." },
    { sp: "Luca", it: "Chi è lo studente alla porta?", en: "Who is the student at the door?" },
    { sp: "Sara", it: "È un amico di Marco, si chiama Ali.", en: "He’s a friend of Marco’s, his name is Ali." },
    { sp: "Luca", it: "E lei? È un’amica o una vicina?", en: "And her? Is she a friend or a neighbor?" },
    { sp: "Sara", it: "È una vicina. Ha uno zaino verde.", en: "She’s a neighbor. She has a green backpack." },
    { sp: "Luca", it: "Le ragazze sono simpatiche, vero?", en: "The girls are nice, right?" },
    { sp: "Sara", it: "Sì, e anche i ragazzi. Andiamo!", en: "Yes, and the boys too. Let’s go!" }
  ],
  reading: null,
  grammarHTML:
    "<h3>1. Noun gender</h3>" +
    "<p>Every Italian noun is <strong>masculine</strong> or <strong>feminine</strong>. The ending usually tells you which:</p>" +
    "<table>" +
    "<tr><th>Ending</th><th>Usual gender</th><th>Example</th></tr>" +
    "<tr><td>-o</td><td>masculine</td><td><em>il libr<strong>o</strong></em> (the book)</td></tr>" +
    "<tr><td>-a</td><td>feminine</td><td><em>la cas<strong>a</strong></em> (the house)</td></tr>" +
    "<tr><td>-e</td><td>either (must be learned)</td><td><em>il fior<strong>e</strong></em> (m.), <em>la chiav<strong>e</strong></em> (f.)</td></tr>" +
    "</table>" +
    "<p><em>Tip:</em> nouns in <strong>-zione</strong> (la stazione) and <strong>-tà</strong> (la città) are feminine.</p>" +
    "<h3>2. The definite article (“the”)</h3>" +
    "<p>The article changes with gender, number, and the <strong>first sound</strong> of the word that follows it. Use <strong>lo / gli</strong> before a word starting with <strong>s + consonant, z, gn, ps, x, y</strong> (and <em>pn-</em>); use <strong>l’</strong> before a vowel.</p>" +
    "<table>" +
    "<tr><th></th><th>Singular</th><th>Plural</th></tr>" +
    "<tr><td>Masc. (most words)</td><td>il</td><td>i</td></tr>" +
    "<tr><td>Masc. (s+cons., z, gn, ps, x, y)</td><td>lo</td><td>gli</td></tr>" +
    "<tr><td>Masc. (before vowel)</td><td>l’</td><td>gli</td></tr>" +
    "<tr><td>Fem.</td><td>la</td><td>le</td></tr>" +
    "<tr><td>Fem. (before vowel)</td><td>l’</td><td>le</td></tr>" +
    "</table>" +
    "<p>Examples: <em>il</em> libro → <em>i</em> libri; <em>lo</em> studente → <em>gli</em> studenti; <em>l’</em>amico → <em>gli</em> amici; <em>la</em> casa → <em>le</em> case; <em>l’</em>amica → <em>le</em> amiche.</p>" +
    "<h3>3. The indefinite article (“a / an”)</h3>" +
    "<p>It follows the same sound rule, but masculine has <strong>un</strong> vs <strong>uno</strong>, and feminine has <strong>una</strong> vs <strong>un’</strong> (apostrophe before a vowel).</p>" +
    "<table>" +
    "<tr><th>Gender / next sound</th><th>Article</th><th>Example</th></tr>" +
    "<tr><td>Masc., normal</td><td>un</td><td><em>un</em> libro, <em>un</em> amico</td></tr>" +
    "<tr><td>Masc., s+cons./z/gn/ps/x/y</td><td>uno</td><td><em>uno</em> studente, <em>uno</em> zaino</td></tr>" +
    "<tr><td>Fem., before consonant</td><td>una</td><td><em>una</em> casa</td></tr>" +
    "<tr><td>Fem., before vowel</td><td>un’</td><td><em>un’</em>amica</td></tr>" +
    "</table>" +
    "<p>Note: masculine <em>un</em> takes <strong>no apostrophe</strong> before a vowel (<em>un amico</em>), but feminine <em>un’</em> does (<em>un’amica</em>).</p>" +
    "<h3>4. Making nouns plural</h3>" +
    "<p>Regular nouns change their final vowel:</p>" +
    "<table>" +
    "<tr><th>Singular ending</th><th>Plural ending</th><th>Example</th></tr>" +
    "<tr><td>-o</td><td>-i</td><td>il libr<strong>o</strong> → i libr<strong>i</strong></td></tr>" +
    "<tr><td>-a</td><td>-e</td><td>la cas<strong>a</strong> → le cas<strong>e</strong></td></tr>" +
    "<tr><td>-e</td><td>-i</td><td>il fior<strong>e</strong> → i fior<strong>i</strong>; la chiav<strong>e</strong> → le chiav<strong>i</strong></td></tr>" +
    "</table>" +
    "<p><em>Spelling note:</em> nouns in <strong>-co/-go</strong> and <strong>-ca/-ga</strong> often add an <strong>h</strong> to keep the hard sound: <em>l’amica → le amich<strong>e</strong></em>, <em>lo gnocco → gli gnocch<strong>i</strong></em>.</p>",
  pronTipHTML:
    "<p>The whole point of <strong>lo / gli / l’ / uno / un’</strong> is to make words easy to say. Italian avoids awkward clusters, so it never says “il studente” — the smoother <em>lo studente</em> wins. Read groups aloud (<em>lo zaino</em>, <em>gli alberi</em>, <em>un’amica</em>) and let your ear, not a rule sheet, confirm them.</p>",
  exercises: [
    {
      type: "mc",
      instructions: "Which definite article goes with <em>studente</em>?",
      choices: ["il studente", "lo studente", "la studente"],
      answer: "lo studente"
    },
    {
      type: "mc",
      instructions: "Choose the correct indefinite article: ___ amica (a friend, f.).",
      choices: ["un amica", "uno amica", "un’amica"],
      answer: "un’amica"
    },
    {
      type: "fill",
      instructions: "Add the right definite article.",
      before: "",
      after: "zaino è nuovo.",
      cue: "masc. sing., word starts with z",
      answers: ["Lo", "lo"]
    },
    {
      type: "fill",
      instructions: "Make it plural: write the plural article + noun.",
      before: "il libro →",
      after: "",
      cue: "-o → -i",
      answers: ["i libri"]
    },
    {
      type: "match",
      instructions: "Match Italian to English.",
      pairs: [
        { it: "la casa", en: "the house" },
        { it: "gli studenti", en: "the students" },
        { it: "un’amica", en: "a friend (f.)" },
        { it: "i fiori", en: "the flowers" },
        { it: "lo specchio", en: "the mirror" }
      ]
    },
    {
      type: "translate",
      instructions: "Translate.",
      prompt: "the boys and the girls",
      answers: ["i ragazzi e le ragazze"]
    },
    {
      type: "translate",
      instructions: "Translate.",
      prompt: "a backpack and a book",
      answers: ["uno zaino e un libro"]
    },
    {
      type: "order",
      instructions: "Build the sentence: ‘The friend (m.) has a mirror.’",
      tokens: ["L’amico", "ha", "uno", "specchio"],
      answers: ["L’amico ha uno specchio."]
    },
    {
      type: "listen",
      instructions: "Type what you hear.",
      audio: "Gli amici sono alla stazione.",
      answers: ["Gli amici sono alla stazione."]
    },
    {
      type: "fill",
      instructions: "Make it plural: write the plural article + noun.",
      before: "la chiave →",
      after: "",
      cue: "-e → -i (feminine)",
      answers: ["le chiavi"]
    }
  ],
  readAloud:
    "Sei il mio insegnante d’italiano. Aiutami con la Lezione 3: genere, articoli e plurali.\n" +
    "\n" +
    "Prima, leggi la lista di vocaboli: di’ la parola italiana, fai una pausa, poi l’inglese, poi un’altra pausa. Procedi lentamente:\n" +
    "il libro — the book\n" +
    "la casa — the house\n" +
    "lo studente — the student\n" +
    "lo zaino — the backpack\n" +
    "l’amico — the friend (m.)\n" +
    "l’amica — the friend (f.)\n" +
    "la chiave — the key\n" +
    "il fiore — the flower\n" +
    "la stazione — the station\n" +
    "il ragazzo — the boy\n" +
    "la ragazza — the girl\n" +
    "lo specchio — the mirror\n" +
    "gli gnocchi — the gnocchi\n" +
    "uno psicologo — a psychologist\n" +
    "\n" +
    "Poi leggi il dialogo due volte: la prima volta lentamente, la seconda volta a velocità naturale.\n" +
    "Sara: Guarda, è la casa nuova di Marco!\n" +
    "Luca: Bella! E quello è il giardino?\n" +
    "Sara: Sì. Ci sono i fiori e gli alberi.\n" +
    "Luca: Chi è lo studente alla porta?\n" +
    "Sara: È un amico di Marco, si chiama Ali.\n" +
    "Luca: E lei? È un’amica o una vicina?\n" +
    "Sara: È una vicina. Ha uno zaino verde.\n" +
    "Luca: Le ragazze sono simpatiche, vero?\n" +
    "Sara: Sì, e anche i ragazzi. Andiamo!\n" +
    "\n" +
    "Infine, fammi alcune domande: chiedimi l’articolo giusto per una parola e correggimi con gentilezza.",
  discussion: null,
  flashcards: null,
  cultureHTML:
    "<p>In Italy you’ll hear articles attached to almost everything, even places and, in some regions, names — Tuscans famously say <em>la Maria</em> or <em>il Giovanni</em> in casual speech. Articles are also obligatory with body parts and possessions (<em>mi lavo <strong>le</strong> mani</em>, “I wash my hands”), so getting <em>il/lo/la/i/gli/le</em> right early on makes everyday Italian sound natural fast.</p>"
});
