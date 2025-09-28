for (let el of document.querySelectorAll(".search-wrapper .clear-icon")) {
    el.addEventListener("click", () => {
        el.parentElement.querySelector("input").value = "";
    });
}
