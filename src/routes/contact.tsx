import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { Section } from "../components/layout/Section";
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
  component: Page,
});

function Page() {
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
      <main className="pt-24 sm:pt-28 lg:pt-32 text-start">
        <section
          className="relative min-h-[400px] flex items-center overflow-hidden bg-surface-container-low border-b border-outline-variant/20"
          aria-label={t("contact.badge")}
        >
          <div className="absolute inset-0 hero-pattern" aria-hidden="true"></div>
          <Container
            clean
            className="max-w-container-max mx-auto px-margin-desktop w-full relative z-10 py-16"
          >
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-full mb-6">
                {t("contact.badge")}
              </span>
              <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold">
                {t("contact.heroTitle")}
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                {t("contact.heroSubtitle")}
              </p>
            </div>
          </Container>
        </section>

        <Section className="py-24 bg-background">
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            <Grid cols={12} className="items-start">
              <div className="md:col-span-5 space-y-8">
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-primary mb-6 font-bold">
                    {t("contact.infoTitle")}
                  </h2>
                  <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                    {t("contact.infoSubtitle")}
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                        mail
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                        {t("contact.email")}
                      </h4>
                      <p className="font-body-md text-on-surface-variant">info@spinestech.sa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                        location_on
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                        {t("contact.headquarters")}
                      </h4>
                      <p className="font-body-md text-on-surface-variant">{t("contact.address")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                        phone
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                        {t("contact.phone")}
                      </h4>
                      <p className="font-body-md text-on-surface-variant" dir="ltr">
                        +966 11 123 4567
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-7">
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6"
                >
                  <h3 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">
                    {t("contact.formTitle")}
                  </h3>

                  {successMsg && (
                    <div className="p-4 bg-secondary/10 text-on-secondary-container rounded-xl text-body-md font-bold">
                      {successMsg}
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-4 bg-error-container text-on-error-container rounded-xl text-body-md font-bold">
                      {errorMsg}
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant">
                        {t("contact.fullName")} <span className="text-error">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder={t("contact.namePlaceholder")}
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant">
                        {t("contact.emailLabel")} <span className="text-error">*</span>
                      </label>
                      <input
                        name="email"
                        required
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder="example@domain.com"
                        type="email"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant">
                        {t("contact.phoneLabel")}
                      </label>
                      <input
                        name="phone"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder={t("contact.phonePlaceholder")}
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-start font-label-md text-label-md text-on-surface-variant">
                        {t("contact.company")}
                      </label>
                      <input
                        name="company"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder={t("contact.companyPlaceholder")}
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-start font-label-md text-label-md text-on-surface-variant">
                      {t("contact.message")} <span className="text-error">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                      placeholder={t("contact.messagePlaceholder")}
                      rows={5}
                    ></textarea>
                  </div>

                  <button
                    disabled={contactMutation.isPending}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:opacity-50"
                    type="submit"
                  >
                    {contactMutation.isPending ? t("common.sending") : t("contact.submit")}
                    <span
                      className={`material-symbols-outlined ${locale === "ar" ? "scale-x-[-1]" : ""}`}
                      aria-hidden="true"
                    >
                      send
                    </span>
                  </button>
                </form>
              </div>
            </Grid>
          </Container>
        </Section>
      </main>
    </PageLayout>
  );
}
