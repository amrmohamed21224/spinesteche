import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "../../i18n";

export function Navbar() {
  const { t, locale, toggleLocale, dir } = useTranslation();

  const panelSide = dir === "rtl" ? "right-0" : "left-0";
  const panelClosedTranslate =
    dir === "rtl"
      ? "data-[state=closed]:translate-x-full"
      : "data-[state=closed]:-translate-x-full";

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

        {/* Mobile menu */}
        <div className="lg:hidden flex items-center gap-3 shrink-0">
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                aria-label={t("nav.mainNav")}
              >
                <span className="material-symbols-outlined" aria-hidden="true">
                  menu
                </span>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" />

              <Dialog.Content
                dir={dir}
                className={[
                  "fixed inset-y-0 w-[320px] bg-surface-container-highest border-b border-outline-variant/30 z-50 shadow-xl",
                  panelSide,
                  panelClosedTranslate,
                  "data-[state=open]:translate-x-0 data-[state=open]:duration-300 data-[state=closed]:duration-200",
                  "transform transition-transform",
                ].join(" ")}
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/30">
                  <Link
                    to="/"
                    className="font-headline-lg text-headline-lg font-bold text-primary"
                    aria-label={t("nav.homeAria")}
                  >
                    SpinesTech
                  </Link>

                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="p-2 rounded-lg cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      aria-label="Close menu"
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        close
                      </span>
                    </button>
                  </Dialog.Close>
                </div>

                <div className="px-6 py-5 flex flex-col h-[calc(100%-73px)]">
                  <div className="flex flex-col gap-2">
                    <MobileNavLink to="/">{t("nav.home")}</MobileNavLink>
                    <MobileNavLink to="/about">{t("nav.about")}</MobileNavLink>
                    <MobileNavLink to="/services">{t("nav.services")}</MobileNavLink>
                    <MobileNavLink to="/products">{t("nav.products")}</MobileNavLink>
                    <MobileNavLink to="/sectors">{t("nav.sectors")}</MobileNavLink>
                    <MobileNavLink to="/case-studies">{t("nav.caseStudies")}</MobileNavLink>
                    <MobileNavLink to="/careers">{t("nav.careers")}</MobileNavLink>
                    <MobileNavLink to="/contact">{t("nav.contact")}</MobileNavLink>
                  </div>

                  <div className="mt-auto flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={toggleLocale}
                      className="text-on-surface-variant cursor-pointer font-body-md hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded px-3 py-2 text-left"
                    >
                      {locale === "ar" ? t("nav.english") : t("nav.arabic")}
                    </button>

                    <Dialog.Close asChild>
                      <Link
                        to="/contact"
                        className="bg-primary-container text-on-primary font-bold py-3 px-5 rounded-lg transition-all duration-150 active:opacity-80 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      >
                        {t("nav.bookConsultation")}
                      </Link>
                    </Dialog.Close>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>
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

function MobileNavLink({ to, children }: { to: string; children: React.ReactNode }) {
  const { t } = useTranslation();
  return (
    <Dialog.Close asChild>
      <Link
        to={to}
        className="py-3 px-3 rounded-lg text-on-surface-variant hover:text-secondary hover:bg-surface-container-highest/50 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
        aria-label={typeof children === "string" ? children : t("nav.mainNav")}
      >
        {children}
      </Link>
    </Dialog.Close>
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
