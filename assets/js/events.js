jQuery(document).ready(function ($) {
    let data = {
        action: "events_info",
    };
    let jqGetEvents = jQuery.post(ajax_object_events.ajaxurl, data);
    // let eventsDate = document.querySelector(".calendar__date");
    // eventsDate.innerHTML = `${nameOfMonth} ${date}`;
    jqGetEvents.done(function (response) {
        try {
            console.log(response);
        } catch (TypeError) {}
    });
    jqGetEvents.fail(function (response) {});
});
