import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz";

// Default locale (ua) lives at "/"; other locales are prefixed (/en, /ru).
function localeUrl(locale: string): string {
  return locale === "ua" ? baseUrl : `${baseUrl}/${locale}`;
}

const languageAlternates: Record<string, string> = {
  uk: baseUrl,
  en: `${baseUrl}/en`,
  ru: `${baseUrl}/ru`,
  "x-default": baseUrl,
};

/**
 * Builds locale-aware page metadata so each statically pre-rendered route
 * (/, /en, /ru) ships its own title/description, a self-referencing canonical
 * and a shared set of hreflang alternates.
 */
export async function buildMetadata(locale: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: "SEO" });
  const canonical = localeUrl(locale);

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical,
      languages: languageAlternates,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: canonical,
      siteName: "WB24 Platform",
      images: [
        {
          url: `${baseUrl}/graph.png`,
          width: 1200,
          height: 630,
          alt: "WB24 Platform Analytics Dashboard",
          type: "image/png",
        },
      ],
      type: "website",
      locale,
      countryName: "Ukraine",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [`${baseUrl}/graph.png`],
      creator: "@wb24_biz_bot",
    },
  };
}
