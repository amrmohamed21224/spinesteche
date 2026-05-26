/**
 * SpinesTech SEO Foundation
 *
 * Provides a centralized helper to generate consistent meta tags
 * for TanStack Start route `head()` functions.
 *
 * Usage in any route:
 *   import { seo } from "../lib/seo";
 *
 *   head: () => seo({
 *     title: "من نحن",
 *     description: "تعرف على شركة SpinesTech...",
 *   })
 */

const SITE_NAME = "SpinesTech";
const DEFAULT_DESCRIPTION =
  "SpinesTech - حلول برمجية مخصصة، أنظمة ERP، وذكاء اصطناعي للشركات الطموحة في السعودية والخليج.";
const SITE_URL = "https://spinestech.sa";
const DEFAULT_OG_IMAGE = "/og-image.png";

interface SeoOptions {
  /** Page-specific title — will be appended with site name */
  title?: string;
  /** Meta description */
  description?: string;
  /** Full canonical URL path, e.g. "/about" */
  path?: string;
  /** OG image URL */
  ogImage?: string;
  /** OG type */
  ogType?: "website" | "article";
  /** Additional meta tags */
  extra?: Array<Record<string, string>>;
}

export function seo(options: SeoOptions = {}) {
  const {
    title,
    description = DEFAULT_DESCRIPTION,
    path = "/",
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    extra = [],
  } = options;

  const fullTitle = title ? `${SITE_NAME} | ${title}` : SITE_NAME;
  const canonicalUrl = `${SITE_URL}${path}`;

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      // Open Graph
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: ogType },
      { property: "og:url", content: canonicalUrl },
      { property: "og:image", content: ogImage },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:locale", content: "ar_SA" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: ogImage },
      // Additional
      ...extra,
    ],
    links: [{ rel: "canonical", href: canonicalUrl }],
  };
}

/**
 * generateMetadata
 * Standardized alias for seo() to define route meta tags dynamically.
 */
export const generateMetadata = seo;
