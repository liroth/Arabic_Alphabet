
const samples = {
  en: "This is an English voice test.",
  de: "Dies ist ein deutscher Sprachtest.",
  ar: "هذا اختبار للصوت العربي.",
};

const backToToolBtn = document.getElementById("back-to-tool");
const i18n = createI18n(pageTranslations, {
  storageKey: "arabicAlphabetLanguage",
});

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

if (backToToolBtn) {
  backToToolBtn.addEventListener("click", () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = "index.html";
    }
  });
}

i18n.initLanguageButtons();

