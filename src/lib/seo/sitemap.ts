/**
 * Dynamic sitemap generator logic for SpinesTech
 */
import { mockCareers } from "../../data/careers";
import { mockCaseStudies } from "../../data/caseStudies";
import { mockServices } from "../../data/services";

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

export function getStaticRoutes(siteUrl = "https://spinestech.sa"): SitemapEntry[] {
  const now = new Date().toISOString().split("T")[0];
  const base = siteUrl.replace(/\/$/, "");
  const detailRoutes: SitemapEntry[] = [
    ...mockServices.map((service) => ({
      url: `${base}/services/${service.slug}`,
      lastmod: now,
      changefreq: "monthly" as const,
      priority: 0.7,
    })),
    ...mockCaseStudies.map((caseStudy) => ({
      url: `${base}/case-studies/${caseStudy.slug}`,
      lastmod: now,
      changefreq: "monthly" as const,
      priority: 0.7,
    })),
    ...mockCareers.map((job) => ({
      url: `${base}/careers/${job.slug}`,
      lastmod: now,
      changefreq: "weekly" as const,
      priority: 0.5,
    })),
  ];

  return [
    { url: `${base}/`, lastmod: now, changefreq: "daily", priority: 1.0 },
    { url: `${base}/about`, lastmod: now, changefreq: "monthly", priority: 0.8 },
    { url: `${base}/services`, lastmod: now, changefreq: "weekly", priority: 0.9 },
    { url: `${base}/products`, lastmod: now, changefreq: "weekly", priority: 0.9 },
    { url: `${base}/sectors`, lastmod: now, changefreq: "monthly", priority: 0.7 },
    {
      url: `${base}/case-studies`,
      lastmod: now,
      changefreq: "weekly",
      priority: 0.8,
    },
    { url: `${base}/pricing`, lastmod: now, changefreq: "monthly", priority: 0.7 },
    { url: `${base}/careers`, lastmod: now, changefreq: "weekly", priority: 0.6 },
    { url: `${base}/contact`, lastmod: now, changefreq: "monthly", priority: 0.7 },
    ...detailRoutes,
  ];
}
