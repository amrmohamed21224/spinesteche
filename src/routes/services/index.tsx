import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../../components/layout/PageLayout";
import { seo } from "../../lib/seo";
import { Section } from "../../components/layout/Section";
import { Container } from "../../components/layout/Container";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getServices } from "../../lib/api/fetchers";
import { useTranslation } from "../../i18n";

export const Route = createFileRoute("/services/")({
  head: () =>
    seo({
      title: "خدماتنا الأساسية",
      description:
        "تصفح خدمات شركة SpinesTech: تطوير برمجيات مخصصة، أنظمة ERP، أتمتة بالذكاء الاصطناعي، واستشارات تقنية.",
      path: "/services",
    }),
  component: Page,
});

function Page() {
  const { t, locale } = useTranslation();
  const {
    data: services,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services", locale],
    queryFn: () => getServices(locale),
  });

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-20 text-start">
        {/* ── Hero Section ── */}
        <section
          className="px-margin-mobile md:px-margin-desktop mb-16 md:mb-24 relative"
          aria-label={t("services.introAria")}
        >
          <Container clean>
            <div className="max-w-4xl mx-auto">
              <span className="text-secondary font-label-md text-label-md tracking-wider mb-4 block">
                {t("services.badge")}
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-display-lg mb-4 md:mb-6 leading-tight text-primary font-bold">
                {t("services.heroTitle")} <br />
                <span className="text-secondary">{t("services.heroHighlight")}</span>{" "}
                {t("services.heroGrowth")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {t("services.heroSubtitle")}
              </p>
            </div>
          </Container>
        </section>

        {/* ── Services Grid ── */}
        <Section bg="none" noContainer className="pb-10">
          <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("services.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && (!services || services.length === 0) && (
              <StateFeedback type="empty" title={t("services.empty")} />
            )}

            {!isLoading && !isError && services && services.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-gutter">
                {services.map((service, index) => {
                  const isFeatured = index === 0;

                  if (isFeatured) {
                    return (
                      <div
                        key={service.id}
                        className="md:col-span-8 bg-primary-container rounded-2xl p-0 flex flex-col md:flex-row items-stretch overflow-hidden relative group border border-outline-variant/20 shadow-lg hover:shadow-xl hover:shadow-secondary/5 transition-all duration-500"
                      >
                        <div className="flex-1 z-10 p-6 sm:p-8 md:p-12 flex flex-col justify-center">
                          <span className="bg-secondary/15 text-secondary-fixed border border-secondary/20 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full text-caption mb-4 md:mb-6 w-fit font-bold tracking-wide">
                            {t("common.mostPopular")}
                          </span>
                          <h3 className="text-2xl sm:text-3xl md:text-display-sm text-on-primary mb-3 md:mb-4 font-bold">
                            {service.title}
                          </h3>
                          <p className="text-on-primary-container font-body-lg text-body-lg mb-6 md:mb-10 leading-relaxed max-w-lg">
                            {service.description}
                          </p>
                          <Link
                            to="/services/$slug"
                            params={{ slug: service.slug }}
                            className="bg-secondary text-on-secondary px-6 py-3 md:px-8 md:py-4 rounded-xl inline-flex items-center gap-3 group-hover:gap-5 w-fit font-bold hover:bg-secondary/90 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                          >
                            <span>{t("common.learnMore")}</span>
                            <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                              arrow_back
                            </span>
                          </Link>
                        </div>
                        <div className="w-full h-48 sm:h-64 md:h-auto md:flex-1 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary-container to-transparent z-10 w-24 hidden md:block"></div>
                          <div className="absolute inset-0 bg-gradient-to-b from-primary-container to-transparent z-10 h-16 md:hidden"></div>
                          <img
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            alt={service.title}
                            src="/images/services/custom-software.png"
                            loading="lazy"
                          />
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      key={service.id}
                      className="md:col-span-4 bg-surface-container-lowest rounded-2xl p-6 sm:p-8 border border-outline-variant/40 flex flex-col hover:border-secondary/30 hover:shadow-xl hover:shadow-secondary/5 hover:-translate-y-1 transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 cursor-pointer"
                    >
                      <div className="w-12 h-12 sm:w-14 sm:h-14 bg-secondary/10 rounded-2xl flex items-center justify-center mb-5 md:mb-8 group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300">
                        <span
                          className="material-symbols-outlined text-[24px] sm:text-[28px] text-secondary group-hover:text-on-secondary transition-colors"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          aria-hidden="true"
                        >
                          {service.icon}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm mb-3 md:mb-4 text-primary font-bold group-hover:text-secondary transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-on-surface-variant font-body-md text-body-md mb-6 md:mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="mt-auto text-secondary font-label-md text-label-md font-bold flex items-center gap-2">
                        <span>{t("common.learnMore")}</span>
                        <span
                          className="material-symbols-outlined text-[18px] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                          aria-hidden="true"
                        >
                          arrow_back
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>

        {/* ── CTA Section ── */}
        <section className="mt-16 md:mt-24 px-margin-mobile md:px-margin-desktop">
          <div className="bg-secondary rounded-xl p-6 sm:p-8 md:p-12 text-center relative overflow-hidden max-w-container-max mx-auto">
            <div className="relative z-10">
              <h2 className="text-xl sm:text-2xl md:font-headline-xl md:text-headline-xl text-on-secondary mb-4 md:mb-6 font-bold">
                {t("services.ctaTitle")}
              </h2>
              <p className="text-on-secondary/80 font-body-lg text-body-lg mb-6 md:mb-10 max-w-2xl mx-auto">
                {t("services.ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 md:gap-4">
                <Link
                  to="/solutions"
                  search={{ source: "services-cta" }}
                  className="bg-primary text-on-primary px-6 py-3 md:px-10 md:py-4 rounded-lg font-bold text-base hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
                >
                  {t("services.ctaPrimary")}
                </Link>
                <Link
                  to="/consultation"
                  search={{ source: "services-cta" }}
                  className="bg-transparent border border-on-secondary text-on-secondary px-6 py-3 md:px-10 md:py-4 rounded-lg font-bold text-base hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {t("services.ctaSecondary")}
                </Link>
              </div>
            </div>
            <div
              className="absolute top-0 right-0 w-40 sm:w-64 h-40 sm:h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-0 left-0 w-20 sm:w-32 h-20 sm:h-32 bg-white/5 rotate-45 -translate-x-1/2 translate-y-1/2"
              aria-hidden="true"
            ></div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
