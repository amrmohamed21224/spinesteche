import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../../components/layout/PageLayout";
import { seo } from "../../lib/seo";
import { Container } from "../../components/layout/Container";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getCaseStudies } from "../../lib/api/fetchers";
import { useTranslation } from "../../i18n";

export const Route = createFileRoute("/case-studies/")({
  head: () =>
    seo({
      title: "دراسات الحالة",
      description:
        "تصفح قصص نجاح SpinesTech ومشاريع التحول الرقمي وأنظمة ERP التي نفذناها لعملائنا في السعودية والخليج.",
      path: "/case-studies",
    }),
  component: Page,
});

type FilterKey = "all" | "retail" | "real-estate" | "ai";

const copy = {
  ar: {
    eyebrow: "قصص نجاح حقيقية",
    privacyText:
      "نلتزم باتفاقيات السرية مع عملائنا. العروض التوضيحية تمثل نتائج حقيقية مع إخفاء هويات تجارية حساسة.",
    filtersAll: "الكل",
    filtersRetail: "التجارة",
    filtersRealEstate: "العقارات",
    filtersAi: "الذكاء الاصطناعي",
    challengeLabel: "التحدي",
    solutionLabel: "الحل",
    resultsLabel: "النتيجة",
    viewCaseStudyButton: "عرض دراسة الحالة",
    emptyMessage: "لا توجد دراسات حالة مطابقة لهذا الفلتر.",
    loadError: "حدث خطأ أثناء التحميل. جرّب مرة أخرى.",
    emptyTitle: "لا توجد دراسات حالة",
    ctaTitle: "نبدأ قصة نجاحك القادمة؟",
    ctaSubtitle: "فريقنا جاهز لتحليل تحدياتك وتقديم خارطة طريق تقنية واضحة تناسب طموحاتك.",
    ctaPrimary: "احجز استشارة مجانية",
    ctaSecondary: "تصفح الحلول",
    caseStudySuffix_one: "دراسة",
    caseStudySuffix_two: "دراستان",
    caseStudySuffix_few: "دراسات",
    caseStudySuffix_many: "دراسة",
    caseStudySuffix_other: "دراسة",
  },
  en: {
    eyebrow: "Real success stories",
    privacyText:
      "We adhere to confidentiality agreements with our clients. Case studies represent real results with sensitive identities anonymized.",
    filtersAll: "All",
    filtersRetail: "Retail",
    filtersRealEstate: "Real Estate",
    filtersAi: "AI",
    challengeLabel: "Challenge",
    solutionLabel: "Solution",
    resultsLabel: "Results",
    viewCaseStudyButton: "View Case Study",
    emptyMessage: "No case studies match this filter.",
    emptyTitle: "No case studies available",
    loadError: "Failed to load case studies. Please try again.",
    ctaTitle: "Shall we write your next success story?",
    ctaSubtitle:
      "Our team is ready to analyze your challenges and provide a clear technical roadmap that matches your ambitions.",
    ctaPrimary: "Book a Free Consultation",
    ctaSecondary: "Explore Solutions",
    caseStudySuffix_one: "study",
    caseStudySuffix_two: "studies",
    caseStudySuffix_few: "studies",
    caseStudySuffix_many: "studies",
    caseStudySuffix_other: "studies",
  },
};

function getCategoryKey(sector: string): FilterKey {
  const s = sector.toLowerCase();
  if (
    sector.includes("تجزئة") ||
    sector.includes("إلكترونية") ||
    sector.includes("التجارة") ||
    s.includes("retail") ||
    s.includes("e-commerce") ||
    s.includes("ecommerce")
  )
    return "retail";
  if (sector.includes("عقارات") || sector.includes("العقارات") || s.includes("real estate"))
    return "real-estate";
  if (
    sector.includes("ذكاء") ||
    sector.includes("الذكاء") ||
    s.includes("artificial intelligence") ||
    s.includes("ai")
  )
    return "ai";
  return "all";
}

function Page() {
  const { t, locale, dir } = useTranslation();
  const c = copy[locale];
  const [activeFilter, setActiveFilter] = useState<FilterKey>("all");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const {
    data: caseStudies,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["case-studies", locale],
    queryFn: () => getCaseStudies(locale),
  });

  const filteredStudies = caseStudies
    ? activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((study) => getCategoryKey(study.sector) === activeFilter)
    : [];

  const filters: { key: FilterKey; label: string; icon: string }[] = [
    { key: "all", label: c.filtersAll, icon: "grid_view" },
    { key: "retail", label: c.filtersRetail, icon: "shopping_bag" },
    { key: "real-estate", label: c.filtersRealEstate, icon: "domain" },
    { key: "ai", label: c.filtersAi, icon: "psychology" },
  ];

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">
        {/* ═══════════════ HERO ═══════════════ */}
        <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-24 px-margin-mobile md:px-margin-desktop">
          <div className="islamic-pattern absolute inset-0 opacity-[0.02]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-32 end-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 start-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <Container clean className="relative z-10">
            <div
              className="max-w-3xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-6">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  workspace_premium
                </span>
                {c.eyebrow}
              </span>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-[1.1] text-primary mb-5">
                {t("caseStudies.heroTitle")}
              </h1>

              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mb-8 leading-relaxed">
                {t("caseStudies.heroSubtitle")}
              </p>

              {/* Privacy notice */}
              <div className="inline-flex items-start gap-3 rounded-2xl border border-outline-variant/30 bg-surface-container p-4 max-w-xl">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary mt-0.5">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    lock
                  </span>
                </span>
                <p className="font-body-sm text-on-surface leading-relaxed">{c.privacyText}</p>
              </div>
            </div>
          </Container>
        </section>

        {/* ═══════════════ FILTERS BAR ═══════════════ */}
        <div className="bg-background/95 backdrop-blur-md border-y border-outline-variant/15 py-4 md:py-5 px-margin-mobile md:px-margin-desktop sticky top-16 lg:top-20 z-30">
          <Container clean>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {filters.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => setActiveFilter(f.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-label-md transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                      activeFilter === f.key
                        ? "bg-secondary text-on-secondary shadow-md shadow-secondary/25 -translate-y-0.5"
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface border border-outline-variant/20"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]" aria-hidden="true">
                      {f.icon}
                    </span>
                    {f.label}
                  </button>
                ))}
              </div>
              <span className="text-on-surface-variant font-label-md shrink-0">
                {locale === "ar"
                  ? `${filteredStudies.length} ${filteredStudies.length === 1 ? "دراسة" : filteredStudies.length === 2 ? "دراستان" : filteredStudies.length < 11 ? "دراسات" : "دراسة"}`
                  : `${filteredStudies.length} ${filteredStudies.length === 1 ? "study" : "studies"}`}
              </span>
            </div>
          </Container>
        </div>

        {/* ═══════════════ CARDS GRID ═══════════════ */}
        <section className="px-margin-mobile md:px-margin-desktop py-14 md:py-20">
          <Container clean>
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={c.loadError} onRetry={refetch} />
            )}
            {!isLoading && !isError && filteredStudies.length === 0 && (
              <StateFeedback type="empty" message={c.emptyMessage} />
            )}

            {!isLoading && !isError && filteredStudies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                {filteredStudies.map((study, index) => (
                  <article
                    key={study.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant/30 bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-primary/10"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(22px)",
                      transition: `opacity 0.55s ease ${index * 70}ms, transform 0.55s ease ${index * 70}ms, box-shadow 0.3s ease`,
                    }}
                  >
                    {/* Image */}
                    <Link
                      to="/case-studies/$slug"
                      params={{ slug: study.slug }}
                      className="relative h-56 overflow-hidden shrink-0 bg-surface-container block"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        alt={study.title}
                        src={study.image}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent"
                        aria-hidden="true"
                      />
                      {/* Sector badge */}
                      <span className="absolute top-4 end-4 rounded-lg bg-secondary/90 backdrop-blur-sm text-on-secondary px-3 py-1.5 text-caption font-bold shadow-md">
                        {study.sector}
                      </span>
                      {/* Client badge */}
                      <span className="absolute bottom-4 start-4 rounded-lg bg-black/50 backdrop-blur-sm text-white/90 px-3 py-1 text-caption font-medium flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                          business
                        </span>
                        {study.client}
                      </span>
                    </Link>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-6 md:p-7">
                      <Link
                        to="/case-studies/$slug"
                        params={{ slug: study.slug }}
                        className="block"
                      >
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold leading-snug mb-4 line-clamp-2 hover:text-secondary transition-colors duration-200">
                          {study.title}
                        </h3>
                      </Link>

                      {/* Challenge */}
                      <div className="mb-3">
                        <p className="text-caption font-bold text-secondary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                            report_problem
                          </span>
                          {c.challengeLabel}
                        </p>
                        <p className="font-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                          {study.challenge}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="mb-4">
                        <p className="text-caption font-bold text-secondary uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                            lightbulb
                          </span>
                          {c.solutionLabel}
                        </p>
                        <p className="font-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                          {study.solution}
                        </p>
                      </div>

                      {/* Result highlight */}
                      <div className="rounded-xl bg-secondary/8 border border-secondary/15 px-4 py-3 mb-5">
                        <p className="text-caption font-bold text-secondary uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                            emoji_events
                          </span>
                          {c.resultsLabel}
                        </p>
                        <p className="font-bold text-secondary leading-snug text-sm">{study.result}</p>
                      </div>

                      {/* CTA button */}
                      <Link
                        to="/case-studies/$slug"
                        params={{ slug: study.slug }}
                        className="mt-auto flex items-center justify-center gap-2 w-full rounded-xl bg-secondary py-3.5 font-bold text-on-secondary text-label-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      >
                        {c.viewCaseStudyButton}
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                          {locale === "ar" ? "arrow_back" : "arrow_forward"}
                        </span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </section>

        {/* ═══════════════ CTA ═══════════════ */}
        <section className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-primary-container overflow-hidden">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-40 end-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-40 start-20 w-96 h-96 rounded-full bg-on-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <Container clean>
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
              <h2 className="font-display-md text-display-md-mobile md:text-display-md font-bold text-on-primary mb-5">
                {c.ctaTitle}
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/75 mb-10">
                {c.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/consultation"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-on-secondary font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {c.ctaPrimary}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {locale === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>
                <Link
                  to="/solutions"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary-fixed text-secondary-fixed font-bold rounded-xl transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  {c.ctaSecondary}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {locale === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </PageLayout>
  );
}
