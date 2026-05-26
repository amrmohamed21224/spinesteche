import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const BUTTON_SELECTOR = [
  "button:not([disabled]):not([data-motion='off'])",
  "a[class*='rounded'][class*='bg-']:not([data-motion='off'])",
  "a[class*='border-2'][class*='border-secondary']:not([data-motion='off'])",
].join(", ");

/**
 * Premium hover / tap micro-interactions for CTAs site-wide.
 */
function initButtonMotion(root: ParentNode): (() => void)[] {
  const cleanups: (() => void)[] = [];
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return cleanups;

  const buttons = root.querySelectorAll<HTMLElement>(BUTTON_SELECTOR);

  buttons.forEach((el) => {
    const onEnter = () => {
      gsap.to(el, {
        scale: 1.04,
        y: -2,
        boxShadow: "0 12px 28px rgba(3, 109, 54, 0.22)",
        duration: 0.35,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const onLeave = () => {
      gsap.to(el, {
        scale: 1,
        y: 0,
        boxShadow: "0 0 0 rgba(0,0,0,0)",
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };
    const onDown = () => {
      gsap.to(el, { scale: 0.97, duration: 0.12, ease: "power2.in", overwrite: "auto" });
    };
    const onUp = () => {
      gsap.to(el, { scale: 1.04, y: -2, duration: 0.2, ease: "power2.out", overwrite: "auto" });
    };

    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    el.addEventListener("mousedown", onDown);
    el.addEventListener("mouseup", onUp);
    el.style.willChange = "transform";

    cleanups.push(() => {
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      el.removeEventListener("mousedown", onDown);
      el.removeEventListener("mouseup", onUp);
      gsap.killTweensOf(el);
    });
  });

  return cleanups;
}

/**
 * Scroll reveals for sections, grids, and hero blocks.
 */
function initScrollMotion(root: HTMLElement): gsap.Context {
  return gsap.context(() => {
    const hero = root.querySelector("[data-hero]");
    if (hero) {
      const items = hero.querySelectorAll("[data-hero-item]");
      if (items.length) {
        gsap.from(items, {
          opacity: 0,
          y: 36,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.15,
        });
      }
    }

    root.querySelectorAll("section:not([data-reveal='false'])").forEach((section) => {
      gsap.from(section, {
        opacity: 0,
        y: 48,
        duration: 0.75,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          once: true,
        },
      });
    });

    root.querySelectorAll("[data-stagger]").forEach((container) => {
      const children = (container as HTMLElement).children;
      if (!children.length) return;
      gsap.from(children, {
        opacity: 0,
        y: 28,
        scale: 0.98,
        duration: 0.55,
        stagger: 0.09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: container,
          start: "top 86%",
          once: true,
        },
      });
    });

    root.querySelectorAll("[data-parallax]").forEach((el) => {
      gsap.to(el, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });
  }, root);
}

export function initGlobalMotion(mainEl: HTMLElement | null): () => void {
  if (!mainEl || typeof window === "undefined") return () => {};

  const buttonCleanups = initButtonMotion(mainEl);
  const scrollCtx = initScrollMotion(mainEl);

  requestAnimationFrame(() => ScrollTrigger.refresh());

  return () => {
    buttonCleanups.forEach((fn) => fn());
    scrollCtx.revert();
  };
}
