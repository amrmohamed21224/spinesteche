import { createFileRoute } from "@tanstack/react-router";
import { env } from "../config/env";
import { generateRobotsTxt } from "../lib/seo/robots";

export const Route = createFileRoute("/robots.txt")({
  server: {
    handlers: {
      GET: async () => {
        const siteUrl = env.SITE_URL.replace(/\/$/, "");

        return new Response(generateRobotsTxt(`${siteUrl}/sitemap.xml`), {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
