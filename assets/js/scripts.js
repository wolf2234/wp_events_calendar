// document.addEventListener("DOMContentLoaded", function () {

// console.log(numericDate);
// console.log(monthName);
// let days = document.querySelectorAll(".em-cal-day-date");
let clicked = false;
document.querySelectorAll(".em-cal-day-date").forEach((day) => {
    console.log(day.clicked);
    day.addEventListener("click", (e) => {
        let [month, year] = document
            .querySelector(".em-month-picker")
            .value.split(" ");
        month = monthToNumber(month);

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
        let [year, month] = document
            .querySelector(".em-month-picker")
            .value.split("-");
        let dayNumber = document
            .querySelector(".eventless-today")
            .textContent.trim();
        let resultDay = dayNumber.length < 2 ? `0${dayNumber}` : dayNumber;
        let eventDate = document.querySelector(".events__date");
        let date = new Date(year, month - 1);
        let monthName = date.toLocaleString("en-US", { month: "long" });
        eventDate.innerHTML = `${monthName} ${resultDay}`;
        getEvents(year, month, dayNumber);
    }
});

function monthToNumber(monthName) {
    const monthsUkr = {
        січень: "01",
        лютий: "02",
        березень: "03",
        квітень: "04",
        травень: "05",
        червень: "06",
        липень: "07",
        серпень: "08",
        вересень: "09",
        жовтень: "10",
        листопад: "11",
        грудень: "12",
    };
    const monthsUS = {
        January: "01",
        February: "02",
        March: "03",
        April: "04",
        May: "05",
        June: "06",
        July: "07",
        August: "08",
        September: "09",
        October: "10",
        November: "11",
        December: "12",
    };

    return monthsUkr[monthName.toLowerCase()] || null;
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
                response.data.forEach((event) => {
                    console.log(
                        `${event.id} - ${event.name} - ${event.status} - ${event.start_time} - ${event.end_time} - ${event.start_date} - ${event.end_date}`
                    );
                });
            } catch (TypeError) {}
        });

        jqRequest.fail(function (response) {});
    });
}

// });
// eventful-pre, eventless-pre, eventful-post, eventless-post, eventless
