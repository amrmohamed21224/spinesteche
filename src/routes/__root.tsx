import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  useLocation,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { initGA } from "../lib/analytics/ga";
import { useAnalytics } from "../hooks/useAnalytics";
import { validateEnv } from "../config/env";
import { monitoringClient } from "../lib/monitoring/client";
import { LocaleProvider, LocaleHtmlSync, useTranslation } from "../i18n";
import { ConsultationProvider } from "../contexts/ConsultationContext";

function NotFoundComponent() {
  const { t, dir } = useTranslation();
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" dir={dir}>
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-on-surface">{t("errors.notFoundTitle")}</h2>
        <p className="mt-2 text-sm text-on-surface-variant">{t("errors.notFoundMessage")}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-on-secondary transition-colors hover:bg-secondary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
          >
            {t("errors.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t, dir } = useTranslation();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4" dir={dir}>
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-primary">
          {t("errors.pageErrorTitle")}
        </h1>
        <p className="mt-2 text-sm text-on-surface-variant">{t("errors.pageErrorMessage")}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-on-secondary transition-colors hover:bg-secondary/90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/50"
          >
            {t("common.retry")}
          </button>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-lg border border-outline-variant bg-background px-6 py-3 text-sm font-medium text-on-surface transition-colors hover:bg-surface-container focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            {t("errors.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "SpinesTech | حلول برمجية مخصصة" },
      {
        name: "description",
        content:
          "SpinesTech - حلول برمجية مخصصة، أنظمة ERP، وذكاء اصطناعي للشركات الطموحة في السعودية والخليج.",
      },
      { property: "og:title", content: "SpinesTech" },
      {
        property: "og:description",
        content: "حلول برمجية مخصصة للشركات الطموحة في السعودية والخليج.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "icon", href: "/images/brand/icon.png", type: "image/png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="gradient-mesh overflow-x-hidden">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const location = useLocation();
  const { trackPageView } = useAnalytics();

  useEffect(() => {
    // 1. Validate environment configuration parameters
    validateEnv();

    // 2. Initialize GA4 wrapper
    initGA();

    // 3. Setup web performance vitals listener
    monitoringClient.initPerformanceMonitoring();
  }, []);

  useEffect(() => {
    // 4. Record page view events on route transitions
    const title = typeof document !== "undefined" ? document.title : "SpinesTech";
    trackPageView(title, location.pathname);
  }, [location.pathname, trackPageView]);

  return (
    <LocaleProvider>
      <LocaleHtmlSync />
      <QueryClientProvider client={queryClient}>
        <ConsultationProvider>
          <Outlet />
        </ConsultationProvider>
      </QueryClientProvider>
    </LocaleProvider>
  );
}
