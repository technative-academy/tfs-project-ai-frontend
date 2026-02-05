class About {

  constructor() {
    this.tabs = document.querySelectorAll(".about__tab");
    this.panels = document.querySelectorAll(".about__panel");
  }

  init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.tabs.forEach((t) => t.classList.remove("about__tab--active"));
        this.panels.forEach((p) => p.classList.remove("about__panel--active"));

        tab.classList.add("about__tab--active");
        document
          .getElementById(tab.dataset.tab)
          .classList.add("about__panel--active");
      });
    });
    
  }
}

export default new About();
