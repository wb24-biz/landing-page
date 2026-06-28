import { StructuredData } from "@/components/seo/structured-data";
import Footer from "@/features/footer";
import { Header } from "@/features/header";
import { ScrollToTop } from "@/features/scroll-to-top";
import type { Metadata, Viewport } from "next";
import { defaultLocale } from "@/i18n/config";
import { LocaleScript } from "@/i18n/locale-script";
import { Golos_Text } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { Providers } from "./providers";

const golosText = Golos_Text({
  variable: "--font-golos-text",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz";

// Locale-independent metadata. Per-route title/description/canonical/hreflang
// are provided by each page via buildMetadata().
export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
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
};

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
  const locale = defaultLocale;
  
  // Load all messages for static build
  const allMessages = {
    en: (await import("../../messages/en.json")).default,
    ua: (await import("../../messages/ua.json")).default,  
    ru: (await import("../../messages/ru.json")).default,
  };

  return (
    <html
      lang="ua" // Will be updated by script before content renders
      className="scrollbar-thumb-sky-700 scrollbar-track-sky-300"
    >
      <head>
        <LocaleScript />
      </head>
      <body
        className={`${golosText.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers locale={locale} messages={allMessages}>
          <StructuredData />
          <Header />
          {children}
          <Footer />
          <ScrollToTop />
          <Toaster richColors />
        </Providers>
      </body>
    </html>
  );
}
