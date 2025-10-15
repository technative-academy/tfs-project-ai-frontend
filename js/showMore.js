import ask from './ask.js'

function showMore() {
    const showMoreButton = document.querySelector('.button button--primary');
    showMoreButton.addEventListener('click', (event) => {
        ask.processResults(event)
    })
}

export default showMore;