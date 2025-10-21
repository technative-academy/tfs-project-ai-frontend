class HideContent {
    constructor(contentWrapper, showMoreWrapper, maxElementsOnPage = 6) {
        this.contentWrapper = contentWrapper
        this.showMoreWrapper = showMoreWrapper
        this.maxElementsOnPage = maxElementsOnPage
        this.allShown = true

        this.showContent = this.showContent.bind(this)
        this.hideContent = this.hideContent.bind(this)
        this.switchButton = this.switchButton.bind(this)
    }

    hideContent() {
        Array.from(this.contentWrapper.children).forEach((child, index) => {
            if (index >= 6) {
                child.classList.add('products__hidden-item')
            }
        })
        this.allShown = false
    }

    showContent() {
        Array.from(this.contentWrapper.children).forEach((element) => {
            element.classList.remove('products__hidden-item')
        })
        this.allShown = true
    }

    switchButton(e) {
        const button = e.currentTarget
        if (button.textContent == 'Show more') {
            button.textContent = 'Show less'
            this.showContent()
        } else if (button.textContent == 'Show less') {
            button.textContent = 'Show more'
            this.hideContent()
        }
    }

    createButton() {
        if (
            this.contentWrapper.childElementCount > this.maxElementsOnPage &&
            this.showMoreWrapper.childElementCount == 0
        ) {
            this.hideContent()
            const showMoreButton = document.createElement('button')
            showMoreButton.textContent = 'Show more'
            showMoreButton.classList.add('button')
            showMoreButton.classList.add('button--primary')
            showMoreButton.addEventListener('click', this.showContent)
            showMoreButton.addEventListener('click', (event) =>
                this.switchButton(event)
            )
            this.showMoreWrapper.appendChild(showMoreButton)
        } else if (
            this.contentWrapper.childElementCount > this.maxElementsOnPage
        ) {
            this.allShown ? this.showContent() : this.hideContent()
        }
    }
}
export default HideContent
