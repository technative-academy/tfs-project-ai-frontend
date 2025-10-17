import HideContent from './hideContent.js'
import hideContent from './hideContent.js'

class Shop {
    constructor() {
        this.searchContainer = document.querySelector('.search')
        if (this.searchContainer) {
            this.sortSelect =
                this.searchContainer.querySelector('.search__sort')
            this.searchInput =
                this.searchContainer.querySelector('.search__input')
            this.searchButton =
                this.searchContainer.querySelector('.search__submit')
            this.searchResultCount = this.searchContainer.querySelector(
                '.search__result-count'
            )
            this.loading =
                this.searchContainer.querySelector('.search__loading')

            this.productsContainer = document.querySelector('.products')
            this.productsList =
                this.productsContainer.querySelector('.products__list')
            this.productsShowMore = document.querySelector(
                '.products__show-more'
            )
            this.hideContentManager = new HideContent(
                this.productsList,
                this.productsShowMore
            )
        }
    }

    init() {
        if (!this.searchContainer) return
        this.searchInput.addEventListener('input', (e) => this.checkInput(e))
        this.searchButton.addEventListener('click', (e) => this.search(e))
        this.sortSelect.addEventListener('change', () => this.sortProducts())
        this.checkInput()
        this.search()
    }

    checkInput() {
        this.searchButton.disabled = this.searchInput.value.length === 0
    }

    async search(e) {
        if (e) e.preventDefault()

        this.loading.classList.add('is-loading')
        this.productsContainer.classList.remove('is-shown')
        this.searchResultCount.textContent = ''

        while (this.productsList.firstChild) {
            this.productsList.removeChild(this.productsList.lastChild)
        }

        const url =
            'https://ai-project.technative.dev.f90.co.uk/products/novelforest/'
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            const json = await response.json()
            this.allProducts = json.products
            console.log('Products fetched:', this.allProducts)

            setTimeout(() => {
                this.processProducts(this.allProducts)
                this.loading.classList.remove('is-loading')
            }, 1000)
        } catch (error) {
            console.error(error.message)
            this.loading.classList.remove('is-loading')
        }
    }

    processProducts(data, skipFilter = false) {
        const searchTerm = this.searchInput.value.toLowerCase()
        const filteredProducts = skipFilter
            ? data
            : data.filter(
                  (product) =>
                      product.title.toLowerCase().includes(searchTerm) ||
                      product.description.toLowerCase().includes(searchTerm)
              )

        this.searchResultCount.textContent = `${filteredProducts.length} products found`

        if (filteredProducts.length > 0) {
            this.productsContainer.classList.add('is-shown')
        } else {
            this.productsContainer.classList.remove('is-shown')
        }

        while (this.productsList.firstChild) {
            this.productsList.removeChild(this.productsList.lastChild)
        }

        filteredProducts.forEach((product) => {
            const productsItem = document.createElement('div')
            productsItem.classList.add('products__item')
            this.productsList.appendChild(productsItem)

            const productsItemImage = document.createElement('img')
            productsItemImage.classList.add('products__item-image')
            productsItemImage.src = product.image
            productsItem.appendChild(productsItemImage)

            const productsItemTitle = document.createElement('h3')
            productsItemTitle.classList.add('products__item-title')
            productsItemTitle.textContent = product.title
            productsItem.appendChild(productsItemTitle)

            const productsItemDescription = document.createElement('p')
            productsItemDescription.classList.add('products__item-description')
            productsItemDescription.textContent = product.description
            productsItem.appendChild(productsItemDescription)

            const productsItemStars = document.createElement('p')
            productsItemStars.classList.add('products__item-stars')
            productsItemStars.textContent = '⭐'.repeat(product.stars)
            productsItem.appendChild(productsItemStars)

            const productsItemPrice = document.createElement('p')
            productsItemPrice.classList.add('products__item-price')
            productsItemPrice.textContent = product.price
            productsItem.appendChild(productsItemPrice)
        })
        this.hideContentManager.hideContent()
    }

    sortProducts() {
        console.log('Sort triggered:', this.sortSelect.value)
        console.log('Products before sort:', this.allProducts)

        const sortValue = this.sortSelect.value

        if (sortValue === 'lowToHigh') {
            this.allProducts.sort((a, b) => a.price - b.price)
        } else if (sortValue === 'highToLow') {
            this.allProducts.sort((a, b) => b.price - a.price)
        } else if (sortValue === 'alphabeticalOrder') {
            this.allProducts.sort((a, b) => {
                return a.title.localeCompare(b.title)
            })
        }
        this.processProducts(this.allProducts, true)
    }
}

// Expose an instance of the 'Shop' class
export default new Shop()
