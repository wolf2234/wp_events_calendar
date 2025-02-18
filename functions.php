<?php 
add_action('wp_enqueue_scripts', 'event_calendar_styles');
add_action('wp_enqueue_scripts', 'event_calendar_scripts');
add_action('after_setup_theme', 'event_calendar_nav_menu');


function event_calendar_nav_menu() {
    register_nav_menu( 'top', 'menu in header' );
    register_nav_menu( 'bottom', 'menu in footer' );
}


function event_calendar_styles() {
    wp_enqueue_style('null-style', get_template_directory_uri() . '/assets/css/null-style.css');
    wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/css/main-style.css');
}

function event_calendar_scripts() {
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array('jquery'), null, true);
}

add_filter('event_manager_locate_template', function ($template, $template_name, $template_path) {
    $theme_template = get_stylesheet_directory() . '/wp-event-manager/' . $template_name;

    if (file_exists($theme_template)) {
        error_log('Шаблон загружен из темы: ' . $theme_template);
        return $theme_template;
    }

    return $template;
}, 20, 3);


add_filter( 'get_all_event_organizer_args', 'wpem_all_event_organizer_args', 10 );
function wpem_all_event_organizer_args($args) {
    if(isset($args['author']))
    unset($args['author']);
    return $args;
}

add_theme_support('custom-logo');
add_theme_support('wp-event-manager');