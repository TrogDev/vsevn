const header = document.querySelector("header");
const confirmationButton = document.querySelector(".header__region-confirmation");

confirmationButton.addEventListener("click", () => {
    header.classList.add("region-confirmed");
});

const regionEditionPopupBtn = document.querySelector(".header__region-edition__btn");
const regionEditionPopupWrapper = document.querySelector(".region-edition-popup-wrapper");
const regionEditionPopup = document.querySelector(".region-edition-popup");

regionEditionPopupBtn.addEventListener("click", () => {
    regionEditionPopupWrapper.classList.add("active");
});

regionEditionPopupWrapper.addEventListener("click", () => {
    regionEditionPopupWrapper.classList.remove("active");
});

regionEditionPopup.addEventListener("click", (e) => {
    e.stopPropagation();
});
