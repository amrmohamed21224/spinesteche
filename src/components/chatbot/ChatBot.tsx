import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../i18n";

// ─────────────────────────────────────────────
//  DATA
// ─────────────────────────────────────────────

type MessageRole = "bot" | "user";

interface Message {
  id: string;
  role: MessageRole;
  text: string;
}

interface FAQ {
  id: string;
  question: string;
  answer: string;
  followups?: string[];
  cta?: { label: string; to: string };
}

const FAQS_AR: FAQ[] = [
  {
    id: "about",
    question: "من هي SpinesTech؟",
    answer:
      "SpinesTech شركة تقنية سعودية متخصصة في تطوير حلول برمجية مخصصة، أنظمة ERP، وتطبيقات الذكاء الاصطناعي للشركات الطموحة في السعودية والخليج.",
    followups: ["services", "sectors", "contact"],
  },
  {
    id: "services",
    question: "ما هي خدماتكم؟",
    answer:
      "نقدم: تطوير البرمجيات المخصصة، أنظمة ERP، تطبيقات الجوال، حلول الذكاء الاصطناعي، التحول الرقمي، وتكامل الأنظمة.",
    followups: ["timeline", "pricing", "contact"],
    cta: { label: "تصفح كل الخدمات", to: "/services" },
  },
  {
    id: "sectors",
    question: "ما هي القطاعات التي تخدمونها؟",
    answer:
      "نخدم أكثر من 50 قطاعاً منها: التجزئة والتجارة الإلكترونية، العقارات، الرعاية الصحية، التعليم، الخدمات اللوجستية، والخدمات المالية.",
    followups: ["services", "contact"],
    cta: { label: "اكتشف القطاعات", to: "/sectors" },
  },
  {
    id: "pricing",
    question: "كم تكلف الخدمة؟",
    answer:
      "تختلف التكلفة حسب حجم المشروع ومتطلباته. نقدم باقات تبدأ من مشاريع صغيرة وتصل لمشاريع المؤسسات الكبيرة. للحصول على عرض سعر مخصص:",
    followups: ["timeline", "support"],
    cta: { label: "اطلب عرض سعر", to: "/quote" },
  },
  {
    id: "timeline",
    question: "كم مدة تنفيذ المشروع؟",
    answer:
      "يعتمد على حجم المشروع: المشاريع الصغيرة 4–8 أسابيع، المتوسطة 2–4 أشهر، والمشاريع الكبيرة 4–9 أشهر. نلتزم دائماً بالجداول الزمنية المتفق عليها.",
    followups: ["pricing", "contact"],
  },
  {
    id: "support",
    question: "هل تقدمون دعماً بعد التسليم؟",
    answer:
      "نعم! نقدم دعماً فنياً مستمراً، صيانة دورية، وتحديثات للنظام. جميع مشاريعنا تأتي مع ضمان 3 أشهر ودعم مخصص.",
    followups: ["pricing", "contact"],
  },
  {
    id: "small-business",
    question: "هل تعملون مع الشركات الصغيرة؟",
    answer:
      "بالتأكيد! نعمل مع الشركات من كل الأحجام. لدينا حلول مرنة تناسب الشركات الناشئة والمتوسطة بميزانيات معقولة.",
    followups: ["pricing", "services"],
    cta: { label: "احجز استشارة مجانية", to: "/consultation" },
  },
  {
    id: "contact",
    question: "كيف أتواصل معكم؟",
    answer:
      "يمكنك التواصل معنا عبر عدة طرق:",
    followups: ["pricing", "services"],
    cta: { label: "تواصل معنا الآن", to: "/contact" },
  },
];

const FAQS_EN: FAQ[] = [
  {
    id: "about",
    question: "Who is SpinesTech?",
    answer:
      "SpinesTech is a Saudi tech company specializing in custom software, ERP systems, and AI solutions for ambitious businesses across Saudi Arabia and the GCC.",
    followups: ["services", "sectors", "contact"],
  },
  {
    id: "services",
    question: "What are your services?",
    answer:
      "We offer: custom software development, ERP systems, mobile apps, AI solutions, digital transformation, and system integration.",
    followups: ["timeline", "pricing", "contact"],
    cta: { label: "Browse all services", to: "/services" },
  },
  {
    id: "sectors",
    question: "Which sectors do you serve?",
    answer:
      "We serve 50+ sectors including: retail & e-commerce, real estate, healthcare, education, logistics, and financial services.",
    followups: ["services", "contact"],
    cta: { label: "Explore sectors", to: "/sectors" },
  },
  {
    id: "pricing",
    question: "How much does it cost?",
    answer:
      "Cost varies by project size and requirements. We have packages for small businesses up to enterprise projects. For a custom quote:",
    followups: ["timeline", "support"],
    cta: { label: "Request a quote", to: "/quote" },
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "Depends on scope: small projects 4–8 weeks, medium 2–4 months, large 4–9 months. We always commit to agreed timelines.",
    followups: ["pricing", "contact"],
  },
  {
    id: "support",
    question: "Do you offer post-delivery support?",
    answer:
      "Yes! We provide ongoing technical support, regular maintenance, and system updates. All projects include a 3-month warranty and dedicated support.",
    followups: ["pricing", "contact"],
  },
  {
    id: "small-business",
    question: "Do you work with small businesses?",
    answer:
      "Absolutely! We work with businesses of all sizes. We have flexible solutions for startups and SMEs at reasonable budgets.",
    followups: ["pricing", "services"],
    cta: { label: "Book a free consultation", to: "/consultation" },
  },
  {
    id: "contact",
    question: "How can I reach you?",
    answer: "You can reach us through multiple channels:",
    followups: ["pricing", "services"],
    cta: { label: "Contact us now", to: "/contact" },
  },
];

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────

let msgCounter = 0;
const newId = () => `msg-${++msgCounter}`;

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────

export function ChatBot() {
  const { locale, dir } = useTranslation();
  const faqs = locale === "ar" ? FAQS_AR : FAQS_EN;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [shownFaqs, setShownFaqs] = useState<string[]>([]);
  const [pulse, setPulse] = useState(false);
  const [firstOpen, setFirstOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRTL = dir === "rtl";

  // welcome message on first open
  useEffect(() => {
    if (open && firstOpen) {
      setFirstOpen(false);
      const welcome: Message = {
        id: newId(),
        role: "bot",
        text:
          locale === "ar"
            ? "أهلاً! 👋 أنا مساعد SpinesTech. كيف يمكنني مساعدتك اليوم؟"
            : "Hello! 👋 I'm SpinesTech assistant. How can I help you today?",
      };
      setTimeout(() => setMessages([welcome]), 300);
    }
  }, [open, firstOpen, locale]);

  // pulse animation to attract attention
  useEffect(() => {
    if (!open) {
      const interval = setInterval(() => {
        setPulse(true);
        setTimeout(() => setPulse(false), 1000);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [open]);

  // scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFaqClick = (faq: FAQ) => {
    // add user message
    setMessages((prev) => [...prev, { id: newId(), role: "user", text: faq.question }]);
    setShownFaqs((prev) => [...prev, faq.id]);

    // bot reply after short delay
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: newId(), role: "bot" as MessageRole, text: faq.answer }]);
    }, 450);
  };

  // remaining questions not yet asked
  const remainingFaqs = faqs.filter((f) => !shownFaqs.includes(f.id));

  // followup questions for last bot message
  const lastBotMsg = [...messages].reverse().find((m) => m.role === "bot");
  const lastFaq = lastBotMsg ? faqs.find((f) => f.answer === (lastBotMsg as Message & { answer?: string }).text || messages.some(
    (m) => m.role === "user" && faqs.find((fq) => fq.question === m.text && fq.answer === (lastBotMsg as Message).text)
  )) : null;
  const followupIds = lastFaq?.followups ?? [];
  const followups = faqs.filter((f) => followupIds.includes(f.id) && !shownFaqs.includes(f.id));
  const suggestedFaqs = followups.length > 0 ? followups : remainingFaqs.slice(0, 3);

  return (
    <>
      {/* ── CHAT WINDOW ── */}
      <div
        role="dialog"
        aria-label={locale === "ar" ? "مساعد SpinesTech" : "SpinesTech assistant"}
        aria-hidden={!open}
        style={{
          position: "fixed",
          bottom: "96px",
          [isRTL ? "left" : "right"]: "24px",
          zIndex: 9999,
          width: "min(380px, calc(100vw - 32px))",
          opacity: open ? 1 : 0,
          transform: open ? "scale(1) translateY(0)" : "scale(0.92) translateY(16px)",
          transformOrigin: isRTL ? "bottom left" : "bottom right",
          transition: "opacity 0.25s ease, transform 0.25s ease",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className="overflow-hidden rounded-3xl shadow-2xl shadow-primary/30 border border-outline-variant/30 flex flex-col"
          style={{ maxHeight: "min(580px, calc(100vh - 140px))" }}>

          {/* Header */}
          <div className="relative overflow-hidden bg-primary-container px-5 py-4 flex items-center justify-between shrink-0">
            <div className="islamic-pattern absolute inset-0 opacity-[0.06]" aria-hidden="true" />
            <div className="relative flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-2xl bg-secondary shadow-lg shadow-secondary/30">
                <span className="material-symbols-outlined text-on-secondary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                  support_agent
                </span>
              </div>
              <div>
                <p className="font-bold text-on-primary text-[15px] leading-tight">SpinesTech</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="size-2 rounded-full bg-secondary-fixed animate-pulse" />
                  <p className="text-caption text-on-primary/60">
                    {locale === "ar" ? "متاح الآن" : "Available now"}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label={locale === "ar" ? "إغلاق المحادثة" : "Close chat"}
              className="relative flex size-8 items-center justify-center rounded-xl bg-white/10 text-on-primary hover:bg-white/20 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">close</span>
            </button>
          </div>

          {/* Messages */}
          <div
            dir={dir}
            className="flex-1 overflow-y-auto bg-surface-container-lowest px-4 py-5 space-y-4"
            style={{ scrollbarWidth: "thin" }}
          >
            {messages.map((msg) => {
              const faq = msg.role === "bot"
                ? faqs.find((f) => f.answer === msg.text)
                : null;

              return (
                <div
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {/* Avatar */}
                  {msg.role === "bot" && (
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary-container self-end mb-0.5">
                      <span className="material-symbols-outlined text-secondary-fixed text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                        support_agent
                      </span>
                    </div>
                  )}

                  {/* Bubble */}
                  <div className={`flex flex-col gap-2 max-w-[82%] ${msg.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                        msg.role === "user"
                          ? "bg-secondary text-on-secondary rounded-br-sm"
                          : "bg-white text-on-surface border border-outline-variant/30 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* CTA inside bot message */}
                    {msg.role === "bot" && faq?.cta && (
                      <Link
                        to={faq.cta.to as "/"}
                        onClick={() => setOpen(false)}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-secondary/10 border border-secondary/25 px-4 py-2 text-secondary text-[13px] font-bold hover:bg-secondary/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                      >
                        <span>{faq.cta.label}</span>
                        <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                          {isRTL ? "arrow_back" : "arrow_forward"}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Typing indicator */}
            {messages.length > 0 && messages[messages.length - 1].role === "user" && (
              <div className="flex gap-2.5">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-primary-container self-end">
                  <span className="material-symbols-outlined text-secondary-fixed text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">support_agent</span>
                </div>
                <div className="bg-white border border-outline-variant/30 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex gap-1 items-center h-4">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="size-1.5 rounded-full bg-on-surface-variant/50 animate-bounce"
                        style={{ animationDelay: `${i * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          {suggestedFaqs.length > 0 && (
            <div className="shrink-0 border-t border-outline-variant/20 bg-surface-container-low px-4 pt-3 pb-4" dir={dir}>
              <p className="text-caption text-on-surface-variant mb-2.5 font-medium">
                {locale === "ar" ? "اختر سؤالاً:" : "Choose a question:"}
              </p>
              <div className="flex flex-col gap-2">
                {suggestedFaqs.map((faq) => (
                  <button
                    key={faq.id}
                    onClick={() => handleFaqClick(faq)}
                    className="text-start text-[13px] font-bold text-on-surface px-4 py-2.5 rounded-xl border border-outline-variant/40 bg-white hover:border-secondary/50 hover:bg-secondary/5 hover:text-secondary transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40 flex items-center justify-between gap-2 group"
                  >
                    <span>{faq.question}</span>
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant group-hover:text-secondary transition-colors shrink-0" aria-hidden="true">
                      {isRTL ? "arrow_back" : "arrow_forward"}
                    </span>
                  </button>
                ))}
              </div>

              {remainingFaqs.length === 0 && (
                <div className="mt-3 pt-3 border-t border-outline-variant/20">
                  <Link
                    to="/contact"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full rounded-xl bg-secondary py-3 text-on-secondary font-bold text-[13px] hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  >
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">mail</span>
                    {locale === "ar" ? "تواصل مع فريقنا" : "Contact our team"}
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── FAB BUTTON ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open
          ? (locale === "ar" ? "إغلاق المحادثة" : "Close chat")
          : (locale === "ar" ? "فتح المحادثة" : "Open chat")}
        style={{
          position: "fixed",
          bottom: "24px",
          [isRTL ? "left" : "right"]: "24px",
          zIndex: 9999,
        }}
        className="group relative flex size-14 items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2"
      >
        {/* Pulse ring */}
        {!open && pulse && (
          <span className="absolute inset-0 rounded-full bg-secondary/40 animate-ping" aria-hidden="true" />
        )}

        {/* Button body */}
        <span className={`flex size-14 items-center justify-center rounded-full bg-secondary shadow-xl shadow-secondary/40 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-secondary/50 group-hover:scale-105 ${open ? "rotate-0" : ""}`}>
          <span
            className="material-symbols-outlined text-on-secondary text-[24px] transition-all duration-300"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            {open ? "close" : "chat_bubble"}
          </span>
        </span>

        {/* Unread dot */}
        {!open && firstOpen && (
          <span className="absolute top-0 end-0 flex size-4 items-center justify-center rounded-full bg-error text-on-error text-[9px] font-bold shadow-md" aria-hidden="true">
            1
          </span>
        )}
      </button>
    </>
  );
}
