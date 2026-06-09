import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { PageHeader } from "../components/layout/PageHeader";
import { Section } from "../components/layout/Section";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getPricingPlans, getFaqs } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/pricing")({
  head: () =>
    seo({
      title: "خطط الأسعار",
      description:
        "تصفح خطط أسعار خدمات SpinesTech لتطوير البرمجيات المخصصة، أنظمة ERP، والحلول السحابية.",
      path: "/pricing",
    }),
  component: PricingPage,
});

function PricingPage() {
  const { t, locale } = useTranslation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const {
    data: pricingPlans,
    isLoading: isLoadingPlans,
    isError: isErrorPlans,
    refetch: refetchPlans,
  } = useQuery({
    queryKey: ["pricing-plans", locale],
    queryFn: () => getPricingPlans(locale),
  });

  const {
    data: faqs,
    isLoading: isLoadingFaqs,
    isError: isErrorFaqs,
    refetch: refetchFaqs,
  } = useQuery({
    queryKey: ["faqs", locale],
    queryFn: () => getFaqs(locale),
  });

  // Dynamic icon based on Tier name/type
  const getTierIcon = (name: string) => {
    if (name.includes("ناشئة") || name.includes("الانطلاق")) return "rocket_launch";
    if (name.includes("كبرى") || name.includes("التوسع")) return "psychology";
    return "hub";
  };

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 relative overflow-hidden text-start">
        {/* Background Decorations */}
        <div className="absolute inset-0 grid-pattern pointer-events-none" aria-hidden="true"></div>
        <div
          className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10"
          aria-hidden="true"
        ></div>

        <Container clean className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative">
          {/* Hero Header */}
          <PageHeader
            title={t("pricing.headerTitle")}
            description={t("pricing.headerDescription")}
          />

          {/* Pricing Grid */}
          {isLoadingPlans && <StateFeedback type="loading" />}
          {isErrorPlans && (
            <StateFeedback
              type="error"
              message={t("pricing.loadPlansError")}
              onRetry={refetchPlans}
            />
          )}
          {!isLoadingPlans && !isErrorPlans && (!pricingPlans || pricingPlans.length === 0) && (
            <StateFeedback type="empty" title={t("pricing.emptyPlansTitle")} />
          )}

          {!isLoadingPlans && !isErrorPlans && pricingPlans && pricingPlans.length > 0 && (
            <Grid cols={3} className="items-stretch mb-16">
              {pricingPlans.map((plan) => {
                const isRecommended = plan.recommended;
                const priceText = plan.id === "p1" ? "$100" : t("pricing.customQuote");
                const subText = plan.id === "p1" ? t("pricing.startsFromMonthly") : "";

                return (
                  <article
                    key={plan.id}
                    className={`p-8 flex flex-col h-full rounded-xl hover:shadow-lg transition-all duration-300 border text-right relative ${
                      isRecommended
                        ? "bg-primary-container border-secondary/20 shadow-2xl z-10 transform scale-105"
                        : "glass-card border-outline-variant/30 bg-surface-container-lowest"
                    }`}
                  >
                    {isRecommended && (
                      <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-secondary text-on-secondary px-6 py-1 rounded-full font-label-md text-label-md">
                        {t("common.mostPopular")}
                      </div>
                    )}
                    <div className="mb-8">
                      <span
                        className={`material-symbols-outlined text-4xl mb-4 block ${
                          isRecommended ? "text-secondary-fixed" : "text-secondary"
                        }`}
                        aria-hidden="true"
                      >
                        {getTierIcon(plan.name)}
                      </span>
                      <h3
                        className={`font-headline-lg text-headline-lg mb-2 font-bold ${
                          isRecommended ? "text-on-primary" : "text-primary"
                        }`}
                      >
                        {plan.name}
                      </h3>
                      <p
                        className={`font-body-md text-body-md ${
                          isRecommended ? "text-on-primary-container" : "text-on-surface-variant"
                        }`}
                      >
                        {plan.description}
                      </p>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1 flex-row-reverse justify-end">
                        <span
                          className={`font-display-lg text-display-lg font-bold ${
                            isRecommended ? "text-on-primary" : "text-primary"
                          }`}
                        >
                          {priceText}
                        </span>
                        {subText && (
                          <span className="font-label-md text-label-md text-on-surface-variant">
                            {subText}
                          </span>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-4 mb-10 flex-grow">
                      {plan.features.map((feature, fIndex) => (
                        <li
                          key={fIndex}
                          className="flex items-start gap-3 flex-row-reverse text-right"
                        >
                          <span
                            className={`material-symbols-outlined text-sm mt-1 ${
                              isRecommended ? "text-secondary-fixed" : "text-secondary"
                            }`}
                            aria-hidden="true"
                          >
                            check_circle
                          </span>
                          <span
                            className={`font-body-md text-body-md ${
                              isRecommended ? "text-on-primary" : "text-on-surface"
                            }`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to="/quote"
                      search={{ plan: plan.id, source: "pricing-card" }}
                      className={`w-full py-4 font-headline-sm text-headline-sm rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                        isRecommended
                          ? "bg-secondary text-on-secondary hover:opacity-90 focus-visible:ring-secondary/50"
                          : "border border-secondary text-secondary hover:bg-secondary/5 focus-visible:ring-secondary/50"
                      }`}
                    >
                      {plan.ctaText}
                    </Link>
                  </article>
                );
              })}
            </Grid>
          )}

          {/* Trust Section */}
          <Section bg="none" noContainer>
            <div className="p-6 sm:p-8 md:p-12 bg-white border border-outline-variant rounded-xl text-center shadow-sm">
              <h2 className="font-headline-xl text-headline-xl mb-8 font-bold text-primary">
                {t("pricing.whyTitle")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                <div className="space-y-2">
                  <div className="text-secondary font-bold text-3xl">99.9%</div>
                  <div className="font-label-md text-label-md text-on-surface-variant">
                    {t("pricing.trust1Label")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-secondary font-bold text-3xl">24/7</div>
                  <div className="font-label-md text-label-md text-on-surface-variant">
                    {t("pricing.trust2Label")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-secondary font-bold text-3xl">ISO</div>
                  <div className="font-label-md text-label-md text-on-surface-variant">
                    {t("pricing.trust3Label")}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-secondary font-bold text-3xl">2030</div>
                  <div className="font-label-md text-label-md text-on-surface-variant">
                    {t("pricing.trust4Label")}
                  </div>
                </div>
              </div>
            </div>
          </Section>

          {/* FAQ Section */}
          <Section bg="none" noContainer>
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="font-headline-xl text-headline-xl mb-12 text-center text-primary font-bold">
                {t("pricing.faqTitle")}
              </h2>

              {isLoadingFaqs && <StateFeedback type="loading" />}
              {isErrorFaqs && (
                <StateFeedback
                  type="error"
                  message={t("pricing.loadFaqError")}
                  onRetry={refetchFaqs}
                />
              )}
              {!isLoadingFaqs && !isErrorFaqs && (!faqs || faqs.length === 0) && (
                <StateFeedback type="empty" message={t("pricing.emptyFaqMessage")} />
              )}

              {!isLoadingFaqs && !isErrorFaqs && faqs && faqs.length > 0 && (
                <div className="space-y-4">
                  {faqs.map((faq, index) => {
                    const isOpen = openFaq === index;
                    return (
                      <div
                        key={faq.id}
                        className="p-6 border border-outline-variant rounded-lg bg-surface hover:bg-white transition-all cursor-pointer shadow-sm text-right"
                        onClick={() => toggleFaq(index)}
                      >
                        <button
                          className="w-full flex justify-between items-center flex-row-reverse text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
                          aria-expanded={isOpen}
                        >
                          <span className="font-headline-sm text-headline-sm text-primary font-medium">
                            {faq.question}
                          </span>
                          <span
                            className={`material-symbols-outlined transform transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            aria-hidden="true"
                          >
                            expand_more
                          </span>
                        </button>
                        {isOpen && (
                          <p className="mt-4 font-body-md text-body-md text-on-surface-variant leading-relaxed transition-all">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </Section>
        </Container>
      </main>
    </PageLayout>
  );
}
