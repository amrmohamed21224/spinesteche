import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Section } from "../components/layout/Section";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getSectors } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

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

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.disconnect(); }
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function Page() {
  const { t, locale } = useTranslation();
  const {
    data: sectors,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["sectors", locale],
    queryFn: () => getSectors(locale),
  });

  const heroReveal = useReveal(0.1);
  const gridReveal = useReveal(0.05);
  const ctaReveal  = useReveal(0.2);

  const getGridClasses = (layout: string | undefined) => {
    switch (layout) {
      case "featured": return "md:col-span-8 h-80";
      case "accent":   return "md:col-span-4 h-80";
      case "tall":     return "md:col-span-6 h-96";
      default:         return "md:col-span-4 h-80";
    }
  };

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 text-start">

        {/* ── Hero ─────────────────────────────────── */}
        <section
          className="relative py-28 px-margin-desktop overflow-hidden bg-primary-container"
          aria-label={t("sectors.introAria")}
        >
          <div
            className="absolute inset-0 islamic-pattern opacity-[0.04]"
            aria-hidden="true"
            style={{ backgroundSize: "260px" }}
          />
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, rgba(3,109,54,0.18) 0%, transparent 65%)",
              transform: "translate(30%, -30%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background: "radial-gradient(circle, rgba(3,109,54,0.10) 0%, transparent 65%)",
              transform: "translate(-30%, 30%)",
            }}
          />

          <Container clean>
            <div
              ref={heroReveal.ref}
              className={`max-w-container-max mx-auto relative z-10 flex flex-col items-center text-center
                transition-all duration-700 ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <span className="inline-flex items-center gap-2 text-secondary font-label-md mb-6 px-5 py-2 rounded-full bg-secondary/10 border border-secondary/25">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                {t("sectors.heroTagline")}
              </span>
              <h1 className="font-display-lg text-display-lg mb-6 text-on-primary font-bold leading-tight">
                {t("sectors.heroTitle")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl leading-relaxed" style={{ opacity: 0.75 }}>
                {t("sectors.heroSubtitle")}
              </p>
            </div>
          </Container>

          {/* wave */}
          <div className="absolute bottom-0 inset-x-0 h-14 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1440 56" preserveAspectRatio="none" className="w-full h-full" fill="var(--color-background)">
              <path d="M0,56 C360,0 1080,56 1440,28 L1440,56 Z" />
            </svg>
          </div>
        </section>

        {/* ── Bento Grid ───────────────────────────── */}
        <Section bg="none" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("sectors.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && (!sectors || sectors.length === 0) && (
              <StateFeedback type="empty" title={t("sectors.emptyTitle")} />
            )}

            {!isLoading && !isError && sectors && sectors.length > 0 && (
              <div ref={gridReveal.ref} className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                {sectors.map((sector, index) => {
                  const gridClass = getGridClasses(sector.layout);
                  const isAccent = sector.layout === "accent";
                  const isTallAccent = sector.layout === "tall" && !sector.image;
                  const delay = (index % 4) * 90;

                  // ── Dark accent card ──
                  if (isAccent || isTallAccent) {
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-2xl border border-secondary/20 bg-primary-container text-on-primary
                          transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 hover:border-secondary/45 hover:-translate-y-1
                          ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        <div className="absolute inset-0 islamic-pattern opacity-[0.05]" aria-hidden="true" style={{ backgroundSize: "180px" }} />
                        <div
                          className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          style={{ background: "radial-gradient(circle, rgba(3,109,54,0.2) 0%, transparent 70%)" }}
                        />
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                          <div>
                            <span
                              className="material-symbols-outlined text-secondary mb-5 block transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(3,109,54,0.6)]"
                              style={{ fontSize: "44px", fontVariationSettings: "'FILL' 1" }}
                              aria-hidden="true"
                            >
                              {sector.icon}
                            </span>
                            <h3 className="font-headline-lg text-headline-lg mb-3 text-on-primary font-bold group-hover:text-secondary transition-colors duration-300">
                              {sector.title}
                            </h3>
                          </div>
                          <p className="font-body-md text-on-primary-container leading-relaxed" style={{ opacity: 0.78 }}>
                            {sector.description}
                          </p>
                          {sector.tags && sector.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                              {sector.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-3 py-1 bg-secondary/15 border border-secondary/25 text-secondary rounded-full text-[12px] font-semibold"
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

                  // ── Image card ──
                  if (sector.image) {
                    const isFeatured = sector.layout === "featured" || sector.layout === "tall";
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-2xl border border-outline-variant/30 bg-surface-container-lowest
                          transition-all duration-500 hover:shadow-2xl hover:border-secondary/30 hover:-translate-y-1
                          ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10" />
                        <img
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          style={{ opacity: 0.18 }}
                          alt={sector.title}
                          src={sector.image}
                          loading="lazy"
                        />
                        {/* gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end">
                          <span
                            className="material-symbols-outlined text-secondary mb-4 block transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(3,109,54,0.6)]"
                            style={{ fontSize: "44px", fontVariationSettings: "'FILL' 1" }}
                            aria-hidden="true"
                          >
                            {sector.icon}
                          </span>
                          <h3
                            className={`${isFeatured ? "font-headline-xl text-headline-xl" : "font-headline-sm text-headline-sm"}
                              text-white mb-2 font-bold group-hover:text-secondary transition-colors duration-300`}
                          >
                            {sector.title}
                          </h3>
                          <p className={`${isFeatured ? "font-body-md" : "font-caption"} text-white/70 max-w-lg`}>
                            {sector.description}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // ── Default light card ──
                  return (
                    <div
                      key={sector.id}
                      className={`${gridClass} group relative overflow-hidden rounded-2xl border border-outline-variant/35 bg-surface-container-lowest
                        transition-all duration-500 hover:shadow-xl hover:shadow-secondary/8 hover:border-secondary/30 hover:-translate-y-1
                        ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <div
                        className="absolute bottom-0 right-0 w-36 h-36 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{ background: "radial-gradient(circle, rgba(3,109,54,0.07) 0%, transparent 70%)" }}
                      />
                      <div className="p-8 h-full flex flex-col relative z-10">
                        <span
                          className="material-symbols-outlined text-secondary mb-5 block transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(3,109,54,0.5)]"
                          style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
                          aria-hidden="true"
                        >
                          {sector.icon}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold group-hover:text-secondary transition-colors duration-300">
                          {sector.title}
                        </h3>
                        <p className="font-caption text-on-surface-variant leading-relaxed">{sector.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>

        {/* ── CTA ──────────────────────────────────── */}
        <section className="py-24 px-margin-desktop bg-primary-container relative overflow-hidden max-w-container-max mx-auto rounded-2xl mb-16">
          <div className="absolute inset-0 islamic-pattern opacity-[0.04] rounded-2xl" aria-hidden="true" style={{ backgroundSize: "220px" }} />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/30 to-transparent" />
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{ background: "radial-gradient(circle, rgba(3,109,54,0.18) 0%, transparent 65%)", transform: "translate(35%, -35%)" }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{ background: "radial-gradient(circle, rgba(3,109,54,0.10) 0%, transparent 65%)", transform: "translate(-40%, 40%)" }}
          />
          <div
            ref={ctaReveal.ref}
            className={`max-w-container-max mx-auto flex flex-col items-center text-center relative z-10
              transition-all duration-700 ${ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <h2 className="font-headline-xl text-headline-xl mb-8 text-on-primary font-bold">
              {t("sectors.ctaTitle")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to="/solutions"
                search={{ source: "sectors-cta" }}
                className="bg-secondary text-on-secondary px-10 py-4 rounded-xl font-label-md hover:bg-secondary/90 hover:scale-[1.02] transition-all cursor-pointer shadow-lg shadow-secondary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              >
                {t("sectors.ctaPrimary")}
              </Link>
              <Link
                to="/consultation"
                search={{ source: "sectors-cta" }}
                className="border border-on-primary/20 text-on-primary px-10 py-4 rounded-xl font-label-md hover:border-secondary/40 hover:text-secondary transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              >
                {t("sectors.ctaSecondary")}
              </Link>
            </div>
          </div>
        </section>

      </main>
    </PageLayout>
  );
}
