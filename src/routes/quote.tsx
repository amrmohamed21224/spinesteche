import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/layout/Container";
import { StateFeedback } from "../components/layout/StateFeedback";
import { seo } from "../lib/seo";
import { getPricingPlans, getServices, submitQuoteRequest } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

type QuoteSearch = {
  plan?: string;
  service?: string;
  product?: string;
  sector?: string;
  source?: string;
};

type QuoteForm = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  details: string;
};

const copy = {
  ar: {
    eyebrow: "طلب عرض سعر",
    title: "حوّل الفكرة إلى عرض تنفيذي واضح",
    subtitle: "اختر نوع المشروع، حدّد مستوى الاستثمار، واترك لنا تفاصيل كافية لنجهز لك تصورًا عمليًا.",
    benefit1: "عرض سعر مفصّل خلال 24 ساعة",
    benefit2: "تقدير واقعي للتكلفة والجدول الزمني",
    benefit3: "خطة تنفيذ واضحة المراحل",
    step1Label: "اختيار الحل",
    step2Label: "نطاق الاستثمار",
    step3Label: "تفاصيل المشروع",
    servicesTitle: "اختر نقطة البداية",
    servicesSubtitle: "أي مجال يصف مشروعك؟",
    plansTitle: "اختر مستوى التنفيذ",
    budgetTitle: "نطاق الميزانية",
    formTitle: "أرسل تفاصيل مشروعك",
    formSubtitle: "سنراجع الطلب ونعود لك بتصور واضح للخطوات والتكلفة المتوقعة.",
    name: "الاسم الكامل",
    namePlaceholder: "محمد أحمد",
    email: "البريد الإلكتروني",
    emailPlaceholder: "name@company.com",
    phone: "رقم الجوال",
    phonePlaceholder: "+966 5x xxx xxxx",
    company: "الشركة",
    companyPlaceholder: "اسم شركتك",
    details: "صف مشروعك باختصار",
    detailsPlaceholder: "ما الذي تريد بناءه أو تحسينه؟ كلما كانت التفاصيل أوضح، كان عرضنا أدق.",
    submit: "إرسال طلب عرض السعر",
    submitting: "جاري الإرسال...",
    success: "تم استلام طلبك! سنراجع التفاصيل ونتواصل معك خلال 24 ساعة.",
    failure: "حدث خطأ أثناء الإرسال. جرّب مرة أخرى.",
    consultCta: "أفضل استشارة أولًا",
    customPlan: "تصميم مخصص",
    selectedBadge: "محدد ✓",
    selectHint: "اختر خدمة للمتابعة",
    responseLabel: "وقت الرد",
    responseTime: "خلال 24 ساعة",
    scrollCta: "ابدأ تحديد النطاق",
    recommended: "الأكثر طلبًا",
  },
  en: {
    eyebrow: "Quote request",
    title: "Turn the idea into a clear delivery proposal",
    subtitle: "Choose the project type, set the investment range, and share context for a practical execution plan.",
    benefit1: "Detailed quote within 24 hours",
    benefit2: "Realistic cost and timeline estimate",
    benefit3: "Clear phased execution plan",
    step1Label: "Solution",
    step2Label: "Investment",
    step3Label: "Project details",
    servicesTitle: "Choose your starting point",
    servicesSubtitle: "Which area best describes your project?",
    plansTitle: "Choose the delivery level",
    budgetTitle: "Budget range",
    formTitle: "Send your project details",
    formSubtitle: "We'll review the request and get back to you with a clear picture of costs and next steps.",
    name: "Full name",
    namePlaceholder: "John Smith",
    email: "Email",
    emailPlaceholder: "name@company.com",
    phone: "Phone",
    phonePlaceholder: "+1 xxx xxx xxxx",
    company: "Company",
    companyPlaceholder: "Your company name",
    details: "Describe your project",
    detailsPlaceholder: "What do you want to build or improve? The more detail, the more accurate our quote.",
    submit: "Send quote request",
    submitting: "Sending...",
    success: "Request received! We'll review and contact you within 24 hours.",
    failure: "Something went wrong. Please try again.",
    consultCta: "Book consultation first",
    customPlan: "Custom design",
    selectedBadge: "Selected ✓",
    selectHint: "Select a service to continue",
    responseLabel: "Response time",
    responseTime: "Within 24 hours",
    scrollCta: "Start scoping",
    recommended: "Most popular",
  },
};

const budgetOptions = {
  ar: ["أقل من $5k", "$5k — $15k", "$15k — $40k", "$40k — $100k", "$100k+", "غير محدد بعد"],
  en: ["Under $5k", "$5k — $15k", "$15k — $40k", "$40k — $100k", "$100k+", "Not decided yet"],
};

export const Route = createFileRoute("/quote")({
  validateSearch: (search): QuoteSearch => ({
    plan: typeof search.plan === "string" ? search.plan : undefined,
    service: typeof search.service === "string" ? search.service : undefined,
    product: typeof search.product === "string" ? search.product : undefined,
    sector: typeof search.sector === "string" ? search.sector : undefined,
    source: typeof search.source === "string" ? search.source : undefined,
  }),
  head: () =>
    seo({
      title: "طلب عرض سعر مخصص",
      description: "حدد نطاق مشروعك واحصل على عرض سعر مخصص من SpinesTech.",
      path: "/quote",
    }),
  component: QuotePage,
});

function QuotePage() {
  const { locale, dir } = useTranslation();
  const c = copy[locale];
  const search = Route.useSearch();

  const [selectedService, setSelectedService] = useState(search.service || "");
  const [selectedPlan, setSelectedPlan] = useState(search.plan || "");
  const [selectedBudget, setSelectedBudget] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState<QuoteForm>({
    name: "", email: "", phone: "", company: "",
    projectType: search.service || search.product || search.sector || "",
    budget: "",
    details: "",
  });

  const [visible, setVisible] = useState(false);
  useEffect(() => { const t = setTimeout(() => setVisible(true), 60); return () => clearTimeout(t); }, []);

  const { data: services, isLoading: servicesLoading, isError: servicesError } = useQuery({
    queryKey: ["quote-services", locale],
    queryFn: () => getServices(locale),
  });

  const { data: plans, isLoading: plansLoading, isError: plansError } = useQuery({
    queryKey: ["quote-plans", locale],
    queryFn: () => getPricingPlans(locale),
  });

  const selectedLabel = useMemo(() => {
    const service = services?.find((s) => s.slug === selectedService);
    const plan = plans?.find((p) => p.id === selectedPlan);
    return [service?.title, plan?.name, selectedBudget].filter(Boolean).join(" / ");
  }, [plans, selectedBudget, selectedPlan, selectedService, services]);

  const updateForm = (key: keyof QuoteForm, value: string) =>
    setForm((cur) => ({ ...cur, [key]: value }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await submitQuoteRequest(
        {
          ...form,
          projectType: selectedService || form.projectType || c.customPlan,
          budget: selectedBudget || form.budget || c.customPlan,
          details: `${selectedLabel ? `${selectedLabel}\n\n` : ""}${form.details}`,
        },
        locale,
      );
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">

        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden bg-primary-container pt-28 pb-20 md:pt-36 md:pb-28 px-margin-mobile md:px-margin-desktop">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-32 end-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 start-0 w-[300px] h-[300px] rounded-full bg-on-primary/5 blur-3xl" aria-hidden="true" />

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
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/30 bg-secondary/15 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">request_quote</span>
                  {c.eyebrow}
                </span>

                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-on-primary mb-5">
                  {c.title}
                </h1>
                <p className="font-body-lg text-body-lg text-on-primary/75 max-w-xl mb-10">
                  {c.subtitle}
                </p>

                <ul className="space-y-4 mb-10">
                  {([c.benefit1, c.benefit2, c.benefit3] as string[]).map((b, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3"
                      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateX(12px)", transition: `opacity 0.55s ease ${0.15 + i * 0.1}s, transform 0.55s ease ${0.15 + i * 0.1}s` }}
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-secondary/25 text-secondary-fixed">
                        <span className="material-symbols-outlined text-[15px]" aria-hidden="true">check</span>
                      </span>
                      <span className="font-label-md text-label-md text-on-primary/90">{b}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-3">
                  <a
                    href="#scope"
                    className="inline-flex items-center gap-2 rounded-xl bg-secondary px-7 py-4 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  >
                    {c.scrollCta}
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">keyboard_arrow_down</span>
                  </a>
                  <Link
                    to="/consultation"
                    search={{ source: "quote-alternative" }}
                    className="inline-flex items-center gap-2 rounded-xl border border-secondary-fixed/35 px-7 py-4 font-bold text-secondary-fixed transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                  >
                    {c.consultCta}
                  </Link>
                </div>
              </div>

              {/* Right: steps visual */}
              <div
                className="order-1 lg:order-2"
                style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(20px)", transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s" }}
              >
                <div className="rounded-2xl border border-white/12 bg-white/6 p-5 backdrop-blur-sm shadow-2xl">
                  {([c.step1Label, c.step2Label, c.step3Label] as string[]).map((step, i) => (
                    <div
                      key={step}
                      className="group mb-3 last:mb-0 flex items-center gap-4 rounded-xl border border-white/10 bg-white/6 p-4 transition-all hover:-translate-y-0.5 hover:bg-white/10"
                      style={{ transitionDelay: `${i * 60}ms` }}
                    >
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary text-on-secondary font-bold text-lg">
                        {i + 1}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-on-primary">{step}</span>
                      <span className="material-symbols-outlined ms-auto text-secondary-fixed/60 group-hover:text-secondary-fixed transition-colors" aria-hidden="true">
                        auto_awesome
                      </span>
                    </div>
                  ))}
                  <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-secondary/15 px-4 py-3">
                    <span className="material-symbols-outlined text-secondary-fixed text-xl" aria-hidden="true">schedule</span>
                    <div>
                      <p className="text-caption text-on-primary/55">{c.responseLabel}</p>
                      <p className="font-bold text-secondary-fixed">{c.responseTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ───── STEP 1: SERVICES ───── */}
        <section id="scope" className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop">
          <Container clean>
            <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <span className="inline-flex items-center gap-1.5 text-secondary font-label-md text-label-md font-bold mb-2">
                  <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-on-secondary text-xs font-bold">1</span>
                  {c.step1Label}
                </span>
                <h2 className="font-headline-xl text-headline-xl font-bold text-primary">{c.servicesTitle}</h2>
              </div>
              <p className="text-on-surface-variant max-w-sm">{c.servicesSubtitle}</p>
            </div>

            {servicesLoading && <StateFeedback type="loading" />}
            {servicesError && <StateFeedback type="error" />}
            {!servicesLoading && !servicesError && services && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.slice(0, 6).map((service, i) => {
                  const isSelected = selectedService === service.slug;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => { setSelectedService(service.slug); updateForm("projectType", service.slug); }}
                      style={{ transitionDelay: `${i * 40}ms` }}
                      className={`group relative text-start p-6 rounded-2xl border-2 transition-all duration-250 cursor-pointer min-h-48 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 hover:-translate-y-1 hover:shadow-lg ${
                        isSelected
                          ? "border-secondary bg-secondary text-on-secondary shadow-lg shadow-secondary/20 -translate-y-1"
                          : "border-outline-variant/40 bg-white hover:border-secondary/40"
                      }`}
                    >
                      {isSelected && (
                        <span className="absolute top-4 end-4 flex size-6 items-center justify-center rounded-full bg-on-secondary/15">
                          <span className="material-symbols-outlined text-[13px] text-on-secondary" aria-hidden="true">check</span>
                        </span>
                      )}
                      <span className={`material-symbols-outlined text-4xl mb-4 block ${isSelected ? "text-on-secondary" : "text-secondary"}`} aria-hidden="true">
                        {service.icon}
                      </span>
                      <h3 className={`font-bold text-[16px] leading-snug mb-2 ${isSelected ? "text-on-secondary" : "text-primary"}`}>
                        {service.title}
                      </h3>
                      <p className={`text-caption leading-relaxed line-clamp-3 ${isSelected ? "text-on-secondary/75" : "text-on-surface-variant"}`}>
                        {service.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

        {/* ───── STEP 2: PLAN + BUDGET ───── */}
        <section className="bg-surface-container-low py-16 md:py-24 px-margin-mobile md:px-margin-desktop">
          <Container clean>
            <span className="inline-flex items-center gap-1.5 text-secondary font-label-md text-label-md font-bold mb-2">
              <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-on-secondary text-xs font-bold">2</span>
              {c.step2Label}
            </span>
            <h2 className="font-headline-xl text-headline-xl font-bold text-primary mb-10">{c.plansTitle}</h2>

            {plansLoading && <StateFeedback type="loading" />}
            {plansError && <StateFeedback type="error" />}
            {!plansLoading && !plansError && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Plans */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {plans?.map((plan) => {
                    const isSelected = selectedPlan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`relative text-start p-6 rounded-2xl border-2 transition-all hover:-translate-y-1 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                          isSelected
                            ? "border-primary bg-primary text-on-primary shadow-xl -translate-y-1"
                            : "border-outline-variant/40 bg-white hover:border-primary/30 hover:shadow-md"
                        }`}
                      >
                        {plan.recommended && (
                          <span className="absolute -top-3 start-4 rounded-full bg-secondary px-3 py-0.5 text-xs font-bold text-on-secondary">
                            {c.recommended}
                          </span>
                        )}
                        {isSelected && (
                          <span className="absolute top-4 end-4 flex size-5 items-center justify-center rounded-full bg-on-primary/20">
                            <span className="material-symbols-outlined text-[12px] text-on-primary" aria-hidden="true">check</span>
                          </span>
                        )}
                        <p className={`font-label-md text-label-md mb-1 ${isSelected ? "text-on-primary/60" : "text-on-surface-variant"}`}>{plan.tier}</p>
                        <h3 className={`font-bold text-[17px] mb-2 ${isSelected ? "text-on-primary" : "text-primary"}`}>{plan.name}</h3>
                        <p className={`text-caption leading-relaxed ${isSelected ? "text-on-primary/70" : "text-on-surface-variant"}`}>{plan.description}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Budget */}
                <div className="rounded-2xl border border-outline-variant/40 bg-white p-6 shadow-sm">
                  <h3 className="font-headline-sm text-headline-sm font-bold text-primary mb-5">{c.budgetTitle}</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {budgetOptions[locale].map((budget) => {
                      const isSelected = selectedBudget === budget;
                      return (
                        <button
                          key={budget}
                          type="button"
                          onClick={() => { setSelectedBudget(budget); updateForm("budget", budget); }}
                          className={`rounded-xl border-2 px-4 py-3.5 font-bold text-[15px] transition-all hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                            isSelected
                              ? "border-secondary bg-secondary text-on-secondary shadow-md"
                              : "border-outline-variant/40 text-on-surface hover:border-secondary/40"
                          }`}
                        >
                          {budget}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* ───── STEP 3: FORM ───── */}
        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop">
          <Container clean>
            {status === "success" ? (
              <SuccessView locale={locale} c={c} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-10 items-start">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-secondary font-label-md text-label-md font-bold mb-2">
                    <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-on-secondary text-xs font-bold">3</span>
                    {c.step3Label}
                  </span>
                  <h2 className="font-headline-xl text-headline-xl font-bold text-primary mt-1 mb-4">{c.formTitle}</h2>
                  <p className="text-on-surface-variant mb-8">{c.formSubtitle}</p>

                  {/* Summary of selections */}
                  {selectedLabel && (
                    <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-5">
                      <p className="text-caption text-on-surface-variant mb-3">{locale === "ar" ? "ملخص اختياراتك" : "Your selections"}</p>
                      <p className="font-bold text-primary">{selectedLabel}</p>
                    </div>
                  )}
                </div>

                <div className="rounded-3xl border border-outline-variant/30 bg-white shadow-xl overflow-hidden">
                  <form onSubmit={handleSubmit}>
                    <div className="px-7 py-6 space-y-5">
                      {status === "error" && (
                        <div role="alert" className="rounded-xl bg-error-container/15 border border-error/20 px-4 py-3 text-error font-body-md">
                          {c.failure}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField label={c.name} required>
                          <input required type="text" value={form.name} onChange={(e) => updateForm("name", e.target.value)} placeholder={c.namePlaceholder}
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all" />
                        </FormField>
                        <FormField label={c.email} required>
                          <input required type="email" value={form.email} onChange={(e) => updateForm("email", e.target.value)} placeholder={c.emailPlaceholder} dir="ltr"
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all" />
                        </FormField>
                        <FormField label={c.phone} required>
                          <input required type="tel" value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} placeholder={c.phonePlaceholder} dir="ltr"
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all" />
                        </FormField>
                        <FormField label={c.company}>
                          <input type="text" value={form.company} onChange={(e) => updateForm("company", e.target.value)} placeholder={c.companyPlaceholder}
                            className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all" />
                        </FormField>
                      </div>

                      <FormField label={c.details} required>
                        <textarea required rows={5} value={form.details} onChange={(e) => updateForm("details", e.target.value)} placeholder={c.detailsPlaceholder}
                          className="w-full rounded-xl border border-outline-variant/40 bg-surface-container-lowest px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary/60 transition-all resize-none" />
                      </FormField>
                    </div>

                    <div className="px-7 py-5 border-t border-outline-variant/20 bg-surface-container-lowest/60">
                      <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
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
    <div className="flex flex-col items-center justify-center text-center py-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 rounded-full bg-secondary/20 animate-ping" aria-hidden="true" />
        <div className="relative flex size-20 items-center justify-center rounded-full bg-secondary text-on-secondary shadow-xl shadow-secondary/25">
          <span className="material-symbols-outlined text-4xl" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">check_circle</span>
        </div>
      </div>
      <h2 className="font-headline-xl text-headline-xl font-bold text-primary mb-3">
        {locale === "ar" ? "تم استلام طلبك! 🎉" : "Request received! 🎉"}
      </h2>
      <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md leading-relaxed mb-8">{c.success}</p>
      <Link to="/" className="rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary hover:bg-secondary/90 transition-colors">
        {locale === "ar" ? "العودة للرئيسية" : "Back to home"}
      </Link>
    </div>
  );
}
