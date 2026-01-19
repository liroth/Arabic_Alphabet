const analyticsStorageKey = "arabicAlphabetAnalytics";
const statsStorageKey = "arabicAlphabetStats";

const letterStatsBody = document.getElementById("letter-stats");
const sortButtons = document.querySelectorAll("[data-sort]");
let currentSort = "arabic";
let sortDirection = 1;
const resetAnalyticsBtn = document.getElementById("reset-analytics");
const backToToolBtn = document.getElementById("back-to-tool");
const i18n = createI18n(pageTranslations, {
  storageKey: "arabicAlphabetLanguage",
  onApply: () => {
    updateView();
  },
});

function createAnalytics() {
  return {
    total: 0,
    hits: 0,
    fails: 0,
    byCombo: {},
    dailyByCombo: {},
    mistakesByCombo: {},
    perLetter: {},
  };
}

function loadAnalytics() {
  const stored = localStorage.getItem(analyticsStorageKey);
  if (!stored) {
    return createAnalytics();
  }
  try {
    const parsed = JSON.parse(stored);
    return {
      ...createAnalytics(),
      ...parsed,
      byCombo: parsed.byCombo || {},
      dailyByCombo: parsed.dailyByCombo || {},
      mistakesByCombo: parsed.mistakesByCombo || {},
      perLetter: parsed.perLetter || {},
    };
  } catch (error) {
    localStorage.removeItem(analyticsStorageKey);
    return createAnalytics();
  }
}

function getBaseLetters() {
  return [
    { arabic: "\u0627", latin: "a", order: 0 },
    { arabic: "\u0628", latin: "b", order: 1 },
    { arabic: "\u062A", latin: "t", order: 2 },
    { arabic: "\u062B", latin: "th", order: 3 },
    { arabic: "\u062C", latin: "j", order: 4 },
    { arabic: "\u062D", latin: "h", order: 5 },
    { arabic: "\u062E", latin: "kh", order: 6 },
    { arabic: "\u062F", latin: "d", order: 7 },
    { arabic: "\u0630", latin: "dh", order: 8 },
    { arabic: "\u0631", latin: "r", order: 9 },
    { arabic: "\u0632", latin: "z", order: 10 },
    { arabic: "\u0633", latin: "s", order: 11 },
    { arabic: "\u0634", latin: "sh", order: 12 },
    { arabic: "\u0635", latin: "s\u0323", order: 13 },
    { arabic: "\u0636", latin: "d\u0323", order: 14 },
    { arabic: "\u0637", latin: "t\u0323", order: 15 },
    { arabic: "\u0638", latin: "z\u0323", order: 16 },
    { arabic: "\u0639", latin: "\u02BF", order: 17 },
    { arabic: "\u063A", latin: "gh", order: 18 },
    { arabic: "\u0641", latin: "f", order: 19 },
    { arabic: "\u0642", latin: "q", order: 20 },
    { arabic: "\u0643", latin: "k", order: 21 },
    { arabic: "\u0644", latin: "l", order: 22 },
    { arabic: "\u0645", latin: "m", order: 23 },
    { arabic: "\u0646", latin: "n", order: 24 },
    { arabic: "\u0647", latin: "h'", order: 25 },
    { arabic: "\u0648", latin: "w", order: 26 },
    { arabic: "\u064A", latin: "y", order: 27 },
    { arabic: "\u0621", latin: "hamza", order: 28 },
    { arabic: "\u0660", latin: "0", order: 100 },
    { arabic: "\u0661", latin: "1", order: 101 },
    { arabic: "\u0662", latin: "2", order: 102 },
    { arabic: "\u0663", latin: "3", order: 103 },
    { arabic: "\u0664", latin: "4", order: 104 },
    { arabic: "\u0665", latin: "5", order: 105 },
    { arabic: "\u0666", latin: "6", order: 106 },
    { arabic: "\u0667", latin: "7", order: 107 },
    { arabic: "\u0668", latin: "8", order: 108 },
    { arabic: "\u0669", latin: "9", order: 109 },
  ];
}

function formatAccuracy(hits, total) {
  if (!total) {
    return "0%";
  }
  return `${Math.round((hits / total) * 100)}%`;
}

function getAccuracyValue(entry) {
  if (!entry.total) {
    return 0;
  }
  return entry.hits / entry.total;
}

function updateSortButtons() {
  sortButtons.forEach((button) => {
    const isActive = button.dataset.sort === currentSort;
    button.classList.toggle("fw-semibold", isActive);
    button.classList.toggle("text-decoration-underline", isActive);
    button.setAttribute("aria-pressed", isActive ? "true" : "false");
  });
}

function updateView() {
  const analytics = loadAnalytics();
  const baseLetters = getBaseLetters();
  const perLetter = analytics.perLetter || {};
  const merged = baseLetters.map((entry) => {
    const key = entry.latin || entry.arabic;
    const stats = perLetter[key] || { total: 0, hits: 0, fails: 0 };
    return {
      ...entry,
      total: stats.total || 0,
      hits: stats.hits || 0,
      fails: stats.fails || 0,
    };
  });
  const entries = merged.sort((a, b) => {
    if (currentSort === "accuracy") {
      const accuracyDiff = getAccuracyValue(a) - getAccuracyValue(b);
      if (accuracyDiff !== 0) {
        return accuracyDiff * sortDirection;
      }
    } else if (currentSort === "european") {
      const latinCompare = (a.latin || "").localeCompare(b.latin || "");
      if (latinCompare !== 0) {
        return latinCompare * sortDirection;
      }
      return (a.arabic || "").localeCompare(b.arabic || "");
    }
    if (a.order !== b.order) {
      return (a.order - b.order) * sortDirection;
    }
    return (a.latin || "").localeCompare(b.latin || "") * sortDirection;
  });

  letterStatsBody.innerHTML = "";
  if (entries.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="6" class="text-muted">${i18n.t(
      "emptyState"
    )}</td>`;
    letterStatsBody.appendChild(row);
    return;
  }

  entries.forEach((entry) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${entry.arabic || ""}</td>
      <td>${entry.latin || ""}</td>
      <td>${entry.total}</td>
      <td>${entry.hits}</td>
      <td>${entry.fails}</td>
      <td>${formatAccuracy(entry.hits, entry.total)}</td>
    `;
    letterStatsBody.appendChild(row);
  });

  updateSortButtons();
}

if (resetAnalyticsBtn) {
  resetAnalyticsBtn.addEventListener("click", () => {
    localStorage.removeItem(analyticsStorageKey);
    localStorage.removeItem(statsStorageKey);
    updateView();
  });
}

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

if (sortButtons.length > 0) {
  sortButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextSort = button.dataset.sort || "arabic";
      if (currentSort === nextSort) {
        sortDirection *= -1;
      } else {
        currentSort = nextSort;
        sortDirection = currentSort === "accuracy" ? -1 : 1;
      }
      updateView();
    });
  });
}

updateView();

