const overlay = document.getElementById("overlay");
const modal = document.getElementById("languageModal");
const button = document.getElementById("languageBtn");
const languageText = document.getElementById("language");

// Modalni ochish
function openModal() {
  overlay.classList.remove("hidden");
  modal.classList.remove("hidden");
  setTimeout(() => {
    modal.classList.remove("bottom-[-300px]");
    modal.classList.add("bottom-0");
  }, 50);
}

// Modalni yopish
function closeModal() {
  modal.classList.remove("bottom-0");
  modal.classList.add("bottom-[-300px]");
  setTimeout(() => {
    overlay.classList.add("hidden");
    modal.classList.add("hidden");
  }, 500);
}

// Saqlangan tilni yuklash
function loadSavedLanguage() {
  const savedLang = localStorage.getItem("selectedLanguage");
  if (savedLang) {
    languageText.textContent = savedLang;

    const selectedRadio = document.querySelector(`input[name="language"][value="${savedLang}"]`);
    if (selectedRadio) selectedRadio.checked = true;
  }
}

// Radio tanlanganda saqlash va yopish
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

// Hodisalarni o‘rnatish
document.addEventListener("DOMContentLoaded", () => {
  loadSavedLanguage();
  setupLanguageSelection();

  button.addEventListener("click", openModal);
  overlay.addEventListener("click", closeModal);
});
