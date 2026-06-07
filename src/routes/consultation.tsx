import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/layout/Container";
import { seo } from "../lib/seo";
import { submitContactForm } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

type ConsultationSearch = {
  plan?: string;
  service?: string;
  sector?: string;
  source?: string;
};

const copy = {
  ar: {
    eyebrow: "استشارة مجانية · 45 دقيقة",
    title: "جلسة مركزة تكشف أفضل مسار تقني لشركتك",
    subtitle: "بدل مكالمة عامة، سنقودك خلال نقاط القرار: الهدف، العائق، الأولوية، ثم نجهز لك توصية واضحة.",
    benefit1: "تحليل وضعك الحالي بدقة",
    benefit2: "توصية تقنية مخصصة لك",
    benefit3: "خارطة طريق واضحة للخطوات",
    responseLabel: "وقت الرد",
    responseTime: "خلال 4 ساعات",
    stepLabel: "الخطوة",
    step1: "اختر الهدف",
    step2: "بيانات التواصل",
    optionTitle: "ما الهدف الرئيسي من الاستشارة؟",
    formTitle: "احجز الجلسة",
    formSubtitle: "اترك بياناتك وسنرتب معك موعداً مناسباً.",
    name: "الاسم الكامل",
    namePlaceholder: "محمد أحمد",
    email: "البريد الإلكتروني",
    emailPlaceholder: "name@company.com",
    phone: "رقم الجوال",
    phonePlaceholder: "+966 5x xxx xxxx",
    company: "الشركة",
    companyPlaceholder: "اسم شركتك",
    message: "ما الذي تريد مناقشته؟",
    messagePlaceholder: "صف باختصار التحدي أو الفرصة التي تريد بحثها...",
    submit: "تأكيد طلب الاستشارة",
    submitting: "جاري الإرسال...",
    next: "التالي",
    back: "رجوع",
    success: "تم استلام طلبك! سنتواصل معك خلال 4 ساعات لترتيب الموعد.",
    failure: "حدث خطأ. جرّب مرة أخرى.",
    quote: "أحتاج عرض سعر بدلًا من ذلك",
    required: "مطلوب",
    selectGoalHint: "اختر الهدف أولاً للمتابعة",
  },
  en: {
    eyebrow: "Free consultation · 45 min",
    title: "A focused session to reveal the right technical path",
    subtitle: "Instead of a generic call, we guide the decision points: goal, blocker, priority, then a clear recommendation.",
    benefit1: "Accurate analysis of your current state",
    benefit2: "A customized technical recommendation",
    benefit3: "A clear roadmap for next steps",
    responseLabel: "Response time",
    responseTime: "Within 4 hours",
    stepLabel: "Step",
    step1: "Choose goal",
    step2: "Contact info",
    optionTitle: "What is the main goal of this consultation?",
    formTitle: "Book the session",
    formSubtitle: "Leave your details and we'll schedule a suitable time.",
    name: "Full name",
    namePlaceholder: "John Smith",
    email: "Email",
    emailPlaceholder: "name@company.com",
    phone: "Phone",
    phonePlaceholder: "+1 xxx xxx xxxx",
    company: "Company",
    companyPlaceholder: "Your company name",
    message: "What do you want to discuss?",
    messagePlaceholder: "Briefly describe the challenge or opportunity you want to explore...",
    submit: "Confirm consultation request",
    submitting: "Sending...",
    next: "Next",
    back: "Back",
    success: "Request received! We'll contact you within 4 hours to schedule.",
    failure: "Something went wrong. Please try again.",
    quote: "I need a quote instead",
    required: "Required",
    selectGoalHint: "Select a goal first to continue",
  },
};

const goals = {
  ar: [
    { id: "growth", title: "توسيع منتج قائم", desc: "تطوير ميزات جديدة أو scale المنتج الحالي", icon: "trending_up" },
    { id: "automation", title: "أتمتة عمليات داخلية", desc: "ربط الأنظمة وتقليل العمل اليدوي", icon: "automation" },
    { id: "ai", title: "تفعيل الذكاء الاصطناعي", desc: "دمج AI في منتجك أو عملياتك", icon: "psychology" },
    { id: "rebuild", title: "إعادة بناء نظام قديم", desc: "ترحيل أو إعادة هيكلة legacy system", icon: "sync_alt" },
  ],
  en: [
    { id: "growth", title: "Scale an existing product", desc: "Build new features or scale your current product", icon: "trending_up" },
    { id: "automation", title: "Automate internal operations", desc: "Connect systems and reduce manual work", icon: "automation" },
    { id: "ai", title: "Activate AI capabilities", desc: "Embed AI into your product or operations", icon: "psychology" },
    { id: "rebuild", title: "Rebuild a legacy system", desc: "Migrate or re-architect an old system", icon: "sync_alt" },
  ],
};

export const Route = createFileRoute("/consultation")({
  validateSearch: (search): ConsultationSearch => ({
    plan: typeof search.plan === "string" ? search.plan : undefined,
    service: typeof search.service === "string" ? search.service : undefined,
    sector: typeof search.sector === "string" ? search.sector : undefined,
    source: typeof search.source === "string" ? search.source : undefined,
  }),
  head: () =>
    seo({
      title: "حجز استشارة مجانية",
      description: "احجز استشارة مجانية مع خبراء SpinesTech لتحديد أفضل مسار تقني.",
      path: "/consultation",
    }),
  component: ConsultationPage,
});

function ConsultationPage() {
  const { locale, dir } = useTranslation();
  const c = copy[locale];
  const search = Route.useSearch();
  const [goal, setGoal] = useState(search.service || search.sector || "");
  const [step, setStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const formRef = useRef<HTMLDivElement>(null);

  const updateForm = (key: keyof typeof form, value: string) =>
    setForm((cur) => ({ ...cur, [key]: value }));

  const goToStep2 = () => {
    if (!goal) return;
    setStep(2);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitContactForm(
        { ...form, message: `[consultation:${goal}] ${form.message}`, source: "consultation-page" },
        locale,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  // entrance animation trigger
  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">

        {/* ───── HERO STRIP ───── */}
        <section className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28 px-margin-mobile md:px-margin-desktop">
          {/* soft background blobs */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -top-32 end-0 w-[520px] h-[520px] rounded-full bg-secondary/5 blur-3xl" />
            <div className="absolute top-1/2 start-0 w-[340px] h-[340px] rounded-full bg-primary-container/10 blur-3xl" />
          </div>

          <Container clean>
            <div
              className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              {/* Left: copy */}
              <div className="text-start order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/8 px-4 py-1.5 text-secondary font-label-md text-label-md mb-6">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">forum</span>
                  {c.eyebrow}
                </span>

                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-primary mb-5">
                  {c.title}
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10">
                  {c.subtitle}
                </p>

                {/* 3 benefits */}
                <ul className="space-y-4 mb-10">
                  {([c.benefit1, c.benefit2, c.benefit3] as string[]).map((b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3"
                      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(12px)", transition: `opacity 0.55s ease ${0.15 + i * 0.1}s, transform 0.55s ease ${0.15 + i * 0.1}s` }}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/12 text-secondary">
                        <span className="material-symbols-outlined text-[16px]" aria-hidden="true">check</span>
                      </span>
                      <span className="font-label-md text-label-md text-on-surface">{b}</span>
                    </li>
                  ))}
                </ul>

                {/* response time badge */}
                <div className="inline-flex items-center gap-3 rounded-xl border border-outline-variant/40 bg-surface-container-low px-4 py-3">
                  <span className="material-symbols-outlined text-secondary text-xl" aria-hidden="true">schedule</span>
                  <div className="text-start">
                    <p className="text-caption text-on-surface-variant">{c.responseLabel}</p>
                    <p className="font-label-md text-label-md font-bold text-secondary">{c.responseTime}</p>
                  </div>
                </div>
              </div>

              {/* Right: goal cards */}
              <div className="order-1 lg:order-2">
                <p className="font-label-md text-label-md text-on-surface-variant mb-4 text-start">{c.optionTitle}</p>
                <div className="grid grid-cols-2 gap-3">
                  {goals[locale].map((item, i) => {
                    const isSelected = goal === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGoal(item.id)}
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "none" : "translateY(16px)",
                          transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
                        }}
                        className={`group relative text-start p-5 rounded-2xl border-2 transition-all duration-250 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                          isSelected
                            ? "border-secondary bg-secondary text-on-secondary shadow-lg shadow-secondary/20 -translate-y-1"
                            : "border-outline-variant/40 bg-white hover:border-secondary/40 hover:-translate-y-1 hover:shadow-md"
                        }`}
                      >
                        {isSelected && (
                          <span className="absolute top-3 end-3 flex size-5 items-center justify-center rounded-full bg-on-secondary/15">
                            <span className="material-symbols-outlined text-[14px] text-on-secondary" aria-hidden="true">check</span>
                          </span>
                        )}
                        <span className={`material-symbols-outlined text-3xl mb-3 block ${isSelected ? "text-on-secondary" : "text-secondary"}`} aria-hidden="true">
                          {item.icon}
                        </span>
                        <p className={`font-bold text-[15px] leading-snug mb-1 ${isSelected ? "text-on-secondary" : "text-primary"}`}>
                          {item.title}
                        </p>
                        <p className={`text-caption leading-relaxed ${isSelected ? "text-on-secondary/75" : "text-on-surface-variant"}`}>
                          {item.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* CTA row */}
                <div className="mt-5 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={goToStep2}
                    disabled={!goal}
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary px-6 py-4 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-40 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  >
                    <span>{c.formTitle}</span>
                    <span className={`material-symbols-outlined text-[18px] ${locale === "ar" ? "scale-x-[-1]" : ""}`} aria-hidden="true">arrow_forward</span>
                  </button>
                  <Link
                    to="/quote"
                    search={{ source: "consultation-alternative" }}
                    className="rounded-xl border-2 border-outline-variant/60 px-5 py-4 font-bold text-on-surface-variant transition-all hover:border-secondary/40 hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  >
                    {c.quote}
                  </Link>
                </div>
                {!goal && (
                  <p className="mt-2 text-caption text-on-surface-variant text-start">{c.selectGoalHint}</p>
                )}
              </div>
            </div>
          </Container>
        </section>

        {/* ───── BOOKING FORM SECTION ───── */}
        <section
          id="booking"
          ref={formRef}
          className="relative bg-primary-container py-16 md:py-24 px-margin-mobile md:px-margin-desktop overflow-hidden"
        >
          {/* Islamic pattern overlay */}
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-24 end-0 w-96 h-96 rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />

          <Container clean>
            {status === "success" ? (
              <SuccessView locale={locale} c={c} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">

                {/* Left: step indicator + selected goal summary */}
                <div className="text-on-primary">
                  {/* Steps */}
                  <div className="flex items-center gap-3 mb-10">
                    <StepPill number={1} label={c.step1} active={step === 1} done={step > 1} />
                    <div className={`h-px flex-1 transition-colors duration-500 ${step > 1 ? "bg-secondary" : "bg-on-primary/20"}`} />
                    <StepPill number={2} label={c.step2} active={step === 2} done={false} />
                  </div>

                  {/* Selected goal recap */}
                  {goal && (
                    <div className="mb-8 rounded-2xl border border-on-primary/15 bg-on-primary/6 p-5">
                      <p className="text-caption text-on-primary/60 mb-2">{c.optionTitle}</p>
                      {(() => {
                        const selected = goals[locale].find((g) => g.id === goal);
                        return selected ? (
                          <div className="flex items-center gap-3">
                            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary">
                              <span className="material-symbols-outlined" aria-hidden="true">{selected.icon}</span>
                            </span>
                            <div>
                              <p className="font-bold text-on-primary">{selected.title}</p>
                              <p className="text-caption text-on-primary/65">{selected.desc}</p>
                            </div>
                          </div>
                        ) : null;
                      })()}
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="mt-3 text-caption text-secondary underline underline-offset-2 cursor-pointer"
                      >
                        {locale === "ar" ? "تغيير الهدف" : "Change goal"}
                      </button>
                    </div>
                  )}

                  {/* benefits list on dark bg */}
                  <ul className="space-y-4">
                    {([c.benefit1, c.benefit2, c.benefit3] as string[]).map((b, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary mt-0.5">
                          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">check</span>
                        </span>
                        <span className="text-on-primary/85 font-body-md">{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 pt-6 border-t border-on-primary/15 flex items-center gap-3">
                    <span className="material-symbols-outlined text-secondary text-2xl" aria-hidden="true">schedule</span>
                    <div>
                      <p className="text-caption text-on-primary/60">{c.responseLabel}</p>
                      <p className="font-bold text-secondary">{c.responseTime}</p>
                    </div>
                  </div>
                </div>

                {/* Right: form card */}
                <div className="rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-primary/30 overflow-hidden">
                  <form onSubmit={handleSubmit}>
                    <div className="px-7 py-6 border-b border-outline-variant/20">
                      <h2 className="font-headline-xl text-headline-xl font-bold text-primary">{c.formTitle}</h2>
                      <p className="mt-1 text-on-surface-variant">{c.formSubtitle}</p>
                    </div>

                    <div className="px-7 py-6 space-y-5">
                      {status === "error" && (
                        <div role="alert" className="rounded-xl bg-error-container/15 border border-error/20 px-4 py-3 text-error font-body-md">
                          {c.failure}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={c.name} required>
                          <input
                            required
                            type="text"
                            value={form.name}
                            onChange={(e) => updateForm("name", e.target.value)}
                            placeholder={c.namePlaceholder}
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all"
                          />
                        </FormField>
                        <FormField label={c.email} required>
                          <input
                            required
                            type="email"
                            value={form.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            placeholder={c.emailPlaceholder}
                            dir="ltr"
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all"
                          />
                        </FormField>
                        <FormField label={c.phone} required>
                          <input
                            required
                            type="tel"
                            value={form.phone}
                            onChange={(e) => updateForm("phone", e.target.value)}
                            placeholder={c.phonePlaceholder}
                            dir="ltr"
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all"
                          />
                        </FormField>
                        <FormField label={c.company}>
                          <input
                            type="text"
                            value={form.company}
                            onChange={(e) => updateForm("company", e.target.value)}
                            placeholder={c.companyPlaceholder}
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all"
                          />
                        </FormField>
                      </div>

                      <FormField label={c.message} required>
                        <textarea
                          required
                          rows={4}
                          value={form.message}
                          onChange={(e) => updateForm("message", e.target.value)}
                          placeholder={c.messagePlaceholder}
                          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all resize-none"
                        />
                      </FormField>
                    </div>

                    <div className="px-7 py-5 border-t border-outline-variant/20 bg-surface-container-lowest/60 flex flex-col sm:flex-row gap-3">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="sm:w-auto px-6 py-3.5 rounded-xl border border-outline-variant/50 text-on-surface font-bold hover:bg-surface-container transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                      >
                        {c.back}
                      </button>
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-3.5 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      >
                        {status === "submitting" ? (
                          <>
                            <span className="material-symbols-outlined text-[18px] animate-spin" aria-hidden="true">progress_activity</span>
                            {c.submitting}
                          </>
                        ) : (
                          <>
                            {c.submit}
                            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">send</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>

              </div>
            )}
          </Container>
        </section>

      </main>
    </PageLayout>
  );
}

function StepPill({ number, label, active, done }: { number: number; label: string; active: boolean; done: boolean }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span className={`flex size-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
        done ? "bg-secondary text-on-secondary" : active ? "bg-secondary/20 text-secondary ring-2 ring-secondary" : "bg-on-primary/15 text-on-primary/50"
      }`}>
        {done ? <span className="material-symbols-outlined text-[14px]" aria-hidden="true">check</span> : number}
      </span>
      <span className={`text-caption font-bold ${active ? "text-on-primary" : "text-on-primary/50"}`}>{label}</span>
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="space-y-2 text-start">
      <label className="block font-label-md text-label-md text-primary font-bold">
        {label}
        {required && <span className="text-error ms-1">*</span>}
      </label>
      {children}
    </div>
  );
}

function SuccessView({ locale, c }: { locale: string; c: typeof copy["ar"] }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 text-on-primary">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-secondary/25 animate-ping" aria-hidden="true" />
        <div className="relative flex size-20 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-xl shadow-secondary/30">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">check_circle</span>
        </div>
      </div>
      <h2 className="font-headline-xl text-headline-xl font-bold mb-3 text-on-primary">
        {locale === "ar" ? "تم استلام طلبك! 🎉" : "Request received! 🎉"}
      </h2>
      <p className="font-body-lg text-body-lg text-on-primary/75 max-w-md leading-relaxed mb-8">{c.success}</p>
      <Link
        to="/"
        className="rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary hover:bg-secondary/90 transition-colors"
      >
        {locale === "ar" ? "العودة للرئيسية" : "Back to home"}
      </Link>
    </div>
  );
}
