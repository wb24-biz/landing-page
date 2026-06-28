export function LocaleScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var path = location.pathname;
              var locale;
              // Localized routes (/en, /ru) are locked to the URL; "/" uses the
              // stored preference so the in-place language switcher keeps working.
              if (path === '/en' || path.indexOf('/en/') === 0) {
                locale = 'en';
              } else if (path === '/ru' || path.indexOf('/ru/') === 0) {
                locale = 'ru';
              } else {
                locale = localStorage.getItem('NEXT_LOCALE') || 'ua';
              }
              var locales = ['en', 'ua', 'ru'];
              if (locales.includes(locale)) {
                // Set lang before any content renders
                document.documentElement.lang = locale;
                document.documentElement.setAttribute('data-locale', locale);
                // Set a flag to prevent hydration mismatch
                window.__INITIAL_LOCALE__ = locale;
              }
            } catch (e) {
              window.__INITIAL_LOCALE__ = 'ua';
            }
          })();
        `,
      }}
    />
  );
}