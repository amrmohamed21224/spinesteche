import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../../components/layout/PageLayout";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { seo } from "../../lib/seo";
import { useTranslation } from "../../i18n";
import { getSectors } from "../../lib/api/fetchers";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/sectors/$slug")({
  head: () =>
    seo({
      title: "تفاصيل القطاع",
      description: "تفاصيل القطاع من SpinesTech",
    }),
  component: SectorDetailPage,
});

function SectorDetailPage() {
  const { slug } = Route.useParams();
  const { t, locale, dir } = useTranslation();
  const [visible, setVisible] = useState(false);

  const {
    data: sector,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["sector", slug, locale],
    queryFn: async () => {
      const sectors = await getSectors(locale);
      return sectors.find((s) => s.slug === slug) || null;
    },
  });

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <PageLayout>
        <main className="min-h-screen pt-32 pb-24 bg-background">
          <Container clean>
            <StateFeedback type="loading" />
          </Container>
        </main>
      </PageLayout>
    );
  }

  if (isError || !sector) {
    return (
      <PageLayout>
        <main className="min-h-screen pt-32 pb-24 bg-background">
          <Container clean>
            <StateFeedback
              type="empty"
              message={locale === "ar" ? "لم يتم العثور على القطاع" : "Sector not found"}
            />
          </Container>
        </main>
      </PageLayout>
    );
  }

  // Generic mock data for the detail page to look rich
  const solutions = [
    {
      icon: "insights",
      title: locale === "ar" ? "تحليلات متقدمة" : "Advanced Analytics",
      desc:
        locale === "ar"
          ? "قرارات مبنية على البيانات لتعزيز الأداء والنمو."
          : "Data-driven decisions to boost performance.",
    },
    {
      icon: "cloud_sync",
      title: locale === "ar" ? "بنية سحابية موثوقة" : "Reliable Cloud",
      desc:
        locale === "ar"
          ? "أنظمة تعمل بكفاءة عالية على مدار الساعة بلا توقف."
          : "High-availability systems running 24/7.",
    },
    {
      icon: "security",
      title: locale === "ar" ? "أمان سيبراني متكامل" : "Integrated Security",
      desc:
        locale === "ar"
          ? "حماية تامة لبياناتك وعملائك من التهديدات الحديثة."
          : "Total protection for your data and customers.",
    },
  ];

  return (
    <PageLayout>
      <main dir={dir} className="min-h-screen bg-background">
        {/* ───── GRAND HERO SECTION ───── */}
        <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-surface-container-lowest border-b border-outline-variant/30">
          <div className="absolute inset-0 pattern-bg opacity-5" aria-hidden="true" />

          {sector.image && (
            <div className="absolute inset-0 z-0">
              <img
                src={sector.image}
                alt=""
                className="w-full h-full object-cover opacity-[0.03] scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-surface-container-lowest via-surface-container-lowest/80 to-surface-container-lowest" />
            </div>
          )}

          <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-40 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

          <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <Link
              to="/sectors"
              className="inline-flex items-center gap-2 text-secondary font-bold mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1 hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                {locale === "ar" ? "arrow_forward" : "arrow_back"}
              </span>
              <span>{locale === "ar" ? "العودة للقطاعات" : "Back to Sectors"}</span>
            </Link>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "none" : "translateY(20px)",
                  transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div className="inline-flex items-center justify-center size-20 rounded-2xl bg-secondary/10 text-secondary mb-8 shadow-sm border border-secondary/20">
                  <span className="material-symbols-outlined text-[40px]">{sector.icon}</span>
                </div>

                <h1 className="font-display-xl text-[3rem] lg:text-[4rem] font-bold leading-tight text-primary mb-6">
                  {sector.title}
                </h1>

                <p className="font-body-xl text-2xl text-on-surface-variant leading-relaxed mb-10 max-w-2xl">
                  {sector.description}
                </p>

                {sector.tags && sector.tags.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-10">
                    {sector.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-full bg-surface text-primary border border-outline-variant/30 font-label-md shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {sector.image && (
                <div
                  className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/20"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "scale(0.95)",
                    transition: "all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
                  }}
                >
                  <img
                    src={sector.image}
                    alt={sector.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent mix-blend-overlay" />
                </div>
              )}
            </div>
          </Container>
        </section>

        {/* ───── FEATURES SECTION ───── */}
        <Section className="py-24 bg-white relative overflow-hidden" bg="none" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="font-display-md text-[2.5rem] font-bold text-primary mb-6">
                {locale === "ar" ? "كيف نحدث فرقاً في هذا القطاع؟" : "How we make a difference"}
              </h2>
              <p className="font-body-lg text-lg text-on-surface-variant">
                {locale === "ar"
                  ? "نقدم مجموعة من الحلول المتكاملة التي تضمن تفوقك التقني وتلبية طموحات رؤية 2030."
                  : "We offer integrated solutions ensuring your technical superiority."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {solutions.map((sol, i) => (
                <div
                  key={i}
                  className="group p-5 sm:p-8 md:p-10 rounded-3xl bg-surface-container-lowest border border-outline-variant/40 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="size-16 rounded-2xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span className="material-symbols-outlined text-[32px]">{sol.icon}</span>
                  </div>
                  <h3 className="font-headline-md text-xl font-bold text-primary mb-4">
                    {sol.title}
                  </h3>
                  <p className="font-body-md text-on-surface-variant leading-relaxed">{sol.desc}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* ───── CTA SECTION ───── */}
        <section className="py-16 md:py-24 px-margin-mobile md:px-margin-desktop bg-primary text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 islamic-pattern opacity-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/95" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <div className="inline-flex size-20 rounded-full bg-white/10 items-center justify-center mb-8 backdrop-blur-md border border-white/20">
              <span className="material-symbols-outlined text-[40px] text-white">
                rocket_launch
              </span>
            </div>
            <h2 className="font-display-md text-4xl lg:text-5xl font-bold mb-6">
              {locale === "ar" ? "جاهز للارتقاء بأعمالك؟" : "Ready to elevate your business?"}
            </h2>
            <p className="font-body-lg text-xl text-white/80 mb-10 max-w-xl leading-relaxed">
              {locale === "ar"
                ? "تواصل معنا اليوم لتصميم حلول تقنية مخصصة تناسب احتياجات قطاعك بدقة."
                : "Contact us today for custom tech solutions."}
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 px-5 sm:px-8 md:px-10 py-4 md:py-5 rounded-2xl bg-secondary text-on-secondary font-bold text-lg hover:bg-white hover:text-primary hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
            >
              {locale === "ar" ? "احجز استشارة مجانية" : "Book Free Consultation"}
              <span className="material-symbols-outlined text-[24px]">arrow_forward</span>
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}
