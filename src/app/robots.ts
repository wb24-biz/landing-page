import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "http://wb24.biz";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/", // Example: disallow a private directory
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
