import { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "http://test24.wb24.biz";

  // Add other pages here as your site grows
  const pages = [""]; // Home page

  const sitemapEntries: MetadataRoute.Sitemap = [];

  pages.forEach((page) => {
    routing.locales.forEach((locale) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
      });
    });
  });

  return sitemapEntries;
}
