import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz";
  const lastModified = new Date();

  const languages = {
    uk: `${baseUrl}/`,
    en: `${baseUrl}/en`,
    ru: `${baseUrl}/ru`,
    "x-default": `${baseUrl}/`,
  };

  return [
    { url: `${baseUrl}/`, lastModified, alternates: { languages } },
    { url: `${baseUrl}/en`, lastModified, alternates: { languages } },
    { url: `${baseUrl}/ru`, lastModified, alternates: { languages } },
  ];
}
