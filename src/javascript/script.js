export default document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.getElementById("switch");
  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const globeIcon = document.querySelector(".ri-global-line");
  const languageLabel = document.querySelector(".main");
  const burgerSpans = document.querySelectorAll(".burger span");
  const logoImg = document.querySelector(".toggleTheme");

  function applyTheme(theme) {
    const isDark = theme === "dark";

    // Set body class
    body.classList.toggle("theme-dark", isDark);
    body.classList.toggle("theme-light", !isDark);

    // Save theme
    localStorage.setItem("theme", theme);

    // Colors
    body.style.backgroundColor = isDark ? "#1A1B1D" : "#ffffff";
    body.style.color = isDark ? "#ffffff" : "#000000";
    if (navbar) navbar.style.backgroundColor = isDark ? "#1E242D" : "#ffffff";
    if (globeIcon) globeIcon.style.color = isDark ? "#ffffff" : "#000000";
    if (languageLabel) languageLabel.style.color = isDark ? "#ffffff" : "#000000";
    burgerSpans.forEach(span => {
      span.style.backgroundColor = isDark ? "#ffffff" : "#000000";
    });

    // Logo image
    if (logoImg) {
      const imgSrc = isDark ? "./assets/svg/Logo.svg" : "./assets/img/logo-light.svg";
      logoImg.setAttribute("src", imgSrc);
    }
  }

  // Detect saved or system theme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

  toggleSwitch.checked = currentTheme === "dark";
  applyTheme(currentTheme);

  // Toggle switch
  toggleSwitch.addEventListener("change", () => {
    applyTheme(toggleSwitch.checked ? "dark" : "light");
  });

  // OS-level theme change
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
      const newTheme = e.matches ? "dark" : "light";
      toggleSwitch.checked = newTheme === "dark";
      applyTheme(newTheme);
    }
  });
});
