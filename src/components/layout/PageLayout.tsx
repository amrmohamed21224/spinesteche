import React, { useEffect, useRef, useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { initSmoothScroll } from "../../lib/motion";
import { initGlobalMotion } from "../../lib/gsap/initGlobalMotion";
import { useTranslation } from "../../i18n";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { t, dir } = useTranslation();
  const [showScroll, setShowScroll] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const lenis = initSmoothScroll();

    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      lenis?.destroy();
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    let motionCleanup: (() => void) | undefined;
    const timer = window.setTimeout(() => {
      motionCleanup = initGlobalMotion(mainRef.current);
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      window.clearTimeout(timer);
      motionCleanup?.();
    };
  }, [children, dir]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col" dir={dir}>
      <Navbar />
      <main ref={mainRef} className="flex-grow">
        {children}
      </main>
      <Footer />

      <button
        onClick={scrollToTop}
        className={`btn-motion fixed bottom-8 end-8 bg-secondary text-white p-3 rounded-full shadow-lg z-50 transition-all duration-300 cursor-pointer hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-secondary/50 ${
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
