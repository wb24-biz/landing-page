import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "ua", "ru"],

  // Used when no locale matches
  defaultLocale: "ua",

  // Don't use locale prefix in pathname
  localePrefix: "never"
});
