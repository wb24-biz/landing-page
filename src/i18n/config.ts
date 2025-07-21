export type Locale = (typeof locales)[number];

export const locales = ["en", "ua", "ru"] as const;
export const defaultLocale: Locale = "ua";
