"use client";

import { useTranslations } from "next-intl";
import { FAQ_IDS } from "@/features/faq";

interface StructuredDataProps {
  locale?: string;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const t = useTranslations("SEO");
  const tFaq = useTranslations("Faq");

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WB24",
    alternateName: "WB24 Platform",
    url: baseUrl,
    logo: `${baseUrl}/android-chrome-512x512.png`,
    description: t("description"),
    email: "info@wb24.biz",
    foundingLocation: {
      "@type": "Place",
      name: "Ukraine"
    },
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Country", name: "Moldova" }
    ],
    sameAs: [
      "https://t.me/wb24_biz_bot",
      "https://www.facebook.com/wb24biz",
      "https://www.youtube.com/@wb24biz"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@wb24.biz",
      availableLanguage: ["Ukrainian", "Russian", "English"]
    }
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "WB24 Vending Management Service",
    description: t("description"),
    provider: {
      "@type": "Organization",
      name: "WB24"
    },
    serviceType: "Vending Machine Management Software",
    areaServed: [
      { "@type": "Country", name: "Ukraine" },
      { "@type": "Country", name: "Moldova" }
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Vending Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Telemetry Service",
            description: "Real-time monitoring of vending machines"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Payment Processing",
            description: "Online payment via internet acquiring — QR code or NFC tag opens the acquiring operator's payment page (Visa, MasterCard, Google Pay, Apple Pay)"
          }
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fiscalization",
            description: "Tax compliance through PRRO integration"
          }
        }
      ]
    }
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "WB24 Platform",
    url: baseUrl,
    description: t("description"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    inLanguage: ["uk", "en", "ru"],
    featureList: [
      "Real-time telemetry and 24/7 monitoring",
      "Cashless online payments via internet acquiring (QR/NFC, Visa, MasterCard, Google Pay, Apple Pay)",
      "Sales fiscalization via a software PRRO with QR receipts",
      "Instant Telegram alerts for failures and required service",
      "Remote goods release, restart, settings and software updates",
      "Network and equipment sales analytics",
      "Role-based access control",
      "Temperature monitoring and control"
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "EUR",
        description: "1 machine, 1 user, 1 cash register (PRRO), up to 100 days of order history"
      },
      {
        "@type": "Offer",
        name: "Optimal",
        price: "0.10",
        priceCurrency: "EUR",
        description: "Per machine per day — workgroups, acquiring and Telegram integrations, up to 15 months of order history"
      },
      {
        "@type": "Offer",
        name: "Premium",
        price: "2.60",
        priceCurrency: "EUR",
        description: "Per machine per month, from 30 machines — all Optimal features"
      }
    ],
    creator: {
      "@type": "Organization",
      name: "WB24"
    }
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WB24 Platform",
    alternateName: "WB24",
    url: baseUrl,
    inLanguage: ["uk", "en", "ru"],
    publisher: {
      "@type": "Organization",
      name: "WB24"
    }
  };

  // Built from the same translations as the visible FAQ section so the schema
  // and on-page Q&A always stay in sync (good for rich results and GEO).
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_IDS.map((id) => ({
      "@type": "Question",
      name: tFaq(`items.${id}.question`),
      acceptedAnswer: {
        "@type": "Answer",
        text: tFaq(`items.${id}.answer`),
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}