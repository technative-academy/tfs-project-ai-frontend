function burgerMenu() {
    const hamburger = document.querySelector('.header__hamburger')
    const navBar = document.querySelector('.header__nav')

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active')
        navBar.classList.toggle('active')
    })

    document.querySelectorAll('.header__nav .header__link').forEach((n) =>
        n.addEventListener('click', () => {
            hamburger.classList.remove('active')
            navBar.classList.remove('active')
        })
    )
}

export default burgerMenu