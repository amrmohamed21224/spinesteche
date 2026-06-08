# SpinesTech — ملف التسليم (اقرأه أولاً)

> **آخر تحديث:** 2026-06-01  
> **الغرض:** أي مساعد/موديل جديد يقرأ هذا الملف فقط قبل أي تعديل. حدّث هذا الملف بعد كل قرار أو تغيير مهم.

---

## 1) المشروع في سطر

| الطبقة    | التقنية                              | الرابط / المسار                                                                |
| --------- | ------------------------------------ | ------------------------------------------------------------------------------ |
| **فرونت** | TanStack Start (React) + Tailwind v4 | Vercel — repo: `https://github.com/amrmohamed21224/spinesteche.git` فرع `main` |
| **باكند** | WordPress (headless)                 | `https://spinesteche.great-site.net/wp/` (ملاحظة: WP داخل مجلد **`/wp/`**)     |
| **لغات**  | Polylang `ar` (افتراضي) + `en`       | مفعّل على WP                                                                   |
| **محتوى** | Custom Post Types + ACF              | ليس صفحات WordPress عادية                                                      |

**الفرونت لا يعرض ثيم ووردبريس.** الثيم (Twenty Twenty-Five) غير مستخدم. المحتوى يأتي من **REST API**.

---

## 2) فكرة البلجن المخصص `spinestech-headless`

### لماذا وُجد؟

الموقع React يتوقع عقد API ثابت (موجود في `src/lib/api/endpoints.ts` و `fetchers.ts`):

- `GET /wp-json/spinestech/v1/services?lang=ar`
- `GET .../products`, `/sectors`, `/jobs`, `/about`, `/settings`, إلخ
- `POST .../submissions/contact` (اتصال + استشارة)
- `POST .../submissions/career` (FormData + CV)
- `POST .../submissions/quote`

البلجن المخصص (`wordpress/spinestech-headless/`) يعمل:

1. **تسجيل CPTs** (خدمات، منتجات، وظائف، FAQ، …) — بدل صفحات WP
2. **حقول ACF** محلية (`acf_add_local_field_group`)
3. **REST namespace واحد:** `spinestech/v1` + mappers لشكل JSON الذي يفهمه الفرونت
4. **Polylang:** فلتر `lang=ar|en` على الاستعلامات
5. **فورمات:** حفظ `st_submission` + `wp_mail`
6. **CORS** لدومين Vercel والموقع

### هل لازم صفحات في ووردبريس؟

**لا.** عدم إنشاء Pages **ليس** سبب خطأ التفعيل.  
خطأ التفعيل كان من **كود PHP** (type hints لـ `WP_REST_Request` قبل تحميل REST). الإصلاح في **v1.0.2** على GitHub.

بعد التفعيل: المحتوى يُدخل كـ **Services / Jobs / …** من القائمة الجانبية، كل عنصر عربي + إنجليزي عبر Polylang.

---

## 3) وضع المستخدم الحالي (WP)

- WordPress **6.9.4** — PHP **8.3.19** — InfinityFree
- **Polylang + ACF PRO** مفعّلين
- **SpinesTech Headless** — غالباً لا يزال **غير مفعّل** أو نسخة قديمة على السيرفر
- **لم يُدخل محتوى** بعد (لا صفحات ولا CPTs — طبيعي قبل التفعيل)
- **WPGraphQL** مفعّل — الفرونت الحالي **لا يستخدمه** (يستخدم REST `spinestech/v1`)
- مسار API الصحيح:
  ```
  https://spinesteche.great-site.net/wp/wp-json/spinestech/v1/health
  ```

---

## 4) وضع الكود (GitHub / Vercel)

| Commit مهم | الوصف                                |
| ---------- | ------------------------------------ |
| `89c0442`  | نافذة استشارة + ConsultationProvider |
| `9a86ac3`  | ربط API + مجلد wordpress             |
| `5f76a61`  | إصلاح ESLint                         |
| `546f5eb`  | بلجن WP **v1.0.2** (إصلاح fatal)     |

### متغيرات Vercel (Production)

```env
VITE_USE_MOCKS=true          # true حتى يعمل WP + محتوى؛ false بعد الجاهزية
VITE_API_URL=https://spinesteche.great-site.net/wp-json/spinestech/v1
VITE_SITE_URL=https://spinestech.sa
```

- `src/config/env.ts` — `USE_MOCKS` من `VITE_USE_MOCKS`
- مع `USE_MOCKS=true` الموقع يعمل **بدون** WP (بيانات mock)

### ملفات فرونت مهمة

| مسار                                   | دور                   |
| -------------------------------------- | --------------------- |
| `src/lib/api/fetchers.ts`              | كل طلبات CMS + فورمات |
| `src/lib/api/endpoints.ts`             | مسارات API            |
| `src/contexts/ConsultationContext.tsx` | بوب أب الاستشارة      |
| `src/routes/__root.tsx`                | ConsultationProvider  |
| `src/types/cms.ts`                     | أنواع TypeScript      |

### وثائق WP إضافية

- `wordpress/SETUP.md` — إعداد سريع
- `wordpress/CONTENT-MIGRATION.md` — إدخال المحتوى AR/EN

---

## 5) قرار معلّق: إلغاء البلجن المخصص؟

المستخدم يفكّر في **بلجن جاهز من wordpress.org** بدل `spinestech-headless`.

### الخيار A — الإبقاء على البلجن المخصص (الأقل تغييراً للفرونت)

| مميزات                         | عيوب                      |
| ------------------------------ | ------------------------- |
| الفرونت جاهز للعقد الحالي      | رفع يدوي على InfinityFree |
| فورمات + CORS + Polylang مدمجة | صيانة منا                 |

**الخطوة التالية:** رفع **v1.0.2** فقط → Activate → `/health` → إدخال محتوى.

### الخيار B — بلجن جاهز (يتطلب إعادة ربط الفرونت)

| بلجن                               | ملاحظة                                                        |
| ---------------------------------- | ------------------------------------------------------------- |
| **WPGraphQL** (موجود عند المستخدم) | إعادة كتابة `fetchers.ts` + queries؛ Polylang له إضافة منفصلة |
| **ACF to REST API**                | لا يغطي CPTs كاملة ولا الفورمات بنفس الشكل                    |
| **CPT UI** + REST افتراضي          | شكل JSON مختلف؛ لا `submissions/*`                            |

**لا يوجد بلجن واحد** يطابق `spinestech/v1` بدون تعديل الفرونت أو إعدادات كثيرة.

**توصية المشروع حالياً:** إكمال **v1.0.2** أسرع من إعادة البناء على GraphQL — إلا إذا قرر المستخدم GraphQL صراحة.

---

## 6) قائمة تحقق — ماذا يفعل الإنسان/المساعد التالي

### أ) ووردبريس (يدوي على الاستضافة)

- [ ] حذف `wp-content/plugins/spinestech-headless` القديم
- [ ] رفع مجلد من GitHub: `wordpress/spinestech-headless/` (إصدار **1.0.2**)
- [ ] تعطيل مؤقت: SpeedyCache، WPGraphQL (اختياري لكن يقلل التعارض)
- [ ] Activate → التحقق من **1.0.2** في Plugins
- [ ] فتح `/wp-json/spinestech/v1/health` → `"status":"ok"`
- [ ] SpinesTech → Settings: إيميل الفورمات + CORS (دومين Vercel)
- [ ] Languages → Polylang: تفعيل CPTs الجديدة إن ظهرت
- [ ] إدخال محتوى حسب `wordpress/CONTENT-MIGRATION.md`

### ب) Vercel

- [ ] `VITE_API_URL` مع `/wp/` كما فوق
- [ ] بعد نجاح WP: `VITE_USE_MOCKS=false` + Redeploy

### ج) اختبار

- [ ] صفحات الموقع تعرض بيانات WP
- [ ] نافذة «احجز استشارة» + فورمات

---

## 7) أخطاء شائعة (لا تضيع وقت)

| الخطأ                     | الحل                                       |
| ------------------------- | ------------------------------------------ |
| Fatal عند التفعيل         | تأكد **v1.0.2** ليس 1.0.0                  |
| API 404                   | نسيت `/wp/` في الرابط                      |
| موقع فاضي مع WP           | `VITE_USE_MOCKS` لا يزال true أو لا محتوى  |
| رفع مجلد `wordpress` كامل | الصحيح: `plugins/spinestech-headless/` فقط |
| توقع Pages في WP          | غير مطلوب — CPTs فقط                       |

### debug

`wp-content/debug.log` — `WP_DEBUG` مفعّل عند المستخدم.

---

## 8) قواعد للمساعد القادم

1. اقرأ **HANDOFF.md** ثم عدّله إذا غيّرت حالة المشروع.
2. لا تفترض أن المستخدم أنشأ صفحات WP.
3. لا تعيد بناء البلجن المخصص إلا بطلب صريح؛ إن اختاروا بلجن جاهز — وثّق القرار في القسم 5.
4. كل push على `main` → Vercel deploy تلقائي (إن المشروع مربوط).
5. لا ت commit إلا إذا طلب المستخدم.
6. استهلاك توكنز: إجابات قصيرة؛ التفاصيل هنا.

---

## 9) سجل القرارات

| التاريخ | القرار                                                          |
| ------- | --------------------------------------------------------------- |
| 2026-06 | فرونت على Vercel + WP منفصل + Polylang                          |
| 2026-06 | بلجن مخصص `spinestech-headless` للـ REST الموحّد                |
| 2026-06 | إصلاح fatal: v1.0.1 PHP unions، v1.0.2 REST type hints          |
| 2026-06 | **معلّق:** إلغاء البلجن المخصص لصالح بلجن جاهز — لم يُنفَّذ بعد |

---

## 10) روابط سريعة

- Repo: https://github.com/amrmohamed21224/spinesteche.git
- Plugin path in repo: `wordpress/spinestech-headless/`
- Health check: `https://spinesteche.great-site.net/wp/wp-json/spinestech/v1/health`
