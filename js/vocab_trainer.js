const listSelect = document.getElementById("list-select");
const listStatus = document.getElementById("list-status");
const selectAllBtn = document.getElementById("select-all-lists");
const clearBtn = document.getElementById("clear-lists");
const promptSelect = document.getElementById("prompt-language");
const answerSelect = document.getElementById("answer-language");
const startBtn = document.getElementById("start-session");
const viewListBtn = document.getElementById("view-list");
const cardFront = document.getElementById("card-front");
const cardEmpty = document.getElementById("card-empty");
const answerButtons = Array.from(
  document.querySelectorAll("#answer-options button")
);
const feedbackEl = document.getElementById("answer-feedback");
const nextCardBtn = document.getElementById("next-card");
const statTotal = document.getElementById("vocab-stat-total");
const statHits = document.getElementById("vocab-stat-hits");
const statFails = document.getElementById("vocab-stat-fails");
const statStreak = document.getElementById("vocab-stat-streak");
const statBestStreak = document.getElementById("vocab-stat-best-streak");
const resetStatsBtn = document.getElementById("reset-vocab-stats");

const i18n = createI18n(pageTranslations, {
  storageKey: "arabicAlphabetLanguage",
});

let availableLists = [];
let deck = [];
let currentIndex = 0;
let currentOptions = [];
let nextCardTimer = null;
const defaultListName = "basic.txt";
const statsStorageKey = "arabicVocabStats";
const stats = {
  totalShown: 0,
  hits: 0,
  fails: 0,
  streak: 0,
  bestStreak: 0,
};

function shuffle(list) {
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeLine(line) {
  return line.trim();
}

function splitLine(line) {
  const parts = line.split("|").map((part) => part.trim());
  if (parts.length >= 4) {
    return parts;
  }
  const tabParts = line.split("\t").map((part) => part.trim());
  if (tabParts.length >= 4) {
    return tabParts;
  }
  return null;
}

function getField(card, langKey) {
  if (!card) {
    return "";
  }
  if (langKey === "en") {
    return card.en || "";
  }
  if (langKey === "de") {
    return card.de || "";
  }
  if (langKey === "arLatin") {
    return card.arLatin || "";
  }
  if (langKey === "arBoth") {
    const latin = card.arLatin || "";
    const arabic = card.ar || "";
    if (latin && arabic) {
      return `${latin} · ${arabic}`;
    }
    return latin || arabic || "";
  }
  return card.ar || "";
}

function parseList(text) {
  const items = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = normalizeLine(line);
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) {
      return;
    }
    const parts = splitLine(trimmed);
    if (!parts) {
      return;
    }
    items.push({
      en: parts[0],
      de: parts[1],
      arLatin: parts[2],
      ar: parts[3],
    });
  });
  return items;
}

async function fetchIndex() {
  try {
    const response = await fetch("wordlists/index.json", { cache: "no-store" });
    if (!response.ok) {
      return [];
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function loadLists() {
  listSelect.innerHTML = "";
  listStatus.classList.add("d-none");
  availableLists = [];

  const files = await fetchIndex();
  if (files.length === 0) {
    listStatus.classList.remove("d-none");
    return;
  }

  for (const filename of files) {
    try {
      const response = await fetch(`wordlists/${filename}`, { cache: "no-store" });
      if (!response.ok) {
        continue;
      }
      const text = await response.text();
      const items = parseList(text);
      if (items.length === 0) {
        continue;
      }
      const option = document.createElement("option");
      option.value = filename;
      option.textContent = filename.replace(/\.[^.]+$/, "");
      listSelect.appendChild(option);
      availableLists.push({ filename, items });
    } catch (error) {
      // Ignore missing or unreadable lists.
    }
  }

  if (availableLists.length === 0) {
    listStatus.classList.remove("d-none");
    return;
  }

  if (listSelect.options.length > 0) {
    const defaultOption = Array.from(listSelect.options).find(
      (option) => option.value === defaultListName
    );
    if (defaultOption) {
      defaultOption.selected = true;
    } else {
      listSelect.options[0].selected = true;
    }
  }
}

function applyDefaultLanguages() {
  const siteLang = i18n.getCurrentLanguage();
  if (!promptSelect || !answerSelect) {
    return;
  }
  if (siteLang === "ar") {
    promptSelect.value = "ar";
    answerSelect.value = "de";
  } else {
    promptSelect.value = siteLang === "de" ? "de" : "en";
    answerSelect.value = "arBoth";
  }
}

function updateCardState(hasCard) {
  cardEmpty.classList.toggle("d-none", hasCard);
  cardFront.textContent = hasCard ? cardFront.textContent : "?";
  feedbackEl.textContent = "";
  feedbackEl.className = "mt-3";
  answerButtons.forEach((button) => {
    button.disabled = !hasCard;
    button.classList.remove("btn-success", "btn-danger");
    button.classList.add("btn-outline-secondary");
  });
  nextCardBtn.disabled = !hasCard;
}

function updateStats() {
  if (!statTotal) {
    return;
  }
  statTotal.textContent = stats.totalShown;
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
  stats.hits = 0;
  stats.fails = 0;
  stats.streak = 0;
  stats.bestStreak = 0;
  updateStats();
}

function renderCard(countQuestion = false) {
  if (nextCardTimer) {
    clearTimeout(nextCardTimer);
    nextCardTimer = null;
  }
  if (deck.length === 0) {
    updateCardState(false);
    return;
  }
  const card = deck[currentIndex];
  const promptLang = promptSelect ? promptSelect.value : "ar";
  const answerLang = answerSelect ? answerSelect.value : "en";
  const correctAnswer = getField(card, answerLang);
  cardFront.textContent = getField(card, promptLang) || "?";
  if (countQuestion) {
    stats.totalShown += 1;
    updateStats();
  }

  const pool = deck.filter(
    (item) => item !== card && getField(item, answerLang) !== correctAnswer
  );
  const shuffledPool = shuffle(pool);
  const options = [correctAnswer];
  for (const item of shuffledPool) {
    if (options.length >= 4) {
      break;
    }
    const value = getField(item, answerLang);
    if (value && !options.includes(value)) {
      options.push(value);
    }
  }
  while (options.length < 4) {
    const fallback = shuffledPool.length
      ? getField(shuffledPool[options.length % shuffledPool.length], answerLang)
      : "";
    if (fallback && !options.includes(fallback)) {
      options.push(fallback);
    } else {
      break;
    }
  }

  currentOptions = shuffle(options);
  answerButtons.forEach((button, index) => {
    const text = currentOptions[index] || "";
    button.textContent = text;
    button.disabled = !text;
    button.classList.remove("btn-success", "btn-danger");
    button.classList.add("btn-outline-secondary");
  });
  updateCardState(true);
}

function startSession() {
  const selected = Array.from(listSelect.selectedOptions).map((option) => option.value);
  if (selected.length === 0) {
    deck = [];
    renderCard();
    return;
  }

  const cards = [];
  selected.forEach((filename) => {
    const list = availableLists.find((entry) => entry.filename === filename);
    if (list) {
      cards.push(...list.items);
    }
  });

  deck = shuffle(cards);
  currentIndex = 0;
  renderCard(true);
}

function handleAnswer(button) {
  if (deck.length === 0) {
    return;
  }
  const answerLang = answerSelect ? answerSelect.value : "en";
  const correct = getField(deck[currentIndex], answerLang);
  const chosen = button.textContent;
  const isCorrect = chosen === correct;
  feedbackEl.textContent = isCorrect
    ? i18n.t("feedbackCorrect")
    : i18n.t("feedbackWrong");
  feedbackEl.className = isCorrect
    ? "mt-3 text-success fw-semibold"
    : "mt-3 text-danger fw-semibold";

  answerButtons.forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correct) {
      btn.classList.remove("btn-outline-secondary");
      btn.classList.add("btn-success");
    }
  });
  if (!isCorrect) {
    button.classList.remove("btn-outline-secondary");
    button.classList.add("btn-danger");
  }
  if (isCorrect) {
    stats.hits += 1;
    stats.streak += 1;
    if (stats.streak > stats.bestStreak) {
      stats.bestStreak = stats.streak;
    }
  } else {
    stats.fails += 1;
    stats.streak = 0;
  }
  updateStats();
  nextCardBtn.disabled = true;
  if (nextCardTimer) {
    clearTimeout(nextCardTimer);
  }
  const delayMs = isCorrect ? 1200 : 4000;
  nextCardTimer = setTimeout(() => {
    nextCardTimer = null;
    nextCard();
  }, delayMs);
}

function nextCard() {
  if (deck.length === 0) {
    return;
  }
  currentIndex = (currentIndex + 1) % deck.length;
  renderCard(true);
}

if (startBtn) {
  startBtn.addEventListener("click", () => {
    startSession();
  });
}

if (selectAllBtn) {
  selectAllBtn.addEventListener("click", () => {
    Array.from(listSelect.options).forEach((option) => {
      option.selected = true;
    });
  });
}

if (clearBtn) {
  clearBtn.addEventListener("click", () => {
    Array.from(listSelect.options).forEach((option) => {
      option.selected = false;
    });
  });
}

if (viewListBtn) {
  viewListBtn.addEventListener("click", () => {
    const selected = Array.from(listSelect.selectedOptions).map(
      (option) => option.value
    );
    const target = selected[0] || "basic.txt";
    window.location.href = `vocab_list.html?list=${encodeURIComponent(target)}`;
  });
}

if (promptSelect) {
  promptSelect.addEventListener("change", () => {
    renderCard(false);
  });
}

if (answerSelect) {
  answerSelect.addEventListener("change", () => {
    renderCard(false);
  });
}

if (nextCardBtn) {
  nextCardBtn.addEventListener("click", () => {
    nextCard();
  });
}

if (resetStatsBtn) {
  resetStatsBtn.addEventListener("click", () => {
    resetStats();
  });
}

answerButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!button.disabled) {
      handleAnswer(button);
    }
  });
});

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
  const button = answerButtons[index];
  if (button && !button.disabled) {
    button.click();
  }
});

i18n.initLanguageButtons();
applyDefaultLanguages();
loadLists();
updateCardState(false);
loadStats();
