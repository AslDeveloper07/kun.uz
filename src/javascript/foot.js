import { API_key, BASE_url } from "./config.js";

//Block tyle yaratish
function createBlockCard({ title, urlToImage }) {
  const card = document.createElement("div");
  card.className =
    "flex items-start justify-start h-[250px] col-span-1 md:col-span-3 hover:bg-blue-900 hover:text-white";

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

// API bilan maʻlumotlarni olib cardlarni chiqarish
export async function renderBlockCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container topilmadi:", containerId);
    return;
  }

  try {
    const res = await fetch(
      `${BASE_url}/top-headlines?country=us&pageSize=2`,
      {
        headers: {
          "X-Api-Key": API_key,
        },
      }
    );

    if (!res.ok) throw new Error("API xatosi");

    const data = await res.json();
    const articles = data.articles?.slice(0, 2);

    if (!articles || articles.length === 0) {
      container.innerHTML = `<p class="text-red-500 text-center">Yangilik topilmadi</p>`;
      return;
    }

    articles.forEach((article) => {
      const card = createBlockCard(article);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Xatolik:", err);
  }
}
