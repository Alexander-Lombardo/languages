window.COURSE.lessons.push({
  id: "00",
  slug: "cyrillic-1-familiar",
  unit: "A1 · Unit 0 — The Cyrillic Alphabet",
  title: "Cyrillic I: Letters That Look & Sound Familiar",
  level: "A1",
  time: "~40 min",
  objectives: [
    "Recognise and pronounce five Cyrillic letters that look and sound like English: А, К, М, О, Т.",
    "Read your very first whole Russian words out loud.",
    "Understand that Russian is written in the Cyrillic alphabet (кириллица), not a different language code.",
    "Start to feel the difference between a letter's shape and its sound."
  ],
  vocab: [
    { ru: "А а", say: "ah (as in 'father')", en: "the sound [a]" },
    { ru: "К к", say: "k (as in 'kit')", en: "the sound [k]" },
    { ru: "М м", say: "m (as in 'map')", en: "the sound [m]" },
    { ru: "О о", say: "oh (as in 'more')", en: "the sound [o]" },
    { ru: "Т т", say: "t (as in 'top')", en: "the sound [t]" },
    { ru: "кот", say: "kot", en: "cat" },
    { ru: "ток", say: "tok", en: "electric current" },
    { ru: "мак", say: "mak", en: "poppy" },
    { ru: "там", say: "tam", en: "there" },
    { ru: "так", say: "tak", en: "so / like that" },
    { ru: "мама", say: "MA-ma", en: "mom" },
    { ru: "Том", say: "tom", en: "Tom (name)" }
  ],
  dialogue: null,
  reading: {
    title: "Read these aloud",
    ru: "кот — ток — мак\nтам — так — кок\nмама — Том — атом",
    en: "cat — current — poppy / there — so — cook / mom — Tom — atom"
  },
  grammarHTML:
    "<h3>Five free letters</h3>" +
    "<p>Russian is written in the <strong>Cyrillic alphabet</strong> (Russian: <em>кириллица</em>). It has 33 letters. The good news: several of them look <em>and</em> sound almost exactly like English. Start with these five.</p>" +
    "<table><tr><th>Letter</th><th>Sounds like</th><th>Example</th></tr>" +
    "<tr><td>А а</td><td>[a] in <em>father</em></td><td>мак (poppy)</td></tr>" +
    "<tr><td>К к</td><td>[k] in <em>kit</em></td><td>кот (cat)</td></tr>" +
    "<tr><td>М м</td><td>[m] in <em>map</em></td><td>мама (mom)</td></tr>" +
    "<tr><td>О о</td><td>[o] in <em>more</em></td><td>ток (current)</td></tr>" +
    "<tr><td>Т т</td><td>[t] in <em>top</em></td><td>там (there)</td></tr></table>" +
    "<h3>Putting letters together</h3>" +
    "<p>Russian spelling is mostly <strong>phonetic</strong>: you read letter by letter, left to right, just like English. With only these five letters you can already read real words:</p>" +
    "<p><strong>К-О-Т → кот</strong> (cat) · <strong>М-А-К → мак</strong> (poppy) · <strong>Т-А-М → там</strong> (there).</p>",
  pronTipHTML:
    "<p><strong>Russian Т is 'dental':</strong> touch the tip of your tongue to the back of your upper teeth, a little further forward than the English <em>t</em>.</p>" +
    "<p><strong>Don't aspirate К, Т:</strong> English <em>k/t</em> puff air (<em>top!</em>). Russian К, Т are crisp and puff-free, more like the <em>t</em> in <em>stop</em>.</p>" +
    "<p><strong>Lowercase = small capitals:</strong> for these letters the small form is just a smaller version of the capital (А/а, К/к, М/м, О/о, Т/т).</p>",
  discussion: null,
  flashcards: null,
  exercises: [
    { type: "match", instructions: "Match each Cyrillic letter to its sound.", pairs: [
      { ru: "К", en: "k" },
      { ru: "М", en: "m" },
      { ru: "Т", en: "t" },
      { ru: "О", en: "o" },
      { ru: "А", en: "a" }
    ] },
    { type: "mc", instructions: "Read the word: кот. What does it mean?", choices: ["cat", "who", "milk"], answer: "cat" },
    { type: "mc", instructions: "Which letter makes the [m] sound?", choices: ["К", "М", "Т"], answer: "М" },
    { type: "translate", instructions: "Type the Russian word for “mom” (use Cyrillic).", prompt: "mom", answers: ["мама"] },
    { type: "translate", instructions: "Type the Russian word for “poppy”.", prompt: "poppy", answers: ["мак"] },
    { type: "order", instructions: "Build the word for “there”.", tokens: ["т", "а", "м"], answers: ["там"] },
    { type: "mc", instructions: "Read aloud: там. Which English word rhymes with its vowel?", choices: ["bomb", "tame", "team"], answer: "bomb" },
    { type: "match", instructions: "Match each word to its meaning.", pairs: [
      { ru: "кот", en: "cat" },
      { ru: "там", en: "there" },
      { ru: "мак", en: "poppy" },
      { ru: "ток", en: "current" }
    ] }
  ],
  readAloud:
    "You are my Russian tutor. I am an absolute beginner and today is my very first contact with the Cyrillic alphabet.\n" +
    "First, read these five letters one at a time — say the letter sound, pause, then an example word, pause:\n" +
    "А (мак) / К (кот) / М (мама) / О (ток) / Т (там).\n" +
    "Then read these words aloud TWICE — first slowly letter by letter, then at natural speed. Read ONLY the Russian:\n\n" +
    "кот\nток\nмак\nтам\nтак\nмама\nТом\nатом\n\n" +
    "Finally, say a word and ask me to tell you which letters it contains.",
  cultureHTML:
    "<p>The Cyrillic script is named after <strong>St. Cyril</strong>, a 9th-century missionary who, with his brother Methodius, created the first Slavic alphabet. Today Cyrillic is used by around <strong>250 million people</strong> for Russian, Ukrainian, Bulgarian, Serbian, and dozens of other languages.</p>" +
    "<p>Notice that several letters are 'false friends' — they look like Latin letters but sound completely different (Cyrillic <em>В</em> is a [v], <em>Р</em> is an [r], <em>С</em> is an [s]). We tackle those next lesson, on purpose, so you don't build bad habits.</p>"
});
