import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
    eyebrow: "استشارة مجانية",
    title: "جلسة مركزة تكشف أفضل مسار تقني لشركتك",
    subtitle:
      "بدل مكالمة عامة، سنقودك خلال نقاط القرار: الهدف، العائق، الأولوية، ثم نجهز لك توصية واضحة.",
    optionTitle: "ما الهدف من الاستشارة؟",
    formTitle: "احجز الجلسة",
    formSubtitle: "اختر الهدف واترك بياناتك، وسنرتب معك موعدًا مناسبًا.",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "رقم الجوال",
    company: "الشركة",
    message: "ما الذي تريد مناقشته؟",
    submit: "تأكيد طلب الاستشارة",
    submitting: "جاري الإرسال...",
    success: "تم استلام طلب الاستشارة. سنرتب معك الموعد قريبًا.",
    failure: "حدث خطأ أثناء الإرسال. جرّب مرة أخرى.",
    quote: "أحتاج عرض سعر بدلًا من ذلك",
  },
  en: {
    eyebrow: "Free consultation",
    title: "A focused session to reveal the right technical path",
    subtitle:
      "Instead of a generic call, we guide the decision points: goal, blocker, priority, then a clear recommendation.",
    optionTitle: "What is the goal?",
    formTitle: "Book the session",
    formSubtitle: "Choose the goal and leave your details. We will coordinate the right time.",
    name: "Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    message: "What do you want to discuss?",
    submit: "Confirm consultation request",
    submitting: "Sending...",
    success: "Your consultation request was received. We will contact you soon.",
    failure: "Something went wrong while sending. Please try again.",
    quote: "I need a quote instead",
  },
};

const goals = {
  ar: [
    { id: "growth", title: "توسيع منتج قائم", icon: "trending_up" },
    { id: "automation", title: "أتمتة عمليات داخلية", icon: "automation" },
    { id: "ai", title: "تفعيل الذكاء الاصطناعي", icon: "psychology" },
    { id: "rebuild", title: "إعادة بناء نظام قديم", icon: "sync_alt" },
  ],
  en: [
    { id: "growth", title: "Scale an existing product", icon: "trending_up" },
    { id: "automation", title: "Automate internal operations", icon: "automation" },
    { id: "ai", title: "Activate AI capabilities", icon: "psychology" },
    { id: "rebuild", title: "Rebuild a legacy system", icon: "sync_alt" },
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
  const [goal, setGoal] = useState(search.service || search.sector || "growth");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: search.source ? `Source: ${search.source}` : "",
  });

  const updateForm = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    try {
      await submitContactForm(
        {
          ...form,
          message: `[consultation:${goal}] ${form.message}`,
          source: "consultation-page",
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
        <section className="bg-background py-16 md:py-24">
          <Container clean className="px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] gap-10 items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full bg-secondary-container px-4 py-2 text-on-secondary-container font-label-md text-label-md">
                  <span className="material-symbols-outlined text-[18px]">forum</span>
                  {c.eyebrow}
                </span>
                <h1 className="mt-7 max-w-3xl font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-primary">
                  {c.title}
                </h1>
                <p className="mt-6 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
                  {c.subtitle}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href="#booking"
                    className="rounded-xl bg-primary px-7 py-4 font-bold text-on-primary transition-transform hover:-translate-y-1"
                  >
                    {c.formTitle}
                  </a>
                  <Link
                    to="/quote"
                    search={{ source: "consultation-alternative" }}
                    className="rounded-xl border border-secondary px-7 py-4 font-bold text-secondary transition-colors hover:bg-secondary/5"
                  >
                    {c.quote}
                  </Link>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {goals[locale].map((item, index) => (
                  <div
                    key={item.id}
                    className="min-h-40 rounded-xl border border-outline-variant bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                    style={{ transitionDelay: `${index * 45}ms` }}
                  >
                    <span className="material-symbols-outlined text-4xl text-secondary">
                      {item.icon}
                    </span>
                    <p className="mt-4 font-headline-sm text-headline-sm font-bold text-primary">
                      {item.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section id="booking" className="bg-primary-container py-16 md:py-24 text-on-primary">
          <Container clean className="px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-8">
              <div>
                <h2 className="font-headline-xl text-headline-xl font-bold">{c.optionTitle}</h2>
                <div className="mt-8 grid grid-cols-1 gap-3">
                  {goals[locale].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setGoal(item.id)}
                      className={`flex items-center gap-3 rounded-xl border p-4 text-start transition-all hover:-translate-y-1 ${
                        goal === item.id
                          ? "border-secondary bg-secondary text-on-secondary"
                          : "border-white/15 bg-white/8"
                      }`}
                    >
                      <span className="material-symbols-outlined">{item.icon}</span>
                      <span className="font-bold">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-white/15 bg-white p-6 text-on-surface shadow-2xl"
              >
                <h2 className="font-headline-xl text-headline-xl font-bold text-primary">
                  {c.formTitle}
                </h2>
                <p className="mt-2 text-on-surface-variant">{c.formSubtitle}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {c.message}
                  </span>
                  <textarea
                    required
                    value={form.message}
                    onChange={(event) => updateForm("message", event.target.value)}
                    className="min-h-32 w-full rounded-xl border border-outline-variant px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
                  />
                </label>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 w-full rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary transition-all hover:-translate-y-1 disabled:opacity-70"
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
        className="w-full rounded-xl border border-outline-variant px-4 py-3 focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/20"
      />
    </label>
  );
}
