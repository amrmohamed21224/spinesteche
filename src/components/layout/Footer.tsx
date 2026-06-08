import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../i18n";

export function Footer() {
  const { t, locale, dir } = useTranslation();

  return (
    <footer
      className="relative w-full pt-24 pb-12 px-margin-mobile md:px-margin-desktop flex flex-col items-center bg-primary-container text-on-primary overflow-hidden"
      role="contentinfo"
      aria-label={t("footer.footerAria")}
      dir={dir}
    >
      {/* Background Decor */}
      <div
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[150px] pointer-events-none transform translate-x-1/3 -translate-y-1/2"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/3 translate-y-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
      />

      {/* CTA Section */}
      <div className="max-w-container-max w-full bg-surface/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-20 relative z-10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="text-start flex-1">
          <h3 className="font-headline-lg text-headline-lg font-bold text-white mb-3">
            {locale === "ar"
              ? "جاهز لبدء رحلة التحول الرقمي؟"
              : "Ready to start your digital transformation?"}
          </h3>
          <p className="font-body-md text-white/70 max-w-lg">
            {locale === "ar"
              ? "تواصل معنا اليوم واكتشف كيف يمكن لحلولنا التقنية أن تنقل أعمالك إلى المستوى التالي بذكاء وابتكار."
              : "Contact us today and discover how our tech solutions can take your business to the next level."}
          </p>
        </div>
        <Link
          to="/contact"
          className="group relative inline-flex items-center gap-3 bg-secondary text-on-secondary px-8 py-4 rounded-xl font-label-lg font-bold hover:bg-secondary/90 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0 overflow-hidden"
        >
          <span className="relative z-10">
            {locale === "ar" ? "تواصل معنا الآن" : "Contact Us Now"}
          </span>
          <span
            className={`material-symbols-outlined relative z-10 transition-transform ${locale === "ar" ? "scale-x-[-1] group-hover:-translate-x-1" : "group-hover:translate-x-1"}`}
            aria-hidden="true"
          >
            arrow_forward
          </span>
          <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
        </Link>
      </div>

      {/* Main Links Grid */}
      <div className="max-w-container-max w-full grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 mb-16 text-start relative z-10">
        {/* Brand Column */}
        <div className="md:col-span-12 lg:col-span-4 pr-0 lg:pr-8">
          <Link
            to="/"
            className="group flex items-center gap-3 mb-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded inline-flex"
          >
            <img
              src="/images/brand/logo-light.png"
              alt="SpinesTech Logo"
              className="h-12 w-auto object-contain drop-shadow-md group-hover:scale-105 transition-transform"
              onError={(e) => {
                e.currentTarget.style.display = "none";
                document.getElementById("footer-brand-text")?.classList.remove("hidden");
              }}
            />
            <span
              id="footer-brand-text"
              className="hidden font-display-sm text-display-sm font-bold text-white tracking-tight"
            >
              SpinesTech
            </span>
          </Link>
          <p className="font-body-md text-white/70 leading-relaxed mb-8 max-w-sm">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-3 justify-start">
            {[
              { icon: "public", href: "/", aria: t("footer.websiteAria") },
              {
                icon: "alternate_email",
                href: "mailto:contact@spinestech.com",
                aria: t("footer.emailAria"),
              },
              { icon: "share", href: "https://spinestech.sa", aria: t("footer.shareAria") },
            ].map((social, i) => (
              <a
                key={i}
                className="flex items-center justify-center size-10 rounded-full bg-white/5 border border-white/10 text-white hover:bg-secondary hover:text-on-secondary hover:border-secondary hover:scale-110 hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                href={social.href}
                aria-label={social.aria}
              >
                <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                  {social.icon}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Services Column */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="font-headline-sm text-headline-sm mb-6 text-white font-bold flex items-center gap-2">
            <span className="w-8 h-1 bg-secondary rounded-full" aria-hidden="true" />
            {t("footer.services")}
          </h4>
          <ul className="space-y-4 font-body-md text-white/70">
            {[
              { label: t("footer.customDev"), to: "/services" },
              { label: t("footer.erp"), to: "/products" },
              { label: t("footer.ai"), to: "/services" },
              { label: t("footer.consulting"), to: "/services" },
            ].map((link, i) => (
              <li key={i} className="group">
                <Link
                  to={link.to}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] text-secondary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 ${locale === "ar" ? "group-hover:translate-x-1 rotate-180" : "group-hover:translate-x-0"}`}
                  >
                    arrow_forward
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Column */}
        <div className="md:col-span-4 lg:col-span-2">
          <h4 className="font-headline-sm text-headline-sm mb-6 text-white font-bold flex items-center gap-2">
            <span className="w-8 h-1 bg-secondary rounded-full" aria-hidden="true" />
            {t("footer.company")}
          </h4>
          <ul className="space-y-4 font-body-md text-white/70">
            {[
              { label: t("footer.about"), to: "/about" },
              { label: t("footer.sectors"), to: "/sectors" },
              { label: t("footer.products"), to: "/products" },
              { label: t("footer.careers"), to: "/careers" },
            ].map((link, i) => (
              <li key={i} className="group">
                <Link
                  to={link.to}
                  className="inline-flex items-center gap-2 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
                >
                  <span
                    className={`material-symbols-outlined text-[16px] text-secondary opacity-0 -translate-x-2 transition-all group-hover:opacity-100 ${locale === "ar" ? "group-hover:translate-x-1 rotate-180" : "group-hover:translate-x-0"}`}
                  >
                    arrow_forward
                  </span>
                  <span className="group-hover:translate-x-1 transition-transform">
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div className="md:col-span-4 lg:col-span-3">
          <h4 className="font-headline-sm text-headline-sm mb-6 text-white font-bold flex items-center gap-2">
            <span className="w-8 h-1 bg-secondary rounded-full" aria-hidden="true" />
            {t("footer.contact")}
          </h4>
          <ul
            className="space-y-5 font-body-md text-white/70"
            aria-label={t("footer.contactDetailsAria")}
          >
            <li className="flex items-start gap-3 justify-start group cursor-default">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors border border-white/10">
                <span
                  className="material-symbols-outlined text-[20px] text-secondary"
                  aria-hidden="true"
                >
                  location_on
                </span>
              </div>
              <span className="mt-1 group-hover:text-white transition-colors">
                {t("footer.location")}
              </span>
            </li>
            <li className="flex items-center gap-3 justify-start group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors border border-white/10">
                <span
                  className="material-symbols-outlined text-[20px] text-secondary"
                  aria-hidden="true"
                >
                  mail
                </span>
              </div>
              <a
                href="mailto:contact@spinestech.com"
                className="group-hover:text-white transition-colors"
              >
                contact@spinestech.com
              </a>
            </li>
            <li className="flex items-center gap-3 justify-start group">
              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-secondary/20 transition-colors border border-white/10">
                <span
                  className="material-symbols-outlined text-[20px] text-secondary"
                  aria-hidden="true"
                >
                  call
                </span>
              </div>
              <a
                href="tel:+966000000000"
                className="group-hover:text-white transition-colors"
                dir="ltr"
              >
                +966 000 000 000
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container-max w-full border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-white/50 font-caption relative z-10">
        <p className="order-2 md:order-1">{t("footer.copyright")}</p>
        <div className="flex gap-6 order-1 md:order-2">
          <a
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
            href="mailto:contact@spinestech.com?subject=Privacy%20Policy"
          >
            {t("footer.privacy")}
          </a>
          <span className="w-1 h-1 rounded-full bg-white/20 self-center" />
          <a
            className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
            href="mailto:contact@spinestech.com?subject=Terms%20of%20Service"
          >
            {t("footer.terms")}
          </a>
        </div>
      </div>
    </footer>
  );
}
