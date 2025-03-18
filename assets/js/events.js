let className = "events";
let iconLink = "";
let textBtn = "Read more";
jQuery(document).ready(function ($) {
    let data = {
        action: "events_info",
    };
    let jqGetEvents = jQuery.post(ajax_object_events.ajaxurl, data);
    jqGetEvents.done(function (response) {
        try {
            response.data.forEach((event) => {
                let imageUrl = getMainImg(event.images);
                let datetimeInfo = getFullEventTimeDate(event);
                let eventsItem = document.createElement("div");
                let eventLink = document.createElement("a");
                let eventsCard = document.createElement("div");
                let eventsImg = document.createElement("img");
                let eventsDate = document.createElement("div");
                let eventsTitle = document.createElement("h3");
                let eventsCity = document.createElement("div");
                let eventsDescription = document.createElement("div");
                let eventsOwner = document.createElement("div");
                let eventsOwnerIcon = document.createElement("img");
                let eventsOwnerName = document.createElement("sup");
                let eventsBtn = document.createElement("div");

                eventsItem.classList.add(`${className}__item`);
                eventLink.classList.add(`${className}__link`);
                eventsCard.classList.add(`${className}__card`);
                eventsImg.classList.add(`${className}__img`);
                eventsDate.classList.add(`${className}__date`);
                eventsTitle.classList.add(`${className}__title`);
                eventsCity.classList.add(`${className}__city`);
                eventsDescription.classList.add(`${className}__description`);
                eventsOwner.classList.add(`${className}__owner`);
                eventsOwnerIcon.classList.add(`${className}__owner-icon`);
                eventsOwnerName.classList.add(`${className}__owner-name`);
                eventsBtn.classList.add(`${className}__btn`);

                eventsImg.setAttribute("src", imageUrl);
                eventsImg.setAttribute("alt", "Event image");
                eventLink.setAttribute("href", `#`);
                eventsOwnerIcon.setAttribute("src", iconLink);
                eventsOwnerIcon.setAttribute("alt", "Owner icon");

                eventsDate.textContent = datetimeInfo;
                eventsTitle.textContent = event.name;
                eventsCity.textContent = event.city;
                eventsDescription.textContent = event.description;
                eventsOwnerName.textContent = "Author name";
                eventsBtn.textContent = textBtn;
            });
        } catch (TypeError) {}
    });
    jqGetEvents.fail(function (response) {});
});

function getMainImg(imgs) {
    imgs.forEach((img) => {
        if (img.is_main == "1") {
            return img.url;
        }
    });
}

function getFullEventTimeDate(event) {
    let startDate = new Date(event.start_date);
    let endDate = new Date(event.end_date);
    let startDateStr = startDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
    });
    let endDateStr = endDate.toLocaleString("en-US", {
        month: "long",
        day: "numeric",
    });
    if (startDateStr.split(" ")[0] == endDateStr.split(" ")[0]) {
        return `${startDateStr.split(" ")[0]} ${startDateStr.split(" ")[1]}-${
            endDateStr.split(" ")[1]
        }, at ${event.start_time.split(":")[0]}:${
            event.start_time.split(":")[1]
        }-${event.end_time.split(":")[0]}:${event.end_time.split(":")[1]}`;
    } else {
        return `${startDateStr} - ${endDateStr}, at ${
            event.start_time.split(":")[0]
        }:${event.start_time.split(":")[1]}-${event.end_time.split(":")[0]}:${
            event.end_time.split(":")[1]
        }`;
    }
}
