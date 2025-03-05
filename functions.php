<?php 
add_action('wp_enqueue_scripts', 'event_calendar_styles');
add_action('wp_enqueue_scripts', 'event_calendar_scripts');
add_action('after_setup_theme', 'event_calendar_nav_menu');
add_action('after_switch_theme', 'create_custom_events_table');
add_action('after_switch_theme', 'create_event_images_table');


function event_calendar_nav_menu() {
    register_nav_menu( 'top', 'menu in header' );
    register_nav_menu( 'bottom', 'menu in footer' );
}


function event_calendar_styles() {
    wp_enqueue_style('null-style', get_template_directory_uri() . '/assets/css/null-style.css');
    wp_enqueue_style('main-style', get_template_directory_uri() . '/assets/css/main-style.css');
    wp_enqueue_style('calendar', get_template_directory_uri() . '/assets/css/calendar.css');
    wp_enqueue_style('add-event', get_template_directory_uri() . '/assets/css/add-event.css');
    wp_enqueue_style('multi-field', get_template_directory_uri() . '/assets/modules/multi-field-image/css/multi-field-image.css');
}

function event_calendar_scripts() {
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array('jquery'), null, true);
    wp_enqueue_script('multi-field', get_template_directory_uri() . '/assets/modules/multi-field-image/js/multi-field-image.js', array('jquery'), null, true);
    // wp_script_add_data('multi-field', 'type', 'module');
    wp_enqueue_script( 'add-event', get_template_directory_uri() . '/assets/js/add-event.js', array('jquery'), null, true);
    wp_localize_script('scripts', 'ajax_object', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
    ));
}

// add_filter('event_manager_locate_template', function ($template, $template_name, $template_path) {
//     $theme_template = get_stylesheet_directory() . '/events-manager/' . $template_name;

//     if (file_exists($theme_template)) {
//         error_log('Шаблон загружен из темы: ' . $theme_template);
//         return $theme_template;
//     }

//     return $template;
// }, 20, 3);


add_filter( 'get_all_event_organizer_args', 'wpem_all_event_organizer_args', 10 );
function wpem_all_event_organizer_args($args) {
    if(isset($args['author']))
    unset($args['author']);
    return $args;
}


add_action('wp_ajax_calendar', 'get_calendar_data');
add_action('wp_ajax_nopriv_calendar', 'get_calendar_data');
function get_calendar_data() {
    if (!isset($_POST['eventDate'])) {
        wp_send_json_error(['message' => 'Дата не передана']);
    }

    global $wpdb;
    $date = sanitize_text_field($_POST['eventDate']);
    $table_name = $wpdb->prefix . 'custom_events';

    $query = $wpdb->prepare("SELECT event_id, event_name, event_status, event_date_start, event_date_end, event_time_start, event_time_end
    FROM $table_name
    WHERE %s BETWEEN event_date_start AND event_date_end
    ", $date);
    // $query = $wpdb->prepare("SELECT * FROM $table_name");

    $events = $wpdb->get_results($query);

    if (!empty($events)) {
        $data = [];
        foreach ($events as $event) {
            $data[] = [
                'id' => $event->event_id,
                'name' => $event->event_name,
                'status' => $event->event_status,
                'start_time' => $event->event_time_start,
                'end_time' => $event->event_time_end,
                'start_date' => $event->event_date_start,
                'end_date' => $event->event_date_end,
            ];
        }
        wp_send_json_success($data);
        // wp_send_json_success(['message' => 'Событий на эту дату нет', "table_name" => $table_name, "events" => $events, "Length" => count($events)]);
    } else {
        wp_send_json_error(['message' => 'Событий на эту дату нет', "table_name" => $table_name, "events" => $events, "Length" => count($events)]);
    }
    wp_die();
}

function add_custom_event() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_events';

    // Преобразуем массив изображений в JSON
    $images_json = json_encode($images);

    // Вставляем событие в таблицу
    $wpdb->insert($table_name, [
        'event_name' => sanitize_text_field($name),
        'event_start_date' => $start_date,
        'event_end_date' => $end_date,
        'event_location' => sanitize_text_field($location),
        'event_description' => wp_kses_post($description),
        'event_time_start' => wp_kses_post($description),
        'event_time_end' => wp_kses_post($description),
        'event_images' => $images_json, // Сохраняем JSON
    ]);

    return $wpdb->insert_id;
}


// add_action('wp_ajax_create_events', 'create_custom_events_table');
// add_action('wp_ajax_nopriv_create_events', 'create_custom_events_table');
/* <?php echo do_action("create_events"); ?>*/
// Запуск функции при активации плагина / темы
function create_custom_events_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_events';

    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {

            $charset_collate = $wpdb->get_charset_collate();
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';

            $sql = "CREATE TABLE $table_name (
                event_id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT,
                event_name VARCHAR(255) NOT NULL,
                event_description TEXT NOT NULL,
                event_status INT NOT NULL DEFAULT 1,
                event_date_start DATE NOT NULL,
                event_date_end DATE NOT NULL,
                event_time_start TIME NOT NULL,
                event_time_end TIME NOT NULL,
                event_images TEXT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (event_id)
            ) $charset_collate;";
            
            dbDelta($sql);
    }
}


function create_event_images_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'event_images'; // Название таблицы
    $events_table_name = $wpdb->prefix . 'custom_events'; // Название основной таблицы

    // Проверяем, существует ли таблица
    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {

        $charset_collate = $wpdb->get_charset_collate();
        require_once ABSPATH . 'wp-admin/includes/upgrade.php';

        $sql = "CREATE TABLE $table_name (
            image_id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            event_id BIGINT(20) UNSIGNED NOT NULL,
            image_url VARCHAR(255) NOT NULL,
            is_main BOOLEAN NOT NULL DEFAULT FALSE,
            FOREIGN KEY (event_id) REFERENCES $events_table_name(event_id) ON DELETE CASCADE
        ) $charset_collate;";

        dbDelta($sql);
    }
}



add_theme_support('custom-logo');
// add_theme_support('wp-event-manager');
add_theme_support('events-manager');