window.COURSE.lessons.push({
  id: "04",
  slug: "nouns-and-articles",
  unit: "Unit 2 — People & Things",
  title: "Nouns, Gender & Articles",
  level: "A1",
  time: "~50 min",
  objectives: [
    "Understand grammatical gender and why you learn it with each noun.",
    "Use the definite articles le, la, l', les (“the”).",
    "Use the indefinite articles un, une, des (“a / some”).",
    "Form plurals of nouns."
  ],
  vocab: [
    { fr: "un livre", say: "uhn LEE-vruh", en: "a book (m)" },
    { fr: "un stylo", say: "uhn stee-LOH", en: "a pen (m)" },
    { fr: "un cahier", say: "uhn ka-YAY", en: "a notebook (m)" },
    { fr: "une table", say: "ewn TAH-bluh", en: "a table (f)" },
    { fr: "une chaise", say: "ewn SHEZ", en: "a chair (f)" },
    { fr: "une porte", say: "ewn PORT", en: "a door (f)" },
    { fr: "une fenêtre", say: "ewn fuh-NEH-truh", en: "a window (f)" },
    { fr: "un ordinateur", say: "or-dee-na-TUHR", en: "a computer (m)" },
    { fr: "une maison", say: "ewn meh-ZOHN", en: "a house (f)" },
    { fr: "une voiture", say: "ewn vwah-TEWR", en: "a car (f)" },
    { fr: "un sac", say: "uhn SAK", en: "a bag (m)" },
    { fr: "Qu'est-ce que c'est ?", say: "kess-kuh-SEH", en: "What is it?" },
    { fr: "C'est… / Ce sont…", say: "seh / suh-SOHN", en: "It's… / They are…" }
  ],
  dialogue: [
    { sp: "Prof", fr: "Qu'est-ce que c'est ?", en: "What is it?" },
    { sp: "Élève", fr: "C'est un livre.", en: "It's a book." },
    { sp: "Prof", fr: "Et ça, qu'est-ce que c'est ?", en: "And that, what is it?" },
    { sp: "Élève", fr: "Ce sont des stylos. Voilà aussi une table et une chaise.", en: "They're pens. Here's also a table and a chair." },
    { sp: "Prof", fr: "Très bien ! La table est grande, et le livre est petit.", en: "Very good! The table is big, and the book is small." },
    { sp: "Élève", fr: "Voici un cahier et un ordinateur.", en: "Here's a notebook and a computer." },
    { sp: "Prof", fr: "L'ordinateur est petit ou grand ?", en: "Is the computer small or big?" },
    { sp: "Élève", fr: "Il est petit.", en: "It's small." },
    { sp: "Prof", fr: "Et la fenêtre ?", en: "And the window?" },
    { sp: "Élève", fr: "Voilà la fenêtre. Elle est grande.", en: "There's the window. It's big." },
    { sp: "Prof", fr: "Et la porte ?", en: "And the door?" },
    { sp: "Élève", fr: "La porte est petite.", en: "The door is small." },
    { sp: "Prof", fr: "Où sont les livres ?", en: "Where are the books?" },
    { sp: "Élève", fr: "Voici les livres : un, deux, trois livres.", en: "Here are the books: one, two, three books." },
    { sp: "Prof", fr: "Et ça, c'est une voiture ?", en: "And that, is it a car?" },
    { sp: "Élève", fr: "Non ! C'est un sac.", en: "No! It's a bag." },
    { sp: "Prof", fr: "Qu'est-ce qu'il y a dans le sac ?", en: "What's in the bag?" },
    { sp: "Élève", fr: "C'est un téléphone.", en: "It's a phone." },
    { sp: "Prof", fr: "Parfait ! C'est une belle classe.", en: "Perfect! It's a nice classroom." },
    { sp: "Élève", fr: "Merci, monsieur !", en: "Thank you, sir!" }
  ],
  grammarHTML:
    "<h3>Gender: every noun has one</h3>" +
    "<p>There's no perfect rule, so <strong>learn each noun with its article</strong>: <em>une table</em>, <em>un livre</em>. Tendencies: often feminine endings -e, -tion, -té, -ette; often masculine -age, -ment, -eau, -isme.</p>" +
    "<h3>“The” — definite articles</h3>" +
    "<table><tr><th></th><th>singular</th><th>plural</th></tr>" +
    "<tr><td>masculine</td><td>le livre</td><td>les livres</td></tr>" +
    "<tr><td>feminine</td><td>la table</td><td>les tables</td></tr>" +
    "<tr><td>before vowel/h</td><td>l'ordinateur</td><td>les …</td></tr></table>" +
    "<h3>“A / some” — indefinite articles</h3>" +
    "<table><tr><th></th><th>singular</th><th>plural</th></tr>" +
    "<tr><td>masculine</td><td>un livre</td><td>des livres</td></tr>" +
    "<tr><td>feminine</td><td>une table</td><td>des tables</td></tr></table>" +
    "<p><strong>des</strong> = “some” / unspecified plural — French keeps it where English drops it: <em>J'ai des stylos.</em></p>" +
    "<h3>Plurals</h3>" +
    "<p>Usually add <strong>-s</strong> (silent). You hear the plural from the article (un vs des, le vs les). Words in -eau/-eu add -x: <em>un bureau → des bureaux</em>.</p>",
  pronTipHTML:
    "<p>You can't hear most plurals on the noun — <em>livre</em> and <em>livres</em> sound the same. The signal is the article: <strong>le/la</strong> (singular) vs <strong>les</strong> (lay), <strong>un/une</strong> vs <strong>des</strong> (day).</p>",
  flashcards: [
    { fr: "un livre", en: "a book (m)" }, { fr: "une table", en: "a table (f)" },
    { fr: "une chaise", en: "a chair (f)" }, { fr: "un ordinateur", en: "a computer (m)" },
    { fr: "une voiture", en: "a car (f)" }, { fr: "une maison", en: "a house (f)" },
    { fr: "une fenêtre", en: "a window (f)" }, { fr: "un sac", en: "a bag (m)" }
  ],
  exercises: [
    { type: "mc", instructions: "le, la or l'? → ___ maison", choices: ["le", "la", "l'"], answer: "la" },
    { type: "mc", instructions: "le, la or l'? → ___ ordinateur", choices: ["le", "la", "l'"], answer: "l'" },
    { type: "mc", instructions: "un or une? → ___ voiture", choices: ["un", "une"], answer: "une" },
    { type: "mc", instructions: "un or une? → ___ livre", choices: ["un", "une"], answer: "un" },
    { type: "fill", instructions: "Make plural (article + noun): le livre →", before: "", after: "", cue: "plural", answers: ["les livres"] },
    { type: "fill", instructions: "Make plural: un bureau →", before: "", after: "", cue: "plural", answers: ["des bureaux"] },
    { type: "translate", instructions: "Translate.", prompt: "It's a computer.", answers: ["C'est un ordinateur", "Cest un ordinateur"] },
    { type: "translate", instructions: "Translate.", prompt: "They are pens.", answers: ["Ce sont des stylos"] },
    {
      type: "match",
      instructions: "Associez le français à l'anglais.",
      pairs: [
        { fr: "un livre", en: "a book" },
        { fr: "une table", en: "a table" },
        { fr: "une porte", en: "a door" },
        { fr: "une fenêtre", en: "a window" },
        { fr: "un ordinateur", en: "a computer" }
      ]
    },
    {
      type: "order",
      instructions: "Remettez les mots dans le bon ordre.",
      tokens: ["C'est", "une", "voiture"],
      answers: ["C'est une voiture.", "C'est une voiture"]
    },
    {
      type: "listen",
      instructions: "Écoutez et écrivez ce que vous entendez.",
      audio: "Ce sont des livres.",
      answers: ["Ce sont des livres.", "Ce sont des livres"]
    }
  ],
  discussion: [
    { fr: "Qu'est-ce qu'il y a sur votre table ?", en: "What is on your table?" },
    { fr: "Quel objet utilisez-vous tous les jours ?", en: "Which object do you use every day?" }
  ],
  readAloud:
    "You are my French tutor. I'm a beginner learning noun genders.\n" +
    "Read each item aloud: the French (with its article), pause, then the English. Then tell me in one short word \"masculine\" or \"feminine\".\n" +
    "Items: un livre, une table, un stylo, une chaise, une porte, une fenêtre, un ordinateur, une maison, une voiture, un sac.\n" +
    "Then read this dialogue aloud slowly, French only:\n\n" +
    "Qu'est-ce que c'est ? C'est un livre.\n" +
    "Et ça, qu'est-ce que c'est ?\n" +
    "Ce sont des stylos. Voilà aussi une table et une chaise.\n" +
    "Très bien ! La table est grande, et le livre est petit.\n" +
    "Voici un cahier et un ordinateur.\n" +
    "L'ordinateur est petit ou grand ? Il est petit.\n" +
    "Et la fenêtre ? Voilà la fenêtre. Elle est grande.\n" +
    "Et la porte ? La porte est petite.\n" +
    "Où sont les livres ? Voici les livres : un, deux, trois livres.\n" +
    "Et ça, c'est une voiture ? Non ! C'est un sac.\n" +
    "Qu'est-ce qu'il y a dans le sac ? C'est un téléphone.\n" +
    "Parfait ! C'est une belle classe. Merci, monsieur !",
  cultureHTML:
    "<p>Gender feels arbitrary to English speakers — and sometimes it is. Native speakers don't reason about it; they learned each word <em>with its article</em> as a unit. Do the same from day one.</p>"
});
