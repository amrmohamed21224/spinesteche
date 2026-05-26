import { seo } from "../../seo";

export interface WpYoastMeta {
  title?: string;
  description?: string;
  canonical?: string;
  opengraphTitle?: string;
  opengraphDescription?: string;
  opengraphImage?: {
    sourceUrl?: string;
  };
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: {
    sourceUrl?: string;
  };
}

/**
 * Normalizes WP Yoast/RankMath plugin headers to SpinesTech seo() parameters.
 */
export function normalizeSeoMeta(wpMeta: Partial<WpYoastMeta>, defaultTitle: string, path = "/") {
  const title = wpMeta.title || wpMeta.opengraphTitle || defaultTitle;
  const description = wpMeta.description || wpMeta.opengraphDescription || "";
  const ogImage = wpMeta.opengraphImage?.sourceUrl || wpMeta.twitterImage?.sourceUrl || undefined;

  const extraMeta: Array<Record<string, string>> = [];
  if (wpMeta.twitterTitle) {
    extraMeta.push({ name: "twitter:title", content: wpMeta.twitterTitle });
  }
  if (wpMeta.twitterDescription) {
    extraMeta.push({ name: "twitter:description", content: wpMeta.twitterDescription });
  }

  return seo({
    title,
    description,
    path,
    ogImage,
    extra: extraMeta.length > 0 ? extraMeta : undefined,
  });
}
