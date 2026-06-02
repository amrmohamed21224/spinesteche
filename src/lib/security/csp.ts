/**
 * Content Security Policy (CSP) Generator for SpinesTech.
 * Ensures protection against XSS, clickjacking, and data injection attacks.
 */
import { env } from "../../config/env";

export interface CspDirectives {
  defaultSrc: string[];
  scriptSrc: string[];
  styleSrc: string[];
  imgSrc: string[];
  fontSrc: string[];
  connectSrc: string[];
  frameAncestors: string[];
  upgradeInsecureRequests: boolean;
}

const DEFAULT_CSP_DIRECTIVES: CspDirectives = {
  defaultSrc: ["'self'"],
  scriptSrc: [
    "'self'",
    "'unsafe-inline'", // Required for React hydration
    "https://www.googletagmanager.com",
    "https://ssl.google-analytics.com",
  ],
  styleSrc: [
    "'self'",
    "'unsafe-inline'", // Required for Tailwind CSS / style injection
    "https://fonts.googleapis.com",
  ],
  imgSrc: [
    "'self'",
    "data:",
    "https:",
    "https://lh3.googleusercontent.com",
    "https://www.google-analytics.com",
  ],
  fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
  connectSrc: ["'self'", "https://www.google-analytics.com", "https://analytics.google.com"],
  frameAncestors: ["'none'"], // Prevents Clickjacking
  upgradeInsecureRequests: true,
};

/**
 * Returns CSP formatted string for HTTP headers or HTML meta tag usage.
 */
export function generateCspHeader(directives: Partial<CspDirectives> = {}): string {
  const apiOrigin = getOrigin(env.API_URL);
  const merged = {
    ...DEFAULT_CSP_DIRECTIVES,
    connectSrc: apiOrigin
      ? [...DEFAULT_CSP_DIRECTIVES.connectSrc, apiOrigin]
      : DEFAULT_CSP_DIRECTIVES.connectSrc,
    ...directives,
  };

  const parts = [
    `default-src ${merged.defaultSrc.join(" ")}`,
    `script-src ${merged.scriptSrc.join(" ")}`,
    `style-src ${merged.styleSrc.join(" ")}`,
    `img-src ${merged.imgSrc.join(" ")}`,
    `font-src ${merged.fontSrc.join(" ")}`,
    `connect-src ${merged.connectSrc.join(" ")}`,
    `frame-ancestors ${merged.frameAncestors.join(" ")}`,
  ];

  if (merged.upgradeInsecureRequests) {
    parts.push("upgrade-insecure-requests");
  }

  return parts.join("; ");
}

function getOrigin(url: string): string | null {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}
