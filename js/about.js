class About {
  constructor() {
    this.tabsContainer = document.querySelector(".tabs_container")
    this.aboutContainer = document.querySelector(".about_container")
    if (this.tabsContainer) {
        this.aboutAppButton = this.tabsContainer.querySelector(".about-app")
        this.aboutTeamButton = this.tabsContainer.querySelector(".about-team")
        
    }
    if (this.aboutContainer) {
        this.aboutAppContent = this.aboutContainer.querySelector(".about-app-content")
        this.aboutTeamContent = this.aboutContainer.querySelector(".about-team-content")
    }
  }
  

  init() {
    if (!this.tabsContainer) return;

    this.aboutAppButton.addEventListener("click", () => this.onAppButtonPress())
    this.aboutTeamButton.addEventListener("click", () => this.onTeamButtonPress())
    
  }

  onAppButtonPress() {
    this.aboutAppButton.classList.add("tab_selected");
    this.aboutTeamButton.classList.remove("tab_selected");
    this.aboutAppContent.style.display = "block";
    this.aboutTeamContent.style.display = "none";
  }

  onTeamButtonPress() {
    this.aboutAppButton.classList.remove("tab_selected");
    this.aboutTeamButton.classList.add("tab_selected");
    this.aboutTeamContent.style.display = "block";
    this.aboutAppContent.style.display = "none";

  }
  
}

// Expose an instance of the 'Shop' class
export default new About();
