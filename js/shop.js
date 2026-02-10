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

      this.productsContainer = document.querySelector(".products");
      this.productsList =
        this.productsContainer.querySelector(".products__list");

      this.showMoreButton = this.productsContainer.querySelector(".products__show-more .button");        

      this.allFilteredProducts = [];
      this.currentlyDisplayedCount = 0;
      this.productsPerLoad = 6;
      
      }
  }

  init() {
    if (!this.searchContainer) return;
    this.searchInput.addEventListener("input", (e) => this.checkInput(e));
    this.searchButton.addEventListener("click", (e) => this.search(e));

    if (this.showMoreButton) {
      this.showMoreButton.addEventListener("click", () => this.showMoreProducts());
    }

    this.checkInput();
    this.search();
  }

  checkInput() {
    this.searchButton.disabled = this.searchInput.value.length === 0;
  }

  async search(e) {
    if (e) e.preventDefault();

    this.loading.classList.add("is-loading");
    this.productsContainer.classList.remove("is-shown");
    this.searchResultCount.textContent = "";

    this.allFilteredProducts = [];
    this.currentlyDisplayedCount = 0;

    if (this.showMoreButton) {
      this.showMoreButton.parentElement.style.display = 'none';
    }
    
    while (this.productsList.firstChild) {
      this.productsList.removeChild(this.productsList.lastChild);
    }

    const url =
      "https://ai-project.technative.dev.f90.co.uk/products/video-games/";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      await setTimeout(async () => {
        const json = await response.json();
        this.processProducts(json);
        this.loading.classList.remove("is-loading");
      }, 1000);
    } catch (error) {
      console.error(error.message);
      this.loading.classList.remove("is-loading");
    }
  }

  processProducts(data) {
    const searchTerm = this.searchInput.value.toLowerCase();

    console.log(data);
    // const filteredProducts = data.products.filter(
    let filteredProducts = data.products.filter(
      (product) =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );

    this.searchResultCount.textContent = `${filteredProducts.length} products found`;

    // filteredProducts = filteredProducts.slice(0, 6);

    this.allFilteredProducts = filteredProducts;
    this.currentlyDisplayedCount = 0;
    this.displayNextProducts();

    if (filteredProducts.length > 0) {
      this.productsContainer.classList.add("is-shown");
    } else {
      this.productsContainer.classList.remove("is-shown");
    }

    // filteredProducts.forEach((product) => {
    //   const productsItem = document.createElement("div");
    //   productsItem.classList.add("products__item");
    //   this.productsList.appendChild(productsItem);

    //   const productsItemImage = document.createElement("img");
    //   productsItemImage.classList.add("products__item-image");

    //   const baseUrl = "https://ai-project.technative.dev.f90.co.uk";
    //   // productsItemImage.src = product.img;
    //   productsItemImage.src = baseUrl + product.image;
    //   productsItem.appendChild(productsItemImage);

    //   const productsItemTitle = document.createElement("h3");
    //   productsItemTitle.classList.add("products__item-title");
    //   productsItemTitle.textContent = product.title;
    //   productsItem.appendChild(productsItemTitle);

    //   const productsItemDescription = document.createElement("p");
    //   productsItemDescription.classList.add("products__item-description");
    //   productsItemDescription.textContent = product.description;
    //   productsItem.appendChild(productsItemDescription);

    //   const productsItemStars = document.createElement("p");
    //   productsItemStars.classList.add("products__item-stars");
    //   productsItemStars.textContent = "⭐".repeat(product.stars);
    //   productsItem.appendChild(productsItemStars);

    //   const productsItemPrice = document.createElement("p");
    //   productsItemPrice.classList.add("products__item-price");
    //   productsItemPrice.textContent = "£" + product.price;
    //   productsItem.appendChild(productsItemPrice);
    // });

  }
// }


displayNextProducts() {
  // Calculate how many products to show
  const nextBatch = this.allFilteredProducts.slice(
    this.currentlyDisplayedCount,
    this.currentlyDisplayedCount + this.productsPerLoad
  );

  nextBatch.forEach((product) => {
    const productsItem = document.createElement("div");
    productsItem.classList.add("products__item");
    this.productsList.appendChild(productsItem);

    const productsItemImage = document.createElement("img");
    productsItemImage.classList.add("products__item-image");

    const baseUrl = "https://ai-project.technative.dev.f90.co.uk";
    productsItemImage.src = baseUrl + product.image;
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
    productsItemPrice.textContent = "£" + product.price;
    productsItem.appendChild(productsItemPrice);
  });

  this.currentlyDisplayedCount += nextBatch.length;

  if (this.showMoreButton) {
    if (this.currentlyDisplayedCount < this.allFilteredProducts.length) {
      this.showMoreButton.parentElement.style.display = 'block';
      
      const remaining = this.allFilteredProducts.length - this.currentlyDisplayedCount;
      this.showMoreButton.textContent = `Show ${Math.min(this.productsPerLoad, remaining)} more`;
    } else {
      this.showMoreButton.parentElement.style.display = 'none';
    }
  }
  }

  showMoreProducts() {
    this.displayNextProducts();
  }
}


// Expose an instance of the 'Shop' class
export default new Shop();
