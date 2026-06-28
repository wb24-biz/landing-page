"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { defaultLocale, Locale, locales } from "./config";
import { setUserLocale as setStorageLocale } from "./locale";

// Derive the locale from the URL for the statically pre-rendered localized
// routes (/en, /ru). On those routes the locale is "locked" to the URL so the
// SSG output and hydration both stay in that language. The default locale lives
// at "/" and keeps the client-side (localStorage) switcher.
function localeFromPathname(pathname: string | null): Locale | null {
  if (!pathname) return null;
  if (pathname === "/en" || pathname.startsWith("/en/")) return "en";
  if (pathname === "/ru" || pathname.startsWith("/ru/")) return "ru";
  return null;
}

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  messages: Record<string, any>;
  locked: boolean;
}

const LocaleContext = createContext<LocaleContextType | null>(null);

export function useLocaleContext() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocaleContext must be used within LocaleProvider");
  }
  return context;
}

interface LocaleProviderProps {
  children: React.ReactNode;
  initialMessages: Record<string, Record<string, any>>;
}

export function LocaleProvider({ children, initialMessages }: LocaleProviderProps) {
  const pathname = usePathname();
  const urlLocale = localeFromPathname(pathname);
  const locked = urlLocale !== null;

  // Resolve the locale once: URL wins on localized routes, otherwise the
  // pre-hydration localStorage value, otherwise the default.
  const resolveInitial = (): Locale => {
    if (urlLocale) return urlLocale;
    if (typeof window !== "undefined" && (window as any).__INITIAL_LOCALE__) {
      const initialLocale = (window as any).__INITIAL_LOCALE__ as Locale;
      if (locales.includes(initialLocale)) return initialLocale;
    }
    return defaultLocale;
  };

  const [locale, setLocaleState] = useState<Locale>(resolveInitial);
  const [messages, setMessages] = useState<Record<string, any>>(
    () => initialMessages[resolveInitial()] || initialMessages[defaultLocale] || {}
  );

  // On locked (URL-based) routes, make sure the document language matches.
  useEffect(() => {
    if (locked && urlLocale) {
      document.documentElement.lang = urlLocale;
      document.documentElement.setAttribute("data-locale", urlLocale);
    }
  }, [locked, urlLocale]);

  const setLocale = (newLocale: string) => {
    if ((locales as readonly string[]).includes(newLocale)) {
      const locale = newLocale as Locale;
      setLocaleState(locale);
      setMessages(initialMessages[locale] || {});
      setStorageLocale(locale);
      
      // Update data-locale attribute
      if (typeof window !== "undefined") {
        document.documentElement.setAttribute('data-locale', locale);
        document.documentElement.lang = locale;
      }
    }
  };

  const contextValue: LocaleContextType = {
    locale,
    setLocale,
    messages,
    locked,
  };

  return (
    <LocaleContext.Provider value={contextValue}>
      <div suppressHydrationWarning>
        <NextIntlClientProvider 
          locale={locale} 
          messages={messages}
          timeZone="Europe/Kiev"
        >
          {children}
        </NextIntlClientProvider>
      </div>
    </LocaleContext.Provider>
  );
}