# دليل إدخال المحتوى — WordPress + Polylang

## 1. اللغات

1. **Languages → Add**: `العربية` (slug: `ar`, default) و `English` (slug: `en`)
2. لكل منشور: أنشئ النسخة العربية ثم **+** لإضافة الترجمة الإنجليزية

## 2. الخدمات (Services)

| حقل WP   | Meta key      | ملاحظة                         |
| -------- | ------------- | ------------------------------ |
| Title    | —             | العنوان                        |
| Excerpt  | —             | الوصف القصير                   |
| Content  | —             | تفاصيل إضافية                  |
| Icon     | `st_icon`     | اسم Material Symbol مثل `code` |
| Features | `st_features` | سطر لكل ميزة                   |
| Details  | `st_details`  | سطر لكل نقطة                   |

**Slug** = يظهر في الـ API كـ `id` (مثال: `custom-software`)

## 3. المنتجات (Products)

| Meta key           | مثال               |
| ------------------ | ------------------ |
| `st_icon`          | `enterprise`       |
| `st_badge`         | جاهز وقابل للتخصيص |
| `st_features`      | قائمة أسطر         |
| `st_cta_primary`   | طلب نسخة تجريبية   |
| `st_cta_secondary` | تخصيص لعملك        |

## 4. القطاعات (Sectors)

| Meta key    | قيم                         |
| ----------- | --------------------------- | ------ | -------- | --------- |
| `st_layout` | `featured`                  | `tall` | `accent` | `default` |
| `st_icon`   | Material icon               |
| `st_image`  | رابط صورة أو Featured Image |
| `st_tags`   | أسطر متعددة                 |

## 5. دراسات الحالة (Case Studies)

| Meta key       |                                            |
| -------------- | ------------------------------------------ |
| `st_client`    | اسم العميل                                 |
| `st_sector`    | القطاع                                     |
| `st_challenge` | التحدي                                     |
| `st_solution`  | الحل                                       |
| `st_result`    | النتيجة                                    |
| `st_stats`     | JSON: `[{"label":"+40%","value":"كفاءة"}]` |

## 6. الأسعار (Pricing Plans)

| Meta key         |            |
| ---------------- | ---------- |
| `st_tier`        | اسم الباقة |
| `st_features`    | أسطر       |
| `st_recommended` | `1` أو `0` |
| `st_cta_text`    | نص الزر    |

## 7. الوظائف (Jobs)

| Meta key          |                    |
| ----------------- | ------------------ |
| `st_department`   | القسم              |
| `st_location`     | الموقع             |
| `st_type`         | Full-time / Remote |
| `st_experience`   | 5+ سنوات           |
| `st_requirements` | أسطر               |
| `st_benefits`     | أسطر               |

## 8. صفحة من نحن (About)

حالياً تُخزَّن في **Options** (يمكن ضبطها من SpinesTech settings أو عبر `wp option`):

- `st_about_ar_mission`, `st_about_ar_vision`
- `st_about_en_mission`, `st_about_en_vision`
- `st_about_ar_core_values` — JSON array
- (نفس المنطق لـ differentiators, markets, stats)

يمكن إضافة واجهة إعدادات لاحقاً؛ مؤقتاً استخدم محتوى الـ mocks في `[src/data/about.ts](../src/data/about.ts)` كمرجع.

## 9. ترتيب العرض

استخدم **Order** (قائمة المنشورات → اسحب لترتيب) — الـ API يرتب بـ `menu_order`.

## 10. اختبار بعد الإدخال

```text
GET /wp-json/spinestech/v1/services?lang=ar
GET /wp-json/spinestech/v1/products?lang=en
```

قارن JSON مع ما يظهر على الموقع.
