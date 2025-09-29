const header = document.querySelector("header");
const confirmationButton = document.querySelector(".header__region-confirmation");

const confirmRegion = () => {
    header.classList.add("region-confirmed");
    localStorage.regionConfirmed = "1";
}

if (localStorage.regionConfirmed) {
    confirmRegion();
} else {
    confirmationButton.addEventListener("click", confirmRegion);
}

const regionEditionPopupBtn = document.querySelector(".header__region-edition__btn");
const regionEditionPopupWrapper = document.querySelector(".region-edition-popup-wrapper");
const regionEditionPopup = document.querySelector(".region-edition-popup");
const closeEditionPopupButton = document.querySelector(".region-edition-popup-wrapper__close-btn");

closeEditionPopupButton.addEventListener("click", () => {
    regionEditionPopupWrapper.classList.remove("active");
});

regionEditionPopupBtn.addEventListener("click", () => {
    regionEditionPopupWrapper.classList.add("active");
});

regionEditionPopupWrapper.addEventListener("click", () => {
    regionEditionPopupWrapper.classList.remove("active");
});

regionEditionPopup.addEventListener("click", (e) => {
    e.stopPropagation();
});

const regionEditionPopupList = document.querySelector(".region-edition-popup__list");
const regionName = document.querySelector(".header__region__name");
const regions = ["Нижний Новгород", "Нижегородская область", "Амурская область", "Архангельская область", "Астраханская область", "Белгородская область", "Брянская область", "Владимирская область", "Волгоградская область", "Воронежская область", "Ивановская область"];
const regionEls = [];

const updateCurrentRegion = (regionEl) => {
    document.querySelector(".region-edition-popup__list li.active")?.classList.remove("active");
    regionEl.classList.add("active");

    regionName.innerText = regionEl.innerText;
    localStorage.currentRegion = regionEl.innerText;
}

for (let region of regions) {
    const regionEl = document.createElement("li");
    regionEl.innerText = region;
    regionEl.addEventListener("click", () => {
        updateCurrentRegion(regionEl);
        confirmRegion();
    });
    regionEditionPopupList.appendChild(regionEl);
    regionEls.push(regionEl);
}

if (localStorage.currentRegion) {
    updateCurrentRegion(regionEls.find(r => r.innerText === localStorage.currentRegion));
} else {
    updateCurrentRegion(regionEls[0]);
}

const regionEditionInput = document.querySelector(".region-edition-popup__input");

regionEditionInput.addEventListener("input", () => {
    for (let el of regionEls) {
        if (el.innerText.toLowerCase().includes(regionEditionInput.value.toLowerCase())) {
            el.classList.remove("hidden");
        } else {
            el.classList.add("hidden");
        }
    }
});
