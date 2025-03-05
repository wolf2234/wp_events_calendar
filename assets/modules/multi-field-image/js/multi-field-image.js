let count = 0;
// export function addMultiField() {
//     let multiFields = document.querySelectorAll("div[data-multi-field]");
//     multiFields.forEach(function (multiField) {
//         createMultiField(multiField);
//     });
// }
function addMultiField() {
    createMultiField();
    showImage();
    checkMultiField();
    listenButtons();
}

function createMultiField() {
    let fields = document.querySelectorAll("div[data-multi-field]");
    fields.forEach(function (field) {
        let className = "multi-field";
        let multiField = createDiv(className);
        let multiFieldFile = createDiv(`${className}__file`);
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
        let multiFieldImg = createImg(`${className}__img`, `preview-${count}`);
        let multiFieldRadioInput = createInput(
            `${className}__radioinput`,
            `is-main-checkbox-${count}`,
            "radio",
            "customOption"
        );

        const blocks = {
            0: [multiFieldFile, "beforeEnd", multiFieldTitle],
            1: [multiFieldFile, "beforeend", multiFieldLabel],
            2: [multiFieldFile, "beforeend", multiFieldInput],
            3: [multiFieldFile, "beforeend", multiFieldImg],
            4: [multiFieldRadio, "beforeend", multiFieldRadioInput],
            5: [multiFieldRadio, "beforeend", multiFieldRadiomark],
            6: [multiFieldButtons, "beforeend", multiFieldPlus],
            7: [multiFieldButtons, "beforeend", multiFieldMinus],
            8: [multiFieldButtons, "beforeend", multiFieldRadio],
            9: [multiField, "beforeEnd", multiFieldFile],
            10: [multiField, "beforeEnd", multiFieldButtons],
            11: [field, "afterBegin", multiField],
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
function createImg(className, id = null) {
    let element = document.createElement("img");
    if (id) {
        element.setAttribute("id", id);
    }
    element.className = className;
    element.setAttribute("src", "");
    element.setAttribute("alt", "Image");
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
    if (document.body.querySelectorAll(".multi-field").length == 1) {
        document.body
            .querySelectorAll(".multi-field__radiomark")
            .forEach((mark) => {
                addAction(mark);
            });
    }
    document.body.addEventListener("click", function (e) {
        if (e.target.classList.contains("multi-field__radiomark")) {
            removeAction();
            addAction(e.target);
        }
    });
}

function listenButtons() {
    document.body.addEventListener("click", function (e) {
        plus(e.target);
        minus(e.target);
    });
}

function plus(button) {
    if (button.classList.contains("multi-field__plus")) {
        count++;
        createMultiField();
    }
}
function minus(button) {
    if (button.classList.contains("multi-field__minus")) {
        if (document.body.querySelectorAll(".multi-field").length > 1) {
            button.closest(".multi-field").remove();
        }
    }
}

function removeAction() {
    document.body
        .querySelectorAll(".multi-field__radiomark")
        .forEach((mark) => {
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

function showImage() {
    document.body.addEventListener("change", function (element) {
        if (element.target.classList.contains("multi-field__input")) {
            let file = element.target.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {
                    let image = element.target
                        .closest(".multi-field__file")
                        .querySelector(".multi-field__img");
                    let inputFile = element.target
                        .closest(".multi-field__file")
                        .querySelector(".multi-field__label");
                    image.src = e.target.result;
                    image.style.display = "block";
                    inputFile.style.display = "none";
                };
                reader.readAsDataURL(file);
            }
        }
    });
}
