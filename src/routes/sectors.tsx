// v2 - cinematic redesign with scroll animations
import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
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

function useReveal(threshold = 0.12) {
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

function useCounter(target: number, active: boolean) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let cur = 0;
    const step = target / 50;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setVal(target); clearInterval(t); }
      else setVal(Math.floor(cur));
    }, 28);
    return () => clearInterval(t);
  }, [active, target]);
  return val;
}

function StatCard({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const count = useCounter(value, active);
  return (
    <div className="text-center">
      <div className="text-4xl font-black text-secondary mb-1">{count}{suffix}</div>
      <div className="text-on-primary-container text-sm opacity-70">{label}</div>
    </div>
  );
}

function Page() {
  const { t, locale } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const { data: sectors, isLoading, isError, refetch } = useQuery({
    queryKey: ["sectors", locale],
    queryFn: () => getSectors(locale),
  });

  // Parallax
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      heroRef.current.style.transform = `translateY(${window.scrollY * 0.22}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const statsReveal = useReveal(0.3);
  const gridReveal = useReveal(0.08);
  const ctaReveal = useReveal(0.2);

  const getGridClass = (layout: string | undefined) => {
    switch (layout) {
      case "featured": return "md:col-span-8";
      case "accent":   return "md:col-span-4";
      case "tall":     return "md:col-span-6";
      default:         return "md:col-span-4";
    }
  };

  const getHeightClass = (layout: string | undefined) => {
    switch (layout) {
      case "featured": return "h-96";
      case "tall":     return "h-96";
      default:         return "h-80";
    }
  };

  return (
    <PageLayout>
      <main className="text-start overflow-hidden">

        {/* ═══════════════════════════════════════════
            HERO — dark navy, parallax, animated text
        ════════════════════════════════════════════ */}
        <section className="relative min-h-[75vh] flex items-center bg-primary-container overflow-hidden">
          {/* Parallax BG */}
          <div ref={heroRef} className="absolute inset-0 will-change-transform">
            <div className="islamic-pattern absolute inset-0 bg-repeat opacity-[0.04]" style={{ backgroundSize: "260px" }} />
            <div className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(3,109,54,0.15) 0%, transparent 65%)" }} />
            <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full"
              style={{ background: "radial-gradient(circle, rgba(3,109,54,0.08) 0%, transparent 65%)" }} />
          </div>

          {/* Top + bottom lines */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

          <Container clean className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-36 pb-24">
            <div className="max-w-3xl mx-auto text-center space-y-8">

              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-secondary/30 bg-secondary/10"
                style={{ backdropFilter: "blur(8px)" }}>
                <div className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                <span className="text-secondary font-bold text-sm tracking-wider">
                  {t("sectors.heroTagline")}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display-lg text-display-lg text-on-primary font-black leading-tight"
                style={{ textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}>
                {t("sectors.heroTitle")}
              </h1>

              {/* Subtitle */}
              <p className="font-body-lg text-body-lg text-on-primary-container opacity-80 max-w-2xl mx-auto leading-relaxed">
                {t("sectors.heroSubtitle")}
              </p>

              {/* Scroll indicator */}
              <div className="flex flex-col items-center gap-2 pt-6 opacity-50">
                <span className="text-on-primary text-xs tracking-widest uppercase">
                  {locale === "ar" ? "اكتشف القطاعات" : "Explore sectors"}
                </span>
                <div className="w-px h-10 bg-gradient-to-b from-secondary to-transparent animate-pulse" />
              </div>
            </div>
          </Container>

          {/* Wave divider */}
          <div className="absolute bottom-0 inset-x-0 h-16 overflow-hidden">
            <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full" fill="var(--color-background)">
              <path d="M0,64 C360,0 1080,64 1440,32 L1440,64 Z" />
            </svg>
          </div>
        </section>

        {/* ═══════════════════════════════════════════
            STATS BAR
        ════════════════════════════════════════════ */}
        <section className="py-16 bg-background">
          <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div ref={statsReveal.ref}
              className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 ${statsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              {[
                { value: 8,   suffix: "+",  label: locale === "ar" ? "قطاعات نخدمها" : "Sectors served" },
                { value: 150, suffix: "+",  label: locale === "ar" ? "عميل نشط" : "Active clients" },
                { value: 98,  suffix: "%",  label: locale === "ar" ? "رضا العملاء" : "Client satisfaction" },
                { value: 12,  suffix: " سنة", label: locale === "ar" ? "خبرة في السوق" : "Market experience" },
              ].map((s, i) => (
                <div key={i}
                  className={`relative rounded-2xl border border-outline-variant/40 bg-primary-container p-6 text-center transition-all duration-500
                    ${statsReveal.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                  style={{ transitionDelay: `${i * 80}ms` }}>
                  <StatCard value={s.value} suffix={s.suffix} label={s.label} active={statsReveal.visible} />
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* ═══════════════════════════════════════════
            SECTORS BENTO GRID
        ════════════════════════════════════════════ */}
        <section className="py-16 pb-24 bg-background">
          <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">

            {isLoading && <StateFeedback type="loading" />}
            {isError && <StateFeedback type="error" message={t("sectors.loadError")} onRetry={refetch} />}
            {!isLoading && !isError && (!sectors || sectors.length === 0) && (
              <StateFeedback type="empty" title={t("sectors.emptyTitle")} />
            )}

            {!isLoading && !isError && sectors && sectors.length > 0 && (
              <div ref={gridReveal.ref} className="grid grid-cols-1 md:grid-cols-12 gap-5">
                {sectors.map((sector, index) => {
                  const isAccent = sector.layout === "accent" || (sector.layout === "tall" && !sector.image);
                  const gridClass = getGridClass(sector.layout);
                  const heightClass = getHeightClass(sector.layout);
                  const isHovered = hoveredId === sector.id;
                  const delay = (index % 4) * 80;

                  // ── Dark accent card ──
                  if (isAccent) {
                    return (
                      <div
                        key={sector.id}
                        onMouseEnter={() => setHoveredId(sector.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`${gridClass} ${heightClass} group relative overflow-hidden rounded-2xl border border-secondary/25 bg-primary-container
                          cursor-default transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/10 hover:border-secondary/50
                          ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        {/* BG pattern */}
                        <div className="absolute inset-0 islamic-pattern bg-repeat opacity-[0.05]" style={{ backgroundSize: "180px" }} />

                        {/* Animated blob on hover */}
                        <div className={`absolute top-0 right-0 w-48 h-48 rounded-full transition-all duration-700
                          ${isHovered ? "opacity-20 scale-150" : "opacity-0 scale-100"}`}
                          style={{ background: "radial-gradient(circle, #036d36 0%, transparent 70%)" }} />

                        {/* Top accent line */}
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                        <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                          <div>
                            <div className="w-12 h-12 rounded-xl bg-secondary/15 flex items-center justify-center mb-5 group-hover:bg-secondary/25 transition-colors">
                              <span className="material-symbols-outlined text-secondary text-[24px]"
                                style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                                {sector.icon}
                              </span>
                            </div>
                            <h3 className="font-headline-lg text-headline-lg text-on-primary font-bold mb-3 group-hover:text-secondary transition-colors duration-300">
                              {sector.title}
                            </h3>
                            <p className="font-body-md text-on-primary-container opacity-75 leading-relaxed">
                              {sector.description}
                            </p>
                          </div>

                          {sector.tags && sector.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-6">
                              {sector.tags.map((tag, tIdx) => (
                                <span key={tIdx}
                                  className="px-3 py-1 bg-secondary/15 border border-secondary/20 text-secondary rounded-full text-xs font-medium">
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
                    const isFeatured = sector.layout === "featured";
                    return (
                      <div
                        key={sector.id}
                        onMouseEnter={() => setHoveredId(sector.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        className={`${gridClass} ${heightClass} group relative overflow-hidden rounded-2xl border border-outline-variant/30
                          cursor-default transition-all duration-500 hover:shadow-2xl hover:border-secondary/30
                          ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                        style={{ transitionDelay: `${delay}ms` }}
                      >
                        {/* Image */}
                        <img
                          src={sector.image}
                          alt={sector.title}
                          loading="lazy"
                          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                          style={{ opacity: isHovered ? 0.35 : 0.18 }}
                        />

                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-primary-container/95 via-primary-container/40 to-transparent" />

                        {/* Top accent line */}
                        <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                        <div className="relative z-10 p-8 md:p-10 h-full flex flex-col justify-end">
                          <div className="w-11 h-11 rounded-xl bg-secondary/20 flex items-center justify-center mb-4 group-hover:bg-secondary/35 transition-colors">
                            <span className="material-symbols-outlined text-secondary text-[22px]"
                              style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                              {sector.icon}
                            </span>
                          </div>
                          <h3 className={`font-bold mb-2 text-on-primary group-hover:text-secondary transition-colors duration-300
                            ${isFeatured ? "font-headline-xl text-headline-xl" : "font-headline-lg text-headline-lg"}`}>
                            {sector.title}
                          </h3>
                          <p className={`text-on-primary-container opacity-75 leading-relaxed
                            ${isFeatured ? "font-body-md text-body-md max-w-lg" : "font-body-sm text-body-sm"}`}>
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
                      onMouseEnter={() => setHoveredId(sector.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className={`${gridClass} ${heightClass} group relative overflow-hidden rounded-2xl border border-outline-variant/40 bg-surface-container-lowest
                        cursor-default transition-all duration-500 hover:shadow-xl hover:border-secondary/35 hover:-translate-y-1
                        ${gridReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
                      style={{ transitionDelay: `${delay}ms` }}
                    >
                      {/* Hover blob */}
                      <div className={`absolute bottom-0 right-0 w-40 h-40 rounded-full transition-all duration-500
                        ${isHovered ? "opacity-10 scale-150" : "opacity-0 scale-100"}`}
                        style={{ background: "radial-gradient(circle, #036d36 0%, transparent 70%)" }} />

                      {/* Top accent line */}
                      <div className="absolute top-0 inset-x-0 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                      {/* Number */}
                      <div className="absolute bottom-4 left-4 text-7xl font-black text-outline-variant/8 select-none leading-none" aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="relative z-10 p-8 h-full flex flex-col">
                        <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                          <span className="material-symbols-outlined text-secondary text-[22px]"
                            style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                            {sector.icon}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-3 group-hover:text-secondary transition-colors duration-300">
                          {sector.title}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed flex-grow">
                          {sector.description}
                        </p>

                        {sector.tags && sector.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {sector.tags.map((tag, tIdx) => (
                              <span key={tIdx}
                                className="px-3 py-1 bg-secondary/8 border border-secondary/15 text-secondary rounded-full text-xs font-medium">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </section>

        {/* ═══════════════════════════════════════════
            CTA — dark navy full width
        ════════════════════════════════════════════ */}
        <section className="py-24 bg-primary-container relative overflow-hidden">
          <div className="islamic-pattern absolute inset-0 bg-repeat opacity-[0.04]" style={{ backgroundSize: "240px" }} />
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

          {/* Blobs */}
          <div className="absolute top-[-20%] right-[-10%] w-96 h-96 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(3,109,54,0.15) 0%, transparent 65%)" }} />
          <div className="absolute bottom-[-20%] left-[-5%] w-80 h-80 rounded-full"
            style={{ background: "radial-gradient(circle, rgba(3,109,54,0.10) 0%, transparent 65%)" }} />

          <Container clean className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
            <div ref={ctaReveal.ref}
              className={`max-w-3xl mx-auto text-center space-y-8 transition-all duration-700 ${ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>

              <div className="w-14 h-14 rounded-2xl border border-secondary/30 bg-secondary/10 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[28px] text-secondary" style={{ fontVariationSettings: "'FILL' 1" }} aria-hidden="true">
                  handshake
                </span>
              </div>

              <h2 className="font-display-lg text-display-lg text-on-primary font-bold leading-tight">
                {t("sectors.ctaTitle")}
              </h2>

              <p className="font-body-lg text-body-lg text-on-primary-container opacity-75 max-w-xl mx-auto">
                {locale === "ar"
                  ? "فريقنا جاهز لتصميم حل مخصص يناسب طبيعة قطاعك ومتطلبات السوق السعودي."
                  : "Our team is ready to design a tailored solution for your sector."}
              </p>

              <div className="flex flex-wrap justify-center gap-4 pt-2">
                <Link
                  to="/consultation"
                  search={{ source: "sectors-cta" }}
                  className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-10 py-4 rounded-xl font-bold text-base hover:bg-secondary/90 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-secondary/25"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_month</span>
                  {t("sectors.ctaSecondary")}
                </Link>
                <Link
                  to="/solutions"
                  search={{ source: "sectors-cta" }}
                  className="inline-flex items-center gap-2 border border-on-primary/20 text-on-primary px-10 py-4 rounded-xl font-bold text-base hover:border-secondary/40 hover:text-secondary transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">explore</span>
                  {t("sectors.ctaPrimary")}
                </Link>
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap justify-center gap-6 pt-4 text-on-primary-container opacity-55 text-sm">
                {[
                  { icon: "verified", text: locale === "ar" ? "معتمدون في السوق السعودي" : "Saudi market certified" },
                  { icon: "support_agent", text: locale === "ar" ? "دعم متخصص 24/7" : "24/7 specialized support" },
                  { icon: "rocket_launch", text: locale === "ar" ? "تشغيل سريع خلال 72 ساعة" : "Go-live in 72 hours" },
                ].map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-secondary" aria-hidden="true">{t.icon}</span>
                    {t.text}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </section>

      </main>
    </PageLayout>
  );
}
