import ask from './ask.js'
import shop from './shop.js'

ask.init()
shop.init()

// Hamburger-menu toggle
const hamMenu = document.querySelector('.ham-menu')
const offScreenMenu = document.querySelector('.off-screen-menu')

hamMenu.addEventListener('click', () => {
    hamMenu.classList.toggle('active')
    offScreenMenu.classList.toggle('active')
})
