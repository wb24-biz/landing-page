"use client";

import { useTranslations } from "next-intl";
import { FAQ_IDS } from "@/features/faq";

interface StructuredDataProps {
  locale?: string;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const t = useTranslations("SEO");
  const tFaq = useTranslations("Faq");
  
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WB24",
    alternateName: "WB24 Platform",
    url: process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz",
    logo: `${process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz"}/android-chrome-512x512.png`,
    description: t("description"),
    foundingLocation: {
      "@type": "Place",
      name: "Ukraine"
    },
    sameAs: [
      "https://t.me/wb24_biz_bot",
      "https://www.facebook.com/wb24biz",
      "https://www.youtube.com/@wb24biz"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+380",
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
    description: t("description"),
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier available"
    },
    creator: {
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
          __html: JSON.stringify(faqSchema),
        }}
      />
    </>
  );
}