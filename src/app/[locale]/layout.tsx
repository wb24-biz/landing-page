import Footer from "@/features/footer";
import { Header } from "@/features/header";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Golos_Text } from "next/font/google";
import { notFound } from "next/navigation";
import { Toaster } from "sonner";
import "../globals.css";
import { Providers } from "../providers";
import { StagewiseToolbarDevOnly } from "../stagewise-toolbar";

const golosText = Golos_Text({
  variable: "--font-golos-text",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "WB24 Platform",
  description: "Software for managing vending machines real-time 24/7",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Params = {
  locale: string;
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<Params>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${golosText.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <StagewiseToolbarDevOnly />
            <Header />
            {children}
            <footer id="contacts">
              <Footer />
            </footer>
            <Toaster richColors />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
