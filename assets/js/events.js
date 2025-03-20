let className = "events";
let iconLink =
    "https://event-calendarmvp.local/wp-content/uploads/2025/03/Male_User.png";
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
                console.log(imageUrl);
                let datetimeInfo = getFullEventTimeDate(event);
                let eventsItem = document.createElement("div");
                let eventLink = document.createElement("a");
                let eventsCard = document.createElement("div");
                let eventsImg = document.createElement("img");
                let eventsDate = document.createElement("div");
                let eventsTitle = document.createElement("h3");
                let eventsCity = document.createElement("div");
                let eventsRow = document.createElement("div");
                let eventsDescription = document.createElement("div");
                let eventsOwner = document.createElement("div");
                let eventsOwnerIcon = document.createElement("img");
                let eventsOwnerName = document.createElement("sup");
                let eventsBtn = document.createElement("a");

                eventsItem.classList.add(`${className}__item`);
                eventsRow.classList.add(`${className}__row`);
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
                eventLink.setAttribute(
                    "href",
                    `https://event-calendarmvp.local/?page_id=161&event_id=${event.id}`
                );
                eventLink.setAttribute("data-id", `${event.id}`);
                eventsBtn.setAttribute("href", `#`);
                eventsOwnerIcon.setAttribute("src", iconLink);
                eventsOwnerIcon.setAttribute("alt", "Owner icon");

                eventsDate.textContent = datetimeInfo;
                eventsTitle.textContent = event.name;
                eventsCity.textContent = event.city;
                eventsDescription.textContent = event.description;
                eventsOwnerName.textContent = "Author name";
                eventsBtn.textContent = textBtn;

                eventsOwner.appendChild(eventsOwnerIcon);
                eventsOwner.appendChild(eventsOwnerName);
                eventsCard.appendChild(eventsImg);
                eventsCard.appendChild(eventsDate);
                eventsCard.appendChild(eventsTitle);
                eventsCard.appendChild(eventsCity);
                eventsCard.appendChild(eventsDescription);
                eventsRow.appendChild(eventsOwner);
                eventsRow.appendChild(eventsBtn);
                eventsCard.appendChild(eventsRow);
                eventLink.appendChild(eventsCard);
                eventsItem.appendChild(eventLink);
                document.body
                    .querySelector(`.${className}__items`)
                    .appendChild(eventsItem);
            });
        } catch (TypeError) {}
    });
    jqGetEvents.fail(function (response) {});
});

function getMainImg(imgs) {
    let url = "";
    imgs.forEach((img) => {
        if (img.is_main == "1") {
            url = img.url;
        }
    });
    return url;
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
