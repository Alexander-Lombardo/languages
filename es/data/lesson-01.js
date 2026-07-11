window.COURSE.lessons.push({
  id: "01",
  slug: "greetings",
  unit: "A1 · Unit 1 — First Steps",
  title: "Greetings & Introductions",
  level: "A1",
  time: "~45 min",
  objectives: [
    "Greet people and say goodbye at any time of day.",
    "Ask and answer “How are you?” in a simple way.",
    "Say your name and ask someone else's name.",
    "Use the verb llamarse to introduce yourself.",
    "Tell where you are from with ser + de."
  ],
  vocab: [
    { es: "hola", say: "OH-lah", en: "hello" },
    { es: "¿qué tal?", say: "keh TAHL", en: "how's it going?" },
    { es: "¿cómo estás?", say: "KOH-moh es-TAHS", en: "how are you?" },
    { es: "bien", say: "byen", en: "well / fine" },
    { es: "mal", say: "mahl", en: "bad / not well" },
    { es: "más o menos", say: "MAHS oh MEH-nohs", en: "so-so" },
    { es: "gracias", say: "GRAH-syahs", en: "thank you" },
    { es: "mucho gusto", say: "MOO-choh GOOS-toh", en: "nice to meet you" },
    { es: "encantado", say: "en-kan-TAH-doh", en: "pleased to meet you (m.)" },
    { es: "¿cómo te llamas?", say: "KOH-moh teh YAH-mahs", en: "what's your name?" },
    { es: "me llamo", say: "meh YAH-moh", en: "my name is" },
    { es: "¿de dónde eres?", say: "deh DOHN-deh EH-rehs", en: "where are you from?" },
    { es: "soy de", say: "soy deh", en: "I'm from" },
    { es: "el nombre", say: "el NOHM-breh", en: "the name" },
    { es: "hasta luego", say: "AHS-tah LWEH-goh", en: "see you later" },
    { es: "adiós", say: "ah-DYOHS", en: "goodbye" }
  ],
  dialogue: [
    { sp: "Marta", es: "¡Hola! Buenos días.", en: "Hi! Good morning." },
    { sp: "Diego", es: "Buenos días. ¿Cómo te llamas?", en: "Good morning. What's your name?" },
    { sp: "Marta", es: "Me llamo Marta. ¿Y tú?", en: "My name is Marta. And you?" },
    { sp: "Diego", es: "Yo me llamo Diego. Mucho gusto.", en: "My name is Diego. Nice to meet you." },
    { sp: "Marta", es: "Encantada. ¿Cómo estás?", en: "Pleased to meet you. How are you?" },
    { sp: "Diego", es: "Muy bien, gracias. ¿Y tú, qué tal?", en: "Very well, thanks. And you, how's it going?" },
    { sp: "Marta", es: "Más o menos. ¿De dónde eres?", en: "So-so. Where are you from?" },
    { sp: "Diego", es: "Soy de México. ¿Y tú?", en: "I'm from Mexico. And you?" },
    { sp: "Marta", es: "Soy de Colombia.", en: "I'm from Colombia." },
    { sp: "Diego", es: "¡Qué bien! Hasta luego, Marta.", en: "How nice! See you later, Marta." },
    { sp: "Marta", es: "Adiós, Diego.", en: "Goodbye, Diego." }
  ],
  grammarHTML:
    "<h3>Introducing yourself with <em>llamarse</em></h3>" +
    "<p>To say your name, Spanish uses the reflexive verb <strong>llamarse</strong> (literally “to call oneself”). The little word <em>me</em>, <em>te</em>, <em>se</em> changes with the person.</p>" +
    "<table><tr><th>Person</th><th>Form</th><th>English</th></tr>" +
    "<tr><td>yo</td><td>me llamo</td><td>my name is…</td></tr>" +
    "<tr><td>tú</td><td>te llamas</td><td>your name is…</td></tr>" +
    "<tr><td>él / ella</td><td>se llama</td><td>his / her name is…</td></tr></table>" +
    "<p>So <em>¿Cómo te llamas?</em> = “What's your name?” and the answer is <em>Me llamo…</em></p>" +
    "<h3>Saying where you're from: <em>ser</em> + <em>de</em></h3>" +
    "<p>Use the verb <strong>ser</strong> (to be) with the word <strong>de</strong> (from) plus a place.</p>" +
    "<table><tr><th>Person</th><th>Form</th><th>Example</th></tr>" +
    "<tr><td>yo</td><td>soy</td><td>Soy de Perú.</td></tr>" +
    "<tr><td>tú</td><td>eres</td><td>¿De dónde eres?</td></tr>" +
    "<tr><td>él / ella</td><td>es</td><td>Es de España.</td></tr></table>" +
    "<h3>Masculine and feminine</h3>" +
    "<p>Many words change ending by gender. A man says <em>encantado</em>; a woman says <em>encantada</em>. You will meet this <em>-o / -a</em> pattern again and again.</p>",
  pronTipHTML:
    "<p><strong>The double L:</strong> in <em>llamo</em> and <em>llamas</em>, the <em>ll</em> sounds like the English “y” in <em>yes</em>: ya-MOH, YAH-mahs.</p>" +
    "<p><strong>Don't pronounce the H:</strong> <em>hola</em> is OH-lah, never “HO-la”. The h is always silent.</p>" +
    "<p><strong>Rising question tone:</strong> short questions like <em>¿qué tal?</em> rise at the end, just like in English.</p>",
  reading: null,
  discussion: null,
  flashcards: null,
  exercises: [
    { type: "match", instructions: "Match Spanish to English.", pairs: [
      { es: "hola", en: "hello" },
      { es: "me llamo", en: "my name is" },
      { es: "soy de", en: "I'm from" },
      { es: "mucho gusto", en: "nice to meet you" },
      { es: "hasta luego", en: "see you later" }
    ] },
    { type: "listen", instructions: "Type the phrase you hear.", audio: "¿Cómo te llamas?", answers: ["¿cómo te llamas?", "como te llamas?", "¿como te llamas?", "como te llamas"] },
    { type: "fill", instructions: "Complete: say your name.", before: "Me", after: "Marta.", cue: "I call myself", answers: ["llamo"] },
    { type: "fill", instructions: "Complete with the verb ser (yo).", before: "", after: "de Colombia.", cue: "I am", answers: ["soy"] },
    { type: "mc", instructions: "A woman is meeting you. She says…", choices: ["encantado", "encantada", "encanto"], answer: "encantada" },
    { type: "translate", instructions: "Translate: “Where are you from?”", prompt: "Where are you from?", answers: ["¿de dónde eres?", "de dónde eres?", "¿de donde eres?", "de donde eres"] },
    { type: "order", instructions: "Build the sentence: “My name is Diego.”", tokens: ["Me", "llamo", "Diego."], answers: ["Me llamo Diego."] },
    { type: "conjugate", instructions: "Conjugate llamarse in the present tense.", verb: "llamarse (present)", rows: [
      { pronoun: "yo", answer: "me llamo" },
      { pronoun: "tú", answer: "te llamas" },
      { pronoun: "él / ella", answer: "se llama" }
    ] }
  ],
  readAloud:
    "You are my Spanish tutor. I'm an absolute beginner.\n" +
    "First, read this vocabulary aloud one item at a time — Spanish word, pause, English meaning, pause:\n" +
    "hola / ¿qué tal? / ¿cómo estás? / bien / mal / más o menos / gracias / mucho gusto / encantado / ¿cómo te llamas? / me llamo / ¿de dónde eres? / soy de / hasta luego / adiós.\n" +
    "Then read this dialogue aloud TWICE — first slowly, then at natural speed. Read ONLY the Spanish, with a clear accent:\n\n" +
    "¡Hola! Buenos días.\n" +
    "Buenos días. ¿Cómo te llamas?\n" +
    "Me llamo Marta. ¿Y tú?\n" +
    "Yo me llamo Diego. Mucho gusto.\n" +
    "Encantada. ¿Cómo estás?\n" +
    "Muy bien, gracias. ¿Y tú, qué tal?\n" +
    "Más o menos. ¿De dónde eres?\n" +
    "Soy de México. ¿Y tú?\n" +
    "Soy de Colombia.\n" +
    "¡Qué bien! Hasta luego, Marta.\n" +
    "Adiós, Diego.",
  cultureHTML:
    "<p>In most of Latin America, a greeting comes with a <strong>light cheek kiss</strong> (one kiss, right cheek) between women, or a woman and a man; men usually shake hands or give a friendly pat. In Spain it's often <strong>two kisses</strong>. When in doubt, follow the other person's lead.</p>" +
    "<p>Spanish has two words for “you”: <strong>tú</strong> (informal) and <strong>usted</strong> (formal/respectful). With new people, elders, or in business, many speakers start with <em>usted</em>. This course teaches <em>tú</em> first, then introduces <em>usted</em> later.</p>"
});
