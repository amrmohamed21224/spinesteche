import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Lenis from "lenis";

// Register ScrollTrigger plugin globally
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

let lenisInstance: Lenis | null = null;
let scrollLockCount = 0;

export function registerLenis(lenis: Lenis): void {
  lenisInstance = lenis;
}

/**
 * Lock page scroll (e.g. when a modal is open). Pauses Lenis so wheel events
 * scroll the modal body instead of the site behind it.
 */
export function setBodyScrollLocked(locked: boolean): void {
  if (typeof document === "undefined") return;

  if (locked) {
    scrollLockCount += 1;
    if (scrollLockCount === 1) {
      document.documentElement.classList.add("scroll-locked");
      document.body.classList.add("scroll-locked");
      lenisInstance?.stop();
    }
    return;
  }

  scrollLockCount = Math.max(0, scrollLockCount - 1);
  if (scrollLockCount === 0) {
    document.documentElement.classList.remove("scroll-locked");
    document.body.classList.remove("scroll-locked");
    lenisInstance?.start();
  }
}

/**
 * Initialize Lenis smooth scroll and connect it to GSAP ScrollTrigger
 */
export const initSmoothScroll = (): Lenis | null => {
  if (typeof window === "undefined") return null;

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
  });

  registerLenis(lenis);

  // Sync scroll events with ScrollTrigger
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenis;
};
