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
    wp_enqueue_style('calendar', get_template_directory_uri() . '/assets/css/calendar.css');
}

function event_calendar_scripts() {
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array('jquery'), null, true);
    wp_localize_script('scripts', 'ajax_object', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
    ));
}

add_filter('event_manager_locate_template', function ($template, $template_name, $template_path) {
    $theme_template = get_stylesheet_directory() . '/events-manager/' . $template_name;

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


function custom_fullcalendar_post_types( $args ) {
    $args['post_types'][] = 'event_listing';
    return $args;
}
add_filter( 'em_fullcalendar_get_options', 'custom_fullcalendar_post_types' );


function custom_fullcalendar_event($event) {
    $event['color'] = '#ff0000'; // Красный цвет для событий
    $event['title'] = strtoupper($event['title']); // Заглавные буквы
    return $event;
}
add_filter('wp_fullcalendar_event', 'custom_fullcalendar_event');




add_action('wp_ajax_calendar', 'get_calendar_data');
add_action('wp_ajax_nopriv_calendar', 'get_calendar_data');
function get_calendar_data() {
    if (!isset($_POST['eventDate'])) {
        wp_send_json_error(['message' => 'Дата не передана']);
    }

    global $wpdb;
    $date = sanitize_text_field($_POST['eventDate']);
    $table_name = $wpdb->prefix . 'em_events'; 

    $query = $wpdb->prepare("
        SELECT event_id, event_name, event_status, event_start_date, event_end_date, event_start_time, event_end_time
        FROM $table_name 
        WHERE %s BETWEEN event_start_date AND event_end_date
    ", $date);

    $events = $wpdb->get_results($query);

    if (!empty($events)) {
        $data = [];
        foreach ($events as $event) {
            $data[] = [
                'id' => $event->event_id,
                'name' => $event->event_name,
                'status' => $event->event_status,
                'start_time' => $event->event_start_time,
                'end_time' => $event->event_end_time,
                'start_date' => $event->event_start_date,
                'end_date' => $event->event_end_date,
            ];
        }
        wp_send_json_success($data);
    } else {
        wp_send_json_error(['message' => 'Событий на эту дату нет']);
    }
    wp_die();
}



add_theme_support('custom-logo');
// add_theme_support('wp-event-manager');
add_theme_support('events-manager');