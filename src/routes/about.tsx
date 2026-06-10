import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/layout/Container";
import { seo } from "../lib/seo";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getAboutPageData } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";
import { StatsCounter } from "../components/ui/StatsCounter";
import type { CMSAboutPageData } from "../types/cms";

const copy = {
  ar: {
    badge: "من نحن",
    heroTitle: "نصمم مستقبل الأعمال الرقمية",
    heroHighlight: "بأيدٍ سعودية عالمية",
    heroSubtitle:
      "SpinesTech شريكك الاستراتيجي في التحول الرقمي. نبني حلولاً تقنية متطورة تجمع بين الخبرة المحلية العميقة والمعايير الهندسية العالمية.",
    trustInstitutional: "ثقة مؤسسية",
    trustCybersecurity: "أمن سيبراني",
    trustLocal: "سيادة تقنية",
    trustExcellence: "تميز هندسي",
    missionTitle: "رسالتنا",
    visionTitle: "رؤيتنا 2030",
    marketsTitle: "تواجدنا الجغرافي",
    marketsSubtitle:
      "نخدم عملاءنا من مراكزنا المتعددة، مع فهم عميق لكل سوق وثقافته التجارية.",
    coreValuesTitle: "قيمنا الأساسية",
    whyTitle: "لماذا SpinesTech؟",
    loadError: "فشل تحميل بيانات الصفحة. يرجى المحاولة مرة أخرى.",
    ctaTitle: "نبدأ المشروع القادم معاً؟",
    ctaSubtitle:
      "فريقنا جاهز لتحليل تحدياتك وتقديم خارطة طريق تقنية واضحة تناسب طموحاتك.",
    ctaPrimary: "احجز استشارة مجانية",
    ctaSecondary: "تصفح الحلول",
  },
  en: {
    badge: "About Us",
    heroTitle: "Designing the Future of Digital Business",
    heroHighlight: "with Saudi-Global Hands",
    heroSubtitle:
      "SpinesTech is your strategic partner in digital transformation. We build advanced tech solutions that combine deep local expertise with world-class engineering standards.",
    trustInstitutional: "Institutional Trust",
    trustCybersecurity: "Cybersecurity",
    trustLocal: "Tech Sovereignty",
    trustExcellence: "Engineering Excellence",
    missionTitle: "Our Mission",
    visionTitle: "Vision 2030",
    marketsTitle: "Our Presence",
    marketsSubtitle:
      "We serve our clients from multiple centers, with deep understanding of each market and its business culture.",
    coreValuesTitle: "Our Core Values",
    whyTitle: "Why SpinesTech?",
    loadError: "Failed to load page data. Please try again.",
    ctaTitle: "Shall we start your next project together?",
    ctaSubtitle:
      "Our team is ready to analyze your challenges and provide a clear technical roadmap that matches your ambitions.",
    ctaPrimary: "Book a Free Consultation",
    ctaSecondary: "Explore Solutions",
  },
};

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
  const { locale, dir } = useTranslation();
  const c = copy[locale];
  const { data, isLoading, isError, refetch } = useQuery<CMSAboutPageData>({
    queryKey: ["about-page", locale],
    queryFn: () => getAboutPageData(locale),
  });

  // entrance animation
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">
        {/* ═══════════════════════════════════════════
            1. HERO SECTION
            ═══════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-background pt-28 pb-20 md:pt-36 md:pb-28 px-margin-mobile md:px-margin-desktop">
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
              className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: "opacity 0.65s ease, transform 0.65s ease",
              }}
            >
              {/* Left: copy */}
              <div className="text-start order-2 lg:order-1">
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-6">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    diversity_3
                  </span>
                  {c.badge}
                </span>

                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-[1.1] text-primary mb-6">
                  {c.heroTitle}
                  <br />
                  <span className="text-secondary">{c.heroHighlight}</span>
                </h1>

                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl mb-10 leading-relaxed">
                  {c.heroSubtitle}
                </p>

                {/* 4 trust badges */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-outline-variant/30"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(12px)",
                    transition: "opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s",
                  }}
                >
                  {[
                    { icon: "verified", label: c.trustInstitutional },
                    { icon: "security", label: c.trustCybersecurity },
                    { icon: "flag", label: c.trustLocal },
                    { icon: "workspace_premium", label: c.trustExcellence },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-secondary text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </span>
                      <span className="font-label-md text-label-md text-on-surface">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: image */}
              <div
                className="relative order-1 lg:order-2"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(22px)",
                  transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-primary-container/10 to-transparent rounded-3xl rotate-2 scale-105" />
                <div
                  className="pointer-events-none absolute -top-10 -end-10 w-48 h-48 rounded-full bg-secondary/15 blur-3xl"
                  aria-hidden="true"
                />
                <img
                  alt="SpinesTech offices"
                  className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[16/10]"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD9bE2_3UQ9T-YgReuejnvmJ3g0NZNTP2VOTh1ypFY8ApCoDK0oixY7aMf1804miQCC1XQAVFv19e0d-oqW5BFOmQoKxGPgiv8ouUztdcRUeuJof-JMPBAD12ALZjIiEDHE-1LQR55dilHQlDpNo6EZDqaQtLOAINOa7BKQK8_h-Ba8cKyiRm5uo3cjfBW3Gztkv0w9LVpdHm64PCRHlMUXIOf8aA5r9bywgqfSak-i5_4XWUnUc7UvX2prbSjljLB-1sEx0DJemZrJ"
                  loading="lazy"
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Dynamic Content */}
        {isLoading && (
          <div className="py-24 px-margin-mobile md:px-margin-desktop">
            <StateFeedback type="loading" />
          </div>
        )}
        {isError && (
          <div className="py-24 px-margin-mobile md:px-margin-desktop">
            <StateFeedback type="error" message={c.loadError} onRetry={refetch} />
          </div>
        )}

        {!isLoading && !isError && data && (
          <>
            {/* ═══════════════════════════════════════════
                2. MISSION & VISION (Bento Grid)
                ═══════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-surface-container-low overflow-hidden">
              <div className="islamic-pattern absolute inset-0 opacity-[0.015]" aria-hidden="true" />
              <Container clean className="relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                  {/* Mission — Dark card */}
                  <div
                    className="relative overflow-hidden rounded-2xl bg-primary-container p-8 md:p-12 text-on-primary"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(18px)",
                      transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
                    }}
                  >
                    <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
                    <div className="relative z-10">
                      <span
                        className="material-symbols-outlined text-secondary-fixed text-4xl mb-6 block"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        target
                      </span>
                      <h2 className="font-headline-xl text-headline-xl font-bold mb-5 text-on-primary">
                        {c.missionTitle}
                      </h2>
                      <p className="font-body-lg text-body-lg text-on-primary/80 leading-relaxed">
                        {data.mission}
                      </p>
                    </div>
                  </div>

                  {/* Vision — Light card */}
                  <div
                    className="relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-white p-8 md:p-12 flex flex-col justify-between"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(18px)",
                      transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
                    }}
                  >
                    <div>
                      <span
                        className="material-symbols-outlined text-secondary text-4xl mb-6 block"
                        aria-hidden="true"
                      >
                        visibility
                      </span>
                      <h2 className="font-headline-xl text-headline-xl font-bold text-primary mb-5">
                        {c.visionTitle}
                      </h2>
                      <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                        {data.vision}
                      </p>
                    </div>
                    <div className="mt-8 pt-6 border-t border-outline-variant/20 flex items-center gap-3">
                      <span
                        className="material-symbols-outlined text-secondary text-xl"
                        aria-hidden="true"
                      >
                        calendar_today
                      </span>
                      <span className="font-label-md text-label-md text-secondary font-bold">
                        2030
                      </span>
                      <span className="text-on-surface-variant text-caption">
                        {locale === "ar" ? "الهدف الاستراتيجي" : "Strategic Goal"}
                      </span>
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* ═══════════════════════════════════════════
                3. MARKETS PRESENCE
                ═══════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-background overflow-hidden">
              <div
                className="pointer-events-none absolute -top-32 end-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-3xl"
                aria-hidden="true"
              />
              <Container clean className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                  {/* Left: copy */}
                  <div
                    className="lg:col-span-5 text-start"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(16px)",
                      transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
                    }}
                  >
                    <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-6">
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                        public
                      </span>
                      {c.marketsTitle}
                    </span>
                    <h2 className="font-headline-xl text-headline-xl font-bold text-primary mb-5">
                      {c.marketsTitle}
                    </h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                      {c.marketsSubtitle}
                    </p>
                  </div>

                  {/* Right: markets grid */}
                  <div className="lg:col-span-7">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {data.markets.map((market, i) => (
                        <div
                          key={market.id}
                          className="flex items-center gap-4 p-5 rounded-xl border border-outline-variant/30 bg-surface-container-lowest hover:border-secondary/30 hover:shadow-md transition-all"
                          style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "none" : "translateX(14px)",
                            transition: `opacity 0.5s ease ${0.2 + i * 0.08}s, transform 0.5s ease ${0.2 + i * 0.08}s`,
                          }}
                        >
                          <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary font-bold text-sm">
                            {market.code}
                          </span>
                          <span className="font-label-md text-label-md text-primary font-bold">
                            {market.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Container>
            </section>

            {/* ═══════════════════════════════════════════
                4. CORE VALUES
                ═══════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-surface-container overflow-hidden">
              <div className="islamic-pattern absolute inset-0 opacity-[0.02]" aria-hidden="true" />
              <Container clean className="relative z-10">
                <div
                  className="text-center mb-14"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(16px)",
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                  }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
                    <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                      star
                    </span>
                    {c.coreValuesTitle}
                  </span>
                  <h2 className="font-headline-xl text-headline-xl font-bold text-primary">
                    {c.coreValuesTitle}
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {data.coreValues.map((value, i) => (
                    <div
                      key={value.id}
                      className="group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-white p-8 text-center hover:border-secondary/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/5 transition-all duration-300"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(18px)",
                        transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s, box-shadow 0.3s ease`,
                      }}
                    >
                      {/* Top accent line */}
                      <div
                        className="absolute top-0 start-0 end-0 h-1 bg-gradient-to-r from-secondary/60 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-hidden="true"
                      />
                      <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-on-secondary transition-colors duration-300 text-secondary">
                        <span
                          className="material-symbols-outlined text-3xl"
                          aria-hidden="true"
                        >
                          {value.icon}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-3">
                        {value.title}
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>

            {/* ═══════════════════════════════════════════
                5. WHY US — Differentiators + Stats
                ═══════════════════════════════════════════ */}
            <section className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-primary-container overflow-hidden">
              <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
              <div
                className="pointer-events-none absolute -top-40 end-20 w-[420px] h-[420px] rounded-full bg-secondary/12 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-40 start-20 w-[360px] h-[360px] rounded-full bg-on-primary/5 blur-3xl"
                aria-hidden="true"
              />

              <Container clean className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                  {/* Left: differentiators */}
                  <div>
                    <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/25 bg-secondary/10 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
                      <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                        emoji_events
                      </span>
                      {locale === "ar" ? "مميزاتنا" : "Our Edge"}
                    </span>
                    <h2
                      className="font-headline-xl text-headline-xl font-bold text-on-primary mb-10"
                      style={{
                        opacity: visible ? 1 : 0,
                        transform: visible ? "none" : "translateY(16px)",
                        transition: "opacity 0.6s ease, transform 0.6s ease",
                      }}
                    >
                      {c.whyTitle}
                    </h2>

                    <ul className="space-y-8">
                      {data.differentiators.map((diff, i) => (
                        <li
                          key={diff.id}
                          className="flex gap-5 items-start"
                          style={{
                            opacity: visible ? 1 : 0,
                            transform: visible ? "none" : "translateX(14px)",
                            transition: `opacity 0.5s ease ${0.15 + i * 0.1}s, transform 0.5s ease ${0.15 + i * 0.1}s`,
                          }}
                        >
                          <span className="font-display-lg text-display-lg text-secondary font-bold shrink-0 leading-none mt-0.5">
                            {String(diff.order).padStart(2, "0")}
                          </span>
                          <div>
                            <h4 className="font-headline-sm text-headline-sm text-on-primary font-bold mb-2">
                              {diff.title}
                            </h4>
                            <p className="font-body-md text-body-md text-on-primary/70 leading-relaxed">
                              {diff.description}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: stats */}
                  <div
                    className="lg:sticky lg:top-28"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(20px)",
                      transition: "opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s",
                    }}
                  >
                    <StatsCounter stats={data.stats} />
                  </div>
                </div>
              </Container>
            </section>
          </>
        )}

        {/* ═══════════════════════════════════════════
            6. CTA SECTION
            ═══════════════════════════════════════════ */}
        <section className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-primary-container overflow-hidden">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-32 end-0 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-20 start-1/4 w-[300px] h-[300px] rounded-full bg-on-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <Container clean>
            <div
              className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(18px)",
                transition: "opacity 0.65s ease 0.3s, transform 0.65s ease 0.3s",
              }}
            >
              <h2 className="font-display-md text-display-md-mobile md:text-display-md font-bold text-on-primary mb-6">
                {c.ctaTitle}
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/75 mb-10 leading-relaxed">
                {c.ctaSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
                <Link
                  to="/consultation"
                  search={{ source: "about-cta" }}
                  className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {c.ctaPrimary}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {locale === "ar" ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>
                <Link
                  to="/solutions"
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-secondary-fixed/60 px-8 py-4 font-bold text-secondary-fixed transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
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
