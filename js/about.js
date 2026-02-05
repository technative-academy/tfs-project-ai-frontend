const tabs = document.querySelectorAll(".about__tab");
const panels = document.querySelectorAll(".about__panel");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("about__tab--active"));
    panels.forEach((p) => p.classList.remove("about__panel--active"));

    tab.classList.add("about__tab--active");
    document
      .getElementById(tab.dataset.tab)
      .classList.add("about__panel--active");
  });
});
