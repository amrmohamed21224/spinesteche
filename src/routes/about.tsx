import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getAboutPageData } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";
import type { CMSAboutPageData } from "../types/cms";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "من نحن",
      description:
        "تعرف على شركة SpinesTech، شريكك الاستراتيجي في التحول الرقمي والتطوير التقني السيادي.",
      path: "/about",
    }),
  component: Page,
});

function Page() {
  const { t, locale } = useTranslation();
  const { data, isLoading, isError, refetch } = useQuery<CMSAboutPageData>({
    queryKey: ["about-page", locale],
    queryFn: () => getAboutPageData(locale),
  });

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 text-start">
        {/* Hero Section: Who We Are */}
        <section className="relative min-h-[716px] flex items-center overflow-hidden geometric-pattern border-b border-outline-variant/20">
          <Container clean>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center py-20">
              <div className="md:col-span-6 z-10">
                <span className="inline-block bg-secondary/10 text-secondary font-label-md text-label-md px-3 py-1 rounded-full mb-6">
                  {t("about.badge")}
                </span>
                <h1 className="font-display-lg text-display-lg text-primary mb-8 leading-tight font-bold">
                  {t("about.heroTitle")} <br />
                  <span className="text-secondary">{t("about.heroHighlight")}</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
                  {t("about.heroSubtitle")}
                </p>
                <div className="flex gap-4 justify-start">
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      verified
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">
                      {t("about.trustInstitutional")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      security
                    </span>
                    <span className="font-label-md text-label-md text-on-surface">
                      {t("about.trustCybersecurity")}
                    </span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-6 relative h-[500px]">
                <div className="absolute inset-0 bg-secondary/5 rounded-2xl transform rotate-3 scale-105"></div>
                <img
                  alt={t("about.officesAlt")}
                  className="w-full h-full object-cover rounded-xl shadow-lg relative z-10 grayscale-[20%] hover:grayscale-0 transition-all duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9bE2_3UQ9T-YgReuejnvmJ3g0NZNTP2VOTh1ypFY8ApCoDK0oixY7aMf1804miQCC1XQAVFv19e0d-oqW5BFOmQoKxGPgiv8ouUztdcRUeuJof-JMPBAD12ALZjIiEDHE-1LQR55dilHQlDpNo6EZDqaQtLOAINOa7BKQK8_h-Ba8cKyiRm5uo3cjfBW3Gztkv0w9LVpdHm64PCRHlMUXIOf8aA5r9bywgqfSak-i5_4XWUnUc7UvX2prbSjljLB-1sEx0DJemZrJ"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Dynamic Content Sections */}
        {isLoading && (
          <Section bg="surface" className="py-24">
            <StateFeedback type="loading" />
          </Section>
        )}
        {isError && (
          <Section bg="surface" className="py-24">
            <StateFeedback type="error" message={t("about.loadError")} onRetry={refetch} />
          </Section>
        )}

        {!isLoading && !isError && data ? (
          <>
            {/* Mission & Vision: Bento Grid */}
            <Section bg="surface" className="py-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter">
                {/* Mission */}
                <div className="bg-primary-container p-12 rounded-xl text-on-primary relative overflow-hidden group text-right">
                  <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
                  <span
                    className="material-symbols-outlined text-tertiary-fixed text-5xl mb-6 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    target
                  </span>
                  <h2 className="font-headline-xl text-headline-xl mb-6 text-on-primary font-bold">
                    {t("about.missionTitle")}
                  </h2>
                  <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
                    {data.mission}
                  </p>
                </div>
                {/* Vision */}
                <div className="bg-surface-container-high p-12 rounded-xl border border-outline-variant/30 flex flex-col justify-between group hover:border-secondary transition-colors duration-300">
                  <div>
                    <span
                      className="material-symbols-outlined text-secondary text-5xl mb-6 block"
                      aria-hidden="true"
                    >
                      visibility
                    </span>
                    <h2 className="font-headline-xl text-headline-xl text-primary mb-6 font-bold">
                      {t("about.visionTitle")}
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      {data.vision}
                    </p>
                  </div>
                  <div className="mt-12 flex justify-end">
                    <span className="text-secondary font-bold text-headline-lg opacity-20 group-hover:opacity-100 transition-opacity">
                      {t("about.vision2030Label")}
                    </span>
                  </div>
                </div>
              </div>
            </Section>

            {/* Markets Presence */}
            <Section bg="default" className="py-24 overflow-hidden">
              <div className="flex flex-col md:flex-row gap-gutter items-center">
                <div className="w-full md:w-5/12">
                  <h2 className="font-headline-xl text-headline-xl text-primary mb-6 font-bold">
                    {t("about.marketsTitle")}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-12">
                    {t("about.marketsSubtitle")}
                  </p>
                  <div className="space-y-6">
                    {data.markets.map((market) => (
                      <div
                        key={market.id}
                        className="flex items-center gap-4 p-4 rounded-lg bg-surface hover:shadow-md transition-shadow flex-row-reverse justify-end"
                      >
                        <span className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary/10 text-secondary font-bold">
                          {market.code}
                        </span>
                        <div className="font-headline-sm text-headline-sm">{market.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="w-full md:w-7/12 relative">
                  <div className="aspect-square bg-surface-container-highest rounded-full absolute -top-20 -left-20 w-[120%] -z-10 blur-3xl opacity-30"></div>
                  <img
                    alt="خريطة التواجد الجغرافي لشركة SpinesTech"
                    className="w-full rounded-2xl shadow-2xl object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-1000"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfa-hlUt4JFvMr8tCqIeEHljk6AWaUSmdPa_kGAUSk1sB8R3E1CR2CRRwBqwj_6hx5xfjbtgVT4x714dJYkOsQml0rPZJhGJ1Bwh9D_Y4O7j-qFqOR_Vj84yYHkDHanMmbbMBX9pqcMrrxrhFzKcDkQvw83XV6zX3zACW7PBEUoRWyjm-26LBgyu88JSJ3kXo8shCN8_QuQwUJ0mowY4OImhFfUnHJBM7MzzK6vNvTkeFDi8ZgErX4_RN0J3OZWi236vl97iayRuWK"
                    loading="lazy"
                  />
                </div>
              </div>
            </Section>

            {/* Core Values */}
            <Section bg="surface" className="py-24 border-t border-outline-variant/20">
              <h2 className="font-headline-xl text-headline-xl text-primary mb-16 text-center font-bold">
                {t("about.coreValuesTitle")}
              </h2>
              <Grid cols={4}>
                {data.coreValues.map((value) => (
                  <div
                    key={value.id}
                    className="flex flex-col items-center p-8 bg-background border border-outline-variant/10 rounded hover:border-secondary transition-all group"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary/5 flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors">
                      <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                        {value.icon}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm mb-4 text-primary font-bold">
                      {value.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant">
                      {value.description}
                    </p>
                  </div>
                ))}
              </Grid>
            </Section>

            {/* Key Differentiators */}
            <Section bg="primary-container" className="text-on-primary py-24">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="font-headline-xl text-headline-xl mb-8 font-bold text-on-primary">
                    {t("about.whyTitle")}
                  </h2>
                  <ul className="space-y-8">
                    {data.differentiators.map((diff) => (
                      <li
                        key={diff.id}
                        className="flex gap-6 justify-start flex-row-reverse text-right"
                      >
                        <span className="font-display-lg text-display-lg text-secondary opacity-50 shrink-0">
                          {String(diff.order).padStart(2, "0")}
                        </span>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm mb-2 text-on-primary">
                            {diff.title}
                          </h4>
                          <p className="font-body-md text-body-md text-on-primary-container">
                            {diff.description}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-gutter text-center">
                  {data.stats.map((stat) => (
                    <div
                      key={stat.id}
                      className="bg-surface/10 p-8 rounded border border-surface/20 flex flex-col items-center justify-center"
                    >
                      <div className="text-secondary font-display-lg text-display-lg mb-2">
                        {stat.value}
                      </div>
                      <div className="font-label-md text-label-md text-on-primary-container">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>
          </>
        ) : null}

        {/* CTA Section */}
        <section className="py-24 geometric-pattern">
          <Container>
            <div className="bg-white p-16 rounded-2xl shadow-xl border border-outline-variant/30 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-bl-full"></div>
              <h2 className="font-display-lg text-display-lg text-primary mb-6 font-bold">
                {t("about.ctaTitle")}
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-12 max-w-2xl mx-auto">
                {t("about.ctaSubtitle")}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link
                  to="/contact"
                  className="px-12 py-4 bg-secondary text-on-secondary font-headline-sm text-headline-sm rounded hover:shadow-lg transition-all active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {t("about.ctaPrimary")}
                </Link>
                <Link
                  to="/services"
                  className="px-12 py-4 border-2 border-secondary text-secondary font-headline-sm text-headline-sm rounded hover:bg-secondary/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {t("about.ctaSecondary")}
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </PageLayout>
  );
}
