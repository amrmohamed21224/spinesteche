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
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
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

  const heroReveal  = useReveal(0.1);
  const gridReveal  = useReveal(0.05);
  const ctaReveal   = useReveal(0.2);

  // Determine grid classes based on layout hint
  const getGridClasses = (layout: string | undefined, index: number) => {
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

        {/* Hero Section */}
        <section
          className="relative py-24 px-margin-desktop overflow-hidden bg-surface"
          aria-label={t("sectors.introAria")}
        >
          <div className="absolute inset-0 pattern-bg" aria-hidden="true"></div>
          <Container clean>
            <div
              ref={heroReveal.ref}
              className={`max-w-container-max mx-auto relative z-10 flex flex-col items-center text-center transition-all duration-700
                ${heroReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            >
              <span className="inline-flex items-center gap-2 text-secondary font-label-md mb-4 px-4 py-1.5 rounded-full bg-secondary/8 border border-secondary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                {t("sectors.heroTagline")}
              </span>
              <h1 className="font-display-lg text-display-lg mb-6 text-primary font-bold">
                {t("sectors.heroTitle")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                {t("sectors.heroSubtitle")}
              </p>
            </div>
          </Container>
        </section>

        {/* Industries Bento Grid */}
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
                  const gridClass = getGridClasses(sector.layout, index);
                  const isAccent = sector.layout === "accent";
                  const isTallAccent = sector.layout === "tall" && !sector.image;
                  const delay = (index % 4) * 80;

                  // Accent layout (dark bg)
                  if (isAccent || isTallAccent) {
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-xl border border-secondary/20 bg-primary-container text-on-primary
                          transition-all duration-500 hover:shadow-xl hover:shadow-secondary/10 hover:border-secondary/40
                          ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        {/* top accent line on hover */}
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        <div className="absolute inset-0 opacity-10 pattern-bg bg-white" aria-hidden="true"></div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                          <div>
                            <span
                              className="material-symbols-outlined text-secondary mb-4 text-left block transition-transform duration-300 group-hover:scale-110"
                              style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
                              aria-hidden="true"
                            >
                              {sector.icon}
                            </span>
                            <h3 className="font-headline-lg text-headline-lg mb-2 text-on-primary font-bold group-hover:text-secondary transition-colors duration-300">
                              {sector.title}
                            </h3>
                          </div>
                          <p className="font-body-md text-on-primary-container opacity-80">
                            {sector.description}
                          </p>
                          {sector.tags && sector.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2 justify-start">
                              {sector.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-3 py-1 bg-secondary/15 border border-secondary/20 text-secondary rounded-full text-[12px] font-medium"
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

                  // Featured / tall with image
                  if (sector.image) {
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest
                          transition-all duration-500 hover:shadow-xl hover:border-secondary/30
                          ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        {/* top accent line on hover */}
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500 z-10" />
                        <img
                          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                          alt={sector.title}
                          src={sector.image}
                          loading="lazy"
                        />
                        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end">
                          <span
                            className="material-symbols-outlined text-secondary mb-4 text-left block transition-transform duration-300 group-hover:scale-110"
                            style={{ fontSize: "40px", fontVariationSettings: "'FILL' 1" }}
                            aria-hidden="true"
                          >
                            {sector.icon}
                          </span>
                          <h3
                            className={`${
                              sector.layout === "featured" || sector.layout === "tall"
                                ? "font-headline-xl text-headline-xl"
                                : "font-headline-sm text-headline-sm"
                            } text-primary mb-2 font-bold group-hover:text-secondary transition-colors duration-300`}
                          >
                            {sector.title}
                          </h3>
                          <p
                            className={`${
                              sector.layout === "featured" || sector.layout === "tall"
                                ? "font-body-md"
                                : "font-caption"
                            } text-on-surface-variant max-w-lg`}
                          >
                            {sector.description}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // Default card (no image, light bg)
                  return (
                    <div
                      key={sector.id}
                      className={`${gridClass} group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest
                        transition-all duration-500 hover:shadow-xl hover:border-secondary/30 hover:-translate-y-1
                        ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      {/* top accent line on hover */}
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                      <div className="p-8 h-full flex flex-col">
                        <span
                          className="material-symbols-outlined text-secondary mb-4 text-left block transition-transform duration-300 group-hover:scale-110"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          aria-hidden="true"
                        >
                          {sector.icon}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold group-hover:text-secondary transition-colors duration-300">
                          {sector.title}
                        </h3>
                        <p className="font-caption text-on-surface-variant">{sector.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>

        {/* CTA Section */}
        <section className="py-24 px-margin-desktop bg-surface-container-high relative overflow-hidden max-w-container-max mx-auto rounded-xl mb-16">
          <div
            ref={ctaReveal.ref}
            className={`max-w-container-max mx-auto flex flex-col items-center text-center relative z-10 transition-all duration-700
              ${ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
          >
            <h2 className="font-headline-xl text-headline-xl mb-8 text-primary font-bold">
              {t("sectors.ctaTitle")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to="/solutions"
                search={{ source: "sectors-cta" }}
                className="bg-primary text-on-primary px-10 py-4 rounded-lg font-label-md hover:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {t("sectors.ctaPrimary")}
              </Link>
              <Link
                to="/consultation"
                search={{ source: "sectors-cta" }}
                className="border border-secondary text-secondary px-10 py-4 rounded-lg font-label-md hover:bg-secondary/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              >
                {t("sectors.ctaSecondary")}
              </Link>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32" aria-hidden="true"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48" aria-hidden="true"></div>
        </section>

      </main>
    </PageLayout>
  );
}

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

  // Determine grid classes based on layout hint
  const getGridClasses = (layout: string | undefined, index: number) => {
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
      <main className="pt-24 sm:pt-28 lg:pt-32 text-start">
        {/* Hero Section */}
        <section
          className="relative py-24 px-margin-desktop overflow-hidden bg-surface"
          aria-label={t("sectors.introAria")}
        >
          <div className="absolute inset-0 pattern-bg" aria-hidden="true"></div>
          <Container clean>
            <div className="max-w-container-max mx-auto relative z-10 flex flex-col items-center text-center">
              <span className="text-secondary font-label-md mb-4 block">
                {t("sectors.heroTagline")}
              </span>
              <h1 className="font-display-lg text-display-lg mb-6 text-primary font-bold">
                {t("sectors.heroTitle")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                {t("sectors.heroSubtitle")}
              </p>
            </div>
          </Container>
        </section>

        {/* Industries Bento Grid */}
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
              <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
                {sectors.map((sector, index) => {
                  const gridClass = getGridClasses(sector.layout, index);
                  const isAccent = sector.layout === "accent";
                  const isTallAccent = sector.layout === "tall" && !sector.image;

                  // Accent layout (dark bg)
                  if (isAccent || isTallAccent) {
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-primary-container text-on-primary transition-all hover:shadow-xl`}
                      >
                        <div
                          className="absolute inset-0 opacity-10 pattern-bg bg-white"
                          aria-hidden="true"
                        ></div>
                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                          <div>
                            <span
                              className="material-symbols-outlined text-secondary-fixed mb-4 text-left"
                              style={{ fontSize: "40px" }}
                              aria-hidden="true"
                            >
                              {sector.icon}
                            </span>
                            <h3 className="font-headline-lg text-headline-lg mb-2 text-on-primary font-bold">
                              {sector.title}
                            </h3>
                          </div>
                          <p className="font-body-md text-on-primary-container opacity-80">
                            {sector.description}
                          </p>
                          {sector.tags && sector.tags.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2 justify-start">
                              {sector.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-3 py-1 bg-on-primary/10 rounded-full text-[12px]"
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

                  // Featured / tall with image
                  if (sector.image) {
                    return (
                      <div
                        key={sector.id}
                        className={`${gridClass} group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest transition-all hover:shadow-xl`}
                      >
                        <img
                          className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-105 transition-transform duration-700"
                          alt={sector.title}
                          src={sector.image}
                          loading="lazy"
                        />
                        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end">
                          <span
                            className="material-symbols-outlined text-secondary mb-4 text-left"
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
                            } text-primary mb-2 font-bold`}
                          >
                            {sector.title}
                          </h3>
                          <p
                            className={`${
                              sector.layout === "featured" || sector.layout === "tall"
                                ? "font-body-md"
                                : "font-caption"
                            } text-on-surface-variant max-w-lg`}
                          >
                            {sector.description}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  // Default card (no image, light bg)
                  return (
                    <div
                      key={sector.id}
                      className={`${gridClass} group relative overflow-hidden rounded-xl border border-outline-variant/30 bg-surface-container-lowest transition-all hover:shadow-xl`}
                    >
                      <div className="p-8 h-full flex flex-col">
                        <span
                          className="material-symbols-outlined text-secondary mb-4 text-left"
                          aria-hidden="true"
                        >
                          {sector.icon}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold">
                          {sector.title}
                        </h3>
                        <p className="font-caption text-on-surface-variant">{sector.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>

        {/* CTA Section */}
        <section className="py-24 px-margin-desktop bg-surface-container-high relative overflow-hidden max-w-container-max mx-auto rounded-xl mb-16">
          <div className="max-w-container-max mx-auto flex flex-col items-center text-center relative z-10">
            <h2 className="font-headline-xl text-headline-xl mb-8 text-primary font-bold">
              {t("sectors.ctaTitle")}
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Link
                to="/solutions"
                search={{ source: "sectors-cta" }}
                className="bg-primary text-on-primary px-10 py-4 rounded-lg font-label-md hover:scale-95 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                {t("sectors.ctaPrimary")}
              </Link>
              <Link
                to="/consultation"
                search={{ source: "sectors-cta" }}
                className="border border-secondary text-secondary px-10 py-4 rounded-lg font-label-md hover:bg-secondary/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              >
                {t("sectors.ctaSecondary")}
              </Link>
            </div>
          </div>
          <div
            className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full -mr-32 -mt-32"
            aria-hidden="true"
          ></div>
          <div
            className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full -ml-48 -mb-48"
            aria-hidden="true"
          ></div>
        </section>
      </main>
    </PageLayout>
  );
}
