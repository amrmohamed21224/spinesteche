import { CMSCoreValue, CMSDifferentiator, CMSMarketPresence, CMSStat } from "../types/cms";

export const mockMission =
  "تمكين المؤسسات الحكومية والخاصة في الشرق الأوسط من خلال حلول تقنية مبتكرة، آمنة، وقابلة للتوسع، تساهم في تسريع عجلة التطور الرقمي وتعزز السيادة التقنية المحلية.";

export const mockVision =
  "أن نكون الخيار الأول والعمود الفقري التقني للتحول الرقمي في المنطقة، معترف بنا دولياً كرمز للابتكار والتميز الهندسي المنطلق من قلب المملكة العربية السعودية.";

export const mockCoreValues: CMSCoreValue[] = [
  {
    id: "v1",
    title: "الابتكار",
    description: "نسعى دائماً لتحدي الوضع الراهن وإيجاد حلول ذكية تسبق زمنها.",
    icon: "lightbulb",
  },
  {
    id: "v2",
    title: "الأمان",
    description: "حماية بياناتك وسيادتك الرقمية هي أولويتنا القصوى وغير قابلة للمساومة.",
    icon: "shield_lock",
  },
  {
    id: "v3",
    title: "الموثوقية",
    description: "نحن الشريك الذي تعتمد عليه في أصعب التحديات التقنية وأكثرها حساسية.",
    icon: "handshake",
  },
  {
    id: "v4",
    title: "قابلية التوسع",
    description: "حلولنا مصممة لتنمو مع طموحاتك، من الشركات الناشئة إلى المؤسسات الكبرى.",
    icon: "trending_up",
  },
];

export const mockDifferentiators: CMSDifferentiator[] = [
  {
    id: "d1",
    title: "خبرة محلية برؤية عالمية",
    description:
      "فهم عميق للبيئة التنظيمية والثقافية في المملكة مع تطبيق أفضل الممارسات الهندسية الكندية والعالمية.",
    order: 1,
  },
  {
    id: "d2",
    title: "السيادة التقنية الكاملة",
    description:
      "نضمن لك ملكية وتوطين الحلول التقنية بما يتماشى مع متطلبات الأمن الوطني وتوجيهات الهيئة الوطنية للأمن السيبراني.",
    order: 2,
  },
  {
    id: "d3",
    title: "فريق من النخبة",
    description:
      "نضم نخبة من المهندسين والمستشارين الذين قادوا مشاريع تحول رقمي ضخمة على مستوى المنطقة.",
    order: 3,
  },
];

export const mockMarkets: CMSMarketPresence[] = [
  { id: "m1", code: "KSA", label: "المملكة العربية السعودية" },
  { id: "m2", code: "GCC", label: "دول مجلس التعاون الخليجي" },
  { id: "m3", code: "ARA", label: "الوطن العربي" },
  { id: "m4", code: "CAN", label: "كندا (المركز التقني)" },
];

export const mockAboutStats: CMSStat[] = [
  { id: "as1", value: "50+", label: "مشروع حكومي ناجح" },
  { id: "as2", value: "99%", label: "نسبة رضا العملاء" },
  { id: "as3", value: "24/7", label: "دعم فني متخصص" },
  { id: "as4", value: "100+", label: "خبير تقني" },
];
