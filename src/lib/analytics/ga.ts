import { AnalyticsEvent } from "./events";
import { env } from "../../config/env";

// Extend window interface for Google Analytics dataLayer
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const GA_TRACKING_ID = env.GA_ID;

/**
 * Checks if running on the client side.
 */
const isClient = typeof window !== "undefined";

/**
 * Initialize Google Analytics script tags securely on the DOM.
 */
export function initGA(): void {
  if (!isClient) return;
  if (!GA_TRACKING_ID || GA_TRACKING_ID === "G-XXXXXXXXXX") return;

  // Prevent multiple initializations
  if (window.gtag) return;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };

  window.gtag("js", new Date());
  window.gtag("config", GA_TRACKING_ID, {
    send_page_view: false, // Managed manually via route transition tracking
    anonymize_ip: true, // Privacy regulation compliance (GDPR/NDMO)
    cookie_flags: "SameSite=None;Secure",
  });

  console.log("[Analytics] Initialized GA4 Stub successfully.");
}

/**
 * Dynamic event logger. Safe to execute in SSR or when GA is blocked.
 */
export function logEvent(event: AnalyticsEvent): void {
  if (!isClient) return;

  // Fallback dev logs
  if (process.env.NODE_ENV === "development") {
    console.group(`📊 [Analytics Event]: ${event.name}`);
    console.table(event.params);
    console.groupEnd();
  }

  if (window.gtag) {
    window.gtag("event", event.name, event.params);
  } else {
    // If GA script hasn't loaded or is blocked by an ad-blocker, queue it in the dataLayer directly
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: event.name,
      ...event.params,
    });
  }
}
