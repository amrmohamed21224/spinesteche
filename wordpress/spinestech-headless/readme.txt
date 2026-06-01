=== SpinesTech Headless ===
Contributors: spinestech
Requires at least: 6.0
Tested up to: 6.9
Requires PHP: 7.4
Stable tag: 1.0.2
License: GPLv2 or later

Headless REST API for SpinesTech React frontend.

== Changelog ==
= 1.0.2 =
* Fix fatal on activation: remove WP_REST_* / WP_Post type hints loaded before REST API
* Polylang CPT registration via pll_get_post_types filter

= 1.0.1 =
* PHP 7.4+ compatibility (removed PHP 8 union return types)
* Fixed plugin activation hook registration
* PHP version guard with admin notice

= 1.0.0 =
* Initial release
