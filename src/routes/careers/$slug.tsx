import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../../components/layout/PageLayout";
import { Container } from "../../components/layout/Container";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getJobBySlug } from "../../lib/api/fetchers";
import { seo } from "../../lib/seo";
import { useTranslation } from "../../i18n";

export const Route = createFileRoute("/careers/$slug")({
  head: () =>
    seo({
      title: "تفاصيل الوظيفة",
      description: "تفاصيل فرصة وظيفية في SpinesTech.",
      path: "/careers",
    }),
  component: CareerDetailPage,
});

function CareerDetailPage() {
  const { slug } = Route.useParams();
  const { t, locale } = useTranslation();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["career-detail", slug, locale],
    queryFn: () => getJobBySlug(slug, locale),
  });

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 text-start">
        <Container
          clean
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop"
        >
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-secondary font-bold mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              {locale === "ar" ? "arrow_forward" : "arrow_back"}
            </span>
            <span>{locale === "ar" ? "العودة إلى الوظائف" : "Back to careers"}</span>
          </Link>

          {isLoading && <StateFeedback type="loading" />}
          {isError && (
            <StateFeedback type="error" message={t("careers.loadError")} onRetry={refetch} />
          )}
          {!isLoading && !isError && !data && (
            <StateFeedback
              type="empty"
              title={locale === "ar" ? "الوظيفة غير موجودة" : "Job not found"}
            />
          )}

          {data && (
            <>
              <section className="grid lg:grid-cols-12 gap-10 items-start mb-16">
                <div className="lg:col-span-8">
                  <span className="inline-flex rounded-full bg-secondary/10 px-4 py-1 text-secondary font-bold mb-5">
                    {data.department}
                  </span>
                  <h1 className="font-display-lg text-display-lg text-primary font-bold mb-6">
                    {data.title}
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                    {data.description}
                  </p>
                </div>
                <aside className="lg:col-span-4 rounded-2xl border border-outline-variant/30 bg-surface-container-lowest p-8 shadow-sm">
                  <dl className="space-y-5">
                    <JobMeta
                      label={locale === "ar" ? "الموقع" : "Location"}
                      value={data.location}
                    />
                    <JobMeta label={locale === "ar" ? "نوع العمل" : "Type"} value={data.type} />
                    <JobMeta
                      label={locale === "ar" ? "الخبرة" : "Experience"}
                      value={data.experience}
                    />
                  </dl>
                  <Link
                    to="/careers"
                    hash="apply-form"
                    className="mt-8 flex w-full items-center justify-center rounded-xl bg-secondary px-6 py-3.5 font-bold text-on-secondary hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  >
                    {t("careers.applyPrimary")}
                  </Link>
                </aside>
              </section>

              <div className="grid md:grid-cols-2 gap-8">
                <InfoList
                  title={locale === "ar" ? "المتطلبات" : "Requirements"}
                  items={data.requirements}
                />
                <InfoList title={locale === "ar" ? "المزايا" : "Benefits"} items={data.benefits} />
              </div>
            </>
          )}
        </Container>
      </main>
    </PageLayout>
  );
}

function JobMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-sm text-on-surface-variant">{label}</dt>
      <dd className="font-bold text-primary">{value}</dd>
    </div>
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
