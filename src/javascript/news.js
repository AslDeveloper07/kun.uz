import { API_key, BASE_url } from "./config.js";

// 🧱 Reusable card yaratish funksiyasi
function createGridCard({ title, urlToImage, description, publishedAt }) {
  const wrapper = document.createElement("div");
  wrapper.className =
    "flex justify-start gap-3 md:gap-5 h-fit col-span-1 md:col-span-3 border-b border-[#303030] pb-2 md:pb-5";

  const img = document.createElement("img");
  img.className =
    "flex items-start object-cover md:w-[450px] h-[70px] md:h-[170px]";
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
  h3.className =
    "text-sm md:text-[23px] font-bold leading-2 md:leading-8 line-clamp-2";
  h3.textContent = title;

  const p = document.createElement("p");
  p.className = "hidden md:block line-clamp-2";
  p.textContent = description || "Batafsil ma'lumot berilmagan.";

  content.appendChild(time);
  content.appendChild(h3);
  content.appendChild(p);

  wrapper.appendChild(img);
  wrapper.appendChild(content);

  return wrapper;
}

//Maʻlumotlarni API dan olish
export async function renderGridNews(containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error("Container topilmadi:", containerId);
    return;
  }

  try {
    const response = await fetch(
      `${BASE_url}/top-headlines?country=us&pageSize=4`, // ⬅️ 1 ta yangilik qo‘shildi
      {
        headers: {
          "X-Api-Key": API_key,
        },
      }
    );

    if (!response.ok) throw new Error("API javobida xatolik bor.");

    const data = await response.json();
    const articles = data.articles?.slice(0, 4); // ⬅️ 5 ta yangilikni olib chiqamiz

    if (!articles || articles.length === 0) {
      container.innerHTML = `<p class="text-red-500 text-center">Yangilik topilmadi</p>`;
      return;
    }

    articles.forEach((article, idx) => {
      const card = createGridCard(article);
      container.appendChild(card);
    });
  } catch (err) {
    console.error("Ma'lumot olishda xatolik:", err);
  }
}
