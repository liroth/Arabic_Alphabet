const listNameEl = document.getElementById("list-name");
const listRows = document.getElementById("list-rows");
const listSelect = document.getElementById("list-select");

const i18n = createI18n(pageTranslations, {
  storageKey: "arabicAlphabetLanguage",
});

function parseList(text) {
  const items = [];
  const lines = text.split(/\r?\n/);
  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("//")) {
      return;
    }
    let parts = line.split("|").map((part) => part.trim());
    if (parts.length < 4) {
      parts = line.split("\t").map((part) => part.trim());
    }
    if (parts.length < 4) {
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

function getListNameFromQuery() {
  const params = new URLSearchParams(window.location.search);
  return params.get("list") || "basic.txt";
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

async function loadListOptions(current) {
  if (!listSelect) {
    return;
  }
  listSelect.innerHTML = "";
  const files = await fetchIndex();
  files.forEach((filename) => {
    const option = document.createElement("option");
    option.value = filename;
    option.textContent = filename.replace(/\.[^.]+$/, "");
    if (filename === current) {
      option.selected = true;
    }
    listSelect.appendChild(option);
  });
}

function renderRows(items) {
  listRows.innerHTML = "";
  if (items.length === 0) {
    const row = document.createElement("tr");
    row.innerHTML = `<td colspan="4" class="text-muted">${i18n.t(
      "emptyList"
    )}</td>`;
    listRows.appendChild(row);
    return;
  }
  items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.en || ""}</td>
      <td>${item.de || ""}</td>
      <td>${item.arLatin || ""}</td>
      <td>${item.ar || ""}</td>
    `;
    listRows.appendChild(row);
  });
}

async function loadList() {
  const listName = getListNameFromQuery();
  listNameEl.textContent = listName.replace(/\.[^.]+$/, "");
  await loadListOptions(listName);
  try {
    const response = await fetch(`wordlists/${listName}`, { cache: "no-store" });
    if (!response.ok) {
      renderRows([]);
      return;
    }
    const text = await response.text();
    renderRows(parseList(text));
  } catch (error) {
    renderRows([]);
  }
}

i18n.initLanguageButtons();
loadList();

if (listSelect) {
  listSelect.addEventListener("change", () => {
    const target = listSelect.value || "basic.txt";
    const params = new URLSearchParams(window.location.search);
    params.set("list", target);
    window.location.search = params.toString();
  });
}
