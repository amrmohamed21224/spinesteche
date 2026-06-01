# SpinesTech WordPress — دليل الإعداد (مرحلة 0)

## مطلوب منك قبل الربط

1. **رابط ووردبريس** مع SSL (مثال: `https://cms.example.com`)
2. **Settings → Permalinks → Post name** ثم Save
3. تثبيت الإضافات:
   - [Advanced Custom Fields](https://wordpress.org/plugins/advanced-custom-fields/)
   - [Polylang](https://wordpress.org/plugins/polylang/)
   - [WP Mail SMTP](https://wordpress.org/plugins/wp-mail-smtp/) (أو SMTP الاستضافة)
4. **Polylang:** أضف لغتين `ar` (افتراضي) و `en`
5. **Users → Profile → Application Passwords** — أنشئ كلمة مرور للتطوير (لا تضعها في الفرونت)
6. ارفع مجلد `spinestech-headless` إلى `wp-content/plugins/` وفعّل الإضافة
7. **SpinesTech → Settings** في لوحة WP: أدخل إيميل استقبال الفورمات و CORS origins

## اختبار سريع

```text
GET https://YOUR-WP-DOMAIN/wp-json/spinestech/v1/health
```

يجب أن يرجع `{ "status": "ok", ... }`

## متغيرات Vercel (الفرونت)

```env
VITE_API_URL=https://YOUR-WP-DOMAIN/wp-json/spinestech/v1
VITE_USE_MOCKS=false
VITE_SITE_URL=https://spinestech.sa
```

## CORS

أضف في إعدادات Plugin:

- `https://spinestech.sa`
- `https://www.spinestech.sa`
- `http://localhost:8080`
- رابط preview من Vercel إن وُجد
