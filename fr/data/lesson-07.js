window.COURSE.lessons.push({
  id: "07",
  slug: "time-and-dates",
  unit: "Unit 3 — Everyday Life",
  title: "Telling Time, Days & Dates",
  level: "A1",
  time: "~50 min",
  objectives: [
    "Ask and tell the time.",
    "Name the days of the week and months of the year.",
    "Say today's date.",
    "Talk about parts of the day (morning, evening…)."
  ],
  vocab: [
    { fr: "Quelle heure est-il ?", say: "kel UHR eh-TEEL", en: "What time is it?" },
    { fr: "Il est … heures", say: "eel eh … UHR", en: "It is … o'clock" },
    { fr: "et quart / et demie", say: "ay KAR / ay duh-MEE", en: "quarter past / half past" },
    { fr: "moins le quart", say: "mwan luh KAR", en: "quarter to" },
    { fr: "midi / minuit", say: "mee-DEE / mee-NWEE", en: "noon / midnight" },
    { fr: "le matin / le soir", say: "ma-TAN / SWAHR", en: "morning / evening" },
    { fr: "aujourd'hui", say: "oh-zhoor-DWEE", en: "today" },
    { fr: "demain / hier", say: "duh-MAN / ee-YEHR", en: "tomorrow / yesterday" },
    { fr: "une semaine / un mois", say: "suh-MEN / MWAH", en: "a week / a month" }
  ],
  dialogue: [
    { sp: "Emma", fr: "Quelle heure est-il ?", en: "What time is it?" },
    { sp: "Théo", fr: "Il est neuf heures et quart.", en: "It's quarter past nine." },
    { sp: "Emma", fr: "Déjà ? J'ai un rendez-vous à dix heures et demie.", en: "Already? I have an appointment at half past ten." },
    { sp: "Théo", fr: "C'est quel jour aujourd'hui ?", en: "What day is it today?" },
    { sp: "Emma", fr: "C'est mardi, le quatorze mars.", en: "It's Tuesday, March 14th." },
    { sp: "Théo", fr: "Et ton rendez-vous, c'est où ?", en: "And your appointment, where is it?" },
    { sp: "Emma", fr: "Au café, près de la gare.", en: "At the café, near the station." },
    { sp: "Théo", fr: "Tu as le temps. Il est seulement neuf heures et quart.", en: "You have time. It's only quarter past nine." },
    { sp: "Emma", fr: "C'est vrai. Et toi, tu travailles aujourd'hui ?", en: "True. And you, do you work today?" },
    { sp: "Théo", fr: "Oui, de deux heures à six heures du soir.", en: "Yes, from 2 to 6 p.m." },
    { sp: "Emma", fr: "Et demain ?", en: "And tomorrow?" },
    { sp: "Théo", fr: "Demain, c'est mercredi. Je ne travaille pas.", en: "Tomorrow is Wednesday. I don't work." },
    { sp: "Emma", fr: "Super ! On déjeune ensemble à midi ?", en: "Great! Shall we have lunch together at noon?" },
    { sp: "Théo", fr: "Avec plaisir ! À midi et demi, c'est parfait.", en: "With pleasure! At half past twelve is perfect." },
    { sp: "Emma", fr: "D'accord. Et le matin, tu es libre ?", en: "OK. And in the morning, are you free?" },
    { sp: "Théo", fr: "Oui, le matin je suis libre.", en: "Yes, in the morning I'm free." },
    { sp: "Emma", fr: "Quelle est la date de ton anniversaire ?", en: "What's the date of your birthday?" },
    { sp: "Théo", fr: "C'est le premier avril !", en: "It's April 1st!" },
    { sp: "Emma", fr: "Bientôt ! Bon, il est presque dix heures.", en: "Soon! Well, it's almost ten o'clock." },
    { sp: "Théo", fr: "Vas-y ! À demain matin !", en: "Go on! See you tomorrow morning!" },
    { sp: "Emma", fr: "À demain !", en: "See you tomorrow!" }
  ],
  grammarHTML:
    "<h3>Telling time</h3>" +
    "<p>Start with <strong>Il est … heure(s)</strong>: <em>Il est une heure</em> (1:00, singular), <em>Il est trois heures</em> (3:00). Then:</p>" +
    "<ul><li>3:15 → trois heures <strong>et quart</strong></li>" +
    "<li>3:30 → trois heures <strong>et demie</strong></li>" +
    "<li>3:45 → quatre heures <strong>moins le quart</strong></li>" +
    "<li>3:20 → trois heures <strong>vingt</strong>; 3:50 → quatre heures <strong>moins dix</strong></li>" +
    "<li>noon/midnight → <strong>midi / minuit</strong></li></ul>" +
    "<p>24-hour clock for schedules: <em>14h30 = quatorze heures trente</em>. Casual a.m./p.m.: <em>du matin, de l'après-midi, du soir</em>.</p>" +
    "<h3>Days &amp; months</h3>" +
    "<p>Days: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche. Months: janvier … décembre (not capitalised).</p>" +
    "<h3>Dates</h3>" +
    "<p>Pattern: <strong>le + number + month</strong>: <em>le 14 mars</em>. The 1st uses <strong>premier</strong>: <em>le premier janvier</em>. “At” a time uses <strong>à</strong>: <em>à dix heures</em>.</p>",
  pronTipHTML:
    "<p><strong>heure</strong> starts with a silent h, so liaison happens: <em>trois heures</em> → trwah-zUHR; <em>deux heures</em> → duh-zUHR; <em>neuf heures</em> → nuh-vUHR.</p>",
  flashcards: [
    { fr: "lundi", en: "Monday" }, { fr: "mercredi", en: "Wednesday" },
    { fr: "vendredi", en: "Friday" }, { fr: "dimanche", en: "Sunday" },
    { fr: "Quelle heure est-il ?", en: "What time is it?" },
    { fr: "et demie", en: "half past" }, { fr: "midi", en: "noon" },
    { fr: "aujourd'hui", en: "today" }, { fr: "demain", en: "tomorrow" }
  ],
  exercises: [
    { type: "fill", instructions: "Write the time: 8:30 →", before: "Il est huit heures", after: ".", cue: "half past", answers: ["et demie"] },
    { type: "fill", instructions: "Write the time: 10:45 →", before: "Il est onze heures", after: ".", cue: "quarter to", answers: ["moins le quart"] },
    { type: "mc", instructions: "What comes after jeudi?", choices: ["mercredi", "vendredi", "samedi"], answer: "vendredi" },
    { type: "mc", instructions: "Which month comes before avril?", choices: ["mai", "mars", "février"], answer: "mars" },
    { type: "fill", instructions: "Write the date: May 1st →", before: "le", after: "mai", cue: "the 1st", answers: ["premier", "1er"] },
    { type: "translate", instructions: "Translate.", prompt: "What time is it?", answers: ["Quelle heure est-il", "Quelle heure est-il ?"] },
    { type: "translate", instructions: "Translate.", prompt: "Today is Friday.", answers: ["Aujourd'hui, c'est vendredi", "Aujourd'hui c'est vendredi", "C'est vendredi"] },
    { type: "translate", instructions: "Translate.", prompt: "It's noon.", answers: ["Il est midi"] },
    {
      type: "match",
      instructions: "Associez le français à l'anglais.",
      pairs: [
        { fr: "lundi", en: "Monday" },
        { fr: "mercredi", en: "Wednesday" },
        { fr: "aujourd'hui", en: "today" },
        { fr: "demain", en: "tomorrow" },
        { fr: "midi", en: "noon" }
      ]
    },
    {
      type: "order",
      instructions: "Remettez les mots dans le bon ordre.",
      tokens: ["Il", "est", "neuf", "heures", "et", "quart"],
      answers: ["Il est neuf heures et quart.", "Il est neuf heures et quart"]
    },
    {
      type: "listen",
      instructions: "Écoutez et écrivez ce que vous entendez.",
      audio: "Quelle heure est-il ?",
      answers: ["Quelle heure est-il ?", "Quelle heure est-il"]
    }
  ],
  discussion: [
    { fr: "Quel jour sommes-nous aujourd'hui ?", en: "What day is it today?" },
    { fr: "Quelle est la date de votre anniversaire ?", en: "What is the date of your birthday?" },
    { fr: "À quelle heure commencez-vous votre journée ?", en: "What time do you start your day?" }
  ],
  readAloud:
    "You are my French tutor. I'm a beginner.\n" +
    "1) Read the days of the week aloud slowly: lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.\n" +
    "2) Read the months slowly: janvier ... décembre.\n" +
    "3) Read these times aloud, French only: Il est une heure. Il est trois heures et quart. Il est huit heures et demie. Il est dix heures moins le quart. Il est midi.\n" +
    "4) Read this dialogue twice (slow, then natural):\n\n" +
    "Quelle heure est-il ? Il est neuf heures et quart.\n" +
    "Déjà ? J'ai un rendez-vous à dix heures et demie.\n" +
    "C'est quel jour aujourd'hui ? C'est mardi, le quatorze mars.\n" +
    "Et ton rendez-vous, c'est où ? Au café, près de la gare.\n" +
    "Tu as le temps. Il est seulement neuf heures et quart.\n" +
    "Et toi, tu travailles aujourd'hui ? Oui, de deux heures à six heures du soir.\n" +
    "Et demain ? Demain, c'est mercredi. Je ne travaille pas.\n" +
    "On déjeune ensemble à midi ? Avec plaisir ! À midi et demi, c'est parfait.\n" +
    "Quelle est la date de ton anniversaire ? C'est le premier avril !\n" +
    "Bon, il est presque dix heures. Vas-y ! À demain matin !",
  cultureHTML:
    "<p>France runs largely on the <strong>24-hour clock</strong> for anything official — train tickets, TV, shop hours. “Le train part à 19h47” means 7:47 p.m. Convert carefully when travelling.</p>"
});
