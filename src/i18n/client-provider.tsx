"use client";

import { createContext, useContext, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { defaultLocale, Locale, locales } from "./config";
import { setUserLocale as setStorageLocale } from "./locale";

interface LocaleContextType {
  locale: string;
  setLocale: (locale: string) => void;
  messages: Record<string, any>;
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
  const [locale, setLocaleState] = useState<Locale>(() => {
    // Get initial locale from window global set by script
    if (typeof window !== "undefined" && (window as any).__INITIAL_LOCALE__) {
      const initialLocale = (window as any).__INITIAL_LOCALE__ as Locale;
      if (locales.includes(initialLocale)) {
        return initialLocale;
      }
    }
    return defaultLocale;
  });
  
  const [messages, setMessages] = useState<Record<string, any>>(() => {
    if (typeof window !== "undefined" && (window as any).__INITIAL_LOCALE__) {
      const initialLocale = (window as any).__INITIAL_LOCALE__ as Locale;
      if (locales.includes(initialLocale)) {
        return initialMessages[initialLocale] || {};
      }
    }
    return initialMessages[defaultLocale] || {};
  });

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