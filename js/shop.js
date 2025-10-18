class Shop {
  constructor() {
    this.searchContainer = document.querySelector(".search");
    if (this.searchContainer) {
      this.searchInput = this.searchContainer.querySelector(".search__input");
      this.searchButton = this.searchContainer.querySelector(".search__submit");
      this.searchResultCount = this.searchContainer.querySelector(
        ".search__result-count"
      );
      this.searchSort = this.searchContainer.querySelector(".search__sort");
      this.searchPageSize =
        this.searchContainer.querySelector(".search__page-size");

      this.productsContainer = document.querySelector(".products");
      this.loading = this.productsContainer.querySelector(".search__loading");
      this.productsList =
        this.productsContainer.querySelector(".products__list");
      this.productsShowMore = this.productsContainer.querySelector(
        ".products__show-more"
      );

      this.defaultURL = new URL(
        "https://ai-project.technative.dev.f90.co.uk/products/askbeatz"
      );

      this.pageNumber = 1;
    }
  }

  init() {
    if (!this.searchContainer) return;
    this.searchButton.addEventListener("click", (e) => {
      this.clearProducts();
      this.search(e);
    });
    this.productsShowMore.addEventListener("click", (e) => {
      this.pageNumber++;
      this.search(e);
    });
    this.searchSort.addEventListener("change", (e) => {
      this.clearProducts();
      this.search(e);
    });
    this.searchPageSize.addEventListener("change", (e) => {
      this.clearProducts();
      this.search(e);
    });
    this.search();
  }

  async search(e) {
    if (e) e.preventDefault();

    this.productsShowMore.classList.remove("products__show-more--active");
    this.loading.classList.add("is-loading");
    this.searchResultCount.textContent = "Loading...";

    let searchURL = await this.buildSearchURL();

    try {
      const response = await fetch(searchURL);
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

  async buildSearchURL() {
    let searchURL = this.defaultURL;
    let searchParams = new URLSearchParams();

    searchParams.append("sort", this.searchSort.value);
    searchParams.append("page-size", this.searchPageSize.value);
    if (this.searchInput.value != "") {
      let query = encodeURIComponent(this.searchInput.value);
      searchParams.append("query", query);
    }
    if (this.pageNumber > 1) {
      searchParams.append("page", this.pageNumber);
    }

    searchURL.search = searchParams.toString();
    console.log("Search URL:", searchURL.toString());

    return searchURL;
  }

  clearProducts() {
    while (this.productsList.firstChild) {
      this.productsList.removeChild(this.productsList.lastChild);
    }
    this.pageNumber = 1;
  }

  processProducts(data) {
    const productsList = data.products;

    productsList.forEach((product) => {
      const productsItem = document.createElement("div");
      productsItem.classList.add("products__item");
      this.productsList.appendChild(productsItem);

      const productsItemImage = document.createElement("img");
      productsItemImage.classList.add("products__item-image");
      productsItemImage.src =
        "https://ai-project.technative.dev.f90.co.uk" + product.image;
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

    this.setProductsFound();
    this.setShowMoreStatus(data.products.length);
  }

  setProductsFound() {
    this.searchResultCount.textContent = `${
      this.productsList.querySelectorAll(".products__item").length
    } products found`;
  }

  setShowMoreStatus(items) {
    const noResults = document.createElement("p");
    noResults.classList.add("products__no-results");
    this.productsShowMore.classList.add("products__show-more--active");

    if (items == this.searchPageSize.value) {
      return;
    } else if (items == 0) {
      if (this.productsList.childElementCount === 0) {
        noResults.textContent = "No products found";
        this.productsContainer.appendChild(noResults);
      } else {
        noResults.textContent = "No more products found";
        this.productsContainer.appendChild(noResults);
      }
      this.productsShowMore.classList.remove("products__show-more--active");
    } else if (this.pageNumber > 1) {
      noResults.textContent = "No more products found";
      this.productsContainer.appendChild(noResults);
      this.productsShowMore.classList.remove("products__show-more--active");
    } else {
      this.productsShowMore.classList.remove("products__show-more--active");
      return;
    }
  }
}

// Expose an instance of the 'Shop' class
export default new Shop();
