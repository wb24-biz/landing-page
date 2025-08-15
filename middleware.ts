import createMiddleware from 'next-intl/middleware';
import { defaultLocale, locales } from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: false // Disable automatic detection for static export
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};