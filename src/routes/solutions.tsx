import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { Container } from "../components/layout/Container";
import { StateFeedback } from "../components/layout/StateFeedback";
import { seo } from "../lib/seo";
import { getSectors, getServices } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

type SolutionsSearch = {
  sector?: string;
  need?: string;
};

const copy = {
  ar: {
    eyebrow: "مركز اختيار الحل",
    title: "اختر المسار التقني الأنسب بدل أن تبدأ من صفحة تواصل عامة",
    subtitle:
      "هذه الصفحة تجمع الخدمات والقطاعات في تجربة قرار واحدة: اختر احتياجك، شاهد الحلول المقترحة، ثم انتقل لتفاصيل الخدمة أو عرض السعر.",
    needsTitle: "ما الذي تبحث عنه؟",
    sectorsTitle: "اختر القطاع إن وجد",
    recommendations: "الترشيحات المناسبة",
    quote: "اطلب عرض سعر لهذا المسار",
    consult: "ناقش المسار مع خبير",
    learn: "استكشف التفاصيل",
    all: "كل الحلول",
  },
  en: {
    eyebrow: "Solution finder",
    title: "Choose the right technical path instead of a generic contact page",
    subtitle:
      "This page combines services and sectors into one decision experience: choose the need, review recommendations, then continue to details or quote.",
    needsTitle: "What are you looking for?",
    sectorsTitle: "Choose a sector if relevant",
    recommendations: "Recommended paths",
    quote: "Request a quote for this path",
    consult: "Discuss with an expert",
    learn: "Explore details",
    all: "All solutions",
  },
};

const needs = [
  { id: "software", icon: "code", match: ["software", "web", "mobile", "custom"] },
  { id: "ai", icon: "psychology", match: ["ai", "agent", "automation"] },
  { id: "operations", icon: "hub", match: ["erp", "crm", "systems"] },
  { id: "commerce", icon: "shopping_cart", match: ["ecommerce", "pos", "store"] },
];

const needLabels = {
  ar: {
    software: "منصة أو تطبيق مخصص",
    ai: "ذكاء اصطناعي وأتمتة",
    operations: "ERP / CRM وتشغيل",
    commerce: "تجارة إلكترونية ونقاط بيع",
  },
  en: {
    software: "Custom platform or app",
    ai: "AI and automation",
    operations: "ERP / CRM operations",
    commerce: "Commerce and POS",
  },
};

export const Route = createFileRoute("/solutions")({
  validateSearch: (search): SolutionsSearch => ({
    sector: typeof search.sector === "string" ? search.sector : undefined,
    need: typeof search.need === "string" ? search.need : undefined,
  }),
  head: () =>
    seo({
      title: "مركز اختيار الحلول",
      description: "اختر الحل التقني الأنسب لشركتك عبر مركز حلول SpinesTech.",
      path: "/solutions",
    }),
  component: SolutionsPage,
});

function SolutionsPage() {
  const { locale, dir } = useTranslation();
  const c = copy[locale];
  const search = Route.useSearch();
  const [need, setNeed] = useState(search.need || "software");
  const [sector, setSector] = useState(search.sector || "");

  const {
    data: services,
    isLoading: servicesLoading,
    isError: servicesError,
  } = useQuery({
    queryKey: ["solution-services", locale],
    queryFn: () => getServices(locale),
  });

  const { data: sectors } = useQuery({
    queryKey: ["solution-sectors", locale],
    queryFn: () => getSectors(locale),
  });

  const recommended = useMemo(() => {
    if (!services) return [];
    const selectedNeed = needs.find((item) => item.id === need);
    if (!selectedNeed) return services;
    const matched = services.filter((service) =>
      selectedNeed.match.some((token) =>
        `${service.slug} ${service.icon}`.toLowerCase().includes(token),
      ),
    );
    return matched.length > 0 ? matched : services.slice(0, 4);
  }, [need, services]);

  return (
    <PageLayout>
      <main className="pt-20 text-start" dir={dir}>
        <section className="bg-primary-container py-16 md:py-24 text-on-primary">
          <Container clean className="px-margin-mobile md:px-margin-desktop">
            <div className="max-w-4xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-secondary-fixed/40 px-4 py-2 text-secondary-fixed font-label-md text-label-md">
                <span className="material-symbols-outlined text-[18px]">route</span>
                {c.eyebrow}
              </span>
              <h1 className="mt-7 font-display-lg text-display-lg-mobile md:text-display-lg font-bold leading-tight">
                {c.title}
              </h1>
              <p className="mt-6 max-w-3xl font-body-lg text-body-lg text-on-primary-container">
                {c.subtitle}
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container clean className="px-margin-mobile md:px-margin-desktop">
            <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-8">
              <aside className="space-y-8">
                <div>
                  <h2 className="mb-4 font-headline-lg text-headline-lg font-bold text-primary">
                    {c.needsTitle}
                  </h2>
                  <div className="grid grid-cols-1 gap-3">
                    {needs.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setNeed(item.id)}
                        className={`flex items-center gap-3 rounded-xl border p-4 text-start transition-all hover:-translate-y-1 ${
                          need === item.id
                            ? "border-secondary bg-secondary text-on-secondary"
                            : "border-outline-variant bg-white"
                        }`}
                      >
                        <span className="material-symbols-outlined">{item.icon}</span>
                        <span className="font-bold">{needLabels[locale][item.id]}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="mb-4 font-headline-lg text-headline-lg font-bold text-primary">
                    {c.sectorsTitle}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setSector("")}
                      className={`rounded-full border px-4 py-2 text-sm font-bold ${
                        !sector
                          ? "border-primary bg-primary text-on-primary"
                          : "border-outline-variant bg-white"
                      }`}
                    >
                      {c.all}
                    </button>
                    {sectors?.slice(0, 8).map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setSector(item.slug)}
                        className={`rounded-full border px-4 py-2 text-sm font-bold ${
                          sector === item.slug
                            ? "border-primary bg-primary text-on-primary"
                            : "border-outline-variant bg-white"
                        }`}
                      >
                        {item.title}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>

              <section>
                <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                  <h2 className="font-headline-xl text-headline-xl font-bold text-primary">
                    {c.recommendations}
                  </h2>
                  <Link
                    to="/quote"
                    search={{ service: need, sector, source: "solutions-finder" }}
                    className="inline-flex items-center justify-center rounded-xl bg-secondary px-6 py-3 font-bold text-on-secondary transition-transform hover:-translate-y-1"
                  >
                    {c.quote}
                  </Link>
                </div>

                {servicesLoading && <StateFeedback type="loading" />}
                {servicesError && <StateFeedback type="error" />}
                {!servicesLoading && !servicesError && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {recommended.map((service, index) => (
                      <article
                        key={service.id}
                        className="group rounded-2xl border border-outline-variant bg-surface-container-lowest p-6 shadow-sm transition-all hover:-translate-y-2 hover:shadow-2xl"
                        style={{ transitionDelay: `${index * 35}ms` }}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <span className="material-symbols-outlined text-4xl text-secondary">
                            {service.icon}
                          </span>
                          <span className="rounded-full bg-secondary-container px-3 py-1 text-xs font-bold text-on-secondary-container">
                            {needLabels[locale][need]}
                          </span>
                        </div>
                        <h3 className="mt-6 font-headline-lg text-headline-lg font-bold text-primary">
                          {service.title}
                        </h3>
                        <p className="mt-3 line-clamp-4 text-on-surface-variant">
                          {service.description}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                          <Link
                            to="/services/$slug"
                            params={{ slug: service.slug }}
                            className="rounded-lg bg-primary px-5 py-3 font-bold text-on-primary transition-colors hover:bg-primary/90"
                          >
                            {c.learn}
                          </Link>
                          <Link
                            to="/consultation"
                            search={{ service: service.slug, sector, source: "solutions-card" }}
                            className="rounded-lg border border-secondary px-5 py-3 font-bold text-secondary transition-colors hover:bg-secondary/5"
                          >
                            {c.consult}
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </section>
            </div>
          </Container>
        </section>
      </main>
    </PageLayout>
  );
}
