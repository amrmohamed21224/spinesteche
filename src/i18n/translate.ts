import type { Locale } from "./types";
import { ar } from "./messages/ar";
import { en } from "./messages/en";

const catalogs = { ar, en } as const;

export type Messages = typeof ar;

function getNested(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export function translate(locale: Locale, key: string): string {
  const value = getNested(catalogs[locale] as Record<string, unknown>, key);
  if (typeof value === "string") return value;
  const fallback = getNested(catalogs.ar as Record<string, unknown>, key);
  return typeof fallback === "string" ? fallback : key;
}
