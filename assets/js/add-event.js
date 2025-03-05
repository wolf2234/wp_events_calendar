// document.addEventListener("DOMContentLoaded", function () {
document
    .querySelector(".event-form__btn")
    .addEventListener("click", function (event) {
        event.preventDefault();
        let fileInputs = document.querySelectorAll(".multi-field__input");
        document.querySelectorAll(".multi-field__radio").forEach((mark) => {
            let radio = mark.getElementsByTagName("input")[0];
            console.log(radio.checked, "Radio", radio.id);
        });
        fileInputs.forEach((fileInput) => {
            let file = fileInput.files[0];
            if (file) {
                let reader = new FileReader();
                reader.onload = function (e) {};
                reader.readAsDataURL(file);
            }
            console.log(file);
        });
    });
addMultiField();
let ff = document.querySelectorAll(".multi-field__plus");
ff.forEach((plus) => {
    console.log(document.querySelectorAll(".multi-field__plus").length);
    plus.addEventListener("click", function (e) {
        createMultiField();
        console.log(document.querySelectorAll(".multi-field").length, "Plus");
    });
});
// });
