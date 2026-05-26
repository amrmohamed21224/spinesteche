/**
 * Normalization helper tools for WordPress Rest and GraphQL payloads.
 */

export interface WpRestPost {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  acf?: Record<string, unknown>;
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

/**
 * Strips hostnames to extract relative slug paths from full URLs.
 */
export function normalizeSlug(urlOrSlug: string): string {
  if (!urlOrSlug) return "/";
  try {
    const url = new URL(urlOrSlug);
    return url.pathname;
  } catch {
    return urlOrSlug.startsWith("/") ? urlOrSlug : `/${urlOrSlug}`;
  }
}

/**
 * Extracts ACF custom fields safely with fallback records.
 */
export function getAcfFields(post: Partial<WpRestPost>): Record<string, unknown> {
  return post.acf || {};
}
