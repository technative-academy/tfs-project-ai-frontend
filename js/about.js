const tabButtonElements = document.querySelectorAll(".tab-button");

tabButtonElements.forEach(button => {
    button.addEventListener("click", tabButtonClick);
});

function tabButtonClick(event) {
    const clickedButton = event.currentTarget;

    // generate the class of the selected tab's details element
    // for example: ".tab-details-Venus" or ".tab-details-Earth"
    // const detailsElementCssSelector = ".tab-details-" + clickedButton.textContent;
    const target = clickedButton.getAttribute('data-target');
    const detailsElementCssSelector = ".tab-details-" + target;

    // find this element
    const detailsElement = document.querySelector(detailsElementCssSelector);

    // remove selected state from all buttons
    tabButtonElements.forEach(updateClickedButtonState);

    // remove selected state from all details elements
    const tabDetailElements = document.querySelectorAll(".tab-details");
    tabDetailElements.forEach(updatetabDetailState);

    // add selected state just to the clicked button
    detailsElement.classList.add("currently-selected-tab");
    clickedButton.classList.add("currently-selected-button");
}

function updateClickedButtonState(tabButtonElement) {
    tabButtonElement.classList.remove("currently-selected-button");
}

function updatetabDetailState(tabDetailElement) {
    tabDetailElement.classList.remove("currently-selected-tab");
}

