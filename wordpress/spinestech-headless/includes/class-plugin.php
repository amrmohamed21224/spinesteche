<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Plugin
{
    private static ?self $instance = null;

    public static function instance(): self
    {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct()
    {
        $this->load_dependencies();
        $this->init_hooks();
    }

    private function load_dependencies(): void
    {
        require_once ST_HEADLESS_PATH . 'includes/class-post-types.php';
        require_once ST_HEADLESS_PATH . 'includes/class-polylang.php';
        require_once ST_HEADLESS_PATH . 'includes/class-cors.php';
        require_once ST_HEADLESS_PATH . 'includes/class-security.php';
        require_once ST_HEADLESS_PATH . 'includes/class-meta.php';
        require_once ST_HEADLESS_PATH . 'includes/class-mappers.php';
        require_once ST_HEADLESS_PATH . 'includes/class-submissions.php';
        require_once ST_HEADLESS_PATH . 'includes/class-rest-controller.php';
        require_once ST_HEADLESS_PATH . 'includes/class-acf-fields.php';
        require_once ST_HEADLESS_PATH . 'includes/class-options.php';
    }

    private function init_hooks(): void
    {
        add_action('init', [SpinesTech_Headless_Post_Types::class, 'register']);
        add_action('rest_api_init', [SpinesTech_Headless_REST_Controller::class, 'register_routes']);
        add_action('acf/init', [SpinesTech_Headless_ACF_Fields::class, 'register']);
        add_action('admin_menu', [SpinesTech_Headless_Options::class, 'register_menu']);
        add_action('admin_init', [SpinesTech_Headless_Options::class, 'register_settings']);

        SpinesTech_Headless_CORS::init();
        SpinesTech_Headless_Security::init();
    }
}
