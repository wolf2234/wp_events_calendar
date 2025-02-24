// document.addEventListener("DOMContentLoaded", function () {

// console.log(numericDate);
// console.log(monthName);
// let days = document.querySelectorAll(".em-cal-day-date");
let clicked = false;
document.querySelectorAll(".em-cal-day-date").forEach((day) => {
    day.addEventListener("click", (e) => {
        document.querySelectorAll(".em-cal-day-date").forEach((day) => {
            day.classList.remove("clicked");
        });
        let today = document
            .querySelector(".eventless-today")
            .querySelector(".em-cal-day-date");
        today.classList.remove("clicked");
        if (document.querySelectorAll(".events__item").length > 0) {
            document.querySelectorAll(".events__item").forEach((item) => {
                item.remove();
            });
        }
        if (document.querySelector(".events__count").textContent != "0") {
            document.querySelector(".events__count").innerHTML = "0";
        }
        day.classList.add("clicked");

        let monthPicker = document.querySelector(".em-month-picker").value;
        let [year, month] = monthToNumber(monthPicker);

        let resultDay =
            day.textContent.trim().length < 2
                ? `0${day.textContent.trim()}`
                : day.textContent.trim();
        let fullDate = new Date(year, month - 1);
        let eventfulPre = day.closest(".eventful-pre");
        let eventlessPre = day.closest(".eventless-pre");
        let eventfulPost = day.closest(".eventful-post");
        let eventlessPost = day.closest(".eventless-post");
        let parantsList = [
            eventfulPre,
            eventlessPre,
            eventfulPost,
            eventlessPost,
        ];
        parantsList.forEach((parent) => {
            if (parent) {
                if (
                    parent.classList.contains("eventful-pre") ||
                    parent.classList.contains("eventless-pre")
                ) {
                    fullDate.setMonth(fullDate.getMonth() - 1);
                } else if (
                    parent.classList.contains("eventful-post") ||
                    parent.classList.contains("eventless-post")
                ) {
                    fullDate.setMonth(fullDate.getMonth() + 1);
                }
            }
        });

        let resultYear = fullDate.getFullYear();
        let resultMonth = (fullDate.getMonth() + 1).toString().padStart(2, "0");
        // let resultDate = `${resultYear}-${resultMonth}-${resultDay}`;
        getEvents(resultYear, resultMonth, resultDay);
        clicked = true;
    });
    if (!clicked) {
        document.querySelectorAll(".em-cal-day-date").forEach((day) => {
            day.classList.remove("clicked");
        });
        let today = document
            .querySelector(".eventless-today")
            .querySelector(".em-cal-day-date");
        today.classList.add("clicked");
        let monthPicker = document.querySelector(".em-month-picker").value;
        let [year, month] = monthToNumber(monthPicker);
        let dayNumber = document
            .querySelector(".eventless-today")
            .textContent.trim();
        let resultDay = dayNumber.length < 2 ? `0${dayNumber}` : dayNumber;
        let eventDate = document.querySelector(".events__date");
        let date = new Date(year, month - 1);
        let monthName = date.toLocaleString("en-US", { month: "long" });
        eventDate.innerHTML = `${monthName} ${resultDay}`;
        console.log(year, month, dayNumber, "Clicked");
        getEvents(year, month, dayNumber);
    }
});

function monthToNumber(monthName) {
    let [year, month] = [];

    if (monthName.includes("-")) {
        [year, month] = monthName.split("-");
    } else {
        [month, year] = monthName.split(" ");
    }
    const months = [
        { nameUS: "January", nameUkr: "січень", number: "01" },
        { nameUS: "February", nameUkr: "лютий", number: "02" },
        { nameUS: "March", nameUkr: "березень", number: "03" },
        { nameUS: "April", nameUkr: "квітень", number: "04" },
        { nameUS: "May", nameUkr: "травень", number: "05" },
        { nameUS: "June", nameUkr: "червень", number: "06" },
        { nameUS: "July", nameUkr: "липень", number: "07" },
        { nameUS: "August", nameUkr: "серпень", number: "08" },
        { nameUS: "September", nameUkr: "вересень", number: "09" },
        { nameUS: "October", nameUkr: "жовтень", number: "10" },
        { nameUS: "November", nameUkr: "листопад", number: "11" },
        { nameUS: "December", nameUkr: "грудень", number: "12" },
    ];

    months.forEach((monthObj) => {
        if (monthObj.nameUS.toLowerCase() == month.toLowerCase()) {
            [year, month] = [year, monthObj.number];
        } else if (monthObj.nameUkr.toLowerCase() == month.toLowerCase()) {
            [year, month] = [year, monthObj.number];
        } else if (monthObj.number.toLowerCase() == month.toLowerCase()) {
            [year, month] = [year, monthObj.number];
        }
    });
    return [year, month];
}

function getEvents(year, month, date) {
    jQuery(document).ready(function ($) {
        let resultDate = `${year}-${month}-${date}`;
        var data = {
            action: "calendar",
            eventDate: resultDate,
        };
        let newfullDate = new Date(year, month - 1);
        let nameOfMonth = newfullDate.toLocaleString("en-US", {
            month: "long",
        });

        let jqRequest = jQuery.post(ajax_object.ajaxurl, data);
        let eventsDate = document.querySelector(".events__date");
        eventsDate.innerHTML = `${nameOfMonth} ${date}`;

        jqRequest.done(function (response) {
            try {
                document.querySelector(".events__count").innerHTML =
                    response.data.length !== undefined
                        ? response.data.length
                        : 0;
                response.data.forEach((event) => {
                    let eventsDetails = document.createElement("a");
                    eventsDetails.setAttribute("href", `#`);
                    eventsDetails.classList.add("events__details");
                    eventsDetails.innerHTML = "Details";

                    let eventsItem = document.createElement("div");
                    let eventsEvent = document.createElement("div");
                    let eventsName = document.createElement("div");
                    let eventsTime = document.createElement("div");
                    let eventsStatus = document.createElement("div");
                    eventsItem.classList.add("events__item");
                    eventsEvent.classList.add("events__event");

                    eventsName.classList.add("events__name");
                    eventsTime.classList.add("events__time");
                    eventsStatus.classList.add("events__status");

                    eventsName.innerHTML = `${event.name}`;
                    eventsTime.innerHTML = `${event.start_time}-${event.end_time}`;
                    eventsStatus.innerHTML = `${event.status}`;

                    eventsEvent.appendChild(eventsName);
                    eventsEvent.appendChild(eventsTime);
                    eventsEvent.appendChild(eventsStatus);
                    eventsItem.appendChild(eventsEvent);
                    eventsItem.appendChild(eventsDetails);

                    document
                        .querySelector(".events__items")
                        .insertAdjacentHTML("afterBegin", eventsItem.outerHTML);
                });
            } catch (TypeError) {}
        });

        jqRequest.fail(function (response) {});
    });
}

// });
// eventful-pre, eventless-pre, eventful-post, eventless-post, eventless
