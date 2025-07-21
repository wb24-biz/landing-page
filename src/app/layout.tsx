import { StructuredData } from "@/components/seo/structured-data";
import Footer from "@/features/footer";
import { Header } from "@/features/header";
import type { Metadata, Viewport } from "next";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Golos_Text } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

const golosText = Golos_Text({
  variable: "--font-golos-text",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "SEO" });
  // const baseUrl = "http://test24.wb24.biz";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz";

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
    alternates: {
      canonical: baseUrl,
      languages: {
        'uk': baseUrl,
        'en': baseUrl,
        'ru': baseUrl,
        'x-default': baseUrl,
      },
    },
    authors: [{ name: "WB24", url: baseUrl }],
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", type: "image/png" }],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: baseUrl,
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
      locale: locale,
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

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className="scrollbar-thumb-sky-700 scrollbar-track-sky-300"
    >
      <head>
        <StructuredData locale={locale} />
      </head>
      <body
        className={`${golosText.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
