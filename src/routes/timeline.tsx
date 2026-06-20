import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/layout/Container";
import { seo } from "../lib/seo";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/timeline")({
  head: () =>
    seo({
      title: "مخطط مشروعك — Timeline Generator",
      description:
        "احصل على مخطط زمني تفاعلي لمشروعك مع تقدير التكلفة والمراحل.",
      path: "/timeline",
    }),
  component: TimelinePage,
});

// ─────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────

interface Phase {
  id: string;
  title: string;
  duration: string; // e.g. "أسبوعان"
  weeks: number;
  description: string;
  deliverables: string[];
  icon: string;
}

interface SolutionType {
  id: string;
  title: string;
  description: string;
  icon: string;
  phases: Phase[];
  totalWeeks: number;
  minCost: number;
  maxCost: number;
  teamSize: string;
}

// ─────────────────────────────────────────────────────────────
// DATA — Arabic
// ─────────────────────────────────────────────────────────────

const SOLUTIONS_AR: SolutionType[] = [
  {
    id: "erp",
    title: "نظام ERP مؤسسي",
    description: "نظام متكامل للمحاسبة، المخزون، HR، والمبيعات",
    icon: "account_tree",
    totalWeeks: 20,
    minCost: 40000,
    maxCost: 120000,
    teamSize: "5–8",
    phases: [
      {
        id: "p1", title: "التحليل والتخطيط", duration: "3 أسابيع", weeks: 3,
        description: "دراسة العمليات الحالية وتحديد المتطلبات بالتفصيل",
        deliverables: ["وثيقة المتطلبات", "مخطط قاعدة البيانات", "خطة المشروع"],
        icon: "analytics",
      },
      {
        id: "p2", title: "التصميم وتجربة المستخدم", duration: "3 أسابيع", weeks: 3,
        description: "تصميم واجهة سهلة الاستخدام تناسب فريقك",
        deliverables: ["Wireframes كاملة", "Prototype تفاعلي", "دليل التصميم"],
        icon: "design_services",
      },
      {
        id: "p3", title: "التطوير الأساسي", duration: "7 أسابيع", weeks: 7,
        description: "بناء الوحدات الأساسية: المحاسبة، المخزون، HR",
        deliverables: ["وحدة المحاسبة", "وحدة المخزون", "إدارة المستخدمين"],
        icon: "code",
      },
      {
        id: "p4", title: "التكامل والاختبار", duration: "4 أسابيع", weeks: 4,
        description: "ربط الوحدات معاً واختبار شامل قبل الإطلاق",
        deliverables: ["تقرير الاختبار", "ربط الأنظمة الخارجية", "بيئة Staging"],
        icon: "integration_instructions",
      },
      {
        id: "p5", title: "الإطلاق والتدريب", duration: "3 أسابيع", weeks: 3,
        description: "نشر النظام وتدريب الفريق على الاستخدام",
        deliverables: ["النظام Live", "دليل المستخدم", "دورة تدريبية"],
        icon: "rocket_launch",
      },
    ],
  },
  {
    id: "mobile",
    title: "تطبيق جوال",
    description: "تطبيق iOS وAndroid بتجربة مستخدم عالية",
    icon: "smartphone",
    totalWeeks: 14,
    minCost: 20000,
    maxCost: 60000,
    teamSize: "3–5",
    phases: [
      {
        id: "p1", title: "البحث والتخطيط", duration: "أسبوعان", weeks: 2,
        description: "دراسة المستخدم المستهدف وتحديد المميزات الأساسية",
        deliverables: ["User Journey Map", "قائمة المميزات", "خطة التقنيات"],
        icon: "manage_search",
      },
      {
        id: "p2", title: "تصميم UX/UI", duration: "3 أسابيع", weeks: 3,
        description: "تصميم كل شاشات التطبيق بدقة وإنشاء prototype",
        deliverables: ["Mockups كاملة", "Prototype تفاعلي", "نظام الألوان والخطوط"],
        icon: "phone_iphone",
      },
      {
        id: "p3", title: "التطوير", duration: "6 أسابيع", weeks: 6,
        description: "بناء التطبيق بالكامل مع الـ backend",
        deliverables: ["التطبيق على iOS", "التطبيق على Android", "API Backend"],
        icon: "code",
      },
      {
        id: "p4", title: "الاختبار والإطلاق", duration: "3 أسابيع", weeks: 3,
        description: "اختبار شامل ونشر على متاجر Apple وGoogle",
        deliverables: ["تقرير QA", "نشر على App Store", "نشر على Google Play"],
        icon: "rocket_launch",
      },
    ],
  },
  {
    id: "ai",
    title: "حل ذكاء اصطناعي",
    description: "أتمتة، تحليل بيانات، أو chatbot ذكي",
    icon: "psychology",
    totalWeeks: 12,
    minCost: 15000,
    maxCost: 80000,
    teamSize: "3–6",
    phases: [
      {
        id: "p1", title: "تحليل البيانات والجدوى", duration: "أسبوعان", weeks: 2,
        description: "تحليل البيانات المتاحة وتحديد نطاق الحل الذكي",
        deliverables: ["تقرير تحليل البيانات", "دراسة الجدوى", "اختيار النموذج"],
        icon: "data_exploration",
      },
      {
        id: "p2", title: "بناء النموذج والتدريب", duration: "4 أسابيع", weeks: 4,
        description: "تطوير النموذج الذكي وتدريبه على بياناتك",
        deliverables: ["النموذج المدرّب", "مقاييس الدقة", "API أولي"],
        icon: "model_training",
      },
      {
        id: "p3", title: "التكامل والواجهة", duration: "3 أسابيع", weeks: 3,
        description: "ربط الحل بأنظمتك الحالية وبناء الواجهة",
        deliverables: ["تكامل مع الأنظمة", "لوحة تحكم", "APIs جاهزة"],
        icon: "integration_instructions",
      },
      {
        id: "p4", title: "الاختبار والتحسين", duration: "2 أسبوعان", weeks: 2,
        description: "اختبار الدقة وتحسين النموذج بناءً على النتائج",
        deliverables: ["تقرير الأداء", "تحسينات النموذج", "توثيق تقني"],
        icon: "tune",
      },
      {
        id: "p5", title: "الإطلاق والمراقبة", duration: "أسبوع", weeks: 1,
        description: "نشر الحل ووضع نظام مراقبة مستمر",
        deliverables: ["النظام Live", "لوحة المراقبة", "خطة الصيانة"],
        icon: "rocket_launch",
      },
    ],
  },
  {
    id: "web",
    title: "موقع / منصة ويب",
    description: "موقع مؤسسي أو منصة ويب متكاملة",
    icon: "web",
    totalWeeks: 10,
    minCost: 8000,
    maxCost: 35000,
    teamSize: "2–4",
    phases: [
      {
        id: "p1", title: "التخطيط والهيكلة", duration: "أسبوعان", weeks: 2,
        description: "تحديد هيكل المحتوى وخارطة الموقع",
        deliverables: ["Site Map", "تحليل المنافسين", "قائمة المحتوى"],
        icon: "account_tree",
      },
      {
        id: "p2", title: "التصميم", duration: "3 أسابيع", weeks: 3,
        description: "تصميم كل صفحات الموقع بجودة عالية",
        deliverables: ["تصاميم كاملة", "نظام بصري موحد", "نسخة موبايل"],
        icon: "design_services",
      },
      {
        id: "p3", title: "التطوير", duration: "4 أسابيع", weeks: 4,
        description: "تطوير الموقع بالكامل مع CMS سهل الإدارة",
        deliverables: ["الموقع على Staging", "CMS", "تحسين SEO"],
        icon: "code",
      },
      {
        id: "p4", title: "الإطلاق", duration: "أسبوع", weeks: 1,
        description: "اختبار نهائي، ربط الدومين، والنشر",
        deliverables: ["الموقع Live", "SSL وحماية", "تقرير GTmetrix"],
        icon: "rocket_launch",
      },
    ],
  },
  {
    id: "custom",
    title: "برنامج مخصص",
    description: "نظام أو برنامج متخصص حسب احتياجك",
    icon: "build",
    totalWeeks: 16,
    minCost: 25000,
    maxCost: 90000,
    teamSize: "4–7",
    phases: [
      {
        id: "p1", title: "الاستكشاف والتحليل", duration: "3 أسابيع", weeks: 3,
        description: "فهم العملية الحالية وتصميم الحل المناسب",
        deliverables: ["وثيقة المتطلبات", "نماذج أولية", "معمارية النظام"],
        icon: "search",
      },
      {
        id: "p2", title: "التصميم والنمذجة", duration: "2 أسبوعان", weeks: 2,
        description: "تصميم تجربة المستخدم والنمذجة التقنية",
        deliverables: ["Wireframes", "ERD", "API Design"],
        icon: "design_services",
      },
      {
        id: "p3", title: "التطوير التكراري", duration: "8 أسابيع", weeks: 8,
        description: "تطوير بمنهجية Agile مع تسليمات كل أسبوعين",
        deliverables: ["Sprint 1–4", "بيئة اختبار مستمرة", "تقارير أسبوعية"],
        icon: "code",
      },
      {
        id: "p4", title: "الإطلاق والدعم", duration: "3 أسابيع", weeks: 3,
        description: "اختبار شامل، إطلاق، وتدريب الفريق",
        deliverables: ["النظام Live", "توثيق تقني", "دورة تدريبية"],
        icon: "rocket_launch",
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────────

function TimelinePage() {
  const { locale, dir } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  const solution = SOLUTIONS_AR.find((s) => s.id === selected) ?? null;

  const handleSelect = (id: string) => {
    setSelected(id);
    setRevealed(false);
    setTimeout(() => setRevealed(true), 80);
  };

  const formatCost = (n: number) =>
    n >= 1000 ? `$${(n / 1000).toFixed(0)}k` : `$${n}`;

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">

        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-primary-container pt-28 pb-20 md:pt-36 md:pb-24 px-margin-mobile md:px-margin-desktop">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-32 end-0 w-[480px] h-[480px] rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 start-0 w-[280px] h-[280px] rounded-full bg-on-primary/5 blur-3xl" aria-hidden="true" />

          <Container clean>
            <div
              className="max-w-2xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/30 bg-secondary/15 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">timeline</span>
                {locale === "ar" ? "مخطط مشروعك" : "Project timeline"}
              </span>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-on-primary mb-5">
                {locale === "ar"
                  ? "اعرف مشروعك هيخلص إمتى وبكام"
                  : "Know when your project ships and what it costs"}
              </h1>

              <p className="font-body-lg text-body-lg text-on-primary/75 max-w-xl">
                {locale === "ar"
                  ? "اختر نوع الحل اللي تريده وسنعرض لك مراحل التنفيذ الفعلية مع تقدير التكلفة والوقت."
                  : "Choose the solution type and get an instant view of real execution phases, timeline, and cost estimate."}
              </p>
            </div>
          </Container>
        </section>

        {/* ── SOLUTION PICKER ── */}
        <section className="py-14 md:py-20 px-margin-mobile md:px-margin-desktop">
          <Container clean>
            <p className="font-label-md text-label-md text-on-surface-variant mb-6 font-bold">
              {locale === "ar" ? "اختر نوع المشروع:" : "Choose project type:"}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {SOLUTIONS_AR.map((sol, i) => {
                const isSelected = selected === sol.id;
                return (
                  <button
                    key={sol.id}
                    onClick={() => handleSelect(sol.id)}
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(16px)",
                      transition: `opacity 0.45s ease ${i * 60}ms, transform 0.45s ease ${i * 60}ms`,
                    }}
                    className={`group relative text-start p-5 rounded-2xl border-2 transition-all duration-250 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 hover:-translate-y-1 ${
                      isSelected
                        ? "border-secondary bg-secondary text-on-secondary shadow-lg shadow-secondary/25 -translate-y-1"
                        : "border-outline-variant/40 bg-white hover:border-secondary/40 hover:shadow-md"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-3 end-3 flex size-5 items-center justify-center rounded-full bg-on-secondary/20">
                        <span className="material-symbols-outlined text-[12px] text-on-secondary" aria-hidden="true">check</span>
                      </span>
                    )}
                    <span
                      className={`material-symbols-outlined text-3xl mb-3 block ${isSelected ? "text-on-secondary" : "text-secondary"}`}
                      aria-hidden="true"
                    >
                      {sol.icon}
                    </span>
                    <p className={`font-bold text-[14px] leading-snug mb-1 ${isSelected ? "text-on-secondary" : "text-primary"}`}>
                      {sol.title}
                    </p>
                    <p className={`text-caption leading-relaxed ${isSelected ? "text-on-secondary/75" : "text-on-surface-variant"}`}>
                      {sol.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </Container>
        </section>

        {/* ── TIMELINE RESULT ── */}
        {solution && (
          <section className="pb-20 md:pb-28 px-margin-mobile md:px-margin-desktop">
            <Container clean>

              {/* Summary bar */}
              <div
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 rounded-2xl border border-outline-variant/30 bg-white p-6 shadow-sm"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "none" : "translateY(12px)",
                  transition: "opacity 0.4s ease, transform 0.4s ease",
                }}
              >
                {/* Duration */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/12 text-secondary">
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">schedule</span>
                  </span>
                  <div>
                    <p className="text-caption text-on-surface-variant mb-0.5">
                      {locale === "ar" ? "المدة الإجمالية" : "Total duration"}
                    </p>
                    <p className="font-bold text-primary text-[18px]">
                      {solution.totalWeeks} {locale === "ar" ? "أسبوع" : "weeks"}
                    </p>
                  </div>
                </div>

                {/* Cost */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/12 text-secondary">
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">payments</span>
                  </span>
                  <div>
                    <p className="text-caption text-on-surface-variant mb-0.5">
                      {locale === "ar" ? "تقدير التكلفة" : "Cost estimate"}
                    </p>
                    <p className="font-bold text-primary text-[18px]">
                      {formatCost(solution.minCost)} — {formatCost(solution.maxCost)}
                    </p>
                  </div>
                </div>

                {/* Team */}
                <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary/12 text-secondary">
                    <span className="material-symbols-outlined text-2xl" aria-hidden="true">group</span>
                  </span>
                  <div>
                    <p className="text-caption text-on-surface-variant mb-0.5">
                      {locale === "ar" ? "حجم الفريق" : "Team size"}
                    </p>
                    <p className="font-bold text-primary text-[18px]">
                      {solution.teamSize} {locale === "ar" ? "متخصصين" : "specialists"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Phases timeline */}
              <h2 className="font-headline-xl text-headline-xl font-bold text-primary mb-8">
                {locale === "ar" ? "مراحل التنفيذ" : "Execution phases"}
              </h2>

              <div className="relative">
                {/* vertical line */}
                <div
                  className="absolute start-[26px] top-0 bottom-0 w-0.5 bg-outline-variant/30"
                  aria-hidden="true"
                  style={{
                    opacity: revealed ? 1 : 0,
                    transition: "opacity 0.5s ease 0.2s",
                  }}
                />

                <div className="space-y-6">
                  {solution.phases.map((phase, i) => (
                    <div
                      key={phase.id}
                      className="relative flex gap-6"
                      style={{
                        opacity: revealed ? 1 : 0,
                        transform: revealed ? "none" : "translateX(16px)",
                        transition: `opacity 0.45s ease ${0.1 + i * 0.1}s, transform 0.45s ease ${0.1 + i * 0.1}s`,
                      }}
                    >
                      {/* circle + icon */}
                      <div className="relative z-10 flex size-[54px] shrink-0 items-center justify-center rounded-2xl bg-primary-container border-4 border-background shadow-md">
                        <span className="material-symbols-outlined text-secondary-fixed text-[20px]" aria-hidden="true">
                          {phase.icon}
                        </span>
                        <span className="absolute -top-2 -end-2 flex size-5 items-center justify-center rounded-full bg-secondary text-on-secondary text-[10px] font-bold shadow">
                          {i + 1}
                        </span>
                      </div>

                      {/* content card */}
                      <div className="flex-1 rounded-2xl border border-outline-variant/30 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                          <h3 className="font-bold text-primary text-[16px]">{phase.title}</h3>
                          <span className="inline-flex items-center gap-1.5 rounded-lg bg-secondary/10 border border-secondary/20 px-3 py-1 text-secondary text-caption font-bold shrink-0">
                            <span className="material-symbols-outlined text-[14px]" aria-hidden="true">schedule</span>
                            {phase.duration}
                          </span>
                        </div>

                        <p className="text-on-surface-variant font-body-sm mb-4 leading-relaxed">
                          {phase.description}
                        </p>

                        <div>
                          <p className="text-caption font-bold text-on-surface-variant uppercase tracking-wider mb-2">
                            {locale === "ar" ? "المخرجات:" : "Deliverables:"}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {phase.deliverables.map((d, di) => (
                              <span
                                key={di}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-surface-container px-3 py-1.5 text-[12px] text-on-surface font-medium border border-outline-variant/30"
                              >
                                <span className="material-symbols-outlined text-secondary text-[12px]" aria-hidden="true">check_circle</span>
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* week bar */}
                        <div className="mt-4 pt-4 border-t border-outline-variant/20">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-caption text-on-surface-variant">
                              {locale === "ar" ? "المدة النسبية" : "Relative duration"}
                            </span>
                            <span className="text-caption font-bold text-secondary">
                              {phase.weeks} {locale === "ar" ? (phase.weeks === 1 ? "أسبوع" : "أسابيع") : (phase.weeks === 1 ? "week" : "weeks")}
                            </span>
                          </div>
                          <div className="h-1.5 rounded-full bg-surface-container overflow-hidden">
                            <div
                              className="h-full rounded-full bg-secondary"
                              style={{
                                width: revealed ? `${(phase.weeks / solution.totalWeeks) * 100}%` : "0%",
                                transition: `width 0.8s cubic-bezier(.4,0,.2,1) ${0.3 + i * 0.1}s`,
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div
                className="mt-14 rounded-3xl overflow-hidden"
                style={{
                  opacity: revealed ? 1 : 0,
                  transform: revealed ? "none" : "translateY(16px)",
                  transition: "opacity 0.5s ease 0.6s, transform 0.5s ease 0.6s",
                }}
              >
                <div className="relative bg-primary-container px-8 py-10 text-center overflow-hidden">
                  <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
                  <div className="pointer-events-none absolute -top-20 end-0 w-64 h-64 rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />

                  <div className="relative">
                    <p className="font-display-sm text-display-sm font-bold text-on-primary mb-3">
                      {locale === "ar"
                        ? `مشروعك جاهز في ${solution.totalWeeks} أسبوع`
                        : `Your project ready in ${solution.totalWeeks} weeks`}
                    </p>
                    <p className="text-on-primary/70 font-body-lg mb-8 max-w-lg mx-auto">
                      {locale === "ar"
                        ? "احجز استشارة مجانية عشان نتحقق من التفاصيل ونرسلك عرض سعر دقيق."
                        : "Book a free consultation to confirm details and get a precise quote."}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        to="/consultation"
                        className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      >
                        {locale === "ar" ? "احجز استشارة مجانية" : "Book free consultation"}
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                          {dir === "rtl" ? "arrow_back" : "arrow_forward"}
                        </span>
                      </Link>
                      <Link
                        to="/quote"
                        className="flex items-center justify-center gap-2 rounded-xl border-2 border-secondary-fixed px-8 py-4 font-bold text-secondary-fixed transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                      >
                        {locale === "ar" ? "اطلب عرض سعر" : "Request a quote"}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

            </Container>
          </section>
        )}

        {/* placeholder when nothing selected */}
        {!solution && (
          <div className="pb-20 px-margin-mobile md:px-margin-desktop">
            <Container clean>
              <div className="flex flex-col items-center justify-center text-center py-16 rounded-2xl border-2 border-dashed border-outline-variant/40">
                <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4" aria-hidden="true">timeline</span>
                <p className="font-bold text-on-surface-variant">
                  {locale === "ar" ? "اختر نوع المشروع لعرض المخطط الزمني" : "Select a project type to view the timeline"}
                </p>
              </div>
            </Container>
          </div>
        )}

      </main>
    </PageLayout>
  );
}
