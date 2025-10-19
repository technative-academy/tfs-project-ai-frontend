



class Ask {
  maxLength = 160;

  constructor() {
    this.askContainer = document.querySelector(".ask");
    if (this.askContainer) {
      this.askInput = this.askContainer.querySelector(".ask__input");
      this.exampleButton = this.askContainer.querySelector(
        ".ask__button--example"
      );
      this.button1 = this.askContainer.querySelector(".button__1");
      this.button2 = this.askContainer.querySelector(".button__2");
      this.button3 = this.askContainer.querySelector(".button__3");
      this.button4 = this.askContainer.querySelector(".button__4");
      this.askButton = this.askContainer.querySelector(".ask__button-ask");
      this.resetButton = this.askContainer.querySelector(".ask__button-reset");
      this.charCounter = this.askContainer.querySelector(".ask__char-count");
      this.loading = this.askContainer.querySelector(".search__loading");
      this.resultsContainer = document.querySelector(".results");
      this.showMoreButton = this.resultsContainer.querySelector(
        ".button.button--primary"
      );
      this.loadingMore = this.resultsContainer.querySelector(".loading__more");
      this.clearListButton =
        this.resultsContainer.querySelector(".clear__button");
      this.resultsList = this.resultsContainer.querySelector(".results__list");
    }
  }

  init() {
    if (!this.askContainer) return;
    this.askInput.addEventListener("input", (e) => this.checkInput(e));
    this.button1.addEventListener("click", (e) => this.setExample(e));
    this.button2.addEventListener("click", (e) => this.setExample(e));
    this.button3.addEventListener("click", (e) => this.setExample(e));
    this.button4.addEventListener("click", (e) => this.setExample(e));
    this.askButton.addEventListener("click", (e) => this.askClicked(e));
    this.resetButton.addEventListener("click", (e) => this.resetClicked(e));
    this.checkInput();
    this.showMoreButton.addEventListener("click", (e) => this.showMore(e));
    this.clearListButton.addEventListener("click", (e) => this.resetResults(e));
    this.clearListButton.addEventListener("click", (e) => this.clearInput(e));
    this.askButton.addEventListener("click", (e) => this.resetResults(e));
    this.askInput.addEventListener("keypress", (e) => this.onEnter(e));
  }

  checkInput() {
    // check submission validity
    const charsRemaining = this.maxLength - this.askInput.value.length;
    if (charsRemaining < 0) {
      this.askButton.disabled = true;
      this.charCounter.classList.add("has-error");
    } else {
      this.askButton.disabled = false;
      this.charCounter.classList.remove("has-error");
    }
    this.charCounter.textContent = `${charsRemaining} characters remaining`;
  }

  //clear input

  clearInput() {
    this.askInput.value = "";
  }


  //create functions for each example button

  setExample(event) {
    event.preventDefault();
    let buttonClicked = event.target;
    if (buttonClicked === this.button1) {
      this.resetResults();
      this.askInput.value = "So happy, smiling bigger than the cheshire cat";
      this.askButton.click();
      this.button1.classList.add("button--secondary");
      this.button2.classList.remove("button--secondary");
      this.button3.classList.remove("button--secondary");
      this.button4.classList.remove("button--secondary");
    }
    if (buttonClicked === this.button2) {
      this.resetResults();
      this.askInput.value = "Grrrrrrrr let me break something";
      this.askButton.click();
      this.button2.classList.add("button--secondary");
      this.button1.classList.remove("button--secondary");
      this.button3.classList.remove("button--secondary");
      this.button4.classList.remove("button--secondary");
    }

    if (buttonClicked === this.button3) {
      this.resetResults();
      this.askInput.value = "Soooooo tired, can't keep my eyes open";
      this.askButton.click();
      this.button3.classList.add("button--secondary");
      this.button2.classList.remove("button--secondary");
      this.button1.classList.remove("button--secondary");
      this.button4.classList.remove("button--secondary");
    }

    if (buttonClicked === this.button4) {
      this.resetResults();
      this.askInput.value =
        "Wwwwooooooooo let's go, I'm bouncing off the walls";
      this.askButton.click();
      this.button4.classList.add("button--secondary");
      this.button2.classList.remove("button--secondary");
      this.button3.classList.remove("button--secondary");
      this.button1.classList.remove("button--secondary");
    }
  }

  //reset results on search button click

  resetResults() {
    if (this.resultsList) {
      this.resultsList.innerHTML = "";
      this.button1.classList.remove("button--secondary");
      this.button2.classList.remove("button--secondary");
      this.button3.classList.remove("button--secondary");
      this.button4.classList.remove("button--secondary");
    }

    this.resultsContainer.classList.remove("is-shown");
    this.clearListButton.classList.add("hidden");
  }

  resetClicked(event) {
    event.preventDefault();
    this.askInput.value = "";
    this.checkInput();
  }

  onEnter(event) {
    if (event.key === "Enter" && this.askInput.value.trim()) {
      event.preventDefault();
      this.askClicked();
    }
  }

  async askClicked() {
    this.resetResults();
    this.loading.classList.add("is-loading");
    let url = `https://ai-project.technative.dev.f90.co.uk/ai/askbeatz/?query=${this.askInput.value}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      await setTimeout(async () => {
        const json = await response.json();
        this.processResults(json);
        this.loading.classList.remove("is-loading");
      }, 1000);
    } catch (error) {
      console.error(error.message);
      this.loading.classList.remove("is-loading");
    }
  }

  //function to make show more call

  async showMore() {
    this.loadingMore.classList.add("is-loading");
    let url = `https://ai-project.technative.dev.f90.co.uk/ai/askbeatz/?query=${this.askInput.value}`;
    try {
      let response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      await setTimeout(async () => {
        const json = await response.json();
        this.processResults(json);
        this.loadingMore.classList.remove("is-loading");
      }, 1000);
    } catch (error) {
      console.error(error.message);
      this.loadingMore.classList.remove("is-loading");
    }
  }

  processResults(data) {
    console.log(data);
    this.clearListButton.classList.remove("hidden");
    if (data.results.length > 0) {
      this.resultsContainer.classList.add("is-shown");
    } else {
      this.resultsContainer.classList.remove("is-shown");
    }

    data.results.forEach((result) => {
      const resultsItem = document.createElement("div");
      resultsItem.classList.add("results__item");
      this.resultsList.appendChild(resultsItem);

      const resultsItemTitle = document.createElement("h3");
      resultsItemTitle.classList.add("results__item-title");
      resultsItemTitle.textContent = result.title;
      resultsItem.appendChild(resultsItemTitle);

      const resultsItemDescription = document.createElement("p");
      resultsItemDescription.classList.add("results__item-description");
      resultsItemDescription.textContent = result.description;
      resultsItem.appendChild(resultsItemDescription);

        //add youtube link

    const tubeLink = document.createElement("a");
    const tubeLogo = document.createElement("img");
    tubeLogo.src = "../images/youtube.png";
    tubeLogo.classList.add("results__tube-logo")
    tubeLink.classList.add("results__tube-link")
    tubeLink.textContent = "listen here";
    tubeLink.href = `https://www.youtube.com/results?search_query=${result.title}`;
    tubeLink.target = "_blank"
    resultsItem.appendChild(tubeLink);
    tubeLink.appendChild(tubeLogo);
    });

    
  }
}

// Expose an instance of the 'Ask' class
export default new Ask();
