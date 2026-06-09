import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../i18n";

// ─────────────────────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────────────────────

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  ctaLabel?: string;
  ctaTo?: string;
}

interface FAQ {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
  ctaLabel?: string;
  ctaTo?: string;
}

let _id = 0;
const uid = () => `m${++_id}`;

// ─────────────────────────────────────────────────────────────
//  FAQ DATA — Arabic
// ─────────────────────────────────────────────────────────────

const FAQS_AR: FAQ[] = [
  {
    id: "greeting",
    question: "مرحباً",
    keywords: [
      "اهلا", "أهلا", "هاي", "hi", "hello", "مرحبا", "مرحباً", "السلام", "السلام عليكم",
      "وعليكم", "صباح", "مساء", "كيف حالك", "عامل ايه", "ازيك", "ازيكم", "ايه الاخبار",
      "شو اخبارك", "كيفك", "كيف الاحوال", "هلا", "يا هلا", "وش", "مرحبتين"
    ],
    answer: "أهلاً وسهلاً بك! 👋\nيسعدني مساعدتك اليوم. SpinesTech هنا لتحويل أفكارك التقنية إلى واقع.\n\nكيف يمكنني مساعدتك؟",
  },
  {
    id: "thanks",
    question: "شكراً",
    keywords: [
      "شكرا", "شكراً", "تسلم", "يسلمو", "مشكور", "ممنون", "الله يعطيك العافية",
      "يزاك الله", "يزاك خير", "جزاك", "thanks", "thank you", "thx", "ty",
      "احسنت", "برافو", "عظيم", "ممتاز", "حلو", "تمام", "زين"
    ],
    answer: "العفو! 😊 يسعدنا دائماً خدمتك.\nهل هناك شيء آخر تريد معرفته عن SpinesTech؟",
  },
  {
    id: "about",
    question: "من هي SpinesTech؟",
    keywords: [
      "من انتم", "من أنتم", "عن الشركة", "عنكم", "spinestech", "سباينز", "تعريف", "ما هي",
      "اخبرني عنكم", "حدثني", "وصف", "تعرف", "عرفني", "مين", "إيه هي", "ايه هي",
      "شركتكم", "عملكم", "مجالكم", "نبذة", "تأسست", "متى تأسست", "تاريخ الشركة"
    ],
    answer: "SpinesTech شركة تقنية سعودية رائدة 🚀\n\nمتخصصون في:\n• تطوير البرمجيات المخصصة\n• أنظمة ERP الذكية\n• تطبيقات الذكاء الاصطناعي\n• التحول الرقمي للمؤسسات\n\nتأسست لتحويل التحديات التقنية إلى فرص نمو حقيقية للشركات في السعودية والخليج.",
  },
  {
    id: "services",
    question: "ما هي خدماتكم؟",
    keywords: [
      "خدمات", "خدمة", "تعملوا ايه", "تقدمون", "تعملون", "ماذا تقدمون", "ايش تسوون",
      "برامج", "تطوير", "ايه اللي بتعملوه", "بتشتغلوا في ايه", "تخصصكم", "مجالاتكم",
      "حلول", "منتجات", "انظمة", "تطبيقات", "مواقع", "ويب", "موبايل",
      "ايه اللي عندكم", "عندكم ايه", "ماعندكم"
    ],
    answer: "خدماتنا الرئيسية 💼\n\n• تطوير البرمجيات المخصصة\n• أنظمة ERP المتكاملة\n• تطبيقات الجوال (iOS & Android)\n• حلول الذكاء الاصطناعي والأتمتة\n• التحول الرقمي للمؤسسات\n• تكامل الأنظمة وواجهات API\n• تصميم UX/UI احترافي\n• الاستشارات التقنية المتخصصة",
    ctaLabel: "تصفح كل الخدمات",
    ctaTo: "/services",
  },
  {
    id: "erp",
    question: "ما هي أنظمة ERP التي تبنونها؟",
    keywords: [
      "erp", "نظام erp", "موارد", "محاسبة", "مخازن", "مبيعات", "hr", "موارد بشرية",
      "مالية", "اي ار بي", "نظام مؤسسي", "ادارة", "مستودعات", "مخزون",
      "رواتب", "مشتريات", "تقارير", "لوحة تحكم", "نظام متكامل", "enterprise"
    ],
    answer: "أنظمة ERP المخصصة لشركتك 🏢\n\nتشمل:\n• المحاسبة والمالية الذكية\n• إدارة المخزون والمستودعات\n• المبيعات والمشتريات\n• الموارد البشرية والرواتب\n• إدارة المشاريع\n• تقارير تحليلية متقدمة\n• لوحات تحكم تفاعلية\n\nكل نظام يُبنى 100% حسب احتياجاتك.",
    ctaLabel: "اكتشف الحلول",
    ctaTo: "/solutions",
  },
  {
    id: "ai",
    question: "ما هي حلول الذكاء الاصطناعي؟",
    keywords: [
      "ذكاء اصطناعي", "ai", "تعلم آلي", "chatbot", "شات بوت", "أتمتة", "اتمتة",
      "روبوت", "llm", "gpt", "machine learning", "رpa", "اتوماتيك", "تلقائي",
      "بيانات", "تحليل", "تنبؤ", "توقع", "nlp", "معالجة لغة", "صور", "وثائق",
      "انتلجنس", "ذكي", "ذكاء"
    ],
    answer: "حلول الذكاء الاصطناعي لدينا 🤖\n\n• شات بوت ذكي لخدمة العملاء (24/7)\n• تحليل البيانات والتنبؤ المتقدم\n• أتمتة العمليات الروتينية (RPA)\n• معالجة اللغة الطبيعية عربي/إنجليزي\n• التعرف على الصور والمستندات\n• لوحات ذكاء أعمال بـ AI\n• توصيات مخصصة للمستخدمين",
    ctaLabel: "احجز استشارة",
    ctaTo: "/consultation",
  },
  {
    id: "sectors",
    question: "ما هي القطاعات التي تخدمونها؟",
    keywords: [
      "قطاعات", "قطاع", "مجالات", "صناعات", "تجزئة", "عقارات", "صحة", "تعليم",
      "لوجستك", "بنوك", "مطاعم", "تجارة", "حكومة", "طب", "مستشفى", "عيادة",
      "مدارس", "جامعة", "فنادق", "سياحة", "نقل", "شحن", "مال", "استثمار",
      "تأمين", "اتصالات", "طاقة", "بترول", "صناعة", "مصنع"
    ],
    answer: "نخدم 50+ قطاعاً 🌍\n\nأبرزها:\n• التجزئة والتجارة الإلكترونية\n• العقارات وإدارة الأصول\n• الرعاية الصحية والمستشفيات\n• التعليم والتدريب\n• اللوجستيات والنقل\n• الخدمات المالية والبنوك\n• المطاعم والضيافة\n• التصنيع والإنتاج\n• الحكومة والقطاع العام",
    ctaLabel: "اكتشف القطاعات",
    ctaTo: "/sectors",
  },
  {
    id: "pricing",
    question: "كم تكلف الخدمة؟",
    keywords: [
      "سعر", "تكلفة", "كم", "اسعار", "أسعار", "ميزانية", "تسعير", "غالي", "رخيص",
      "فلوس", "مبلغ", "كوتيشن", "عرض سعر", "بكام", "بقد ايه", "تمن", "ثمن",
      "تكاليف", "رسوم", "اشتراك", "باقة", "مجاني", "مجانا", "free",
      "affordable", "cheap", "cost", "price", "budget", "quote"
    ],
    answer: "الأسعار حسب حجم المشروع 💰\n\n• المشاريع الصغيرة: تبدأ من $5,000\n• المشاريع المتوسطة: $15,000 – $50,000\n• المشاريع الكبيرة / المؤسسية: تُحدد بعد التقييم\n\n✅ نقدم عرض سعر مجاني ومفصل خلال 24 ساعة\n✅ لا رسوم خفية\n✅ دفع على مراحل",
    ctaLabel: "اطلب عرض سعر مجاني",
    ctaTo: "/quote",
  },
  {
    id: "timeline",
    question: "كم مدة تنفيذ المشروع؟",
    keywords: [
      "مدة", "وقت", "كم يستغرق", "متى", "تسليم", "deadline", "جدول", "سريع", "عاجل",
      "بسرعة", "امتى", "تاخد قد ايه", "كم وقت", "ايمتى", "موعد", "خلاص",
      "timeline", "duration", "how long", "delivery time", "انهاء", "اتمام"
    ],
    answer: "مدة التنفيذ حسب المشروع ⏱️\n\n• المشاريع الصغيرة: 3–6 أسابيع\n• المشاريع المتوسطة: 2–4 أشهر\n• المشاريع الكبيرة: 4–9 أشهر\n\nنستخدم Agile مع:\n✅ تقارير أسبوعية\n✅ صلاحية وصول لبيئة الاختبار\n✅ التزام كامل بالمواعيد",
  },
  {
    id: "support",
    question: "هل يوجد دعم فني بعد التسليم؟",
    keywords: [
      "دعم", "صيانة", "بعد التسليم", "ضمان", "مشكلة", "بعدين", "خطأ", "bug",
      "تحديث", "support", "مساعدة", "لو حصل حاجة", "لو في مشكلة", "يعطل",
      "بعد ما خلصتم", "ما بعد", "متابعة", "رعاية", "خدمة عملاء"
    ],
    answer: "دعم فني متكامل بعد التسليم 🛡️\n\nكل مشاريعنا تشمل:\n• ضمان 3 أشهر مجاني بعد التسليم\n• دعم فني 24/7 للحالات الحرجة\n• تحديثات أمنية دورية\n• باقات صيانة شهرية وسنوية\n• فريق دعم مخصص يتحدث العربية\n• وقت استجابة أقل من ساعة للمشاكل الحرجة",
    ctaLabel: "تصفح الباقات",
    ctaTo: "/pricing",
  },
  {
    id: "process",
    question: "ما هي منهجية العمل لديكم؟",
    keywords: [
      "منهجية", "آلية", "طريقة", "خطوات", "مراحل", "كيف تعملون", "agile", "scrum",
      "تفاصيل", "عملية", "كيف بتشتغلوا", "اسلوب عملكم", "بتبدأوا ازاي",
      "خطة", "استراتيجية", "نهج", "approach", "process", "methodology"
    ],
    answer: "منهجية العمل لدينا 📋\n\n5 مراحل واضحة:\n1️⃣ الاستشارة وتحليل المتطلبات\n2️⃣ التصميم وتجربة المستخدم (UX/UI)\n3️⃣ التطوير والاختبار المستمر\n4️⃣ الإطلاق والنشر\n5️⃣ الدعم والتطوير المستمر\n\nتحصل على تقارير أسبوعية + صلاحية وصول لبيئة الاختبار طوال المشروع.",
    ctaLabel: "احجز استشارة",
    ctaTo: "/consultation",
  },
  {
    id: "small-business",
    question: "هل تعملون مع الشركات الصغيرة؟",
    keywords: [
      "شركة صغيرة", "ستارت اب", "startup", "ناشئة", "صغير", "بداية", "رائد أعمال",
      "فردي", "ميزانية محدودة", "مشروع صغير", "بيزنس صغير", "مبتدئ",
      "للأفراد", "شخصي", "mvp", "نموذج أولي", "بروتوتايب", "prototype"
    ],
    answer: "بالتأكيد! 🤝\n\nنؤمن أن كل شركة تستحق تقنية عالية المستوى:\n• حلول مرنة تناسب كل الميزانيات\n• إمكانية البدء بـ MVP صغير والتوسع تدريجياً\n• دعم خاص للشركات الناشئة\n• استشارة مجانية للبدء",
    ctaLabel: "احجز استشارة مجانية",
    ctaTo: "/consultation",
  },
  {
    id: "tech",
    question: "ما هي التقنيات التي تستخدمونها؟",
    keywords: [
      "تقنيات", "لغات", "react", "nodejs", "python", "flutter", "next", "تقنية",
      "framework", "stack", "سكريبت", "كود", "برمجة", "لغة برمجة",
      "تكنولوجيا", "ادوات", "بتستخدموا ايه", "بتشتغلوا بايه"
    ],
    answer: "نستخدم أحدث التقنيات 💻\n\n• الواجهة الأمامية: React, Next.js, Vue\n• الخلفية: Node.js, Python, Laravel\n• الجوال: Flutter, React Native\n• قواعد البيانات: PostgreSQL, MongoDB, Redis\n• السحابة: AWS, Azure, Google Cloud\n• AI/ML: OpenAI, LangChain, TensorFlow",
  },
  {
    id: "consultation",
    question: "كيف أحجز استشارة؟",
    keywords: [
      "استشارة", "حجز", "اجتماع", "meeting", "كلمني", "تواصل", "اتكلم", "اقدر",
      "طريقة", "ابدأ", "ابدا", "عايز ابدا", "كيف ابدا", "ابدأ معاكم",
      "زيارة", "موعد", "appointment", "call", "مكالمة", "اتصل"
    ],
    answer: "احجز استشارتك المجانية 📅\n\nاستشارة مجانية 45 دقيقة مع خبير متخصص:\n✅ تحليل احتياجات مشروعك\n✅ حلول مقترحة وتقنيات مناسبة\n✅ تقدير أولي للتكلفة والوقت\n✅ توصية واضحة فور الانتهاء\n\nالاستشارة مجانية 100% وبدون التزام.",
    ctaLabel: "احجز الآن — مجانًا",
    ctaTo: "/consultation",
  },
  {
    id: "contact",
    question: "كيف أتواصل مع الفريق؟",
    keywords: [
      "تواصل", "اتصال", "ايميل", "email", "هاتف", "واتساب", "whatsapp", "رسالة",
      "فريق", "مبيعات", "كلمني", "ابعتلي", "ابعت", "ارسل", "راسلوني",
      "ارقامكم", "رقمكم", "عنوانكم", "فين انتم", "contact"
    ],
    answer: "تواصل معنا 📞\n\n• نموذج التواصل على الموقع\n• البريد: info@spinestech.sa\n• واتساب للاستفسارات السريعة\n\nيرد فريقنا خلال 4 ساعات عمل كحد أقصى ⚡",
    ctaLabel: "تواصل معنا",
    ctaTo: "/contact",
  },
  {
    id: "portfolio",
    question: "هل يمكنني رؤية أعمالكم السابقة؟",
    keywords: [
      "اعمال", "أعمال", "مشاريع سابقة", "portfolio", "امثلة", "أمثلة", "عملاء",
      "نماذج", "شركات", "شغلتوا ايه", "اشوف شغلكم", "اشوف مشاريع",
      "clients", "case study", "دراسة حالة", "انجازات", "مشاريع منجزة"
    ],
    answer: "أعمالنا المنجزة 🏆\n\nنعم! في صفحة دراسات الحالة ستجد مشاريع في:\n• التجزئة والتجارة الإلكترونية\n• العقارات الذكية\n• الذكاء الاصطناعي\n• وغيرها الكثير\n\nمع تفاصيل كاملة: التحدي، الحل، والنتائج الفعلية.",
    ctaLabel: "تصفح دراسات الحالة",
    ctaTo: "/case-studies",
  },
  {
    id: "location",
    question: "أين مقر الشركة؟",
    keywords: [
      "مقر", "موقع", "عنوان", "رياض", "جدة", "سعودية", "خليج", "اين", "أين", "مكان",
      "فين", "فين انتم", "وين", "وين انتم", "كيف اوصلكم", "بلدكم", "دولتكم"
    ],
    answer: "📍 مقرنا الرئيسي في المملكة العربية السعودية\n\nنخدم عملاء في:\n• جميع مناطق المملكة\n• الإمارات والكويت والبحرين\n• قطر وعُمان واليمن\n• وجميع أنحاء العالم العربي\n\nنعمل بالكامل عن بُعد مع فرق موزعة وخبيرة.",
  },
  {
    id: "careers",
    question: "هل تقبلون طلبات التوظيف؟",
    keywords: [
      "وظائف", "توظيف", "عمل", "تقديم", "job", "careers", "فرصة", "مهندس",
      "مطور", "مصمم", "شغل", "عايز اشتغل", "ابحث عن عمل", "استخدام",
      "vacancy", "hiring", "intern", "تدريب", "تدريب عملي"
    ],
    answer: "انضم لفريق SpinesTech 🎯\n\nنبحث دائماً عن مواهب في:\n• تطوير البرمجيات (Frontend/Backend)\n• تصميم UX/UI\n• إدارة المشاريع\n• الذكاء الاصطناعي وData Science\n\nبيئة عمل مرنة، فريق موزع، وفرص نمو حقيقية.",
    ctaLabel: "تصفح الوظائف",
    ctaTo: "/careers",
  },
];

// ─────────────────────────────────────────────────────────────
//  FAQ DATA — English
// ─────────────────────────────────────────────────────────────

const FAQS_EN: FAQ[] = [
  {
    id: "greeting",
    question: "Hello!",
    keywords: ["hi", "hello", "hey", "greetings", "good morning", "good evening", "howdy", "sup", "yo", "hiya"],
    answer: "Hello! Welcome to SpinesTech! 👋\nI'm your smart assistant. How can I help you today?",
  },
  {
    id: "thanks",
    question: "Thank you",
    keywords: ["thanks", "thank you", "thx", "ty", "appreciate", "great", "awesome", "perfect", "excellent", "nice"],
    answer: "You're welcome! 😊 Always happy to help.\nIs there anything else you'd like to know about SpinesTech?",
  },
  {
    id: "about",
    question: "Who is SpinesTech?",
    keywords: ["who are you", "about", "company", "spinestech", "what is", "tell me about", "describe", "overview", "founded", "background"],
    answer: "SpinesTech is a leading Saudi tech company 🚀\n\nSpecializing in:\n• Custom software development\n• Smart ERP systems\n• AI & automation solutions\n• Enterprise digital transformation\n\nWe turn technical challenges into real growth opportunities across Saudi Arabia and the GCC.",
  },
  {
    id: "services",
    question: "What services do you offer?",
    keywords: ["services", "what do you do", "offer", "develop", "build", "software", "what can you do", "capabilities", "solutions", "products"],
    answer: "Our Core Services 💼\n\n• Custom software development\n• Integrated ERP systems\n• Mobile apps (iOS & Android)\n• AI & automation solutions\n• Enterprise digital transformation\n• System integration & APIs\n• Professional UX/UI design\n• Technical consulting",
    ctaLabel: "Browse all services",
    ctaTo: "/services",
  },
  {
    id: "erp",
    question: "What ERP systems do you build?",
    keywords: ["erp", "enterprise resource", "accounting", "inventory", "hr", "payroll", "finance", "warehouse", "sales", "procurement", "enterprise"],
    answer: "Custom ERP Systems 🏢\n\nCovering:\n• Accounting & smart finance\n• Inventory & warehouse management\n• Sales & procurement\n• HR & payroll\n• Project management\n• Advanced analytics & reporting\n• Interactive dashboards\n\nEvery system is built 100% for your business.",
    ctaLabel: "Explore solutions",
    ctaTo: "/solutions",
  },
  {
    id: "ai",
    question: "What AI solutions do you offer?",
    keywords: ["ai", "artificial intelligence", "machine learning", "chatbot", "automation", "nlp", "gpt", "rpa", "data", "analytics", "smart"],
    answer: "Our AI Solutions 🤖\n\n• Intelligent customer service chatbots (24/7)\n• Advanced data analytics & forecasting\n• Robotic process automation (RPA)\n• Arabic & English NLP\n• Document & image recognition\n• AI-powered business intelligence\n• Personalized recommendation engines",
    ctaLabel: "Book a consultation",
    ctaTo: "/consultation",
  },
  {
    id: "sectors",
    question: "Which sectors do you serve?",
    keywords: ["sectors", "industries", "retail", "real estate", "healthcare", "education", "logistics", "finance", "restaurants", "hospitality", "manufacturing"],
    answer: "Serving 50+ Sectors 🌍\n\nTop sectors:\n• Retail & e-commerce\n• Real estate & asset management\n• Healthcare & hospitals\n• Education & training\n• Logistics & transportation\n• Financial services & banking\n• Restaurants & hospitality\n• Manufacturing & production\n• Government & public sector",
    ctaLabel: "Explore sectors",
    ctaTo: "/sectors",
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    keywords: ["price", "cost", "how much", "budget", "pricing", "quote", "expensive", "cheap", "affordable", "fee", "rate", "subscription", "free"],
    answer: "Transparent Pricing 💰\n\n• Small projects: starting from $5,000\n• Medium projects: $15,000 – $50,000\n• Large / enterprise: assessed individually\n\n✅ Free detailed quote within 24 hours\n✅ No hidden fees\n✅ Milestone-based payments",
    ctaLabel: "Get a free quote",
    ctaTo: "/quote",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    keywords: ["timeline", "how long", "duration", "deadline", "when", "delivery", "fast", "urgent", "time", "schedule"],
    answer: "Project Timelines ⏱️\n\n• Small projects: 3–6 weeks\n• Medium projects: 2–4 months\n• Large projects: 4–9 months\n\nWith Agile methodology:\n✅ Weekly progress reports\n✅ Staging environment access\n✅ Full commitment to deadlines",
  },
  {
    id: "support",
    question: "Do you offer post-delivery support?",
    keywords: ["support", "maintenance", "after delivery", "warranty", "bug", "update", "help", "issue", "problem", "fix"],
    answer: "Full Post-Delivery Support 🛡️\n\nEvery project includes:\n• 3-month free warranty\n• 24/7 critical support\n• Regular security updates\n• Monthly & annual maintenance packages\n• Dedicated Arabic-speaking support team\n• Under 1-hour response for critical issues",
    ctaLabel: "View pricing plans",
    ctaTo: "/pricing",
  },
  {
    id: "process",
    question: "What is your development process?",
    keywords: ["process", "methodology", "steps", "phases", "agile", "scrum", "how do you work", "approach", "workflow", "stages"],
    answer: "Our Development Process 📋\n\n5 clear phases:\n1️⃣ Consultation & requirements analysis\n2️⃣ UX/UI design\n3️⃣ Development & continuous testing\n4️⃣ Launch & deployment\n5️⃣ Ongoing support & development\n\nWeekly reports + staging access throughout.",
    ctaLabel: "Book a consultation",
    ctaTo: "/consultation",
  },
  {
    id: "small-business",
    question: "Do you work with small businesses?",
    keywords: ["small business", "startup", "small", "budget", "limited", "entrepreneur", "freelance", "mvp", "prototype", "individual"],
    answer: "Absolutely! 🤝\n\nWe believe every company deserves world-class technology:\n• Flexible solutions for all budgets\n• Start small with MVP, scale gradually\n• Special startup support\n• Free consultation to get started",
    ctaLabel: "Book a free consultation",
    ctaTo: "/consultation",
  },
  {
    id: "tech",
    question: "What technologies do you use?",
    keywords: ["technology", "tech stack", "react", "nodejs", "python", "flutter", "languages", "framework", "code", "tools", "programming"],
    answer: "Our Tech Stack 💻\n\n• Frontend: React, Next.js, Vue\n• Backend: Node.js, Python, Laravel\n• Mobile: Flutter, React Native\n• Databases: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Azure, Google Cloud\n• AI/ML: OpenAI, LangChain, TensorFlow",
  },
  {
    id: "consultation",
    question: "How do I book a consultation?",
    keywords: ["consultation", "book", "meeting", "call", "talk", "start", "how to", "appointment", "schedule", "get started", "begin"],
    answer: "Book Your Free Consultation 📅\n\nFree 45-minute session with a specialist:\n✅ Project needs analysis\n✅ Solution & tech recommendations\n✅ Initial cost & timeline estimate\n✅ Clear recommendation after the session\n\n100% free, no commitment.",
    ctaLabel: "Book now — free",
    ctaTo: "/consultation",
  },
  {
    id: "contact",
    question: "How can I contact the team?",
    keywords: ["contact", "email", "phone", "whatsapp", "message", "reach", "sales", "talk to", "get in touch", "send"],
    answer: "Get in Touch 📞\n\n• Contact form on our website\n• Email: info@spinestech.sa\n• WhatsApp for quick inquiries\n\nOur team responds within 4 business hours ⚡",
    ctaLabel: "Contact us",
    ctaTo: "/contact",
  },
  {
    id: "portfolio",
    question: "Can I see your past work?",
    keywords: ["portfolio", "past work", "case studies", "examples", "clients", "projects", "previous", "showcase", "demos", "work"],
    answer: "Our Portfolio 🏆\n\nBrowse case studies in:\n• Retail & e-commerce\n• Smart real estate\n• AI solutions\n• And much more\n\nWith full details: challenge, solution, and actual results.",
    ctaLabel: "View case studies",
    ctaTo: "/case-studies",
  },
  {
    id: "careers",
    question: "Are you hiring?",
    keywords: ["jobs", "hiring", "careers", "work", "apply", "engineer", "developer", "designer", "join", "vacancy", "intern", "opportunity"],
    answer: "Join SpinesTech 🎯\n\nAlways looking for talent in:\n• Software development (Frontend/Backend)\n• UX/UI design\n• Project management\n• AI & Data Science\n\nFlexible remote environment with real growth opportunities.",
    ctaLabel: "View open positions",
    ctaTo: "/careers",
  },
];

// ─────────────────────────────────────────────────────────────
//  KEYWORD MATCHER
// ─────────────────────────────────────────────────────────────

function findFAQ(input: string, faqs: FAQ[]): FAQ | null {
  const q = input.toLowerCase().trim();
  const exact = faqs.find((f) => f.question.toLowerCase() === q);
  if (exact) return exact;
  const scored = faqs
    .map((f) => ({
      faq: f,
      score: f.keywords.filter((k) => q.includes(k.toLowerCase())).length,
    }))
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score);
  return scored[0]?.faq ?? null;
}

// ─────────────────────────────────────────────────────────────
//  SUGGESTIONS
// ─────────────────────────────────────────────────────────────

const INITIAL_SUGGESTIONS_AR = ["services", "pricing", "consultation", "timeline", "support", "portfolio"];
const INITIAL_SUGGESTIONS_EN = ["services", "pricing", "consultation", "timeline", "support", "portfolio"];

// ─────────────────────────────────────────────────────────────
//  CHATBOT COMPONENT
// ─────────────────────────────────────────────────────────────

export function ChatBot() {
  const { locale, dir } = useTranslation();
  const faqs = locale === "ar" ? FAQS_AR : FAQS_EN;
  const isRTL = dir === "rtl";

  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // mount animation
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1500);
    return () => clearTimeout(t);
  }, []);

  // pulse effect every 6s while closed
  useEffect(() => {
    if (open) return;
    const id = setInterval(() => {
      setPulse(true);
      setTimeout(() => setPulse(false), 1200);
    }, 6000);
    return () => clearInterval(id);
  }, [open]);

  // welcome message on first open
  useEffect(() => {
    if (!open || initialized) return;
    setInitialized(true);
    setTimeout(() => {
      const welcome =
        locale === "ar"
          ? "أهلاً وسهلاً! 👋\nأنا المساعد الذكي لـ SpinesTech. اكتب سؤالك أو اختر من الأسئلة الشائعة."
          : "Welcome! 👋\nI'm SpinesTech's smart assistant. Type your question or pick from the suggestions below.";
      setMessages([{ id: uid(), role: "bot", text: welcome }]);
    }, 300);
  }, [open, initialized, locale]);

  // scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // focus input when open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  // ── Scroll isolation: prevent page scroll when mouse is inside chat ──
  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      const { scrollTop, scrollHeight, clientHeight } = el;
      const atTop = scrollTop === 0 && e.deltaY < 0;
      const atBottom = scrollTop + clientHeight >= scrollHeight && e.deltaY > 0;
      if (!atTop && !atBottom) {
        e.stopPropagation();
      }
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, [open]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setMessages((prev) => [...prev, { id: uid(), role: "user", text: trimmed }]);
      setInputValue("");
      setIsTyping(true);
      const matched = findFAQ(trimmed, faqs);
      setTimeout(() => {
        setIsTyping(false);
        if (matched) {
          setMessages((prev) => [
            ...prev,
            {
              id: uid(),
              role: "bot",
              text: matched.answer,
              ctaLabel: matched.ctaLabel,
              ctaTo: matched.ctaTo,
            },
          ]);
        } else {
          const fallback =
            locale === "ar"
              ? "عذراً، لم أفهم سؤالك جيداً. 🤔\nجرّب صياغة مختلفة، أو تواصل مع فريقنا مباشرة."
              : "Sorry, I didn't quite catch that. 🤔\nTry rephrasing, or reach out to our team directly.";
          setMessages((prev) => [
            ...prev,
            {
              id: uid(),
              role: "bot",
              text: fallback,
              ctaLabel: locale === "ar" ? "تواصل معنا" : "Contact us",
              ctaTo: "/contact",
            },
          ]);
        }
      }, 700 + Math.random() * 400);
    },
    [faqs, locale]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const suggestedIds = locale === "ar" ? INITIAL_SUGGESTIONS_AR : INITIAL_SUGGESTIONS_EN;
  const suggestions = faqs.filter((f) => suggestedIds.includes(f.id));

  const formatText = (text: string) =>
    text.split("\n").map((line, i) => (
      <span key={i}>
        {line}
        {i < text.split("\n").length - 1 && <br />}
      </span>
    ));

  return (
    <>
      {/* ── CHAT WINDOW ── */}
      <div
        aria-live="polite"
        style={{
          position: "fixed",
          bottom: "88px",
          right: "20px",
          zIndex: 9998,
          width: "min(420px, calc(100vw - 32px))",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
          transformOrigin: "bottom right",
          transition: "opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          className="flex flex-col overflow-hidden rounded-3xl shadow-2xl shadow-black/30"
          style={{
            maxHeight: "min(620px, calc(100svh - 120px))",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "linear-gradient(145deg, #0d2137 0%, #0a1d2f 100%)",
          }}
        >
          {/* ── HEADER ── */}
          <div className="relative overflow-hidden shrink-0" style={{ background: "linear-gradient(135deg, #0a1d2f 0%, #0d2a42 60%, #0a2318 100%)" }}>
            <div className="islamic-pattern absolute inset-0 opacity-[0.07]" aria-hidden="true" />
            {/* glows */}
            <div className="pointer-events-none absolute -top-8 end-4 w-40 h-40 rounded-full opacity-20 blur-3xl" style={{ background: "#036d36" }} aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-4 start-8 w-24 h-24 rounded-full opacity-10 blur-2xl" style={{ background: "#036d36" }} aria-hidden="true" />

            <div className="relative flex items-center justify-between px-5 py-4" dir={dir}>
              <div className="flex items-center gap-3">
                {/* logo */}
                <div
                  className="flex shrink-0 items-center justify-center overflow-hidden"
                  style={{
                    width: 46,
                    height: 46,
                    borderRadius: 14,
                    background: "rgba(255,255,255,0.08)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                  }}
                >
                  <img src="/images/brand/icon.png" alt="SpinesTech" className="w-8 h-8 object-contain" />
                </div>
                <div>
                  <p className="font-bold text-white text-[15px] leading-tight tracking-tight">SpinesTech</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="size-2 rounded-full bg-green-400 animate-pulse shadow-sm shadow-green-400/60" />
                    <p className="text-[11px] text-white/50">{locale === "ar" ? "المساعد الذكي" : "Smart assistant"}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex size-9 items-center justify-center rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                aria-label={locale === "ar" ? "إغلاق" : "Close"}
                style={{ border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
              </button>
            </div>
          </div>

          {/* ── MESSAGES ── */}
          <div
            ref={scrollContainerRef}
            dir={dir}
            className="flex-1 overflow-y-auto px-4 py-5 space-y-4"
            style={{
              background: "linear-gradient(180deg, #0d1f30 0%, #0a1a28 100%)",
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.12) transparent",
              overscrollBehavior: "contain",
            }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                style={{ animation: "fadeSlideIn 0.3s ease forwards" }}
              >
                {/* bot avatar */}
                {msg.role === "bot" && (
                  <div
                    className="flex size-8 shrink-0 items-center justify-center self-end mb-0.5 overflow-hidden"
                    style={{
                      borderRadius: 10,
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <img src="/images/brand/icon.png" alt="" className="w-5 h-5 object-contain" aria-hidden="true" />
                  </div>
                )}

                <div className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed ${
                      msg.role === "user"
                        ? "rounded-br-sm"
                        : "rounded-bl-sm"
                    }`}
                    style={
                      msg.role === "user"
                        ? {
                            background: "linear-gradient(135deg, #036d36 0%, #025c2d 100%)",
                            color: "white",
                            boxShadow: "0 4px 12px rgba(3,109,54,0.35)",
                          }
                        : {
                            background: "rgba(255,255,255,0.06)",
                            color: "rgba(255,255,255,0.88)",
                            border: "1px solid rgba(255,255,255,0.08)",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          }
                    }
                  >
                    {formatText(msg.text)}
                  </div>

                  {/* CTA */}
                  {msg.role === "bot" && msg.ctaTo && msg.ctaLabel && (
                    <Link
                      to={msg.ctaTo as "/"}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-xl px-4 py-2 text-[12.5px] font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
                      style={{
                        background: "rgba(3,109,54,0.15)",
                        border: "1px solid rgba(3,109,54,0.35)",
                        color: "#4ade80",
                      }}
                    >
                      {msg.ctaLabel}
                      <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                        {isRTL ? "arrow_back" : "arrow_forward"}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}

            {/* typing */}
            {isTyping && (
              <div className="flex gap-2.5" style={{ animation: "fadeSlideIn 0.2s ease forwards" }}>
                <div
                  className="flex size-8 shrink-0 items-center justify-center self-end mb-0.5 overflow-hidden"
                  style={{ borderRadius: 10, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <img src="/images/brand/icon.png" alt="" className="w-5 h-5 object-contain" aria-hidden="true" />
                </div>
                <div
                  className="rounded-2xl rounded-bl-sm px-4 py-3"
                  style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 rounded-full animate-bounce"
                        style={{ background: "rgba(255,255,255,0.3)", animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── SUGGESTIONS ── */}
          <div
            className="shrink-0 px-4 pb-3 pt-3"
            dir={dir}
            style={{
              background: "rgba(10,29,47,0.95)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <p className="text-[11px] font-medium mb-2.5" style={{ color: "rgba(255,255,255,0.35)" }}>
              {locale === "ar" ? "أسئلة شائعة:" : "Suggested questions:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => sendMessage(s.question)}
                  className="text-[12px] font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/30"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    color: "rgba(255,255,255,0.65)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(3,109,54,0.2)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(3,109,54,0.4)";
                    (e.currentTarget as HTMLElement).style.color = "#4ade80";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.09)";
                    (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.65)";
                  }}
                >
                  {s.question}
                </button>
              ))}
            </div>
          </div>

          {/* ── INPUT ── */}
          <form
            onSubmit={handleSubmit}
            dir={dir}
            className="shrink-0 flex items-center gap-3 px-4 py-3"
            style={{
              background: "rgba(8,24,38,0.98)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={locale === "ar" ? "اكتب سؤالك هنا..." : "Type your question..."}
              className="flex-1 rounded-xl px-4 py-2.5 text-[13.5px] outline-none transition-all min-w-0"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.88)",
              }}
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label={locale === "ar" ? "إرسال" : "Send"}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl transition-all hover:scale-105 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40"
              style={{
                background: "linear-gradient(135deg, #036d36 0%, #025c2d 100%)",
                boxShadow: "0 4px 12px rgba(3,109,54,0.4)",
              }}
            >
              <span
                className="material-symbols-outlined text-white text-[18px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                send
              </span>
            </button>
          </form>
        </div>
      </div>

      {/* ── FAB BUTTON ── */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.5) translateY(20px)",
          transition: "opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={
            open
              ? locale === "ar"
                ? "إغلاق المحادثة"
                : "Close chat"
              : locale === "ar"
              ? "افتح المساعد"
              : "Open assistant"
          }
          className="group relative flex items-center cursor-pointer focus-visible:outline-none"
        >
          {/* pulse rings */}
          {!open && pulse && (
            <>
              <span className="absolute inset-0 rounded-full animate-ping" style={{ background: "rgba(3,109,54,0.3)" }} aria-hidden="true" />
              <span className="absolute inset-[-4px] rounded-full animate-ping" style={{ background: "rgba(3,109,54,0.15)", animationDelay: "150ms" }} aria-hidden="true" />
            </>
          )}

          {/* main FAB */}
          <span
            className={`flex size-[58px] items-center justify-center rounded-full transition-all duration-300 group-hover:scale-110 ${open ? "scale-95" : ""}`}
            style={{
              background: open
                ? "linear-gradient(135deg, #0a2318 0%, #0a1d2f 100%)"
                : "linear-gradient(135deg, #0a1d2f 0%, #0d2a42 60%, #0a2318 100%)",
              boxShadow: open
                ? "0 8px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)"
                : "0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {open ? (
              <span className="material-symbols-outlined text-white text-[22px] transition-transform duration-300" aria-hidden="true">
                close
              </span>
            ) : (
              <img
                src="/images/brand/icon.png"
                alt="SpinesTech"
                className="w-9 h-9 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </span>

          {/* unread badge */}
          {!open && !initialized && (
            <span
              className="absolute -top-1 -end-1 flex size-5 items-center justify-center rounded-full text-white text-[10px] font-bold shadow-md animate-bounce"
              style={{ background: "#dc2626" }}
              aria-hidden="true"
            >
              1
            </span>
          )}
        </button>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
      `}</style>
    </>
  );
}
