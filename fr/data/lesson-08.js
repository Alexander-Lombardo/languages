window.COURSE.lessons.push({
  id: "08",
  slug: "asking-questions",
  unit: "Unit 3 — Everyday Life",
  title: "Asking Questions",
  level: "A1",
  time: "~50 min",
  objectives: [
    "Form yes/no questions three ways (intonation, est-ce que, inversion).",
    "Use question words: qui, que, où, quand, comment, pourquoi, combien, quel.",
    "Understand and answer common questions about yourself."
  ],
  vocab: [
    { fr: "qui", say: "kee", en: "who" },
    { fr: "que / qu'est-ce que", say: "kuh / kess-kuh", en: "what" },
    { fr: "où", say: "oo", en: "where" },
    { fr: "quand", say: "kahn", en: "when" },
    { fr: "comment", say: "koh-MAHN", en: "how" },
    { fr: "pourquoi", say: "poor-KWAH", en: "why" },
    { fr: "parce que", say: "pars-kuh", en: "because" },
    { fr: "combien (de)", say: "kohn-BYAN", en: "how much / how many" },
    { fr: "quel / quelle", say: "kel", en: "which / what" },
    { fr: "est-ce que", say: "ess-kuh", en: "(question marker)" }
  ],
  dialogue: [
    { sp: "Journaliste", fr: "Bonjour ! Est-ce que vous habitez à Paris ?", en: "Hello! Do you live in Paris?" },
    { sp: "Passant", fr: "Non, j'habite à Nice.", en: "No, I live in Nice." },
    { sp: "Journaliste", fr: "Pourquoi êtes-vous à Paris aujourd'hui ?", en: "Why are you in Paris today?" },
    { sp: "Passant", fr: "Parce que je travaille ici cette semaine.", en: "Because I work here this week." },
    { sp: "Journaliste", fr: "Qu'est-ce que vous faites comme travail ?", en: "What do you do for work?" },
    { sp: "Passant", fr: "Je suis cuisinier dans un restaurant.", en: "I'm a cook in a restaurant." },
    { sp: "Journaliste", fr: "Comment trouvez-vous la ville ?", en: "How do you find the city?" },
    { sp: "Passant", fr: "J'adore Paris ! Mais où est un bon café, s'il vous plaît ?", en: "I love Paris! But where is a good café, please?" },
    { sp: "Journaliste", fr: "Il y a un café là-bas, en face de la gare.", en: "There's a café over there, across from the station." },
    { sp: "Passant", fr: "Est-ce que c'est loin ?", en: "Is it far?" },
    { sp: "Journaliste", fr: "Non, ce n'est pas loin. Quand est-ce que vous partez ?", en: "No, it's not far. When are you leaving?" },
    { sp: "Passant", fr: "Je pars dimanche. Je reste trois jours.", en: "I'm leaving Sunday. I'm staying three days." },
    { sp: "Journaliste", fr: "Avec qui êtes-vous à Paris ?", en: "Who are you in Paris with?" },
    { sp: "Passant", fr: "Avec un collègue. Il s'appelle Marc.", en: "With a colleague. His name is Marc." },
    { sp: "Journaliste", fr: "Quel est votre plat préféré ?", en: "What's your favorite dish?" },
    { sp: "Passant", fr: "Le poulet ! Pourquoi cette question ?", en: "Chicken! Why this question?" },
    { sp: "Journaliste", fr: "Parce que je travaille pour un magazine de cuisine !", en: "Because I work for a cooking magazine!" },
    { sp: "Passant", fr: "Ah ! C'est pour ça.", en: "Ah! That's why." },
    { sp: "Journaliste", fr: "Est-ce que je peux prendre une photo ?", en: "May I take a photo?" },
    { sp: "Passant", fr: "Bien sûr !", en: "Of course!" }
  ],
  grammarHTML:
    "<h3>Three ways to ask a yes/no question</h3>" +
    "<p>From <em>Tu parles français</em>:</p>" +
    "<ol><li><strong>Intonation</strong> (casual): <em>Tu parles français ?</em> ↗</li>" +
    "<li><strong>est-ce que</strong> (neutral): <em>Est-ce que tu parles français ?</em></li>" +
    "<li><strong>Inversion</strong> (formal): <em>Parles-tu français ?</em></li></ol>" +
    "<p>As a beginner, <strong>est-ce que</strong> is your safest, most flexible tool.</p>" +
    "<h3>Question words</h3>" +
    "<p>Put the question word first: <em>Où habites-tu ? Quand part le train ? Pourquoi … ? → Parce que … . Combien de frères as-tu ?</em></p>" +
    "<h3>quel / quelle (which)</h3>" +
    "<p>Agrees with its noun: quel (m), quelle (f), quels/quelles (pl): <em>Quel âge ? Quelle heure ?</em></p>" +
    "<h3>il y a</h3>" +
    "<p><strong>Il y a</strong> = there is / there are: <em>Il y a un café là-bas.</em> Question: <em>Est-ce qu'il y a un café ?</em></p>",
  pronTipHTML:
    "<p>In inversion, French inserts a <strong>-t-</strong> between two vowels: <em>Parle-<strong>t</strong>-il ? A-<strong>t</strong>-elle ? Y a-<strong>t</strong>-il ?</em> — purely for sound.</p>",
  flashcards: [
    { fr: "où", en: "where" }, { fr: "quand", en: "when" },
    { fr: "comment", en: "how" }, { fr: "pourquoi", en: "why" },
    { fr: "parce que", en: "because" }, { fr: "combien", en: "how much / many" },
    { fr: "qui", en: "who" }, { fr: "est-ce que", en: "(question marker)" }
  ],
  exercises: [
    { type: "mc", instructions: "Choose the question word: ___ tu t'appelles ?", choices: ["Où", "Comment", "Quand"], answer: "Comment" },
    { type: "mc", instructions: "Choose: ___ d'enfants as-tu ?", choices: ["Combien", "Comment", "Quel"], answer: "Combien" },
    { type: "mc", instructions: "Choose: ___ es-tu fatigué ? — Parce que je travaille beaucoup.", choices: ["Quand", "Où", "Pourquoi"], answer: "Pourquoi" },
    { type: "translate", instructions: "Rewrite as an est-ce que question: “Vous habitez ici.”", prompt: "Do you live here? (with est-ce que)", answers: ["Est-ce que vous habitez ici", "Est-ce que vous habitez ici ?"] },
    { type: "translate", instructions: "Translate.", prompt: "Where do you work? (formal)", answers: ["Où travaillez-vous", "Où est-ce que vous travaillez", "Où travaillez-vous ?"] },
    { type: "translate", instructions: "Translate.", prompt: "Why are you here?", answers: ["Pourquoi es-tu ici", "Pourquoi êtes-vous ici", "Pourquoi est-ce que tu es ici"] },
    { type: "translate", instructions: "Translate.", prompt: "Is there a café?", answers: ["Est-ce qu'il y a un café", "Y a-t-il un café", "Il y a un café ?"] },
    {
      type: "match",
      instructions: "Associez le français à l'anglais.",
      pairs: [
        { fr: "où", en: "where" },
        { fr: "quand", en: "when" },
        { fr: "comment", en: "how" },
        { fr: "pourquoi", en: "why" },
        { fr: "combien", en: "how much / how many" }
      ]
    },
    {
      type: "order",
      instructions: "Remettez les mots dans le bon ordre.",
      tokens: ["Est-ce", "que", "vous", "habitez", "à", "Paris"],
      answers: ["Est-ce que vous habitez à Paris ?", "Est-ce que vous habitez à Paris"]
    },
    {
      type: "listen",
      instructions: "Écoutez et écrivez ce que vous entendez.",
      audio: "Quelle heure est-il ?",
      answers: ["Quelle heure est-il ?", "Quelle heure est-il"]
    }
  ],
  discussion: [
    { fr: "Où habitez-vous ?", en: "Where do you live?" },
    { fr: "Pourquoi apprenez-vous le français ?", en: "Why are you learning French?" },
    { fr: "Quel est votre plat préféré ?", en: "What is your favorite dish?" }
  ],
  readAloud:
    "You are my French tutor. I'm a beginner.\n" +
    "1) Read these question words aloud, French then English: qui, que, où, quand, comment, pourquoi, combien, quel.\n" +
    "2) Read the same question three ways, slowly: \"Tu parles français ?\" / \"Est-ce que tu parles français ?\" / \"Parles-tu français ?\"\n" +
    "3) Read this dialogue twice (slow, then natural), French only:\n\n" +
    "Bonjour ! Est-ce que vous habitez à Paris ? Non, j'habite à Nice.\n" +
    "Pourquoi êtes-vous à Paris aujourd'hui ? Parce que je travaille ici cette semaine.\n" +
    "Qu'est-ce que vous faites comme travail ? Je suis cuisinier dans un restaurant.\n" +
    "Comment trouvez-vous la ville ? J'adore Paris !\n" +
    "Mais où est un bon café ? Il y a un café là-bas, en face de la gare.\n" +
    "Est-ce que c'est loin ? Non, ce n'est pas loin.\n" +
    "Quand est-ce que vous partez ? Je pars dimanche. Je reste trois jours.\n" +
    "Avec qui êtes-vous à Paris ? Avec un collègue.\n" +
    "Quel est votre plat préféré ? Le poulet ! Pourquoi cette question ?\n" +
    "Parce que je travaille pour un magazine de cuisine ! Est-ce que je peux prendre une photo ? Bien sûr !",
  cultureHTML:
    "<p>In everyday speech, people mostly use <strong>intonation</strong> and <strong>est-ce que</strong>. Full <strong>inversion</strong> sounds formal or literary in conversation (you'll see it in writing and polite service: “Puis-je vous aider ?”).</p>"
});
