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
                    <div class="calendar">
                        <div class="calendar__timedates">
                            <?php echo do_shortcode('[events_calendar]'); ?>
                        </div>
                        <div class="calendar__events">
                            <div class="calendar__head">
                                <h2 class="calendar__title">Events on <span class="calendar__date"></span></h2>
                                <div class="calendar__count"></div>
                            </div>
                            <div class="calendar__body">
                                <div class="calendar__items"></div>
                                <div class="calendar__btn">
                                    <a href="#" class="calendar__link">Assign Event</a>
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