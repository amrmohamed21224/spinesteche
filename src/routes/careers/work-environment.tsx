import { createFileRoute, Link } from "@tanstack/react-router";
import { PageLayout } from "../../components/layout/PageLayout";
import { seo } from "../../lib/seo";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { useTranslation } from "../../i18n";

export const Route = createFileRoute("/careers/work-environment")({
  head: () =>
    seo({
      title: "بيئة العمل",
      description: "تعرف على ثقافة العمل وبيئة التطور والابتكار في SpinesTech.",
      path: "/careers/work-environment",
    }),
  component: WorkEnvironmentPage,
});

function WorkEnvironmentPage() {
  const { t, locale } = useTranslation();

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 text-start bg-background">
        {/* Header */}
        <Container
          clean
          className="max-w-container-max mx-auto px-margin-desktop mb-20 text-center relative"
        >
          <div
            className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] -z-10"
            aria-hidden="true"
          />
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-secondary font-bold mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              {locale === "ar" ? "arrow_forward" : "arrow_back"}
            </span>
            <span>{locale === "ar" ? "العودة للتوظيف" : "Back to Careers"}</span>
          </Link>
          <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold">
            {locale === "ar" ? "بيئة العمل في SpinesTech" : "Work Environment at SpinesTech"}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
            {locale === "ar"
              ? "نؤمن أن الإبداع لا يولد إلا في بيئة تدعمه. نبني ثقافة عمل تقوم على الثقة، الشفافية، والشغف المشترك لحل المشكلات المعقدة وصناعة التقنية التي تترك أثراً."
              : "We believe creativity only thrives in an environment that supports it. We build a culture based on trust, transparency, and a shared passion for solving complex problems."}
          </p>
        </Container>

        {/* Culture Bento Grid */}
        <Section bg="none" className="py-12" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
              <div className="md:col-span-8 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-10 relative overflow-hidden group hover:border-secondary/50 hover:shadow-xl transition-all duration-500">
                <div className="absolute top-0 right-0 w-full h-2 bg-gradient-to-l from-secondary to-primary transform origin-right scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                <div
                  className="material-symbols-outlined text-5xl text-secondary mb-6"
                  aria-hidden="true"
                >
                  diversity_3
                </div>
                <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">
                  {locale === "ar" ? "فريق واحد، عقل واحد" : "One Team, One Mind"}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed max-w-2xl">
                  {locale === "ar"
                    ? "لا نؤمن بالهيكليات المعقدة، بل نعمل كخلية واحدة تتشارك الأفكار بكل شفافية. مساحة النقاش مفتوحة دائماً، وأفضل فكرة هي التي تفوز بغض النظر عن صاحبها."
                    : "We don't believe in complex hierarchies, but work as a single cell sharing ideas transparently. The best idea always wins."}
                </p>
              </div>

              <div className="md:col-span-4 bg-primary text-on-primary rounded-3xl p-10 relative overflow-hidden group hover:shadow-lg hover:shadow-primary/20 transition-all duration-500">
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                <div
                  className="material-symbols-outlined text-5xl text-secondary mb-6"
                  aria-hidden="true"
                >
                  psychology
                </div>
                <h2 className="font-headline-md text-headline-md font-bold mb-4">
                  {locale === "ar" ? "التطور المستمر" : "Continuous Evolution"}
                </h2>
                <p className="font-body-md text-body-md text-outline-variant leading-relaxed">
                  {locale === "ar"
                    ? "في عالم التقنية السريع، التوقف يعني التراجع. نوفر ميزانية مفتوحة للكورسات، الشهادات، والكتب لضمان تطور فريقنا."
                    : "In the fast tech world, stopping means regressing. We provide an open budget for courses and certifications."}
                </p>
              </div>

              <div className="md:col-span-4 bg-surface-container-lowest border border-outline-variant/30 rounded-3xl p-10 relative overflow-hidden group hover:border-secondary/50 hover:shadow-xl transition-all duration-500">
                <div
                  className="material-symbols-outlined text-5xl text-secondary mb-6"
                  aria-hidden="true"
                >
                  schedule
                </div>
                <h2 className="font-headline-md text-headline-md text-primary font-bold mb-4">
                  {locale === "ar" ? "المرونة والحرية" : "Flexibility & Freedom"}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {locale === "ar"
                    ? "نقيّم الإنجاز بالمخرجات وليس بعدد الساعات. نوفر ساعات عمل مرنة وخيارات العمل عن بعد أو الهجين لتناسب حياتك."
                    : "We evaluate by output, not hours. We offer flexible hours and remote/hybrid options."}
                </p>
              </div>

              <div className="md:col-span-8 bg-surface-container-low border border-outline-variant/20 rounded-3xl p-10 relative overflow-hidden group flex flex-col md:flex-row gap-8 items-center hover:shadow-lg transition-all duration-500">
                <div className="flex-1">
                  <div
                    className="material-symbols-outlined text-5xl text-secondary mb-6"
                    aria-hidden="true"
                  >
                    rocket_launch
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">
                    {locale === "ar" ? "مشاريع تصنع فارقاً" : "Impactful Projects"}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {locale === "ar"
                      ? "لن تعمل هنا على مشاريع تقليدية. نحن نبني أنظمة ERP معقدة ومنصات ذكاء اصطناعي تساهم في التحول الرقمي الحقيقي للشركات في المملكة والخليج."
                      : "You won't work on traditional projects here. We build complex ERP systems and AI platforms that drive digital transformation."}
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* Core Values Section */}
        <section className="py-24 bg-primary-container relative overflow-hidden mt-12">
          <div className="islamic-pattern absolute inset-0 opacity-[0.03]" aria-hidden="true" />
          <Container clean className="max-w-container-max mx-auto px-margin-desktop relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-headline-xl text-headline-xl text-on-primary mb-4 font-bold">
                {locale === "ar" ? "قيمنا الأساسية" : "Our Core Values"}
              </h2>
            </div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                {
                  icon: "verified_user",
                  title: locale === "ar" ? "الجودة أولاً" : "Quality First",
                },
                { icon: "handshake", title: locale === "ar" ? "النزاهة والشفافية" : "Integrity" },
                {
                  icon: "lightbulb",
                  title: locale === "ar" ? "الابتكار الجريء" : "Bold Innovation",
                },
                {
                  icon: "volunteer_activism",
                  title: locale === "ar" ? "الاهتمام بالفرد" : "Care for People",
                },
              ].map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center hover:bg-white/10 transition-colors backdrop-blur-sm"
                >
                  <div className="w-16 h-16 bg-secondary/20 text-secondary-fixed rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-3xl" aria-hidden="true">
                      {val.icon}
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-primary font-bold">
                    {val.title}
                  </h3>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* CTA to Jobs */}
        <Container
          clean
          className="max-w-container-max mx-auto px-margin-desktop text-center mt-24"
        >
          <h2 className="font-headline-lg text-headline-lg text-primary font-bold mb-6">
            {locale === "ar"
              ? "هل تبدو هذه البيئة مناسبة لك؟"
              : "Does this environment sound right for you?"}
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
            {locale === "ar"
              ? "نحن دائماً نبحث عن العقول المبدعة والشغوفة بالتقنية. تصفح الفرص المتاحة وانضم إلينا."
              : "We are always looking for creative minds passionate about tech. Browse open roles."}
          </p>
          <Link
            to="/careers/jobs"
            className="inline-flex bg-primary text-on-primary px-10 py-4 rounded-xl font-headline-sm text-headline-sm hover:scale-105 active:scale-95 transition-all shadow-xl items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2"
          >
            {locale === "ar" ? "تصفح الوظائف المتاحة" : "Browse Available Jobs"}
            <span className="material-symbols-outlined scale-x-[-1]" aria-hidden="true">
              work
            </span>
          </Link>
        </Container>
      </main>
    </PageLayout>
  );
}
