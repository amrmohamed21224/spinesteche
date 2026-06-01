# SpinesTech WordPress Headless Backend

Custom WordPress plugin that powers the React frontend via REST API.

## Quick start

1. Copy `spinestech-headless/` to `wp-content/plugins/`
2. Activate **SpinesTech Headless** in WP Admin
3. Install **ACF**, **Polylang**, configure AR + EN
4. **Settings → Permalinks → Post name**
5. **SpinesTech** menu → set form email + CORS origins

## API base URL

```text
https://YOUR-WP-DOMAIN/wp-json/spinestech/v1
```

Set in frontend:

```env
VITE_API_URL=https://YOUR-WP-DOMAIN/wp-json/spinestech/v1
VITE_USE_MOCKS=false
```

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Status check |
| GET | `/services?lang=ar` | Services list |
| GET | `/products?lang=en` | Products |
| GET | `/sectors` | Sectors |
| GET | `/case-studies` | Case studies |
| GET | `/pricing-plans` | Pricing |
| GET | `/faqs` | FAQs |
| GET | `/jobs` | Careers |
| GET | `/testimonials` | Testimonials |
| GET | `/team-members` | Team |
| GET | `/about?lang=ar` | About page JSON |
| GET | `/navigation` | Nav links |
| GET | `/settings` | Site settings |
| POST | `/submissions/contact` | Contact + consultation |
| POST | `/submissions/career` | Career (multipart) |
| POST | `/submissions/quote` | Quote request |

## Post meta fields (Custom Fields)

For list fields, use **one item per line** in a textarea custom field, or ACF textarea.

See [CONTENT-MIGRATION.md](./CONTENT-MIGRATION.md) for full field mapping.

## Security

- CORS allowlist (defaults + admin-configured origins)
- Rate limit: 5 POST/minute/IP on submission routes
- File uploads: PDF, DOC, DOCX only
