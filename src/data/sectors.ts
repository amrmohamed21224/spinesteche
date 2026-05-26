import { CMSSector } from "../types/cms";

export const mockSectors: CMSSector[] = [
  {
    id: "sec-1",
    title: "التجزئة والتجارة الإلكترونية",
    description:
      "حلول نقاط البيع المتقدمة، منصات التجارة الإلكترونية، وأنظمة إدارة المخازن الذكية المدعومة بالذكاء الاصطناعي.",
    icon: "shopping_bag",
    slug: "retail-ecommerce",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClnPIS2ndWVOS2-vMv9LKzVSxWHcSHtvyJ4pjDPLZrbuGhi8GYYc6BBdkC5TEefqMzKeGeQac9kGa2UT_C_w2E_q0LTYr3vJfVsNfiFj1E-X7OmH-hdpUfhXVDp1c8lvmaN2nGoFURM1gab_z55yWnpvBTOuLLmVO0kxnOu9QGiAQg6RSo4lA4L3nrAhzBKPtjuxtykCrfc8ijS6LgpC4rbB9UzBXUNaYLd_30TZKt8T1wDcMJ4fHSUqT0IJKuBn-91gaZKSUJgcg",
    layout: "featured",
  },
  {
    id: "sec-2",
    title: "العقارات والإنشاءات",
    description:
      "تحويل إدارة العقارات عبر منصات الـ PropTech المبتكرة وأنظمة متابعة المشاريع الضخمة.",
    icon: "location_city",
    slug: "real-estate",
    layout: "accent",
  },
  {
    id: "sec-3",
    title: "الرعاية الصحية",
    description:
      "أنظمة إدارة المستشفيات (HIS) والملفات الصحية الإلكترونية المتوافقة مع معايير وزارة الصحة السعودية.",
    icon: "health_and_safety",
    slug: "healthcare",
    layout: "default",
  },
  {
    id: "sec-4",
    title: "التعليم والتدريب",
    description:
      "منصات التعليم الإلكتروني الهجينة وأنظمة إدارة التعلم (LMS) للمؤسسات التعليمية والشركات.",
    icon: "school",
    slug: "education",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCbDCEqOqfJhw7Y_HxzUd4FtmqltrYrwgYYJ9mfzSKYWJHYljmJnY0TT8cQoLEZjju3dtgEol-mhFSWYOpz2lJkRTMaYRoOyyE6NWcSg6ZJyJVHevb1PEji1ZsB_OIQA6yRrB1lCx90Fg0faz7zeSw9gBsaJBzmJgupLMbSE4NDVII8g0YGyNOosQ10RJ08UehHedB-X0gqIu8kAyYPsuXhyOCip0svtAyL6qC2YjvBde0twsB27PqGVXiso_T30gqmuevGDxgMZ2Gk",
    layout: "default",
  },
  {
    id: "sec-5",
    title: "السياحة والضيافة",
    description:
      "أنظمة الحجز المتكاملة، تطبيقات تجربة الضيف، وحلول إدارة الفنادق والمنتجعات السياحية.",
    icon: "hotel",
    slug: "hospitality",
    layout: "default",
  },
  {
    id: "sec-6",
    title: "الخدمات اللوجستية",
    description: "تحسين سلاسل الإمداد، تتبع الشحنات بالوقت الفعلي، وأنظمة إدارة المستودعات الذكية.",
    icon: "local_shipping",
    slug: "logistics",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBVzKo-QbGllaKxi6TxR1fG1C0FZ5LumwMrCbVr3euZsI8jl30bPWwDtqFqbUUZ1oF72eC-cq3f-xwi53oUyXW7O6daRTM2wSNu_tf0dfyLKwZbp3l3NsZTmcYqqM2E1KIm2cLB2ybGGBfyLgTU_B13qyvgrXiDsYJuahyM8XPaJvRGMpvoH_A9jgh3vt-mdo70eAx0jdpZQNoBkwtwKcBqdMHbqhcnhedFsM3ViX0z6FgM6-ad5nKeJnpiKX4q2Do43XISqp0LPnkC",
    layout: "tall",
  },
  {
    id: "sec-7",
    title: "الصناعة والتصنيع",
    description:
      "أتمتة خطوط الإنتاج، حلول إنترنت الأشياء الصناعية (IIoT)، وأنظمة الصيانة التنبؤية.",
    icon: "factory",
    slug: "manufacturing",
    tags: ["الثورة الصناعية 4.0", "الذكاء الاصطناعي"],
    layout: "tall",
  },
  {
    id: "sec-8",
    title: "الخدمات المهنية",
    description:
      "حلول تقنية للمكاتب القانونية، شركات المحاسبة، والاستشارات الإدارية لزيادة الكفاءة التشغيلية.",
    icon: "gavel",
    slug: "professional-services",
    layout: "default",
  },
  {
    id: "sec-9",
    title: "الشركات الناشئة",
    description:
      "تسريع إطلاق المنتجات التقنية (MVP) وبناء البنية التحتية القابلة للتوسع للشركات التقنية الناشئة.",
    icon: "rocket_launch",
    slug: "startups",
    layout: "default",
  },
  {
    id: "sec-10",
    title: "المؤسسات والشركات الكبرى",
    description: "التحول الرقمي الشامل، تكامل الأنظمة المعقدة، وحلول الحوسبة السحابية المؤسسية.",
    icon: "corporate_fare",
    slug: "enterprises",
    layout: "default",
  },
];
