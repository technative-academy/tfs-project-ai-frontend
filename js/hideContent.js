class HideContent {
    constructor(contentWrapper, showMoreWrapper, maxElementsOnPage = 6) {
        this.contentWrapper = contentWrapper
        this.showMoreWrapper = showMoreWrapper
        this.maxElementsOnPage = maxElementsOnPage
    }

    hideContent(event = null) {
        if (this.contentWrapper.childElementCount > this.maxElementsOnPage) {
            Array.from(this.contentWrapper.children).forEach((child, index) => {
                if (index >= 6) {
                    child.classList.add('products__hidden-item')
                }
            })

            if (event == null) {
                const showMoreButton = document.createElement('button')
                showMoreButton.textContent = 'Show more'
                showMoreButton.classList.add('button')
                showMoreButton.classList.add('button--primary')
                showMoreButton.addEventListener('click', (event) =>
                    this.showContent(event)
                )
                this.showMoreWrapper.appendChild(showMoreButton)
            } else {
                event.currentTarget.classList.remove('hidden__content')
                event.currentTarget.textContent = 'Show more'
                event.currentTarget.addEventListener('click', (event) =>
                    this.showContent(event)
                )
            }
        }
    }

    showContent(event) {
        const showMoreButton = event.currentTarget
        console.log(this.contentWrapper.children)
        Array.from(this.contentWrapper.children).forEach((element) => {
            element.classList.remove('products__hidden-item')
        })
        showMoreButton.textContent = 'Show less'
        showMoreButton.addEventListener('click', (event) =>
            this.hideContent(event)
        )
    }
}
export default HideContent
