<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Security
{
    private const RATE_LIMIT = 5;
    private const RATE_WINDOW = 60;

    public static function init(): void
    {
        add_filter('rest_pre_dispatch', [self::class, 'rate_limit_submissions'], 10, 3);
    }

    /**
     * @param mixed $result
     */
    /**
     * @param mixed           $result
     * @param WP_REST_Server  $server
     * @param WP_REST_Request $request
     */
    public static function rate_limit_submissions($result, $server, $request)
    {
        $route = $request->get_route();
        if (!is_string($route) || strpos($route, '/spinestech/v1/submissions/') === false) {
            return $result;
        }

        if ($request->get_method() !== 'POST') {
            return $result;
        }

        $ip = self::client_ip();
        $key = 'st_rate_' . md5($ip . $route);
        $count = (int) get_transient($key);

        if ($count >= self::RATE_LIMIT) {
            return new WP_Error(
                'st_rate_limited',
                'Too many requests. Please try again later.',
                ['status' => 429]
            );
        }

        set_transient($key, $count + 1, self::RATE_WINDOW);
        return $result;
    }

    private static function client_ip(): string
    {
        foreach (['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'REMOTE_ADDR'] as $header) {
            if (!empty($_SERVER[$header])) {
                $value = sanitize_text_field(wp_unslash((string) $_SERVER[$header]));
                if (strpos($value, ',') !== false) {
                    $value = trim(explode(',', $value)[0]);
                }
                return $value;
            }
        }
        return '0.0.0.0';
    }
}
