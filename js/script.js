import ask from "./ask.js";
import shop from "./shop.js";

// Hamburger menu toggle
const menuToggle = document.querySelector(".header__menu-toggle");
const nav = document.querySelector(".header__nav");
const header = document.querySelector(".header");

if (menuToggle && nav && header) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("header__nav--open");
    menuToggle.classList.toggle("header__menu-toggle--active");
    header.classList.toggle("header--menu-open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen);
  });

  // Close menu when clicking a link (mobile)
  nav.querySelectorAll(".header__link").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("header__nav--open");
      menuToggle.classList.remove("header__menu-toggle--active");
      header.classList.remove("header--menu-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

ask.init();
shop.init();
