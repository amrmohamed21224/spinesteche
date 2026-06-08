import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useRef } from "react";
import { PageLayout } from "../../components/layout/PageLayout";
import { Container } from "../../components/layout/Container";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getCaseStudyBySlug } from "../../lib/api/fetchers";
import { seo } from "../../lib/seo";
import { useTranslation } from "../../i18n";

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

// ── animated counter hook ──────────────────────────────────────────────────
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

// ── stat card with animated number ────────────────────────────────────────
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
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 group hover:bg-white/10 transition-all duration-300"
      style={{
        opacity: started ? 1 : 0,
        transform: started ? "none" : "translateY(20px)",
        transition: `opacity 0.5s ease ${index * 120}ms, transform 0.5s ease ${index * 120}ms, background 0.3s ease`,
      }}
    >
      <div className="absolute top-0 start-0 w-1 h-full bg-secondary rounded-s-2xl" />
      <div className="font-bold text-4xl md:text-5xl text-secondary-fixed mb-2 tabular-nums">
        {prefix}
        {numeric > 0 ? animated : value}
        {numeric > 0 ? suffix : ""}
      </div>
      <div className="text-on-primary/70 font-body-sm text-sm leading-relaxed">{label}</div>
    </div>
  );
}

// ── story section card ─────────────────────────────────────────────────────
function StoryCard({
  icon,
  label,
  body,
  accent,
  index,
  visible,
}: {
  icon: string;
  label: string;
  body: string;
  accent?: boolean;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-7 flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1 ${
        accent
          ? "bg-secondary/15 border border-secondary/30 hover:bg-secondary/20"
          : "bg-surface-container-lowest border border-outline-variant/30 hover:border-outline-variant/60"
      }`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.55s ease ${index * 100}ms, transform 0.55s ease ${index * 100}ms, background 0.3s ease, border-color 0.3s ease, translate 0.3s ease`,
      }}
    >
      <div
        className={`flex size-11 items-center justify-center rounded-xl ${accent ? "bg-secondary/20 text-secondary" : "bg-surface-container text-on-surface-variant"}`}
      >
        <span
          className="material-symbols-outlined text-[22px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          {icon}
        </span>
      </div>
      <div>
        <p
          className={`text-caption font-bold uppercase tracking-wider mb-2 ${accent ? "text-secondary" : "text-on-surface-variant/60"}`}
        >
          {label}
        </p>
        <p
          className={`font-body-md leading-relaxed ${accent ? "text-secondary font-semibold" : "text-on-surface-variant"}`}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

// ── main page ──────────────────────────────────────────────────────────────
function CaseStudyDetailPage() {
  const { slug } = Route.useParams();
  const { t, locale, dir } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["case-study-detail", slug, locale],
    queryFn: () => getCaseStudyBySlug(slug, locale),
  });

  const isAr = locale === "ar";

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">
        {/* ── HERO ── */}
        <section className="relative overflow-hidden bg-primary-container min-h-[72vh] flex items-end">
          <div className="islamic-pattern absolute inset-0 opacity-[0.04]" aria-hidden="true" />

          {/* background image with overlay */}
          {data?.image && (
            <>
              <div
                className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
                style={{ backgroundImage: `url(${data.image})`, opacity: 0.18 }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/80 to-primary-container/40"
                aria-hidden="true"
              />
            </>
          )}

          {/* glow orbs */}
          <div
            className="pointer-events-none absolute -top-40 end-0 w-[600px] h-[600px] rounded-full bg-secondary/10 blur-3xl"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute bottom-0 start-0 w-[300px] h-[300px] rounded-full bg-on-primary/5 blur-3xl"
            aria-hidden="true"
          />

          <Container
            clean
            className="relative z-10 px-margin-mobile md:px-margin-desktop pt-36 pb-16 w-full"
          >
            {/* back link */}
            <div
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(12px)",
                transition: "opacity 0.5s ease 0ms, transform 0.5s ease 0ms",
              }}
            >
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 text-secondary-fixed/80 hover:text-secondary-fixed font-bold mb-10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                  {isAr ? "arrow_forward" : "arrow_back"}
                </span>
                <span>{isAr ? "العودة إلى دراسات الحالة" : "Back to case studies"}</span>
              </Link>
            </div>

            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("caseStudies.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && !data && (
              <StateFeedback
                type="empty"
                title={isAr ? "دراسة الحالة غير موجودة" : "Case study not found"}
              />
            )}

            {data && (
              <div
                className="max-w-4xl"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(22px)",
                  transition: "opacity 0.65s ease 80ms, transform 0.65s ease 80ms",
                }}
              >
                {/* sector badge */}
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/20 border border-secondary/30 px-4 py-1.5 text-secondary-fixed font-bold text-label-md">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                      category
                    </span>
                    {data.sector}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/8 border border-white/15 px-4 py-1.5 text-on-primary/70 font-label-md text-label-md">
                    <span className="material-symbols-outlined text-[15px]" aria-hidden="true">
                      business
                    </span>
                    {data.client}
                  </span>
                </div>

                <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight text-on-primary mb-6">
                  {data.title}
                </h1>

                {/* quick result highlight */}
                <div className="inline-flex items-start gap-3 rounded-2xl border border-secondary/25 bg-secondary/12 backdrop-blur-sm px-5 py-4 max-w-2xl">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-secondary/20 text-secondary-fixed mt-0.5">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                      aria-hidden="true"
                    >
                      emoji_events
                    </span>
                  </span>
                  <div>
                    <p className="text-caption font-bold text-secondary-fixed/60 uppercase tracking-wider mb-1">
                      {t("caseStudies.resultsLabel")}
                    </p>
                    <p className="font-bold text-secondary-fixed leading-snug">{data.result}</p>
                  </div>
                </div>
              </div>
            )}
          </Container>
        </section>

        {/* ── STATS ── */}
        {data?.stats && data.stats.length > 0 && (
          <section
            ref={statsRef}
            className="bg-primary-container border-t border-white/8 py-10 px-margin-mobile md:px-margin-desktop"
          >
            <Container clean>
              <div
                className={`grid gap-4 ${data.stats.length === 2 ? "grid-cols-2 max-w-md" : data.stats.length === 3 ? "grid-cols-3 max-w-xl" : "grid-cols-2 md:grid-cols-4"}`}
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

        {/* ── STORY SECTION ── */}
        {data && (
          <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-background">
            <Container clean>
              {/* section title */}
              <div
                className="mb-12"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(16px)",
                  transition: "opacity 0.6s ease 200ms, transform 0.6s ease 200ms",
                }}
              >
                <h2 className="font-headline-lg text-headline-lg font-bold text-primary mb-2">
                  {isAr ? "تفاصيل المشروع" : "Project details"}
                </h2>
                <div className="w-14 h-1 rounded-full bg-secondary" />
              </div>

              <div className="grid md:grid-cols-3 gap-5">
                <StoryCard
                  icon="report_problem"
                  label={t("caseStudies.challengeLabel")}
                  body={data.challenge}
                  index={0}
                  visible={visible}
                />
                <StoryCard
                  icon="lightbulb"
                  label={t("caseStudies.solutionLabel")}
                  body={data.solution}
                  index={1}
                  visible={visible}
                />
                <StoryCard
                  icon="trending_up"
                  label={t("caseStudies.resultsLabel")}
                  body={data.result}
                  accent
                  index={2}
                  visible={visible}
                />
              </div>
            </Container>
          </section>
        )}

        {/* ── IMAGE SHOWCASE ── */}
        {data?.image && (
          <section className="pb-16 md:pb-20 px-margin-mobile md:px-margin-desktop">
            <Container clean>
              <div
                className="relative overflow-hidden rounded-3xl shadow-2xl shadow-primary/15"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: "opacity 0.6s ease 350ms, transform 0.6s ease 350ms",
                }}
              >
                <img
                  src={data.image}
                  alt={data.title}
                  className="w-full object-cover aspect-[21/9] md:aspect-[21/8]"
                />
                {/* subtle overlay */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"
                  aria-hidden="true"
                />
              </div>
            </Container>
          </section>
        )}

        {/* ── CTA SECTION ── */}
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
                transition: "opacity 0.65s ease 400ms, transform 0.65s ease 400ms",
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/30 bg-secondary/15 px-4 py-1.5 text-secondary-fixed font-label-md text-label-md mb-6">
                <span className="material-symbols-outlined text-[16px]" aria-hidden="true">
                  handshake
                </span>
                {isAr ? "هل تريد نتيجة مماثلة؟" : "Want similar results?"}
              </span>

              <h2 className="font-display-md text-display-md-mobile md:text-display-md font-bold text-on-primary mb-5">
                {t("caseStudies.ctaTitle")}
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary/75 mb-10">
                {t("caseStudies.ctaSubtitle")}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/consultation"
                  className="flex items-center justify-center gap-2 px-8 py-4 bg-secondary text-on-secondary font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-secondary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                >
                  {t("caseStudies.ctaPrimary")}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    {isAr ? "arrow_back" : "arrow_forward"}
                  </span>
                </Link>
                <Link
                  to="/case-studies"
                  className="flex items-center justify-center gap-2 px-8 py-4 border-2 border-secondary-fixed text-secondary-fixed font-bold rounded-xl transition-all hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
                >
                  {isAr ? "دراسات حالة أخرى" : "More case studies"}
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
