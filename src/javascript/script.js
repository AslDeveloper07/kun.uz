document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("switch");
  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const globeIcon = document.querySelector(".ri-global-line");
  const languageLabel = document.querySelector(".main");
  const burgerSpans = document.querySelectorAll(".burger span");
  const logoImg = document.querySelector(".toggleTheme");
  const mobileMenu = document.getElementById("mobile-menu");

  function applyTheme(isDark) {
    body.classList.toggle("theme-dark", isDark);
    body.classList.toggle("theme-light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    // Body va navbar rangi uzgarishi uchun
    body.style.backgroundColor = isDark ? "#1A1B1D" : "#ffffff";
    body.style.color = isDark ? "#ffffff" : "#000000";
    if (navbar) navbar.style.backgroundColor = isDark ? "#1E242D" : "#ffffff";

    if (globeIcon) globeIcon.style.color = isDark ? "#ffffff" : "#000000";
    if (languageLabel) languageLabel.style.color = isDark ? "#ffffff" : "#000000";

    // Burger spanlarlar uchun
    burgerSpans.forEach(span => {
      span.style.backgroundColor = isDark ? "#ffffff" : "#000000";
    });

    // Logo rasmi uzgarishi uchun
    if (logoImg) {
      logoImg.setAttribute("src", isDark ? "./assets/svg/Logo.svg" : "./assets/img/logo-light.svg");
    }

    // Mobile menuga style berish
    if (mobileMenu) {
      mobileMenu.style.backgroundColor = isDark ? "#2E2E2E" : "#e7e7e7";
      mobileMenu.querySelectorAll("a").forEach(a => a.style.color = isDark ? "#ffffff" : "#0f172a");
      mobileMenu.querySelectorAll("p").forEach(p => p.style.color = isDark ? "#ffffff" : "#0f172a");
      const ul = mobileMenu.querySelector("ul");
      if (ul) {
        ul.style.backgroundColor = isDark ? "#1E1E1E" : "#FCFCFC";
        ul.style.color = isDark ? "#ffffff" : "#000000";
      }
    }
  }
// oldingi holat
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  toggleSwitch.checked = isDark;
  applyTheme(isDark);

  // Switch bosilganda Theme uzgarishi
  toggleSwitch.addEventListener("change", () => {
    applyTheme(toggleSwitch.checked);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
      toggleSwitch.checked = e.matches;
    }
  });
});
