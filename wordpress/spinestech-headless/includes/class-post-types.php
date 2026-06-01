<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Post_Types
{
    public const SERVICE = 'st_service';
    public const PRODUCT = 'st_product';
    public const SECTOR = 'st_sector';
    public const CASE_STUDY = 'st_case_study';
    public const PRICING = 'st_pricing';
    public const FAQ = 'st_faq';
    public const JOB = 'st_job';
    public const TESTIMONIAL = 'st_testimonial';
    public const TEAM = 'st_team';
    public const SUBMISSION = 'st_submission';

    public static function register(): void
    {
        $common = [
            'public' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'supports' => ['title', 'editor', 'excerpt', 'thumbnail', 'custom-fields'],
            'has_archive' => false,
        ];

        register_post_type(self::SERVICE, array_merge($common, [
            'label' => 'Services',
            'menu_icon' => 'dashicons-admin-tools',
            'rewrite' => ['slug' => 'services'],
        ]));

        register_post_type(self::PRODUCT, array_merge($common, [
            'label' => 'Products',
            'menu_icon' => 'dashicons-products',
            'rewrite' => ['slug' => 'products'],
        ]));

        register_post_type(self::SECTOR, array_merge($common, [
            'label' => 'Sectors',
            'menu_icon' => 'dashicons-building',
            'rewrite' => ['slug' => 'sectors'],
        ]));

        register_post_type(self::CASE_STUDY, array_merge($common, [
            'label' => 'Case Studies',
            'menu_icon' => 'dashicons-portfolio',
            'rewrite' => ['slug' => 'case-studies'],
        ]));

        register_post_type(self::PRICING, array_merge($common, [
            'label' => 'Pricing Plans',
            'menu_icon' => 'dashicons-money-alt',
            'rewrite' => ['slug' => 'pricing'],
        ]));

        register_post_type(self::FAQ, array_merge($common, [
            'label' => 'FAQs',
            'menu_icon' => 'dashicons-editor-help',
            'rewrite' => ['slug' => 'faqs'],
        ]));

        register_post_type(self::JOB, array_merge($common, [
            'label' => 'Jobs',
            'menu_icon' => 'dashicons-id-alt',
            'rewrite' => ['slug' => 'jobs'],
        ]));

        register_post_type(self::TESTIMONIAL, array_merge($common, [
            'label' => 'Testimonials',
            'menu_icon' => 'dashicons-format-quote',
            'rewrite' => ['slug' => 'testimonials'],
        ]));

        register_post_type(self::TEAM, array_merge($common, [
            'label' => 'Team',
            'menu_icon' => 'dashicons-groups',
            'rewrite' => ['slug' => 'team'],
        ]));

        register_post_type(self::SUBMISSION, [
            'label' => 'Form Submissions',
            'public' => false,
            'show_ui' => true,
            'show_in_rest' => false,
            'supports' => ['title'],
            'menu_icon' => 'dashicons-email',
            'capability_type' => 'post',
        ]);

        if (function_exists('pll_register_post_type')) {
            foreach ([self::SERVICE, self::PRODUCT, self::SECTOR, self::CASE_STUDY, self::PRICING, self::FAQ, self::JOB, self::TESTIMONIAL, self::TEAM] as $type) {
                pll_register_post_type($type);
            }
        }
    }
}
