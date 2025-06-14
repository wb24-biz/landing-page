import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Typically corresponds to the `[locale]` segment
  let requested = await requestLocale;
  
  // Ensure we have a valid locale
  const locale = requested && hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  console.log('DEBUG: requested locale:', requested);
  console.log('DEBUG: final locale:', locale);
  console.log('DEBUG: loading messages for:', locale);

  try {
    const messages = (await import(`../../messages/${locale}.json`)).default;
    console.log('DEBUG: messages loaded successfully, header keys:', Object.keys(messages.header || {}));
    
    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error('DEBUG: Error loading messages for locale:', locale, error);
    // Fallback to default locale
    const fallbackMessages = (await import(`../../messages/${routing.defaultLocale}.json`)).default;
    return {
      locale: routing.defaultLocale,
      messages: fallbackMessages,
    };
  }
});
