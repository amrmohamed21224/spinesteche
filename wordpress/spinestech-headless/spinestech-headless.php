<?php
/**
 * Plugin Name: SpinesTech Headless
 * Description: Headless REST API for SpinesTech React frontend (content + forms + Polylang).
 * Version: 1.0.1
 * Author: SpinesTech
 * Text Domain: spinestech-headless
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

if (!defined('ABSPATH')) {
    exit;
}

if (version_compare(PHP_VERSION, '7.4', '<')) {
    add_action('admin_notices', static function (): void {
        echo '<div class="notice notice-error"><p><strong>SpinesTech Headless</strong> requires PHP 7.4 or newer. Your server is running PHP ' . esc_html(PHP_VERSION) . '.</p></div>';
    });
    return;
}

define('ST_HEADLESS_VERSION', '1.0.1');
define('ST_HEADLESS_PATH', plugin_dir_path(__FILE__));
define('ST_HEADLESS_URL', plugin_dir_url(__FILE__));

require_once ST_HEADLESS_PATH . 'includes/class-post-types.php';
require_once ST_HEADLESS_PATH . 'includes/class-plugin.php';

register_activation_hook(__FILE__, static function (): void {
    SpinesTech_Headless_Post_Types::register();
    flush_rewrite_rules();
});

SpinesTech_Headless_Plugin::instance();
