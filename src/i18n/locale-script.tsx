export function LocaleScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            try {
              var locale = localStorage.getItem('NEXT_LOCALE') || 'ua';
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