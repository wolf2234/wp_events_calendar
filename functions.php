<?php 
add_action('wp_enqueue_scripts', 'event_calendar_styles');
add_action('wp_enqueue_scripts', 'event_calendar_scripts');
add_action('after_setup_theme', 'event_calendar_nav_menu');
add_theme_support('custom-logo');


function event_calendar_nav_menu() {
    register_nav_menu( 'top', 'menu in header' );
    register_nav_menu( 'bottom', 'menu in footer' );
}


add_filter('single_template', function($template) {
    if (get_post_type() == 'event_listing') {
        $new_template = locate_template(array('custom-event-template.php'));
        if (!empty($new_template)) {
            return $new_template;
        }
    }
    return $template;
});



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


add_action( 'event_manager_event_filters_search_events_end', 'filter_by_country_field' );
function filter_by_country_field() { ?>
<div class="wpem-row">
    <div class="wpem-col">
        <div class="wpem-form-group">
                <div class="search_event_types">
                <label for="search_event_types" class="wpem-form-label"><?php _e( 'Country', 'event_manager' ); ?></label>
                <select name="filter_by_country" class="event-manager-filter">
                    <option value=""><?php _e( 'Select country', 'event_manager' ); ?></option>
                    <option value="de"><?php _e( 'Germany', 'event_manager' ); ?></option>
                    <option value="in"><?php _e( 'India', 'event_manager' ); ?></option>
                    <option value="us"><?php _e( 'USA', 'event_manager' ); ?></option>
                </select>
            </div>
        </div>
    </div>
</div>
<?php 
}


add_filter( 'event_manager_get_listings', 'filter_by_country_field_query_args', 10, 2 );
function filter_by_country_field_query_args( $query_args, $args ) {
    if ( isset( $_POST['form_data'] ) ) {
        parse_str( $_POST['form_data'], $form_data );
        // If this is set, we are filtering by country
        if ( ! empty( $form_data['filter_by_country'] ) ) {
            $event_country = sanitize_text_field( $form_data['filter_by_country'] );
            $query_args['meta_query'][] = array(
                        'key'     => '_event_country',
                        'value'   => $event_country,
                        );
        }
    }
    return $query_args;
}
