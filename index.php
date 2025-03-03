<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php wp_head(); ?>
    <title><?php bloginfo('name'); ?></title>
</head>
<body>
    <div class="wrapper">
        <?php include 'includes/header.php';?>
        <div class="">
            <main class="main">
                <div class="title">
                    <h1 class="title__name">Calendar</h1>
                </div>
                <div class="container-small">
                    <div class="content">
                        <div class="calendar">
                            <?php echo do_shortcode('[events_calendar]'); ?>
                        </div>
                        <div class="events">
                            <div class="events__head">
                                <h2 class="events__title">Events on <span class="events__date"></span></h2>
                                <div class="events__count"></div>
                            </div>
                            <div class="events__body">
                                <div class="events__items"></div>
                                <div class="events__btn">
                                    <a href="#" class="events__link">Assign Event</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
        <?php include 'includes/footer.php' ?>
    </div>
    <?php wp_footer(); ?>
</body>

</html>