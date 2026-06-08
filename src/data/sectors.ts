import { CMSSector } from "../types/cms";

export const mockSectors: CMSSector[] = [
  {
    id: "sec-1",
    title: "التجزئة والتجارة الإلكترونية",
    description:
      "حلول نقاط البيع المتقدمة، منصات التجارة الإلكترونية، وأنظمة إدارة المخازن الذكية المدعومة بالذكاء الاصطناعي.",
    icon: "shopping_bag",
    slug: "retail-ecommerce",
    image: "/images/sectors/retail-ecommerce.png",
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
    image: "/images/sectors/education.png",
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
    image: "/images/sectors/logistics.png",
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
