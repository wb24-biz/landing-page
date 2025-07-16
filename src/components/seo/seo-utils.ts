export const generateCanonicalUrl = (locale: string, path: string = '') => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wb24.biz';
  return `${baseUrl}/${locale}${path}`;
};

export const generateHrefLang = (locales: string[], currentPath: string = '') => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wb24.biz';
  
  return locales.map(locale => ({
    hrefLang: locale,
    href: `${baseUrl}/${locale}${currentPath}`
  }));
};

export const generateBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
};

export const generateWebSiteSchema = (locale: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://wb24.biz';
  
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "WB24",
    "alternateName": "WB24 Platform",
    "url": `${baseUrl}/${locale}`,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${baseUrl}/${locale}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
};

export const seoConfig = {
  defaultTitle: 'WB24 — Розумний сервіс для вендингу з телеметрією, оплатою та фіскалізацією',
  titleTemplate: '%s | WB24',
  description: 'Хмарна платформа для автоматизації вендингового бізнесу в Україні. Телеметрія в реальному часі, онлайн-оплата, фіскалізація через ПРРО',
  keywords: 'фіскалізація вендінга, фіскалізація автоматів продажу, ПРРО для вендінга, моніторинг автоматів, телеметрія для автоматів продаж',
  author: 'WB24',
  robots: 'index, follow',
  // googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION,
  // bingSiteVerification: process.env.BING_SITE_VERIFICATION,
};