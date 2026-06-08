import { createFileRoute, Link } from "@tanstack/react-router";
import React from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { PageLayout } from "../../components/layout/PageLayout";
import { seo } from "../../lib/seo";
import { Container } from "../../components/layout/Container";
import { Section } from "../../components/layout/Section";
import { StateFeedback } from "../../components/layout/StateFeedback";
import { getCareers, submitCareerApplication } from "../../lib/api/fetchers";
import { useTranslation } from "../../i18n";

export const Route = createFileRoute("/careers/jobs")({
  head: () =>
    seo({
      title: "الوظائف المتاحة",
      description: "تصفح جميع الفرص الوظيفية المتاحة حالياً في SpinesTech.",
      path: "/careers/jobs",
    }),
  component: JobsPage,
});

function JobsPage() {
  const { t, locale } = useTranslation();
  const {
    data: careers,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["careers", locale],
    queryFn: () => getCareers(locale),
  });

  const mutation = useMutation({
    mutationFn: (data: FormData) => submitCareerApplication(data, locale),
    onSuccess: (data) => {
      alert(data.message);
      const form = document.getElementById("career-form") as HTMLFormElement;
      if (form) form.reset();
    },
    onError: () => {
      alert(t("careers.submitError"));
    },
  });

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate(formData);
  };

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
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 text-start bg-background">
        <Container clean className="max-w-container-max mx-auto px-margin-desktop mb-12">
          <Link
            to="/careers"
            className="inline-flex items-center gap-2 text-secondary font-bold mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              {locale === "ar" ? "arrow_forward" : "arrow_back"}
            </span>
            <span>{locale === "ar" ? "العودة للتوظيف" : "Back to Careers"}</span>
          </Link>
          <div className="text-right">
            <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold">
              {t("careers.jobsTitle")}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
              {t("careers.jobsSubtitle")}
            </p>
          </div>
        </Container>

        {/* Jobs Grid */}
        <Section bg="none" className="py-8" noContainer>
          <Container clean className="max-w-container-max mx-auto px-margin-desktop" id="jobs">
            {isLoading && <StateFeedback type="loading" />}
            {isError && (
              <StateFeedback type="error" message={t("careers.loadError")} onRetry={refetch} />
            )}
            {!isLoading && !isError && (!careers || careers.length === 0) && (
              <StateFeedback type="empty" message={t("careers.emptyMessage")} />
            )}

            {!isLoading && !isError && careers && careers.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter text-right">
                {careers.map((job, index) => {
                  const isFeatured = index === 0;
                  const isAI = job.slug.includes("ai") || job.title.includes("ذكاء");

                  if (isFeatured)
                    return (
                      <div
                        key={job.id}
                        className="md:col-span-2 group relative overflow-hidden bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 hover:shadow-xl hover:border-secondary/50 transition-all duration-300"
                      >
                        <div
                          className="absolute top-0 right-0 w-32 h-32 bg-secondary/5 rounded-full -translate-y-16 translate-x-16"
                          aria-hidden="true"
                        />
                        <div className="flex justify-between items-start mb-6 relative z-10">
                          <span className="px-4 py-1 bg-secondary/10 text-secondary rounded-full font-label-md text-label-md">
                            {job.type === "Full-time"
                              ? t("careers.jobTypeFullTime")
                              : t("careers.jobTypeFlexibleOrRemote")}
                          </span>
                          <div
                            className="material-symbols-outlined text-secondary text-4xl"
                            aria-hidden="true"
                          >
                            {getJobIcon(job.title)}
                          </div>
                        </div>
                        <Link
                          to="/careers/$slug"
                          params={{ slug: job.slug }}
                          className="block relative z-10"
                        >
                          <h3 className="font-headline-lg text-headline-lg text-primary mb-4 font-bold group-hover:text-secondary transition-colors">
                            {job.title}
                          </h3>
                        </Link>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-6 line-clamp-2 relative z-10">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-8 justify-start relative z-10">
                          <span className="px-3 py-1 bg-background text-on-surface-variant font-caption text-caption rounded-lg border border-outline-variant/20 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              work_history
                            </span>{" "}
                            {job.experience}
                          </span>
                          <span className="px-3 py-1 bg-background text-on-surface-variant font-caption text-caption rounded-lg border border-outline-variant/20 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">
                              location_on
                            </span>{" "}
                            {job.location}
                          </span>
                        </div>
                        <Link
                          to="/careers/$slug"
                          params={{ slug: job.slug }}
                          className="inline-flex bg-secondary text-on-secondary px-8 py-3 rounded-xl font-label-md text-label-md items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 relative z-10"
                        >
                          {locale === "ar" ? "عرض التفاصيل والتقديم" : "View Details & Apply"}{" "}
                          <span
                            className="material-symbols-outlined scale-x-[-1]"
                            aria-hidden="true"
                          >
                            arrow_forward
                          </span>
                        </Link>
                      </div>
                    );

                  if (isAI)
                    return (
                      <div
                        key={job.id}
                        className="group relative overflow-hidden bg-primary text-on-primary p-8 rounded-2xl border border-primary hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div
                          className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"
                          aria-hidden="true"
                        />
                        <div className="relative z-10">
                          <div
                            className="material-symbols-outlined text-secondary text-4xl mb-6"
                            aria-hidden="true"
                          >
                            {getJobIcon(job.title)}
                          </div>
                          <Link to="/careers/$slug" params={{ slug: job.slug }} className="block">
                            <h3 className="font-headline-lg text-headline-lg mb-4 text-on-primary font-bold group-hover:text-secondary transition-colors">
                              {job.title}
                            </h3>
                          </Link>
                          <p className="font-body-md text-body-md text-outline-variant mb-6">
                            {job.description}
                          </p>
                        </div>
                        <div className="mt-auto relative z-10">
                          <Link
                            to="/careers/$slug"
                            params={{ slug: job.slug }}
                            className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-label-md text-label-md text-center flex justify-center items-center gap-2 hover:bg-secondary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                          >
                            {locale === "ar" ? "عرض التفاصيل والتقديم" : "View Details & Apply"}
                          </Link>
                        </div>
                      </div>
                    );

                  return (
                    <div
                      key={job.id}
                      className="group bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 hover:border-secondary hover:shadow-lg transition-all duration-300 flex flex-col"
                    >
                      <div
                        className="material-symbols-outlined text-secondary text-4xl mb-6"
                        aria-hidden="true"
                      >
                        {getJobIcon(job.title)}
                      </div>
                      <Link to="/careers/$slug" params={{ slug: job.slug }} className="block">
                        <h3 className="font-headline-sm text-headline-sm text-primary mb-2 font-bold group-hover:text-secondary transition-colors">
                          {job.title}
                        </h3>
                      </Link>
                      <p className="font-caption text-caption text-on-surface-variant mb-6 uppercase tracking-widest">
                        {job.department}
                      </p>
                      <div className="mt-auto">
                        <Link
                          to="/careers/$slug"
                          params={{ slug: job.slug }}
                          className="text-secondary font-label-md text-label-md flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
                        >
                          {locale === "ar" ? "عرض التفاصيل والتقديم" : "View Details & Apply"}{" "}
                          <span
                            className="material-symbols-outlined scale-x-[-1] group-hover:translate-x-[-4px] transition-transform"
                            aria-hidden="true"
                          >
                            arrow_forward
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Container>
        </Section>

        {/* Application Form */}
        <section
          className="py-24 bg-surface-container-low border-t border-outline-variant/20 mt-12"
          id="apply-form"
        >
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            <div className="grid md:grid-cols-5 gap-16">
              <div className="md:col-span-2 text-right">
                <h2 className="font-headline-xl text-headline-xl text-primary mb-6 font-bold">
                  {t("careers.applyFormTitle")}
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mb-12">
                  {t("careers.applyFormSubtitle")}
                </p>
                <div className="space-y-8">
                  {[
                    {
                      icon: "mail",
                      title: t("careers.contactEmailLabel"),
                      body: t("careers.careerEmailAddress"),
                    },
                    {
                      icon: "location_on",
                      title: t("careers.contactLocationLabel"),
                      body: t("careers.careerLocationAddress"),
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 flex-row-reverse text-right">
                      <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                        <span
                          className="material-symbols-outlined text-secondary font-bold"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-headline-sm text-headline-sm text-primary font-medium">
                          {item.title}
                        </h4>
                        <p className="font-body-md text-body-md text-on-surface-variant">
                          {item.body}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 text-right">
                <form
                  onSubmit={handleFormSubmit}
                  className="bg-white p-10 rounded-2xl border border-outline-variant/30 shadow-xl shadow-primary/5 space-y-6"
                  id="career-form"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        {t("careers.fullNameLabel")}
                      </label>
                      <input
                        name="name"
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                        placeholder={t("careers.namePlaceholder")}
                        type="text"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        {t("careers.emailLabel")}
                      </label>
                      <input
                        name="email"
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                        placeholder={t("careers.emailPlaceholder")}
                        type="email"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        {t("careers.phoneLabel")}
                      </label>
                      <input
                        name="phone"
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                        placeholder={t("careers.phonePlaceholder")}
                        type="tel"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        {t("careers.positionLabel")}
                      </label>
                      <select
                        name="position"
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                      >
                        <option>{t("careers.positions.web")}</option>
                        <option>{t("careers.positions.mobile")}</option>
                        <option>{t("careers.positions.ai")}</option>
                        <option>{t("careers.positions.ux")}</option>
                        <option>{t("careers.positions.erp")}</option>
                        <option>{t("careers.positions.sales")}</option>
                        <option>{t("careers.positions.other")}</option>
                      </select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                      {t("careers.resumeLabel")}
                    </label>
                    <div className="relative group border-2 border-dashed border-outline-variant/50 rounded-xl p-8 transition-colors hover:border-secondary/50 hover:bg-secondary/5 bg-surface-container-lowest flex flex-col items-center justify-center gap-2 cursor-pointer">
                      <input
                        name="resume"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        type="file"
                        required
                      />
                      <span
                        className="material-symbols-outlined text-secondary text-4xl group-hover:scale-110 transition-transform"
                        aria-hidden="true"
                      >
                        cloud_upload
                      </span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        {t("careers.resumePrompt")}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                      {t("careers.coverLetterLabel")}
                    </label>
                    <textarea
                      name="cover_letter"
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all text-right"
                      placeholder={t("careers.coverLetterPlaceholder")}
                      rows={4}
                    />
                  </div>
                  <button
                    disabled={mutation.isPending}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 disabled:opacity-50"
                    type="submit"
                  >
                    {mutation.isPending ? t("careers.submitPending") : t("careers.submitButton")}
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
