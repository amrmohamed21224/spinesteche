import gsap from "gsap";

/**
 * GSAP Animation Presets
 * Reusable motion setups for standardized transition styles.
 */
export const presets = {
  // Fade in up (standard layout entry)
  fadeInUp: (target: gsap.TweenTarget, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        ...vars,
      },
    );
  },

  // Fade in down
  fadeInDown: (target: gsap.TweenTarget, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, y: -40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        ...vars,
      },
    );
  },

  // Fade in side
  fadeInSide: (
    target: gsap.TweenTarget,
    direction: "left" | "right" = "left",
    vars?: gsap.TweenVars,
  ) => {
    const xOffset = direction === "left" ? -50 : 50;
    return gsap.fromTo(
      target,
      { opacity: 0, x: xOffset },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        ...vars,
      },
    );
  },

  // Staggered reveal for grid items or lists
  staggerList: (targets: gsap.TweenTarget, staggerVal = 0.15, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      targets,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: staggerVal,
        ease: "power1.out",
        ...vars,
      },
    );
  },

  // Zoom/Scale up (for cards / image reveals)
  scaleReveal: (target: gsap.TweenTarget, vars?: gsap.TweenVars) => {
    return gsap.fromTo(
      target,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power3.out",
        ...vars,
      },
    );
  },
};
