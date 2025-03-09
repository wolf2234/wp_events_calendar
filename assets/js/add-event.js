// document
//     .querySelector(".event-form__btn")
//     .addEventListener("click", function (event) {
//         event.preventDefault();
//         let fileInputs = document.querySelectorAll(".multi-field__input");
//         document.querySelectorAll(".multi-field__radio").forEach((mark) => {
//             let radio = mark.getElementsByTagName("input")[0];
//             console.log(radio.checked, "Radio", radio.id);
//         });
//         fileInputs.forEach((fileInput) => {
//             let file = fileInput.files[0];
//             if (file) {
//                 let reader = new FileReader();
//                 reader.onload = function (e) {};
//                 reader.readAsDataURL(file);
//             }
//             console.log(file);
//         });
//     });
addCustomSelect();
addMultiField();

let imagesData = [];
let eventName;
let eventStartTime;
let eventEndTime;
let eventStartDate;
let eventEndDate;
let eventAccess;
let eventPrice;
let eventStatus;
let eventAddressLine;
let eventCity;
let eventCountry;
let eventZIPCode;
let eventSpeackers;
let eventDescription;
let eventTags;

document
    .querySelector(".event-form__btn")
    .addEventListener("click", function (eventBtn) {
        eventBtn.preventDefault();
        let multiFields = document.querySelectorAll(".multi-field");
        multiFields.forEach((multiField) => {
            let objFile = multiField.querySelector(".multi-field__input");
            let objRadio = multiField
                .querySelector(".multi-field__radio")
                .querySelector("input");
            let image = {};
            image.file = objFile.files[0];
            image.isMain = objRadio.checked;
            imagesData.push(image);
        });
        eventName = document.querySelector(".event-form__name").value;
        eventStartTime = document.querySelector("#event-startime").value;
        eventEndTime = document.querySelector("#event-endtime").value;
        eventStartDate = document.querySelector("#event-startdate").value;
        eventEndDate = document.querySelector("#event-enddate").value;
        eventAccess = getSelectData(
            document.querySelector(".access").querySelector("select")
        );
        eventPrice = document
            .querySelector(".cost-field")
            .querySelector("input").value;
        eventStatus = getSelectData(
            document.querySelector(".status").querySelector("select")
        );
        eventAddressLine = document
            .querySelector(".adress")
            .querySelector("#event-adress-line").value;
        eventCity = document
            .querySelector(".adress")
            .querySelector("#event-city").value;
        eventCountry = document
            .querySelector(".adress")
            .querySelector("#event-country").value;
        eventZIPCode = document
            .querySelector(".adress")
            .querySelector("#event-code").value;
        eventSpeackers = document
            .querySelector(".authors__textarea")
            .value.trim();
        eventDescription = document
            .querySelector(".description__textarea")
            .value.trim();
        eventTags = document.querySelector(".event-form__tags").value;
        // console.log(imagesData);
        // console.log(eventName);
        // console.log(eventStartTime);
        // console.log(eventEndTime);
        // console.log(eventDate);
        // console.log(eventAccess);
        // console.log(eventPrice);
        // console.log(eventStatus);
        // console.log(eventAddressLine);
        // console.log(eventCity);
        // console.log(eventCountry);
        // console.log(eventZIPCode);
        // console.log(eventSpeackers);
        // console.log(eventDescription);
        // console.log(eventTags);
        jQuery(document).ready(function ($) {
            let formData = new FormData();
            formData.append("action", "add_custom_event");
            formData.append("event_name", eventName);
            formData.append("event_time_start", eventStartTime);
            formData.append("event_time_end", eventEndTime);
            formData.append("event_date_start", eventStartDate);
            formData.append("event_date_end", eventEndDate);
            formData.append("event_access", eventAccess);
            formData.append("event_price", eventPrice);
            formData.append("event_status", eventStatus);
            formData.append("event_address", eventAddressLine);
            formData.append("event_city", eventCity);
            formData.append("event_country", eventCountry);
            formData.append("event_zip_code", eventZIPCode);
            formData.append("event_speakers", eventSpeackers);
            formData.append("event_description", eventDescription);
            formData.append("event_tags", eventTags);
            imagesData.forEach((imageObj, index) => {
                formData.append(`event_images[]`, imageObj.file);
                formData.append(`is_main[]`, imageObj.isMain);
            });

            $.ajax({
                url: ajax_object_addevent.ajaxurl,
                type: "POST",
                data: formData,
                processData: false,
                contentType: false,
                success: function (response) {
                    console.log("Файлы загружены:", response);
                },
                error: function (response) {
                    console.log("Ошибка:", response);
                },
            });

            // let jqRequest = jQuery.post(ajax_object_addevent.ajaxurl, formData);
            // jqRequest.done(function (response) {
            //     console.log(response);
            // });
            // jqRequest.fail(function (response) {
            //     console.log(response);
            // });
        });
    });

function getSelectData(select) {
    for (let option of select.options) {
        if (option.selected) {
            return option.textContent.trim();
        }
    }
}
