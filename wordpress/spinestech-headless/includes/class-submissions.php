<?php

declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_Submissions
{
    public static function register_routes(string $namespace): void
    {
        register_rest_route($namespace, '/submissions/contact', [
            'methods' => 'POST',
            'callback' => [self::class, 'contact'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($namespace, '/submissions/career', [
            'methods' => 'POST',
            'callback' => [self::class, 'career'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($namespace, '/submissions/quote', [
            'methods' => 'POST',
            'callback' => [self::class, 'quote'],
            'permission_callback' => '__return_true',
        ]);
    }

    /**
     * @return WP_REST_Response|WP_Error
     */
    public static function contact($request)
    {
        $body = $request->get_json_params();
        if (!is_array($body)) {
            $body = $request->get_body_params();
        }

        $name = sanitize_text_field((string) ($body['name'] ?? ''));
        $email = sanitize_email((string) ($body['email'] ?? ''));
        $phone = sanitize_text_field((string) ($body['phone'] ?? ''));
        $company = sanitize_text_field((string) ($body['company'] ?? ''));
        $message = sanitize_textarea_field((string) ($body['message'] ?? ''));
        $source = sanitize_text_field((string) ($body['source'] ?? 'contact'));
        $locale = sanitize_key((string) ($body['locale'] ?? 'ar'));
        $honeypot = sanitize_text_field((string) ($body['website'] ?? $body['url'] ?? ''));

        if ($honeypot !== '') {
            return new WP_Error('validation_error', 'Invalid submission', ['status' => 400]);
        }

        if ($name === '' || $email === '' || $message === '') {
            return new WP_Error('validation_error', 'Missing required fields', ['status' => 400]);
        }

        if (!is_email($email)) {
            return new WP_Error('validation_error', 'Invalid email', ['status' => 400]);
        }

        $payload = compact('name', 'email', 'phone', 'company', 'message', 'source', 'locale');
        $type = $source === 'consultation' ? 'consultation' : 'contact';

        self::store_submission($type, $payload, $name . ' — ' . $email);
        self::send_notification_email($type, $payload);

        return new WP_REST_Response([
            'success' => true,
            'message' => $locale === 'en'
                ? 'Your message was received! We will contact you soon.'
                : 'تم استلام رسالتك بنجاح! وسنتواصل معك قريباً.',
        ], 200);
    }

    /**
     * @return WP_REST_Response|WP_Error
     */
    public static function career($request)
    {
        $params = $request->get_params();
        $files = $request->get_file_params();

        $name = sanitize_text_field((string) ($params['name'] ?? ''));
        $email = sanitize_email((string) ($params['email'] ?? ''));
        $phone = sanitize_text_field((string) ($params['phone'] ?? ''));
        $position = sanitize_text_field((string) ($params['position'] ?? $params['job'] ?? ''));
        $locale = sanitize_key((string) ($params['locale'] ?? 'ar'));
        $honeypot = sanitize_text_field((string) ($params['website'] ?? $params['url'] ?? ''));

        if ($honeypot !== '') {
            return new WP_Error('validation_error', 'Invalid submission', ['status' => 400]);
        }

        if ($name === '' || $email === '') {
            return new WP_Error('validation_error', 'Missing required fields', ['status' => 400]);
        }

        $attachment_id = null;
        if (!empty($files['resume']) || !empty($files['cv'])) {
            $file = $files['resume'] ?? $files['cv'];
            $attachment_id = self::handle_upload($file);
            if (is_wp_error($attachment_id)) {
                return $attachment_id;
            }
        }

        $payload = [
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'position' => $position,
            'locale' => $locale,
            'attachment_id' => $attachment_id,
        ];

        self::store_submission('career', $payload, $name . ' — ' . $position);
        self::send_notification_email('career', $payload);

        return new WP_REST_Response([
            'success' => true,
            'message' => $locale === 'en'
                ? 'Your application was submitted successfully. Thank you for your interest!'
                : 'تم إرسال طلب التقديم بنجاح! شكراً لاهتمامك.',
        ], 200);
    }

    /**
     * @return WP_REST_Response|WP_Error
     */
    public static function quote($request)
    {
        $body = $request->get_json_params();
        if (!is_array($body)) {
            $body = $request->get_body_params();
        }

        $payload = [
            'name' => sanitize_text_field((string) ($body['name'] ?? '')),
            'email' => sanitize_email((string) ($body['email'] ?? '')),
            'phone' => sanitize_text_field((string) ($body['phone'] ?? '')),
            'company' => sanitize_text_field((string) ($body['company'] ?? '')),
            'projectType' => sanitize_text_field((string) ($body['projectType'] ?? '')),
            'budget' => sanitize_text_field((string) ($body['budget'] ?? '')),
            'details' => sanitize_textarea_field((string) ($body['details'] ?? '')),
            'locale' => sanitize_key((string) ($body['locale'] ?? 'ar')),
            'website' => sanitize_text_field((string) ($body['website'] ?? $body['url'] ?? '')),
        ];

        if ($payload['website'] !== '') {
            return new WP_Error('validation_error', 'Invalid submission', ['status' => 400]);
        }
        unset($payload['website']);

        if ($payload['name'] === '' || $payload['email'] === '') {
            return new WP_Error('validation_error', 'Missing required fields', ['status' => 400]);
        }

        self::store_submission('quote', $payload, $payload['name'] . ' — quote');
        self::send_notification_email('quote', $payload);

        $locale = $payload['locale'];
        return new WP_REST_Response([
            'success' => true,
            'message' => $locale === 'en'
                ? 'Your quote request was received successfully.'
                : 'تم إرسال طلب عرض السعر بنجاح! سيقوم مستشارنا التقني بالرد عليك.',
        ], 200);
    }

    /**
     * @param array<string, mixed> $payload
     */
    private static function store_submission(string $type, array $payload, string $title): void
    {
        wp_insert_post([
            'post_type' => SpinesTech_Headless_Post_Types::SUBMISSION,
            'post_status' => 'publish',
            'post_title' => '[' . strtoupper($type) . '] ' . $title,
            'meta_input' => [
                'st_submission_type' => $type,
                'st_submission_payload' => wp_json_encode($payload),
            ],
        ]);
    }

    /**
     * @param array<string, mixed> $payload
     */
    private static function send_notification_email(string $type, array $payload): void
    {
        $to = (string) get_option('st_form_recipient_email', get_option('admin_email'));
        if (!is_email($to)) {
            return;
        }

        $subject = sprintf('[SpinesTech] New %s submission', $type);
        $body = "New submission received:\n\n" . print_r($payload, true);
        wp_mail($to, $subject, $body);
    }

    /**
     * @param array<string, mixed> $file
     * @return int|WP_Error
     */
    private static function handle_upload(array $file)
    {
        if (empty($file['tmp_name'])) {
            return new WP_Error('upload_error', 'No file uploaded', ['status' => 400]);
        }

        $max_size = 5 * 1024 * 1024;
        if (!empty($file['size']) && (int) $file['size'] > $max_size) {
            return new WP_Error('upload_error', 'File is too large. Maximum size is 5MB.', ['status' => 400]);
        }

        require_once ABSPATH . 'wp-admin/includes/file.php';
        require_once ABSPATH . 'wp-admin/includes/media.php';
        require_once ABSPATH . 'wp-admin/includes/image.php';

        $allowed = ['pdf', 'doc', 'docx'];
        $check = wp_check_filetype($file['name'] ?? '');
        if (!in_array($check['ext'] ?? '', $allowed, true)) {
            return new WP_Error('upload_error', 'Invalid file type. Allowed: PDF, DOC, DOCX', ['status' => 400]);
        }

        $upload = wp_handle_upload($file, ['test_form' => false]);
        if (isset($upload['error'])) {
            return new WP_Error('upload_error', $upload['error'], ['status' => 500]);
        }

        $attachment = [
            'post_mime_type' => $upload['type'],
            'post_title' => sanitize_file_name($file['name'] ?? 'resume'),
            'post_content' => '',
            'post_status' => 'inherit',
        ];

        $attach_id = wp_insert_attachment($attachment, $upload['file']);
        if (is_wp_error($attach_id)) {
            return $attach_id;
        }

        $attach_data = wp_generate_attachment_metadata($attach_id, $upload['file']);
        wp_update_attachment_metadata($attach_id, $attach_data);

        return $attach_id;
    }
}
