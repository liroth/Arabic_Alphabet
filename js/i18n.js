function createI18n(translations, options) {
  const storageKey =
    options && options.storageKey ? options.storageKey : "siteLanguage";
  const onApply = options && options.onApply ? options.onApply : null;
  let currentLanguage = "en";
  const languageButtons = document.querySelectorAll("[data-lang]");

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
    const stored = localStorage.getItem(storageKey);
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

  function t(key) {
    const pack = translations[currentLanguage] || translations.en;
    return pack[key] || translations.en[key] || key;
  }

  function applyLanguage(language) {
    currentLanguage = translations[language] ? language : "en";
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.dataset.i18n;
      if (key) {
        element.textContent = t(key);
      }
    });
    localStorage.setItem(storageKey, currentLanguage);

    languageButtons.forEach((button) => {
      const isActive = button.dataset.lang === currentLanguage;
      button.classList.toggle("btn-primary", isActive);
      button.classList.toggle("btn-outline-secondary", !isActive);
    });

    if (onApply) {
      onApply(currentLanguage);
    }
  }

  function initLanguageButtons() {
    if (languageButtons.length > 0) {
      languageButtons.forEach((button) => {
        button.addEventListener("click", () => {
          applyLanguage(button.dataset.lang);
        });
      });
    }
    applyLanguage(detectPreferredLanguage());
  }

  function getCurrentLanguage() {
    return currentLanguage;
  }

  return {
    t,
    applyLanguage,
    detectPreferredLanguage,
    initLanguageButtons,
    getCurrentLanguage,
  };
}
