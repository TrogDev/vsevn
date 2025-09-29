const updateValueDisplay = (el) => {
    const value = el.dataset.value;

    for (let option of el.querySelectorAll("li")) {
        if (option.dataset.value === value) {
            el.querySelector("button").innerText = option.innerText;
            option.classList.add("active");
        } else {
            option.classList.remove("active");
        }
    }

    el.dispatchEvent(new Event("change", { bubbles: true }));
}

for (let el of document.querySelectorAll(".select")) {
    updateValueDisplay(el);
}

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("select")) {
        e.target.classList.toggle("active")
    }

    for (let el of document.querySelectorAll(".select.active")) {
        if (el != e.target) {
            el.classList.remove("active");
        }
    }
});

document.addEventListener("click", (e) => {
    if (e.target.parentElement.parentElement?.classList.contains("select") && e.target.tagName === "LI") {
        e.target.parentElement.parentElement.dataset.value = e.target.dataset.value;
        updateValueDisplay(e.target.parentElement.parentElement);
    }
});
