let count = 1;
/*
<div class="multi-field">
    <div class="multi-field__file">
        <span class="multi-field__title">Photo 1</span>
        <div class="multi-field__row">
                <label for="file-image-2" class="multi-field__label">Add photo</label>
                <input id="file-image-2" name="file-image" type="file" class="multi-field__input" hidden="true">
                <img id="preview-2" class="multi-field__img" src="" alt="Image">
                <div class="multi-field__buttons">
                        <button type="button" class="multi-field__plus"></button>
                        <button type="button" class="multi-field__minus"></button>
                        <div class="multi-field__radio">
                            <input id="is-main-checkbox-2" name="customOption" type="radio" class="multi-field__radioinput" hidden="true">
                            <span class="multi-field__radiomark active"></span>
                        </div>
                </div>
        </div>
    </div>
</div> 
*/

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
        let multiField = createDivField(className);
        let multiFieldFile = createDivField(`${className}__file`);
        let multiFieldTitle = createSpan(
            `${className}__title`,
            `Photo ${count}`
        );
        let multiFieldRadiomark = createSpan(`${className}__radiomark`);
        let multiFieldRow = createDivField(`${className}__row`);
        let multiFieldButtons = createDivField(`${className}__buttons`);
        let multiFieldPlus = createButton(`${className}__plus`);
        let multiFieldMinus = createButton(`${className}__minus`);
        let multiFieldRadio = createDivField(`${className}__radio`);
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
            0: [multiFieldRadio, "beforeend", multiFieldRadioInput],
            1: [multiFieldRadio, "beforeend", multiFieldRadiomark],
            2: [multiFieldButtons, "beforeend", multiFieldPlus],
            3: [multiFieldButtons, "beforeend", multiFieldMinus],
            4: [multiFieldButtons, "beforeend", multiFieldRadio],
            5: [multiFieldRow, "beforeend", multiFieldLabel],
            6: [multiFieldRow, "beforeend", multiFieldInput],
            7: [multiFieldRow, "beforeend", multiFieldImg],
            8: [multiFieldRow, "beforeend", multiFieldButtons],
            9: [multiFieldFile, "beforeEnd", multiFieldTitle],
            10: [multiFieldFile, "beforeEnd", multiFieldRow],
            11: [multiField, "beforeEnd", multiFieldFile],
            12: [field, "beforeEnd", multiField],
        };
        appendElementsField(blocks);
    });
}

function appendElementsField(blocks) {
    for (let block in blocks) {
        blocks[block][0].insertAdjacentElement(
            blocks[block][1].trim(),
            blocks[block][2]
        );
    }
}

function createDivField(className) {
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
