<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Meta
{
    public static function get_string(int $post_id, string $key, string $default = ''): string
    {
        $value = get_post_meta($post_id, $key, true);
        return is_string($value) && $value !== '' ? $value : $default;
    }

    public static function get_int(int $post_id, string $key, int $default = 0): int
    {
        $value = get_post_meta($post_id, $key, true);
        return is_numeric($value) ? (int) $value : $default;
    }

    public static function get_bool(int $post_id, string $key, bool $default = false): bool
    {
        $value = get_post_meta($post_id, $key, true);
        if ($value === '' || $value === null) {
            return $default;
        }
        return filter_var($value, FILTER_VALIDATE_BOOLEAN);
    }

    /**
     * @return list<string>
     */
    public static function get_string_list(int $post_id, string $key): array
    {
        $value = get_post_meta($post_id, $key, true);
        if (is_array($value)) {
            return array_values(array_filter(array_map('strval', $value)));
        }
        if (is_string($value) && $value !== '') {
            $decoded = json_decode($value, true);
            if (is_array($decoded)) {
                return array_values(array_filter(array_map('strval', $decoded)));
            }
            return array_values(array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $value) ?: [])));
        }
        return [];
    }

    public static function image_url(int $post_id, string $meta_key = 'st_image'): string
    {
        $url = self::get_string($post_id, $meta_key);
        if ($url !== '') {
            return $url;
        }
        $thumb = get_the_post_thumbnail_url($post_id, 'large');
        return is_string($thumb) ? $thumb : '';
    }
}
