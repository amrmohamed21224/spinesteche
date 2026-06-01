<?php
declare(strict_types=1);

if (!defined('ABSPATH')) {
    exit;
}

final class SpinesTech_Headless_REST_Controller
{
    private const NS = 'spinestech/v1';

    public static function register_routes(): void
    {
        register_rest_route(self::NS, '/health', [
            'methods' => 'GET',
            'callback' => [self::class, 'health'],
            'permission_callback' => '__return_true',
        ]);

        self::register_collection('/services', SpinesTech_Headless_Post_Types::SERVICE, 'map_services');
        self::register_item('/services', SpinesTech_Headless_Post_Types::SERVICE, 'map_service');

        self::register_collection('/products', SpinesTech_Headless_Post_Types::PRODUCT, 'map_products');
        self::register_collection('/sectors', SpinesTech_Headless_Post_Types::SECTOR, 'map_sectors');
        self::register_collection('/case-studies', SpinesTech_Headless_Post_Types::CASE_STUDY, 'map_case_studies');
        self::register_item('/case-studies', SpinesTech_Headless_Post_Types::CASE_STUDY, 'map_case_study');

        self::register_collection('/pricing-plans', SpinesTech_Headless_Post_Types::PRICING, 'map_pricing');
        self::register_collection('/faqs', SpinesTech_Headless_Post_Types::FAQ, 'map_faqs');
        self::register_collection('/jobs', SpinesTech_Headless_Post_Types::JOB, 'map_jobs');
        self::register_item('/jobs', SpinesTech_Headless_Post_Types::JOB, 'map_job');

        self::register_collection('/testimonials', SpinesTech_Headless_Post_Types::TESTIMONIAL, 'map_testimonials');
        self::register_collection('/team-members', SpinesTech_Headless_Post_Types::TEAM, 'map_team');

        register_rest_route(self::NS, '/about', [
            'methods' => 'GET',
            'callback' => [self::class, 'about'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(self::NS, '/navigation', [
            'methods' => 'GET',
            'callback' => [self::class, 'navigation'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route(self::NS, '/settings', [
            'methods' => 'GET',
            'callback' => [self::class, 'settings'],
            'permission_callback' => '__return_true',
        ]);

        SpinesTech_Headless_Submissions::register_routes(self::NS);
    }

    private static function register_collection(string $route, string $post_type, string $callback): void
    {
        register_rest_route(self::NS, $route, [
            'methods' => 'GET',
            'callback' => [self::class, $callback],
            'permission_callback' => '__return_true',
            'args' => self::lang_args(),
        ]);
    }

    private static function register_item(string $route, string $post_type, string $callback): void
    {
        register_rest_route(self::NS, $route . '/(?P<slug>[a-zA-Z0-9_-]+)', [
            'methods' => 'GET',
            'callback' => [self::class, $callback],
            'permission_callback' => '__return_true',
            'args' => array_merge(self::lang_args(), [
                'slug' => ['required' => true, 'type' => 'string'],
            ]),
        ]);
    }

    /**
     * @return array<string, array<string, mixed>>
     */
    private static function lang_args(): array
    {
        return [
            'lang' => [
                'required' => false,
                'type' => 'string',
                'default' => 'ar',
                'enum' => ['ar', 'en'],
            ],
        ];
    }

    public static function health($request)
    {
        return new WP_REST_Response([
            'status' => 'ok',
            'version' => ST_HEADLESS_VERSION,
            'polylang' => SpinesTech_Headless_Polylang::is_active(),
            'timestamp' => gmdate('c'),
        ], 200);
    }

    public static function map_services($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::SERVICE, $lang);
        $data = array_map([SpinesTech_Headless_Mappers::class, 'service'], $posts);
        return new WP_REST_Response($data, 200);
    }

    /**
     * @return WP_REST_Response|WP_Error
     */
    public static function map_service($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $slug = (string) $request->get_param('slug');
        $post = SpinesTech_Headless_Polylang::get_post_by_slug(SpinesTech_Headless_Post_Types::SERVICE, $slug, $lang);
        if (!$post) {
            return new WP_Error('not_found', 'Service not found', ['status' => 404]);
        }
        return new WP_REST_Response(SpinesTech_Headless_Mappers::service($post), 200);
    }

    public static function map_products($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::PRODUCT, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'product'], $posts), 200);
    }

    public static function map_sectors($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::SECTOR, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'sector'], $posts), 200);
    }

    public static function map_case_studies($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::CASE_STUDY, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'case_study'], $posts), 200);
    }

    /**
     * @return WP_REST_Response|WP_Error
     */
    public static function map_case_study($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $slug = (string) $request->get_param('slug');
        $post = SpinesTech_Headless_Polylang::get_post_by_slug(SpinesTech_Headless_Post_Types::CASE_STUDY, $slug, $lang);
        if (!$post) {
            return new WP_Error('not_found', 'Case study not found', ['status' => 404]);
        }
        return new WP_REST_Response(SpinesTech_Headless_Mappers::case_study($post), 200);
    }

    public static function map_pricing($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::PRICING, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'pricing'], $posts), 200);
    }

    public static function map_faqs($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::FAQ, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'faq'], $posts), 200);
    }

    public static function map_jobs($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::JOB, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'job'], $posts), 200);
    }

    /**
     * @return WP_REST_Response|WP_Error
     */
    public static function map_job($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $slug = (string) $request->get_param('slug');
        $post = SpinesTech_Headless_Polylang::get_post_by_slug(SpinesTech_Headless_Post_Types::JOB, $slug, $lang);
        if (!$post) {
            return new WP_Error('not_found', 'Job not found', ['status' => 404]);
        }
        return new WP_REST_Response(SpinesTech_Headless_Mappers::job($post), 200);
    }

    public static function map_testimonials($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::TESTIMONIAL, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'testimonial'], $posts), 200);
    }

    public static function map_team($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        $posts = SpinesTech_Headless_Polylang::get_posts(SpinesTech_Headless_Post_Types::TEAM, $lang);
        return new WP_REST_Response(array_map([SpinesTech_Headless_Mappers::class, 'team_member'], $posts), 200);
    }

    public static function about($request)
    {
        $lang = SpinesTech_Headless_Polylang::resolve_lang($request);
        return new WP_REST_Response(SpinesTech_Headless_Mappers::about($lang), 200);
    }

    public static function navigation()
    {
        return new WP_REST_Response(SpinesTech_Headless_Mappers::navigation(), 200);
    }

    public static function settings()
    {
        return new WP_REST_Response(SpinesTech_Headless_Mappers::settings(), 200);
    }
}
