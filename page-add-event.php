<?php
/*
Template Name: Add Event
*/
wp_head();
?>
    <div class="wrapper">
        <?php include 'includes/header.php';?>
        <div class="">
            <div class="container-large">
                <form id="id_event_form" class="event-form">
                    <div class="event-form__head">
                        <h2 class="event-form__title">
                            Create Event
                        </h2>
                    </div>
                    <div class="event-form__body">
                        <div class="event-form__items">
                            <div class="event-form__item"></div>
                            <div class="event-form__item">
                                <label for="event-name" class="event-form__label">name of event</label>
                                <input type="text" class="event-form__input" name="event-name" id="event-name" placeholder="Event Name">
                            </div>
                            <div class="event-form__item">
                                <label for="event-name" class="event-form__label">name of event</label>
                                <input type="text" class="event-form__input" name="event-name" id="event-name" placeholder="Event Name">
                            </div>
                            <div class="event-form__item">
                                <label for="event-name" class="event-form__label">name of event</label>
                                <input type="text" class="event-form__input" name="event-name" id="event-name" placeholder="Event Name">
                            </div>
                            <div class="event-form__item"></div>
                            <div class="event-form__item"></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <?php include 'includes/footer.php' ?>
    </div>
<?php wp_footer(); ?>