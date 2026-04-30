import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz";

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
    },
  ];
}
