import { useTranslations } from "next-intl";

interface StructuredDataProps {
  locale: string;
}

export function StructuredData({ locale }: StructuredDataProps) {
  const t = useTranslations("SEO");
  
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
    areaServed: {
      "@type": "Country",
      name: "Ukraine"
    },
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
            description: "Online payment via NFC, QR, PayPass"
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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Чи потрібен фіскальний реєстратор?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "WB24 підтримує як фізичні РРО, так і ПРРО — вибирайте потрібний варіант."
        }
      },
      {
        "@type": "Question",
        name: "Які типи автоматів підтримуються?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Будь-які, що мають MDB, Executive або протокол DEX/UCS."
        }
      },
      {
        "@type": "Question",
        name: "Чи працює без інтернету?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Так, модуль кешує операції і передає при відновленні зв'язку."
        }
      }
    ]
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