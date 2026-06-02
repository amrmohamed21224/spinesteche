import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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

function Page() {
  const { t, locale } = useTranslation();
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const {
    data: caseStudies,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["case-studies", locale],
    queryFn: () => getCaseStudies(locale),
  });

  const getCategoryKey = (sector: string) => {
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
    return "other";
  };

  const filteredStudies = caseStudies
    ? activeFilter === "all"
      ? caseStudies
      : caseStudies.filter((study) => getCategoryKey(study.sector) === activeFilter)
    : [];

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 text-start">
        {/* Hero Section */}
        <section
          className="px-margin-desktop mb-20 relative overflow-hidden"
          aria-label={t("caseStudies.heroTitle")}
        >
          <div
            className="absolute top-0 right-0 w-full h-full geometric-pattern opacity-40 pointer-events-none"
            aria-hidden="true"
          ></div>
          <Container clean>
            <div className="max-w-3xl mx-auto">
              <h1 className="font-display-lg text-display-lg mb-6 leading-tight text-primary font-bold">
                {t("caseStudies.heroTitle")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8">
                {t("caseStudies.heroSubtitle")}
              </p>
              <div className="bg-primary-container/10 border-r-4 border-secondary p-6 rounded-lg glass-panel">
                <div className="flex items-start gap-4 flex-row-reverse text-right">
                  <span
                    className="material-symbols-outlined text-secondary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    lock
                  </span>
                  <p className="font-body-md text-body-md text-on-primary-container">
                    {t("caseStudies.privacyText")}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* Filters & Stats Section */}
        <section
          className="px-margin-desktop mb-12 max-w-container-max mx-auto"
          aria-label={t("caseStudies.filtersAll")}
        >
          <Container clean>
            <div className="flex flex-wrap items-center justify-between gap-6 pb-8 border-b border-outline-variant/30 flex-row-reverse">
              <div className="flex gap-4 flex-row-reverse">
                <button
                  onClick={() => setActiveFilter("all")}
                  className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                    activeFilter === "all"
                      ? "bg-secondary text-on-secondary"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-outline-variant/20"
                  }`}
                >
                  {t("caseStudies.filtersAll")}
                </button>
                <button
                  onClick={() => setActiveFilter("retail")}
                  className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                    activeFilter === "retail"
                      ? "bg-secondary text-on-secondary"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-outline-variant/20"
                  }`}
                >
                  {t("caseStudies.filtersRetail")}
                </button>
                <button
                  onClick={() => setActiveFilter("real-estate")}
                  className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                    activeFilter === "real-estate"
                      ? "bg-secondary text-on-secondary"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-outline-variant/20"
                  }`}
                >
                  {t("caseStudies.filtersRealEstate")}
                </button>
                <button
                  onClick={() => setActiveFilter("ai")}
                  className={`px-6 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                    activeFilter === "ai"
                      ? "bg-secondary text-on-secondary"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-outline-variant/20"
                  }`}
                >
                  {t("caseStudies.filtersAi")}
                </button>
              </div>
              <div className="text-on-surface-variant font-label-md">
                {locale === "ar"
                  ? `عرض ${filteredStudies.length} دراسات حالة مختارة`
                  : `Showing ${filteredStudies.length} selected case studies`}
              </div>
            </div>
          </Container>
        </section>

        {/* Case Studies Grid */}
        <Section bg="none" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("caseStudies.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && filteredStudies.length === 0 && (
              <StateFeedback type="empty" message={t("caseStudies.emptyMessage")} />
            )}

            {!isLoading && !isError && filteredStudies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter text-right">
                {filteredStudies.map((study) => (
                  <article
                    key={study.id}
                    className="group bg-surface-container-lowest border border-outline-variant/50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="h-48 overflow-hidden relative">
                        <img
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          alt={study.title}
                          src={study.image}
                          loading="lazy"
                        />
                        <div className="absolute top-4 right-4 bg-secondary text-on-secondary px-3 py-1 rounded-lg text-caption font-label-md">
                          {study.sector}
                        </div>
                      </div>
                      <div className="p-8">
                        <h3 className="font-headline-sm text-headline-sm mb-4 text-primary font-bold">
                          {study.title}
                        </h3>
                        <div className="space-y-4 mb-8">
                          <div>
                            <span className="block font-label-md text-label-md text-secondary mb-1">
                              {t("caseStudies.challengeLabel")}
                            </span>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                              {study.challenge}
                            </p>
                          </div>
                          <div>
                            <span className="block font-label-md text-label-md text-secondary mb-1">
                              {t("caseStudies.solutionLabel")}
                            </span>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                              {study.solution}
                            </p>
                          </div>
                          <div className="bg-surface-container p-4 rounded-lg">
                            <span className="block font-label-md text-label-md text-primary font-bold mb-1">
                              {t("caseStudies.resultsLabel")}
                            </span>
                            <p className="font-body-md text-body-md text-secondary font-bold">
                              {study.result}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-8 pt-0">
                      <Link
                        to="/case-studies/$slug"
                        params={{ slug: study.slug }}
                        className="w-full py-3 flex justify-center items-center gap-2 border border-secondary text-secondary font-label-md rounded-lg group-hover:bg-secondary group-hover:text-on-secondary transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      >
                        {t("caseStudies.viewCaseStudyButton")}
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                          arrow_back
                        </span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </Container>
        </Section>

        {/* Call to Action Section */}
        <section className="mt-32 px-margin-desktop">
          <div className="bg-primary-container text-on-primary rounded-xl p-16 relative overflow-hidden flex flex-col items-center text-center max-w-container-max mx-auto">
            <div
              className="absolute inset-0 geometric-pattern opacity-10 pointer-events-none"
              aria-hidden="true"
            ></div>
            <div className="relative z-10 max-w-2xl">
              <h2 className="font-display-lg text-display-lg mb-6 font-bold text-on-primary">
                {t("caseStudies.ctaTitle")}
              </h2>
              <p className="font-body-lg text-body-lg mb-10 text-on-primary-container/80 text-on-primary/80">
                {t("caseStudies.ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="px-10 py-4 bg-secondary text-on-secondary font-headline-sm rounded-lg hover:bg-secondary-fixed-dim transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2"
                >
                  {t("caseStudies.ctaPrimary")}
                </Link>
                <Link
                  to="/services"
                  className="px-10 py-4 border border-outline-variant/30 text-on-primary font-headline-sm rounded-lg hover:bg-surface-variant/10 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                >
                  {t("caseStudies.ctaSecondary")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
