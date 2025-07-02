import "./javascript/script";
import "./style/style.css";
import "./javascript/sidebar";
import "./javascript/API";
import { renderJahonNews } from "./javascript/jahon";
import { renderGridNews } from "./javascript/news";
import { renderBlockCards } from "./javascript/foot";


document.addEventListener("DOMContentLoaded", () => {
  renderJahonNews("jahon");
});

document.addEventListener('DOMContentLoaded', () => {
  renderGridNews('gridNewsContainer');
});

document.addEventListener("DOMContentLoaded", () => {
  renderBlockCards("container-id");
});
