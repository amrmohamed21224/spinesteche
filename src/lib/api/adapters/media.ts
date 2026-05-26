import { WpRestPost } from "./wordpress";

export interface NormalizedMedia {
  url: string;
  alt: string;
  width?: number;
  height?: number;
}

const FALLBACK_IMAGE = "/images/placeholder.jpg";

/**
 * Extracts and normalizes featured images from WP REST embedded structures or GraphQL media nodes.
 */
export function extractFeaturedImage(post: Partial<WpRestPost>): NormalizedMedia {
  // Check REST embedded fields
  if (post._embedded?.["wp:featuredmedia"]?.[0]) {
    const media = post._embedded["wp:featuredmedia"][0];
    return {
      url: media.source_url || FALLBACK_IMAGE,
      alt: media.alt_text || post.title?.rendered || "SpinesTech CMS Image",
    };
  }

  // Check GraphQL format: featuredImage { node { sourceUrl, altText } }
  const gqlPost = post as unknown as {
    featuredImage?: {
      node?: {
        sourceUrl?: string;
        altText?: string;
      };
    };
    title?: string;
  };
  if (gqlPost.featuredImage?.node) {
    return {
      url: gqlPost.featuredImage.node.sourceUrl || FALLBACK_IMAGE,
      alt: gqlPost.featuredImage.node.altText || gqlPost.title || "SpinesTech CMS Image",
    };
  }

  return {
    url: FALLBACK_IMAGE,
    alt: "SpinesTech Placeholder Image",
  };
}

/**
 * Normalizes remote asset URLs to serve from configured custom CDN proxies if available.
 */
export function normalizeCdnUrl(url: string, cdnHost?: string): string {
  if (!url || !cdnHost) return url;
  try {
    const parsed = new URL(url);
    parsed.host = cdnHost;
    return parsed.toString();
  } catch {
    return url;
  }
}
