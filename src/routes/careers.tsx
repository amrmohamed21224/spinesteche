import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { Section } from "../components/layout/Section";
import { StateFeedback } from "../components/layout/StateFeedback";
import { getCareers, submitCareerApplication } from "../lib/api/fetchers";

export const Route = createFileRoute("/careers")({
  head: () =>
    seo({
      title: "انضم إلى فريقنا",
      description:
        "تصفح الفرص الوظيفية المتاحة في SpinesTech وابنِ مستقبلك المهني في مجالات تطوير البرمجيات والذكاء الاصطناعي.",
      path: "/careers",
    }),
  component: Page,
});

function Page() {
  const handleScrollToApply = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById("apply-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const {
    data: careers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["careers"],
    queryFn: getCareers,
  });

  const mutation = useMutation({
    mutationFn: submitCareerApplication,
    onSuccess: (data) => {
      alert(data.message);
      // Clear form
      const form = document.getElementById("career-form") as HTMLFormElement;
      if (form) form.reset();
    },
    onError: () => {
      alert("حدث خطأ أثناء إرسال طلبك. يرجى المحاولة مرة أخرى.");
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

  // Get job icon based on title/department
  const getJobIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes("web") || lower.includes("ويب")) return "code";
    if (lower.includes("ai") || lower.includes("ذكاء")) return "psychology";
    if (lower.includes("design") || lower.includes("مصمم") || lower.includes("ux"))
      return "palette";
    if (lower.includes("mobile") || lower.includes("جوال")) return "smartphone";
    if (lower.includes("erp") || lower.includes("أخصائي")) return "account_tree";
    return "work";
  };

  return (
    <PageLayout>
      <main className="pt-20 text-right">
        {/* Hero Section */}
        <section
          className="relative min-h-[614px] flex items-center overflow-hidden bg-surface-container-low border-b border-outline-variant/20"
          aria-label="مقدمة التوظيف"
        >
          <div className="absolute inset-0 hero-pattern" aria-hidden="true"></div>
          <Container
            clean
            className="max-w-container-max mx-auto px-margin-desktop w-full relative z-10 grid md:grid-cols-2 gap-gutter items-center py-16"
          >
            <div className="text-right">
              <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-full mb-6">
                انضم إلى فريقنا
              </span>
              <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold">
                ابنِ مستقبل التقنية معنا
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant mb-8 max-w-xl">
                نحن نبحث دائمًا عن المواهب الشغوفة بالتقنية والابتكار. في SpinesTech، نؤمن بأن
                الإنسان هو المحرك الحقيقي للتحول الرقمي في المملكة.
              </p>
              <div className="flex gap-4 flex-row-reverse justify-end">
                <a
                  className="px-8 py-3 bg-secondary text-on-secondary rounded-xl font-label-md text-label-md hover:shadow-lg transition-shadow cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  href="#jobs"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  تصفح الوظائف المتاحة
                </a>
                <a
                  className="px-8 py-3 border border-secondary text-secondary rounded-xl font-label-md text-label-md hover:bg-secondary/5 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                  href="#jobs"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  بيئة العمل
                </a>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                className="rounded-2xl shadow-2xl grayscale hover:grayscale-0 transition-all duration-700 object-cover w-full h-[500px]"
                alt="متخصصون سعوديون في مجال التقنية"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuALlnEpwMFPEX9boAFbAFv3oiBKNFMDciMEvwSad7SByzcAjvWn4d3zxBezgPYnL8lQTjN1EWKlcpr5VRP0fVLk03E8cx-OTRMxCqx_b0obKR9F5WfmGPMsWS2aBI531vQ4KxjvQBk38VbISPIXIeu06q3lW-VIzhKJhYI-wkw3i4PyANTjO4CUFFw8JqZ1dveNDS54yW220Xo3tGMfGZ2apF_C4ZawjiHa8XVT9CCkIuIk_In4op_Ey4n5sGu3BXEIii_YW7bHvDsf"
                loading="lazy"
              />
            </div>
          </Container>
        </section>

        {/* Stats / Why Join Us */}
        <Section bg="default" className="py-24">
          <Grid cols={4}>
            <div className="text-center p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 transition-colors">
              <div
                className="material-symbols-outlined text-secondary text-4xl mb-4"
                aria-hidden="true"
              >
                groups
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">+١٥٠</div>
              <div className="font-label-md text-label-md text-on-surface-variant">مبدع ومبدعة</div>
            </div>
            <div className="text-center p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 transition-colors">
              <div
                className="material-symbols-outlined text-secondary text-4xl mb-4"
                aria-hidden="true"
              >
                rocket_launch
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">٣٠+</div>
              <div className="font-label-md text-label-md text-on-surface-variant">
                مشروع وطني ضخم
              </div>
            </div>
            <div className="text-center p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 transition-colors">
              <div
                className="material-symbols-outlined text-secondary text-4xl mb-4"
                aria-hidden="true"
              >
                workspace_premium
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">١٠٠٪</div>
              <div className="font-label-md text-label-md text-on-surface-variant">
                بيئة داعمة للنمو
              </div>
            </div>
            <div className="text-center p-8 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 transition-colors">
              <div
                className="material-symbols-outlined text-secondary text-4xl mb-4"
                aria-hidden="true"
              >
                verified
              </div>
              <div className="font-headline-xl text-headline-xl text-primary font-bold">رائد</div>
              <div className="font-label-md text-label-md text-on-surface-variant">في حلول ERP</div>
            </div>
          </Grid>
        </Section>

        {/* Bento Grid Jobs */}
        <Section bg="surface-container-low" className="py-24" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-desktop" id="jobs">
            <div className="text-center mb-16">
              <h2 className="font-headline-xl text-headline-xl text-primary mb-4 font-bold">
                الفرص المتاحة حالياً
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant">
                اختر المسار الذي يناسب شغفك وخبراتك
              </p>
            </div>

            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback
                type="error"
                message="فشل تحميل الوظائف المتاحة حالياً. يرجى المحاولة مرة أخرى."
                onRetry={refetch}
              />
            )}
            {!isLoading && !isError && (!careers || careers.length === 0) && (
              <StateFeedback type="empty" message="لا توجد فرص وظيفية شاغرة في الوقت الحالي." />
            )}

            {!isLoading && !isError && careers && careers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-right">
                {careers.map((job, index) => {
                  const isFeatured = index === 0;

                  if (isFeatured) {
                    return (
                      <div
                        key={job.id}
                        className="md:col-span-2 group relative overflow-hidden bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 hover:shadow-xl transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <span className="px-4 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-label-md">
                            {job.type === "Full-time" ? "دوام كامل" : "دوام مرن/عن بعد"}
                          </span>
                          <div
                            className="material-symbols-outlined text-secondary text-3xl"
                            aria-hidden="true"
                          >
                            {getJobIcon(job.title)}
                          </div>
                        </div>
                        <h3 className="font-headline-lg text-headline-lg text-primary mb-4 font-bold">
                          {job.title}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8 justify-start">
                          <span className="px-3 py-1 bg-background text-on-surface-variant font-caption text-caption rounded-lg border border-outline-variant/20">
                            {job.experience}
                          </span>
                          <span className="px-3 py-1 bg-background text-on-surface-variant font-caption text-caption rounded-lg border border-outline-variant/20">
                            {job.location}
                          </span>
                        </div>
                        <button
                          onClick={handleScrollToApply}
                          className="text-secondary font-label-md text-label-md flex items-center gap-2 group-hover:gap-4 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
                        >
                          قدم الآن{" "}
                          <span
                            className="material-symbols-outlined scale-x-[-1]"
                            aria-hidden="true"
                          >
                            arrow_forward
                          </span>
                        </button>
                      </div>
                    );
                  }

                  const isAI = job.slug.includes("ai") || job.title.includes("ذكاء");

                  if (isAI) {
                    return (
                      <div
                        key={job.id}
                        className="group bg-primary text-on-primary p-8 rounded-2xl border border-primary hover:bg-primary/90 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div
                            className="material-symbols-outlined text-secondary text-3xl mb-6"
                            aria-hidden="true"
                          >
                            {getJobIcon(job.title)}
                          </div>
                          <h3 className="font-headline-lg text-headline-lg mb-4 text-on-primary font-bold">
                            {job.title}
                          </h3>
                          <p className="font-body-md text-body-md text-outline-variant mb-6">
                            {job.description}
                          </p>
                        </div>
                        <div className="mt-auto">
                          <button
                            onClick={handleScrollToApply}
                            className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-label-md text-label-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                          >
                            التقديم السريع
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={job.id}
                      className="group bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 hover:border-secondary transition-all duration-300"
                    >
                      <div
                        className="material-symbols-outlined text-secondary text-3xl mb-6"
                        aria-hidden="true"
                      >
                        {getJobIcon(job.title)}
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold">
                        {job.title}
                      </h3>
                      <p className="font-caption text-caption text-on-surface-variant mb-6 uppercase tracking-widest">
                        {job.department}
                      </p>
                      <button
                        onClick={handleScrollToApply}
                        className="text-secondary font-label-md text-label-md flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
                      >
                        تقديم سريع{" "}
                        <span className="material-symbols-outlined scale-x-[-1]" aria-hidden="true">
                          chevron_right
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>

        {/* Application Form */}
        <section className="py-24 bg-background" id="apply-form">
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid md:grid-cols-5 gap-16">
              <div className="md:col-span-2 text-right">
                <h2 className="font-headline-xl text-headline-xl text-primary mb-6 font-bold">
                  جاهز للبدء؟
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                  أرسل لنا سيرتك الذاتية وسنتواصل معك في أقرب وقت لمناقشة مستقبلك معنا.
                </p>
                <div className="space-y-8">
                  <div className="flex items-start gap-4 flex-row-reverse text-right">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-secondary font-bold"
                        aria-hidden="true"
                      >
                        mail
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-medium">
                        البريد الإلكتروني
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        careers@spinestech.sa
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 flex-row-reverse text-right">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span
                        className="material-symbols-outlined text-secondary font-bold"
                        aria-hidden="true"
                      >
                        location_on
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-medium">
                        الموقع
                      </h4>
                      <p className="font-body-md text-body-md text-on-surface-variant">
                        الرياض، حي النخيل، طريق الملك فهد
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3 text-right">
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-surface-container-lowest p-10 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6"
                  id="career-form"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        الاسم الكامل
                      </label>
                      <input
                        name="name"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                        placeholder="أدخل اسمك الثلاثي"
                        type="text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        البريد الإلكتروني
                      </label>
                      <input
                        name="email"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                        placeholder="example@domain.com"
                        type="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        رقم الجوال
                      </label>
                      <input
                        name="phone"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                        placeholder="05xxxxxxxx"
                        type="tel"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        الدور الوظيفي المطلوب
                      </label>
                      <select
                        name="position"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                      >
                        <option>مطور ويب</option>
                        <option>مطور جوال</option>
                        <option>مهندس ذكاء اصطناعي</option>
                        <option>مصمم UI/UX</option>
                        <option>أخصائي ERP</option>
                        <option>مبيعات تقنية</option>
                        <option>أخرى</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                      تحميل السيرة الذاتية (PDF)
                    </label>
                    <div className="relative group border-2 border-dashed border-outline-variant/50 rounded-xl p-8 transition-colors hover:border-secondary/50 bg-background/50 flex flex-col items-center justify-center gap-2 cursor-pointer">
                      <input
                        name="resume"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        type="file"
                        required
                      />
                      <span
                        className="material-symbols-outlined text-secondary text-4xl"
                        aria-hidden="true"
                      >
                        cloud_upload
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        اسحب الملف هنا أو انقر للاختيار
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                      رسالة تعريفية (اختياري)
                    </label>
                    <textarea
                      name="cover_letter"
                      className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                      placeholder="أخبرنا باختصار لماذا تريد الانضمام إلينا..."
                      rows={4}
                    ></textarea>
                  </div>
                  <button
                    disabled={mutation.isPending}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
                    type="submit"
                  >
                    {mutation.isPending ? "جاري الإرسال..." : "إرسال الطلب"}
                    <span className="material-symbols-outlined scale-x-[-1]" aria-hidden="true">
                      send
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>
    </PageLayout>
  );
}
