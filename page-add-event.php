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
                                <div class="event-form__images" data-multi-field></div>
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
                                    <label for="event-name" class="event-form__label">Name of Event</label>
                                    <input id="event-name" type="text" value="" name="event-name" class="event-form__name">
                                </div>
                                <div class="event-form__field">
                                    <label for="event-starttime" class="event-form__label">Start time</label>
                                    <input id="event-starttime" type="time" value="" name="datetime" class="event-form__time">
                                </div>
                                <div class="event-form__field">
                                    <label for="event-endttime" class="event-form__label">End time</label>
                                    <input id="event-endttime" type="time" value="" name="datetime" class="event-form__time">
                                </div>
                                <div class="event-form__field">
                                    <label for="event-date" class="event-form__label">Date</label>
                                    <input id="event-date" type="date" value="" name="date" class="event-form__date">
                                </div>
                                <div class="event-form__field">
                                    <div class="access">
                                        <label for="select1" class="access__label">Access</label>
                                        <select name="event-select1" id="select1" data-custom-select>
                                            <option value="0" selected>Public</option>
                                            <option value="1">Private</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="event-form__item">
                                <div class="event-form__field">
                                    <div class="cost-field">
                                        <label for="event-cost" class="cost-field__label">Price</label>
                                        <div class="cost-field__input">
                                            <input id="event-cost" type="number" value="" name="event-cost" class="">
                                        </div>
                                    </div>
                                </div>
                                <div class="event-form__field">
                                    <div class="status">
                                        <label for="status1" class="status__label">Status</label>
                                        <select name="event-select2" id="status1" data-custom-select>
                                            <option value="0" selected>Ongoing</option>
                                            <option value="1">Finished</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="event-form__field">
                                    <div class="adress">
                                        <div class="adress__row">
                                            <div class="adress__item">
                                                <label for="event-adress" class="adress__label">Address Line</label>
                                                <input id="event-adress" type="text" value="" name="event-adress" class="adress__input">
                                            </div>
                                            <div class="adress__item">
                                                <label for="event-adress" class="adress__label">City</label>
                                                <input id="event-adress" type="text" value="" name="event-adress" class="adress__input">
                                            </div>
                                        </div>
                                        <div class="adress__row">
                                            <div class="adress__item">
                                                <label for="event-adress" class="adress__label">Country</label>
                                                <input id="event-adress" type="text" value="" name="event-adress" class="adress__input">
                                            </div>
                                            <div class="adress__item">
                                                <label for="event-adress" class="adress__label">ZIP Code</label>
                                                <input id="event-adress" type="text" value="" name="event-adress" class="adress__input">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="event-form__field">
                                    <div class="authors">
                                        <label for="event-author" class="authors__label">Speackers</label>
                                        <textarea name="event-author" id="event-author" class="authors__textarea" rows="7"></textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="event-form__field">
                            <div class="description">
                                <label for="event-description" class="description__label">Description</label>
                                <textarea name="event-description" id="event-author" class="description__textarea" rows="12"></textarea>
                            </div>
                        </div>
                        <div class="event-form__field">
                            <label for="event-tags" class="event-form__label">Tags</label>
                            <input id="event-tags" type="text" value="" name="event-tags" class="event-form__tags">
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