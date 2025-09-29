const isApplicantBox = document.getElementById("is-applicant");
const isEmployerBox = document.getElementById("is-employer");
const searchFormSelect = document.querySelector(".search-form__input.select");
const main = document.querySelector("main");
const isActiveCheckbox = document.querySelector(".search-form__is-active-checkbox input");

isApplicantBox.addEventListener("change", () => {
    if (isApplicantBox.value !== "on") {
        return;
    }

    main.classList.remove("employer");
    main.classList.add("applicant");
    searchFormSelect.dataset.value = "vacancy";
    updateValueDisplay(searchFormSelect);
});

isEmployerBox.addEventListener("change", () => {
    if (isEmployerBox.value !== "on") {
        return;
    }

    main.classList.add("employer");
    main.classList.remove("applicant");
    searchFormSelect.dataset.value = "resume";
    updateValueDisplay(searchFormSelect);
});

searchFormSelect.addEventListener("change", () => {
    if (searchFormSelect.dataset.value === "company") {
        isActiveCheckbox.parentElement.classList.remove("hidden-by-opacity");
    } else {
        isActiveCheckbox.parentElement.classList.add("hidden-by-opacity");
    }
});

const searchInput = document.querySelector(".search-form__input.search");
const suggestions = document.querySelector(".search-form__suggestions");
const professions = ["Ведущий менеджер", "Менеджер", "Менеджер-логист", "Менеджер по закупкам", "Менеджер по персоналу", "Менеджер по продажам", "Менеджер по продажам строительных материалов", "Менеджер проектов", "Офис-менеджер", "Crm-менеджер", "hr-менеджер", "Главный менеджер", "Грузчик", "Погрузчик"];
const companies = [{
    inn: "5257067140",
    name: 'ЗАО "МЕГА МЕНЕДЖМЕНТ"',
    address: 'г. Нижний Новгород, проспект Ленина, дом 93, корпус 17, пристрой Е1, кабинет 102',
    vacancyNumber: 0
},
{
    inn: "5257148505",
    name: 'ООО "РЕГИОН-МЕНЕДЖМЕНТ"',
    address: 'г. Нижний Новгород, улица Героя Рябцева, дом 35, помещ П1',
    vacancyNumber: 1
},
{
    inn: "5260390009",
    name: 'ООО "МЕНС КЛАБ"',
    address: 'г. Нижний Новгород, улица Нестерова, дом 33, офис 9',
    vacancyNumber: 35
},
{
    inn: "5260135224",
    name: 'ООО "КЭПИТАЛ МЕНЕДЖМЕНТ"',
    address: 'г. Нижний Новгород, проспект Гагарина, дом 27',
    vacancyNumber: 0
},
{
    inn: "5262296570",
    name: 'ООО "2К МЕНЕДЖМЕНТ"',
    address: 'г. Нижний Новгород, проспект Гагарина, дом 25В, офис 218',
    vacancyNumber: 0
},
{
    inn: "5260495280",
    name: 'ООО "СЗ "МЕНДЕЛЕЕВ"',
    address: 'г. Нижний Новгород, Верхне-Волжская набережная, дом 8/59, офис 38',
    vacancyNumber: 0
}];

function getMaxVisibleSuggestions(itemHeight, maxCount) {
    const spaceBelow = window.innerHeight - searchInput.getBoundingClientRect().bottom;
    const fitCount = Math.floor(spaceBelow / itemHeight);
    return Math.min(fitCount, maxCount);
}

function highlightMatch(text, query) {
    const wordSplitRegex = /([^\s-"]+)|([\s-"]+)/g;
    const tokens = [...text.matchAll(wordSplitRegex)].map(m => m[0]);

    const queryWords = query.trim().toLowerCase().split(/\s+/);

    const startsWith = (word, prefix) => word.toLowerCase().startsWith(prefix);

    let matched = false;
    for (let i = 0; i < tokens.length; i++) {
        let tIndex = i;
        let qIndex = 0;

        const highlights = [];

        while (tIndex < tokens.length && qIndex < queryWords.length) {
            const token = tokens[tIndex];

            if (/^\s*$/.test(token) || token === '-' || token === '"') {
                highlights.push(token);
                tIndex++;
                continue;
            }

            if (startsWith(token, queryWords[qIndex])) {
                const prefixLen = queryWords[qIndex].length;
                const highlightedToken = `<span>${token.slice(0, prefixLen)}</span>${token.slice(prefixLen)}`;
                highlights.push(highlightedToken);
                tIndex++;
                qIndex++;
            } else {
                break;
            }
        }

        if (qIndex === queryWords.length) {
            let highlighted = '';
            let j = 0;
            for (const tok of tokens) {
                if (j >= i && j < tIndex) {
                    highlighted += highlights[j - i];
                } else {
                    highlighted += tok;
                }
                j++;
            }
            matched = true;
            return { matched, highlighted };
        }
    }

    return { matched: false, highlighted: text };
}

searchInput.addEventListener("input", () => {
    suggestions.innerHTML = "";

    if (searchInput.value.length < 2) {
        suggestions.classList.add("hidden");
        return;
    }

    let isAny = false;

    if (searchFormSelect.dataset.value === "company") {
        const maxVisible = getMaxVisibleSuggestions(window.innerWidth * 0.0552, 6);

        for (let company of companies) {
            const innResult = highlightMatch(company.inn, searchInput.value);
            const nameResult = highlightMatch(company.name, searchInput.value);
            const addressResult = highlightMatch(company.address, searchInput.value);

            if (!innResult.matched && !nameResult.matched && !addressResult.matched) {
                continue;
            }
            if (isActiveCheckbox.checked && !company.vacancyNumber) {
                continue;
            }

            const suggestion = document.createElement("li");
            suggestion.className = "company";
            const inn = document.createElement("p");
            inn.className = "inn";
            inn.innerHTML = innResult.highlighted;
            suggestion.appendChild(inn);
            const name = document.createElement("p");
            name.className = "name";
            name.innerHTML = nameResult.highlighted;
            suggestion.appendChild(name);
            const address = document.createElement("p");
            address.className = "address";
            address.innerHTML = addressResult.highlighted;
            suggestion.appendChild(address);
            const vacancyNumber = document.createElement("p");
            vacancyNumber.className = "vacancy-number";
            vacancyNumber.innerHTML = !!company.vacancyNumber ? `Активных вакансий <span>${company.vacancyNumber}</span>` : "Нет активных вакансий";
            suggestion.appendChild(vacancyNumber);
            suggestions.appendChild(suggestion);
            isAny = true;

            if (suggestions.childElementCount >= maxVisible) {
                break;
            }
        }
    } else {
        const maxVisible = getMaxVisibleSuggestions(window.innerWidth * 0.0286, 12);

        for (let profession of professions) {
            const result = highlightMatch(profession, searchInput.value);

            if (!result.matched) {
                continue;
            }

            const suggestion = document.createElement("li");
            suggestion.className = "profession";
            suggestion.innerHTML = result.highlighted;
            suggestions.appendChild(suggestion);
            isAny = true;

            if (suggestions.childElementCount >= maxVisible) {
                break;
            }
        }
    }

    if (isAny) {
        suggestions.classList.remove("hidden");
    } else {
        suggestions.classList.add("hidden");
    }
});
