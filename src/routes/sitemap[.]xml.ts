import { createFileRoute } from "@tanstack/react-router";
import { env } from "../config/env";
import { generateSitemapXml, getStaticRoutes } from "../lib/seo/sitemap";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const siteUrl = env.SITE_URL.replace(/\/$/, "");
        const entries = getStaticRoutes(siteUrl);

        return new Response(generateSitemapXml(entries), {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
