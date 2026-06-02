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
        self::sector_fields();
        self::case_study_fields();
        self::pricing_fields();
        self::job_fields();
        self::testimonial_fields();
        self::team_fields();
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

    private static function sector_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_sector',
            'title' => 'Sector Fields',
            'fields' => [
                ['key' => 'field_st_sector_icon', 'label' => 'Icon', 'name' => 'st_icon', 'type' => 'text'],
                ['key' => 'field_st_sector_tags', 'label' => 'Tags', 'name' => 'st_tags', 'type' => 'textarea', 'instructions' => 'One per line'],
                ['key' => 'field_st_sector_layout', 'label' => 'Layout', 'name' => 'st_layout', 'type' => 'select', 'choices' => [
                    'default' => 'Default',
                    'featured' => 'Featured',
                    'tall' => 'Tall',
                    'accent' => 'Accent',
                ], 'default_value' => 'default'],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::SECTOR]]],
        ]);
    }

    private static function case_study_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_case_study',
            'title' => 'Case Study Fields',
            'fields' => [
                ['key' => 'field_st_client', 'label' => 'Client', 'name' => 'st_client', 'type' => 'text'],
                ['key' => 'field_st_sector_name', 'label' => 'Sector', 'name' => 'st_sector', 'type' => 'text'],
                ['key' => 'field_st_challenge', 'label' => 'Challenge', 'name' => 'st_challenge', 'type' => 'textarea'],
                ['key' => 'field_st_solution', 'label' => 'Solution', 'name' => 'st_solution', 'type' => 'textarea'],
                ['key' => 'field_st_result', 'label' => 'Result', 'name' => 'st_result', 'type' => 'textarea'],
                ['key' => 'field_st_stats', 'label' => 'Stats JSON', 'name' => 'st_stats', 'type' => 'textarea', 'instructions' => 'Example: [{"label":"ROI","value":"+35%"}]'],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::CASE_STUDY]]],
        ]);
    }

    private static function pricing_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_pricing',
            'title' => 'Pricing Fields',
            'fields' => [
                ['key' => 'field_st_tier', 'label' => 'Tier', 'name' => 'st_tier', 'type' => 'text'],
                ['key' => 'field_st_pricing_features', 'label' => 'Features', 'name' => 'st_features', 'type' => 'textarea', 'instructions' => 'One per line'],
                ['key' => 'field_st_recommended', 'label' => 'Recommended', 'name' => 'st_recommended', 'type' => 'true_false'],
                ['key' => 'field_st_cta_text', 'label' => 'CTA Text', 'name' => 'st_cta_text', 'type' => 'text'],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::PRICING]]],
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

    private static function testimonial_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_testimonial',
            'title' => 'Testimonial Fields',
            'fields' => [
                ['key' => 'field_st_testimonial_name', 'label' => 'Name', 'name' => 'st_name', 'type' => 'text'],
                ['key' => 'field_st_role', 'label' => 'Role', 'name' => 'st_role', 'type' => 'text'],
                ['key' => 'field_st_company', 'label' => 'Company', 'name' => 'st_company', 'type' => 'text'],
                ['key' => 'field_st_quote', 'label' => 'Quote', 'name' => 'st_quote', 'type' => 'textarea'],
                ['key' => 'field_st_rating', 'label' => 'Rating', 'name' => 'st_rating', 'type' => 'number', 'min' => 1, 'max' => 5, 'default_value' => 5],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::TESTIMONIAL]]],
        ]);
    }

    private static function team_fields(): void
    {
        acf_add_local_field_group([
            'key' => 'group_st_team',
            'title' => 'Team Member Fields',
            'fields' => [
                ['key' => 'field_st_team_role', 'label' => 'Role', 'name' => 'st_role', 'type' => 'text'],
                ['key' => 'field_st_bio', 'label' => 'Bio', 'name' => 'st_bio', 'type' => 'textarea'],
                ['key' => 'field_st_linkedin', 'label' => 'LinkedIn', 'name' => 'st_linkedin', 'type' => 'url'],
                ['key' => 'field_st_twitter', 'label' => 'Twitter / X', 'name' => 'st_twitter', 'type' => 'url'],
            ],
            'location' => [[['param' => 'post_type', 'operator' => '==', 'value' => SpinesTech_Headless_Post_Types::TEAM]]],
        ]);
    }
}
