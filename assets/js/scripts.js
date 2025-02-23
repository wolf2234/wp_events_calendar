// document.addEventListener("DOMContentLoaded", function () {
let numericDate = document.querySelector(".em-month-picker").value;
let [year, month] = numericDate.split("-");
let date = new Date(year, month - 1);
let monthName = date.toLocaleString("uk-UA", { month: "long" });

// console.log(numericDate);
// console.log(monthName);
// let days = document.querySelectorAll(".em-cal-day-date");
document.querySelectorAll(".em-cal-day-date").forEach((day) => {
    day.addEventListener("click", (e) => {
        let resultDay =
            day.textContent.trim().length < 2
                ? `0${day.textContent.trim()}`
                : day.textContent.trim();
        let fullDate = new Date(year, month - 1, resultDay);
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
                    fullDate.setMonth(date.getMonth() - 1);
                } else if (
                    parent.classList.contains("eventful-post") ||
                    parent.classList.contains("eventless-post")
                ) {
                    fullDate.setMonth(date.getMonth() + 1);
                }
            }
        });

        let resultYear = fullDate.getFullYear();
        let resultMonth = (fullDate.getMonth() + 1).toString().padStart(2, "0");
        let resultDate = `${resultYear}-${resultMonth}-${resultDay}`;

        jQuery(document).ready(function ($) {
            var data = {
                action: "calendar",
                eventDate: resultDate,
            };

            let jqRequest = jQuery.post(ajax_object.ajaxurl, data);

            jqRequest.done(function (response) {
                response.data.forEach((event) => {
                    // console.log(
                    //     `${event.id} - ${event.name} - ${event.status} - ${event.start_time} - ${event.end_time} - ${event.start_date} - ${event.end_date}`
                    // );
                });
                console.log(response.data.length);
            });

            jqRequest.fail(function (response) {});
        });
    });
});
// });
// eventful-pre, eventless-pre, eventful-post, eventless-post, eventless
