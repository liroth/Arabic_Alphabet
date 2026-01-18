const letters = [
  { arabic: "ا", latin: "a", forms: ["ﺍ", "ﺎ"] },
  { arabic: "ب", latin: "b", forms: ["ﺏ", "ﺑ", "ﺒ", "ﺐ"] },
  { arabic: "ت", latin: "t", forms: ["ﺕ", "ﺗ", "ﺘ", "ﺖ"] },
  { arabic: "ث", latin: "th", forms: ["ﺙ", "ﺛ", "ﺜ", "ﺚ"] },
  { arabic: "ج", latin: "j", forms: ["ﺝ", "ﺟ", "ﺠ", "ﺞ"] },
  { arabic: "ح", latin: "h", forms: ["ﺡ", "ﺣ", "ﺤ", "ﺢ"] },
  { arabic: "خ", latin: "kh", forms: ["ﺥ", "ﺧ", "ﺨ", "ﺦ"] },
  { arabic: "د", latin: "d", forms: ["ﺩ", "ﺪ"] },
  { arabic: "ذ", latin: "dh", forms: ["ﺫ", "ﺬ"] },
  { arabic: "ر", latin: "r", forms: ["ﺭ", "ﺮ"] },
  { arabic: "ز", latin: "z", forms: ["ﺯ", "ﺰ"] },
  { arabic: "س", latin: "s", forms: ["ﺱ", "ﺳ", "ﺴ", "ﺲ"] },
  { arabic: "ش", latin: "sh", forms: ["ﺵ", "ﺷ", "ﺸ", "ﺶ"] },
  { arabic: "ص", latin: "ṣ", forms: ["ﺹ", "ﺻ", "ﺼ", "ﺺ"] },
  { arabic: "ض", latin: "ḍ", forms: ["ﺽ", "ﺿ", "ﻀ", "ﺾ"] },
  { arabic: "ط", latin: "ṭ", forms: ["ﻁ", "ﻃ", "ﻄ", "ﻂ"] },
  { arabic: "ظ", latin: "ẓ", forms: ["ﻅ", "ﻇ", "ﻈ", "ﻆ"] },
  { arabic: "ع", latin: "ʿ", forms: ["ﻉ", "ﻋ", "ﻌ", "ﻊ"] },
  { arabic: "غ", latin: "gh", forms: ["ﻍ", "ﻏ", "ﻐ", "ﻎ"] },
  { arabic: "ف", latin: "f", forms: ["ﻑ", "ﻓ", "ﻔ", "ﻒ"] },
  { arabic: "ق", latin: "q", forms: ["ﻕ", "ﻗ", "ﻘ", "ﻖ"] },
  { arabic: "ك", latin: "k", forms: ["ﻙ", "ﻛ", "ﻜ", "ﻚ"] },
];

const numberItems = [
  { arabic: "٠", latin: "0" },
  { arabic: "١", latin: "1" },
  { arabic: "٢", latin: "2" },
  { arabic: "٣", latin: "3" },
  { arabic: "٤", latin: "4" },
  { arabic: "٥", latin: "5" },
  { arabic: "٦", latin: "6" },
  { arabic: "٧", latin: "7" },
  { arabic: "٨", latin: "8" },
  { arabic: "٩", latin: "9" },
];

const confusionGroups = [
  ["ب", "ت", "ث"],
  ["ج", "ح", "خ"],
  ["د", "ذ"],
  ["ر", "ز"],
  ["س", "ش"],
  ["ص", "ض"],
  ["ط", "ظ"],
  ["ع", "غ"],
  ["ف", "ق"],
];

const baseConfusionGroups = [
  [1, 2, 3], // b, t, th
  [4, 5, 6], // j, h, kh
  [7, 8], // d, dh
  [9, 10], // r, z
  [11, 12], // s, sh
  [13, 14], // s (emph), d (emph)
  [15, 16], // t (emph), z (emph)
  [17, 18], // ayn, ghayn
  [19, 20], // f, q
];

const mixedFormConfusionGroups = [
  [11, 12, 13, 14], // sin/shin vs sad/dad in medial forms
  [7, 8, 9, 10], // short stroke letters (dal/dhal/ra/zay)
];

const translations = {
  en: {
    title: "Arabic Alphabet Trainer",
    subtitle: "Memorize Arabic letters and their European equivalents.",
    siteLanguageLabel: "Site language",
    langEnglish: "English",
    langGerman: "German",
    langArabic: "Arabic",
    labelMode: "Language mode",
    labelDifficulty: "Difficulty",
    labelFormMode: "Arabic letter format",
    optionModeArabic: "Arabic only",
    optionModeEuropean: "European only",
    optionModeMixed: "Mixed",
    optionDifficultyEasy: "Easy",
    optionDifficultyHard: "Hard (common confusions)",
    optionFormIsolated: "Isolated only",
    optionFormMixed: "Mixed forms",
    optionFormNumbers: "Numbers only",
    buttonNewLetter: "New letter",
    buttonPlaySound: "Play sound",
    labelSoundToggle: "Sound on",
    promptPick: "Pick the correct match:",
    progressTitle: "Progress",
    resetStats: "Reset stats",
    statTotal: "Total shown",
    statArabic: "Arabic shown",
    statEuropean: "European shown",
    statStreak: "Streak",
    statBestStreak: "Best streak",
    statHits: "Hits",
    statFails: "Fails",
    feedbackCorrect: "Correct! Great job.",
    feedbackWrong: "Not quite. Try another.",
    warningNoArabicVoice:
      "No Arabic voice detected. Install an Arabic voice in your system speech settings, then reload.",
    warningLink: "How to install",
  },
  de: {
    title: "Arabisches Alphabet",
    subtitle: "Lerne arabische Buchstaben und ihre europaeischen Entsprechungen.",
    siteLanguageLabel: "Seitensprache",
    langEnglish: "Englisch",
    langGerman: "Deutsch",
    langArabic: "Arabisch",
    labelMode: "Sprachmodus",
    labelDifficulty: "Schwierigkeit",
    labelFormMode: "Arabische Buchstabenform",
    optionModeArabic: "Nur Arabisch",
    optionModeEuropean: "Nur Europaeisch",
    optionModeMixed: "Gemischt",
    optionDifficultyEasy: "Einfach",
    optionDifficultyHard: "Schwer (haeufige Verwechslungen)",
    optionFormIsolated: "Nur isoliert",
    optionFormMixed: "Gemischte Formen",
    optionFormNumbers: "Nur Zahlen",
    buttonNewLetter: "Neuer Buchstabe",
    buttonPlaySound: "Ton abspielen",
    labelSoundToggle: "Ton an",
    promptPick: "Waehle die richtige Zuordnung:",
    progressTitle: "Fortschritt",
    resetStats: "Statistik zuruecksetzen",
    statTotal: "Gesamt gezeigt",
    statArabic: "Arabisch gezeigt",
    statEuropean: "Europaeisch gezeigt",
    statStreak: "Serie",
    statBestStreak: "Beste Serie",
    statHits: "Treffer",
    statFails: "Fehler",
    feedbackCorrect: "Richtig! Sehr gut.",
    feedbackWrong: "Nicht ganz. Versuch es noch einmal.",
    warningNoArabicVoice:
      "Kein arabischer Sprachsatz gefunden. Installiere eine arabische Stimme in den System-Sprach-Einstellungen und lade neu.",
    warningLink: "So installierst du es",
  },
  ar: {
    title: "تدريب الحروف العربية",
    subtitle: "احفظ الحروف العربية ومقابلاتها الأوروبية.",
    siteLanguageLabel: "لغة الموقع",
    langEnglish: "الإنجليزية",
    langGerman: "الألمانية",
    langArabic: "العربية",
    labelMode: "وضع اللغة",
    labelDifficulty: "الصعوبة",
    labelFormMode: "شكل الحرف العربي",
    optionModeArabic: "عربي فقط",
    optionModeEuropean: "أوروبي فقط",
    optionModeMixed: "مختلط",
    optionDifficultyEasy: "سهل",
    optionDifficultyHard: "صعب (التباسات شائعة)",
    optionFormIsolated: "معزول فقط",
    optionFormMixed: "أشكال مختلطة",
    buttonNewLetter: "حرف جديد",
    promptPick: "اختر المطابقة الصحيحة:",
    progressTitle: "التقدم",
    resetStats: "إعادة الضبط",
    statTotal: "المجموع",
    statArabic: "العربية المعروضة",
    statEuropean: "الأوروبية المعروضة",
    statStreak: "سلسلة صحيحة",
    statBestStreak: "أفضل سلسلة",
    statHits: "إجابات صحيحة",
    statFails: "إجابات خاطئة",
    feedbackCorrect: "صحيح! أحسنت.",
    feedbackWrong: "غير صحيح. حاول مرة أخرى.",
    warningNoArabicVoice:
      "لا يوجد صوت عربي. قم بتثبيت صوت عربي من إعدادات تحويل النص إلى كلام في النظام ثم أعد التحميل.",
    warningLink: "طريقة التثبيت",
  },
};

const modeSelect = document.getElementById("mode");
const difficultySelect = document.getElementById("difficulty");
const formModeSelect = document.getElementById("form-mode");
const languageButtons = document.querySelectorAll("[data-lang]");
const newRoundBtn = document.getElementById("new-round");
const promptEl = document.getElementById("prompt-letter");
const playSoundBtn = document.getElementById("play-sound");
const soundToggle = document.getElementById("sound-toggle");
const arabicVoiceWarning = document.getElementById("arabic-voice-warning");
const answersEl = document.getElementById("answers");
const feedbackEl = document.getElementById("feedback");
let nextRoundTimer = null;
let currentAnswerButtons = [];

const statTotal = document.getElementById("stat-total");
const statArabic = document.getElementById("stat-arabic");
const statEuropean = document.getElementById("stat-european");
const statStreak = document.getElementById("stat-streak");
const statBestStreak = document.getElementById("stat-best-streak");
const statHits = document.getElementById("stat-hits");
const statFails = document.getElementById("stat-fails");
const resetStatsBtn = document.getElementById("reset-stats");

const statsStorageKey = "arabicAlphabetStats";
const languageStorageKey = "arabicAlphabetLanguage";
const soundStorageKey = "arabicAlphabetSoundEnabled";

const stats = {
  totalShown: 0,
  arabicShown: 0,
  europeanShown: 0,
  hits: 0,
  fails: 0,
  streak: 0,
  bestStreak: 0,
};

let currentLanguage = "en";
let lastPromptText = "";
let lastPromptLang = "en";
let lastPromptLetter = null;
let lastPromptScript = "arabic";
let lastAnswerScript = "latin";
let lastFormMode = "isolated";
let hasArabicVoice = false;

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

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getActiveItems(formMode) {
  return formMode === "numbers" ? numberItems : letters;
}

function pickRandomLetter(items) {
  return items[Math.floor(Math.random() * items.length)];
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
  feedbackEl.textContent = "";
  feedbackEl.className = "mt-3";
  localStorage.setItem(languageStorageKey, currentLanguage);

  languageButtons.forEach((button) => {
    const isActive = button.dataset.lang === currentLanguage;
    button.classList.toggle("btn-primary", isActive);
    button.classList.toggle("btn-outline-secondary", !isActive);
  });

  if (arabicVoiceWarning) {
    arabicVoiceWarning
      .querySelectorAll("[data-i18n]")
      .forEach((element) => {
        const key = element.dataset.i18n;
        if (key) {
          element.textContent = t(key);
        }
      });
  }
}

function getSpeechLanguage(promptScript) {
  if (promptScript === "arabic") {
    return "ar";
  }
  if (currentLanguage === "de") {
    return "de";
  }
  return "en";
}

function getArabicLetterName(letter) {
  const names = {
    a: "alif",
    b: "ba",
    t: "ta",
    th: "tha",
    j: "jim",
    h: "ha",
    kh: "kha",
    d: "dal",
    dh: "dhal",
    r: "ra",
    z: "zay",
    s: "sin",
    sh: "shin",
    "ṣ": "sad",
    "ḍ": "dad",
    "ṭ": "ta",
    "ẓ": "za",
    "ʿ": "ayn",
    gh: "ghayn",
    f: "fa",
    q: "qaf",
    k: "kaf",
  };
  return names[letter.latin] || letter.latin;
}

function getSpeechPayload(letter, promptScript, formMode) {
  if (!letter) {
    return null;
  }
  if (promptScript === "arabic") {
    if (hasArabicVoice) {
      return { text: getArabicDisplay(letter, formMode), lang: "ar" };
    }
    return {
      text: getArabicLetterName(letter),
      lang: currentLanguage === "de" ? "de" : "en",
    };
  }
  return {
    text: getDisplay(letter, "latin", formMode),
    lang: getSpeechLanguage("latin"),
  };
}

function speak(text, lang, onDone) {
  if (!window.speechSynthesis || !text) {
    if (onDone) {
      onDone();
    }
    return;
  }
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  if (onDone) {
    utterance.addEventListener("end", onDone, { once: true });
    utterance.addEventListener("error", onDone, { once: true });
  }
  window.speechSynthesis.speak(utterance);
}

function playAnswerAudio(onDone) {
  if (soundToggle && !soundToggle.checked) {
    if (onDone) {
      onDone(false);
    }
    return;
  }
  const payload = getSpeechPayload(lastPromptLetter, lastAnswerScript, lastFormMode);
  if (!payload) {
    if (onDone) {
      onDone(false);
    }
    return;
  }
  speak(payload.text, payload.lang, () => {
    if (onDone) {
      onDone(true);
    }
  });
}

function playPromptAudio(onDone) {
  if (soundToggle && !soundToggle.checked) {
    if (onDone) {
      onDone();
    }
    return;
  }
  const payload = getSpeechPayload(lastPromptLetter, lastPromptScript, lastFormMode);
  if (!payload) {
    if (onDone) {
      onDone();
    }
    return;
  }
  lastPromptText = payload.text;
  lastPromptLang = payload.lang;
  speak(lastPromptText, lastPromptLang, onDone);
}

function getArabicDisplay(letter, formMode) {
  if (formMode !== "mixed" || !letter.forms || letter.forms.length === 0) {
    return letter.arabic;
  }
  return pickRandomItem(letter.forms);
}

function getDisplay(letter, script, formMode) {
  return script === "arabic" ? getArabicDisplay(letter, formMode) : letter.latin;
}

function getConfusionSet(letter) {
  const group = confusionGroups.find((set) => set.includes(letter.arabic));
  if (!group) {
    return [];
  }
  return letters.filter((item) => group.includes(item.arabic));
}

function getExpandedConfusionSet(letter, formMode) {
  const letterIndex = letters.indexOf(letter);
  if (letterIndex === -1) {
    return [];
  }
  const groups = [...baseConfusionGroups];
  if (formMode === "mixed") {
    groups.push(...mixedFormConfusionGroups);
  }
  const relatedGroups = groups.filter((group) => group.includes(letterIndex));
  if (relatedGroups.length === 0) {
    return [];
  }
  const indices = new Set();
  relatedGroups.forEach((group) => {
    group.forEach((index) => indices.add(index));
  });
  return letters.filter((_, index) => indices.has(index));
}

function buildOptions(correct, count, difficulty, formMode, items) {
  const options = [correct];
  let pool =
    difficulty === "hard" && items === letters
      ? getExpandedConfusionSet(correct, formMode)
      : [...items];

  if (pool.length === 0) {
    pool = [...items];
  }

  pool = pool.filter((item) => item !== correct);

  for (const candidate of shuffle(pool)) {
    if (options.length >= count) {
      break;
    }
    if (!options.includes(candidate)) {
      options.push(candidate);
    }
  }

  while (options.length < count) {
    const extra = pickRandomLetter(items);
    if (!options.includes(extra)) {
      options.push(extra);
    }
  }

  return shuffle(options);
}

function updateStats() {
  statTotal.textContent = stats.totalShown;
  statArabic.textContent = stats.arabicShown;
  statEuropean.textContent = stats.europeanShown;
  statHits.textContent = stats.hits;
  statFails.textContent = stats.fails;
  statStreak.textContent = stats.streak;
  statBestStreak.textContent = stats.bestStreak;
  localStorage.setItem(statsStorageKey, JSON.stringify(stats));
}

function loadStats() {
  const stored = localStorage.getItem(statsStorageKey);
  if (!stored) {
    updateStats();
    return;
  }
  try {
    const parsed = JSON.parse(stored);
    Object.assign(stats, parsed);
  } catch (error) {
    localStorage.removeItem(statsStorageKey);
  }
  updateStats();
}

function resetStats() {
  stats.totalShown = 0;
  stats.arabicShown = 0;
  stats.europeanShown = 0;
  stats.hits = 0;
  stats.fails = 0;
  stats.streak = 0;
  stats.bestStreak = 0;
  updateStats();
}

function renderRound() {
  if (nextRoundTimer) {
    clearTimeout(nextRoundTimer);
    nextRoundTimer = null;
  }
  const mode = modeSelect.value;
  const difficulty = difficultySelect.value;
  const formMode = formModeSelect.value;
  const activeItems = getActiveItems(formMode);
  const correct = pickRandomLetter(activeItems);

  let promptScript = "arabic";
  let answerScript = "latin";
  if (mode === "arabic") {
    promptScript = "arabic";
    answerScript = "latin";
  } else if (mode === "european") {
    promptScript = "latin";
    answerScript = "arabic";
  } else {
    const useArabicPrompt = Math.random() > 0.5;
    promptScript = useArabicPrompt ? "arabic" : "latin";
    answerScript = useArabicPrompt ? "latin" : "arabic";
  }

  promptEl.textContent = getDisplay(correct, promptScript, formMode);
  lastPromptLetter = correct;
  lastPromptScript = promptScript;
  lastAnswerScript = answerScript;
  lastFormMode = formMode;
  playPromptAudio();
  feedbackEl.textContent = "";
  feedbackEl.className = "mt-3";

  stats.totalShown += 1;
  if (promptScript === "arabic") {
    stats.arabicShown += 1;
  } else {
    stats.europeanShown += 1;
  }
  updateStats();

  const options = buildOptions(correct, 4, difficulty, formMode, activeItems);
  answersEl.innerHTML = "";
  currentAnswerButtons = [];

  for (const option of options) {
    const col = document.createElement("div");
    col.className = "col-6 col-md-3 d-grid";

    const button = document.createElement("button");
    button.className = "btn btn-outline-secondary";
    button.type = "button";
    button.textContent = getDisplay(option, answerScript, formMode);
    button.dataset.isCorrect = option === correct ? "true" : "false";

    button.addEventListener("click", () => {
      const isCorrect = button.dataset.isCorrect === "true";
      feedbackEl.textContent = isCorrect ? t("feedbackCorrect") : t("feedbackWrong");
      feedbackEl.className = isCorrect
        ? "mt-3 text-success fw-semibold"
        : "mt-3 text-danger fw-semibold";

      const buttons = answersEl.querySelectorAll("button");
      buttons.forEach((btn) => {
        btn.disabled = true;
        if (btn.dataset.isCorrect === "true") {
          btn.classList.remove("btn-outline-secondary");
          btn.classList.add("btn-success");
        }
      });

      if (!isCorrect) {
        stats.fails += 1;
        stats.streak = 0;
        button.classList.remove("btn-outline-secondary");
        button.classList.add("btn-danger");
      } else {
        stats.hits += 1;
        stats.streak += 1;
        if (stats.streak > stats.bestStreak) {
          stats.bestStreak = stats.streak;
        }
      }
      updateStats();

      if (isCorrect) {
        playAnswerAudio((didSpeak) => {
          const delayMs = didSpeak ? 0 : 1200;
          nextRoundTimer = setTimeout(() => {
            renderRound();
          }, delayMs);
        });
      } else {
        const delayMs = 2500;
        nextRoundTimer = setTimeout(() => {
          renderRound();
        }, delayMs);
      }
    });

    col.appendChild(button);
    answersEl.appendChild(col);
    currentAnswerButtons.push(button);
  }
}

newRoundBtn.addEventListener("click", renderRound);
modeSelect.addEventListener("change", renderRound);
difficultySelect.addEventListener("change", renderRound);
formModeSelect.addEventListener("change", renderRound);
resetStatsBtn.addEventListener("click", resetStats);

if (languageButtons.length > 0) {
  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      applyLanguage(button.dataset.lang);
    });
  });
  const preferred = detectPreferredLanguage();
  applyLanguage(preferred);
}

function updateArabicVoiceStatus() {
  if (!window.speechSynthesis) {
    hasArabicVoice = false;
  } else {
    const voices = window.speechSynthesis.getVoices() || [];
    hasArabicVoice = voices.some((voice) =>
      voice.lang && voice.lang.toLowerCase().startsWith("ar")
    );
  }
  if (arabicVoiceWarning) {
    arabicVoiceWarning.classList.toggle("d-none", hasArabicVoice);
  }
}

if (playSoundBtn) {
  playSoundBtn.addEventListener("click", playPromptAudio);
  if (!window.speechSynthesis) {
    playSoundBtn.disabled = true;
  }
}

if (soundToggle) {
  const storedSound = localStorage.getItem(soundStorageKey);
  if (storedSound !== null) {
    soundToggle.checked = storedSound === "true";
  }
  soundToggle.addEventListener("change", () => {
    localStorage.setItem(soundStorageKey, String(soundToggle.checked));
  });
}

if (window.speechSynthesis) {
  updateArabicVoiceStatus();
  window.speechSynthesis.addEventListener("voiceschanged", updateArabicVoiceStatus);
}

document.addEventListener("keydown", (event) => {
  const target = event.target;
  if (
    target &&
    (target.tagName === "INPUT" ||
      target.tagName === "TEXTAREA" ||
      target.tagName === "SELECT" ||
      target.isContentEditable)
  ) {
    return;
  }
  let index = null;
  if (event.key >= "1" && event.key <= "4") {
    index = Number(event.key) - 1;
  } else if (event.code.startsWith("Numpad")) {
    const codeValue = event.code.replace("Numpad", "");
    if (codeValue >= "1" && codeValue <= "4") {
      index = Number(codeValue) - 1;
    }
  }
  if (index === null) {
    return;
  }
  const button = currentAnswerButtons[index];
  if (button && !button.disabled) {
    button.click();
  }
});

loadStats();
renderRound();
