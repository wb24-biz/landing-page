"use client";

import { useEffect, useState } from "react";
import { defaultLocale, Locale, locales } from "./config";
import { getUserLocale } from "./locale";

export function NoFlashLoader({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const savedLocale = getUserLocale() as Locale;
    if (locales.includes(savedLocale)) {
      setLocale(savedLocale);
    }
    setMounted(true);
  }, []);

  // Hide content until mounted to prevent flash
  if (!mounted) {
    return (
      <div style={{ visibility: 'hidden' }}>
        {children}
      </div>
    );
  }

  return <>{children}</>;
}