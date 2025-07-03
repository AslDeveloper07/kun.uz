import "./javascript/darkMode";
import "./style/style.css";
import "./javascript/sidebar";
import "./javascript/card";
import { renderJahonNews } from "./javascript/jahon";
import { renderGridNews } from "./javascript/news";
import { renderBlockCards } from "./javascript/foot";
import { openModal, closeModal } from "./javascript/language";

document.addEventListener("DOMContentLoaded", () => {
  renderJahonNews("jahon");
});

document.addEventListener('DOMContentLoaded', () => {
  renderGridNews('gridNewsContainer');
});

document.addEventListener("DOMContentLoaded", () => {
  renderBlockCards("container-id");
});


document.addEventListener("DOMContentLoaded", () => {
  loadSavedLanguage();
  setupLanguageSelection();

  const button = document.getElementById("languageBtn");
  const overlay = document.getElementById("overlay");

  button.addEventListener("click", openModal);
  overlay.addEventListener("click", closeModal);
});