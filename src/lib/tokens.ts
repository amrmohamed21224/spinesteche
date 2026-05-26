/**
 * SpinesTech Design Token System
 *
 * Centralizes theme tokens for typography, colors, spacing, borders,
 * shadows, z-index, and motion to standardise styling and reduce hardcoded values.
 */

export const tokens = {
  colors: {
    background: "#fbf9f4",
    foreground: "#1b1c19",
    primary: "#000000",
    secondary: "#036d36", // Saudi Green
    onSecondary: "#ffffff",
    outlineVariant: "#c4c6cd",
    surface: "#fbf9f4",
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f5f3ee",
    surfaceContainer: "#f0eee9",
    surfaceContainerHigh: "#eae8e3",
    surfaceContainerHighest: "#e4e2dd",
    primaryContainer: "#0a1d2f",
    onPrimaryContainer: "#74859c",
    secondaryContainer: "#99f3ae",
    onSecondaryContainer: "#0d723a",
    tertiaryFixed: "#8ef9a4",
    tertiaryFixedDim: "#71dc8a",
    error: "#ba1a1a",
    onSurfaceVariant: "#44474c",
  },

  typography: {
    fontFamily: '"IBM Plex Sans Arabic", sans-serif',
    sizes: {
      displayLg: "text-display-lg md:text-[48px] text-[36px]",
      headlineXl: "text-headline-xl md:text-[32px] text-[28px]",
      headlineLg: "text-headline-lg md:text-[24px] text-[22px]",
      headlineSm: "text-headline-sm md:text-[20px] text-[18px]",
      bodyLg: "text-body-lg md:text-[18px] text-[16px]",
      bodyMd: "text-body-md text-[16px]",
      labelMd: "text-label-md text-[14px]",
      caption: "text-caption text-[12px]",
    },
    weights: {
      light: "font-light",
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  },

  spacing: {
    containerMax: "max-w-container-max", // 1280px
    marginMobile: "px-margin-mobile", // 16px
    marginTablet: "px-margin-tablet", // 32px
    marginDesktop: "px-margin-desktop", // 64px
    gutter: "gap-gutter", // 24px
    sectionPadding: "py-24",
    heroPadding: "py-20 md:py-32",
  },

  radius: {
    none: "rounded-none",
    sm: "rounded-sm", // 0.125rem
    md: "rounded", // 0.25rem
    lg: "rounded-lg", // 0.5rem
    xl: "rounded-xl", // 0.75rem / 1rem
    xxl: "rounded-2xl", // 1rem / 1.5rem
    xxxl: "rounded-3xl", // 1.5rem / 2rem
    full: "rounded-full",
  },

  shadows: {
    none: "shadow-none",
    sm: "shadow-sm",
    md: "shadow",
    lg: "shadow-lg",
    xl: "shadow-xl",
    xxl: "shadow-2xl",
    glass: "glass-card", // custom glassmorphism shadow + blur
  },

  zIndex: {
    backToTop: "z-40",
    navbar: "z-50",
    dropdown: "z-60",
    modal: "z-70",
    overlay: "z-80",
    toast: "z-90",
  },

  transitions: {
    duration: {
      instant: "duration-0",
      fast: "duration-150",
      normal: "duration-200",
      slow: "duration-300",
      verySlow: "duration-700",
      reveal: "duration-1000",
    },
    easing: {
      linear: "ease-linear",
      in: "ease-in",
      out: "ease-out",
      inOut: "ease-in-out",
      smooth: "transition-all duration-300 ease-out",
    },
  },
};
