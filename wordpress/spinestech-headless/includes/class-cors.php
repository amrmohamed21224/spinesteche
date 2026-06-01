<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_CORS
{
    public static function init(): void
    {
        add_action('rest_api_init', [self::class, 'register_options'], 15);
        add_filter('rest_pre_serve_request', [self::class, 'send_headers'], 10, 4);
    }

    public static function register_options(): void
    {
        remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
        add_filter('rest_pre_serve_request', [self::class, 'send_headers'], 10, 4);
    }

    /**
     * @param mixed $served
     * @param mixed $result
     */
    public static function send_headers($served, $result, $request, $server)
    {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? sanitize_text_field(wp_unslash($_SERVER['HTTP_ORIGIN'])) : '';
        $allowed = self::allowed_origins();

        if ($origin !== '' && in_array($origin, $allowed, true)) {
            header('Access-Control-Allow-Origin: ' . $origin);
            header('Vary: Origin');
        }

        header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization, X-WP-Nonce');
        header('Access-Control-Allow-Credentials: true');

        if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            status_header(204);
            exit;
        }

        return $served;
    }

    /**
     * @return list<string>
     */
    public static function allowed_origins(): array
    {
        $stored = get_option('st_cors_origins', '');
        $lines = array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', (string) $stored) ?: []));

        $defaults = [
            'http://localhost:8080',
            'http://127.0.0.1:8080',
            'https://spinestech.sa',
            'https://www.spinestech.sa',
        ];

        return array_values(array_unique(array_merge($defaults, $lines)));
    }
}
