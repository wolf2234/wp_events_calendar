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