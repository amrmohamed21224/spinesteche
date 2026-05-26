import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { presets } from "../lib/gsap/presets";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type RevealVariant =
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInLeft"
  | "fadeInRight"
  | "scaleReveal"
  | "stagger";

interface UseRevealOptions {
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  stagger?: number;
  once?: boolean;
  start?: string;
}

/**
 * useReveal
 * Attaches a ScrollTrigger-driven reveal animation to the returned ref.
 * Does NOT execute on SSR. Infrastructure only — no visual changes activated yet.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: UseRevealOptions = {}) {
  const {
    variant = "fadeInUp",
    delay = 0,
    duration = 0.8,
    stagger = 0.15,
    once = true,
    start = "top 85%",
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !ref.current) return;

    const el = ref.current;
    let anim: gsap.core.Tween | null = null;

    const ctx = gsap.context(() => {
      const triggerConfig: ScrollTrigger.Vars = {
        trigger: el,
        start,
        once,
      };

      switch (variant) {
        case "fadeInDown":
          anim = presets.fadeInDown(el, { delay, duration });
          break;
        case "fadeInLeft":
          anim = presets.fadeInSide(el, "left", { delay, duration });
          break;
        case "fadeInRight":
          anim = presets.fadeInSide(el, "right", { delay, duration });
          break;
        case "scaleReveal":
          anim = presets.scaleReveal(el, { delay, duration });
          break;
        case "stagger":
          anim = presets.staggerList(el.children, stagger, { delay });
          break;
        case "fadeInUp":
        default:
          anim = presets.fadeInUp(el, { delay, duration });
          break;
      }

      if (anim) {
        ScrollTrigger.create({
          ...triggerConfig,
          animation: anim,
          toggleActions: "play none none none",
        });
      }
    }, el);

    return () => ctx.revert();
  }, [variant, delay, duration, stagger, once, start]);

  return ref;
}
