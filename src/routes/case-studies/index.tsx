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
              <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                style={{ gridAutoFlow: "dense" }}
              >
                {filteredStudies.map((study, index) => {
                  const isFeatured = study.featured;
                  return (
                    <Link
                      key={study.id}
                      to="/case-studies/$slug"
                      params={{ slug: study.slug }}
                      className={`group relative block overflow-hidden rounded-2xl border border-outline-variant/30 bg-white transition-all duration-400 hover:shadow-2xl hover:shadow-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 ${
                        isFeatured ? "sm:col-span-2 lg:row-span-2" : ""
                      }`}
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(24px)",
                        transition: `opacity 0.55s ease ${index * 60}ms, transform 0.55s ease ${index * 60}ms, box-shadow 0.3s ease`,
                      }}
                    >
                      {/* Cover image */}
                      <div className={`relative overflow-hidden ${isFeatured ? "h-64 lg:h-[420px]" : "h-64"}`}>
                        <img
                          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          alt={study.title}
                          src={study.image}
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent transition-opacity duration-400" aria-hidden="true" />

                        {/* sector + featured badges */}
                        <div className="absolute top-4 inset-x-4 flex items-center justify-between">
                          <span className="rounded-lg bg-white/95 backdrop-blur-sm text-primary px-3 py-1.5 text-caption font-bold shadow-md">
                            {study.sector}
                          </span>
                          {isFeatured && (
                            <span className="flex items-center gap-1 rounded-lg bg-secondary text-on-secondary px-3 py-1.5 text-caption font-bold shadow-md">
                              <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">star</span>
                              {locale === "ar" ? "مميز" : "Featured"}
                            </span>
                          )}
                        </div>

                        {/* Bottom content over image */}
                        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                          {study.tags && study.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-3 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                              {study.tags.slice(0, 3).map((tag, ti) => (
                                <span
                                  key={ti}
                                  className="rounded-full bg-white/15 backdrop-blur-sm border border-white/25 px-2.5 py-0.5 text-[10px] font-bold text-white"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          <h3 className={`font-bold text-white leading-snug mb-1 ${isFeatured ? "text-[22px] md:text-[26px]" : "text-[17px]"}`}>
                            {study.title}
                          </h3>
                          <p className="text-white/70 text-caption">{study.client}</p>
                        </div>

                        {/* hover arrow */}
                        <div className="absolute top-4 end-4 flex size-9 items-center justify-center rounded-full bg-white/0 group-hover:bg-white/95 backdrop-blur-sm text-transparent group-hover:text-primary transition-all duration-300 scale-75 group-hover:scale-100 mt-12 group-hover:mt-0">
                          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                            {dir === "rtl" ? "north_west" : "north_east"}
                          </span>
                        </div>
                      </div>

                      {/* result strip below image (only on featured for extra detail) */}
                      {isFeatured && study.result && (
                        <div className="px-6 py-4 border-t border-outline-variant/20 bg-secondary/[0.04]">
                          <p className="text-caption font-bold text-secondary uppercase tracking-wider mb-1">
                            {c.resultsLabel}
                          </p>
                          <p className="font-bold text-primary text-[14px] leading-snug line-clamp-2">
                            {study.result}
                          </p>
                        </div>
                      )}
                    </Link>
                  );
                })}
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
