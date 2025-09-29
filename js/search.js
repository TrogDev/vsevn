for (let el of document.querySelectorAll(".search-wrapper .clear-icon")) {
    el.addEventListener("click", () => {
        const input = el.parentElement.querySelector("input");
        input.value = "";
        input.dispatchEvent(new Event("input", { bubbles: true }));
    });
}
