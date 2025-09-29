const createBanner = () => {
    const banner = document.createElement("div");
    banner.className = "cookie-banner";
    const text = document.createElement("p");
    text.innerHTML = "Мы используем файлы cookie, чтобы обеспечивать правильную работу нашего веб-сайта и анализировать сетевой трафик.<br><a href='#'>Согласие на обработку и политика в отношении персональных данных.</a>";
    banner.appendChild(text);
    const button = document.createElement("button");
    button.innerText = "Понятно";
    banner.appendChild(button);
    button.addEventListener("click", () => {
        localStorage.cookieAccepted = "1";
        banner.remove();
    });
    document.body.appendChild(banner);
}

if (!localStorage.cookieAccepted) {
    createBanner();
}
