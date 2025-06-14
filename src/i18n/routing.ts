import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ua", "ru"],

  // Used when no locale matches
  defaultLocale: "ua",

  // Always use locale prefix to avoid hydration issues
  localePrefix: "always",

  // Disable automatic locale detection to prevent hydration mismatches
  localeDetection: false
});
