import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseParallaxOptions {
  speed?: number; // 0.1 = slow, 1 = match scroll, -0.5 = reverse
  direction?: "vertical" | "horizontal";
  start?: string;
  end?: string;
}

/**
 * useParallax
 * Attaches a scroll-driven parallax offset to the returned ref.
 * Infrastructure only — apply to elements when ready for cinematic effects.
 */
export function useParallax<T extends HTMLElement = HTMLDivElement>(
  options: UseParallaxOptions = {},
) {
  const { speed = 0.3, direction = "vertical", start = "top bottom", end = "bottom top" } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const el = ref.current;
    const distance = speed * 100;

    const ctx = gsap.context(() => {
      const prop = direction === "vertical" ? { y: distance } : { x: distance };
      const propFrom = direction === "vertical" ? { y: -distance } : { x: -distance };

      gsap.fromTo(el, propFrom, {
        ...prop,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, [speed, direction, start, end]);

  return ref;
}
