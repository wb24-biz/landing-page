import type { Metadata } from "next";
import { defaultLocale } from "@/i18n/config";
import { buildMetadata } from "@/shared/seo/build-metadata";
import { HomeSections } from "./home-sections";

export function generateMetadata(): Promise<Metadata> {
  return buildMetadata(defaultLocale);
}

export default function Home() {
  return <HomeSections />;
}
