const observableElement = document.createElement("p");
observableElement.style.pointerEvents = "none";
observableElement.style.opacity = "0";
observableElement.style.position = "fixed";
observableElement.innerText = "-";
document.body.appendChild(observableElement);

const resizeObserver = new ResizeObserver(entries => {
    const remSize = Number(getComputedStyle(document.documentElement).fontSize.replace("px", ""));
    const scale = 1000;
    const ratio = ((16 * scale) / (remSize * scale)).toFixed(2)
    document.documentElement.style.setProperty("--font-size-default", `calc(1.125vw * ${ratio})`);
    document.documentElement.style.setProperty("--font-size-ux", `calc(1.25vw * ${ratio})`);
});

resizeObserver.observe(observableElement);
