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
    wp_enqueue_style('select-custom', get_template_directory_uri() . '/assets/modules/select-custom/css/select-custom.css');
    wp_enqueue_style('multi-field', get_template_directory_uri() . '/assets/modules/multi-field-image/css/multi-field-image.css');
    wp_enqueue_style('add-event', get_template_directory_uri() . '/assets/css/add-event.css');
    wp_enqueue_style('events', get_template_directory_uri() . '/assets/css/events.css');
}

function event_calendar_scripts() {
    wp_deregister_script( 'jquery' );
    wp_register_script( 'jquery', "https://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
    wp_enqueue_script( 'jquery' );
    wp_enqueue_script( 'scripts', get_template_directory_uri() . '/assets/js/scripts.js', array('jquery'), null, true);
    wp_enqueue_script('select-custom', get_template_directory_uri() . '/assets/modules/select-custom/js/select-custom.js', array('jquery'), null, true);
    wp_enqueue_script('multi-field', get_template_directory_uri() . '/assets/modules/multi-field-image/js/multi-field-image.js', array('jquery'), null, true);
    // wp_script_add_data('multi-field', 'type', 'module');
    wp_enqueue_script( 'add-event', get_template_directory_uri() . '/assets/js/add-event.js', array('jquery'), null, true);
    wp_enqueue_script( 'events', get_template_directory_uri() . '/assets/js/events.js', array('jquery'), null, true);
    wp_localize_script('scripts', 'ajax_object_scripts', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
    ));
    wp_localize_script('add-event', 'ajax_object_addevent', array(
        'ajaxurl' => admin_url('admin-ajax.php'),
    ));
    wp_localize_script('events', 'ajax_object_events', array(
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
    } else {
        wp_send_json_error(['message' => 'Событий на эту дату нет', "table_name" => $table_name, "events" => $events, "Length" => count($events)]);
    }
    wp_die();
}


add_action('wp_ajax_events_info', 'get_events_info');
add_action('wp_ajax_nopriv_events_info', 'get_events_info');
function get_events_info() {
    global $wpdb;
    $custom_events = $wpdb->prefix . 'custom_events';
    $event_images = $wpdb->prefix . 'event_images';

    $query_events = $wpdb->prepare("SELECT event_id, event_name, event_status, event_date_start, event_date_end, event_time_start, event_time_end FROM $custom_events");

    $events = $wpdb->get_results($query_events);

    if (!empty($events)) {
        $data = [];
        foreach ($events as $event) {
            $list_images = [];
            $query_images = $wpdb->prepare("SELECT image_id, event_id, image_url, is_main FROM $event_images WHERE event_id = %s", $event->event_id);
            $images = $wpdb->get_results($query_iamges);
            foreach ($images as $image) {
                $list_images[] = [
                    'id' => $image->image_id,
                    'url' => $image->image_url,
                    'is_main' => $image->is_main,
                ];
            }
            $data[] = [
                'id' => $event->event_id,
                'name' => $event->event_name,
                'status' => $event->event_status,
                'start_time' => $event->event_time_start,
                'end_time' => $event->event_time_end,
                'start_date' => $event->event_date_start,
                'end_date' => $event->event_date_end,
                'images' => $list_images,
            ];
        }
        wp_send_json_success($data);
    } else {
        wp_send_json_error(['message' => 'Событий на эту дату нет', "table_name" => $table_name, "events" => $events, "Length" => count($events)]);
    }
    wp_die();
}





add_action('wp_ajax_add_custom_event', 'add_custom_event');
add_action('wp_ajax_nopriv_add_custom_event', 'add_custom_event');
function add_custom_event() {
    global $wpdb;
    // Получаем данные из AJAX-запроса
    $event_name = sanitize_text_field($_POST['event_name']);
    $event_description = sanitize_textarea_field($_POST['event_description']);
    $event_status = sanitize_text_field($_POST['event_status']);
    $event_date_start = sanitize_text_field($_POST['event_date_start']);
    $event_date_end = sanitize_text_field($_POST['event_date_end']);
    $event_time_start = sanitize_text_field($_POST['event_time_start']);
    $event_time_end = sanitize_text_field($_POST['event_time_end']);
    $event_price = floatval($_POST['event_price']);
    $event_access = sanitize_text_field($_POST['event_access']);
    $event_address = sanitize_text_field($_POST['event_address']);
    $event_city = sanitize_text_field($_POST['event_city']);
    $event_country = sanitize_text_field($_POST['event_country']);
    $event_zip_code = sanitize_text_field($_POST['event_zip_code']);
    $event_speakers = sanitize_textarea_field($_POST['event_speakers']);
    $event_tags = sanitize_text_field($_POST['event_tags']);

    // Вставляем событие в таблицу wp_custom_events
    $table_events = $wpdb->prefix . 'custom_events';
    $wpdb->insert($table_events, [
        'event_name' => $event_name,
        'event_description' => $event_description,
        'event_status' => $event_status,
        'event_date_start' => $event_date_start,
        'event_date_end' => $event_date_end,
        'event_time_start' => $event_time_start,
        'event_time_end' => $event_time_end,
        'event_price' => $event_price,
        'event_access' => $event_access,
        'event_address' => $event_address,
        'event_city' => $event_city,
        'event_country' => $event_country,
        'event_zip_code' => $event_zip_code,
        'event_speackers' => $event_speakers,
        'event_tags' => $event_tags,
    ]);

    // Получаем ID созданного события
    $event_id = $wpdb->insert_id;

    if (!$event_id) {
        wp_send_json_error(['message' => 'Ошибка при добавлении события']);
        wp_die();
    }

    // Загружаем изображения и добавляем их в таблицу wp_event_images
    if (!empty($_FILES['event_images'])) {
        $table_images = $wpdb->prefix . 'event_images';

        foreach ($_FILES['event_images']['name'] as $index => $filename) {
            if ($_FILES['event_images']['error'][$index] == 0) {
                $file = [
                    'name' => $_FILES['event_images']['name'][$index],
                    'type' => $_FILES['event_images']['type'][$index],
                    'tmp_name' => $_FILES['event_images']['tmp_name'][$index],
                    'error' => $_FILES['event_images']['error'][$index],
                    'size' => $_FILES['event_images']['size'][$index]
                ];

                // Загружаем файл в WordPress
                $upload = wp_handle_upload($file, ['test_form' => false]);

                if (!isset($upload['error'])) {
                    $image_url = $upload['url'];
                    $is_main = isset($_POST['is_main'][$index]) && $_POST['is_main'][$index] == 'true' ? 1 : 0;

                    // Вставляем запись в таблицу wp_event_images
                    $wpdb->insert($table_images, [
                        'event_id' => $event_id,
                        'image_url' => $image_url,
                        'is_main' => $is_main,
                    ]);
                }
            }
        }
    }

    wp_send_json_success(['message' => 'Событие и изображения успешно добавлены']);
    wp_die();
}


/* <?php echo do_action("create_events"); ?>*/
// Запуск функции при активации плагина / темы
function create_custom_events_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'custom_events';

    if ($wpdb->get_var("SHOW TABLES LIKE '$table_name'") != $table_name) {

            $charset_collate = $wpdb->get_charset_collate();
            require_once ABSPATH . 'wp-admin/includes/upgrade.php';

            $sql = "CREATE TABLE IF NOT EXISTS $table_name (
                event_id BIGINT(20) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
                event_name VARCHAR(255) NOT NULL,
                event_description TEXT NOT NULL,
                event_status VARCHAR(50) NOT NULL,
                event_date_start DATE NOT NULL,
                event_date_end DATE NOT NULL,
                event_time_start TIME NOT NULL,
                event_time_end TIME NOT NULL,
                event_price DECIMAL(10,2) NOT NULL,
                event_access VARCHAR(50) NOT NULL,
                event_address VARCHAR(255) NOT NULL,
                event_city VARCHAR(100) NOT NULL,
                event_country VARCHAR(100) NOT NULL,
                event_zip_code VARCHAR(20) NOT NULL,
                event_speackers TEXT NOT NULL,
                event_tags VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
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
add_theme_support('post-thumbnails');