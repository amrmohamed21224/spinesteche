import React, { useEffect, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { initSmoothScroll } from "../../lib/motion";
import { useTranslation } from "../../i18n";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { t, dir } = useTranslation();
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = initSmoothScroll();

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (lenis) {
        lenis.destroy();
      }
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 end-8 bg-secondary text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 cursor-pointer hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50 ${
          showScroll ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        id="backToTop"
        aria-label={t("common.backToTop")}
      >
        <span className="material-symbols-outlined block" aria-hidden="true">
          expand_less
        </span>
      </button>
    </div>
  );
}
