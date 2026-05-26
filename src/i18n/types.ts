export type Locale = "ar" | "en";

export const LOCALES: Locale[] = ["ar", "en"];

export const LOCALE_STORAGE_KEY = "spinestech-locale";

export function isLocale(value: string | null | undefined): value is Locale {
  return value === "ar" || value === "en";
}

export function getDir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
