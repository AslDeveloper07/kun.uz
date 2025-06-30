
export default document.addEventListener("DOMContentLoaded", () => {
  const burgerInput = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobile-menu");

  // Toggle menyu ko‘rinishi
  burgerInput.addEventListener("change", function () {
    if (this.checked) {
      mobileMenu.classList.remove("hidden");
    } else {
      mobileMenu.classList.add("hidden");
    }
  });
});
