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
        <header class="header">
            <div class="container-large">
                <div class="head">
                        <?php the_custom_logo($blog_id); ?>
                        <nav class="nav-menu">
                            <?php wp_nav_menu(array(
                            'theme_location' => 'top', 
                            'menu' => 'nav-menu',
                            'container' => null,
                            'menu_class' => 'menu',
                            )); 
                            ?>
                        </nav>
                </div>
            </div>
        </header>
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
                <div class="event-form">
                                    <!-- <div class="event-form" style="background-color:#fff;">
                    <?php // echo do_shortcode('[event_form]'); ?>
                </div> -->
                </div>
            </main>
        </div>
        <footer class="footer">
            <div class="footer__body">
                <div class="container-large">
                    <div class="info">
                        <div class="contact">
                            <?php the_custom_logo($blog_id); ?>
                            <div class="contact__info">
                                <a href="#" class="contact__email">
                                    <img src="<?php the_field('email_icon'); ?>" alt="">
                                    <?php the_field('email'); ?>
                                </a>
                                <a href="#" class="contact__address">
                                    <img src="<?php the_field('address_icon'); ?>" alt="">
                                    <?php the_field('address'); ?>
                                </a>
                            </div>
                        </div>
                        <div class="learn-more">
                            <h3 class="learn-more__title">Learn more</h3>
                            <?php wp_nav_menu(array(
                                'theme_location' => 'bottom', 
                                'menu' => 'learn-more',
                                'container' => null,
                                'menu_class' => 'learn-more__links',
                                )); 
                                ?>
                        </div>
                        <div class="social">
                            <h3 class="social__title">Social links</h3>
                            <div class="social__links">
                                <a class="social__link" href="https://www.spacex.com/">
                                    <img src="<?php the_field('space_x'); ?>" alt="">
                                </a>
                                <a class="social__link" href="https://www.instagram.com/">
                                    <img src="<?php the_field('instagram'); ?>" alt="">
                                </a>
                                <a class="social__link" href="https://www.facebook.com/">
                                    <img src="<?php the_field('facebook'); ?>" alt="">
                                </a>
                                <a class="social__link" href="https://www.linkedin.com/">
                                    <img src="<?php the_field('linkedin'); ?>" alt="">
                                </a>
                                <a class="social__link" href="https://www.whatsapp.com">
                                    <img src="<?php the_field('whatsapp'); ?>" alt="">
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <p class="copyright">Copyright © 2022-2029 example.com. All Rights Reserved.</p>
        </footer>
    </div>
    <?php wp_footer(); ?>
</body>

</html>