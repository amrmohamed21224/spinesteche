import { useState } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "../../i18n";
import { useConsultation } from "../../contexts/ConsultationContext";

export function Navbar() {
  const { t, locale, toggleLocale, dir } = useTranslation();
  const { openConsultation } = useConsultation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleBookConsultation = () => {
    setMenuOpen(false);
    openConsultation();
  };

  const panelSide = dir === "rtl" ? "right-0" : "left-0";
  const panelClosedTranslate =
    dir === "rtl"
      ? "data-[state=closed]:translate-x-full"
      : "data-[state=closed]:-translate-x-full";

  return (
    <header
      className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-lg border-b border-outline-variant/30 shadow-sm"
      role="banner"
    >
      <nav
        className="max-w-container-max mx-auto h-14 sm:h-16 lg:h-20 flex items-center justify-between gap-3 px-4 sm:px-6 lg:px-margin-desktop"
        role="navigation"
        aria-label={t("nav.mainNav")}
        dir={dir}
      >
        {/* Leading cluster: menu (mobile) + logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 lg:flex-none">
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="lg:hidden inline-flex items-center justify-center size-10 rounded-xl border border-outline-variant/40 bg-surface-container-lowest text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 shrink-0"
                aria-label={t("nav.openMenu")}
                aria-expanded={menuOpen}
              >
                <span className="material-symbols-outlined text-[22px]" aria-hidden="true">
                  {menuOpen ? "close" : "menu"}
                </span>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/45 backdrop-blur-sm z-[60] data-[state=open]:animate-in data-[state=closed]:animate-out" />
              <Dialog.Content
                dir={dir}
                className={[
                  "fixed inset-y-0 w-[min(100vw-3rem,340px)] bg-surface z-[70] shadow-2xl outline-none",
                  panelSide,
                  panelClosedTranslate,
                  "data-[state=open]:translate-x-0 data-[state=open]:duration-300 data-[state=closed]:duration-200",
                  "transform transition-transform",
                ].join(" ")}
              >
                <div className="flex items-center justify-between px-5 py-4 border-b border-outline-variant/30">
                  <div className="flex items-center gap-2">
                    <img 
                      src="/images/brand/logo.png" 
                      alt="SpinesTech Logo" 
                      className="h-8 w-auto object-contain"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        document.getElementById('drawer-brand-text')?.classList.remove('hidden');
                      }}
                    />
                    <span id="drawer-brand-text" className="hidden text-lg font-bold text-primary tracking-tight">
                      <span className="text-secondary">Spines</span>Tech
                    </span>
                  </div>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="size-10 inline-flex items-center justify-center rounded-xl border border-outline-variant/40 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                      aria-label={t("nav.closeMenu")}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        close
                      </span>
                    </button>
                  </Dialog.Close>
                </div>

                <div className="flex flex-col h-[calc(100%-4.5rem)] px-4 py-5 overflow-y-auto">
                  <div className="flex flex-col gap-1">
                    <MobileNavLink to="/" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.home")}
                    </MobileNavLink>
                    <MobileNavLink to="/about" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.about")}
                    </MobileNavLink>
                    <MobileNavLink to="/services" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.services")}
                    </MobileNavLink>
                    <MobileNavLink to="/products" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.products")}
                    </MobileNavLink>
                    <MobileNavLink to="/sectors" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.sectors")}
                    </MobileNavLink>
                    <MobileNavLink to="/case-studies" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.caseStudies")}
                    </MobileNavLink>
                    <MobileNavLink to="/careers" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.careers")}
                    </MobileNavLink>
                    <MobileNavLink to="/contact" onNavigate={() => setMenuOpen(false)}>
                      {t("nav.contact")}
                    </MobileNavLink>
                  </div>

                  <div className="mt-auto pt-6 flex flex-col gap-3 border-t border-outline-variant/20">
                    <button
                      type="button"
                      onClick={toggleLocale}
                      className="w-full py-3 px-4 rounded-xl border border-outline-variant/40 text-on-surface-variant font-body-md hover:text-secondary hover:border-secondary/40 transition-colors cursor-pointer"
                    >
                      {locale === "ar" ? t("nav.english") : t("nav.arabic")}
                    </button>
                    <button
                      type="button"
                      onClick={handleBookConsultation}
                      className="w-full text-center bg-primary-container text-on-primary font-bold py-3.5 px-5 rounded-xl text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
                    >
                      {t("nav.bookConsultation")}
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded py-1"
            aria-label={t("nav.homeAria")}
          >
            <img 
              src="/images/brand/logo.png" 
              alt="SpinesTech Logo" 
              className="h-8 lg:h-10 w-auto object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                document.getElementById('nav-brand-text')?.classList.remove('hidden');
              }}
            />
            <span id="nav-brand-text" className="hidden font-bold text-primary tracking-tight truncate max-w-[10rem] sm:max-w-none text-base sm:text-lg lg:text-headline-lg leading-none">
              <span className="text-secondary">Spines</span>
              <span className="text-primary">Tech</span>
            </span>
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-5 mx-4">
          <NavLink to="/">{t("nav.home")}</NavLink>
          <NavLink to="/about">{t("nav.about")}</NavLink>
          <NavLink to="/services">{t("nav.services")}</NavLink>
          <NavLink to="/products">{t("nav.products")}</NavLink>
          <NavLink to="/sectors">{t("nav.sectors")}</NavLink>
          <NavLink to="/case-studies">{t("nav.caseStudies")}</NavLink>
          <NavLink to="/careers">{t("nav.careers")}</NavLink>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
        </div>

        {/* Desktop actions only — CTA hidden on mobile (lives in drawer) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={toggleLocale}
            className="text-on-surface-variant cursor-pointer font-body-md hover:text-secondary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-lg px-3 py-2"
            aria-label={locale === "ar" ? t("nav.switchToEnglish") : t("nav.switchToArabic")}
          >
            {locale === "ar" ? t("nav.english") : t("nav.arabic")}
          </button>
          <button
            type="button"
            onClick={openConsultation}
            className="bg-primary-container text-on-primary font-bold py-2.5 px-6 rounded-xl text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 whitespace-nowrap"
            aria-label={t("nav.bookConsultation")}
          >
            {t("nav.bookConsultation")}
          </button>
        </div>
      </nav>
    </header>
  );
}

function MobileNavLink({
  to,
  children,
  onNavigate,
}: {
  to: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      className="py-3.5 px-4 rounded-xl text-on-surface font-body-md hover:text-secondary hover:bg-secondary/5 transition-colors"
    >
      {children}
    </Link>
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
