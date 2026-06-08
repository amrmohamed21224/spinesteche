import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";
import { PageLayout } from "../../components/layout/PageLayout";
import { seo } from "../../lib/seo";
import { Container } from "../../components/layout/Container";
import { Grid } from "../../components/layout/Grid";
import { Section } from "../../components/layout/Section";
import { useTranslation } from "../../i18n";

export const Route = createFileRoute("/careers/")({
  head: () =>
    seo({
      title: "انضم إلى فريقنا",
      description:
        "تصفح الفرص الوظيفية المتاحة في SpinesTech وابنِ مستقبلك المهني في مجالات تطوير البرمجيات والذكاء الاصطناعي.",
      path: "/careers",
    }),
  component: CareersLandingPage,
});

function CareersLandingPage() {
  const { t, locale } = useTranslation();

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 text-start bg-background">
        {/* Hero */}
        <section
          className="relative min-h-[614px] flex items-center overflow-hidden bg-surface-container-low border-b border-outline-variant/20"
          aria-label="مقدمة التوظيف"
        >
          <div className="absolute inset-0 hero-pattern opacity-60" aria-hidden="true" />
          <Container
            clean
            className="max-w-container-max mx-auto px-margin-desktop w-full relative z-10 grid md:grid-cols-2 gap-gutter items-center py-16"
          >
            <div className="text-right">
              <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-full mb-6 shadow-sm">
                {t("careers.heroBadge")}
              </span>
              <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold leading-tight">
                {t("careers.heroTitle")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl leading-relaxed">
                {t("careers.heroSubtitle")}
              </p>
              <div className="flex flex-wrap gap-4 flex-row-reverse justify-end">
                <Link
                  to="/careers/jobs"
                  className="px-8 py-4 bg-primary text-on-primary rounded-xl font-label-md text-label-md hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 flex items-center gap-2"
                >
                  {t("careers.jobsButton")}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    work
                  </span>
                </Link>
                <Link
                  to="/careers/work-environment"
                  className="px-8 py-4 border-2 border-secondary text-secondary rounded-xl font-label-md text-label-md hover:bg-secondary hover:text-on-secondary hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 flex items-center gap-2"
                >
                  {t("careers.workEnvironmentButton")}
                  <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                    diversity_3
                  </span>
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div
                className="absolute -inset-4 bg-secondary/10 rounded-3xl blur-2xl -z-10"
                aria-hidden="true"
              />
              <img
                className="rounded-3xl shadow-2xl grayscale-[0.2] hover:grayscale-0 transition-all duration-700 object-cover w-full h-[500px] border-4 border-white/50"
                alt="متخصصون سعوديون في مجال التقنية"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALlnEpwMFPEX9boAFbAFv3oiBKNFMDciMEvwSad7SByzcAjvWn4d3zxBezgPYnL8lQTjN1EWKlcpr5VRP0fVLk03E8cx-OTRMxCqx_b0obKR9F5WfmGPMsWS2aBI531vQ4KxjvQBk38VbISPIXIeu06q3lW-VIzhKJhYI-wkw3i4PyANTjO4CUFFw8JqZ1dveNDS54yW220Xo3tGMfGZ2apF_C4ZawjiHa8XVT9CCkIuIk_In4op_Ey4n5sGu3BXEIii_YW7bHvDsf"
                loading="lazy"
              />
            </div>
          </Container>
        </section>

        {/* Quick Info Grid */}
        <Section bg="none" className="py-24">
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid md:grid-cols-2 gap-10">
              <Link
                to="/careers/work-environment"
                className="group relative overflow-hidden bg-primary-container text-on-primary-container rounded-3xl p-10 md:p-14 border border-outline-variant/10 hover:shadow-xl transition-all block"
              >
                <div
                  className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-700"
                  aria-hidden="true"
                />
                <div
                  className="material-symbols-outlined text-6xl text-secondary mb-6"
                  aria-hidden="true"
                >
                  diversity_3
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold mb-4">
                  {locale === "ar" ? "بيئة العمل والثقافة" : "Work Environment & Culture"}
                </h2>
                <p className="font-body-md text-body-md opacity-90 mb-8 max-w-md">
                  {locale === "ar"
                    ? "اكتشف كيف نبني بيئة عمل تدعم الابتكار، التعلم المستمر، والمرونة. نحن نركز على المخرجات وليس ساعات العمل."
                    : "Discover how we build a work environment that supports innovation, continuous learning, and flexibility."}
                </p>
                <div className="inline-flex items-center gap-2 text-secondary font-bold group-hover:translate-x-[-8px] transition-transform">
                  {locale === "ar" ? "استكشف بيئة العمل" : "Explore Culture"}
                  <span className="material-symbols-outlined scale-x-[-1]" aria-hidden="true">
                    arrow_forward
                  </span>
                </div>
              </Link>

              <Link
                to="/careers/jobs"
                className="group relative overflow-hidden bg-surface-container-lowest text-on-surface rounded-3xl p-10 md:p-14 border border-outline-variant/30 hover:border-secondary/50 hover:shadow-xl transition-all block"
              >
                <div
                  className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10 group-hover:scale-150 transition-transform duration-700"
                  aria-hidden="true"
                />
                <div
                  className="material-symbols-outlined text-6xl text-primary mb-6"
                  aria-hidden="true"
                >
                  work
                </div>
                <h2 className="font-headline-lg text-headline-lg font-bold mb-4">
                  {locale === "ar" ? "الوظائف المتاحة" : "Available Openings"}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant mb-8 max-w-md">
                  {locale === "ar"
                    ? "هل أنت مستعد للتحدي؟ تصفح الوظائف الشاغرة في مجالات تطوير البرمجيات، الذكاء الاصطناعي، المبيعات والمزيد وانضم إلينا."
                    : "Ready for a challenge? Browse open positions in software development, AI, sales, and more."}
                </p>
                <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:translate-x-[-8px] transition-transform">
                  {locale === "ar" ? "تصفح الوظائف المتاحة" : "Browse Jobs"}
                  <span className="material-symbols-outlined scale-x-[-1]" aria-hidden="true">
                    arrow_forward
                  </span>
                </div>
              </Link>
            </div>
          </Container>
        </Section>
      </main>
    </PageLayout>
  );
}
