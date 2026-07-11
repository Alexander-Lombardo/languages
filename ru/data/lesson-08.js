window.COURSE.lessons.push({
  id: "08",
  slug: "numbers-age",
  unit: "A1 · Unit 1 — First Steps",
  title: "Numbers, Counting & Age",
  level: "A1",
  time: "~50 min",
  objectives: [
    "Count from 0 to 100 in Russian, including the tens.",
    "Apply the год / года / лет rule when counting years.",
    "Tell your age with the dative: Мне 20 лет.",
    "Ask someone's age with Сколько тебе / вам лет?",
    "Read out a phone number digit by digit."
  ],
  vocab: [
    { ru: "ноль", say: "nol", en: "zero" },
    { ru: "один", say: "a-DEEN", en: "one" },
    { ru: "два", say: "dva", en: "two" },
    { ru: "три", say: "tree", en: "three" },
    { ru: "четыре", say: "chee-TY-rye", en: "four" },
    { ru: "пять", say: "pyat", en: "five" },
    { ru: "десять", say: "DYE-syat", en: "ten" },
    { ru: "двадцать", say: "DVA-tsat", en: "twenty" },
    { ru: "сто", say: "sto", en: "one hundred" },
    { ru: "год", say: "got", en: "year (after 1)" },
    { ru: "года", say: "GO-da", en: "years (after 2–4)" },
    { ru: "лет", say: "lyet", en: "years (after 5+ and 0)" },
    { ru: "сколько", say: "SKOL-ka", en: "how many / how much" },
    { ru: "мне", say: "mnye", en: "to me (dative of «я»)" },
    { ru: "тебе", say: "tee-BYE", en: "to you (dative of «ты»)" },
    { ru: "номер", say: "NO-myer", en: "number (e.g. phone)" }
  ],
  dialogue: [
    { sp: "Мария", ru: "Дмитрий, сколько тебе лет?", en: "Dmitry, how old are you?" },
    { sp: "Дмитрий", ru: "Мне двадцать один год. А тебе?", en: "I'm twenty-one years old. And you?" },
    { sp: "Мария", ru: "Мне двадцать три года.", en: "I'm twenty-three years old." },
    { sp: "Дмитрий", ru: "А сколько лет Ивану?", en: "And how old is Ivan?" },
    { sp: "Мария", ru: "Ему тридцать лет.", en: "He's thirty years old." },
    { sp: "Дмитрий", ru: "А Анне? Ей пять лет?", en: "And Anna? Is she five years old?" },
    { sp: "Мария", ru: "Нет! Ей двадцать пять лет.", en: "No! She's twenty-five years old." },
    { sp: "Дмитрий", ru: "Извини! Я не знал.", en: "Sorry! I didn't know." },
    { sp: "Мария", ru: "Ничего. А сколько лет Ольге?", en: "It's okay. And how old is Olga?" },
    { sp: "Дмитрий", ru: "Ей сорок два года.", en: "She's forty-two years old." },
    { sp: "Мария", ru: "Дмитрий, какой твой номер телефона?", en: "Dmitry, what's your phone number?" },
    { sp: "Дмитрий", ru: "Два, пять, восемь, ноль, один, три.", en: "Two, five, eight, zero, one, three." },
    { sp: "Мария", ru: "Два-пять-восемь-ноль-один-три. Спасибо!", en: "Two-five-eight-zero-one-three. Thank you!" },
    { sp: "Дмитрий", ru: "А какой твой номер?", en: "And what's your number?" },
    { sp: "Мария", ru: "Семь, четыре, девять, шесть, ноль, ноль.", en: "Seven, four, nine, six, zero, zero." },
    { sp: "Дмитрий", ru: "Понятно. Сколько это? Сколько комнат?", en: "Got it. How much is that? How many rooms?" },
    { sp: "Мария", ru: "Здесь три комнаты.", en: "There are three rooms here." },
    { sp: "Дмитрий", ru: "Хорошо. Спасибо, Мария!", en: "Good. Thank you, Maria!" }
  ],
  reading: null,
  grammarHTML:
    "<h3>Numbers 0–10 and the key tens</h3>" +
    "<p>Learn 0–10 first, then the tens, then the «hundred». In between, the teens and the compound numbers are built from these blocks.</p>" +
    "<table><tr><th>#</th><th>Russian</th><th>#</th><th>Russian</th></tr>" +
    "<tr><td>0</td><td>ноль</td><td>10</td><td>десять</td></tr>" +
    "<tr><td>1</td><td>один</td><td>20</td><td>двадцать</td></tr>" +
    "<tr><td>2</td><td>два</td><td>30</td><td>тридцать</td></tr>" +
    "<tr><td>3</td><td>три</td><td>40</td><td>сорок</td></tr>" +
    "<tr><td>4</td><td>четыре</td><td>50</td><td>пятьдесят</td></tr>" +
    "<tr><td>5</td><td>пять</td><td>60</td><td>шестьдесят</td></tr>" +
    "<tr><td>6</td><td>шесть</td><td>70</td><td>семьдесят</td></tr>" +
    "<tr><td>7</td><td>семь</td><td>80</td><td>восемьдесят</td></tr>" +
    "<tr><td>8</td><td>восемь</td><td>90</td><td>девяносто</td></tr>" +
    "<tr><td>9</td><td>девять</td><td>100</td><td>сто</td></tr></table>" +
    "<p>Compounds just stack the parts: <em>двадцать один</em> = 21, <em>сорок два</em> = 42, <em>девяносто пять</em> = 95.</p>" +
    "<h3>The год / года / лет rule</h3>" +
    "<p>The word for «year» changes shape depending on the last digit of the number. This is the most important counting rule in the lesson.</p>" +
    "<table><tr><th>Last digit</th><th>Word</th><th>Example</th></tr>" +
    "<tr><td>1 (один)</td><td><strong>год</strong></td><td>двадцать один <strong>год</strong> — 21</td></tr>" +
    "<tr><td>2, 3, 4</td><td><strong>года</strong></td><td>двадцать три <strong>года</strong> — 23</td></tr>" +
    "<tr><td>5–20, and 0</td><td><strong>лет</strong></td><td>двадцать пять <strong>лет</strong> — 25</td></tr></table>" +
    "<p><strong>Watch out:</strong> the teens 11–14 always take <em>лет</em> (одиннадцать <em>лет</em>), even though they end in 1–4. The rule looks at the standalone last word, and 11–14 behave as a special block.</p>" +
    "<h3>Telling age: the dative «to me»</h3>" +
    "<p>Russian doesn't say «I am 20». It says, literally, «to me — 20 years». The person goes into the <strong>dative</strong> form, with no verb «to be» in the present.</p>" +
    "<table><tr><th>Russian</th><th>Literally</th><th>Meaning</th></tr>" +
    "<tr><td>Мне 20 лет.</td><td>to-me 20 years</td><td>I am 20.</td></tr>" +
    "<tr><td>Сколько тебе лет?</td><td>how-many to-you years?</td><td>How old are you? (informal)</td></tr>" +
    "<tr><td>Сколько вам лет?</td><td>how-many to-you years?</td><td>How old are you? (formal)</td></tr>" +
    "<tr><td>Ему 30 лет. / Ей 25 лет.</td><td>to-him 30 / to-her 25</td><td>He is 30. / She is 25.</td></tr></table>" +
    "<p>So the pattern is fixed: <em>[dative pronoun] + [number] + год/года/лет.</em></p>",
  pronTipHTML:
    "<p><strong>год</strong> ends in a hard «t» sound (devoiced <em>д</em>): say <em>got</em>. But in <strong>года</strong> the <em>д</em> stays voiced: <em>GO-da</em>.</p>" +
    "<p><strong>двадцать</strong> and <strong>тридцать</strong> have a <em>дц</em> that fuses into «ts»: <em>DVA-tsat</em>, <em>TREE-tsat</em>.</p>" +
    "<p><strong>пять</strong>, <strong>шесть</strong>, <strong>десять</strong> end in a soft <em>ь</em>: keep the consonant soft and don't add a vowel — <em>pyat</em>, <em>shest</em>, <em>DYE-syat</em>.</p>",
  discussion: null,
  flashcards: null,
  exercises: [
    { type: "match", instructions: "Match the numeral to the Russian word.", pairs: [
      { ru: "три", en: "3" },
      { ru: "пять", en: "5" },
      { ru: "десять", en: "10" },
      { ru: "двадцать", en: "20" },
      { ru: "сто", en: "100" }
    ] },
    { type: "mc", instructions: "Which form of «year» follows 21?", prompt: "двадцать один ___", choices: ["год", "года", "лет"], answer: "год" },
    { type: "mc", instructions: "Which form of «year» follows 23?", prompt: "двадцать три ___", choices: ["год", "года", "лет"], answer: "года" },
    { type: "mc", instructions: "Which form of «year» follows 25?", prompt: "двадцать пять ___", choices: ["год", "года", "лет"], answer: "лет" },
    { type: "fill", instructions: "Tell your age: «I am 20 years old.»", before: "Мне двадцать", after: ".", cue: "years (after 20)", answers: ["лет"] },
    { type: "fill", instructions: "Ask informally: «How old are you?»", before: "Сколько", after: "лет?", cue: "to you (informal)", answers: ["тебе"] },
    { type: "listen", instructions: "Type the number word you hear.", audio: "сорок", answers: ["сорок"] },
    { type: "translate", instructions: "Translate: «I am 23 years old.»", prompt: "I am 23 years old.", answers: ["мне двадцать три года", "мне двадцать три года."] },
    { type: "translate", instructions: "Translate: «How old are you?» (formal)", prompt: "How old are you? (formal)", answers: ["сколько вам лет", "сколько вам лет?"] },
    { type: "order", instructions: "Build: «He is thirty years old.»", tokens: ["Ему", "тридцать", "лет."], answers: ["Ему тридцать лет."] }
  ],
  readAloud:
    "You are my Russian tutor. I'm a beginner practising numbers and age.\n" +
    "First, read this vocabulary aloud one item at a time — Russian word, pause, English meaning, pause:\n" +
    "ноль / один / два / три / четыре / пять / десять / двадцать / сто / год / года / лет / сколько / мне.\n" +
    "Then read this dialogue aloud TWICE — first slowly, then at natural speed. Read ONLY the Russian, with a clear accent:\n\n" +
    "Сколько тебе лет?\n" +
    "Мне двадцать один год.\n" +
    "Мне двадцать три года.\n" +
    "Сколько лет Ивану?\n" +
    "Ему тридцать лет.\n" +
    "Ей двадцать пять лет.\n" +
    "Какой твой номер телефона?\n" +
    "Два, пять, восемь, ноль, один, три.\n" +
    "Здесь три комнаты.",
  cultureHTML:
    "<p>The год / года / лет switch feels fussy, but it's everywhere — and it's your first taste of a huge Russian theme: numbers control the form of the word that follows them. Nailing it for «years» now makes counting objects much easier later.</p>" +
    "<p>Russians read phone numbers digit by digit, often grouping them as they go. Asking <em>Сколько вам лет?</em> with the formal <em>вам</em> is polite with anyone you don't know well; <em>тебе</em> is for friends and peers.</p>"
});
