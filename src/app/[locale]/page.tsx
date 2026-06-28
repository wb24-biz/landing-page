import type { Metadata } from "next";
import { buildMetadata } from "@/shared/seo/build-metadata";
import { HomeSections } from "../home-sections";

// Only the non-default locales get a URL prefix; the default (ua) stays at "/".
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ru" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(locale);
}

export default function LocalizedHome() {
  // Locale is resolved from the URL by the LocaleProvider in the root layout.
  return <HomeSections />;
}
