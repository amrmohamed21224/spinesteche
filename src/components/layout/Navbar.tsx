import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { useTranslation } from "../../i18n";
import { useConsultation } from "../../contexts/ConsultationContext";

export function Navbar() {
  const { t, locale, toggleLocale, dir } = useTranslation();
  const { openConsultation } = useConsultation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ease-out border-b ${
        scrolled
          ? "bg-surface/90 backdrop-blur-xl border-outline-variant/20 shadow-lg"
          : "bg-surface/50 backdrop-blur-md border-transparent"
      }`}
      role="banner"
    >
      <nav
        className={`max-w-container-max w-full mx-auto px-4 sm:px-6 lg:px-margin-desktop flex items-center justify-between gap-4 transition-all duration-500 ease-out ${
          scrolled ? "h-16 lg:h-20" : "h-20 lg:h-28"
        }`}
        role="navigation"
        aria-label={t("nav.mainNav")}
        dir={dir}
      >
        {/* Leading cluster: menu (mobile) + logo */}
        <div className="flex items-center gap-3 lg:gap-4 shrink-0">
          <Dialog.Root open={menuOpen} onOpenChange={setMenuOpen}>
            <Dialog.Trigger asChild>
              <button
                type="button"
                className="lg:hidden relative group inline-flex items-center justify-center size-10 rounded-xl bg-surface-container-lowest border border-outline-variant/30 text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 transition-colors hover:shadow-md"
                aria-label={t("nav.openMenu")}
                aria-expanded={menuOpen}
              >
                <span className="material-symbols-outlined text-[24px] group-hover:scale-110 transition-transform" aria-hidden="true">
                  {menuOpen ? "close" : "menu"}
                </span>
              </button>
            </Dialog.Trigger>

            <Dialog.Portal>
              <Dialog.Overlay className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] data-[state=open]:animate-in data-[state=closed]:animate-out" />
              <Dialog.Content
                dir={dir}
                className={[
                  "fixed inset-y-0 w-[min(100vw-2rem,360px)] bg-surface z-[70] shadow-2xl outline-none",
                  panelSide,
                  panelClosedTranslate,
                  "data-[state=open]:translate-x-0 data-[state=open]:duration-400 data-[state=closed]:duration-300 ease-out",
                  "transform transition-transform flex flex-col",
                ].join(" ")}
              >
                {/* Drawer Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-outline-variant/20 bg-surface/50 backdrop-blur-md">
                  <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-3">
                    <img 
                      src="/images/brand/icon.png" 
                      alt="SpinesTech Logo" 
                      className="h-10 w-auto object-contain drop-shadow-sm"
                    />
                  </Link>
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="size-10 inline-flex items-center justify-center rounded-xl bg-surface-container-lowest hover:bg-error/10 hover:text-error border border-outline-variant/30 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-error transition-colors"
                      aria-label={t("nav.closeMenu")}
                    >
                      <span className="material-symbols-outlined" aria-hidden="true">
                        close
                      </span>
                    </button>
                  </Dialog.Close>
                </div>

                {/* Drawer Links */}
                <div className="flex flex-col flex-1 px-4 py-6 overflow-y-auto">
                  <div className="flex flex-col gap-2">
                    <MobileNavLink to="/" onNavigate={() => setMenuOpen(false)} icon="home">
                      {t("nav.home")}
                    </MobileNavLink>
                    <MobileNavLink to="/about" onNavigate={() => setMenuOpen(false)} icon="info">
                      {t("nav.about")}
                    </MobileNavLink>
                    <MobileNavLink to="/services" onNavigate={() => setMenuOpen(false)} icon="design_services">
                      {t("nav.services")}
                    </MobileNavLink>
                    <MobileNavLink to="/products" onNavigate={() => setMenuOpen(false)} icon="inventory_2">
                      {t("nav.products")}
                    </MobileNavLink>
                    <MobileNavLink to="/sectors" onNavigate={() => setMenuOpen(false)} icon="domain">
                      {t("nav.sectors")}
                    </MobileNavLink>
                    <MobileNavLink to="/case-studies" onNavigate={() => setMenuOpen(false)} icon="cases">
                      {t("nav.caseStudies")}
                    </MobileNavLink>
                    <MobileNavLink to="/careers" onNavigate={() => setMenuOpen(false)} icon="work">
                      {t("nav.careers")}
                    </MobileNavLink>
                    <MobileNavLink to="/contact" onNavigate={() => setMenuOpen(false)} icon="mail">
                      {t("nav.contact")}
                    </MobileNavLink>
                  </div>

                  {/* Drawer Footer Actions */}
                  <div className="mt-auto pt-6 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={toggleLocale}
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl border-2 border-outline-variant/20 text-on-surface-variant font-label-lg hover:text-primary hover:border-primary/30 hover:bg-primary/5 transition-all cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[20px]">translate</span>
                      {locale === "ar" ? t("nav.english") : t("nav.arabic")}
                    </button>
                    <button
                      type="button"
                      onClick={handleBookConsultation}
                      className="w-full flex items-center justify-center gap-2 bg-primary text-on-primary font-bold py-4 px-5 rounded-xl text-label-lg shadow-lg shadow-primary/20 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {t("nav.bookConsultation")}
                      <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
                    </button>
                  </div>
                </div>
              </Dialog.Content>
            </Dialog.Portal>
          </Dialog.Root>

          <Link
            to="/"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 rounded-lg py-1 group"
            aria-label={t("nav.homeAria")}
          >
            <img 
              src="/images/brand/icon.png" 
              alt="SpinesTech Logo" 
              className={`w-auto object-contain drop-shadow-sm group-hover:scale-105 transition-all duration-300 ${scrolled ? 'h-10 lg:h-12' : 'h-12 lg:h-16'}`}
            />
          </Link>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 mx-auto flex-1 justify-center">
          <NavLink to="/">{t("nav.home")}</NavLink>
          <NavLink to="/about">{t("nav.about")}</NavLink>
          <NavLink to="/services">{t("nav.services")}</NavLink>
          <NavLink to="/products">{t("nav.products")}</NavLink>
          <NavLink to="/sectors">{t("nav.sectors")}</NavLink>
          <NavLink to="/case-studies">{t("nav.caseStudies")}</NavLink>
          <NavLink to="/careers">{t("nav.careers")}</NavLink>
          <NavLink to="/contact">{t("nav.contact")}</NavLink>
        </div>

        {/* Desktop actions only */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          <button
            type="button"
            onClick={toggleLocale}
            className="group flex items-center justify-center size-12 rounded-full border border-outline-variant/30 text-on-surface-variant cursor-pointer font-label-md hover:text-primary hover:bg-surface-container hover:border-primary/30 hover:shadow-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label={locale === "ar" ? t("nav.switchToEnglish") : t("nav.switchToArabic")}
            title={locale === "ar" ? t("nav.switchToEnglish") : t("nav.switchToArabic")}
          >
            <span className="material-symbols-outlined group-hover:rotate-180 transition-transform duration-500">
              translate
            </span>
          </button>
          <button
            type="button"
            onClick={openConsultation}
            className="group relative overflow-hidden bg-primary text-on-primary font-label-lg py-3.5 px-8 rounded-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 whitespace-nowrap shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
            aria-label={t("nav.bookConsultation")}
          >
            <span className="relative z-10 flex items-center gap-2">
              {t("nav.bookConsultation")}
              <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                call_made
              </span>
            </span>
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_forwards]" />
          </button>
        </div>
      </nav>
    </header>
  );
}

function MobileNavLink({
  to,
  children,
  icon,
  onNavigate,
}: {
  to: string;
  children: React.ReactNode;
  icon: string;
  onNavigate: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onNavigate}
      activeProps={{ className: "bg-secondary/10 text-secondary font-bold" }}
      inactiveProps={{ className: "text-on-surface hover:bg-surface-container-highest hover:text-primary" }}
      className="flex items-center gap-4 py-4 px-5 rounded-2xl font-label-lg transition-all"
    >
      <span className="material-symbols-outlined opacity-70" aria-hidden="true">{icon}</span>
      {children}
    </Link>
  );
}

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      activeProps={{
        className: "text-primary font-bold after:scale-x-100",
      }}
      inactiveProps={{
        className: "text-on-surface hover:text-primary after:scale-x-0 hover:after:scale-x-100",
      }}
      className="relative font-label-lg text-label-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md px-1 py-2 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-secondary after:origin-left after:transition-transform after:duration-300"
    >
      {children}
    </Link>
  );
}
