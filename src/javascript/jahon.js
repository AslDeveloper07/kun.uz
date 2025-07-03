import { API_key, BASE_url } from "./config.js";

function generateRandomTime() {
  const hour = String(Math.floor(Math.random() * 24)).padStart(2, "0");
  const minute = String(Math.floor(Math.random() * 60)).padStart(2, "0");
  return `${hour}:${minute}`;
}

export async function renderJahonNews(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Element with ID "${containerId}" not found.`);
    return;
  }

  try {
    const res = await fetch(`${BASE_url}/top-headlines?country=us&pageSize=16`, {
      headers: { "X-Api-Key": API_key },
    });

    if (!res.ok) throw new Error("Failed to fetch news from API.");

    const data = await res.json();
    const articles = data.articles?.slice(0, 13);

    if (!articles || articles.length === 0) {
      container.innerHTML = `<p class="text-red-500 text-center mt-4">Yangilik topilmadi.</p>`;
      return;
    }

    articles.forEach((article, index) => {
      const title = article?.title?.trim();
      if (!title) return;

// Container yaratish
      const block = document.createElement("div");
      block.className =
        "flex flex-col font-semibold md:font-medium border-b border-[#303030] pb-[6px] mt-4";


      const p = document.createElement("p");
      p.className = "text-md line-clamp-2 md:text-[18px] md:leading-7";
      p.textContent = title;

      //Random vaqt quyish
      const span = document.createElement("span");
      span.className =
        "flex text-xs md:text-sm font-normal md:font-samibold  text-blue-500 md:text-md mt-2 justify-end md:justify-start";
      span.textContent =
        index === 0 ? "Reklama" : `Jahon | ${generateRandomTime()}`;

      //Farzand element sifatida qushish
      block.appendChild(p);
      block.appendChild(span);
      container.appendChild(block);
    });
  } catch (error) {
    console.error("Xatolik:", error);
    container.innerHTML =
      `<p class="text-red-500 text-center mt-4">Xatolik yuz berdi: ${error.message}</p>`;
  }
}
