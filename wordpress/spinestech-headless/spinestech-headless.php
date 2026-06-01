<?php
/**
 * Plugin Name: SpinesTech Headless
 * Description: Headless REST API for SpinesTech React frontend (content + forms + Polylang).
 * Version: 1.0.0
 * Author: SpinesTech
 * Text Domain: spinestech-headless
 * Requires at least: 6.0
 * Requires PHP: 8.0
 */

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

define('ST_HEADLESS_VERSION', '1.0.0');
define('ST_HEADLESS_PATH', plugin_dir_path(__FILE__));
define('ST_HEADLESS_URL', plugin_dir_url(__FILE__));

require_once ST_HEADLESS_PATH . 'includes/class-plugin.php';

SpinesTech_Headless_Plugin::instance();
