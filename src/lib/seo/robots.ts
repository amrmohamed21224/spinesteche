/**
 * Robots.txt generator config for SpinesTech
 */

export function generateRobotsTxt(
  sitemapUrl: string = "https://spinestech.sa/sitemap.xml",
): string {
  return `User-agent: *
Allow: /
Disallow: /api/
Disallow: /admin/
Disallow: /private/

Sitemap: ${sitemapUrl}
`;
}
