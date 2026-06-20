import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { PageLayout } from "../../components/layout/PageLayout";
import { Container } from "../../components/layout/Container";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getCaseStudyBySlug, getCaseStudies } from "../../lib/api/fetchers";
import { seo } from "../../lib/seo";
import { useTranslation } from "../../i18n";
import type { CMSCaseStudy } from "../../types/cms";

export const Route = createFileRoute("/case-studies/$slug")({
  head: () =>
    seo({
      title: "تفاصيل دراسة الحالة",
      description: "تفاصيل دراسة حالة من مشاريع SpinesTech.",
      path: "/case-studies",
      ogType: "article",
    }),
  component: CaseStudyDetailPage,
});

/* ─── Copy ─── */
const copy = {
  ar: {
    backToCaseStudies: "العودة إلى دراسات الحالة",
    projectDetails: "تفاصيل المشروع",
    challengeLabel: "التحدي",
    solutionLabel: "الحل",
    resultsLabel: "النتائج",
    theChallenge: "التحدي",
    theSolution: "الحل التقني",
    theResults: "النتائج المُنجزة",
    keyMetrics: "المؤشرات الرئيسية",
    visualOverview: "نظرة بصرية",
    relatedCases: "دراسات ذات صلة",
    ctaEyebrow: "هل تريد نتيجة مماثلة؟",
    ctaTitle: "نبدأ مشروعك القادم معاً",
    ctaSubtitle: "فريقنا جاهز لتحليل تحدياتك وتقديم خارطة طريق تقنية واضحة.",
    ctaPrimary: "احجز استشارة مجانية",
    ctaSecondary: "تصفح الحلول",
    viewCaseStudy: "عرض الدراسة",
    loadError: "حدث خطأ أثناء التحميل. جرّب مرة أخرى.",
    notFound: "دراسة الحالة غير موجودة",
  },
  en: {
    backToCaseStudies: "Back to case studies",
    projectDetails: "Project Details",
    challengeLabel: "Challenge",
    solutionLabel: "Solution",
    resultsLabel: "Results",
    theChallenge: "The Challenge",
    theSolution: "Technical Solution",
    theResults: "Achieved Results",
    keyMetrics: "Key Metrics",
    visualOverview: "Visual Overview",
    relatedCases: "Related Case Studies",
    ctaEyebrow: "Want similar results?",
    ctaTitle: "Let's Start Your Next Project",
    ctaSubtitle: "Our team is ready to analyze your challenges and deliver a clear technical roadmap.",
    ctaPrimary: "Book a Free Consultation",
    ctaSecondary: "Explore Solutions",
    viewCaseStudy: "View Case Study",
    loadError: "Failed to load. Please try again.",
    notFound: "Case study not found",
  },
};

/* ─── Counter Hook ─── */
function useCounter(target: number, duration = 1400, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

/* ─── Stat Card ─── */
function StatCard({
  label,
  value,
  index,
  started,
}: {
  label: string;
  value: string;
  index: number;
  started: boolean;
}) {
  const numericMatch = value.match(/[\d.]+/);
  const numeric = numericMatch ? parseFloat(numericMatch[0]) : 0;
  const prefix = value.replace(/[\d.]+.*/, "");
  const suffix = value.replace(/^[^0-9]*[\d.]+/, "");
  const animated = useCounter(numeric, 1400, started);

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-sm p-6 md:p-8 group hover:bg-white/10 transition-all duration-300 text-center"
      style={{
        opacity: started ? 1 : 0.35,
        transform: started ? "none" : "translateY(20px)",
        transition: `opacity 0.55s ease ${index * 120}ms, transform 0.55s ease ${index * 120}ms, background 0.3s ease`,
      }}
    >
      <div className="absolute top-0 start-0 w-full h-1 bg-gradient-to-r from-secondary/60 to-secondary/20 rounded-t-2xl" />
      <div className="font-bold text-3xl md:text-5xl text-secondary-fixed mb-2 tabular-nums tracking-tight">
        {prefix}
        {numeric > 0 ? animated : value}
        {numeric > 0 ? suffix : ""}
      </div>
      <div className="text-on-primary/65 font-body-sm leading-relaxed">{label}</div>
    </div>
  );
}

/* ─── Detail Row ─── */
function DetailRow({
  icon,
  label,
  body,
  variant,
  index,
  visible,
}: {
  icon: string;
  label: string;
  body: string;
  variant: "challenge" | "solution" | "result";
  index: number;
  visible: boolean;
}) {
  const variantStyles = {
    challenge: {
      card: "bg-white border-outline-variant/30",
      iconBg: "bg-error/10 text-error",
      labelColor: "text-error font-bold",
    },
    solution: {
      card: "bg-white border-outline-variant/30",
      iconBg: "bg-secondary/10 text-secondary",
      labelColor: "text-secondary font-bold",
    },
    result: {
      card: "bg-primary-container border-primary/10",
      iconBg: "bg-secondary/20 text-secondary-fixed",
      labelColor: "text-secondary-fixed font-bold",
    },
  };
  const s = variantStyles[variant];

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border ${s.card} p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 100}ms, transform 0.55s ease ${index * 100}ms, box-shadow 0.3s ease, translate 0.3s ease`,
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className={`flex size-12 shrink-0 items-center justify-center rounded-xl ${s.iconBg} transition-transform group-hover:scale-110`}
        >
          <span
            className="material-symbols-outlined text-[24px]"
            style={{ fontVariationSettings: "'FILL' 1" }}
            aria-hidden="true"
          >
            {icon}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className={`text-caption uppercase tracking-wider mb-2 ${s.labelColor}`}>
            {label}
          </p>
          <p
            className={`font-body-md leading-[1.7] ${variant === "result" ? "text-on-primary font-semibold" : "text-on-surface-variant"}`}
          >
            {body}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── Related Card ─── */
function RelatedCard({
  study,
  index,
  visible,
  locale,
}: {
  study: CMSCaseStudy;
  index: number;
  visible: boolean;
  locale: string;
}) {
  return (
    <Link
      to="/case-studies/$slug"
      params={{ slug: study.slug }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant/30 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/8 block"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 80}ms, transform 0.5s ease ${index * 80}ms, box-shadow 0.3s ease`,
      }}
    >
      <div className="relative h-44 overflow-hidden shrink-0 bg-surface-container">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={study.title}
          src={study.image}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" aria-hidden="true" />
        <span className="absolute top-3 end-3 rounded-lg bg-secondary/90 backdrop-blur-sm text-on-secondary px-3 py-1 text-caption font-bold shadow-md">
          {study.sector}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-headline-sm text-headline-sm text-primary font-bold leading-snug mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
          {study.title}
        </h3>
        <p className="font-body-sm text-on-surface-variant line-clamp-2 leading-relaxed flex-1 mb-3">
          {study.challenge}
        </p>
        <div className="flex items-center gap-1.5 text-secondary font-bold text-label-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>{locale === "ar" ? "عرض الدراسة" : "View case study"}</span>
          <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
            {locale === "ar" ? "arrow_back" : "arrow_forward"}
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Main Page ─── */
function CaseStudyDetailPage() {
  const { slug } = Route.useParams();
  const { t, locale, dir } = useTranslation();
  const c = copy[locale];
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["case-study-detail", slug, locale],
    queryFn: () => getCaseStudyBySlug(slug, locale),
  });

  // Observe the stats section once it actually exists in the DOM (after data loads).
  useEffect(() => {
    if (!data?.stats || data.stats.length === 0) return;

    const el = statsRef.current;
    if (!el) {
      // section not mounted yet on this tick — reveal on a short delay as a safe default
      const t = setTimeout(() => setStatsVisible(true), 600);
      return () => clearTimeout(t);
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" },
    );
    obs.observe(el);

    // safety fallback: reveal stats even if the observer never fires
    const fallback = setTimeout(() => setStatsVisible(true), 1800);

    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, [data]);

  /* Fetch related case studies (all except current) */
  const { data: allStudies } = useQuery({
    queryKey: ["case-studies", locale],
    queryFn: () => getCaseStudies(locale),
    enabled: !!data,
  });

  const related = allStudies?.filter((s) => s.slug !== slug).slice(0, 3) ?? [];

  const isAr = locale === "ar";

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">
        {/* ═══════════════ HERO — Light BG (Navbar visible) ═══════════════ */}
        <section className="relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-24 px-margin-mobile md:px-margin-desktop">
          {/* Decorative */}
          <div className="islamic-pattern absolute inset-0 opacity-[0.02]" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -top-32 end-0 w-[480px] h-[480px] rounded-full bg-secondary/8 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 start-0 w-[300px] h-[300px] rounded-full bg-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <Container clean className="relative z-10">
            {/* Back link */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(12px)",
                transition: "opacity 0.5s ease, transform 0.5s ease",
              }}
            >
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-secondary hover:text-secondary/80 font-bold mb-8 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-lg px-1 py-0.5 hover:bg-secondary/5"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {isAr ? "arrow_forward" : "arrow_back"}
                </span>
                <span>{c.backToCaseStudies}</span>
              </Link>
            </div>

            {isLoading && <StateFeedback type="loading" />}
            {isError && <StateFeedback type="error" message={c.loadError} onRetry={refetch} />}
            {!isLoading && !isError && !data && (
              <StateFeedback type="empty" title={c.notFound} />
            )}

            {data && (
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(18px)",
                  transition: "opacity 0.65s ease 80ms, transform 0.65s ease 80ms",
                }}
              >
                {/* Eyebrow row */}
                <div className="flex flex-wrap items-center gap-3 mb-5">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 border border-secondary/20 px-4 py-1.5 text-secondary font-bold text-label-md">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                      category
                    </span>
                    {data.sector}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-container border border-outline-variant/30 px-4 py-1.5 text-on-surface-variant font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                      business
                    </span>
                    {data.client}
                  </span>
                </div>

                {/* Title */}
                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-[1.1] text-primary mb-6 max-w-3xl">
                  {data.title}
                </h1>

                {/* Result highlight card */}
                <div className="inline-flex items-start gap-4 rounded-2xl border border-secondary/20 bg-secondary/5 px-6 py-5 max-w-2xl">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/15 text-secondary mt-0.5">
                    <span
                      className="material-symbols-outlined text-[20px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      emoji_events
                    </span>
                  </span>
                  <div>
                    <p className="text-caption font-bold text-secondary/70 uppercase tracking-wider mb-1">
                      {c.resultsLabel}
                    </p>
                    <p className="font-bold text-secondary leading-snug text-lg">{data.result}</p>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* ═══════════════ HERO IMAGE — Behance-style contained showcase ═══════════════ */}
        {data?.image && (
          <section className="px-margin-mobile md:px-margin-desktop pb-16 md:pb-24">
            <Container clean>
              <div
                className="relative overflow-hidden rounded-3xl shadow-xl shadow-primary/10 border border-outline-variant/20"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: "opacity 0.7s ease 200ms, transform 0.7s ease 200ms",
                }}
              >
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full object-cover aspect-[4/3] sm:aspect-[16/10] md:aspect-[2/1] max-h-[640px]"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary-container/30 via-transparent to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </Container>
          </section>
        )}

        {/* ═══════════════ STATS ═══════════════ */}
        {data?.stats && data.stats.length > 0 && (
          <section
            ref={statsRef}
            className="relative bg-primary-container border-y border-white/8 py-16 md:py-24 px-margin-mobile md:px-margin-desktop overflow-hidden"
          >
            <div className="islamic-pattern absolute inset-0 opacity-[0.03]" aria-hidden="true" />
            <div
              className="pointer-events-none absolute top-0 end-0 w-72 h-72 rounded-full bg-secondary/10 blur-3xl"
              aria-hidden="true"
            />

            <Container clean className="relative z-10">
              <h2
                className="text-center font-headline-lg text-headline-lg font-bold text-on-primary mb-10"
                style={{
                  opacity: statsVisible ? 1 : 0.35,
                  transform: statsVisible ? "none" : "translateY(12px)",
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                }}
              >
                {c.keyMetrics}
              </h2>
              <div
                className={`grid gap-4 md:gap-6 mx-auto ${
                  data.stats.length === 1
                    ? "grid-cols-1 max-w-xs"
                    : data.stats.length === 2
                      ? "grid-cols-2 max-w-lg"
                      : data.stats.length === 3
                        ? "grid-cols-3 max-w-2xl"
                        : "grid-cols-2 md:grid-cols-4"
                }`}
              >
                {data.stats.map((stat, i) => (
                  <StatCard
                    key={`${stat.label}-${i}`}
                    label={stat.label}
                    value={stat.value}
                    index={i}
                    started={statsVisible}
                  />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ═══════════════ DETAILS ROWS ═══════════════ */}
        {data && (
          <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-background">
            <Container clean>
              {/* Section title */}
              <div
                className="mb-10 md:mb-14"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(16px)",
                  transition: "opacity 0.6s ease 200ms, transform 0.6s ease 200ms",
                }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    folder_open
                  </span>
                  {c.projectDetails}
                </span>
                <div className="w-16 h-1 rounded-full bg-secondary" />
              </div>

              <div className="space-y-5">
                <DetailRow
                  icon="report_problem"
                  label={c.theChallenge}
                  body={data.challenge}
                  variant="challenge"
                  index={0}
                  visible={visible}
                />
                <DetailRow
                  icon="lightbulb"
                  label={c.theSolution}
                  body={data.solution}
                  variant="solution"
                  index={1}
                  visible={visible}
                />
                <DetailRow
                  icon="trending_up"
                  label={c.theResults}
                  body={data.result}
                  variant="result"
                  index={2}
                  visible={visible}
                />
              </div>
            </Container>
          </section>
        )}

        {/* ═══════════════ META INFO BAR (year, duration, team, tools) ═══════════════ */}
        {data && (data.year || data.duration || data.teamSize || (data.tools && data.tools.length > 0)) && (
          <section className="px-margin-mobile md:px-margin-desktop pb-16 md:pb-24 -mt-4">
            <Container clean>
              <div
                className="rounded-2xl border border-outline-variant/30 bg-white shadow-sm p-6 md:p-8"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(16px)",
                  transition: "opacity 0.6s ease 250ms, transform 0.6s ease 250ms",
                }}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {data.year && (
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">calendar_today</span>
                      </span>
                      <div>
                        <p className="text-caption text-on-surface-variant">{isAr ? "السنة" : "Year"}</p>
                        <p className="font-bold text-primary text-[14px]">{data.year}</p>
                      </div>
                    </div>
                  )}
                  {data.duration && (
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">schedule</span>
                      </span>
                      <div>
                        <p className="text-caption text-on-surface-variant">{isAr ? "المدة" : "Duration"}</p>
                        <p className="font-bold text-primary text-[14px]">{data.duration}</p>
                      </div>
                    </div>
                  )}
                  {data.teamSize && (
                    <div className="flex items-center gap-3">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">group</span>
                      </span>
                      <div>
                        <p className="text-caption text-on-surface-variant">{isAr ? "الفريق" : "Team"}</p>
                        <p className="font-bold text-primary text-[14px]">{data.teamSize}</p>
                      </div>
                    </div>
                  )}
                  {data.tools && data.tools.length > 0 && (
                    <div className="flex items-center gap-3 col-span-2 md:col-span-1">
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                        <span className="material-symbols-outlined text-[18px]" aria-hidden="true">construction</span>
                      </span>
                      <div className="min-w-0">
                        <p className="text-caption text-on-surface-variant">{isAr ? "الأدوات" : "Tools"}</p>
                        <p className="font-bold text-primary text-[13px] truncate">{data.tools.join(" · ")}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Container>
          </section>
        )}

        {/* ═══════════════ GALLERY — Behance-style showcase ═══════════════ */}
        {data?.gallery && data.gallery.length > 0 && (
          <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest">
            <Container clean>
              <div
                className="mb-10"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(16px)",
                  transition: "opacity 0.6s ease 300ms, transform 0.6s ease 300ms",
                }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">photo_library</span>
                  {c.visualOverview}
                </span>
                <div className="w-16 h-1 rounded-full bg-secondary" />
              </div>

              <div className="space-y-6">
                {data.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden rounded-3xl border border-outline-variant/20 shadow-lg shadow-primary/5"
                    style={{
                      opacity: visible ? 1 : 0,
                      transform: visible ? "none" : "translateY(24px)",
                      transition: `opacity 0.6s ease ${350 + i * 120}ms, transform 0.6s ease ${350 + i * 120}ms`,
                    }}
                  >
                    <img
                      src={img}
                      alt={`${data.title} — ${i + 1}`}
                      className="w-full object-cover aspect-[4/3] sm:aspect-[16/10] md:aspect-[2/1] max-h-[640px]"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

            </Container>
          </section>
        )}

        {/* ═══════════════ TAGS ═══════════════ */}
        {data?.tags && data.tags.length > 0 && (
          <section className="px-margin-mobile md:px-margin-desktop pb-16 md:pb-20 bg-surface-container-lowest">
            <Container clean>
              <div
                className="flex flex-wrap gap-2"
                style={{
                  opacity: visible ? 1 : 0,
                  transition: "opacity 0.6s ease 500ms",
                }}
              >
                {data.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-white border border-outline-variant/40 px-4 py-2 text-on-surface font-bold text-caption shadow-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ═══════════════ RELATED CASE STUDIES ═══════════════ */}
        {related.length > 0 && (
          <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-surface-container-low border-t border-outline-variant/20">
            <Container clean>
              <div
                className="mb-10 md:mb-12"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(16px)",
                  transition: "opacity 0.6s ease 250ms, transform 0.6s ease 250ms",
                }}
              >
                <span className="inline-flex items-center gap-2 rounded-full border border-secondary/20 bg-secondary/5 px-4 py-1.5 text-secondary font-label-md text-label-md mb-4">
                  <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                    collections
                  </span>
                  {c.relatedCases}
                </span>
                <div className="w-16 h-1 rounded-full bg-secondary" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map((study, i) => (
                  <RelatedCard
                    key={study.id}
                    study={study}
                    index={i}
                    visible={visible}
                    locale={locale}
                  />
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* ═══════════════ CTA ═══════════════ */}
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
            <div
              className="relative z-10 flex flex-col items-center text-center max-w-2xl mx-auto"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(20px)",
                transition: "opacity 0.65s ease 350ms, transform 0.65s ease 350ms",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/30 bg-secondary/15 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  handshake
                </span>
                {c.ctaEyebrow}
              </span>

              <h2 className="font-display-md text-display-md-mobile md:text-display-md font-bold text-on-primary mb-5">
                {c.ctaTitle}
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/75 mb-10">
                {c.ctaSubtitle}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/consultation"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-on-secondary font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {c.ctaPrimary}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {isAr ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>
                <Link
                  to="/case-studies"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary-fixed text-secondary-fixed font-bold rounded-xl transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  {c.ctaSecondary}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {isAr ? "arrow_back" : "arrow_forward"}
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
