<?php
/*
Template Name: Add Event
*/
wp_head();
?>
    <div class="wrapper">
        <?php include 'includes/header.php';?>
        <div class="add-event-content">
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
                                <!--
                                <div class="multi-field">
                                    <div class="multi-field__file">
                                        <span class="multi-field__title">Photo 1</span>
                                        <div class="multi-field__row">
                                                <label for="file-image-2" class="multi-field__label">Add photo</label>
                                                <input id="file-image-2" name="file-image" type="file" class="multi-field__input" hidden="true">
                                                <img id="preview-2" class="multi-field__img" src="" alt="Image">
                                                <div class="multi-field__buttons">
                                                        <button type="button" class="multi-field__plus"></button>
                                                        <button type="button" class="multi-field__minus"></button>
                                                        <div class="multi-field__radio">
                                                            <input id="is-main-checkbox-2" name="customOption" type="radio" class="multi-field__radioinput" hidden="true">
                                                            <span class="multi-field__radiomark active"></span>
                                                        </div>
                                                </div>
                                        </div>
                                    </div>
                                </div> 
                            -->
                            </div>
                            <div class="event-form__item">
                                <div class="event-form__field">
                                    <div class="access">
                                        <label for="select1" class="access__label">Access</label>
                                        <select name="event-select" id="select1" data-custom-select>
                                            <option value="0" selected>Public</option>
                                            <option value="1">Private</option>
                                        </select>
                                    </div>
                                </div>
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