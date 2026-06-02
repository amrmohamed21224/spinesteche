import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../../components/layout/PageLayout";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getServiceBySlug } from "../../lib/api/fetchers";
import { seo } from "../../lib/seo";
import { useTranslation } from "../../i18n";
import { useConsultation } from "../../contexts/ConsultationContext";

export const Route = createFileRoute("/services/$slug")({
  head: () =>
    seo({
      title: "تفاصيل الخدمة",
      description: "تفاصيل خدمات SpinesTech وحلول التحول الرقمي للشركات.",
      path: "/services",
    }),
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const { t, locale } = useTranslation();
  const { openConsultation } = useConsultation();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["service-detail", slug, locale],
    queryFn: () => getServiceBySlug(slug, locale),
  });

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 text-start">
        <Container
          clean
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop"
        >
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-secondary font-bold mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              {locale === "ar" ? "arrow_forward" : "arrow_back"}
            </span>
            <span>{locale === "ar" ? "العودة إلى الخدمات" : "Back to services"}</span>
          </Link>

          {isLoading && <StateFeedback type="loading" />}
          {isError && (
            <StateFeedback type="error" message={t("services.loadError")} onRetry={refetch} />
          )}
          {!isLoading && !isError && !data && (
            <StateFeedback
              type="empty"
              title={locale === "ar" ? "الخدمة غير موجودة" : "Service not found"}
              message={
                locale === "ar"
                  ? "لم نتمكن من العثور على هذه الخدمة."
                  : "We could not find this service."
              }
            />
          )}

          {data && (
            <>
              <section className="grid lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-8">
                  <div className="inline-flex size-16 items-center justify-center rounded-2xl bg-secondary/10 text-secondary mb-6">
                    <span className="material-symbols-outlined text-4xl" aria-hidden="true">
                      {data.icon}
                    </span>
                  </div>
                  <h1 className="font-display-lg text-display-lg text-primary font-bold mb-6">
                    {data.title}
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-3xl">
                    {data.description}
                  </p>
                </div>
                <aside className="lg:col-span-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm">
                  <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-4">
                    {locale === "ar" ? "ابدأ مشروعك" : "Start your project"}
                  </h2>
                  <p className="text-on-surface-variant mb-6">
                    {locale === "ar"
                      ? "احجز مكالمة قصيرة لنحدد الاحتياج ونقترح المسار الأنسب."
                      : "Book a short call to define the need and choose the right path."}
                  </p>
                  <button
                    type="button"
                    onClick={openConsultation}
                    className="w-full rounded-xl bg-secondary px-6 py-3.5 font-bold text-on-secondary hover:bg-secondary/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  >
                    {t("nav.bookConsultation")}
                  </button>
                </aside>
              </section>

              <Section bg="none" noContainer className="mt-20">
                <div className="grid md:grid-cols-2 gap-8">
                  {data.features && data.features.length > 0 && (
                    <InfoList
                      title={locale === "ar" ? "ما الذي نقدمه" : "What we deliver"}
                      items={data.features}
                    />
                  )}
                  {data.details && data.details.length > 0 && (
                    <InfoList
                      title={locale === "ar" ? "تفاصيل التنفيذ" : "Implementation details"}
                      items={data.details}
                    />
                  )}
                </div>
              </Section>
            </>
          )}
        </Container>
      </main>
    </PageLayout>
  );
}

function InfoList({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8">
      <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-6">{title}</h2>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-on-surface-variant">
            <span
              className="material-symbols-outlined text-secondary text-[18px] mt-1"
              aria-hidden="true"
            >
              check_circle
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
