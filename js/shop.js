class Shop {
  constructor() {
    this.searchContainer = document.querySelector(".search");
    if (this.searchContainer) {
      this.searchInput = this.searchContainer.querySelector(".search__input");
      this.searchButton = this.searchContainer.querySelector(".search__submit");
      this.searchResultCount = this.searchContainer.querySelector(
        ".search__result-count"
      );
      this.loading = this.searchContainer.querySelector(".search__loading");
      this.searchSort = this.searchContainer.querySelector(".search__sort"); //added the search sort

      this.productsContainer = document.querySelector(".products");
      this.productsList =
        this.productsContainer.querySelector(".products__list");

      this.showMoreButton = this.productsContainer.querySelector(".products__show-more-button");

      this.page = 0;
      this.productCount = 0;
    }
  }

  init() {
    if (!this.searchContainer) return;
    this.searchInput.addEventListener("input", (e) => this.checkInput(e));
    this.searchButton.addEventListener("click", (e) => {
      if (e) e.preventDefault();
      this.search();
    });
    this.showMoreButton.addEventListener("click", (_e) => {
      this.search(this.page + 1);
    });

    this.checkInput();
    this.search();
  }

  checkInput() {
    this.searchButton.disabled = this.searchInput.value.length === 0;
  }

  async search(page) {
    this.page = (page ?? 1);

    this.loading.classList.add("is-loading");

    // "New request" pathway.
    // We don't want to hide the entries if the user clicks "show more".
    if (this.page == 1) {
      this.productsContainer.classList.remove("is-shown");
      this.searchResultCount.textContent = "";
      this.showMoreButton.disabled = false;
      this.productCount = 0;

      // Only remove products if making a new request.
      while (this.productsList.firstChild) {
        this.productsList.removeChild(this.productsList.lastChild);
      }
    }

    const url =
      `https://ai-project.technative.dev.f90.co.uk/products/sandwich?page-size=6&page=${this.page}&sort=${this.searchSort.value ?? "title"}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      this.processProducts(json.products);
      this.loading.classList.remove("is-loading");

    } catch (error) {
      console.error(error.message);
      this.loading.classList.remove("is-loading");
    }
  }

  processProducts(data) {
    const searchTerm = this.searchInput.value.toLowerCase();
    const filteredProducts = data.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    if (filteredProducts.length == 0)  {
      // Disable the show more button
      this.showMoreButton.disabled = true;
      return;
    }

    this.productCount += filteredProducts.length;
    if (this.productCount == 1) {
      this.searchResultCount.textContent = `${this.productCount} product found`;
    } else {
      this.searchResultCount.textContent = `${this.productCount} products found`;
    }

    if (filteredProducts.length > 0) {
      this.productsContainer.classList.add("is-shown");
    } else {
      this.productsContainer.classList.remove("is-shown");
    }

    filteredProducts.forEach((product) => {
      const productsItem = document.createElement("div");
      productsItem.classList.add("products__item");
      this.productsList.appendChild(productsItem);

      const productsItemImage = document.createElement("img");
      productsItemImage.classList.add("products__item-image");
      productsItemImage.src = `https://ai-project.technative.dev.f90.co.uk${product.image}`;
      productsItemImage.alt = product.title;
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
}

// Expose an instance of the 'Shop' class
export default new Shop();
