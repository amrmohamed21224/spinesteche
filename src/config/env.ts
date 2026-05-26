/**
 * SpinesTech Typed Environment Configuration.
 * Fully checks and validates standard environment variables across SSR and Browser scopes.
 */

export interface Environment {
  NODE_ENV: "development" | "production" | "test";
  API_URL: string;
  USE_MOCKS: boolean;
  SITE_URL: string;
  GA_ID: string;
  IS_BROWSER: boolean;
  IS_SERVER: boolean;
}

const isBrowser = typeof window !== "undefined";

// Safe reader supporting Node process.env, Vite import.meta.env, or browser injection
function getEnvVar(key: string, fallback: string): string {
  if (isBrowser) {
    const injected =
      (window as unknown as Record<string, string>)[`__ENV_${key}__`] ||
      (window as unknown as Record<string, string>)[key];
    if (injected) return injected;
  }

  // Try Vite import.meta.env
  try {
    const metaEnv = (import.meta as unknown as Record<string, Record<string, string>>).env;
    if (metaEnv && metaEnv[key]) return metaEnv[key];
  } catch (err) {
    // Quietly ignore if not running under Vite
  }

  // Try process.env
  try {
    if (process.env && process.env[key]) return process.env[key];
  } catch (err) {
    // Quietly ignore if process.env is unavailable
  }

  return fallback;
}

export const env: Environment = {
  NODE_ENV: getEnvVar("NODE_ENV", "production") as "development" | "production" | "test",
  API_URL: getEnvVar("VITE_API_URL", "https://api.spinestech.sa/v1"),
  USE_MOCKS: getEnvVar("VITE_USE_MOCKS", "true") === "true",
  SITE_URL: getEnvVar("VITE_SITE_URL", "https://spinestech.sa"),
  GA_ID: getEnvVar("VITE_GA_ID", "G-XXXXXXXXXX"),
  IS_BROWSER: isBrowser,
  IS_SERVER: !isBrowser,
};

/**
 * Perform runtime checks for environment parameters.
 */
export function validateEnv(): void {
  if (env.NODE_ENV === "production") {
    if (env.USE_MOCKS) {
      console.warn(
        `[Environment Warning]: VITE_USE_MOCKS is set to true in production. Mock datasets will be served.`,
      );
    }
    if (env.API_URL.includes("localhost") || env.API_URL.includes("127.0.0.1")) {
      console.warn(
        `[Environment Warning]: VITE_API_URL points to local address in production: ${env.API_URL}`,
      );
    }
  }
}
