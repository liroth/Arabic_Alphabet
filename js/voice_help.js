const translations = {
  en: {
    title: "Voice Setup Help",
    headerTitle: "Install Arabic Voice",
    headerSubtitle:
      "Use your system speech settings to add an Arabic voice, then reload the trainer.",
    windowsTitle: "Windows",
    windowsSteps:
      "Settings > Time & Language > Speech > Manage voices > Add voices > Arabic.",
    macTitle: "macOS",
    macSteps:
      "System Settings > Accessibility > Spoken Content > System Voice > Manage Voices > Arabic.",
    androidTitle: "Android",
    androidSteps:
      "Settings > System > Languages & input > Text-to-speech output > Install Arabic voice in Google TTS.",
    testTitle: "Test Voices",
    testEnglish: "Test English",
    testGerman: "Test German",
    testArabic: "Test Arabic",
    backButton: "Back to trainer",
  },
  de: {
    title: "Hilfe zur Sprachausgabe",
    headerTitle: "Arabische Stimme installieren",
    headerSubtitle:
      "Fuege eine arabische Stimme in den System-Sprach-Einstellungen hinzu und lade dann den Trainer neu.",
    windowsTitle: "Windows",
    windowsSteps:
      "Einstellungen > Zeit & Sprache > Sprachausgabe > Stimmen verwalten > Stimme hinzufuegen > Arabisch.",
    macTitle: "macOS",
    macSteps:
      "Systemeinstellungen > Bedienungshilfen > Gesprochene Inhalte > Systemstimme > Stimmen verwalten > Arabisch.",
    androidTitle: "Android",
    androidSteps:
      "Einstellungen > System > Sprachen & Eingabe > Text-in-Sprache-Ausgabe > Arabische Stimme in Google TTS installieren.",
    testTitle: "Stimmen testen",
    testEnglish: "Englisch testen",
    testGerman: "Deutsch testen",
    testArabic: "Arabisch testen",
    backButton: "Zurueck zum Trainer",
  },
  ar: {
    title: "مساعدة إعداد الصوت",
    headerTitle: "تثبيت صوت عربي",
    headerSubtitle:
      "أضف صوتًا عربيًا من إعدادات تحويل النص إلى كلام في النظام ثم أعد تحميل المدرب.",
    windowsTitle: "ويندوز",
    windowsSteps:
      "الإعدادات > الوقت واللغة > الكلام > إدارة الأصوات > إضافة أصوات > العربية.",
    macTitle: "ماك",
    macSteps:
      "إعدادات النظام > تسهيلات الاستخدام > المحتوى المنطوق > صوت النظام > إدارة الأصوات > العربية.",
    androidTitle: "أندرويد",
    androidSteps:
      "الإعدادات > النظام > اللغات والإدخال > مخرجات تحويل النص إلى كلام > تثبيت صوت عربي في Google TTS.",
    testTitle: "اختبار الأصوات",
    testEnglish: "اختبار الإنجليزية",
    testGerman: "اختبار الألمانية",
    testArabic: "اختبار العربية",
    backButton: "العودة إلى المدرب",
  },
};

const samples = {
  en: "This is an English voice test.",
  de: "Dies ist ein deutscher Sprachtest.",
  ar: "هذا اختبار للصوت العربي.",
};

const languageStorageKey = "arabicAlphabetLanguage";

function normalizeLanguage(code) {
  if (!code) {
    return null;
  }
  const normalized = code.toLowerCase();
  if (normalized.startsWith("ar")) {
    return "ar";
  }
  if (normalized.startsWith("de")) {
    return "de";
  }
  if (normalized.startsWith("en")) {
    return "en";
  }
  return null;
}

function detectPreferredLanguage() {
  const stored = localStorage.getItem(languageStorageKey);
  if (stored && translations[stored]) {
    return stored;
  }
  const languages = navigator.languages || [];
  for (const language of languages) {
    const normalized = normalizeLanguage(language);
    if (normalized) {
      return normalized;
    }
  }
  return normalizeLanguage(navigator.language) || "en";
}

function applyLanguage(language) {
  const currentLanguage = translations[language] ? language : "en";
  document.documentElement.lang = currentLanguage;
  document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    if (key && translations[currentLanguage][key]) {
      element.textContent = translations[currentLanguage][key];
    }
  });
}

function speakSample(lang) {
  if (!window.speechSynthesis) {
    return;
  }
  const text = samples[lang] || samples.en;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  window.speechSynthesis.speak(utterance);
}

document.querySelectorAll("[data-voice-lang]").forEach((button) => {
  button.addEventListener("click", () => {
    speakSample(button.dataset.voiceLang);
  });
});

applyLanguage(detectPreferredLanguage());
