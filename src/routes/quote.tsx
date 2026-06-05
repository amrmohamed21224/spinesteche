import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
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
    eyebrow: "مسار عرض السعر",
    title: "حوّل الفكرة إلى عرض تنفيذي واضح خلال دقائق",
    subtitle:
      "اختر نوع المشروع، حدّد مستوى الاستثمار، واترك لنا تفاصيل كافية لنجهز لك تصورًا عمليًا يناسب شركتك.",
    step1: "اختيار الحل",
    step2: "نطاق الاستثمار",
    step3: "بيانات التواصل",
    heroCta: "ابدأ تحديد النطاق",
    consultCta: "أفضل استشارة أولًا",
    servicesTitle: "اختر نقطة البداية",
    plansTitle: "اختر مستوى التنفيذ",
    formTitle: "أرسل تفاصيل المشروع",
    formSubtitle: "سنراجع الطلب ونعود لك بتصور واضح للخطوات والتكلفة المتوقعة.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    company: "الشركة",
    details: "ما الذي تريد بناءه أو تحسينه؟",
    submit: "إرسال طلب عرض السعر",
    submitting: "جاري الإرسال...",
    success: "تم استلام طلب عرض السعر. سنراجع التفاصيل ونتواصل معك قريبًا.",
    failure: "حدث خطأ أثناء الإرسال. جرّب مرة أخرى.",
    customPlan: "تصميم مخصص",
    selected: "محدد",
    buildSignal: "3 مراحل",
    buildSignalText: "تحديد النطاق، تصور الحل، ثم خطة التنفيذ.",
  },
  en: {
    eyebrow: "Quote pathway",
    title: "Turn the idea into a clear delivery proposal",
    subtitle:
      "Choose the project type, set the investment range, and share enough context for a practical execution plan.",
    step1: "Solution",
    step2: "Investment",
    step3: "Contact",
    heroCta: "Start scoping",
    consultCta: "Book consultation first",
    servicesTitle: "Choose the starting point",
    plansTitle: "Choose the delivery level",
    formTitle: "Send project details",
    formSubtitle: "We will review the request and return with clear next steps and expected cost.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    details: "What do you want to build or improve?",
    submit: "Send quote request",
    submitting: "Sending...",
    success: "Your quote request was received. We will contact you soon.",
    failure: "Something went wrong while sending. Please try again.",
    customPlan: "Custom design",
    selected: "Selected",
    buildSignal: "3 stages",
    buildSignalText: "Scope, solution direction, then delivery plan.",
  },
};

const budgetOptions = ["$5k - $15k", "$15k - $40k", "$40k - $100k", "$100k+"];

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
    name: "",
    email: "",
    phone: "",
    company: "",
    projectType: search.service || search.product || search.sector || "",
    budget: "",
    details: search.source ? `Source: ${search.source}` : "",
  });

  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery({
    queryKey: ["quote-services", locale],
    queryFn: () => getServices(locale),
  });

  const {
    data: plans,
    isLoading: plansLoading,
    isError: plansError,
  } = useQuery({
    queryKey: ["quote-plans", locale],
    queryFn: () => getPricingPlans(locale),
  });

  const selectedLabel = useMemo(() => {
    const service = services?.find((item) => item.slug === selectedService);
    const plan = plans?.find((item) => item.id === selectedPlan);
    return [service?.title, plan?.name, selectedBudget].filter(Boolean).join(" / ");
  }, [plans, selectedBudget, selectedPlan, selectedService, services]);

  const updateForm = (key: keyof QuoteForm, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
      <main className="pt-20 text-start" dir={dir}>
        <section className="bg-primary-container text-on-primary overflow-hidden">
          <Container clean className="px-margin-mobile md:px-margin-desktop py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/40 px-4 py-2 text-secondary-fixed font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    request_quote
                  </span>
                  {c.eyebrow}
                </span>
                <h1 className="mt-7 font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight max-w-3xl">
                  {c.title}
                </h1>
                <p className="mt-6 font-body-lg text-body-lg text-on-primary-container max-w-2xl">
                  {c.subtitle}
                </p>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#scope"
                    className="inline-flex items-center gap-2 rounded-xl bg-secondary text-on-secondary px-7 py-4 font-bold transition-transform hover:-translate-y-1 active:translate-y-0"
                  >
                    {c.heroCta}
                    <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                      keyboard_arrow_down
                    </span>
                  </a>
                  <Link
                    to="/consultation"
                    search={{ source: "quote-alternative" }}
                    className="inline-flex items-center gap-2 rounded-xl border border-secondary-fixed/40 px-7 py-4 font-bold text-secondary-fixed transition-colors hover:bg-white/10"
                  >
                    {c.consultCta}
                  </Link>
                </div>
              </div>
              <div className="relative">
                <div className="rounded-2xl border border-white/15 bg-white/8 p-5 shadow-2xl backdrop-blur-md">
                  {[c.step1, c.step2, c.step3].map((step, index) => (
                    <div
                      key={step}
                      className="group mb-3 flex items-center gap-4 rounded-xl border border-white/10 bg-white/8 p-4 last:mb-0 transition-all hover:-translate-y-1 hover:bg-white/12"
                    >
                      <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-on-secondary font-bold">
                        {index + 1}
                      </span>
                      <span className="font-headline-sm text-headline-sm">{step}</span>
                      <span className="material-symbols-outlined ms-auto text-secondary-fixed transition-transform group-hover:scale-125">
                        auto_awesome
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section id="scope" className="py-16 md:py-24">
          <Container clean className="px-margin-mobile md:px-margin-desktop">
            <div className="mb-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-label-md text-label-md text-secondary">{c.buildSignal}</p>
                <h2 className="font-headline-xl text-headline-xl font-bold text-primary">
                  {c.servicesTitle}
                </h2>
              </div>
              <p className="max-w-xl text-on-surface-variant">{c.buildSignalText}</p>
            </div>

            {servicesLoading && <StateFeedback type="loading" />}
            {servicesError && <StateFeedback type="error" />}
            {!servicesLoading && !servicesError && services && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.slice(0, 6).map((service) => {
                  const selected = selectedService === service.slug;
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => {
                        setSelectedService(service.slug);
                        updateForm("projectType", service.slug);
                      }}
                      className={`group min-h-48 rounded-xl border p-6 text-start transition-all hover:-translate-y-1 hover:shadow-xl ${
                        selected
                          ? "border-secondary bg-secondary text-on-secondary"
                          : "border-outline-variant bg-surface-container-lowest"
                      }`}
                    >
                      <span className="material-symbols-outlined mb-5 text-4xl" aria-hidden="true">
                        {service.icon}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm font-bold">
                        {service.title}
                      </h3>
                      <p
                        className={`mt-3 line-clamp-3 font-body-md text-body-md ${
                          selected ? "text-on-secondary/85" : "text-on-surface-variant"
                        }`}
                      >
                        {service.description}
                      </p>
                      <span className="mt-5 inline-flex items-center gap-2 font-label-md text-label-md">
                        {selected ? c.selected : c.step1}
                        <span className="material-symbols-outlined text-[17px]">bolt</span>
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

        <section className="bg-surface-container-low py-16 md:py-24">
          <Container clean className="px-margin-mobile md:px-margin-desktop">
            <h2 className="mb-10 font-headline-xl text-headline-xl font-bold text-primary">
              {c.plansTitle}
            </h2>
            {plansLoading && <StateFeedback type="loading" />}
            {plansError && <StateFeedback type="error" />}
            {!plansLoading && !plansError && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {plans?.map((plan) => {
                    const selected = selectedPlan === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => setSelectedPlan(plan.id)}
                        className={`rounded-xl border p-6 text-start transition-all hover:-translate-y-1 ${
                          selected
                            ? "border-primary bg-primary text-on-primary"
                            : "border-outline-variant bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <h3 className="font-headline-sm text-headline-sm font-bold">
                            {plan.name}
                          </h3>
                          {plan.recommended && (
                            <span className="rounded-full bg-secondary px-3 py-1 text-xs text-on-secondary">
                              {c.selected}
                            </span>
                          )}
                        </div>
                        <p
                          className={`mt-3 text-sm ${
                            selected ? "text-on-primary/80" : "text-on-surface-variant"
                          }`}
                        >
                          {plan.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
                <div className="rounded-2xl border border-outline-variant bg-white p-6">
                  <h3 className="mb-5 font-headline-sm text-headline-sm font-bold text-primary">
                    {c.step2}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {budgetOptions.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => {
                          setSelectedBudget(budget);
                          updateForm("budget", budget);
                        }}
                        className={`rounded-lg border px-4 py-4 font-bold transition-all hover:-translate-y-1 ${
                          selectedBudget === budget
                            ? "border-secondary bg-secondary text-on-secondary"
                            : "border-outline-variant"
                        }`}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container clean className="px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-8">
              <div>
                <h2 className="font-headline-xl text-headline-xl font-bold text-primary">
                  {c.formTitle}
                </h2>
                <p className="mt-4 text-on-surface-variant">{c.formSubtitle}</p>
              </div>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field label={c.name} value={form.name} onChange={(v) => updateForm("name", v)} />
                  <Field
                    label={c.email}
                    type="email"
                    value={form.email}
                    onChange={(v) => updateForm("email", v)}
                  />
                  <Field
                    label={c.phone}
                    value={form.phone}
                    onChange={(v) => updateForm("phone", v)}
                  />
                  <Field
                    label={c.company}
                    value={form.company}
                    onChange={(v) => updateForm("company", v)}
                  />
                </div>
                <label className="mt-4 block">
                  <span className="mb-2 block font-label-md text-label-md text-primary">
                    {c.details}
                  </span>
                  <textarea
                    required
                    value={form.details}
                    onChange={(event) => updateForm("details", event.target.value)}
                    className="min-h-36 w-full rounded-xl border border-outline-variant bg-white px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 w-full rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary transition-all hover:-translate-y-1 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {status === "submitting" ? c.submitting : c.submit}
                </button>
                {status === "success" && <p className="mt-4 text-secondary">{c.success}</p>}
                {status === "error" && <p className="mt-4 text-error">{c.failure}</p>}
              </form>
            </div>
          </Container>
        </section>
      </main>
    </PageLayout>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label-md text-label-md text-primary">{label}</span>
      <input
        required
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-xl border border-outline-variant bg-white px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}
