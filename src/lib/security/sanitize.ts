/**
 * SpinesTech Input & HTML Sanitization Utility.
 * Provides basic escaping and tag stripping to guard against XSS vulnerabilities.
 */

/**
 * Escapes common HTML special characters.
 */
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Basic stripper to sanitize input text, removing any <script> tags.
 */
export function stripScriptTags(html: string): string {
  if (!html) return "";
  return html.replace(/<script[^>]*>([\S\s]*?)<\/script>/gi, "");
}

/**
 * Strips all HTML tags, returning raw text.
 */
export function stripAllHtml(html: string): string {
  if (!html) return "";
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}
