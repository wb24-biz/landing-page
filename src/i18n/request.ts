import { getRequestConfig } from "next-intl/server";
import { defaultLocale, locales } from "./config";

export default getRequestConfig(async ({ locale, requestLocale }) => {
  // `locale` is set when an explicit value is passed (e.g. getTranslations in
  // buildMetadata); otherwise fall back to the matched segment / default.
  const requested = locale ?? (await requestLocale);
  const resolved =
    requested && (locales as readonly string[]).includes(requested)
      ? requested
      : defaultLocale;

  return {
    locale: resolved,
    messages: (await import(`../../messages/${resolved}.json`)).default,
  };
});
