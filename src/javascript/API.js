import { API_key, BASE_url } from "./config.js";

const newsContainer = document.getElementById("renderCard");
const loadingIndecator = document.getElementById("loader");
const cardtemplate = document.getElementById("cards");

function showError(message) {
  newsContainer.innerHTML = `<p class="text-red-500 text-center text-xl font-semibold col-span-4 my-10">${message}</p>`;
}

//Cardni orasini ochish uchun text joylashtirish
function createDivider() {
  const divider = document.createElement("div");
  divider.className =
    "dolzarb col-span-full w-full mt-10 md:flex justify-between";

  const h1 = document.createElement("h1");
  h1.className = "text-4xl font-bold";
  h1.textContent = "Maqolalar";

  divider.appendChild(h1);
  return divider;
}

async function fetchAndShow(url) {
  loadingIndecator.classList.remove("hidden");
  newsContainer.innerHTML = ``;

  try {
    const response = await fetch(url, {
      headers: { "X-Api-Key": API_key },
    });

    if (!response.ok) throw new Error("Server javobi noto‘g‘ri");

    const data = await response.json();

    if (!data.articles || data.articles.length === 0) {
      showError("Yangilik topilmadi");
      return;
    }

    const articles = data.articles.slice(0, 16);

    articles.forEach((article, index) => {
      const { title, urlToImage } = article;
      if (!title || !urlToImage) return;

      // Card yaratish
      const card = cardtemplate.content.cloneNode(true);
      card.querySelector(".news-image").src = urlToImage;
      card.querySelector(".news-image").alt = title;
      card.querySelector(".news-title").textContent = title;

      newsContainer.appendChild(card);


      //8 ta carddan keyn driver qushish
      if (index === 7) {
        const divider = createDivider();
        newsContainer.appendChild(divider);
      }
    });
  } catch (err) {
    console.error(err);
    showError("Xatolik yuz berdi: " + err.message);
  } finally {
    loadingIndecator.classList.add("hidden");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAndShow(`${BASE_url}/everything?q=post`);
});
