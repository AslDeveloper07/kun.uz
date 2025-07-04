import { API_key, BASE_url } from "./config";

const newsContainer = document.getElementById("renderCard");
const loader = document.getElementById("loader");

const realCardTemplate = document.getElementById("realCard");
const coloredBlockTemplate = document.getElementById("coloredBlock");

// Ranglar massivi (bg-blue-200 dan bg-blue-800 gacha)
const bgColors = [
  "bg-blue-200", "bg-blue-300", "bg-blue-400", "bg-blue-500",
  "bg-blue-600", "bg-blue-700", "bg-blue-800"
];

function showError(message) {
  newsContainer.innerHTML = `<p class="text-red-500 text-center text-xl font-semibold col-span-4 my-10">${message}</p>`;
}

async function fetchAndShowWithBlocks(url) {
  loader.classList.remove("hidden");
  newsContainer.innerHTML = ``;

  try {
    const res = await fetch(url, {
      headers: { "X-Api-Key": API_key },
    });

    if (!res.ok) throw new Error("API bilan bog‘lanishda muammo");

    const data = await res.json();
    const article = data.articles?.[0];

    if (!article || !article.title || !article.urlToImage) {
      showError("Yangilik topilmadi");
      return;
    }

    // 1-ta haqiqiy yangilik card
    const card = realCardTemplate.content.cloneNode(true);
    card.querySelector(".news-image").src = article.urlToImage;
    card.querySelector(".news-image").alt = article.title;
    card.querySelector(".news-title").textContent = article.title;
    newsContainer.appendChild(card);

    // 7 ta rangli blok
    bgColors.forEach((bgClass, i) => {
      const block = coloredBlockTemplate.content.cloneNode(true);
      const blockDiv = block.querySelector(".color-block");

      blockDiv.classList.add(bgClass);
      blockDiv.textContent = `${i + 2}`; // 2 dan 8 gacha
      newsContainer.appendChild(block);
    });

  } catch (err) {
    console.error(err);
    showError("Xatolik: " + err.message);
  } finally {
    loader.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndShowWithBlocks(`${BASE_url}/top-headlines?country=us`);
});
