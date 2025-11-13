class Ask {
  maxLength = 160;

  constructor() {
    this.askContainer = document.querySelector(".ask");
    if (this.askContainer) {
      this.askInput = this.askContainer.querySelector(".ask__input");
      this.exampleButton = this.askContainer.querySelector(".ask__button-example");
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
    const charsRemaining = this.maxLength - this.askInput.value.length;
    if (charsRemaining < 0) {
      this.askButton.disabled = true;
      this.charCounter.classList.add("has-error");
    } else {
      this.askButton.disabled = false;
      this.charCounter.classList.remove("has-error");
    }
    this.charCounter.textContent = `${charsRemaining} characters remaining`;

    if (this.askInput.value.length === 0) {
      this.askButton.disabled = true;
      this.exampleButton.classList.remove("is-hidden");
    } else {
      this.exampleButton.classList.add("is-hidden");
    }
  }

  setExample(event) {
    event.preventDefault();
    this.askInput.value = "Chocolate cake";
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

    const query = this.askInput.value.trim();
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      this.processResults(json.meals || []);
      this.loading.classList.remove("is-loading");
    } catch (error) {
      console.error(error.message);
      this.loading.classList.remove("is-loading");
    }
  }

  processResults(meals) {
    this.resultsList.innerHTML = ""; // clear old results

    if (meals.length > 0) {
      this.resultsContainer.classList.add("is-shown");
    } else {
      this.resultsContainer.classList.remove("is-shown");
      this.resultsList.innerHTML = "<p>No recipes found. Try another cake name!</p>";
      return;
    }

    meals.forEach((meal) => {
      const resultsItem = document.createElement("div");
      resultsItem.classList.add("results__item");

      resultsItem.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h3 class="results__item-title">${meal.strMeal}</h3>
        <p class="results__item-description"><strong>Category:</strong> ${meal.strCategory}</p>
        <p class="results__item-description"><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 120)}...</p>
      `;

      this.resultsList.appendChild(resultsItem);
    });
  }
}

// Expose an instance of the 'Ask' class
const askInstance = new Ask();
askInstance.init();

// Separate search button for cakes
document.getElementById("searchBtn").addEventListener("click", getRecipes);

async function getRecipes() {
  const query = document.getElementById("cakeInput").value.trim();
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "<p>Loading recipes...</p>";

  try {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query)}`);
    const data = await response.json();

    recipesContainer.innerHTML = "";

    if (data.meals) {
      data.meals.forEach(meal => {
        const card = document.createElement("div");
        card.className = "recipe-card";

        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p><strong>Category:</strong> ${meal.strCategory}</p>
          <p><strong>Instructions:</strong> ${meal.strInstructions.substring(0, 120)}...</p>
        `;

        recipesContainer.appendChild(card);
      });
    } else {
      recipesContainer.innerHTML = "<p>No recipes found. Try another cake name!</p>";
    }
  } catch (error) {
    recipesContainer.innerHTML = "<p>Something went wrong. Please try again later.</p>";
    console.error(error);
  }
}
