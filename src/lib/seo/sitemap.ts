/**
 * Dynamic sitemap generator logic for SpinesTech
 */

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
}

export function generateSitemapXml(entries: SitemapEntry[]): string {
  const xmlEntries = entries
    .map(
      (entry) => `
  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`,
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlEntries}
</urlset>`;
}

export function getStaticRoutes(): SitemapEntry[] {
  const now = new Date().toISOString().split("T")[0];

  return [
    { url: "https://spinestech.sa/", lastmod: now, changefreq: "daily", priority: 1.0 },
    { url: "https://spinestech.sa/about", lastmod: now, changefreq: "monthly", priority: 0.8 },
    { url: "https://spinestech.sa/services", lastmod: now, changefreq: "weekly", priority: 0.9 },
    { url: "https://spinestech.sa/products", lastmod: now, changefreq: "weekly", priority: 0.9 },
    { url: "https://spinestech.sa/sectors", lastmod: now, changefreq: "monthly", priority: 0.7 },
    {
      url: "https://spinestech.sa/case-studies",
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    },
    { url: "https://spinestech.sa/pricing", lastmod: now, changefreq: "monthly", priority: 0.7 },
    { url: "https://spinestech.sa/careers", lastmod: now, changefreq: "weekly", priority: 0.6 },
  ];
}
