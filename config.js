/* Per-language configuration for the unified course engine (app.js).
   field    — property holding target-language text in the data files
   storeKey — kept identical to the original standalone apps so progress
              namespacing stays per-language on one origin */
window.SITE_LANGS = {
  fr: {
    code: "fr", name: "French", flag: "🇫🇷", field: "fr", locale: "fr",
    audio: true, // pre-generated neural MP3s in fr/audio/ (tools/gen-audio.py)
    ttsLang: "fr-FR", voicePrefs: ["fr-fr", "fr-ca", "fr-be", "fr-ch", "fr"],
    storeKey: "frenchCourseProgress.v1", srsKey: "frenchCourseSRS.v1", streakKey: "frenchCourseStreak.v1"
  },
  de: {
    code: "de", name: "German", flag: "🇩🇪", field: "de", locale: "de",
    audio: true, // pre-generated neural MP3s (tools/gen-audio.py)
    ttsLang: "de-DE", voicePrefs: ["de-de", "de-at", "de-ch", "de"],
    storeKey: "germanCourseProgress.v1", srsKey: "germanCourseSRS.v1", streakKey: "germanCourseStreak.v1"
  },
  ru: {
    code: "ru", name: "Russian", flag: "🇷🇺", field: "ru", locale: "ru",
    audio: true, // pre-generated neural MP3s (tools/gen-audio.py)
    ttsLang: "ru-RU", voicePrefs: ["ru-ru", "ru"],
    storeKey: "russianCourseProgress.v1", srsKey: "russianCourseSRS.v1", streakKey: "russianCourseStreak.v1"
  },
  it: {
    code: "it", name: "Italian", flag: "🇮🇹", field: "it", locale: "it",
    audio: true, // pre-generated neural MP3s (tools/gen-audio.py)
    ttsLang: "it-IT", voicePrefs: ["it-it", "it"],
    storeKey: "italianCourseProgress.v1", srsKey: "italianCourseSRS.v1", streakKey: "italianCourseStreak.v1"
  },
  es: {
    code: "es", name: "Spanish", flag: "🇪🇸", field: "es", locale: "es",
    audio: true, // pre-generated neural MP3s (tools/gen-audio.py)
    ttsLang: "es-ES", voicePrefs: ["es-mx", "es-us", "es-419", "es-ar", "es-co", "es-es", "es"],
    storeKey: "spanishCourseProgress.v1", srsKey: "spanishCourseSRS.v1", streakKey: "spanishCourseStreak.v1"
  }
};
