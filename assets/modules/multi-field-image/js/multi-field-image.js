let count = 0;
// export function addMultiField() {
//     let multiFields = document.querySelectorAll("div[data-multi-field]");
//     multiFields.forEach(function (multiField) {
//         createMultiField(multiField);
//     });
// }
function addMultiField() {
    createMultiField();
    checkMultiField();
    // listenButtons();
}

function createMultiField() {
    count++;
    let fields = document.querySelectorAll("div[data-multi-field]");
    fields.forEach(function (field) {
        let className = "multi-field";
        let multiField = createDiv(className);
        let multiFieldImg = createDiv(`${className}__img`);
        let multiFieldTitle = createSpan(`${className}__title`, "Photo 1");
        let multiFieldRadiomark = createSpan(`${className}__radiomark`);
        let multiFieldButtons = createDiv(`${className}__buttons`);
        let multiFieldPlus = createButton(`${className}__plus`);
        let multiFieldMinus = createButton(`${className}__minus`);
        let multiFieldRadio = createDiv(`${className}__radio`);
        let multiFieldLabel = createLabel(
            `${className}__label`,
            `file-image-${count}`,
            "Add photo"
        );
        let multiFieldInput = createInput(
            `${className}__input`,
            `file-image-${count}`,
            "file",
            "file-image"
        );
        let multiFieldRadioInput = createInput(
            `${className}__radioinput`,
            `is-main-checkbox-${count}`,
            "radio",
            "customOption"
        );

        const blocks = {
            0: [multiFieldImg, "beforeEnd", multiFieldTitle],
            1: [multiFieldImg, "beforeend", multiFieldLabel],
            2: [multiFieldImg, "beforeend", multiFieldInput],
            3: [multiFieldRadio, "beforeend", multiFieldRadioInput],
            4: [multiFieldRadio, "beforeend", multiFieldRadiomark],
            5: [multiFieldButtons, "beforeend", multiFieldPlus],
            6: [multiFieldButtons, "beforeend", multiFieldMinus],
            7: [multiFieldButtons, "beforeend", multiFieldRadio],
            8: [multiField, "beforeEnd", multiFieldImg],
            9: [multiField, "beforeEnd", multiFieldButtons],
            10: [field, "afterBegin", multiField],
        };
        appendElements(blocks);
    });
}

function appendElements(blocks) {
    for (let block in blocks) {
        blocks[block][0].insertAdjacentElement(
            blocks[block][1].trim(),
            blocks[block][2]
        );
    }
}

function createDiv(className) {
    let element = document.createElement("div");
    element.className = className;
    return element;
}

function createSpan(className, value = null) {
    let element = document.createElement("span");
    element.className = className;
    if (value) {
        element.innerText = value;
    }
    return element;
}

function createLabel(className, id = null, value = null) {
    let element = document.createElement("label");
    if (id) {
        element.setAttribute("for", id);
    }
    if (value) {
        element.innerText = value;
    }
    element.className = className;
    return element;
}

function createInput(className, id = null, type = null, name = null) {
    let element = document.createElement("input");
    if (id) {
        element.setAttribute("id", id);
    }
    if (name) {
        element.setAttribute("name", name);
    }
    if (type) {
        element.setAttribute("type", type);
    }
    element.className = className;
    element.setAttribute("hidden", true);
    return element;
}

function createButton(className) {
    let element = document.createElement("button");
    element.setAttribute("type", "button");
    element.className = className;
    return element;
}

function checkMultiField() {
    let marks = document.querySelectorAll(".multi-field__radiomark");
    marks.forEach((mark) => {
        removeAction(marks);
        if (marks.length == 1) {
            addAction(mark);
        }
        mark.addEventListener("click", function (e) {
            removeAction(marks);
            e.preventDefault();
            addAction(mark);
        });
    });
}

function removeAction(marks) {
    marks.forEach((mark) => {
        mark.classList.remove("active");
        mark
            .closest(".multi-field__radio")
            .getElementsByTagName("input")[0].checked = false;
    });
}
function addAction(mark) {
    mark.classList.add("active");
    mark
        .closest(".multi-field__radio")
        .getElementsByTagName("input")[0].checked = true;
}

function listenButtons() {
    // let pluses = document.querySelectorAll(".multi-field__plus");
    // let minuses = document.querySelectorAll(".multi-field__minus");
    let c = 0;
    // document.querySelectorAll(".multi-field__plus").forEach((plus) => {
    //     plus.addEventListener("click", function (e) {
    //         count++;
    //         createMultiField();
    //         console.log(
    //             document.querySelectorAll(".multi-field").length,
    //             "Plus"
    //         );
    //         c++;
    //         console.log(c);
    //     });
    // });
    // document.querySelectorAll(".multi-field__minus").forEach((minus) => {
    //     minus.addEventListener("click", function (e) {
    //         if (document.querySelectorAll(".multi-field").length > 1) {
    //             e.preventDefault();
    //             minus.closest(".multi-field").remove();
    //         }
    //     });
    // });
    // document.querySelectorAll(".multi-field").forEach((field) => {
    //     let mines = field.querySelector(".multi-field__minus");
    //     mines.addEventListener("click", function (e) {
    //         if (document.querySelectorAll(".multi-field").length > 1) {
    //             e.preventDefault();
    //             field.remove();
    //         }
    //     });
    // });
}

// function plus(field) {
//     let plus = field.querySelector(".multi-field__plus");
//     plus.addEventListener("click", function (e) {
//         e.preventDefault();
//         count++;
//         createMultiField();
//         console.log("Plus");
//     });
// }
// function minus(field) {
//     let minus = field.querySelector(".multi-field__minus");
//     minus.addEventListener("click", function (e) {
//         if (document.querySelectorAll(".multi-field").length > 1) {
//             e.preventDefault();
//             field.remove();
//         }
//         console.log(field, "Minus");
//     });
// }
