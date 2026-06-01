<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

/**
 * Registers ACF field groups when Advanced Custom Fields is active.
 * Meta keys match post_meta used by REST mappers (st_*).
 */
final class SpinesTech_Headless_ACF_Fields
{
    public static function register(): void
    {
        if (!function_exists('acf_add_local_field_group')) {
            return;
        }

        self::service_fields();
        self::product_fields();
        self::job_fields();
    }

    private static function service_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_service',
            'title' => 'Service Fields',
            'fields' => [
                ['key' => 'field_st_icon', 'label' => 'Icon (Material)', 'name' => 'st_icon', 'type' => 'text'],
                ['key' => 'field_st_features', 'label' => 'Features', 'name' => 'st_features', 'type' => 'textarea', 'instructions' => 'One per line'],
                ['key' => 'field_st_details', 'label' => 'Details', 'name' => 'st_details', 'type' => 'textarea', 'instructions' => 'One per line'],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::SERVICE]]],
        ]);
    }

    private static function product_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_product',
            'title' => 'Product Fields',
            'fields' => [
                ['key' => 'field_st_prod_icon', 'label' => 'Icon', 'name' => 'st_icon', 'type' => 'text'],
                ['key' => 'field_st_badge', 'label' => 'Badge', 'name' => 'st_badge', 'type' => 'text'],
                ['key' => 'field_st_prod_features', 'label' => 'Features', 'name' => 'st_features', 'type' => 'textarea'],
                ['key' => 'field_st_cta_primary', 'label' => 'CTA Primary', 'name' => 'st_cta_primary', 'type' => 'text'],
                ['key' => 'field_st_cta_secondary', 'label' => 'CTA Secondary', 'name' => 'st_cta_secondary', 'type' => 'text'],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::PRODUCT]]],
        ]);
    }

    private static function job_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_job',
            'title' => 'Job Fields',
            'fields' => [
                ['key' => 'field_st_department', 'label' => 'Department', 'name' => 'st_department', 'type' => 'text'],
                ['key' => 'field_st_location', 'label' => 'Location', 'name' => 'st_location', 'type' => 'text'],
                ['key' => 'field_st_type', 'label' => 'Type', 'name' => 'st_type', 'type' => 'text'],
                ['key' => 'field_st_experience', 'label' => 'Experience', 'name' => 'st_experience', 'type' => 'text'],
                ['key' => 'field_st_requirements', 'label' => 'Requirements', 'name' => 'st_requirements', 'type' => 'textarea'],
                ['key' => 'field_st_benefits', 'label' => 'Benefits', 'name' => 'st_benefits', 'type' => 'textarea'],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::JOB]]],
        ]);
    }
}
