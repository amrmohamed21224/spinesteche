import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { useSubmitContact } from "../lib/query/hooks";
import { useTranslation } from "../i18n";

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "تواصل معنا",
      description:
        "تواصل مع فريق خبراء SpinesTech لمناقشة مشاريع التحول الرقمي وحلول البرمجيات المخصصة.",
      path: "/contact",
    }),
  component: ContactPage,
});

function ContactPage() {
  const { t, locale } = useTranslation();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const contactMutation = useSubmitContact();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const company = formData.get("company") as string;
    const message = formData.get("message") as string;

    if (!name || !email || !message) {
      setErrorMsg(t("contact.fillRequired"));
      return;
    }

    contactMutation.mutate(
      { name, email, phone, company, message, locale },
      {
        onSuccess: (data) => {
          setSuccessMsg(data.message);
          e.currentTarget.reset();
        },
        onError: (error: unknown) => {
          const msg = (error as Record<string, string> | null)?.message;
          setErrorMsg(msg || t("contact.submitError"));
        },
      },
    );
  };

  return (
    <PageLayout>
      <main className="pt-24 sm:pt-28 lg:pt-32 pb-24 text-start bg-background overflow-hidden relative">
        {/* Abstract Background Orbs */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[120px] pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px] pointer-events-none"
          aria-hidden="true"
        />

        <Container
          clean
          className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop relative z-10"
        >
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 bg-secondary/10 text-secondary font-label-md text-label-md rounded-full mb-6 border border-secondary/20 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              {t("contact.badge")}
            </span>
            <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold leading-tight">
              {t("contact.heroTitle")}
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              {t("contact.heroSubtitle")}
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Contact Info (Left Side) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="mb-10 text-right">
                <h2 className="font-headline-xl text-headline-xl text-primary mb-4 font-bold">
                  {t("contact.infoTitle")}
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  {t("contact.infoSubtitle")}
                </p>
              </div>

              {/* Info Cards */}
              <div className="space-y-4">
                <a
                  href="mailto:info@spinestech.sa"
                  className="group flex items-start gap-6 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 hover:shadow-lg transition-all duration-300 block w-full text-right"
                >
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                    <span
                      className="material-symbols-outlined text-[28px] text-secondary group-hover:text-on-secondary transition-colors"
                      aria-hidden="true"
                    >
                      mail
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-1 group-hover:text-secondary transition-colors">
                      {t("contact.email")}
                    </h4>
                    <p className="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors">
                      info@spinestech.sa
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+966111234567"
                  className="group flex items-start gap-6 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 hover:shadow-lg transition-all duration-300 block w-full text-right"
                >
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                    <span
                      className="material-symbols-outlined text-[28px] text-secondary group-hover:text-on-secondary transition-colors"
                      aria-hidden="true"
                    >
                      call
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-1 group-hover:text-secondary transition-colors">
                      {t("contact.phone")}
                    </h4>
                    <p
                      className="font-body-md text-on-surface-variant group-hover:text-on-surface transition-colors"
                      dir="ltr"
                    >
                      +966 11 123 4567
                    </p>
                  </div>
                </a>

                <div className="group flex items-start gap-6 p-6 bg-surface-container-lowest rounded-2xl border border-outline-variant/30 hover:border-secondary/50 hover:shadow-lg transition-all duration-300 text-right cursor-default">
                  <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-secondary group-hover:text-on-secondary transition-all">
                    <span
                      className="material-symbols-outlined text-[28px] text-secondary group-hover:text-on-secondary transition-colors"
                      aria-hidden="true"
                    >
                      location_on
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-primary font-bold mb-1 group-hover:text-secondary transition-colors">
                      {t("contact.headquarters")}
                    </h4>
                    <p className="font-body-md text-on-surface-variant leading-relaxed group-hover:text-on-surface transition-colors">
                      {t("contact.address")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Working Hours Badge */}
              <div className="mt-8 p-6 bg-primary-container rounded-2xl text-center md:text-right flex flex-col md:flex-row items-center gap-4 border border-outline-variant/10">
                <span className="material-symbols-outlined text-4xl text-primary opacity-80">
                  schedule
                </span>
                <div>
                  <h4 className="font-label-lg text-label-lg text-on-primary-container font-bold">
                    {locale === "ar" ? "ساعات العمل" : "Working Hours"}
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-primary-container/80">
                    {locale === "ar"
                      ? "الأحد - الخميس: 9 صباحاً إلى 5 مساءً"
                      : "Sun - Thu: 9 AM to 5 PM"}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form (Right Side) */}
            <div className="lg:col-span-7">
              <div className="relative">
                <div
                  className="absolute -inset-1 bg-gradient-to-r from-secondary/30 to-primary/30 rounded-[32px] blur-lg opacity-50"
                  aria-hidden="true"
                />
                <form
                  onSubmit={handleSubmit}
                  className="relative bg-surface-container-lowest p-8 md:p-12 rounded-[28px] border border-outline-variant/50 shadow-2xl space-y-8"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="text-right border-b border-outline-variant/20 pb-6">
                    <h3 className="font-headline-lg text-headline-lg text-primary font-bold mb-2">
                      {t("contact.formTitle")}
                    </h3>
                    <p className="text-on-surface-variant font-body-sm text-body-sm">
                      {locale === "ar"
                        ? "املأ النموذج وسنقوم بالرد عليك في أقرب وقت."
                        : "Fill the form and we'll get back to you shortly."}
                    </p>
                  </div>

                  {successMsg && (
                    <div className="p-4 bg-secondary/10 border border-secondary/30 text-secondary-fixed rounded-xl text-body-md font-bold flex items-center gap-3">
                      <span className="material-symbols-outlined">check_circle</span>
                      {successMsg}
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-4 bg-error-container/20 border border-error/30 text-error rounded-xl text-body-md font-bold flex items-center gap-3">
                      <span className="material-symbols-outlined">error</span>
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant ml-1">
                        {t("contact.fullName")} <span className="text-error">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full bg-background border border-outline-variant/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all hover:border-outline-variant"
                        placeholder={t("contact.namePlaceholder")}
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant ml-1">
                        {t("contact.emailLabel")} <span className="text-error">*</span>
                      </label>
                      <input
                        name="email"
                        required
                        className="w-full bg-background border border-outline-variant/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all hover:border-outline-variant"
                        placeholder="example@domain.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant ml-1">
                        {t("contact.phoneLabel")}
                      </label>
                      <input
                        name="phone"
                        className="w-full bg-background border border-outline-variant/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all hover:border-outline-variant"
                        placeholder={t("contact.phonePlaceholder")}
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant ml-1">
                        {t("contact.company")}
                      </label>
                      <input
                        name="company"
                        className="w-full bg-background border border-outline-variant/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all hover:border-outline-variant"
                        placeholder={t("contact.companyPlaceholder")}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-start font-label-md text-label-md text-on-surface-variant ml-1">
                      {t("contact.message")} <span className="text-error">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      className="w-full bg-background border border-outline-variant/50 rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all hover:border-outline-variant resize-y"
                      placeholder={t("contact.messagePlaceholder")}
                      rows={5}
                    ></textarea>
                  </div>

                  <button
                    disabled={contactMutation.isPending}
                    className="group w-full py-5 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                    type="submit"
                  >
                    {contactMutation.isPending ? t("common.sending") : t("contact.submit")}
                    <span
                      className={`material-symbols-outlined transition-transform ${locale === "ar" ? "scale-x-[-1] group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
                      aria-hidden="true"
                    >
                      send
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </main>
    </PageLayout>
  );
}
