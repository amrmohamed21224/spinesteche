/**
 * SpinesTech Media & Image Optimization Helpers.
 * Handles WordPress upload directories, CDN routing, and responsive sizes.
 */

export const PLACEHOLDER_IMAGE = "/images/placeholder.jpg";

/**
 * Normalizes a media URL, ensuring it points to local directories or absolute CDN targets.
 */
export function normalizeWpMediaUrl(url: string | null | undefined): string {
  if (!url) return PLACEHOLDER_IMAGE;

  // If it's a relative path starting with wp-content, prefix with backend domain or absolute CDN
  if (url.startsWith("/wp-content")) {
    const apiHost = "https://api.spinestech.sa";
    return `${apiHost}${url}`;
  }

  return url;
}

/**
 * Generates an HTML standard responsive srcset string for standard WordPress image sizes.
 */
export function getResponsiveSrcSet(originalUrl: string): {
  src: string;
  srcSet: string;
  sizes: string;
} {
  const url = normalizeWpMediaUrl(originalUrl);
  if (url === PLACEHOLDER_IMAGE || url.includes("data:image")) {
    return { src: url, srcSet: "", sizes: "" };
  }

  // Common WP responsive widths: 150 (thumbnail), 300 (medium), 768 (medium_large), 1024 (large), 1536, 2048
  const baseWithoutExt = url.replace(/\.[^/.]+$/, "");
  const ext = url.split(".").pop();

  const srcSet = `
    ${url} 1024w,
    ${baseWithoutExt}-300x300.${ext} 300w,
    ${baseWithoutExt}-768x768.${ext} 768w
  `.trim();

  return {
    src: url,
    srcSet,
    sizes: "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 1024px",
  };
}
