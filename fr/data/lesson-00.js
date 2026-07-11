window.COURSE.lessons.push({
  id: "00",
  slug: "getting-started",
  unit: "Unit 0 — Getting Started",
  title: "Getting Started: The Sounds of French",
  level: "A1",
  time: "~45 min",
  objectives: [
    "Recognise that many final letters are silent.",
    "Produce the French vowel sounds, including the tricky u and the nasal vowels.",
    "Pronounce ch, j/g, r, gn and other consonants that differ from English.",
    "Say the French alphabet and spell your name aloud."
  ],
  vocab: [],
  dialogue: [],
  grammarHTML:
    "<h3>The single most important rule</h3>" +
    "<p><strong>Most final consonants are silent. A final -e is silent too.</strong> So <em>salut</em> = <em>sa-LEW</em>, <em>Paris</em> = <em>pa-REE</em>, <em>grand</em> = <em>grahn</em>, <em>France</em> = <em>frahnss</em>.</p>" +
    "<p>Memory aid for consonants that <em>do</em> get pronounced at the end: the word <strong>CaReFuL</strong> (c, r, f, l): <em>parc, bonjour, chef, mal</em>.</p>" +
    "<h3>Vowels</h3>" +
    "<table><tr><th>Letter(s)</th><th>Sound</th><th>Example</th></tr>" +
    "<tr><td>a</td><td>ah</td><td>la → lah</td></tr>" +
    "<tr><td>é / -er / -ez</td><td>ay</td><td>café → ka-FAY</td></tr>" +
    "<tr><td>è / ê / ai</td><td>eh</td><td>père → pehr</td></tr>" +
    "<tr><td>i / y</td><td>ee</td><td>midi → mee-DEE</td></tr>" +
    "<tr><td>o / au / eau</td><td>oh</td><td>beau → boh</td></tr>" +
    "<tr><td>ou</td><td>oo</td><td>vous → voo</td></tr>" +
    "<tr><td>u</td><td>ew (special)</td><td>tu → tew</td></tr>" +
    "<tr><td>oi</td><td>wah</td><td>moi → mwah</td></tr></table>" +
    "<p><strong>The French u:</strong> say “ee”, then round your lips like a whistle while keeping your tongue still. That new sound is <em>u</em> (tu, rue, salut).</p>" +
    "<h3>Nasal vowels (sound through the nose)</h3>" +
    "<p><strong>on/om</strong> → ohn (bon = bohn); <strong>an/en</strong> → ahn (grand = grahn); <strong>in/ain/un</strong> → anh (vin = vanh, pain = panh). Don't fully pronounce the n/m.</p>" +
    "<h3>Consonants that surprise English speakers</h3>" +
    "<table><tr><th>Spelling</th><th>Sound</th><th>Example</th></tr>" +
    "<tr><td>ch</td><td>sh</td><td>chat → sha</td></tr>" +
    "<tr><td>j / g(e,i)</td><td>zh (measure)</td><td>je → zhuh</td></tr>" +
    "<tr><td>c(e,i) / ç</td><td>s</td><td>ça → sa</td></tr>" +
    "<tr><td>c(a,o,u)</td><td>k</td><td>café → ka-FAY</td></tr>" +
    "<tr><td>gn</td><td>ny</td><td>montagne → mohn-TANY</td></tr>" +
    "<tr><td>h</td><td>silent</td><td>hôtel → oh-TEL</td></tr>" +
    "<tr><td>r</td><td>from the throat</td><td>rouge → roozh</td></tr></table>",
  pronTipHTML:
    "<p>When you meet a new word, <strong>don't read the final consonant</strong> (unless it's c/r/f/l) and <strong>don't read a final -e</strong>. This one habit fixes 80% of beginner pronunciation mistakes.</p>",
  flashcards: [
    { fr: "ou", en: "the sound “oo” (vous)" },
    { fr: "u", en: "the sound “ew” (tu)" },
    { fr: "oi", en: "the sound “wah” (moi)" },
    { fr: "é", en: "the sound “ay” (café)" },
    { fr: "an / en", en: "nasal “ahn” (grand)" },
    { fr: "on", en: "nasal “ohn” (bon)" },
    { fr: "ch", en: "the sound “sh” (chat)" },
    { fr: "j / ge", en: "the sound “zh” (je)" }
  ],
  exercises: [
    { type: "mc", instructions: "Is the final letter pronounced in <em>petit</em>?", choices: ["Silent", "Pronounced 't'"], answer: "Silent" },
    { type: "mc", instructions: "Is the final letter pronounced in <em>neuf</em>?", choices: ["Silent", "Pronounced 'f'"], answer: "Pronounced 'f'" },
    { type: "mc", instructions: "Which letters are usually still pronounced at the end of a word?", choices: ["c, r, f, l", "b, d, g, t", "m, n, p, s"], answer: "c, r, f, l" },
    { type: "mc", instructions: "What sound does <em>ou</em> make (as in <em>vous</em>)?", choices: ["oo", "ew", "oh"], answer: "oo" },
    { type: "mc", instructions: "What sound does <em>u</em> make (as in <em>tu</em>)?", choices: ["ew (rounded lips)", "oo", "uh"], answer: "ew (rounded lips)" },
    { type: "mc", instructions: "What sound does <em>oi</em> make (as in <em>moi</em>)?", choices: ["wah", "oy", "wee"], answer: "wah" },
    { type: "mc", instructions: "How is the <em>ch</em> in <em>chat</em> pronounced?", choices: ["sh", "tch", "k"], answer: "sh" },
    { type: "mc", instructions: "The letter <em>h</em> in <em>hôtel</em> is…", choices: ["silent", "pronounced like English h"], answer: "silent" },
    {
      type: "match",
      instructions: "Associez le son français à sa prononciation.",
      pairs: [
        { fr: "ou", en: "oo" },
        { fr: "u", en: "ew (rounded lips)" },
        { fr: "oi", en: "wah" },
        { fr: "ch", en: "sh" },
        { fr: "é", en: "ay" },
        { fr: "gn", en: "ny" }
      ]
    },
    {
      type: "order",
      instructions: "Remettez les lettres dans le bon ordre pour épeler « café » (ka-FAY).",
      tokens: ["c", "a", "f", "é"],
      answers: ["c a f é"]
    },
    {
      type: "listen",
      instructions: "Écoutez et écrivez le mot que vous entendez.",
      audio: "bonjour",
      answers: ["bonjour", "Bonjour"]
    }
  ],
  readAloud:
    "You are my French pronunciation coach. I'm an absolute beginner.\n" +
    "1) First, say the French alphabet slowly, one letter at a time, pausing between letters.\n" +
    "2) Then read these words aloud slowly, twice each, and after each one tell me in ONE short line which letters are silent:\n" +
    "bonjour, merci, au revoir, salut, je m'appelle, français, Paris, petit, vous, trois.\n" +
    "Read only French for the words themselves. Keep a calm, beginner pace.",
  cultureHTML:
    "<p>French speakers genuinely appreciate any attempt at their language — starting an interaction with <strong>“Bonjour”</strong> before anything else is considered basic politeness in France (skipping it can seem rude). You'll use it constantly from Lesson 01 on.</p>"
});
