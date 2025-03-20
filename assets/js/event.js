document.addEventListener("DOMContentLoaded", function () {
    let eventTag = document.querySelector("[data-event-id]");
    let eventId = eventTag.getAttribute("data-event-id");
    console.log(eventId);
});
