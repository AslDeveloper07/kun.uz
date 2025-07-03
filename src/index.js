import "./javascript/darkMode";
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

import "./style/style.css";

// import {
//   API_KEY,
//   BASE_URL,
//   newsContainer,
//   loadingIndicator,
//   cardTemplate,
//   realCardTemplate,
//   coloredBlockTemplate,
//   bgColors,
//   showError,
//   createDivider,
//   createBlockCard,
//   createGridCard,
//   generateRandomTime,
//   fetchAndShow,
//   fetchAndShowWithBlocks,
//   renderBlockCards,
//   renderJahonNews,
//   renderGridNews,
//   setupThemeAndLanguage,
//   setupMobileMenu,
// } from "./js/JavaScripts.js";

// document.addEventListener("DOMContentLoaded", () => {
//   setupThemeAndLanguage();
//   setupMobileMenu();

//   fetchAndShow(`${BASE_URL}/everything?q=post`);
//   fetchAndShowWithBlocks(`${BASE_URL}/top-headlines?country=uz`);
// });
