import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getSectors } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/sectors")({
  head: () =>
    seo({
      title: "القطاعات التي نخدمها",
      description:
        "تصفح القطاعات التي تخدمها SpinesTech: التجزئة، العقارات، الرعاية الصحية، التعليم، الخدمات اللوجستية، والمزيد.",
      path: "/sectors",
    }),
  component: Page,
});

function Page() {
  const { t, locale, dir } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const {
    data: sectors,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["sectors", locale],
    queryFn: () => getSectors(locale),
  });

  // Determine grid classes based on layout hint
  const getGridClasses = (layout: string | undefined) => {
    switch (layout) {
      case "featured":
        return "md:col-span-8 h-80";
      case "accent":
        return "md:col-span-4 h-80";
      case "tall":
        return "md:col-span-6 h-96";
      default:
        return "md:col-span-4 h-80";
    }
  };

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">
        {/* ───── HERO SECTION ───── */}
        <section className="relative overflow-hidden bg-primary-container pt-28 pb-20 md:pt-36 md:pb-28 px-margin-mobile md:px-margin-desktop">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-32 end-0 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 start-0 w-[300px] h-[300px] rounded-full bg-on-primary/5 blur-3xl"
            aria-hidden="true"
          />

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
                  domain
                </span>
                {t("sectors.heroTagline")}
              </span>

              <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-on-primary mb-5">
                {t("sectors.heroTitle")}
              </h1>

              <p className="font-body-lg text-body-lg text-on-primary/75 max-w-2xl mb-8">
                {t("sectors.heroSubtitle")}
              </p>

              <div className="flex items-center gap-3 rounded-xl border border-white/12 bg-white/6 px-4 py-3 backdrop-blur-sm w-fit">
                <span
                  className="material-symbols-outlined text-secondary-fixed text-xl"
                  aria-hidden="true"
                >
                  auto_awesome
                </span>
                <p className="text-on-primary/80 font-body-sm">
                  {locale === "ar" ? "نخدم أكثر من 50 قطاع" : "Serving 50+ sectors globally"}
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* ───── SECTORS BENTO GRID ───── */}
        <section className="py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-background">
          <Container clean>
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("sectors.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && (!sectors || sectors.length === 0) && (
              <StateFeedback type="empty" title={t("sectors.emptyTitle")} />
            )}

            {!isLoading && !isError && sectors && sectors.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                {sectors.map((sector, index) => {
                  const gridClass = getGridClasses(sector.layout);
                  const isAccent = sector.layout === "accent";
                  const isTallAccent = sector.layout === "tall" && !sector.image;

                  // ───── ACCENT LAYOUT (Dark bg) ─────
                  if (isAccent || isTallAccent) {
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-2xl border border-white/10 bg-primary-container text-on-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50`}
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "none" : "translateY(16px)",
                          transition: `opacity 0.5s ease ${index * 50}ms, transform 0.5s ease ${index * 50}ms`,
                        }}
                      >
                        <div className="absolute inset-0 opacity-5 pattern-bg" aria-hidden="true" />

                        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-between">
                          <div>
                            <span
                              className="material-symbols-outlined text-secondary-fixed mb-4 block"
                              style={{ fontSize: "40px" }}
                              aria-hidden="true"
                            >
                              {sector.icon}
                            </span>
                            <h3 className="font-headline-lg text-headline-lg mb-3 text-on-primary font-bold leading-tight">
                              {sector.title}
                            </h3>
                          </div>

                          <p className="font-body-md text-on-primary/80 leading-relaxed">
                            {sector.description}
                          </p>

                          {sector.tags && sector.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                              {sector.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-3 py-1 bg-secondary/15 text-secondary-fixed rounded-full text-caption font-medium"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }

                  // ───── FEATURED / TALL WITH IMAGE ─────
                  if (sector.image) {
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50`}
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "none" : "translateY(16px)",
                          transition: `opacity 0.5s ease ${index * 50}ms, transform 0.5s ease ${index * 50}ms`,
                        }}
                      >
                        <img
                          className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 transition-transform duration-500"
                          alt={sector.title}
                          src={sector.image}
                          loading="lazy"
                        />

                        <div
                          className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                          aria-hidden="true"
                        />

                        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end">
                          <span
                            className="material-symbols-outlined text-secondary mb-4 block"
                            style={{ fontSize: "40px" }}
                            aria-hidden="true"
                          >
                            {sector.icon}
                          </span>

                          <h3
                            className={`${
                              sector.layout === "featured" || sector.layout === "tall"
                                ? "font-headline-xl text-headline-xl"
                                : "font-headline-sm text-headline-sm"
                            } text-white mb-3 font-bold`}
                          >
                            {sector.title}
                          </h3>

                          <p
                            className={`${
                              sector.layout === "featured" || sector.layout === "tall"
                                ? "font-body-md"
                                : "font-caption"
                            } text-white/90 max-w-lg leading-relaxed`}
                          >
                            {sector.description}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // ───── DEFAULT CARD (No image, light bg) ─────
                  return (
                    <div
                      key={sector.id}
                      className={`${gridClass} group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-secondary/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50`}
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(16px)",
                        transition: `opacity 0.5s ease ${index * 50}ms, transform 0.5s ease ${index * 50}ms`,
                      }}
                    >
                      <div className="p-8 md:p-10 h-full flex flex-col">
                        <span
                          className="material-symbols-outlined text-secondary mb-4 text-[40px]"
                          aria-hidden="true"
                        >
                          {sector.icon}
                        </span>

                        <h3 className="font-headline-sm text-headline-sm text-primary mb-3 font-bold">
                          {sector.title}
                        </h3>

                        <p className="font-body-md text-on-surface-variant leading-relaxed flex-1">
                          {sector.description}
                        </p>

                        <div className="mt-4 flex items-center gap-2 text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-label-md font-bold">
                            {locale === "ar" ? "اكتشف المزيد" : "Learn more"}
                          </span>
                          <span
                            className="material-symbols-outlined text-[18px]"
                            aria-hidden="true"
                          >
                            {locale === "ar" ? "arrow_back" : "arrow_forward"}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

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
                {t("sectors.ctaTitle")}
              </h2>

              <p className="font-body-lg text-body-lg text-on-primary/75 mb-10">
                {locale === "ar"
                  ? "اختر الحل المناسب أو احجز استشارة لتحديد الخطوات القادمة."
                  : "Choose the right solution or book a consultation to plan your next steps."}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link
                  to="/solutions"
                  className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {t("sectors.ctaPrimary")}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {locale === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>

                <Link
                  to="/consultation"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-secondary-fixed px-8 py-4 font-bold text-secondary-fixed transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  {t("sectors.ctaSecondary")}
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
