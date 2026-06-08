import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { PageLayout } from "../../components/layout/PageLayout";
import { Container } from "../../components/layout/Container";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getProductBySlug } from "../../lib/api/fetchers";
import { seo } from "../../lib/seo";
import { useTranslation } from "../../i18n";

export const Route = createFileRoute("/products/$slug")({
  head: () =>
    seo({
      title: "تفاصيل المنتج",
      description: "تفاصيل منتجات SpinesTech وحلول إدارة الأعمال الرقمية.",
      path: "/products",
    }),
  component: ProductDetailPage,
});

// ─── Hook: intersection observer for scroll animations ───────────────────────
function useReveal(threshold = 0.15) {
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

// ─── Component: animated number counter ──────────────────────────────────────
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, visible } = useReveal(0.3);
  useEffect(() => {
    if (!visible) return;
    const duration = 1400;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(current));
    }, duration / steps);
    return () => clearInterval(timer);
  }, [visible, target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Main Page ───────────────────────────────────────────────────────────────
function ProductDetailPage() {
  const { slug } = Route.useParams();
  const { locale } = useTranslation();
  const [activeModule, setActiveModule] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["product-detail", slug, locale],
    queryFn: () => getProductBySlug(slug, locale),
  });

  // Parallax on hero
  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translateY(${y * 0.25}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const highlightsReveal = useReveal();
  const modulesReveal = useReveal();
  const useCasesReveal = useReveal();
  const integrationsReveal = useReveal();
  const ctaReveal = useReveal();

  return (
    <PageLayout>
      <main className="text-start overflow-hidden">
        {/* ── Loading / Error States ── */}
        {isLoading && (
          <div className="pt-32 pb-24">
            <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
              <StateFeedback type="loading" />
            </Container>
          </div>
        )}
        {isError && (
          <div className="pt-32 pb-24">
            <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
              <StateFeedback type="error" message="حدث خطأ في تحميل بيانات المنتج." onRetry={refetch} />
            </Container>
          </div>
        )}
        {!isLoading && !isError && !data && (
          <div className="pt-32 pb-24">
            <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
              <StateFeedback type="empty" title="المنتج غير موجود" message="لم نتمكن من العثور على هذا المنتج." />
            </Container>
          </div>
        )}

        {data && (
          <>
            {/* ═══════════════════════════════════════════════════════
                HERO — dark navy, islamic pattern, floating blobs
            ══════════════════════════════════════════════════════════ */}
            <section className="relative min-h-[90vh] flex items-center bg-primary-container overflow-hidden">
              {/* Parallax BG layer */}
              <div ref={heroRef} className="absolute inset-0 will-change-transform">
                <div className="islamic-pattern absolute inset-0 opacity-[0.04] bg-repeat" style={{ backgroundSize: "280px" }} />
                {/* Gradient blobs */}
                <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(3,109,54,0.18) 0%, transparent 65%)" }} />
                <div className="absolute bottom-[-15%] left-[-8%] w-[500px] h-[500px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(3,109,54,0.10) 0%, transparent 65%)" }} />
                <div className="absolute top-[40%] left-[35%] w-[300px] h-[300px] rounded-full"
                  style={{ background: "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)" }} />
              </div>

              {/* Geometric accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />

              <Container clean className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-32 pb-20">
                {/* Back link */}
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-secondary/80 hover:text-secondary font-label-md text-label-md mb-12 transition-colors group"
                >
                  <span
                    className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-[-2px]"
                    aria-hidden="true"
                  >
                    {locale === "ar" ? "arrow_forward" : "arrow_back"}
                  </span>
                  <span>{locale === "ar" ? "المنتجات" : "Products"}</span>
                </Link>

                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  {/* Left content */}
                  <div className="lg:col-span-7 space-y-8">
                    {/* Badge + icon row */}
                    <div className="flex items-center gap-4 flex-wrap">
                      <div
                        className="flex items-center justify-center w-16 h-16 rounded-2xl border border-secondary/30 bg-secondary/10"
                        style={{ backdropFilter: "blur(8px)" }}
                      >
                        <span className="material-symbols-outlined text-[32px] text-secondary" aria-hidden="true"
                          style={{ fontVariationSettings: "'FILL' 1" }}>
                          {data.icon}
                        </span>
                      </div>
                      {data.badge && (
                        <span className="px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase border border-secondary/30 text-secondary bg-secondary/10"
                          style={{ backdropFilter: "blur(4px)", letterSpacing: "0.12em" }}>
                          {data.badge}
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <h1 className="font-display-lg text-display-lg text-on-primary font-bold leading-tight"
                      style={{ textShadow: "0 2px 40px rgba(0,0,0,0.3)" }}>
                      {data.title}
                    </h1>

                    {/* Tagline */}
                    {data.tagline && (
                      <p className="font-headline-sm text-headline-sm text-secondary font-bold tracking-wide">
                        {data.tagline}
                      </p>
                    )}

                    {/* Description */}
                    <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed max-w-2xl opacity-85">
                      {data.longDescription || data.description}
                    </p>

                    {/* Feature pills */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      {data.features.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/20 bg-secondary/8 text-on-primary text-sm">
                          <span className="material-symbols-outlined text-secondary text-[14px]" aria-hidden="true">check_circle</span>
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4">
                      <Link
                        to="/quote"
                        search={{ product: data.slug, source: "product-detail-hero" }}
                        className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-8 py-4 rounded-xl font-bold text-base hover:bg-secondary/90 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-secondary/20"
                      >
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">rocket_launch</span>
                        {data.ctaPrimary}
                      </Link>
                      <Link
                        to="/consultation"
                        search={{ source: "product-detail-hero" }}
                        className="inline-flex items-center gap-2 border border-on-primary/20 text-on-primary px-8 py-4 rounded-xl font-bold text-base hover:border-secondary/50 hover:text-secondary hover:bg-secondary/5 transition-all"
                        style={{ backdropFilter: "blur(4px)" }}
                      >
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_month</span>
                        {locale === "ar" ? "احجز استشارة مجانية" : "Book a free consultation"}
                      </Link>
                    </div>
                  </div>

                  {/* Right: floating stats card */}
                  <div className="lg:col-span-5 flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-sm">
                      {/* Main stats card */}
                      <div className="rounded-3xl border border-secondary/20 bg-white/5 p-8 space-y-6"
                        style={{ backdropFilter: "blur(20px)", background: "rgba(255,255,255,0.04)" }}>
                        <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                          <span className="text-secondary text-sm font-bold tracking-wider uppercase"
                            style={{ letterSpacing: "0.1em" }}>
                            {locale === "ar" ? "لماذا SpinesTech" : "Why SpinesTech"}
                          </span>
                        </div>
                        {[
                          { value: 98, suffix: "%", label: locale === "ar" ? "رضا العملاء" : "Customer satisfaction" },
                          { value: 72, suffix: "س", label: locale === "ar" ? "وقت التسليم للتشغيل" : "Go-live time (hrs)" },
                          { value: 24, suffix: "/7", label: locale === "ar" ? "دعم تقني متواصل" : "Technical support" },
                        ].map((stat, i) => (
                          <div key={i} className="flex items-end justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                            <span className="text-on-primary/60 text-sm">{stat.label}</span>
                            <span className="text-3xl font-bold text-secondary">
                              <Counter target={stat.value} suffix={stat.suffix} />
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Floating badge */}
                      <div className="absolute -top-4 -right-4 bg-secondary text-on-secondary px-4 py-2 rounded-2xl text-xs font-bold shadow-lg shadow-secondary/30 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[14px]" aria-hidden="true">verified</span>
                        {locale === "ar" ? "معتمد في السوق السعودي" : "Saudi market certified"}
                      </div>
                    </div>
                  </div>
                </div>
              </Container>

              {/* Bottom wave divider */}
              <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden">
                <svg viewBox="0 0 1440 64" preserveAspectRatio="none" className="w-full h-full" fill="var(--color-background)">
                  <path d="M0,64 C360,0 1080,64 1440,32 L1440,64 Z" />
                </svg>
              </div>
            </section>

            {/* ═══════════════════════════════════════════════════════
                HIGHLIGHTS — 4 cards with icon, stagger animation
            ══════════════════════════════════════════════════════════ */}
            {data.highlights && data.highlights.length > 0 && (
              <section className="py-24 bg-background">
                <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                  <div ref={highlightsReveal.ref} className="space-y-16">
                    <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${highlightsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4">
                        {locale === "ar" ? "المزايا الرئيسية" : "Key Highlights"}
                      </span>
                      <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
                        {locale === "ar" ? "ما يجعل النظام فارقاً" : "What makes it different"}
                      </h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {data.highlights.map((h, i) => (
                        <div
                          key={i}
                          className={`group relative rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-7 overflow-hidden
                            hover:border-secondary/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-500
                            ${highlightsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                          style={{ transitionDelay: `${i * 100}ms` }}
                        >
                          {/* Accent top border on hover */}
                          <div className="absolute top-0 left-0 right-0 h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right" />

                          {/* Icon */}
                          <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-5 group-hover:bg-secondary/20 transition-colors">
                            <span className="material-symbols-outlined text-[22px] text-secondary" aria-hidden="true"
                              style={{ fontVariationSettings: "'FILL' 1" }}>
                              {h.icon}
                            </span>
                          </div>

                          <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-3">{h.title}</h3>
                          <p className="text-on-surface-variant text-sm leading-relaxed">{h.body}</p>

                          {/* Number indicator */}
                          <div className="absolute bottom-4 left-4 text-7xl font-black text-outline-variant/10 select-none leading-none" aria-hidden="true">
                            {String(i + 1).padStart(2, "0")}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Container>
              </section>
            )}

            {/* ═══════════════════════════════════════════════════════
                MODULES — interactive tab + description panel
            ══════════════════════════════════════════════════════════ */}
            {data.modules && data.modules.length > 0 && (
              <section className="py-24 bg-surface-container-low">
                <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                  <div ref={modulesReveal.ref} className="space-y-12">
                    <div className={`text-center max-w-2xl mx-auto transition-all duration-700 ${modulesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-bold mb-4">
                        {locale === "ar" ? "وحدات النظام" : "System Modules"}
                      </span>
                      <h2 className="font-headline-xl text-headline-xl text-primary font-bold">
                        {locale === "ar" ? "كل ما تحتاجه في منظومة واحدة" : "Everything you need in one system"}
                      </h2>
                    </div>

                    <div className={`grid lg:grid-cols-12 gap-8 items-start transition-all duration-700 delay-200 ${modulesReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                      {/* Module tabs */}
                      <div className="lg:col-span-4 space-y-2">
                        {data.modules.map((mod, i) => (
                          <button
                            key={i}
                            onClick={() => setActiveModule(i)}
                            className={`w-full text-start px-5 py-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group
                              ${activeModule === i
                                ? "bg-primary-container border-secondary/30 text-on-primary"
                                : "bg-surface-container-lowest border-outline-variant/30 text-on-surface hover:border-secondary/20 hover:bg-secondary/5"
                              }`}
                          >
                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors
                              ${activeModule === i ? "bg-secondary/20" : "bg-surface-container group-hover:bg-secondary/10"}`}>
                              <span className={`material-symbols-outlined text-[18px] ${activeModule === i ? "text-secondary" : "text-on-surface-variant"}`}
                                aria-hidden="true" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {mod.icon}
                              </span>
                            </div>
                            <span className={`font-bold text-sm ${activeModule === i ? "text-on-primary" : "text-on-surface"}`}>
                              {mod.title}
                            </span>
                            {activeModule === i && (
                              <span className="material-symbols-outlined text-secondary text-[16px] mr-auto" aria-hidden="true">
                                {locale === "ar" ? "arrow_back_ios" : "arrow_forward_ios"}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>

                      {/* Module detail panel */}
                      <div className="lg:col-span-8">
                        <div className="rounded-3xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden min-h-[320px]">
                          {/* Header */}
                          <div className="bg-primary-container px-8 py-6 flex items-center gap-5">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
                              <span className="material-symbols-outlined text-[28px] text-secondary" aria-hidden="true"
                                style={{ fontVariationSettings: "'FILL' 1" }}>
                                {data.modules[activeModule].icon}
                              </span>
                            </div>
                            <div>
                              <div className="text-secondary text-xs font-bold tracking-widest uppercase mb-1">
                                {locale === "ar" ? `الوحدة ${activeModule + 1} من ${data.modules.length}` : `Module ${activeModule + 1} of ${data.modules.length}`}
                              </div>
                              <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                                {data.modules[activeModule].title}
                              </h3>
                            </div>
                          </div>

                          {/* Body */}
                          <div className="p-8 space-y-6">
                            <p className="text-on-surface-variant leading-relaxed text-base">
                              {data.modules[activeModule].description}
                            </p>

                            <div className="flex flex-wrap gap-3">
                              {(data.techSpecs || []).slice(0, 3).map((spec, i) => (
                                <span key={i} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/8 border border-secondary/15 text-on-surface text-xs">
                                  <span className="material-symbols-outlined text-secondary text-[12px]" aria-hidden="true">check</span>
                                  {spec}
                                </span>
                              ))}
                            </div>

                            <div className="flex gap-3 pt-2">
                              <Link
                                to="/quote"
                                search={{ product: data.slug, source: "product-modules" }}
                                className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-6 py-3 rounded-xl text-sm font-bold hover:bg-secondary/90 transition-colors"
                              >
                                {data.ctaPrimary}
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Container>
              </section>
            )}

            {/* ═══════════════════════════════════════════════════════
                USE CASES + TECH SPECS — split layout
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-background">
              <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div ref={useCasesReveal.ref} className="grid md:grid-cols-2 gap-8">
                  {/* Use cases */}
                  {data.useCases && data.useCases.length > 0 && (
                    <div className={`transition-all duration-700 ${useCasesReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
                      <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 h-full">
                        <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                          <span className="material-symbols-outlined text-[20px] text-secondary" aria-hidden="true">business</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-6">
                          {locale === "ar" ? "من يستخدم هذا النظام؟" : "Who uses this system?"}
                        </h3>
                        <ul className="space-y-4">
                          {data.useCases.map((uc, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-secondary text-[14px]" aria-hidden="true">check</span>
                              </div>
                              <span className="text-on-surface">{uc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Tech specs */}
                  {data.techSpecs && data.techSpecs.length > 0 && (
                    <div className={`transition-all duration-700 delay-150 ${useCasesReveal.visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
                      <div className="rounded-3xl border border-outline-variant/40 bg-surface-container-lowest p-8 h-full">
                        <div className="w-11 h-11 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                          <span className="material-symbols-outlined text-[20px] text-secondary" aria-hidden="true">settings_suggest</span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-primary font-bold mb-6">
                          {locale === "ar" ? "المواصفات التقنية" : "Technical Specifications"}
                        </h3>
                        <ul className="space-y-4">
                          {data.techSpecs.map((spec, i) => (
                            <li key={i} className="flex items-center gap-3">
                              <div className="w-7 h-7 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                                <span className="material-symbols-outlined text-secondary text-[14px]" aria-hidden="true">code</span>
                              </div>
                              <span className="text-on-surface">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </Container>
            </section>

            {/* ═══════════════════════════════════════════════════════
                INTEGRATIONS — pill grid
            ══════════════════════════════════════════════════════════ */}
            {data.integrations && data.integrations.length > 0 && (
              <section className="py-16 bg-surface-container-low">
                <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                  <div ref={integrationsReveal.ref}
                    className={`transition-all duration-700 ${integrationsReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                    <p className="text-center text-on-surface-variant text-sm font-bold uppercase tracking-widest mb-8"
                      style={{ letterSpacing: "0.15em" }}>
                      {locale === "ar" ? "يتكامل مع" : "Integrates with"}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                      {data.integrations.map((intg, i) => (
                        <span
                          key={i}
                          className={`px-5 py-2.5 rounded-full border border-outline-variant/40 bg-surface-container-lowest text-on-surface text-sm font-medium
                            hover:border-secondary/40 hover:text-secondary transition-all duration-300 cursor-default
                            ${integrationsReveal.visible ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
                          style={{ transitionDelay: `${i * 60}ms` }}
                        >
                          {intg}
                        </span>
                      ))}
                    </div>
                  </div>
                </Container>
              </section>
            )}

            {/* ═══════════════════════════════════════════════════════
                CTA — dark navy, full conversion block
            ══════════════════════════════════════════════════════════ */}
            <section className="py-24 bg-primary-container relative overflow-hidden">
              <div className="islamic-pattern absolute inset-0 opacity-[0.04] bg-repeat" style={{ backgroundSize: "240px" }} />
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

              <Container clean className="relative z-10 max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
                <div ref={ctaReveal.ref}
                  className={`max-w-3xl mx-auto text-center space-y-8 transition-all duration-700 ${ctaReveal.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
                  <div className="w-16 h-16 rounded-2xl border border-secondary/30 bg-secondary/10 flex items-center justify-center mx-auto">
                    <span className="material-symbols-outlined text-[32px] text-secondary" aria-hidden="true"
                      style={{ fontVariationSettings: "'FILL' 1" }}>
                      {data.icon}
                    </span>
                  </div>

                  <h2 className="font-display-lg text-display-lg text-on-primary font-bold leading-tight">
                    {locale === "ar" ? `جرّب ${data.title} مجاناً` : `Try ${data.title} for free`}
                  </h2>

                  <p className="font-body-lg text-body-lg text-on-primary-container opacity-80 max-w-xl mx-auto">
                    {locale === "ar"
                      ? "احصل على نسخة تجريبية كاملة مع جلسة إعداد مخصصة وفريق دعم يرافقك من اليوم الأول."
                      : "Get a full trial with a dedicated setup session and a support team from day one."}
                  </p>

                  <div className="flex flex-wrap justify-center gap-4 pt-2">
                    <Link
                      to="/quote"
                      search={{ product: data.slug, source: "product-detail-cta" }}
                      className="inline-flex items-center gap-2 bg-secondary text-on-secondary px-10 py-4 rounded-xl font-bold text-base hover:bg-secondary/90 hover:scale-[1.03] active:scale-[0.98] transition-all shadow-xl shadow-secondary/25"
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">rocket_launch</span>
                      {data.ctaPrimary}
                    </Link>
                    <Link
                      to="/consultation"
                      search={{ source: "product-detail-cta" }}
                      className="inline-flex items-center gap-2 border border-on-primary/20 text-on-primary px-10 py-4 rounded-xl font-bold text-base hover:border-secondary/40 hover:text-secondary transition-all"
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">support_agent</span>
                      {locale === "ar" ? "تحدث مع خبير" : "Talk to an expert"}
                    </Link>
                  </div>

                  {/* Trust indicators */}
                  <div className="flex flex-wrap justify-center gap-6 pt-4 text-on-primary-container opacity-60 text-sm">
                    {[
                      { icon: "lock", text: locale === "ar" ? "بيانات آمنة 100%" : "100% secure data" },
                      { icon: "cancel", text: locale === "ar" ? "بدون التزام مسبق" : "No commitment required" },
                      { icon: "speed", text: locale === "ar" ? "تشغيل خلال 72 ساعة" : "Live in 72 hours" },
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
          </>
        )}
      </main>
    </PageLayout>
  );
}
