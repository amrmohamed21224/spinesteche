<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Options
{
    public static function register_menu(): void
    {
        add_menu_page(
            'SpinesTech Headless',
            'SpinesTech',
            'manage_options',
            'spinestech-headless',
            [self::class, 'render_page'],
            'dashicons-admin-site-alt3',
            58
        );
    }

    public static function register_settings(): void
    {
        register_setting('spinestech_headless', 'st_form_recipient_email', [
            'type' => 'string',
            'sanitize_callback' => 'sanitize_email',
        ]);
        register_setting('spinestech_headless', 'st_cors_origins', [
            'type' => 'string',
            'sanitize_callback' => [self::class, 'sanitize_multiline'],
        ]);
        register_setting('spinestech_headless', 'st_site_name');
        register_setting('spinestech_headless', 'st_site_url', [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_setting('spinestech_headless', 'st_tagline');
        register_setting('spinestech_headless', 'st_logo', [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_setting('spinestech_headless', 'st_contact_email', [
            'sanitize_callback' => 'sanitize_email',
        ]);
        register_setting('spinestech_headless', 'st_contact_phone');
        register_setting('spinestech_headless', 'st_office_address');
        register_setting('spinestech_headless', 'st_social_twitter', [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_setting('spinestech_headless', 'st_social_linkedin', [
            'sanitize_callback' => 'esc_url_raw',
        ]);
        register_setting('spinestech_headless', 'st_social_github', [
            'sanitize_callback' => 'esc_url_raw',
        ]);
    }

    public static function sanitize_multiline(string $value): string
    {
        $lines = array_filter(array_map('trim', preg_split('/\r\n|\r|\n/', $value) ?: []));
        return implode("\n", array_map('esc_url_raw', $lines));
    }

    public static function render_page(): void
    {
        if (!current_user_can('manage_options')) {
            return;
        }
        ?>
        <div class="wrap">
            <h1>SpinesTech Headless API</h1>
            <p>REST base: <code><?php echo esc_html(rest_url('spinestech/v1')); ?></code></p>
            <form method="post" action="options.php">
                <?php settings_fields('spinestech_headless'); ?>
                <table class="form-table">
                    <tr>
                        <th><label for="st_form_recipient_email">Form notification email</label></th>
                        <td><input type="email" class="regular-text" id="st_form_recipient_email" name="st_form_recipient_email" value="<?php echo esc_attr((string) get_option('st_form_recipient_email', get_option('admin_email'))); ?>" /></td>
                    </tr>
                    <tr>
                        <th><label for="st_cors_origins">Extra CORS origins (one per line)</label></th>
                        <td><textarea class="large-text" rows="4" id="st_cors_origins" name="st_cors_origins"><?php echo esc_textarea((string) get_option('st_cors_origins', '')); ?></textarea></td>
                    </tr>
                    <tr>
                        <th><label for="st_contact_email">Public contact email</label></th>
                        <td><input type="email" class="regular-text" id="st_contact_email" name="st_contact_email" value="<?php echo esc_attr((string) get_option('st_contact_email', '')); ?>" /></td>
                    </tr>
                    <tr>
                        <th><label for="st_contact_phone">Public contact phone</label></th>
                        <td><input type="text" class="regular-text" id="st_contact_phone" name="st_contact_phone" value="<?php echo esc_attr((string) get_option('st_contact_phone', '')); ?>" /></td>
                    </tr>
                    <tr>
                        <th><label for="st_office_address">Office address</label></th>
                        <td><input type="text" class="large-text" id="st_office_address" name="st_office_address" value="<?php echo esc_attr((string) get_option('st_office_address', '')); ?>" /></td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}
