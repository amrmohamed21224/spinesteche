<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Polylang
{
    /**
     * @param WP_REST_Request $request
     */
    public static function resolve_lang($request): string
    {
        $lang = $request->get_param('lang');
        if (!is_string($lang) || $lang === '') {
            $lang = 'ar';
        }
        $lang = sanitize_key($lang);
        if (!in_array($lang, ['ar', 'en'], true)) {
            $lang = 'ar';
        }
        return $lang;
    }

    public static function is_active(): bool
    {
        return function_exists('pll_current_language') && function_exists('PLL');
    }

    /**
     * @return array<string, mixed>
     */
    public static function query_args(string $post_type, string $lang): array
    {
        $args = [
            'post_type' => $post_type,
            'post_status' => 'publish',
            'posts_per_page' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC',
            'suppress_filters' => false,
        ];

        if (self::is_active()) {
            $args['lang'] = $lang;
        }

        return $args;
    }

    public static function get_posts(string $post_type, string $lang): array
    {
        return get_posts(self::query_args($post_type, $lang));
    }

    /**
     * @return WP_Post|null
     */
    public static function get_post_by_slug(string $post_type, string $slug, string $lang)
    {
        $posts = get_posts(array_merge(self::query_args($post_type, $lang), [
            'name' => sanitize_title($slug),
            'posts_per_page' => 1,
        ]));

        return $posts[0] ?? null;
    }
}
