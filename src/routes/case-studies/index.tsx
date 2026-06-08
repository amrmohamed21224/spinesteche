import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../../components/layout/PageLayout";
import { seo } from "../../lib/seo";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
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

  const filters: { key: FilterKey; label: string; icon: string }[] = [
    { key: "all", label: t("caseStudies.filtersAll"), icon: "grid_view" },
    { key: "retail", label: t("caseStudies.filtersRetail"), icon: "shopping_bag" },
    { key: "real-estate", label: t("caseStudies.filtersRealEstate"), icon: "domain" },
    { key: "ai", label: t("caseStudies.filtersAi"), icon: "psychology" },
  ];

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden bg-primary-container pt-28 pb-20 md:pt-36 md:pb-28 px-margin-mobile md:px-margin-desktop">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-32 end-0 w-[480px] h-[480px] rounded-full bg-secondary/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 start-0 w-[280px] h-[280px] rounded-full bg-on-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <Container clean>
            <div
              className="max-w-3xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/30 bg-secondary/15 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  workspace_premium
                </span>
                {locale === "ar" ? "قصص نجاح حقيقية" : "Real success stories"}
              </span>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-on-primary mb-5">
                {t("caseStudies.heroTitle")}
              </h1>

              <p className="font-body-lg text-body-lg text-on-primary/75 max-w-2xl mb-8">
                {t("caseStudies.heroSubtitle")}
              </p>

              {/* Privacy notice */}
              <div className="inline-flex items-start gap-3 rounded-2xl border border-white/12 bg-white/6 backdrop-blur-sm p-4 max-w-xl">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary-fixed mt-0.5">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    lock
                  </span>
                </span>
                <p className="font-body-sm text-on-primary/80 leading-relaxed">
                  {t("caseStudies.privacyText")}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ───── FILTERS BAR ───── */}
        <div className="bg-background/95 backdrop-blur-md border-b border-outline-variant/20 py-5 px-margin-mobile md:px-margin-desktop">
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
                        : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
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
                  ? `${filteredStudies.length} ${filteredStudies.length === 1 ? "دراسة" : "دراسات"}`
                  : `${filteredStudies.length} ${filteredStudies.length === 1 ? "study" : "studies"}`}
              </span>
            </div>
          </Container>
        </div>

        {/* ───── CARDS GRID ───── */}
        <Section bg="none" noContainer>
          <Container clean className="px-margin-mobile md:px-margin-desktop py-14 md:py-20">
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("caseStudies.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && filteredStudies.length === 0 && (
              <StateFeedback type="empty" message={t("caseStudies.emptyMessage")} />
            )}

            {!isLoading && !isError && filteredStudies.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredStudies.map((study, index) => (
                  <article
                    key={study.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant/40 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(20px)",
                      transition: `opacity 0.5s ease ${index * 55}ms, transform 0.5s ease ${index * 55}ms, box-shadow 0.3s ease`,
                    }}
                  >
                    {/* Image */}
                    <Link
                      to="/case-studies/$slug"
                      params={{ slug: study.slug }}
                      className="relative h-52 overflow-hidden shrink-0 bg-surface-container block"
                    >
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        alt={study.title}
                        src={study.image}
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute top-4 end-4 rounded-lg bg-secondary/90 backdrop-blur-sm text-on-secondary px-3 py-1.5 text-caption font-bold shadow-md">
                        {study.sector}
                      </span>
                    </Link>

                    {/* Body */}
                    <div className="flex flex-col flex-1 p-6 md:p-7">
                      <Link
                        to="/case-studies/$slug"
                        params={{ slug: study.slug }}
                        className="block"
                      >
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold leading-snug mb-5 line-clamp-2 hover:text-secondary transition-colors">
                          {study.title}
                        </h3>
                      </Link>

                      <div className="space-y-4 flex-1 mb-6">
                        <div>
                          <p className="text-caption font-bold text-secondary uppercase tracking-wider mb-1.5">
                            {t("caseStudies.challengeLabel")}
                          </p>
                          <p className="font-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                            {study.challenge}
                          </p>
                        </div>

                        <div>
                          <p className="text-caption font-bold text-secondary uppercase tracking-wider mb-1.5">
                            {t("caseStudies.solutionLabel")}
                          </p>
                          <p className="font-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                            {study.solution}
                          </p>
                        </div>

                        <div className="rounded-xl bg-secondary/8 border border-secondary/20 px-4 py-3">
                          <p className="text-caption font-bold text-secondary uppercase tracking-wider mb-1">
                            {t("caseStudies.resultsLabel")}
                          </p>
                          <p className="font-bold text-secondary leading-snug">{study.result}</p>
                        </div>
                      </div>

                      <Link
                        to="/case-studies/$slug"
                        params={{ slug: study.slug }}
                        className="flex items-center justify-center gap-2 w-full rounded-xl bg-secondary py-3 font-bold text-on-secondary text-label-md transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
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
              <h2 className="font-display-md text-display-md-mobile md:text-display-md font-bold text-on-primary mb-6">
                {t("caseStudies.ctaTitle")}
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/75 mb-10">
                {t("caseStudies.ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
