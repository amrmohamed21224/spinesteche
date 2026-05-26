import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getServices } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/services")({
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
      <main className="pt-32 pb-20 text-start">
        <section className="px-margin-desktop mb-24 relative" aria-label={t("services.introAria")}>
          <Container clean>
            <div className="max-w-4xl mx-auto">
              <span className="text-secondary font-label-md text-label-md tracking-wider mb-4 block">
                {t("services.badge")}
              </span>
              <h1 className="font-display-lg text-display-lg mb-6 leading-tight text-primary font-bold">
                {t("services.heroTitle")} <br />
                <span className="text-secondary">{t("services.heroHighlight")}</span>{" "}
                {t("services.heroGrowth")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl leading-relaxed">
                {t("services.heroSubtitle")}
              </p>
            </div>
            {/* Atmospheric Pattern */}
            <div
              className="absolute -top-10 -left-10 w-64 h-64 pattern-overlay opacity-30 pointer-events-none"
              aria-hidden="true"
            ></div>
          </Container>
        </section>

        {/* Services Bento Grid */}
        <Section bg="none" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("services.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && (!services || services.length === 0) && (
              <StateFeedback type="empty" title={t("services.empty")} />
            )}

            {!isLoading && !isError && services && services.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                {services.map((service, index) => {
                  const isFeatured = index === 0;

                  if (isFeatured) {
                    return (
                      <div
                        key={service.id}
                        className="md:col-span-8 bg-primary-container rounded-xl p-10 flex flex-col md:flex-row gap-8 items-center overflow-hidden relative group"
                      >
                        <div className="flex-1 z-10">
                          <span className="bg-secondary/20 text-secondary-fixed px-3 py-1 rounded-full text-caption mb-4 inline-block">
                            {t("common.mostPopular")}
                          </span>
                          <h3 className="font-headline-xl text-headline-xl text-on-primary mb-4 font-bold">
                            {service.title}
                          </h3>
                          <p className="text-on-primary-container font-body-md text-body-md mb-8 leading-relaxed">
                            {service.description}
                          </p>
                          <button className="bg-secondary text-on-secondary px-8 py-3 rounded-lg flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2">
                            <span>{t("common.learnMore")}</span>
                            <span
                              className="material-symbols-outlined text-[18px]"
                              aria-hidden="true"
                            >
                              arrow_back
                            </span>
                          </button>
                        </div>
                        <div className="flex-1 w-full h-64 md:h-full relative z-10">
                          <img
                            className="w-full h-full object-cover rounded-lg shadow-xl grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500"
                            alt={service.title}
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuE-NWP_sTg4R_qbuMhs4FHIaZ1AOOxTDjsHOXijJTvWROn20OBNJ-0Z6BEK9hrRpKwoMSdJny5PxjEHDjWhi3ZFW5T48LYgDeBlcTb2WSgjfV4DWQWduV75ctRALvhJRvV2rWc6s8HDy4XAX1jKUfyTf32nFjRToVabJOEy-UfAHAWZP7VLwUCXV6qhwWKTRmv5QSLVUDeZGjf1sfN8eTpdBdQZF7HZnuNN_ZMk8skYtvUGYN1NCImT4SziBA62c1ndqFlXUbRsCwNe"
                            loading="lazy"
                          />
                        </div>
                        <div
                          className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-secondary/5 blur-[120px] rounded-full pointer-events-none"
                          aria-hidden="true"
                        ></div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={service.id}
                      className="md:col-span-4 bg-surface-container rounded-xl p-8 border border-outline-variant/30 flex flex-col hover:shadow-lg transition-shadow"
                    >
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-6">
                        <span
                          className="material-symbols-outlined text-secondary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          aria-hidden="true"
                        >
                          {service.icon}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm mb-3 text-primary font-bold">
                        {service.title}
                      </h3>
                      <p className="text-on-surface-variant font-body-md text-body-md mb-auto leading-relaxed">
                        {service.description}
                      </p>
                      <a
                        className="mt-8 text-secondary font-label-md text-label-md flex items-center gap-2 group justify-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
                        href="#"
                      >
                        <span>{t("common.learnMore")}</span>
                        <span
                          className="material-symbols-outlined text-[16px] group-hover:translate-x-[-4px] transition-transform"
                          aria-hidden="true"
                        >
                          arrow_back
                        </span>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>

        {/* CTA Section */}
        <section className="mt-24 px-margin-desktop">
          <div className="bg-secondary rounded-xl p-12 text-center relative overflow-hidden max-w-container-max mx-auto">
            <div className="relative z-10">
              <h2 className="font-headline-xl text-headline-xl text-on-secondary mb-6 font-bold">
                {t("services.ctaTitle")}
              </h2>
              <p className="text-on-secondary/80 font-body-lg text-body-lg mb-10 max-w-2xl mx-auto">
                {t("services.ctaSubtitle")}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="bg-primary text-on-primary px-10 py-4 rounded-lg font-headline-sm text-headline-sm hover:opacity-90 transition-opacity cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2">
                  {t("services.ctaPrimary")}
                </button>
                <button className="bg-transparent border border-on-secondary text-on-secondary px-10 py-4 rounded-lg font-headline-sm text-headline-sm hover:bg-white/10 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50">
                  {t("services.ctaSecondary")}
                </button>
              </div>
            </div>
            {/* Abstract BG Elements */}
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            ></div>
            <div
              className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rotate-45 -translate-x-1/2 translate-y-1/2"
              aria-hidden="true"
            ></div>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
