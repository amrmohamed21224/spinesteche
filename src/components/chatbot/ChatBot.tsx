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
    id: "about",
    question: "من هي SpinesTech؟",
    keywords: ["من انتم", "من أنتم", "عن الشركة", "عنكم", "spinestech", "سباينز", "تعريف", "ما هي"],
    answer: "SpinesTech شركة تقنية سعودية متخصصة في تطوير حلول برمجية مخصصة، أنظمة ERP، وتطبيقات الذكاء الاصطناعي للشركات الطموحة في السعودية والخليج. تأسست بهدف تحويل التحديات التقنية إلى فرص نمو حقيقية.",
  },
  {
    id: "services",
    question: "ما هي خدماتكم؟",
    keywords: ["خدمات", "خدمة", "تعملوا ايه", "تقدمون", "تعملون", "ماذا تقدمون", "ايش تسوون", "برامج", "تطوير"],
    answer: "نقدم طيفاً واسعاً من الخدمات:\n• تطوير البرمجيات المخصصة\n• أنظمة ERP المتكاملة\n• تطبيقات الجوال (iOS & Android)\n• حلول الذكاء الاصطناعي والأتمتة\n• التحول الرقمي للمؤسسات\n• تكامل الأنظمة وواجهات API\n• الاستشارات التقنية",
    ctaLabel: "تصفح كل الخدمات",
    ctaTo: "/services",
  },
  {
    id: "erp",
    question: "ما هي أنظمة ERP التي تبنونها؟",
    keywords: ["erp", "نظام erp", "موارد", "محاسبة", "مخازن", "مبيعات", "hr", "موارد بشرية", "مالية", "اي ار بي"],
    answer: "نبني أنظمة ERP مخصصة تشمل: المحاسبة والمالية، إدارة المخزون والمستودعات، المبيعات والمشتريات، الموارد البشرية والرواتب، إدارة المشاريع، وإعداد التقارير التحليلية. كل نظام يُبنى حسب احتياجات شركتك تحديداً.",
    ctaLabel: "اكتشف الحلول",
    ctaTo: "/solutions",
  },
  {
    id: "ai",
    question: "ما هي حلول الذكاء الاصطناعي لديكم؟",
    keywords: ["ذكاء اصطناعي", "ai", "تعلم آلي", "chatbot", "شات بوت", "أتمتة", "اتمتة", "روبوت", "llm", "gpt"],
    answer: "حلول الذكاء الاصطناعي لدينا تشمل: شات بوت ذكي لخدمة العملاء، تحليل البيانات والتنبؤ، أتمتة العمليات الروتينية (RPA)، معالجة اللغة الطبيعية (NLP) بالعربي والإنجليزي، التعرف على الصور والمستندات، ولوحات تحليلية بـ AI.",
    ctaLabel: "احجز استشارة",
    ctaTo: "/consultation",
  },
  {
    id: "sectors",
    question: "ما هي القطاعات التي تخدمونها؟",
    keywords: ["قطاعات", "قطاع", "مجالات", "صناعات", "تجزئة", "عقارات", "صحة", "تعليم", "لوجستك", "بنوك", "مطاعم"],
    answer: "نخدم أكثر من 50 قطاعاً، أبرزها:\n• التجزئة والتجارة الإلكترونية\n• العقارات وإدارة الأصول\n• الرعاية الصحية والمستشفيات\n• التعليم والتدريب\n• اللوجستيات والنقل\n• الخدمات المالية والبنوك\n• المطاعم والضيافة\n• التصنيع والإنتاج",
    ctaLabel: "اكتشف القطاعات",
    ctaTo: "/sectors",
  },
  {
    id: "pricing",
    question: "كم تكلف الخدمة؟",
    keywords: ["سعر", "تكلفة", "كم", "اسعار", "أسعار", "ميزانية", "تسعير", "غالي", "رخيص", "فلوس", "مبلغ", "كوتيشن", "عرض سعر"],
    answer: "تختلف التكلفة حسب حجم المشروع ومتطلباته:\n• المشاريع الصغيرة: تبدأ من $5,000\n• المشاريع المتوسطة: $15,000 – $50,000\n• المشاريع الكبيرة / المؤسسية: تُحدد بعد التقييم\n\nنقدم عرض سعر مجاني ومفصل خلال 24 ساعة من تقديم الطلب.",
    ctaLabel: "اطلب عرض سعر مجاني",
    ctaTo: "/quote",
  },
  {
    id: "timeline",
    question: "كم مدة تنفيذ المشروع؟",
    keywords: ["مدة", "وقت", "كم يستغرق", "متى", "تسليم", "deadline", "جدول", "سريع", "عاجل"],
    answer: "مدة التنفيذ تعتمد على حجم المشروع:\n• المشاريع الصغيرة: 3–6 أسابيع\n• المشاريع المتوسطة: 2–4 أشهر\n• المشاريع الكبيرة: 4–9 أشهر\n\nنلتزم دائماً بالمواعيد المتفق عليها ونستخدم Agile لضمان الشفافية في كل مرحلة.",
  },
  {
    id: "support",
    question: "هل يوجد دعم فني بعد التسليم؟",
    keywords: ["دعم", "صيانة", "بعد التسليم", "ضمان", "مشكلة", "بعدين", "خطأ", "bug", "تحديث", "support", "مساعدة"],
    answer: "نعم! كل مشاريعنا تشمل:\n• ضمان 3 أشهر مجاني بعد التسليم\n• دعم فني 24/7 للحالات الحرجة\n• تحديثات أمنية دورية\n• باقات صيانة شهرية وسنوية\n• فريق دعم مخصص يتحدث العربية",
    ctaLabel: "تصفح الباقات",
    ctaTo: "/pricing",
  },
  {
    id: "process",
    question: "ما هي منهجية العمل لديكم؟",
    keywords: ["منهجية", "آلية", "طريقة", "خطوات", "مراحل", "كيف تعملون", "agile", "scrum", "تفاصيل", "عملية"],
    answer: "نتبع منهجية Agile في 5 مراحل:\n1. الاستشارة وتحليل المتطلبات\n2. التصميم وتجربة المستخدم (UX/UI)\n3. التطوير والاختبار المستمر\n4. الإطلاق والنشر\n5. الدعم والتطوير المستمر\n\nتحصل على تقارير أسبوعية وصلاحية وصول لبيئة الاختبار طوال المشروع.",
    ctaLabel: "احجز استشارة",
    ctaTo: "/consultation",
  },
  {
    id: "small-business",
    question: "هل تعملون مع الشركات الصغيرة؟",
    keywords: ["شركة صغيرة", "ستارت اب", "startup", "ناشئة", "صغير", "بداية", "رائد أعمال", "فردي", "ميزانية محدودة"],
    answer: "بالتأكيد! نحن نؤمن أن كل شركة تستحق تقنية عالية المستوى بغض النظر عن حجمها. لدينا حلول مرنة تناسب الشركات الناشئة، مع إمكانية البدء بمشروع MVP صغير وتوسيعه تدريجياً.",
    ctaLabel: "احجز استشارة مجانية",
    ctaTo: "/consultation",
  },
  {
    id: "tech",
    question: "ما هي التقنيات التي تستخدمونها؟",
    keywords: ["تقنيات", "لغات", "react", "nodejs", "python", "flutter", "next", "تقنية", "framework", "stack", "سكريبت", "كود"],
    answer: "نستخدم أحدث التقنيات حسب متطلبات المشروع:\n• الواجهة الأمامية: React, Next.js, Vue\n• الخلفية: Node.js, Python, Laravel\n• الجوال: Flutter, React Native\n• قواعد البيانات: PostgreSQL, MongoDB, Redis\n• السحابة: AWS, Azure, Google Cloud\n• AI/ML: OpenAI, LangChain, TensorFlow",
  },
  {
    id: "consultation",
    question: "كيف أحجز استشارة؟",
    keywords: ["استشارة", "حجز", "اجتماع", "meeting", "كلمني", "تواصل", "اتكلم", "اقدر", "طريقة", "ابدأ"],
    answer: "يمكنك حجز استشارة مجانية مدتها 45 دقيقة مع أحد خبرائنا. ستتحدث معه عن:\n• أهداف مشروعك\n• التحديات التقنية الحالية\n• الميزانية والجدول الزمني\n\nسنرسل لك توصية واضحة فور انتهاء الاستشارة.",
    ctaLabel: "احجز الآن — مجانًا",
    ctaTo: "/consultation",
  },
  {
    id: "contact",
    question: "كيف أتواصل مع الفريق؟",
    keywords: ["تواصل", "اتصال", "ايميل", "email", "هاتف", "واتساب", "whatsapp", "رسالة", "فريق", "مبيعات"],
    answer: "يمكنك التواصل معنا عبر:\n• نموذج التواصل على الموقع\n• البريد الإلكتروني: info@spinestech.sa\n• واتساب للاستفسارات السريعة\n\nيرد فريقنا خلال 4 ساعات عمل كحد أقصى.",
    ctaLabel: "تواصل معنا",
    ctaTo: "/contact",
  },
  {
    id: "portfolio",
    question: "هل يمكنني رؤية أعمالكم السابقة؟",
    keywords: ["اعمال", "أعمال", "مشاريع سابقة", "portfolio", "امثلة", "أمثلة", "عملاء", "نماذج", "شركات"],
    answer: "نعم! يمكنك الاطلاع على مجموعة من مشاريعنا المنجزة في صفحة دراسات الحالة. تضم مشاريع في التجزئة، العقارات، الذكاء الاصطناعي، وغيرها — مع تفاصيل التحدي والحل والنتائج الفعلية.",
    ctaLabel: "تصفح دراسات الحالة",
    ctaTo: "/case-studies",
  },
  {
    id: "location",
    question: "أين مقر الشركة؟",
    keywords: ["مقر", "موقع", "عنوان", "رياض", "جدة", "سعودية", "خليج", "اين", "أين", "مكان"],
    answer: "مقرنا الرئيسي في المملكة العربية السعودية، ونخدم عملاء في جميع أنحاء الخليج العربي والمنطقة العربية. نعمل بشكل كامل عن بُعد مع فرق موزعة، مما يتيح لنا تقديم الخدمة لأي مكان.",
  },
  {
    id: "careers",
    question: "هل تقبلون طلبات التوظيف؟",
    keywords: ["وظائف", "توظيف", "عمل", "تقديم", "job", "careers", "فرصة", "مهندس", "مطور", "مصمم"],
    answer: "نعم، نبحث دائماً عن مواهب تقنية متميزة! لدينا فرص في: تطوير البرمجيات، تصميم UX/UI، إدارة المشاريع، والذكاء الاصطناعي. فريقنا موزع وبيئة العمل مرنة.",
    ctaLabel: "تصفح الوظائف",
    ctaTo: "/careers",
  },
];

// ─────────────────────────────────────────────────────────────
//  FAQ DATA — English
// ─────────────────────────────────────────────────────────────

const FAQS_EN: FAQ[] = [
  {
    id: "about",
    question: "Who is SpinesTech?",
    keywords: ["who are you", "about", "company", "spinestech", "what is"],
    answer: "SpinesTech is a Saudi tech company specializing in custom software, ERP systems, and AI solutions for ambitious businesses across Saudi Arabia and the GCC. We turn technical challenges into real growth opportunities.",
  },
  {
    id: "services",
    question: "What services do you offer?",
    keywords: ["services", "what do you do", "offer", "develop", "build", "software"],
    answer: "We provide a wide range of services:\n• Custom software development\n• Integrated ERP systems\n• Mobile apps (iOS & Android)\n• AI & automation solutions\n• Enterprise digital transformation\n• System integration & APIs\n• Technical consulting",
    ctaLabel: "Browse all services",
    ctaTo: "/services",
  },
  {
    id: "erp",
    question: "What ERP systems do you build?",
    keywords: ["erp", "enterprise resource", "accounting", "inventory", "hr", "payroll", "finance"],
    answer: "We build custom ERP systems covering: accounting & finance, inventory & warehouse management, sales & procurement, HR & payroll, project management, and analytical reporting. Each system is built specifically for your business.",
    ctaLabel: "Explore solutions",
    ctaTo: "/solutions",
  },
  {
    id: "ai",
    question: "What AI solutions do you offer?",
    keywords: ["ai", "artificial intelligence", "machine learning", "chatbot", "automation", "nlp", "gpt"],
    answer: "Our AI solutions include: intelligent customer service chatbots, data analytics & forecasting, robotic process automation (RPA), Arabic & English NLP, document & image recognition, and AI-powered dashboards.",
    ctaLabel: "Book a consultation",
    ctaTo: "/consultation",
  },
  {
    id: "sectors",
    question: "Which sectors do you serve?",
    keywords: ["sectors", "industries", "retail", "real estate", "healthcare", "education", "logistics", "finance"],
    answer: "We serve 50+ sectors including:\n• Retail & e-commerce\n• Real estate & asset management\n• Healthcare & hospitals\n• Education & training\n• Logistics & transportation\n• Financial services & banking\n• Restaurants & hospitality\n• Manufacturing & production",
    ctaLabel: "Explore sectors",
    ctaTo: "/sectors",
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    keywords: ["price", "cost", "how much", "budget", "pricing", "quote", "expensive", "cheap", "affordable"],
    answer: "Cost varies by project scope:\n• Small projects: starting from $5,000\n• Medium projects: $15,000 – $50,000\n• Large / enterprise: assessed individually\n\nWe provide a free detailed quote within 24 hours.",
    ctaLabel: "Get a free quote",
    ctaTo: "/quote",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    keywords: ["timeline", "how long", "duration", "deadline", "when", "delivery", "fast", "urgent"],
    answer: "Timelines depend on scope:\n• Small projects: 3–6 weeks\n• Medium projects: 2–4 months\n• Large projects: 4–9 months\n\nWe use Agile methodology with weekly reports and full access to our staging environment.",
  },
  {
    id: "support",
    question: "Do you offer post-delivery support?",
    keywords: ["support", "maintenance", "after delivery", "warranty", "bug", "update", "help"],
    answer: "Yes! All projects include:\n• 3-month free warranty\n• 24/7 critical support\n• Regular security updates\n• Monthly & annual maintenance packages\n• A dedicated Arabic-speaking support team",
    ctaLabel: "View pricing plans",
    ctaTo: "/pricing",
  },
  {
    id: "process",
    question: "What is your development process?",
    keywords: ["process", "methodology", "steps", "phases", "agile", "scrum", "how do you work"],
    answer: "We follow a 5-phase Agile process:\n1. Consultation & requirements analysis\n2. UX/UI design\n3. Development & continuous testing\n4. Launch & deployment\n5. Support & ongoing development\n\nYou receive weekly reports and staging access throughout.",
    ctaLabel: "Book a consultation",
    ctaTo: "/consultation",
  },
  {
    id: "small-business",
    question: "Do you work with small businesses?",
    keywords: ["small business", "startup", "small", "budget", "limited", "entrepreneur", "freelance", "mvp"],
    answer: "Absolutely! We believe every company deserves world-class technology. We have flexible solutions for startups — you can start with a small MVP and scale gradually.",
    ctaLabel: "Book a free consultation",
    ctaTo: "/consultation",
  },
  {
    id: "tech",
    question: "What technologies do you use?",
    keywords: ["technology", "tech stack", "react", "nodejs", "python", "flutter", "languages", "framework", "code"],
    answer: "We use the best tech for each project:\n• Frontend: React, Next.js, Vue\n• Backend: Node.js, Python, Laravel\n• Mobile: Flutter, React Native\n• Databases: PostgreSQL, MongoDB, Redis\n• Cloud: AWS, Azure, Google Cloud\n• AI/ML: OpenAI, LangChain, TensorFlow",
  },
  {
    id: "consultation",
    question: "How do I book a consultation?",
    keywords: ["consultation", "book", "meeting", "call", "talk", "start", "how to"],
    answer: "You can book a free 45-minute consultation with one of our experts. You'll discuss:\n• Your project goals\n• Current technical challenges\n• Budget and timeline\n\nWe'll send a clear recommendation after the session.",
    ctaLabel: "Book now — free",
    ctaTo: "/consultation",
  },
  {
    id: "contact",
    question: "How can I contact the team?",
    keywords: ["contact", "email", "phone", "whatsapp", "message", "reach", "sales"],
    answer: "You can reach us via:\n• Contact form on our website\n• Email: info@spinestech.sa\n• WhatsApp for quick inquiries\n\nOur team responds within 4 business hours.",
    ctaLabel: "Contact us",
    ctaTo: "/contact",
  },
  {
    id: "portfolio",
    question: "Can I see your past work?",
    keywords: ["portfolio", "past work", "case studies", "examples", "clients", "projects", "previous"],
    answer: "Yes! Browse our case studies for completed projects in retail, real estate, AI, and more — with full details on the challenge, solution, and actual results.",
    ctaLabel: "View case studies",
    ctaTo: "/case-studies",
  },
  {
    id: "careers",
    question: "Are you hiring?",
    keywords: ["jobs", "hiring", "careers", "work", "apply", "engineer", "developer", "designer", "join"],
    answer: "Yes! We're always looking for talented tech professionals. Openings in: software development, UX/UI design, project management, and AI. We're a distributed, flexible team.",
    ctaLabel: "View open positions",
    ctaTo: "/careers",
  },
];

// ─────────────────────────────────────────────────────────────
//  KEYWORD MATCHER
// ─────────────────────────────────────────────────────────────

function findFAQ(input: string, faqs: FAQ[]): FAQ | null {
  const q = input.toLowerCase().trim();
  // exact question match first
  const exact = faqs.find((f) => f.question.toLowerCase() === q);
  if (exact) return exact;
  // keyword match
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
//  SUGGESTED QUICK QUESTIONS (shown initially)
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
      const welcome = locale === "ar"
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

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // add user message
    setMessages((prev) => [...prev, { id: uid(), role: "user", text: trimmed }]);
    setInputValue("");
    setIsTyping(true);

    // find answer
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
        const fallback = locale === "ar"
          ? "عذراً، لم أفهم سؤالك جيداً. جرّب صياغة مختلفة، أو تواصل مع فريقنا مباشرة."
          : "Sorry, I didn't quite catch that. Try rephrasing, or reach out to our team directly.";
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
  }, [faqs, locale]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const suggestedIds = locale === "ar" ? INITIAL_SUGGESTIONS_AR : INITIAL_SUGGESTIONS_EN;
  const suggestions = faqs.filter((f) => suggestedIds.includes(f.id));

  // format bot text: convert \n to line breaks
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
          [isRTL ? "left" : "right"]: "20px",
          zIndex: 9998,
          width: "min(400px, calc(100vw - 32px))",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.94) translateY(20px)",
          transformOrigin: isRTL ? "bottom left" : "bottom right",
          transition: "opacity 0.3s cubic-bezier(.4,0,.2,1), transform 0.3s cubic-bezier(.4,0,.2,1)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div
          className="flex flex-col overflow-hidden rounded-3xl border border-white/20 shadow-2xl shadow-primary/25"
          style={{ maxHeight: "min(600px, calc(100svh - 120px))" }}
        >

          {/* ── HEADER ── */}
          <div className="relative overflow-hidden bg-primary-container shrink-0">
            <div className="islamic-pattern absolute inset-0 opacity-[0.06]" aria-hidden="true" />
            {/* glow */}
            <div className="pointer-events-none absolute -top-6 end-0 w-32 h-32 rounded-full bg-secondary/20 blur-2xl" aria-hidden="true" />

            <div className="relative flex items-center justify-between px-5 py-4" dir={dir}>
              <div className="flex items-center gap-3">
                {/* logo */}
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl overflow-hidden bg-white/10 border border-white/15 shadow-lg">
                  <img
                    src="/images/brand/icon.png"
                    alt="SpinesTech"
                    className="w-7 h-7 object-contain"
                  />
                </div>
                <div>
                  <p className="font-bold text-on-primary text-[15px] leading-tight tracking-tight">SpinesTech</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="size-1.5 rounded-full bg-secondary-fixed animate-pulse" />
                    <p className="text-caption text-on-primary/55">
                      {locale === "ar" ? "المساعد الذكي" : "Smart assistant"}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="flex size-8 items-center justify-center rounded-xl bg-white/10 text-on-primary hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                aria-label={locale === "ar" ? "إغلاق" : "Close"}
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
              </button>
            </div>
          </div>

          {/* ── MESSAGES ── */}
          <div
            dir={dir}
            className="flex-1 overflow-y-auto bg-[#f7f5f0] px-4 py-5 space-y-4"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#c4c6cd transparent" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                style={{
                  animation: "fadeSlideIn 0.3s ease forwards",
                }}
              >
                {/* bot avatar */}
                {msg.role === "bot" && (
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary-container self-end mb-0.5 overflow-hidden border border-white/10">
                    <img src="/images/brand/icon.png" alt="" className="w-5 h-5 object-contain" aria-hidden="true" />
                  </div>
                )}

                <div className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"} max-w-[85%]`}>
                  <div
                    className={`rounded-2xl px-4 py-3 text-[13.5px] leading-relaxed shadow-sm ${
                      msg.role === "user"
                        ? "bg-secondary text-on-secondary rounded-br-sm"
                        : "bg-white text-on-surface border border-outline-variant/25 rounded-bl-sm"
                    }`}
                  >
                    {formatText(msg.text)}
                  </div>

                  {/* CTA */}
                  {msg.role === "bot" && msg.ctaTo && msg.ctaLabel && (
                    <Link
                      to={msg.ctaTo as "/"}
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-secondary/30 bg-secondary/8 px-4 py-2 text-secondary text-[12.5px] font-bold hover:bg-secondary/15 transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
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

            {/* typing indicator */}
            {isTyping && (
              <div className="flex gap-2.5" style={{ animation: "fadeSlideIn 0.2s ease forwards" }}>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary-container self-end mb-0.5 overflow-hidden border border-white/10">
                  <img src="/images/brand/icon.png" alt="" className="w-5 h-5 object-contain" aria-hidden="true" />
                </div>
                <div className="bg-white border border-outline-variant/25 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 rounded-full bg-on-surface-variant/40 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* ── SUGGESTIONS ── */}
          <div className="shrink-0 bg-[#f7f5f0] border-t border-outline-variant/20 px-4 pb-3 pt-2.5" dir={dir}>
            <p className="text-caption text-on-surface-variant mb-2 font-medium">
              {locale === "ar" ? "أسئلة شائعة:" : "Suggested questions:"}
            </p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onClick={() => sendMessage(s.question)}
                  className="text-[12px] font-bold text-on-surface px-3 py-1.5 rounded-lg border border-outline-variant/50 bg-white hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
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
            className="shrink-0 flex items-center gap-3 bg-white border-t border-outline-variant/20 px-4 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={locale === "ar" ? "اكتب سؤالك هنا..." : "Type your question..."}
              className="flex-1 bg-surface-container-low rounded-xl px-4 py-2.5 text-[13.5px] text-on-surface placeholder:text-on-surface-variant/50 outline-none focus:ring-2 focus:ring-secondary/30 transition-all min-w-0"
              autoComplete="off"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label={locale === "ar" ? "إرسال" : "Send"}
              className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-on-secondary hover:bg-secondary/90 transition-all hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                {isRTL ? "send" : "send"}
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
          [isRTL ? "left" : "right"]: "20px",
          zIndex: 9999,
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1) translateY(0)" : "scale(0.5) translateY(20px)",
          transition: "opacity 0.5s cubic-bezier(.4,0,.2,1), transform 0.5s cubic-bezier(.34,1.56,.64,1)",
        }}
      >
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open
            ? (locale === "ar" ? "إغلاق المحادثة" : "Close chat")
            : (locale === "ar" ? "افتح المساعد" : "Open assistant")}
          className="group relative flex items-center cursor-pointer focus-visible:outline-none"
        >
          {/* pulse rings */}
          {!open && pulse && (
            <>
              <span className="absolute inset-0 rounded-full bg-secondary/30 animate-ping" aria-hidden="true" />
              <span className="absolute inset-[-4px] rounded-full bg-secondary/15 animate-ping" style={{ animationDelay: "150ms" }} aria-hidden="true" />
            </>
          )}

          {/* main button */}
          <span className={`flex size-14 items-center justify-center rounded-full bg-secondary shadow-xl shadow-secondary/40 transition-all duration-300 group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-secondary/50 ${open ? "scale-95" : ""}`}>
            {open ? (
              <span className="material-symbols-outlined text-on-secondary text-[22px] transition-transform duration-300 rotate-0" aria-hidden="true">close</span>
            ) : (
              <img
                src="/images/brand/icon.png"
                alt="SpinesTech"
                className="w-8 h-8 object-contain transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </span>

          {/* unread badge */}
          {!open && !initialized && (
            <span className="absolute -top-1 -end-1 flex size-5 items-center justify-center rounded-full bg-error text-on-error text-[10px] font-bold shadow-md animate-bounce" aria-hidden="true">
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
