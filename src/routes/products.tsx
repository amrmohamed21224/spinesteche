import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { PageHeader } from "../components/layout/PageHeader";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getProducts } from "../lib/api/fetchers";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/products")({
  head: () =>
    seo({
      title: "المنتجات الرقمية",
      description:
        "تصفح منتجات SpinesTech: أنظمة ERP، أنظمة إدارة علاقات العملاء CRM، نقاط البيع POS، والمزيد.",
      path: "/products",
    }),
  component: Page,
});

function Page() {
  const { locale } = useTranslation();
  const {
    data: products,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products", locale],
    queryFn: () => getProducts(locale),
  });

  return (
    <PageLayout>
      <main className="pt-32 pb-24 text-right">
        <Container
          clean
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop"
        >
          {/* Hero Header */}
          <PageHeader
            title="منتجاتنا الرقمية"
            description="حلول تقنية متكاملة مصممة لدفع عجلة التحول الرقمي في مؤسستك. نقدم أنظمة جاهزة للاستخدام وقابلة للتخصيص بالكامل لتناسب احتياجات عملك الفريدة، مع الالتزام بالمعايير العالمية والروح السعودية."
          />

          {/* Product Grid */}
          {isLoading && <StateFeedback type="loading" />}
          {isError && (
            <StateFeedback
              type="error"
              message="فشل تحميل قائمة المنتجات المتاحة."
              onRetry={refetch}
            />
          )}
          {!isLoading && !isError && (!products || products.length === 0) && (
            <StateFeedback type="empty" title="لا توجد منتجات لعرضها" />
          )}

          {!isLoading && !isError && products && products.length > 0 && (
            <Grid cols={3}>
              {products.map((product) => {
                const isSpecialized = product.badge === "حلول قطاعية";

                return (
                  <div
                    key={product.id}
                    className={`bg-surface-container-lowest border p-8 rounded-xl flex flex-col h-full hover:shadow-lg transition-all group relative overflow-hidden ${
                      isSpecialized ? "border-secondary/30" : "border-outline-variant"
                    }`}
                  >
                    {isSpecialized && (
                      <div
                        className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-16 translate-x-16"
                        aria-hidden="true"
                      ></div>
                    )}
                    <div className="flex justify-between items-start mb-6">
                      <span
                        className="material-symbols-outlined text-4xl text-secondary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                        aria-hidden="true"
                      >
                        {product.icon}
                      </span>
                      {product.badge && (
                        <span
                          className={`px-3 py-1 rounded-full font-label-md text-label-md ${
                            isSpecialized
                              ? "bg-tertiary-fixed text-on-tertiary-fixed"
                              : "bg-secondary-container text-on-secondary-container"
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-headline-xl text-headline-xl text-primary mb-4 font-bold">
                      {product.title}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-grow">
                      {product.description}
                    </p>
                    <div className="space-y-3 mb-8">
                      {product.features.map((feature, fIdx) => (
                        <div
                          key={fIdx}
                          className="flex items-center gap-2 text-secondary justify-start"
                        >
                          <span className="material-symbols-outlined text-sm" aria-hidden="true">
                            check_circle
                          </span>
                          <span className="font-label-md text-label-md text-on-surface">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-3">
                      <button className="w-full bg-primary text-on-primary py-3 rounded-lg font-label-md text-label-md hover:bg-primary/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                        {product.ctaPrimary}
                      </button>
                      {product.ctaSecondary && (
                        <button className="w-full border border-secondary text-secondary py-3 rounded-lg font-label-md text-label-md hover:bg-secondary/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50">
                          {product.ctaSecondary}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </Grid>
          )}

          {/* Custom Solution CTA */}
          <section className="mt-24 bg-primary-container p-12 rounded-xl text-center relative overflow-hidden">
            <div className="geometric-pattern absolute inset-0 opacity-10" aria-hidden="true"></div>
            <div className="relative z-10">
              <h2 className="font-headline-xl text-headline-xl text-on-primary mb-6 font-bold">
                هل تبحث عن شيء فريد تماماً؟
              </h2>
              <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mx-auto mb-10 opacity-90">
                نحن لا نقدم أنظمة فحسب، بل نبني أصولاً رقمية. إذا كانت رؤيتك تتطلب حلاً برمجياً
                مبتكراً غير مدرج أعلاه، فنحن هنا لتحويلها إلى واقع.
              </p>
              <button className="bg-secondary text-on-secondary px-10 py-4 rounded-lg font-headline-sm text-headline-sm hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2">
                ابدأ رحلة التطوير الخاص
              </button>
            </div>
          </section>
        </Container>
      </main>
    </PageLayout>
  );
}
