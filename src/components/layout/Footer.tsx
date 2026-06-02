import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../i18n";

export function Footer() {
  const { t, dir } = useTranslation();

  return (
    <footer
      className="w-full pt-16 pb-8 px-margin-mobile md:px-margin-desktop flex flex-col items-center bg-primary-container text-on-primary"
      role="contentinfo"
      aria-label={t("footer.footerAria")}
      dir={dir}
    >
      <div className="max-w-container-max w-full grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 text-start">
        <div className="md:col-span-1">
          <span className="font-headline-xl text-headline-xl font-bold text-on-primary mb-6 block">
            <Link
              to="/"
              className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
            >
              SpinesTech
            </Link>
          </span>
          <p className="font-body-md text-on-surface-variant opacity-80 leading-relaxed">
            {t("footer.tagline")}
          </p>
          <div className="flex gap-4 mt-8 justify-start">
            <a
              className="text-outline-variant hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1"
              href="/"
              aria-label={t("footer.websiteAria")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                public
              </span>
            </a>
            <a
              className="text-outline-variant hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1"
              href="mailto:contact@spinestech.com"
              aria-label={t("footer.emailAria")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                alternate_email
              </span>
            </a>
            <a
              className="text-outline-variant hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded p-1"
              href="https://spinestech.sa"
              aria-label={t("footer.shareAria")}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                share
              </span>
            </a>
          </div>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm mb-6 text-on-primary font-bold">
            {t("footer.services")}
          </h4>
          <ul className="space-y-4 font-body-md text-outline-variant">
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/services"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.customDev")}
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/products"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.erp")}
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/services"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.ai")}
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/services"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.consulting")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm mb-6 text-on-primary font-bold">
            {t("footer.company")}
          </h4>
          <ul className="space-y-4 font-body-md text-outline-variant">
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/about"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.about")}
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/sectors"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.sectors")}
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/products"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.products")}
              </Link>
            </li>
            <li className="hover:translate-x-[-4px] transition-transform duration-200 cursor-pointer hover:text-on-primary">
              <Link
                to="/careers"
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
              >
                {t("footer.careers")}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-headline-sm text-headline-sm mb-6 text-on-primary font-bold">
            {t("footer.contact")}
          </h4>
          <ul
            className="space-y-4 font-body-md text-outline-variant"
            aria-label={t("footer.contactDetailsAria")}
          >
            <li className="flex items-center gap-2 justify-start">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                location_on
              </span>
              <span>{t("footer.location")}</span>
            </li>
            <li className="flex items-center gap-2 justify-start">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                mail
              </span>
              <span>contact@spinestech.com</span>
            </li>
            <li className="flex items-center gap-2 justify-start">
              <span className="material-symbols-outlined text-sm" aria-hidden="true">
                phone_iphone
              </span>
              <span dir="ltr">+966 000 000 000</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full border-t border-outline-variant/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-outline-variant font-caption">
        <p>{t("footer.copyright")}</p>
        <div className="flex gap-6">
          <a
            className="hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
            href="mailto:contact@spinestech.com?subject=Privacy%20Policy"
          >
            {t("footer.privacy")}
          </a>
          <a
            className="hover:text-on-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
            href="mailto:contact@spinestech.com?subject=Terms%20of%20Service"
          >
            {t("footer.terms")}
          </a>
        </div>
      </div>
    </footer>
  );
}
