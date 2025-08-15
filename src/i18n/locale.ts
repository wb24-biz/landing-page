import { defaultLocale, Locale } from "./config";

// For static export, use localStorage instead of cookies
const STORAGE_KEY = "NEXT_LOCALE";

export function getUserLocale(): string {
  if (typeof window === "undefined") {
    return defaultLocale;
  }
  return localStorage.getItem(STORAGE_KEY) || defaultLocale;
}

export function setUserLocale(locale: Locale) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, locale);
}
