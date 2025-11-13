class Ask {
  maxLength = 160;

  constructor() {
    this.askContainer = document.querySelector(".ask");
    if (this.askContainer) {
      this.askInput = this.askContainer.querySelector(".ask__input");
      this.exampleButton = this.askContainer.querySelector(
        ".ask__button-example"
      );
      this.askButton = this.askContainer.querySelector(".ask__button-ask");
      this.resetButton = this.askContainer.querySelector(".ask__button-reset");
      this.charCounter = this.askContainer.querySelector(".ask__char-count");
      this.loading = this.askContainer.querySelector(".ask__loading");

      this.resultsContainer = document.querySelector(".results");
      this.resultsList = this.resultsContainer.querySelector(".results__list");
    }
  }

  init() {
    if (!this.askContainer) return;
    this.askInput.addEventListener("input", (e) => this.checkInput(e));
    this.exampleButton.addEventListener("click", (e) => this.setExample(e));
    this.askButton.addEventListener("click", (e) => this.askClicked(e));
    this.resetButton.addEventListener("click", (e) => this.resetClicked(e));
    this.checkInput();
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

    // check whether to display example button
    if (this.askInput.value.length === 0) {
      this.askButton.disabled = true;
      this.exampleButton.classList.remove("is-hidden");
    } else {
      this.exampleButton.classList.add("is-hidden");
    }
  }

  setExample(event) {
    event.preventDefault();
    console.log("setting example");
    this.askInput.value =
      "Tell me about some of the best things I could see with a telescope from Brighton (assuming it ever stops raining)";
    this.checkInput();
  }

  resetClicked(event) {
    event.preventDefault();
    this.askInput.value = "";
    this.checkInput();
  }

  async askClicked(event) {
    event.preventDefault();
    this.loading.classList.add("is-loading");
    //Get user input
    const userInput = this.askInput.value.trim();
    if (!userInput) {
      alert("Please enter three words first!");
      this.loading.classList.remove("is-loading");
      return;
    }
    console.log("User asked: " + userInput);
    // ---------- ADD IMAGE FETCH HERE ----------
    try {
      const imgRes = await fetch("http://localhost:3000/api/images");
      const imgData = await imgRes.json();

      const imgContainer = this.resultsContainer.querySelector(".results__images");
      imgContainer.innerHTML = ""; // clear previous image

      const img = document.createElement("img");
      img.src = imgData.imageUrl;
      img.alt = "Black and white artistic photo";
      imgContainer.appendChild(img);

      const caption = document.createElement("p");
      caption.textContent = `Photo by ${imgData.photographer}`;
      imgContainer.appendChild(caption);
    } catch (imgError) {
      console.error("Failed to fetch image:", imgError);
    }
    // ---------- IMAGE FETCH END ----------

    //Create AI prompt from user input
    const prompt = `Based on the words "${userInput}", describe the user's personality type in a fun and insightful way.`;
    
    //Encode prompt for URL
    const query = encodeURIComponent(prompt);

    //This is where we fetch our data!!
    const url = `https://ai-project.technative.dev.f90.co.uk/ai/visisoul/?query=${query}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      // fake a one second wait, use the two lines below for an instant response
      // const json = await response.json();
      // this.processResults(json);

      //Sleep helper function
      const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

      const json = await response.json();
      await sleep(1000);
      this.processResults(json);
      this.loading.classList.remove("is-loading");
      
    } catch (error) {
      console.error(error.message);
      this.loading.classList.remove("is-loading");
    }
  }

  processResults(data) {
    if (data.length > 0) {
      this.resultsContainer.classList.add("is-shown");
    } else {
      this.resultsContainer.classList.remove("is-shown");
    }
    
    console.log(data);

    this.resultsList.innerHTML = "";

    data.results.forEach((result) => {
      const resultsItem = document.createElement("div");
      resultsItem.classList.add("results__item");
      
      const resultsItemTitle = document.createElement("h3");
      resultsItemTitle.classList.add("results__item-title");
      resultsItemTitle.textContent = result.title;

      const resultsItemDescription = document.createElement("p");
      resultsItemDescription.classList.add("results__item-description");
      resultsItemDescription.textContent = result.description;
      
      resultsItem.appendChild(resultsItemTitle);
      resultsItem.appendChild(resultsItemDescription);

      this.resultsList.appendChild(resultsItem);

      console.log(this.resultsList);
    });
  }
}


// Expose an instance of the 'Ask' class
export default new Ask();
