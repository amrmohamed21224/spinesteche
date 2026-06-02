import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
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

function CaseStudyDetailPage() {
  const { slug } = Route.useParams();
  const { t, locale } = useTranslation();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["case-study-detail", slug, locale],
    queryFn: () => getCaseStudyBySlug(slug, locale),
  });

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 text-start">
        <Container
          clean
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop"
        >
          <Link
            to="/case-studies"
            className="inline-flex items-center gap-2 text-secondary font-bold mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              {locale === "ar" ? "arrow_forward" : "arrow_back"}
            </span>
            <span>{locale === "ar" ? "العودة إلى دراسات الحالة" : "Back to case studies"}</span>
          </Link>

          {isLoading && <StateFeedback type="loading" />}
          {isError && (
            <StateFeedback type="error" message={t("caseStudies.loadError")} onRetry={refetch} />
          )}
          {!isLoading && !isError && !data && (
            <StateFeedback
              type="empty"
              title={locale === "ar" ? "دراسة الحالة غير موجودة" : "Case study not found"}
            />
          )}

          {data && (
            <article>
              <div className="grid lg:grid-cols-12 gap-10 items-start mb-14">
                <div className="lg:col-span-7">
                  <span className="inline-flex rounded-full bg-secondary/10 px-4 py-1 text-secondary font-bold mb-5">
                    {data.sector}
                  </span>
                  <h1 className="font-display-lg text-display-lg text-primary font-bold mb-6">
                    {data.title}
                  </h1>
                  <p className="text-on-surface-variant font-body-lg text-body-lg">
                    {locale === "ar" ? "العميل" : "Client"}: {data.client}
                  </p>
                </div>
                {data.image && (
                  <div className="lg:col-span-5">
                    <img
                      src={data.image}
                      alt={data.title}
                      className="w-full rounded-2xl object-cover aspect-[1.35] shadow-xl"
                    />
                  </div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <StoryBlock title={t("caseStudies.challengeLabel")} body={data.challenge} />
                <StoryBlock title={t("caseStudies.solutionLabel")} body={data.solution} />
                <StoryBlock title={t("caseStudies.resultsLabel")} body={data.result} featured />
              </div>

              {data.stats && data.stats.length > 0 && (
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {data.stats.map((stat) => (
                    <div
                      key={`${stat.label}-${stat.value}`}
                      className="rounded-2xl bg-primary-container p-6 text-on-primary"
                    >
                      <div className="font-headline-xl text-headline-xl text-secondary-fixed font-bold">
                        {stat.value}
                      </div>
                      <div className="mt-2 text-on-primary-container">{stat.label}</div>
                    </div>
                  ))}
                </section>
              )}
            </article>
          )}
        </Container>
      </main>
    </PageLayout>
  );
}

function StoryBlock({
  title,
  body,
  featured,
}: {
  title: string;
  body: string;
  featured?: boolean;
}) {
  return (
    <section
      className={`rounded-2xl border p-8 ${
        featured
          ? "border-secondary/40 bg-secondary/10"
          : "border-outline-variant/30 bg-surface-container-lowest"
      }`}
    >
      <h2 className="font-headline-sm text-headline-sm text-primary font-bold mb-4">{title}</h2>
      <p className="text-on-surface-variant leading-relaxed">{body}</p>
    </section>
  );
}
