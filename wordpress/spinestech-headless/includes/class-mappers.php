<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Mappers
{
    public static function service($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'title' => get_the_title($post),
            'description' => get_the_excerpt($post) ?: wp_strip_all_tags($post->post_content),
            'icon' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_icon', 'code'),
            'slug' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'details' => SpinesTech_Headless_Meta::get_string_list($post->ID, 'st_details'),
            'features' => SpinesTech_Headless_Meta::get_string_list($post->ID, 'st_features'),
        ];
    }

    public static function product($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'title' => get_the_title($post),
            'description' => get_the_excerpt($post) ?: wp_strip_all_tags($post->post_content),
            'icon' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_icon', 'inventory_2'),
            'slug' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'badge' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_badge'),
            'features' => SpinesTech_Headless_Meta::get_string_list($post->ID, 'st_features'),
            'ctaPrimary' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_cta_primary', 'Request demo'),
            'ctaSecondary' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_cta_secondary'),
        ];
    }

    public static function sector($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'title' => get_the_title($post),
            'description' => get_the_excerpt($post) ?: wp_strip_all_tags($post->post_content),
            'icon' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_icon', 'domain'),
            'slug' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'image' => SpinesTech_Headless_Meta::image_url($post->ID),
            'tags' => SpinesTech_Headless_Meta::get_string_list($post->ID, 'st_tags'),
            'layout' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_layout', 'default'),
        ];
    }

    public static function case_study($post): array
    {
        $stats_raw = get_post_meta($post->ID, 'st_stats', true);
        $stats = [];
        if (is_string($stats_raw) && $stats_raw !== '') {
            $decoded = json_decode($stats_raw, true);
            if (is_array($decoded)) {
                $stats = $decoded;
            }
        }

        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'title' => get_the_title($post),
            'client' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_client'),
            'sector' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_sector'),
            'image' => SpinesTech_Headless_Meta::image_url($post->ID),
            'slug' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'challenge' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_challenge'),
            'solution' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_solution'),
            'result' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_result'),
            'stats' => $stats,
        ];
    }

    public static function pricing($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'name' => get_the_title($post),
            'tier' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_tier'),
            'description' => get_the_excerpt($post) ?: wp_strip_all_tags($post->post_content),
            'features' => SpinesTech_Headless_Meta::get_string_list($post->ID, 'st_features'),
            'recommended' => SpinesTech_Headless_Meta::get_bool($post->ID, 'st_recommended'),
            'ctaText' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_cta_text', 'Get started'),
        ];
    }

    public static function faq($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'question' => get_the_title($post),
            'answer' => wp_strip_all_tags($post->post_content),
        ];
    }

    public static function job($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'title' => get_the_title($post),
            'department' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_department'),
            'location' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_location'),
            'type' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_type', 'Full-time'),
            'experience' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_experience'),
            'slug' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'description' => get_the_excerpt($post) ?: wp_strip_all_tags($post->post_content),
            'requirements' => SpinesTech_Headless_Meta::get_string_list($post->ID, 'st_requirements'),
            'benefits' => SpinesTech_Headless_Meta::get_string_list($post->ID, 'st_benefits'),
        ];
    }

    public static function testimonial($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'name' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_name', get_the_title($post)),
            'role' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_role'),
            'company' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_company'),
            'avatar' => SpinesTech_Headless_Meta::image_url($post->ID, 'st_avatar'),
            'quote' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_quote', wp_strip_all_tags($post->post_content)),
            'rating' => SpinesTech_Headless_Meta::get_int($post->ID, 'st_rating', 5),
        ];
    }

    public static function team_member($post): array
    {
        return [
            'id' => get_post_field('post_name', $post) ?: (string) $post->ID,
            'name' => get_the_title($post),
            'role' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_role'),
            'avatar' => SpinesTech_Headless_Meta::image_url($post->ID, 'st_avatar'),
            'bio' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_bio', get_the_excerpt($post)),
            'socials' => [
                'linkedin' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_linkedin'),
                'twitter' => SpinesTech_Headless_Meta::get_string($post->ID, 'st_twitter'),
            ],
        ];
    }

    public static function about(string $lang): array
    {
        $prefix = 'st_about_' . $lang . '_';

        $core_values = get_option($prefix . 'core_values', []);
        $differentiators = get_option($prefix . 'differentiators', []);
        $markets = get_option($prefix . 'markets', []);
        $stats = get_option($prefix . 'stats', []);

        if (!is_array($core_values)) {
            $core_values = [];
        }
        if (!is_array($differentiators)) {
            $differentiators = [];
        }
        if (!is_array($markets)) {
            $markets = [];
        }
        if (!is_array($stats)) {
            $stats = [];
        }

        return [
            'mission' => (string) get_option($prefix . 'mission', ''),
            'vision' => (string) get_option($prefix . 'vision', ''),
            'coreValues' => $core_values,
            'differentiators' => $differentiators,
            'markets' => $markets,
            'stats' => $stats,
        ];
    }

    public static function navigation(): array
    {
        $raw = get_option('st_navigation', []);
        if (!is_array($raw)) {
            return self::default_navigation();
        }
        return $raw;
    }

    public static function settings(): array
    {
        return [
            'siteName' => (string) get_option('st_site_name', 'SpinesTech'),
            'siteUrl' => (string) get_option('st_site_url', home_url('/')),
            'tagline' => (string) get_option('st_tagline', ''),
            'logo' => (string) get_option('st_logo', ''),
            'contactEmail' => (string) get_option('st_contact_email', get_option('admin_email')),
            'contactPhone' => (string) get_option('st_contact_phone', ''),
            'socials' => [
                'twitter' => (string) get_option('st_social_twitter', ''),
                'linkedin' => (string) get_option('st_social_linkedin', ''),
                'github' => (string) get_option('st_social_github', ''),
            ],
            'officeAddress' => (string) get_option('st_office_address', ''),
        ];
    }

    /**
     * @return list<array<string, mixed>>
     */
    private static function default_navigation(): array
    {
        return [
            ['id' => 'nav-1', 'label' => 'Home', 'href' => '/', 'order' => 1],
            ['id' => 'nav-2', 'label' => 'About', 'href' => '/about', 'order' => 2],
            ['id' => 'nav-3', 'label' => 'Services', 'href' => '/services', 'order' => 3],
            ['id' => 'nav-4', 'label' => 'Products', 'href' => '/products', 'order' => 4],
            ['id' => 'nav-5', 'label' => 'Sectors', 'href' => '/sectors', 'order' => 5],
            ['id' => 'nav-6', 'label' => 'Case Studies', 'href' => '/case-studies', 'order' => 6],
            ['id' => 'nav-7', 'label' => 'Careers', 'href' => '/careers', 'order' => 8],
        ];
    }
}
