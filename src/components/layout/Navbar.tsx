import { Link } from "@tanstack/react-router";
import { useTranslation } from "../../i18n";

export function Navbar() {
  const { t, locale, toggleLocale, dir } = useTranslation();

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant/30 shadow-sm"
      role="banner"
    >
      <nav
        className="max-w-container-max mx-auto h-20 flex items-center justify-between px-margin-mobile md:px-margin-desktop"
        role="navigation"
        aria-label={t("nav.mainNav")}
        dir={dir}
      >
        <Link
          to="/"
          className="font-headline-lg text-headline-lg font-bold text-primary shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded"
          aria-label={t("nav.homeAria")}
        >
          SpinesTech
        </Link>

        <div className="hidden lg:flex items-center gap-5">
          <NavLink to="/">{t("nav.home")}</NavLink>
          <NavLink to="/about">{t("nav.about")}</NavLink>
          <NavLink to="/services">{t("nav.services")}</NavLink>
          <NavLink to="/products">{t("nav.products")}</NavLink>
          <NavLink to="/sectors">{t("nav.sectors")}</NavLink>
          <NavLink to="/case-studies">{t("nav.caseStudies")}</NavLink>
          <NavLink to="/careers">{t("nav.careers")}</NavLink>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={toggleLocale}
            className="hidden md:inline text-on-surface-variant cursor-pointer font-body-md hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-2 py-1"
            aria-label={locale === "ar" ? t("nav.switchToEnglish") : t("nav.switchToArabic")}
          >
            {locale === "ar" ? t("nav.english") : t("nav.arabic")}
          </button>
          <Link
            to="/contact"
            className="bg-primary-container text-on-primary font-bold py-2 px-5 rounded-lg transition-all duration-150 active:opacity-80 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
            aria-label={t("nav.bookConsultation")}
          >
            {t("nav.bookConsultation")}
          </Link>
        </div>
      </nav>
    </header>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: "text-secondary font-bold border-b-2 border-secondary pb-1",
      }}
      inactiveProps={{
        className: "text-on-surface-variant hover:text-secondary transition-colors duration-200",
      }}
      className="font-body-md text-body-md whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-1"
    >
      {children}
    </Link>
  );
}
