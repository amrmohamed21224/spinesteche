import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getServices, getPricingPlans, getFaqs } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "حلول برمجية مخصصة للشركات الطموحة",
      description:
        "SpinesTech - حلول برمجية مخصصة، أنظمة ERP، وذكاء اصطناعي للشركات في السعودية والخليج.",
      path: "/",
    }),
  component: Page,
});

/* ───────────────────────────────────────────
   Shared entrance animation hook
   ─────────────────────────────────────────── */
function useEntrance(delay = 0) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60 + delay);
    return () => clearTimeout(t);
  }, [delay]);
  return visible;
}

function Page() {
  return (
    <PageLayout>
      <HeroSection />
      <StatsBar />
      <AboutSection />
      <ServicesSection />
      <SectorsSection />
      <ProcessSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
    </PageLayout>
  );
}

/* ═══════════════════════════════════════════
   1. HERO SECTION
   ═══════════════════════════════════════════ */
function HeroSection() {
  const { t, locale, dir } = useTranslation();
  const visible = useEntrance();
  const arrowIcon = locale === "ar" ? "arrow_back" : "arrow_forward";

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-24 px-margin-mobile md:px-margin-desktop"
    >
      {/* Islamic pattern */}
      <div className="islamic-pattern absolute inset-0 opacity-[0.02]" aria-hidden="true" />

      {/* Blur blobs */}
      <div
        className="pointer-events-none absolute -top-32 end-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 start-0 w-[320px] h-[320px] rounded-full bg-primary-container/8 blur-3xl"
        aria-hidden="true"
      />

      <Container clean>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          {/* ── Left: copy ── */}
          <div className="z-10 order-2 lg:order-1 text-start">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-6">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                rocket_launch
              </span>
              {locale === "ar" ? "شريك التحول الرقمي في السعودية" : "Your digital transformation partner in Saudi Arabia"}
            </span>

            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-primary mb-5">
              {t("home.heroTitle")}
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl leading-relaxed">
              {t("home.heroSubtitle")}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-10">
              <Link
                to="/consultation"
                search={{ source: "home-hero" }}
                className="bg-secondary text-on-secondary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold flex items-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/25 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2"
                aria-label={t("home.bookConsultation")}
              >
                <span>{t("home.bookConsultation")}</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  {arrowIcon}
                </span>
              </Link>
              <Link
                to="/quote"
                search={{ source: "home-hero" }}
                className="border-2 border-secondary text-secondary px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold hover:bg-secondary/5 hover:-translate-y-0.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2"
                aria-label={t("home.requestQuote")}
              >
                {t("home.requestQuote")}
              </Link>
            </div>

            {/* Trust badges */}
            <div
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8 border-t border-outline-variant/30"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(12px)",
                transition: "opacity 0.55s ease 0.15s, transform 0.55s ease 0.15s",
              }}
            >
              {[
                { icon: "check_circle", label: t("home.trustCustom") },
                { icon: "check_circle", label: t("home.trustErp") },
                { icon: "check_circle", label: t("home.trustAi") },
                { icon: "check_circle", label: t("home.trustLocal") },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 justify-start"
                >
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

          {/* ── Right: image ── */}
          <div
            className="relative order-1 lg:order-2"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(22px)",
              transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s",
            }}
          >
            {/* Decorative bg blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/15 via-primary-container/10 to-transparent rounded-3xl rotate-2 scale-105" />

            {/* Green accent glow */}
            <div
              className="pointer-events-none absolute -top-10 -end-10 w-48 h-48 rounded-full bg-secondary/20 blur-3xl"
              aria-hidden="true"
            />

            <img
              alt={t("home.heroImageAlt")}
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[16/10]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2AZZoxIZ-GDG2uwZS83lY8yRzqHk_C73qrpsc1srV-sfitFamyjaRXBe56nqXsvQLRxz8bTp9no3vd5ap1jNdpxue2yquRm4BPjIAoCOptoZvo3ZycyRLOR-6k8_AJvR23sKbj88-h4acKRpOIItt1aBdEsU0ENAA59h2fVClgtelgbLke1V5cLZ0tiG_SiWP0HrGqRL6Flmq_UDy_T0Rc0ROi7xRfqWoU4nTK9oNIruANCybg4f8Lfu9mQTTT9EHY5E6trVoSqEd"
              loading="lazy"
            />

            {/* Floating stat card */}
            <div className="absolute -bottom-5 -start-4 sm:-start-6 z-20 glass-card rounded-2xl px-5 py-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-secondary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  trending_up
                </span>
                <div>
                  <p className="font-bold text-primary text-lg leading-none">+150</p>
                  <p className="text-caption text-on-surface-variant">
                    {locale === "ar" ? "مشروع ناجح" : "Successful projects"}
                  </p>
                </div>
              </div>
            </div>

            {/* Floating stat card 2 */}
            <div className="absolute -top-4 -end-3 sm:-end-5 z-20 glass-card rounded-2xl px-5 py-4 shadow-xl">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-secondary text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  groups
                </span>
                <div>
                  <p className="font-bold text-primary text-lg leading-none">50+</p>
                  <p className="text-caption text-on-surface-variant">
                    {locale === "ar" ? "خبير تقني" : "Tech experts"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   2. STATS BAR
   ═══════════════════════════════════════════ */
function StatsBar() {
  const { locale } = useTranslation();
  const visible = useEntrance(200);

  const stats = [
    { value: "+150", label: locale === "ar" ? "مشروع ناجح" : "Successful projects", icon: "deployed_code" },
    { value: "50+", label: locale === "ar" ? "خبير تقني" : "Tech experts", icon: "groups" },
    { value: "8+", label: locale === "ar" ? "سنوات خبرة" : "Years of experience", icon: "calendar_month" },
    { value: "99.9%", label: locale === "ar" ? "ضمان استمرارية" : "Uptime guarantee", icon: "verified" },
  ];

  return (
    <section className="relative bg-primary-container overflow-hidden">
      <div className="islamic-pattern absolute inset-0 opacity-[0.03]" aria-hidden="true" />

      <Container clean className="px-margin-mobile md:px-margin-desktop py-10 md:py-14 relative z-10">
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(14px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="flex items-center gap-4 text-on-primary"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(10px)",
                transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s`,
              }}
            >
              <span
                className="material-symbols-outlined text-secondary-fixed text-3xl"
                aria-hidden="true"
              >
                {stat.icon}
              </span>
              <div>
                <p className="font-bold text-2xl md:text-3xl leading-none mb-1">{stat.value}</p>
                <p className="text-on-primary/70 text-caption">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. ABOUT SECTION
   ═══════════════════════════════════════════ */
function AboutSection() {
  const { t, locale } = useTranslation();
  const visible = useEntrance();

  return (
    <Section bg="surface-container-low" className="text-start overflow-hidden">
      {/* Subtle pattern */}
      <div className="islamic-pattern absolute inset-0 opacity-[0.015]" aria-hidden="true" />

      <div
        className="text-center mb-14 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span className="text-secondary font-bold font-label-md tracking-widest uppercase mb-4 block">
          {t("home.aboutBadge")}
        </span>
        <h2 className="font-headline-xl text-headline-xl mb-4 text-primary font-bold">
          {t("home.aboutTitle")}
        </h2>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* Vision card */}
        <div
          className="md:col-span-2 p-8 md:p-10 bg-white rounded-2xl border border-outline-variant/20 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-3 py-1 text-secondary font-bold text-caption mb-4">
              <span className="material-symbols-outlined text-[14px]" aria-hidden="true">
                visibility
              </span>
              {t("home.visionTitle")}
            </span>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {t("home.visionText")}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-surface-container-low p-4 rounded-xl text-center border border-outline-variant/15">
              <div className="text-headline-lg font-bold text-secondary">+150</div>
              <div className="text-caption text-on-surface">{t("home.projects")}</div>
            </div>
            <div className="bg-surface-container-low p-4 rounded-xl text-center border border-outline-variant/15">
              <div className="text-headline-lg font-bold text-secondary">50+</div>
              <div className="text-caption text-on-surface">{t("home.experts")}</div>
            </div>
          </div>
        </div>

        {/* Sovereignty card */}
        <div
          className="p-8 md:p-10 bg-primary-container text-on-primary rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden shadow-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
          }}
        >
          <div className="islamic-pattern absolute inset-0 opacity-5" aria-hidden="true" />
          <span
            className="material-symbols-outlined text-5xl mb-6 text-secondary-fixed relative z-10"
            aria-hidden="true"
          >
            shield_person
          </span>
          <h3 className="font-headline-sm text-headline-sm mb-4 text-on-primary font-bold relative z-10">
            {t("home.sovereigntyTitle")}
          </h3>
          <p className="font-body-md text-body-md opacity-80 relative z-10">
            {t("home.sovereigntyText")}
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   4. SERVICES SECTION
   ═══════════════════════════════════════════ */
function ServicesSection() {
  const { t, locale } = useTranslation();
  const {
    data: services,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services-summary", locale],
    queryFn: () => getServices(locale),
  });
  const visible = useEntrance();

  const displayServices = services ? services.slice(0, 3) : [];

  return (
    <Section bg="none" className="overflow-hidden text-start">
      {/* Subtle blur */}
      <div
        className="pointer-events-none absolute -top-32 start-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="flex flex-col md:flex-row justify-between items-end mb-14 gap-6 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <div className="max-w-2xl text-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              build
            </span>
            {locale === "ar" ? "حلول متكاملة" : "Integrated solutions"}
          </span>
          <h2 className="font-headline-xl text-headline-xl mb-3 text-primary font-bold">
            {t("home.servicesTitle")}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            {t("home.servicesSubtitle")}
          </p>
        </div>
        <Link
          to="/services"
          className="text-secondary font-bold flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1 hover:-translate-y-0.5 transition-transform"
        >
          <span>{t("home.viewAllServices")}</span>
          <span
            className={`material-symbols-outlined transition-transform ${locale === "ar" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
            aria-hidden="true"
          >
            {locale === "ar" ? "arrow_back" : "arrow_forward"}
          </span>
        </Link>
      </div>

      {isLoading && <StateFeedback type="loading" />}
      {isError && (
        <StateFeedback type="error" message={t("feedback.servicesError")} onRetry={refetch} />
      )}
      {!isLoading && !isError && displayServices.length === 0 && (
        <StateFeedback type="empty" message={t("feedback.servicesEmpty")} />
      )}

      {!isLoading && !isError && displayServices.length > 0 && (
        <Grid cols={3} className="relative z-10">
          {displayServices.map((service, i) => (
            <Link
              key={service.id}
              to="/services/$slug"
              params={{ slug: service.slug }}
              className="group p-8 bg-white border border-outline-variant/30 rounded-2xl hover:border-secondary/40 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-secondary/5 relative overflow-hidden block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: `opacity 0.5s ease ${0.1 + i * 0.08}s, transform 0.5s ease ${0.1 + i * 0.08}s, box-shadow 0.3s ease`,
              }}
            >
              {/* Subtle gradient accent */}
              <div
                className="absolute top-0 start-0 end-0 h-1 bg-gradient-to-r from-secondary/60 to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-hidden="true"
              />

              <div className="bg-secondary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors text-secondary">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  {service.icon}
                </span>
              </div>

              <h3 className="font-headline-sm text-headline-sm mb-4 text-primary font-bold">
                {service.title}
              </h3>

              <p className="font-body-md text-on-surface-variant mb-6">
                {service.description}
              </p>

              {service.features && (
                <ul className="space-y-3 font-label-md text-label-md text-on-surface-variant mb-6">
                  {service.features.slice(0, 3).map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 justify-start">
                      <span
                        className="w-1.5 h-1.5 bg-secondary rounded-full shrink-0"
                        aria-hidden="true"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}

              <span className="inline-flex items-center gap-2 font-bold text-secondary group-hover:gap-3 transition-all">
                {t("common.learnMore")}
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {locale === "ar" ? "arrow_back" : "arrow_forward"}
                </span>
              </span>
            </Link>
          ))}
        </Grid>
      )}
    </Section>
  );
}

/* ═══════════════════════════════════════════
   5. SECTORS SECTION (Dark Navy)
   ═══════════════════════════════════════════ */
function SectorsSection() {
  const { t, locale, dir } = useTranslation();
  const visible = useEntrance();

  const sectors = [
    {
      key: "sectorGov",
      desc: "sectorGovDesc",
      icon: "business_center",
    },
    {
      key: "sectorHealth",
      desc: "sectorHealthDesc",
      icon: "local_hospital",
    },
    {
      key: "sectorEcom",
      desc: "sectorEcomDesc",
      icon: "shopping_cart",
    },
    {
      key: "sectorIndustrial",
      desc: "sectorIndustrialDesc",
      icon: "factory",
    },
  ];

  return (
    <section
      dir={dir}
      className="relative overflow-hidden bg-primary-container px-margin-mobile md:px-margin-desktop py-24 md:py-32"
    >
      {/* Islamic pattern */}
      <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />

      {/* Blur blobs */}
      <div
        className="pointer-events-none absolute -top-40 end-20 w-[420px] h-[420px] rounded-full bg-secondary/12 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 start-20 w-[360px] h-[360px] rounded-full bg-on-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <Container clean className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* ── Left: copy ── */}
          <div
            className="text-start"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(18px)",
              transition: "opacity 0.65s ease, transform 0.65s ease",
            }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/25 bg-secondary/10 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
              <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                domain
              </span>
              {locale === "ar" ? "القطاعات المستهدفة" : "Target sectors"}
            </span>

            <h2 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-on-primary mb-6">
              {t("home.sectorsTitle")}
            </h2>

            <p className="font-body-lg text-body-lg text-on-primary/75 mb-10 max-w-lg leading-relaxed">
              {t("home.sectorsSubtitle")}
            </p>

            <div className="grid grid-cols-2 gap-4">
              {sectors.map((s, i) => (
                <div
                  key={s.key}
                  className="flex items-start gap-4 p-4 rounded-xl border border-on-primary/10 bg-on-primary/[0.03] hover:bg-on-primary/[0.06] transition-colors"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateX(14px)",
                    transition: `opacity 0.5s ease ${0.15 + i * 0.08}s, transform 0.5s ease ${0.15 + i * 0.08}s`,
                  }}
                >
                  <span
                    className="material-symbols-outlined text-secondary-fixed shrink-0 mt-0.5"
                    aria-hidden="true"
                  >
                    {s.icon}
                  </span>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-primary font-bold text-sm">
                      {t(`home.${s.key}`)}
                    </h4>
                    <p className="text-caption text-on-primary/60">{t(`home.${s.desc}`)}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div
              className="mt-8 flex flex-wrap gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transition: `opacity 0.5s ease 0.5s`,
              }}
            >
              <Link
                to="/sectors"
                className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3.5 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
              >
                {locale === "ar" ? "استعرض القطاعات" : "Browse sectors"}
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {locale === "ar" ? "arrow_back" : "arrow_forward"}
                </span>
              </Link>
              <Link
                to="/consultation"
                search={{ source: "home-sectors" }}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-secondary-fixed/60 px-6 py-3.5 font-bold text-secondary-fixed transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
              >
                {locale === "ar" ? "استشارة مجانية" : "Free consultation"}
              </Link>
            </div>
          </div>

          {/* ── Right: visual ── */}
          <div
            className="relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(20px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            {/* Glow orb */}
            <div
              className="pointer-events-none absolute top-1/2 start-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative bg-surface-container-highest/10 p-3 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl">
              <div className="aspect-square rounded-xl bg-primary relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 islamic-pattern opacity-10" aria-hidden="true" />

                {/* Rotating rings (CSS only) */}
                <div className="absolute w-3/5 h-3/5 border border-secondary/20 rounded-full animate-[spin_12s_linear_infinite]" aria-hidden="true" />
                <div
                  className="absolute w-2/5 h-2/5 border border-secondary/30 rounded-full animate-[spin_8s_linear_infinite_reverse]"
                  aria-hidden="true"
                />

                {/* Center icon */}
                <div className="relative flex flex-col items-center gap-4">
                  <span
                    className="material-symbols-outlined text-7xl text-secondary-fixed"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                    aria-hidden="true"
                  >
                    hub
                  </span>
                  <p className="text-on-primary/70 font-label-md text-label-md text-center max-w-[200px]">
                    {locale === "ar"
                      ? "حلول متصلة لكل القطاعات"
                      : "Connected solutions for every sector"}
                  </p>
                </div>

                {/* Orbiting dots */}
                <div className="absolute w-4/5 h-4/5 animate-[spin_20s_linear_infinite]" aria-hidden="true">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-secondary/60 rounded-full" />
                </div>
                <div className="absolute w-3/4 h-3/4 animate-[spin_15s_linear_infinite_reverse]" aria-hidden="true">
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-secondary-fixed/50 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. PROCESS SECTION
   ═══════════════════════════════════════════ */
function ProcessSection() {
  const { t, locale } = useTranslation();
  const visible = useEntrance();

  const steps = [
    { num: "01", title: t("home.step1Title"), desc: t("home.step1Desc") },
    { num: "02", title: t("home.step2Title"), desc: t("home.step2Desc") },
    { num: "03", title: t("home.step3Title"), desc: t("home.step3Desc") },
    { num: "04", title: t("home.step4Title"), desc: t("home.step4Desc") },
  ];

  return (
    <Section bg="default" className="text-start overflow-hidden">
      {/* Subtle blur */}
      <div
        className="pointer-events-none absolute -bottom-32 end-0 w-[300px] h-[300px] rounded-full bg-secondary/5 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="text-center mb-14 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            route
          </span>
          {locale === "ar" ? "منهجية واضحة" : "Clear methodology"}
        </span>
        <h2 className="font-headline-xl text-headline-xl mb-3 text-primary font-bold">
          {t("home.processTitle")}
        </h2>
        <p className="font-body-lg text-on-surface-variant">{t("home.processSubtitle")}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10 text-center">
        {/* Line background for desktop */}
        <div
          className="hidden md:block absolute top-[28px] left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-secondary/40 via-secondary/20 to-secondary/40"
          aria-hidden="true"
        />

        {steps.map((step, i) => (
          <div
            key={step.num}
            className="group relative"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? "none" : "translateY(18px)",
              transition: `opacity 0.5s ease ${0.1 + i * 0.1}s, transform 0.5s ease ${0.1 + i * 0.1}s`,
            }}
          >
            <div className="relative inline-flex mb-6">
              <div className="w-14 h-14 bg-white border-4 border-background shadow-lg rounded-full flex items-center justify-center group-hover:bg-secondary group-hover:text-white group-hover:border-secondary transition-all relative z-10">
                <span className="font-bold text-sm">{step.num}</span>
              </div>
              {/* Pulse ring on hover */}
              <div className="absolute inset-0 rounded-full bg-secondary/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity" />
            </div>
            <h3 className="font-headline-sm text-headline-sm mb-2 text-primary font-bold">
              {step.title}
            </h3>
            <p className="text-caption text-on-surface-variant px-4 leading-relaxed">
              {step.desc}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   7. PRICING SECTION
   ═══════════════════════════════════════════ */
function PricingSection() {
  const { t, locale } = useTranslation();
  const {
    data: pricingPlans,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pricing-summary", locale],
    queryFn: () => getPricingPlans(locale),
  });
  const visible = useEntrance();

  return (
    <Section bg="surface-container" className="text-start overflow-hidden">
      <div
        className="text-center mb-12 relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(16px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
          <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
            payments
          </span>
          {locale === "ar" ? "أسعار شفافة" : "Transparent pricing"}
        </span>
        <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
          {t("home.pricingTitle")}
        </h2>
      </div>

      <div className="relative z-10">
        {isLoading && <StateFeedback type="loading" />}
        {isError && (
          <StateFeedback type="error" message={t("feedback.pricingError")} onRetry={refetch} />
        )}
        {!isLoading && !isError && (!pricingPlans || pricingPlans.length === 0) && (
          <StateFeedback type="empty" message={t("feedback.pricingEmpty")} />
        )}

        {!isLoading && !isError && pricingPlans && pricingPlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, i) => {
              const isRecommended = plan.recommended;

              return (
                <div
                  key={plan.id}
                  className={`relative p-8 rounded-2xl flex flex-col items-start text-right transition-all duration-300 hover:-translate-y-1 ${
                    isRecommended
                      ? "bg-primary-container border-2 border-secondary scale-105 shadow-2xl z-10 text-on-primary hover:shadow-primary/30"
                      : "bg-white border border-outline-variant/30 text-on-surface hover:shadow-xl"
                  }`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible
                      ? isRecommended
                        ? "scale(1.05)"
                        : "none"
                      : "translateY(20px)",
                    transition: `opacity 0.5s ease ${0.08 + i * 0.08}s, transform 0.5s ease ${0.08 + i * 0.08}s, box-shadow 0.3s ease`,
                  }}
                >
                  {isRecommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-1.5 rounded-full text-caption font-bold shadow-md">
                      {t("common.mostPopular")}
                    </div>
                  )}

                  <span
                    className={`px-4 py-1 rounded-full text-caption font-bold mb-4 ${
                      isRecommended
                        ? "bg-white/10 text-on-primary"
                        : "bg-surface-container-high text-on-surface"
                    }`}
                  >
                    {plan.tier}
                  </span>

                  <h3
                    className={`font-headline-lg text-headline-lg mb-4 font-bold ${
                      isRecommended ? "text-on-primary" : "text-primary"
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <p
                    className={`text-body-md mb-8 font-body-md ${
                      isRecommended ? "opacity-80" : "text-on-surface-variant"
                    }`}
                  >
                    {plan.description}
                  </p>

                  <ul
                    className={`space-y-4 mb-10 w-full ${
                      isRecommended ? "opacity-90" : "text-on-surface-variant"
                    }`}
                  >
                    {plan.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 justify-start">
                        <span
                          className={`material-symbols-outlined text-sm shrink-0 ${
                            isRecommended ? "text-secondary-fixed" : "text-secondary"
                          }`}
                          aria-hidden="true"
                        >
                          check
                        </span>
                        <span className="text-sm">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto w-full">
                    <Link
                      to="/quote"
                      search={{ plan: plan.id, source: "home-pricing" }}
                      className={`block w-full text-center py-3.5 rounded-xl font-bold transition-all hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 ${
                        isRecommended
                          ? "bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary/50 hover:shadow-lg hover:shadow-secondary/30"
                          : "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary/50"
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   8. FAQ SECTION
   ═══════════════════════════════════════════ */
function FaqSection() {
  const { t, locale } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const {
    data: faqs,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["faq-summary", locale],
    queryFn: () => getFaqs(locale),
  });
  const visible = useEntrance();

  const displayFaqs = faqs ? faqs.slice(0, 3) : [];

  return (
    <Section bg="default" className="text-start overflow-hidden">
      {/* Subtle blur */}
      <div
        className="pointer-events-none absolute -top-32 start-0 w-[260px] h-[260px] rounded-full bg-secondary/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="max-w-3xl mx-auto relative z-10">
        <div
          className="text-center mb-12"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(16px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              help
            </span>
            {locale === "ar" ? "استفسارات شائعة" : "Common questions"}
          </span>
          <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
            {t("home.faqTitle")}
          </h2>
        </div>

        {isLoading && <StateFeedback type="loading" />}
        {isError && (
          <StateFeedback type="error" message={t("feedback.faqError")} onRetry={refetch} />
        )}
        {!isLoading && !isError && displayFaqs.length === 0 && (
          <StateFeedback type="empty" message={t("feedback.faqEmpty")} />
        )}

        {!isLoading && !isError && displayFaqs.length > 0 && (
          <div className="space-y-4">
            {displayFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(14px)",
                    transition: `opacity 0.45s ease ${0.08 + index * 0.06}s, transform 0.45s ease ${0.08 + index * 0.06}s`,
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 flex justify-between items-center cursor-pointer font-headline-sm text-headline-sm text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-xl flex-row-reverse"
                    aria-expanded={isOpen}
                  >
                    <span className="text-primary font-bold text-start">{faq.question}</span>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-48 opacity-100 px-6 pb-6" : "max-h-0 opacity-0"
                    } text-on-surface-variant font-body-md leading-relaxed`}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════
   9. CTA SECTION
   ═══════════════════════════════════════════ */
function CtaSection() {
  const { locale, dir } = useTranslation();
  const visible = useEntrance();

  return (
    <section
      dir={dir}
      className="relative py-20 md:py-28 px-margin-mobile md:px-margin-desktop bg-primary-container overflow-hidden"
    >
      {/* Islamic pattern */}
      <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />

      {/* Blur blobs */}
      <div
        className="pointer-events-none absolute -top-40 end-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-40 start-20 w-96 h-96 rounded-full bg-on-primary/5 blur-3xl"
        aria-hidden="true"
      />

      <Container clean className="relative z-10">
        <div
          className="flex flex-col items-center text-center max-w-2xl mx-auto"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(18px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
          }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/25 bg-secondary/10 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
            <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
              emoji_objects
            </span>
            {locale === "ar" ? "ابدأ رحلتك الرقمية اليوم" : "Start your digital journey today"}
          </span>

          <h2 className="font-display-md text-display-md-mobile md:text-display-md font-bold text-on-primary mb-6 leading-tight">
            {locale === "ar"
              ? "جاهز لتحويل فكرتك إلى واقع رقمي؟"
              : "Ready to turn your idea into a digital reality?"}
          </h2>

          <p className="font-body-lg text-body-lg text-on-primary/75 mb-10 max-w-lg">
            {locale === "ar"
              ? "فريق خبراء SpinesTech جاهز لمساعدتك في كل خطوة. احجز استشارة مجانية أو اطلب عرض سعر مخصص لمشروعك."
              : "Our expert team is ready to help you every step of the way. Book a free consultation or request a custom quote."}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Link
              to="/consultation"
              search={{ source: "home-cta" }}
              className="flex items-center justify-center gap-2 rounded-xl bg-secondary px-8 py-4 font-bold text-on-secondary transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
            >
              {locale === "ar" ? "احجز استشارة مجانية" : "Book free consultation"}
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {locale === "ar" ? "arrow_back" : "arrow_forward"}
              </span>
            </Link>

            <Link
              to="/quote"
              search={{ source: "home-cta" }}
              className="flex items-center justify-center gap-2 rounded-xl border-2 border-secondary-fixed px-8 py-4 font-bold text-secondary-fixed transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
            >
              {locale === "ar" ? "اطلب عرض سعر" : "Request a quote"}
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {locale === "ar" ? "arrow_back" : "arrow_forward"}
              </span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
