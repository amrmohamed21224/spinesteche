import { createFileRoute } from "@tanstack/react-router";
import React, { useState } from "react";
import { PageLayout } from "../components/layout/PageLayout";
import { seo } from "../lib/seo";
import { Container } from "../components/layout/Container";
import { Grid } from "../components/layout/Grid";
import { Section } from "../components/layout/Section";
import { useSubmitContact } from "../lib/query/hooks";

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
      setErrorMsg("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }

    contactMutation.mutate(
      { name, email, phone, company, message },
      {
        onSuccess: (data) => {
          setSuccessMsg(data.message || "تم إرسال رسالتك بنجاح! وسنتواصل معك قريباً.");
          e.currentTarget.reset();
        },
        onError: (error: unknown) => {
          const msg = (error as Record<string, string> | null)?.message;
          setErrorMsg(msg || "حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى.");
        },
      },
    );
  };

  return (
    <PageLayout>
      <main className="pt-20 text-right">
        {/* Hero Section */}
        <section
          className="relative min-h-[400px] flex items-center overflow-hidden bg-surface-container-low border-b border-outline-variant/20"
          aria-label="تواصل معنا"
        >
          <div className="absolute inset-0 hero-pattern" aria-hidden="true"></div>
          <Container
            clean
            className="max-w-container-max mx-auto px-margin-desktop w-full relative z-10 py-16"
          >
            <div className="text-center max-w-2xl mx-auto">
              <span className="inline-block py-1 px-3 bg-secondary-container text-on-secondary-container font-label-md text-label-md rounded-full mb-6">
                تواصل معنا
              </span>
              <h1 className="font-display-lg text-display-lg text-primary mb-6 font-bold">
                يسعدنا دائماً التحدث إليك
              </h1>
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                هل لديك فكرة مشروع تقني، أو ترغب في استشارة حول أنظمة ERP والذكاء الاصطناعي؟ فريقنا
                جاهز للإجابة على استفساراتك.
              </p>
            </div>
          </Container>
        </section>

        {/* Form & Info Section */}
        <Section className="py-24 bg-background">
          <Container clean className="max-w-container-max mx-auto px-margin-desktop">
            <Grid cols={12} className="items-start">
              {/* Contact Info */}
              <div className="md:col-span-5 space-y-8">
                <div>
                  <h2 className="font-headline-xl text-headline-xl text-primary mb-6 font-bold">
                    معلومات الاتصال
                  </h2>
                  <p className="font-body-md text-on-surface-variant mb-8 leading-relaxed">
                    يمكنك التواصل معنا مباشرة عبر القنوات الرسمية أو زيارة مكتبنا الإقليمي في
                    الرياض.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                        mail
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                        البريد الإلكتروني
                      </h4>
                      <p className="font-body-md text-on-surface-variant">info@spinestech.sa</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                        location_on
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                        المقر الرئيسي
                      </h4>
                      <p className="font-body-md text-on-surface-variant">
                        الرياض، حي النخيل، طريق الملك فهد، المملكة العربية السعودية
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-secondary" aria-hidden="true">
                        phone
                      </span>
                    </div>
                    <div>
                      <h4 className="font-headline-sm text-headline-sm text-primary font-bold">
                        الهاتف
                      </h4>
                      <p className="font-body-md text-on-surface-variant" dir="ltr">
                        +966 11 123 4567
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form */}
              <div className="md:col-span-7">
                <form
                  onSubmit={handleSubmit}
                  className="bg-surface-container-lowest p-8 md:p-10 rounded-2xl border border-outline-variant/30 shadow-sm space-y-6"
                >
                  <h3 className="font-headline-lg text-headline-lg text-primary font-bold mb-4">
                    أرسل لنا رسالة
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
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        الاسم الكامل <span className="text-error">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder="أدخل اسمك الكريم"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        البريد الإلكتروني <span className="text-error">*</span>
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
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        رقم الجوال
                      </label>
                      <input
                        name="phone"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder="05xxxxxxxx"
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                        الشركة / المنظمة
                      </label>
                      <input
                        name="company"
                        className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                        placeholder="اسم شركتك"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-right font-label-md text-label-md text-on-surface-variant">
                      تفاصيل الرسالة <span className="text-error">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      className="w-full bg-background border border-outline-variant/30 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary transition-all"
                      placeholder="اكتب استفسارك بالتفصيل..."
                      rows={5}
                    ></textarea>
                  </div>

                  <button
                    disabled={contactMutation.isPending}
                    className="w-full py-4 bg-primary text-on-primary rounded-xl font-headline-sm text-headline-sm hover:bg-primary/90 transition-all flex items-center justify-center gap-3 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 disabled:opacity-50"
                    type="submit"
                  >
                    {contactMutation.isPending ? "جاري الإرسال..." : "إرسال الرسالة"}
                    <span className="material-symbols-outlined scale-x-[-1]" aria-hidden="true">
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
