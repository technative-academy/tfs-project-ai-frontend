class Shop {
  constructor() {
    this.searchContainer = document.querySelector(".search");
    this.imageBaseUrl = "https://ai-project.technative.dev.f90.co.uk/";
    this.numItemsToShow = 6;
    if (this.searchContainer) {
      this.searchInput = this.searchContainer.querySelector(".search__input");
      // this.searchButton = this.searchContainer.querySelector(".search__submit");
      this.showMoreButton =
        this.searchContainer.querySelector(".search__showmore");
      this.searchResultCount = this.searchContainer.querySelector(
        ".search__result-count"
      );
      this.loading = this.searchContainer.querySelector(".search__loading");

      this.productsContainer = document.querySelector(".products");
      this.showMoreButton =
        this.productsContainer.querySelector(".search__showmore");
      this.productsList =
        this.productsContainer.querySelector(".products__list");
      // this.filteredProducts = [];
    }
  }

  init() {
    if (!this.searchContainer) return;
    // this.searchInput.addEventListener("input", (e) => this.checkInput(e));
    this.searchInput.addEventListener("input", (e) => this.search(e));
    console.log(this.showMoreButton);
    this.showMoreButton.addEventListener("click", (e) => this.showMore());
    this.checkInput();
    this.search();
  }

  checkInput() {
    // this.searchButton.disabled = this.searchInput.value.length === 0;
  }

  async search(e) {
    if (e) e.preventDefault();

    this.loading.classList.add("is-loading");
    this.productsContainer.classList.remove("is-shown");
    this.searchResultCount.textContent = "";

    while (this.productsList.firstChild) {
      this.productsList.removeChild(this.productsList.lastChild);
    }

    // const url = "../js/fake-products.json";
    const url =
      "https://ai-project.technative.dev.f90.co.uk/products/ai-destroyer/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      this.processProducts(json.products);
      this.loading.classList.remove("is-loading");

      // await setTimeout(async () => {
      //   const json = await response.json();
      //   this.processProducts(json.products);
      //   this.loading.classList.remove("is-loading");
      // }, 100);
    } catch (error) {
      console.error(error.message);
      this.loading.classList.remove("is-loading");
    }
  }

  processProducts(data) {
    const searchTerm = this.searchInput.value.toLowerCase();

    this.filteredProducts = data.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    this.searchResultCount.textContent = `${this.filteredProducts.length} products found`;

    if (this.filteredProducts.length > 0) {
      this.productsContainer.classList.add("is-shown");
    } else {
      this.productsContainer.classList.remove("is-shown");
    }

    this.filteredProducts.slice(0, this.numItemsToShow).forEach((product) => {
      const productsItem = document.createElement("div");
      productsItem.classList.add("products__item");
      this.productsList.appendChild(productsItem);

      const productsItemImage = document.createElement("img");
      productsItemImage.classList.add("products__item-image");
      productsItemImage.src = this.imageBaseUrl + product.image;
      productsItem.appendChild(productsItemImage);

      const productsItemTitle = document.createElement("h3");
      productsItemTitle.classList.add("products__item-title");
      productsItemTitle.textContent = product.title;
      productsItem.appendChild(productsItemTitle);

      const productsItemDescription = document.createElement("p");
      productsItemDescription.classList.add("products__item-description");
      productsItemDescription.textContent = product.description;
      productsItem.appendChild(productsItemDescription);

      const productsItemStars = document.createElement("p");
      productsItemStars.classList.add("products__item-stars");
      productsItemStars.textContent = "⭐".repeat(product.stars);
      productsItem.appendChild(productsItemStars);

      const productsItemPrice = document.createElement("p");
      productsItemPrice.classList.add("products__item-price");
      productsItemPrice.textContent = product.price;
      productsItem.appendChild(productsItemPrice);
    });
  }

  showMore() {
    // guard: nothing to show
    if (!this.filteredProducts || this.filteredProducts.length === 0) return;

    const numItemsShowing = this.numItemsToShow;
    this.numItemsToShow += 6;

    // add the next batch of items to the list
    this.filteredProducts
      .slice(numItemsShowing, this.numItemsToShow)
      .forEach((product) => {
        const productsItem = document.createElement("div");
        productsItem.classList.add("products__item");
        this.productsList.appendChild(productsItem);

        const productsItemImage = document.createElement("img");
        productsItemImage.classList.add("products__item-image");
        productsItemImage.src = this.imageBaseUrl + product.image;
        productsItem.appendChild(productsItemImage);

        const productsItemTitle = document.createElement("h3");
        productsItemTitle.classList.add("products__item-title");
        productsItemTitle.textContent = product.title;
        productsItem.appendChild(productsItemTitle);

        const productsItemDescription = document.createElement("p");
        productsItemDescription.classList.add("products__item-description");
        productsItemDescription.textContent = product.description;
        productsItem.appendChild(productsItemDescription);

        const productsItemStars = document.createElement("p");
        productsItemStars.classList.add("products__item-stars");
        productsItemStars.textContent = "⭐".repeat(product.stars);
        productsItem.appendChild(productsItemStars);

        const productsItemPrice = document.createElement("p");
        productsItemPrice.classList.add("products__item-price");
        productsItemPrice.textContent = product.price;
        productsItem.appendChild(productsItemPrice);
      });

    // hide the show more button if we've displayed all products
    if (
      this.showMoreButton &&
      this.numItemsToShow >= this.filteredProducts.length
    ) {
      this.showMoreButton.style.display = "none";
    }
  }
}

// Expose an instance of the 'Shop' class
export default new Shop();
