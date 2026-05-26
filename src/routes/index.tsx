import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { Link } from "@tanstack/react-router";
import { seo } from "../lib/seo";
import { Section } from "../components/layout/Section";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getServices, getPricingPlans, getFaqs } from "../lib/api/fetchers";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: "حلول برمجية مخصصة للشركات الطموحة",
      description:
        "SpinesTech - حلول برمجية مخصصة، أنظمة ERP، وذكاء اصطناعي للشركات في السعودية والخليج.",
      path: "/",
    }),
  component: Page,
});

function Page() {
  return (
    <PageLayout>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <SectorsSection />
      <ProcessSection />
      <PricingSection />
      <FaqSection />
    </PageLayout>
  );
}

// 1. Hero Section Component
function HeroSection() {
  return (
    <header className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-margin-mobile md:px-margin-desktop">
      <Container clean>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-right">
          <div className="z-10 order-2 lg:order-1">
            <h1 className="font-display-lg text-display-lg-mobile md:text-display-lg mb-6 leading-tight text-primary font-bold">
              حلول برمجية مخصصة للشركات الطموحة في السعودية والخليج
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-xl">
              نحن شريكك التقني في رحلة التحول الرقمي. نقدم أنظمة ERP متطورة، أتمتة بالذكاء
              الاصطناعي، وتطبيقات مخصصة ترفع من كفاءة أعمالك وتدفع نموك المستقبلي.
            </p>
            <div className="flex flex-wrap gap-4 mb-12 justify-start">
              <button
                className="bg-secondary text-on-secondary px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:bg-secondary-fixed-variant transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2"
                aria-label="احجز استشارة مجانية"
              >
                <span>احجز استشارة مجانية</span>
                <span className="material-symbols-outlined" aria-hidden="true">
                  arrow_back
                </span>
              </button>
              <button
                className="border-2 border-secondary text-secondary px-8 py-4 rounded-xl font-bold hover:bg-secondary/5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 focus-visible:ring-offset-2"
                aria-label="اطلب عرض سعر"
              >
                اطلب عرض سعر
              </button>
            </div>
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 justify-start">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-on-surface">حلول مخصصة</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-on-surface">أنظمة ERP وCRM</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-on-surface">أتمتة ذكية</span>
              </div>
              <div className="flex items-center gap-2 justify-start">
                <span
                  className="material-symbols-outlined text-secondary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  check_circle
                </span>
                <span className="font-label-md text-label-md text-on-surface">دعم محلي</span>
              </div>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="absolute inset-0 bg-secondary/10 rounded-3xl -rotate-3 scale-105"></div>
            <img
              alt="منصة SpinesTech للحلول البرمجية"
              className="rounded-3xl shadow-2xl relative z-10 w-full object-cover aspect-[1.79]"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2AZZoxIZ-GDG2uwZS83lY8yRzqHk_C73qrpsc1srV-sfitFamyjaRXBe56nqXsvQLRxz8bTp9no3vd5ap1jNdpxue2yquRm4BPjIAoCOptoZvo3ZycyRLOR-6k8_AJvR23sKbj88-h4acKRpOIItt1aBdEsU0ENAA59h2fVClgtelgbLke1V5cLZ0tiG_SiWP0HrGqRL6Flmq_UDy_T0Rc0ROi7xRfqWoU4nTK9oNIruANCybg4f8Lfu9mQTTT9EHY5E6trVoSqEd"
              loading="lazy"
            />
          </div>
        </div>
      </Container>
    </header>
  );
}

// 2. About Section Component
function AboutSection() {
  return (
    <Section bg="surface-container-low" className="text-right">
      <div className="text-center mb-16">
        <span className="text-secondary font-bold font-label-md tracking-widest uppercase mb-4 block">
          نبذة عن الشركة
        </span>
        <h2 className="font-headline-xl text-headline-xl mb-4 text-primary font-bold">
          نبني Spine الأعمال الرقمي
        </h2>
        <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 p-10 bg-white rounded-2xl border border-outline-variant/20 flex flex-col justify-between">
          <div>
            <h3 className="font-headline-lg text-headline-lg mb-4 text-primary-container font-bold">
              رؤيتنا 2030
            </h3>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              نلتزم في SpinesTech بتمكين المؤسسات السعودية من خلال تكنولوجيا متطورة تتماشى مع رؤية
              المملكة 2030. نحن لا نصمم مجرد برمجيات، بل نبني العمود الفقري الرقمي الذي يضمن استدامة
              وتوسع الشركات في السوق الخليجي التنافسي.
            </p>
          </div>
          <div className="mt-8 flex gap-4">
            <div className="bg-surface-container-high p-4 rounded-lg text-center flex-1">
              <div className="text-headline-lg font-bold text-secondary">+150</div>
              <div className="text-caption text-on-surface">مشروع ناجح</div>
            </div>
            <div className="bg-surface-container-high p-4 rounded-lg text-center flex-1">
              <div className="text-headline-lg font-bold text-secondary">50+</div>
              <div className="text-caption text-on-surface">خبير تقني</div>
            </div>
          </div>
        </div>
        <div className="p-10 bg-primary-container text-on-primary rounded-2xl flex flex-col items-center justify-center text-center relative overflow-hidden">
          <div className="islamic-pattern absolute inset-0"></div>
          <span
            className="material-symbols-outlined text-6xl mb-6 text-secondary-fixed"
            aria-hidden="true"
          >
            shield_person
          </span>
          <h3 className="font-headline-sm text-headline-sm mb-4 text-on-primary font-bold">
            موثوقية سيادية
          </h3>
          <p className="font-body-md text-body-md opacity-80">
            معايير أمان عالمية مع فهم عميق للمتطلبات التنظيمية المحلية في المملكة ودول الخليج.
          </p>
        </div>
      </div>
    </Section>
  );
}

// 3. Services Section Component
function ServicesSection() {
  const {
    data: services,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["services-summary"],
    queryFn: getServices,
  });

  const displayServices = services ? services.slice(0, 3) : [];

  return (
    <Section bg="none" className="overflow-hidden text-right">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
        <div className="max-w-2xl text-right">
          <h2 className="font-headline-xl text-headline-xl mb-4 text-primary font-bold">
            خدماتنا الأساسية
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            حلول هندسية متكاملة مصممة خصيصاً لتلبية احتياجات قطاع الأعمال المعاصر، من البرمجيات
            المخصصة إلى الذكاء الاصطناعي.
          </p>
        </div>
        <Link
          to="/services"
          className="text-secondary font-bold flex items-center gap-2 group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1"
        >
          <span>عرض كافة الخدمات</span>
          <span
            className="material-symbols-outlined group-hover:-translate-x-1 transition-transform"
            aria-hidden="true"
          >
            arrow_back
          </span>
        </Link>
      </div>

      {isLoading && <StateFeedback type="loading" />}
      {isError && (
        <StateFeedback type="error" message="فشل تحميل قائمة الخدمات المعروضة." onRetry={refetch} />
      )}
      {!isLoading && !isError && displayServices.length === 0 && (
        <StateFeedback type="empty" message="لا توجد خدمات لعرضها." />
      )}

      {!isLoading && !isError && displayServices.length > 0 && (
        <Grid cols={3}>
          {displayServices.map((service) => (
            <div
              key={service.id}
              className="group p-8 bg-white border border-outline-variant/30 rounded-2xl hover:border-secondary transition-all hover:shadow-xl relative overflow-hidden"
            >
              <div className="bg-secondary/10 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-white transition-colors">
                <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                  {service.icon}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm mb-4 text-primary font-bold">
                {service.title}
              </h3>
              <p className="font-body-md text-on-surface-variant mb-6 font-body-md">
                {service.description}
              </p>
              {service.features && (
                <ul className="space-y-3 font-label-md text-label-md text-on-surface-variant">
                  {service.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2 justify-start">
                      <span
                        className="w-1.5 h-1.5 bg-secondary rounded-full"
                        aria-hidden="true"
                      ></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </Grid>
      )}
    </Section>
  );
}

// 4. Sectors Section Component
function SectorsSection() {
  return (
    <Section bg="primary-container" className="text-on-primary">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="text-right">
          <h2 className="font-headline-xl text-headline-xl mb-6 text-on-primary font-bold">
            القطاعات التي نخدمها
          </h2>
          <p className="font-body-lg text-body-lg opacity-80 mb-10 text-on-primary-container">
            نمتلك خبرة عميقة في تقديم حلول متخصصة تتناسب مع طبيعة وتحديات مختلف القطاعات الحيوية في
            المنطقة.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors flex-row-reverse">
              <span className="material-symbols-outlined text-secondary-fixed" aria-hidden="true">
                business_center
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-sm">القطاع الحكومي</h4>
                <p className="text-caption opacity-60">تحول رقمي وحوكمة ذكية</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors flex-row-reverse">
              <span className="material-symbols-outlined text-secondary-fixed" aria-hidden="true">
                local_hospital
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-sm">الرعاية الصحية</h4>
                <p className="text-caption opacity-60">أنظمة إدارة المستشفيات</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors flex-row-reverse">
              <span className="material-symbols-outlined text-secondary-fixed" aria-hidden="true">
                shopping_cart
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-sm">التجارة الإلكترونية</h4>
                <p className="text-caption opacity-60">منصات بيع متطورة</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-colors flex-row-reverse">
              <span className="material-symbols-outlined text-secondary-fixed" aria-hidden="true">
                factory
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-sm">القطاع الصناعي</h4>
                <p className="text-caption opacity-60">أتمتة خطوط الإنتاج</p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="aspect-square bg-gradient-to-tr from-secondary/40 to-transparent rounded-full absolute -top-10 -right-10 w-64 blur-3xl opacity-30"></div>
          <div className="bg-surface-container-highest/10 p-2 rounded-2xl backdrop-blur-sm border border-white/10 overflow-hidden shadow-2xl">
            <div className="h-[400px] w-full rounded-xl bg-primary relative overflow-hidden">
              {/* Decorative visualization of data/tech */}
              <div className="absolute inset-0 islamic-pattern opacity-10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border border-secondary/20 rounded-full animate-pulse"></div>
                <div className="absolute w-1/2 h-1/2 border border-secondary/40 rounded-full animate-ping"></div>
                <span
                  className="material-symbols-outlined text-8xl text-secondary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                  aria-hidden="true"
                >
                  hub
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

// 5. Process Section Component
function ProcessSection() {
  return (
    <Section bg="default" className="text-right">
      <div className="text-center mb-16">
        <h2 className="font-headline-xl text-headline-xl mb-4 text-primary font-bold">
          آلية العمل
        </h2>
        <p className="font-body-lg text-on-surface-variant">
          من الفكرة إلى التنفيذ، نتبع منهجية عمل دقيقة تضمن جودة المخرجات.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative text-center">
        {/* Line background for desktop */}
        <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-outline-variant/30 -z-10"></div>

        <div className="group">
          <div className="w-16 h-16 bg-white border-4 border-background outline outline-1 outline-outline-variant/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all shadow-md">
            <span className="font-headline-sm">01</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2 text-primary font-bold">
            الاستشارة والتحليل
          </h3>
          <p className="text-caption text-on-surface-variant px-4">
            دراسة احتياجات العمل وتحليل المتطلبات التقنية.
          </p>
        </div>

        <div className="group">
          <div className="w-16 h-16 bg-white border-4 border-background outline outline-1 outline-outline-variant/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all shadow-md">
            <span className="font-headline-sm">02</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2 text-primary font-bold">
            التصميم والهندسة
          </h3>
          <p className="text-caption text-on-surface-variant px-4">
            رسم بنية النظام وتصميم تجربة مستخدم عصرية.
          </p>
        </div>

        <div className="group">
          <div className="w-16 h-16 bg-white border-4 border-background outline outline-1 outline-outline-variant/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all shadow-md">
            <span className="font-headline-sm">03</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2 text-primary font-bold">
            التطوير والاختبار
          </h3>
          <p className="text-caption text-on-surface-variant px-4">
            برمجة النظام بأعلى المعايير وإجراء اختبارات دقيقة.
          </p>
        </div>

        <div className="group">
          <div className="w-16 h-16 bg-white border-4 border-background outline outline-1 outline-outline-variant/30 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-secondary group-hover:text-white transition-all shadow-md">
            <span className="font-headline-sm">04</span>
          </div>
          <h3 className="font-headline-sm text-headline-sm mb-2 text-primary font-bold">
            الإطلاق والدعم
          </h3>
          <p className="text-caption text-on-surface-variant px-4">
            نشر النظام ومتابعة الأداء مع تقديم دعم فني مستمر.
          </p>
        </div>
      </div>
    </Section>
  );
}

// 6. Pricing Section Component
function PricingSection() {
  const {
    data: pricingPlans,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["pricing-summary"],
    queryFn: getPricingPlans,
  });

  return (
    <Section bg="surface-container" className="text-right">
      <div className="text-center">
        <h2 className="font-headline-xl text-headline-xl mb-12 text-primary font-bold">
          باقات مرنة لكل مرحلة
        </h2>

        {isLoading && <StateFeedback type="loading" />}
        {isError && (
          <StateFeedback type="error" message="فشل تحميل خطط التسعير." onRetry={refetch} />
        )}
        {!isLoading && !isError && (!pricingPlans || pricingPlans.length === 0) && (
          <StateFeedback type="empty" message="لا توجد باقات متاحة حالياً." />
        )}

        {!isLoading && !isError && pricingPlans && pricingPlans.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan) => {
              const isRecommended = plan.recommended;

              return (
                <div
                  key={plan.id}
                  className={`p-8 rounded-2xl flex flex-col items-start text-right relative ${
                    isRecommended
                      ? "bg-primary-container border-2 border-secondary scale-105 shadow-2xl z-10 text-on-primary"
                      : "bg-white border border-outline-variant/30 text-on-surface"
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white px-6 py-1 rounded-full text-caption font-bold">
                      الأكثر طلباً
                    </div>
                  )}
                  <span
                    className={`px-4 py-1 rounded-full text-caption font-bold mb-4 ${
                      isRecommended
                        ? "bg-white/10 text-on-primary"
                        : "bg-surface-container-high text-on-surface"
                    }`}
                  >
                    {plan.tier}
                  </span>
                  <h3
                    className={`font-headline-lg text-headline-lg mb-4 font-bold ${
                      isRecommended ? "text-on-primary" : "text-primary"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p
                    className={`text-body-md mb-8 font-body-md ${
                      isRecommended ? "opacity-80" : "text-on-surface-variant"
                    }`}
                  >
                    {plan.description}
                  </p>
                  <ul
                    className={`space-y-4 mb-10 w-full ${
                      isRecommended ? "opacity-90" : "text-on-surface-variant"
                    }`}
                  >
                    {plan.features.slice(0, 3).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2 justify-start">
                        <span
                          className={`material-symbols-outlined text-sm ${
                            isRecommended ? "text-secondary-fixed" : "text-secondary"
                          }`}
                          aria-hidden="true"
                        >
                          check
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/pricing"
                    className={`w-full text-center py-3 rounded-lg font-bold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
                      isRecommended
                        ? "bg-secondary text-white hover:bg-secondary/90 focus-visible:ring-secondary/50"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-white focus-visible:ring-primary/50"
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}

// 7. FAQ Section Component
function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First accordion is open by default

  const {
    data: faqs,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["faq-summary"],
    queryFn: getFaqs,
  });

  const displayFaqs = faqs ? faqs.slice(0, 3) : [];

  return (
    <Section bg="default" className="text-right">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-headline-xl text-headline-xl text-center mb-12 text-primary font-bold">
          الأسئلة الشائعة
        </h2>

        {isLoading && <StateFeedback type="loading" />}
        {isError && (
          <StateFeedback type="error" message="فشل تحميل الأسئلة الشائعة." onRetry={refetch} />
        )}
        {!isLoading && !isError && displayFaqs.length === 0 && (
          <StateFeedback type="empty" message="لا توجد أسئلة شائعة." />
        )}

        {!isLoading && !isError && displayFaqs.length > 0 && (
          <div className="space-y-4">
            {displayFaqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={faq.id}
                  className="bg-white border border-outline-variant/30 rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full p-6 flex justify-between items-center cursor-pointer font-headline-sm text-headline-sm text-right focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-xl flex-row-reverse"
                    aria-expanded={isOpen}
                  >
                    <span className="text-primary font-bold">{faq.question}</span>
                    <span
                      className={`material-symbols-outlined transition-transform duration-300 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      aria-hidden="true"
                    >
                      expand_more
                    </span>
                  </button>
                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen ? "max-h-48 opacity-100 p-6 pt-0" : "max-h-0 opacity-0"
                    } text-on-surface-variant font-body-md`}
                  >
                    {faq.answer}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Section>
  );
}
