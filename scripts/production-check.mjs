const DEFAULT_FRONTEND_URL = "https://spinesteche.vercel.app";
const DEFAULT_API_URL = "https://spinesteche.great-site.net/wp/wp-json/spinestech/v1";

const frontendUrl = (
  process.env.FRONTEND_URL ||
  process.env.VITE_SITE_URL ||
  DEFAULT_FRONTEND_URL
).replace(/\/$/, "");
const apiUrl = (process.env.API_URL || process.env.VITE_API_URL || DEFAULT_API_URL).replace(
  /\/$/,
  "",
);
const strictBackend = process.argv.includes("--strict") || process.env.STRICT_BACKEND === "true";

const frontendRoutes = [
  { path: "/", type: "text/html", minLength: 1000 },
  { path: "/solutions", type: "text/html", minLength: 1000 },
  { path: "/consultation", type: "text/html", minLength: 1000 },
  { path: "/quote", type: "text/html", minLength: 1000 },
  { path: "/services/custom-software", type: "text/html", minLength: 1000 },
  { path: "/case-studies/supply-chain-erp", type: "text/html", minLength: 1000 },
  { path: "/careers/senior-web-developer", type: "text/html", minLength: 1000 },
  { path: "/robots.txt", type: "text/plain", minLength: 20 },
  { path: "/sitemap.xml", type: "application/xml", minLength: 500 },
];

const requiredHeaders = [
  "content-security-policy",
  "x-content-type-options",
  "referrer-policy",
  "x-frame-options",
  "permissions-policy",
  "strict-transport-security",
];

const sitemapNeedles = [
  "/services/custom-software",
  "/solutions",
  "/consultation",
  "/quote",
  "/case-studies/supply-chain-erp",
  "/careers/senior-web-developer",
];

function absoluteUrl(base, path) {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

function ok(message) {
  console.log(`[ok] ${message}`);
}

function warn(message) {
  console.warn(`[warn] ${message}`);
}

function fail(message) {
  console.error(`[fail] ${message}`);
}

async function fetchText(url) {
  const response = await fetch(url, { redirect: "follow" });
  const text = await response.text();
  return { response, text };
}

async function checkFrontendRoutes() {
  let failures = 0;

  for (const route of frontendRoutes) {
    const url = absoluteUrl(frontendUrl, route.path);
    try {
      const { response, text } = await fetchText(url);
      const contentType = response.headers.get("content-type") || "";
      const hasExpectedType = contentType.includes(route.type);
      const hasEnoughContent = text.length >= route.minLength;

      if (response.ok && hasExpectedType && hasEnoughContent) {
        ok(`${route.path} ${response.status} ${contentType} ${text.length} bytes`);
      } else {
        failures += 1;
        fail(
          `${route.path} status=${response.status} type=${contentType || "none"} length=${text.length}`,
        );
      }
    } catch (error) {
      failures += 1;
      fail(`${route.path} ${error.message}`);
    }
  }

  return failures;
}

async function checkSecurityHeaders() {
  let failures = 0;

  try {
    const { response } = await fetchText(frontendUrl);

    for (const header of requiredHeaders) {
      if (response.headers.has(header)) {
        ok(`header ${header}`);
      } else {
        failures += 1;
        fail(`missing header ${header}`);
      }
    }
  } catch (error) {
    failures += 1;
    fail(`security headers check failed: ${error.message}`);
  }

  return failures;
}

async function checkSitemap() {
  let failures = 0;

  try {
    const { text } = await fetchText(absoluteUrl(frontendUrl, "/sitemap.xml"));

    for (const needle of sitemapNeedles) {
      if (text.includes(needle)) {
        ok(`sitemap contains ${needle}`);
      } else {
        failures += 1;
        fail(`sitemap missing ${needle}`);
      }
    }
  } catch (error) {
    failures += 1;
    fail(`sitemap check failed: ${error.message}`);
  }

  return failures;
}

async function checkWordPressHealth() {
  const url = absoluteUrl(apiUrl, "/health");

  try {
    const { response, text } = await fetchText(url);
    const contentType = response.headers.get("content-type") || "";

    if (!contentType.includes("json")) {
      warn(`WordPress health is not JSON: status=${response.status} type=${contentType}`);
      warn(`Preview: ${text.replace(/\s+/g, " ").slice(0, 140)}`);
      return false;
    }

    const payload = JSON.parse(text);
    if (response.ok && payload.status === "ok") {
      ok("WordPress health returned JSON status=ok");
      return true;
    }

    warn(`WordPress health JSON is unexpected: ${JSON.stringify(payload).slice(0, 160)}`);
    return false;
  } catch (error) {
    warn(`WordPress health check failed: ${error.message}`);
    return false;
  }
}

console.log(`Production audit`);
console.log(`Frontend: ${frontendUrl}`);
console.log(`API: ${apiUrl}`);
console.log("");

let failures = 0;
failures += await checkFrontendRoutes();
failures += await checkSecurityHeaders();
failures += await checkSitemap();

const backendReady = await checkWordPressHealth();
if (!backendReady) {
  warn("Backend is still blocked. Keep VITE_USE_MOCKS=true until WordPress returns JSON.");
  if (strictBackend) {
    failures += 1;
  }
}

console.log("");
if (failures > 0) {
  fail(`Audit finished with ${failures} failure(s).`);
  process.exit(1);
}

ok("Frontend production audit passed.");
if (!backendReady) {
  warn("WordPress live-data switch is not ready yet.");
}
