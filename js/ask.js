import Spotify from "./spotify.js";

console.log(Spotify.search('hello'))

class Ask {
  maxLength = 160;

    constructor() {
        this.askContainer = document.querySelector('.ask')
        if (this.askContainer) {
            this.askInput = this.askContainer.querySelector('.ask__input')
            this.exampleButton = this.askContainer.querySelector(
                '.ask__button-example'
            )
            this.askButton = this.askContainer.querySelector('.ask__button-ask')
            this.resetButton =
                this.askContainer.querySelector('.ask__button-reset')
            this.charCounter =
                this.askContainer.querySelector('.ask__char-count')
            this.loading = this.askContainer.querySelector('.ask__loading')
            this.resultsContainer = document.querySelector('.results')
            this.showMoreButton = this.resultsContainer.querySelector(
            '.button.button--primary'
        )
            this.loadingMore = this.resultsContainer.querySelector('.loading__more')
            this.clearListButton = this.resultsContainer.querySelector('.clear__button')
            this.resultsList =
                this.resultsContainer.querySelector('.results__list')
        }
    }
  

  init() {
    if (!this.askContainer) return;
    this.askInput.addEventListener("input", (e) => this.checkInput(e));
    this.exampleButton.addEventListener("click", (e) => this.setExample(e));
    this.askButton.addEventListener("click", (e) => this.askClicked(e));
    this.resetButton.addEventListener("click", (e) => this.resetClicked(e));
    this.checkInput();
    this.showMoreButton.addEventListener("click", (e) => this.showMore(e));
    this.clearListButton.addEventListener("click", (e) => this.resetResults(e));
    this.askButton.addEventListener("click", (e) => this.resetResults(e))
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
    setExample(event) {
        event.preventDefault()
        console.log('setting example')
        this.askInput.value =
            'Full of energy, bouncing off the walls'
        this.checkInput()
    }
  

    //reset results on search button click

    resetResults() {
        this.resultsContainer.classList.remove('is-shown');
        this.clearListButton.classList.add('hidden');
    }

    resetClicked(event) {
        event.preventDefault()
        this.askInput.value = ''
        this.checkInput()
    }

    async askClicked() {
        this.resetResults()
        this.loading.classList.add('is-loading')
        let url = `https://ai-project.technative.dev.f90.co.uk/ai/askbeatz/?query=${this.askInput.value}`
        try {
            const response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            await setTimeout(async () => {
                const json = await response.json()
                this.processResults(json)
                this.loading.classList.remove('is-loading')
            }, 1000)
        } catch (error) {
            console.error(error.message)
            this.loading.classList.remove('is-loading')
        }
    }
  

    //function to make show more call

    async showMore() {
        this.loadingMore.classList.add('is-loading')
        let url = `https://ai-project.technative.dev.f90.co.uk/ai/askbeatz/?query=${this.askInput.value}`
        try {
            let response = await fetch(url)
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`)
            }

            await setTimeout(async () => {
                const json = await response.json()
                this.processResults(json)
                this.loadingMore.classList.remove('is-loading')
            }, 1000)
        } catch (error) {
            console.error(error.message)
            this.loadingMore.classList.remove('is-loading')
        
            
        }
    

    }

    processResults(data) {
        console.log(data)
        this.clearListButton.classList.remove('hidden')
        if (data.results.length > 0) {
            this.resultsContainer.classList.add('is-shown')
        } else {
            this.resultsContainer.classList.remove('is-shown')
        }

        data.results.forEach((result) => {
            const resultsItem = document.createElement('div')
            resultsItem.classList.add('results__item')
            this.resultsList.appendChild(resultsItem)
            

      const resultsItemTitle = document.createElement("h3");
      resultsItemTitle.classList.add("results__item-title");
      resultsItemTitle.textContent = result.title;
      resultsItem.appendChild(resultsItemTitle);

      const resultsItemDescription = document.createElement("p");
      resultsItemDescription.classList.add("results__item-description");
      resultsItemDescription.textContent = result.description;
      resultsItem.appendChild(resultsItemDescription);
    });
  }
}


// Expose an instance of the 'Ask' class
export default new Ask();
