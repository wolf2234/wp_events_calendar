/**
 * Adds a custom select instead of the base one.
 */
function addCustomSelect() {
    // Get all selects.
    let selectBlocks = document.querySelectorAll("select[data-custom-select]");
    // Create a class of custom select.
    const className = "select-custom";
    // Go through a loop for each of select.
    selectBlocks.forEach(function (selectBlock) {
        // Create and add a custom select.
        createSelect(selectBlock, className);
    });
}

/**
 * Create and add a custom select.
 * @param {object} selectBlock
 * @param {string} className
 */
function createSelect(selectBlock, className) {
    // Create div elments for a custom select.
    let selectCustom = createDiv(className);
    let selectBody = createDiv(`${className}__body`);
    let selectIcon = createDiv(`${className}__icon`);
    let selectValue = createDiv(`${className}__value`, getValue(selectBlock));
    let selectItems = createSelectItems(selectBlock, className);
    // let element = document.createElement("div");
    // element.className = `${className}__value`;
    // element.innerText = getValue(selectBlock);
    // selectValue = element;
    // console.log(selectValue);

    // Collection div elements in a specific order.
    const blocks = {
        0: [selectBody, "afterbegin", selectValue],
        1: [selectBody, "beforeend", selectIcon],
        2: [selectCustom, "afterbegin", selectBody],
        3: [selectCustom, "beforeend", selectItems],
        4: [selectBlock, "afterend", selectCustom],
    };

    appendElements(blocks);

    // Hide base select
    selectBlock.style.display = "none";

    addActive(selectCustom);
    putValue(selectCustom, className);
    changeSelectValue(selectBlock, selectCustom, className);
}

/**
 * Create div element.
 * @param {string} className
 * @param {object} value
 */
function createDiv(className, value = null) {
    // Create div element with a className.
    let element = document.createElement("div");
    element.className = className;

    // Set selected value for element with class: select-custom__value.
    if (value) {
        element.innerText = value;
    }
    return element;
}

function getValue(select) {
    let value;
    for (let option of select.options) {
        if (option.hasAttribute("selected")) {
            value = option.innerHTML;
        }
    }
    return value;
}

/**
 * Сhange value in base select.
 * @param {object} selectOrigin
 * @param {object} selectCustom
 * @param {string} className
 */
function changeSelectValue(selectOrigin, selectCustom, className) {
    selectCustom.addEventListener("click", function () {
        let selectValue = selectCustom.querySelector(`.${className}__value`);
        let selectBlock = removeSelectedOptions(selectOrigin);
        for (let option of selectBlock.options) {
            if (selectValue.innerText == option.textContent) {
                console.log(option.textContent);
                option.setAttribute("selected", "");
            }
        }
    });
}

/**
 * Remove value in base select.
 * @param {object} select
 */
function removeSelectedOptions(select) {
    // Go through a loop for each of <option> elements of base <select>.
    // And remove attribute 'selected' from all <option> elements of base <select>.
    for (let option of select.options) {
        option.removeAttribute("selected");
    }
    return select;
}

/**
 * Create div items for a custom select.
 * @param {object} select
 * @param {string} className
 */
function createSelectItems(select, className) {
    // Create div element with a className.
    let selectItems = document.createElement("div");
    selectItems.className = `${className}__items`;
    // Go through a loop for each of <option> elements of base <select>.
    for (let option of select.options) {
        // Add div elements with className and <option> values.
        selectItems.innerHTML += `<div class="${className}__item">${option.innerHTML}</div>`;
    }
    return selectItems;
}

/**
 * Append elements in a specific order.
 * @param {object} blocks
 */
function appendElements(blocks) {
    // Go through a loop for each of collection elements.
    for (let block in blocks) {
        // Add div element in a specific order.
        blocks[block][0].insertAdjacentElement(
            blocks[block][1],
            blocks[block][2]
        );
    }
}

/**
 * Add acticve class to the custom select to show items,
 * when user clicks on it.
 * @param {object} select
 */
function addActive(select) {
    select.addEventListener("click", function () {
        select.classList.toggle("is-active");
    });
}

/**
 * Put a value to the custom select.
 * @param {object} origin
 * @param {object} select
 * @param {string} className
 */
function putValue(select, className) {
    const items = select
        .querySelector(`.${className}__items`)
        .querySelectorAll(`.${className}__item`);

    items.forEach(function (item) {
        item.addEventListener("click", function () {
            let text = item.innerText;
            let currentText = item
                .closest(`.${select.classList[0]}`)
                .querySelector(`.${className}__value`);
            currentText.innerText = text;
        });
    });
}
