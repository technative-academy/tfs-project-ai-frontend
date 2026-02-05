import ask from "./ask.js";
import shop from "./shop.js";

// Hamburger menu toggle
const menuToggle = document.querySelector(".header__menu-toggle");
const nav = document.querySelector(".header__nav");

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("header__nav--open");
    menuToggle.classList.toggle("header__menu-toggle--active");
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when clicking a link (mobile)
  nav.querySelectorAll(".header__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("header__nav--open");
      menuToggle.classList.remove("header__menu-toggle--active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

ask.init();
shop.init();
