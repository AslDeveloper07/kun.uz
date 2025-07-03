// config.js - API configuration
export const API_KEY = "1a259fb10cbd4eeea589c2f85abceb1c";
export const BASE_URL = "https://newsapi.org/v2";

// DOM elements
export const newsContainer = document.getElementById("renderCard");
export const loadingIndicator = document.getElementById("loader");
export const cardTemplate = document.getElementById("cards");
export  const realCardTemplate = document.getElementById("realCard");
export  const coloredBlockTemplate = document.getElementById("coloredBlock");

// Background colors for colored blocks
export const bgColors = [
  "bg-blue-200", "bg-blue-300", "bg-blue-400", "bg-blue-500",
  "bg-blue-600", "bg-blue-700", "bg-blue-800"
];

// Helper functions
export function showError(message) {
  newsContainer.innerHTML = `<p class="text-red-500 text-center text-xl font-semibold col-span-4 my-10">${message}</p>`;
}

export function createDivider() {
  const divider = document.createElement("div");
  divider.className = "dolzarb col-span-full w-full mt-0 md:flex justify-between";

  const h1 = document.createElement("h1");
  h1.className = "text-2xl md:text-4xl font-bold";
  h1.textContent = "Articles";

  divider.appendChild(h1);
  return divider;
}

export function createBlockCard({ title, urlToImage }) {
  const card = document.createElement("div");
  card.className = "flex items-start justify-start h-[250px] col-span-1 md:col-span-3 hover:bg-blue-900 hover:text-white";

  const img = document.createElement("img");
  img.className = "w-[404px] h-full object-cover";
  img.src = urlToImage || "./assets/img/default.jpg";
  img.alt = title;

  const content = document.createElement("div");
  content.className = "p-6";

  const p = document.createElement("p");
  p.className = "text-3xl font-bold line-clamp-4";
  p.textContent = title;

  content.appendChild(p);
  card.appendChild(img);
  card.appendChild(content);

  return card;
}

export function createGridCard({ title, urlToImage, description, publishedAt }) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex justify-start gap-3 md:gap-5 h-fit col-span-1 md:col-span-3 border-b border-[#303030] pb-2 md:pb-5";

  const img = document.createElement("img");
  img.className = "flex items-start object-cover md:w-[450px] h-[70px] md:h-[170px] rounded-md md:rounded-none";
  img.src = urlToImage || "./assets/img/default.jpg";
  img.alt = title;

  const content = document.createElement("div");
  content.className = "flex flex-col gap-1";

  const time = document.createElement("p");
  time.className = "text-[11px] md:text-[16px] font-bold text-gray-500";
  const date = new Date(publishedAt);
  const formattedTime = `${date.getHours()}:${String(date.getMinutes()).padStart(2, "0")} | ${date.toLocaleDateString()}`;
  time.textContent = formattedTime;

  const h3 = document.createElement("h3");
  h3.className = "text-sm md:text-[23px] font-bold leading-2 md:leading-8 line-clamp-2";
  h3.textContent = title;

  const p = document.createElement("p");
  p.className = "hidden md:block line-clamp-2 text-gray-500";
  p.textContent = description || "No detailed information provided.";

  content.appendChild(time);
  content.appendChild(h3);
  content.appendChild(p);
  wrapper.appendChild(img);
  wrapper.appendChild(content);

  return wrapper;
}

export function generateRandomTime() {
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hour}:${minute}`;
}

// News functions
export async function fetchAndShow(url) {
  loadingIndicator.classList.remove("hidden");
  newsContainer.innerHTML = ``;

  try {
    const response = await fetch(url, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) throw new Error("Server response error");

    const data = await response.json();
    const articles = data.articles?.slice(0, 16);

    if (!articles || articles.length === 0) {
      showError("No news found");
      return;
    }

    articles.forEach((article, index) => {
      const { title, urlToImage } = article;
      if (!title || !urlToImage) return;

      const card = cardTemplate.content.cloneNode(true);
      card.querySelector(".news-image").src = urlToImage;
      card.querySelector(".news-image").alt = title;
      card.querySelector(".news-title").textContent = title;
      newsContainer.appendChild(card);

      if (index === 7) {
        const divider = createDivider();
        newsContainer.appendChild(divider);
      }
    });
  } catch (err) {
    console.error(err);
    showError("Error occurred: " + err.message);
  } finally {
    loadingIndicator.classList.add("hidden");
  }
}

export async function fetchAndShowWithBlocks(url) {
  loadingIndicator.classList.remove("hidden");
  newsContainer.innerHTML = ``;

  try {
    const res = await fetch(url, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!res.ok) throw new Error("API connection problem");

    const data = await res.json();
    const article = data.articles?.[0];

    if (!article || !article.title || !article.urlToImage) {
      showError("No news found");
      return;
    }

    // Real news card
    const card = realCardTemplate.content.cloneNode(true);
    card.querySelector(".news-image").src = article.urlToImage;
    card.querySelector(".news-image").alt = article.title;
    card.querySelector(".news-title").textContent = article.title;
    newsContainer.appendChild(card);

    // Colored blocks
    bgColors.forEach((bgClass, i) => {
      const block = coloredBlockTemplate.content.cloneNode(true);
      const blockDiv = block.querySelector(".color-block");
      blockDiv.classList.add(bgClass);
      blockDiv.textContent = `${i + 2}`;
      newsContainer.appendChild(block);
    });

  } catch (err) {
    console.error(err);
    showError("Error: " + err.message);
  } finally {
    loadingIndicator.classList.add("hidden");
  }
}

export async function renderBlockCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(`${BASE_URL}/top-headlines?country=us&pageSize=2`, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!res.ok) throw new Error("API error");

    const data = await res.json();
    const articles = data.articles?.slice(0, 2);

    if (!articles || articles.length === 0) {
      container.innerHTML = `<p class="text-red-500 text-center">No news found</p>`;
      return;
    }

    articles.forEach((article) => {
      const card = createBlockCard(article);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Error:", err);
  }
}

export async function renderJahonNews(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const res = await fetch(`${BASE_URL}/top-headlines?country=us&pageSize=16`, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!res.ok) throw new Error("Failed to fetch news from API.");

    const data = await res.json();
    const articles = data.articles?.slice(0, 13);

    if (!articles || articles.length === 0) {
      container.innerHTML = `<p class="text-red-500 text-center mt-4">No news found.</p>`;
      return;
    }

    articles.forEach((article, index) => {
      const title = article?.title?.trim();
      if (!title) return;

      const block = document.createElement("div");
      block.className = "flex flex-col font-semibold md:font-medium border-b border-[#303030] pb-[6px] mt-4";

      const p = document.createElement("p");
      p.className = "text-md line-clamp-2 md:text-[18px] md:leading-7";
      p.textContent = title;

      const span = document.createElement("span");
      span.className = "flex text-xs md:text-sm font-normal md:font-samibold text-blue-500 md:text-md mt-2 justify-end md:justify-start";
      span.textContent = index === 0 ? "Advertisement" : `World | ${generateRandomTime()}`;

      block.appendChild(p);
      block.appendChild(span);
      container.appendChild(block);
    });
  } catch (error) {
    console.error("Error:", error);
    container.innerHTML = `<p class="text-red-500 text-center mt-4">Error occurred: ${error.message}</p>`;
  }
}

export async function renderGridNews(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const response = await fetch(`${BASE_URL}/top-headlines?country=us&pageSize=4`, {
      headers: { "X-Api-Key": API_KEY },
    });

    if (!response.ok) throw new Error("API response error");

    const data = await response.json();
    const articles = data.articles?.slice(0, 4);

    if (!articles || articles.length === 0) {
      container.innerHTML = `<p class="text-red-500 text-center">No news found</p>`;
      return;
    }

    articles.forEach((article) => {
      const card = createGridCard(article);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Data retrieval error:", err);
  }
}

// Theme and language functions
export function setupThemeAndLanguage() {
  const toggleSwitch = document.getElementById("switch");
  const body = document.body;
  const navbar = document.querySelector(".navbar");
  const globeIcon = document.querySelector(".ri-global-line");
  const languageLabel = document.querySelector(".main");
  const burgerSpans = document.querySelectorAll(".burger span");
  const logoImg = document.querySelector(".toggleTheme");
  const mobileMenu = document.getElementById("mobile-menu");
  const bottomMenu = document.querySelector(".menu");
  const languageModal = document.getElementById("languageModal");
  const languageBtn = document.getElementById("languageBtn");
  const languageText = document.getElementById("language");
  const overlay = document.getElementById("overlay");

  function applyTheme(isDark) {
    body.classList.toggle("theme-dark", isDark);
    body.classList.toggle("theme-light", !isDark);
    localStorage.setItem("theme", isDark ? "dark" : "light");

    body.style.backgroundColor = isDark ? "#1A1B1D" : "#ffffff";
    body.style.color = isDark ? "#ffffff" : "#000000";

    if (navbar) navbar.style.backgroundColor = isDark ? "#1E242D" : "#ffffff";
    if (globeIcon) globeIcon.style.color = isDark ? "#ffffff" : "#000000";
    if (languageLabel) languageLabel.style.color = isDark ? "#ffffff" : "#000000";

    burgerSpans.forEach(span => {
      span.style.backgroundColor = isDark ? "#ffffff" : "#000000";
    });

    if (logoImg) {
      logoImg.setAttribute("src", isDark ? "./assets/svg/Logo.svg" : "./assets/img/logo-light.svg");
    }

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

    if (bottomMenu) {
      bottomMenu.style.backgroundColor = isDark ? "#2E2E2E" : "#ffffff";
      bottomMenu.querySelectorAll("svg path").forEach(path => {
        path.setAttribute("fill", isDark ? "#ffffff" : "#9CA4AB");
      });
    }

    if (languageModal) {
      languageModal.style.backgroundColor = isDark ? "#1E1E1E" : "#ffffff";
      languageModal.querySelectorAll("h2, span").forEach(el => {
        el.style.color = isDark ? "#ffffff" : "#000000";
      });
    }

    if (languageBtn) {
      languageBtn.style.color = isDark ? "#ffffff" : "#000000";
    }
    if (languageText) {
      languageText.style.color = isDark ? "#ffffff" : "#000000";
    }
  }

  function openModal() {
    overlay.classList.remove("hidden");
    modal.classList.remove("hidden");
    setTimeout(() => {
      modal.classList.remove("bottom-[-300px]");
      modal.classList.add("bottom-0");
    }, 50);
  }

  function closeModal() {
    modal.classList.remove("bottom-0");
    modal.classList.add("bottom-[-300px]");
    setTimeout(() => {
      overlay.classList.add("hidden");
      modal.classList.add("hidden");
    }, 500);
  }

  function loadSavedLanguage() {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang) {
      languageText.textContent = savedLang;
      const selectedRadio = document.querySelector(`input[name="language"][value="${savedLang}"]`);
      if (selectedRadio) selectedRadio.checked = true;
    }
  }

  function setupLanguageSelection() {
    document.querySelectorAll('input[name="language"]').forEach(radio => {
      radio.addEventListener("change", (e) => {
        const lang = e.target.value;
        localStorage.setItem("selectedLanguage", lang);
        closeModal();
        setTimeout(() => {
          languageText.textContent = lang;
        }, 500);
      });
    });
  }

  // Initialize theme
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = savedTheme === "dark" || (!savedTheme && prefersDark);

  toggleSwitch.checked = isDark;
  applyTheme(isDark);

  // Event listeners
  toggleSwitch.addEventListener("change", () => {
    applyTheme(toggleSwitch.checked);
  });

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    if (!localStorage.getItem("theme")) {
      applyTheme(e.matches);
      toggleSwitch.checked = e.matches;
    }
  });

  // Initialize language
  loadSavedLanguage();
  setupLanguageSelection();
  languageBtn.addEventListener("click", openModal);
  overlay.addEventListener("click", closeModal);
}

// Mobile menu function
export function setupMobileMenu() {
  const burgerInput = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");

  burgerInput.addEventListener("change", function() {
    mobileMenu.classList.toggle("hidden", !this.checked);
  });
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  setupThemeAndLanguage();
  setupMobileMenu();
  fetchAndShow(`${BASE_URL}/everything?q=post`);
  fetchAndShowWithBlocks(`${BASE_URL}/top-headlines?country=uz`);
});