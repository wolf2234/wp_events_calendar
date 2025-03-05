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
                            <div class="event-form__item">

                                <div class="event-form__field" data-multi-field></div>
                                <!-- <div class="multi-field">
                                    <div class="multi-field__img">
                                        <span class="multi-field__title">Photo 1</span>
                                        <label for="file-image" class="multi-field__label">Add photo</label>
                                        <input type="file" id="file-image" class="multi-field__input" name="file-image" hidden>
                                    </div>
                                    <div class="multi-field__buttons">
                                        <button type="button" class="multi-field__plus"></button>
                                        <button type="button" class="multi-field__minus"></button>
                                        <div class="multi-field__radio">
                                            <input type="radio" id="is-main-checkbox-1" name="customOption" class="multi-field__radioinput" hidden>
                                            <span class="multi-field__radiomark"></span>
                                        </div>
                                    </div>
                                </div> -->


                            </div>
                            <div class="event-form__item">
                            </div>
                            <div class="event-form__item">
                            </div>
                        </div>
                        <div class="event-form__submit">
                            <button type="submit" class="event-form__btn">Create Event</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        
        <?php include 'includes/footer.php' ?>
    </div>
<?php wp_footer(); ?>