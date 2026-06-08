import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getCaseStudies } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/case-studies")({
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

const filterConfig: Record<FilterKey, { label: string; icon: string }> = {
  all: { label: "جميع الدراسات", icon: "grid_view" },
  retail: { label: "التجزئة", icon: "shopping_bag" },
  "real-estate": { label: "العقارات", icon: "domain" },
  ai: { label: "الذكاء الاصطناعي", icon: "psychology" },
};

function Page() {
  const { t, locale, dir } = useTranslation();
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

  const getCategoryKey = (sector: string): FilterKey => {
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
  };

  const filteredStudies = caseStudies
    ? activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((study) => getCategoryKey(study.sector) === activeFilter)
    : [];

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">

        {/* ───── HERO SECTION ───── */}
        <section className="relative overflow-hidden bg-primary-container pt-28 pb-20 md:pt-36 md:pb-28 px-margin-mobile md:px-margin-desktop">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-32 end-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 start-0 w-[300px] h-[300px] rounded-full bg-on-primary/5 blur-3xl" aria-hidden="true" />

          <Container clean>
            <div
              className="max-w-3xl mx-auto"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/30 bg-secondary/15 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  case_studies
                </span>
                {t("caseStudies.heroTagline") || "دراسات الحالة"}
              </span>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-on-primary mb-5">
                {t("caseStudies.heroTitle")}
              </h1>

              <p className="font-body-lg text-body-lg text-on-primary/75 max-w-2xl mb-8">
                {t("caseStudies.heroSubtitle")}
              </p>

              {/* Privacy Notice */}
              <div className="rounded-2xl border border-white/12 bg-white/6 backdrop-blur-sm p-5 flex items-start gap-4">
                <span
                  className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary-fixed"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    lock
                  </span>
                </span>
                <p className="font-body-md text-on-primary/80">
                  {t("caseStudies.privacyText") || "تفاصيل معينة قد تكون محمية بسبب الخصوصية والسرية."}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ───── FILTERS SECTION ───── */}
        <section className="sticky top-20 z-40 bg-background/95 backdrop-blur-md border-b border-outline-variant/20 py-6 px-margin-mobile md:px-margin-desktop">
          <Container clean>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3">
                {(["all", "retail", "real-estate", "ai"] as FilterKey[]).map((filter, i) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    style={{
                      transitionDelay: visible ? `${i * 50}ms` : "0ms",
                    }}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-label-md text-label-md font-bold transition-all duration-250 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                      activeFilter === filter
                        ? "bg-secondary text-on-secondary shadow-lg shadow-secondary/25 -translate-y-0.5"
                        : "bg-surface-container text-on-surface hover:bg-surface-container-high hover:-translate-y-0.5"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      {filterConfig[filter].icon}
                    </span>
                    <span>{filterConfig[filter].label}</span>
                  </button>
                ))}
              </div>

              {/* Count */}
              <div className="text-on-surface-variant font-label-md font-medium">
                {locale === "ar"
                  ? `${filteredStudies.length} ${filteredStudies.length === 1 ? "دراسة" : "دراسات"}`
                  : `${filteredStudies.length} case ${filteredStudies.length === 1 ? "study" : "studies"}`}
              </div>
            </div>
          </Container>
        </section>

        {/* ───── CASE STUDIES GRID ───── */}
        <Section bg="none" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop py-20 md:py-28">
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("caseStudies.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && filteredStudies.length === 0 && (
              <StateFeedback type="empty" message={t("caseStudies.emptyMessage")} />
            )}

            {!isLoading && !isError && filteredStudies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudies.map((study, index) => (
                  <article
                    key={study.id}
                    className="group relative overflow-hidden rounded-2xl border border-outline-variant/40 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 flex flex-col h-full"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(20px)",
                      transition: `opacity 0.5s ease ${index * 60}ms, transform 0.5s ease ${index * 60}ms, all 0.3s ease`,
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden bg-surface-container">
                      <img
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        alt={study.title}
                        src={study.image}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />

                      {/* Sector Badge */}
                      <div
                        className="absolute top-4 end-4 rounded-xl bg-secondary/90 backdrop-blur-sm text-on-secondary px-4 py-2 font-label-sm text-label-sm font-bold shadow-lg"
                        style={{
                          transform: "scale(0.95)",
                          transition: "transform 0.3s ease",
                        }}
                      >
                        {study.sector}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 flex flex-col p-7 md:p-8">
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-5 font-bold leading-snug line-clamp-2">
                        {study.title}
                      </h3>

                      {/* Challenge, Solution, Results */}
                      <div className="space-y-4 flex-1 mb-6">
                        <div>
                          <p className="font-label-sm text-label-sm text-secondary font-bold mb-1.5 uppercase tracking-wide">
                            {t("caseStudies.challengeLabel")}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                            {study.challenge}
                          </p>
                        </div>

                        <div>
                          <p className="font-label-sm text-label-sm text-secondary font-bold mb-1.5 uppercase tracking-wide">
                            {t("caseStudies.solutionLabel")}
                          </p>
                          <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                            {study.solution}
                          </p>
                        </div>

                        <div className="rounded-xl bg-secondary/8 border border-secondary/20 p-4">
                          <p className="font-label-sm text-label-sm text-secondary font-bold mb-1.5 uppercase tracking-wide">
                            {t("caseStudies.resultsLabel")}
                          </p>
                          <p className="font-headline-xs text-headline-xs text-secondary font-bold">
                            {study.result}
                          </p>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        to="/case-studies/$slug"
                        params={{ slug: study.slug }}
                        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary text-on-secondary font-bold text-label-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 group-hover:bg-secondary-fixed group-hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      >
                        {t("caseStudies.viewCaseStudyButton")}
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
        </Section>

        {/* ───── CTA SECTION ───── */}
        <section className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-primary-container overflow-hidden">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div className="pointer-events-none absolute -top-40 end-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-40 start-20 w-96 h-96 rounded-full bg-on-primary/5 blur-3xl" aria-hidden="true" />

          <Container clean>
            <div className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto">
              <h2 className="font-display-md text-display-md-mobile md:text-display-md font-bold text-on-primary mb-6">
                {t("caseStudies.ctaTitle")}
              </h2>

              <p className="font-body-lg text-body-lg text-on-primary/75 mb-10">
                {t("caseStudies.ctaSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link
                  to="/consultation"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-on-secondary font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {t("caseStudies.ctaPrimary")}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {locale === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>

                <Link
                  to="/solutions"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary-fixed text-secondary-fixed font-bold rounded-xl transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  {t("caseStudies.ctaSecondary")}
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
