import { CMSProduct } from "../types/cms";

export const mockProducts: CMSProduct[] = [
  {
    id: "prod-1",
    title: "نظام إدارة الموارد (ERP)",
    description:
      "نظام متكامل يربط جميع إدارات مؤسستك في منصة واحدة، من المالية والمشتريات إلى التصنيع وسلاسل الإمداد.",
    icon: "enterprise",
    slug: "erp-system",
    badge: "جاهز وقابل للتخصيص",
    features: ["إدارة مالية ومحاسبية متقدمة", "أتمتة سلاسل الإمداد والمخازن"],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
  {
    id: "prod-2",
    title: "إدارة علاقات العملاء (CRM)",
    description:
      "عزز مبيعاتك واربط فريقك بقاعدة بيانات ذكية تمنحك رؤية شاملة لكل عميل وتجربة تعامل استثنائية.",
    icon: "groups",
    slug: "crm-system",
    badge: "جاهز وقابل للتخصيص",
    features: ["تتبع مسار المبيعات والفرص", "تقارير وتحليلات ذكاء الأعمال"],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
  {
    id: "prod-3",
    title: "إدارة الموارد البشرية (HRM)",
    description:
      "نظام متوافق مع نظام العمل السعودي لإدارة الرواتب، الحضور، الإجازات، وتطوير المواهب الرقمية.",
    icon: "badge",
    slug: "hrm-system",
    badge: "جاهز وقابل للتخصيص",
    features: ["إدارة الرواتب والخدمة الذاتية", 'تكامل مع "مدد" و"قوى"'],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
  {
    id: "prod-4",
    title: "إدارة المخازن والمستودعات",
    description:
      "تحكم كامل في حركة المخزون، التنبيهات الذكية، وجرد المستودعات لحظة بلحظة لضمان كفاءة التوريد.",
    icon: "inventory_2",
    slug: "inventory-system",
    badge: "جاهز وقابل للتخصيص",
    features: ["تتبع الباركود و RFID", "تحسين مستويات الطلب آلياً"],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
  {
    id: "prod-5",
    title: "نقاط البيع (POS)",
    description:
      "نظام كاشير متطور يدعم الفوترة الإلكترونية (ZATCA) ويعمل عبر الأجهزة اللوحية والحواسيب بكفاءة عالية.",
    icon: "point_of_sale",
    slug: "pos-system",
    badge: "جاهز وقابل للتخصيص",
    features: ["متوافق مع هيئة الزكاة والدخل", "يعمل بلا اتصال بالإنترنت"],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
  {
    id: "prod-6",
    title: "التجارة الإلكترونية",
    description:
      "متجر إلكتروني خاص بهويتك، يدعم جميع بوابات الدفع المحلية وشركات الشحن، مع واجهات مستخدم مذهلة.",
    icon: "shopping_cart",
    slug: "ecommerce-platform",
    badge: "جاهز وقابل للتخصيص",
    features: ["تطبيق موبايل (iOS & Android)", "تكامل مع أنظمة المخازن"],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
  {
    id: "prod-7",
    title: "نظام الحجز والمواعيد",
    description:
      "مثالي لمراكز التجميل، الصالات الرياضية، والاستشارات القانونية. إدارة مرنة للجداول والمدفوعات المسبقة.",
    icon: "calendar_month",
    slug: "booking-system",
    badge: "جاهز وقابل للتخصيص",
    features: ["إرسال تنبيهات تلقائية للعملاء", "لوحة تحكم لإدارة الموظفين"],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
  {
    id: "prod-8",
    title: "إدارة المنشآت المتخصصة",
    description:
      "أنظمة عمودية متخصصة للمستشفيات (HIS)، المدارس (LMS)، والمطاعم الذكية، مصممة وفقاً لأفضل ممارسات كل قطاع.",
    icon: "domain_verification",
    slug: "specialized-management",
    badge: "حلول قطاعية",
    features: ["سجلات طبية / أكاديمية متكاملة", "تحليلات متقدمة للأداء التشغيلي"],
    ctaPrimary: "طلب نسخة تجريبية",
    ctaSecondary: "تخصيص لعملك",
  },
];
