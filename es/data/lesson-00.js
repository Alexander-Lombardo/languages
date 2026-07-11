window.COURSE.lessons.push({
  id: "00",
  slug: "alphabet-sounds",
  unit: "A1 · Unit 1 — First Steps",
  title: "Alphabet, Sounds & Survival Phrases",
  level: "A1",
  time: "~40 min",
  objectives: [
    "Recognise that Spanish is spelled the way it sounds.",
    "Pronounce the five clean Spanish vowels.",
    "Know the tricky letters: c, g, h, j, ll, ñ, qu, r/rr, v, z.",
    "Use a handful of survival phrases to start any interaction."
  ],
  vocab: [
    { es: "hola", say: "OH-lah", en: "hello" },
    { es: "adiós", say: "ah-DYOHS", en: "goodbye" },
    { es: "sí", say: "see", en: "yes" },
    { es: "no", say: "noh", en: "no" },
    { es: "por favor", say: "por fah-VOR", en: "please" },
    { es: "gracias", say: "GRAH-syahs", en: "thank you" },
    { es: "de nada", say: "deh NAH-dah", en: "you're welcome" },
    { es: "perdón", say: "per-DOHN", en: "sorry / excuse me" },
    { es: "¿cómo?", say: "KOH-moh", en: "(say) what? / pardon?" },
    { es: "no entiendo", say: "noh en-TYEN-doh", en: "I don't understand" },
    { es: "¿hablas inglés?", say: "AH-blahs een-GLEHS", en: "do you speak English?" },
    { es: "buenos días", say: "BWEH-nohs DEE-ahs", en: "good morning" },
    { es: "buenas tardes", say: "BWEH-nahs TAR-dehs", en: "good afternoon" },
    { es: "buenas noches", say: "BWEH-nahs NOH-chehs", en: "good evening / night" }
  ],
  dialogue: [
    { sp: "Ana", es: "¡Hola! Buenos días.", en: "Hi! Good morning." },
    { sp: "Luis", es: "Buenos días. ¿Cómo estás?", en: "Good morning. How are you?" },
    { sp: "Ana", es: "Bien, gracias. ¿Y tú?", en: "Well, thanks. And you?" },
    { sp: "Luis", es: "Muy bien. Perdón, ¿hablas inglés?", en: "Very well. Sorry, do you speak English?" },
    { sp: "Ana", es: "Un poco. ¿Cómo? No entiendo.", en: "A little. Pardon? I don't understand." },
    { sp: "Luis", es: "No pasa nada. ¡Hasta luego!", en: "No worries. See you later!" },
    { sp: "Ana", es: "Adiós, ¡buenas tardes!", en: "Bye, good afternoon!" }
  ],
  grammarHTML:
    "<h3>Spanish is phonetic</h3>" +
    "<p>Unlike English, Spanish is spelled almost exactly as it sounds. Learn a handful of rules and you can pronounce <em>any</em> word.</p>" +
    "<h3>The five vowels — always the same</h3>" +
    "<table><tr><th>Letter</th><th>Sound</th><th>Like</th></tr>" +
    "<tr><td>a</td><td>ah</td><td>f<strong>a</strong>ther</td></tr>" +
    "<tr><td>e</td><td>eh</td><td>b<strong>e</strong>t</td></tr>" +
    "<tr><td>i</td><td>ee</td><td>s<strong>ee</strong></td></tr>" +
    "<tr><td>o</td><td>oh</td><td>n<strong>o</strong></td></tr>" +
    "<tr><td>u</td><td>oo</td><td>b<strong>oo</strong>t</td></tr></table>" +
    "<h3>Tricky consonants</h3>" +
    "<ul>" +
    "<li><strong>h</strong> is always silent: <em>hola</em> = OH-lah.</li>" +
    "<li><strong>j</strong> and <strong>g</strong> (before e/i) are a raspy 'h': <em>jamón</em>, <em>gente</em>.</li>" +
    "<li><strong>ll</strong> sounds like 'y': <em>llamar</em> = ya-MAR.</li>" +
    "<li><strong>ñ</strong> is 'ny': <em>español</em> = es-pan-YOL.</li>" +
    "<li><strong>v</strong> sounds like a soft 'b'. <strong>z</strong> (and c before e/i) = 's' in Latin America, 'th' in Spain.</li>" +
    "<li><strong>rr</strong> is a rolled r; single <strong>r</strong> between vowels is a quick tap.</li>" +
    "</ul>",
  pronTipHTML:
    "<p><strong>Stress &amp; the accent mark:</strong> if a word has a written accent (´), stress that syllable: <em>adiós</em>, <em>perdón</em>. Otherwise, words ending in a vowel, -n or -s stress the second-to-last syllable. The accent never changes the vowel sound — it only tells you where to push.</p>" +
    "<p><strong>¿ and ¡</strong> open questions and exclamations: <em>¿Cómo estás?</em> <em>¡Hola!</em></p>",
  reading: null,
  discussion: null,
  flashcards: null,
  exercises: [
    { type: "mc", instructions: "How is the 'h' in <em>hola</em> pronounced?", choices: ["like English h", "silent", "like j"], answer: "silent" },
    { type: "mc", instructions: "Which word is stressed on its LAST syllable?", choices: ["gracias", "adiós", "hola"], answer: "adiós" },
    { type: "fill", instructions: "Complete the greeting for the morning.", before: "Buenos", after: "", cue: "days", answers: ["días", "dias"] },
    { type: "translate", instructions: "Translate: “Thank you very much.”", prompt: "Thank you very much.", answers: ["muchas gracias", "gracias"] },
    { type: "translate", instructions: "Translate: “I don't understand.”", prompt: "I don't understand.", answers: ["no entiendo"] },
    { type: "listen", instructions: "Type the phrase you hear.", audio: "buenas noches", answers: ["buenas noches"] },
    { type: "match", instructions: "Match Spanish to English.", pairs: [
      { es: "hola", en: "hello" },
      { es: "gracias", en: "thank you" },
      { es: "adiós", en: "goodbye" },
      { es: "perdón", en: "sorry" }
    ] },
    { type: "order", instructions: "Build the sentence: “Good morning, how are you?”", tokens: ["Buenos", "días", "¿cómo", "estás?"], answers: ["Buenos días, ¿cómo estás?"] }
  ],
  readAloud:
    "You are my Spanish tutor. I'm an absolute beginner.\n" +
    "First, read this vocabulary aloud one item at a time — Spanish word, pause, English meaning, pause:\n" +
    "hola / adiós / por favor / gracias / de nada / perdón / no entiendo / buenos días / buenas tardes / buenas noches.\n" +
    "Then read this dialogue aloud TWICE — first slowly, then at natural speed. Read ONLY the Spanish, with a clear accent:\n\n" +
    "¡Hola! Buenos días.\n" +
    "Buenos días. ¿Cómo estás?\n" +
    "Bien, gracias. ¿Y tú?\n" +
    "Muy bien. Perdón, ¿hablas inglés?\n" +
    "Un poco. ¿Cómo? No entiendo.\n" +
    "No pasa nada. ¡Hasta luego!\n" +
    "Adiós, ¡buenas tardes!",
  cultureHTML:
    "<p>Spanish is the official language of <strong>20 countries</strong> and the second most-spoken native language in the world. The biggest split for learners is <strong>Latin America vs. Spain</strong>: this course uses neutral Latin-American Spanish, noting Spain's differences as they come up. The most audible difference is the <em>z/c</em> sound — 's' in Latin America, 'th' (like <em>think</em>) in most of Spain.</p>"
});
