"use client";

import { locales } from "@/i18n/config";
import { setUserLocale } from "@/i18n/locale";
import { cn } from "@/shared/lib/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { Locale, useLocale } from "next-intl";
import { useTransition } from "react";

const languageLabels: Record<string, string> = {
  ua: "Українська",
  en: "English",
  ru: "Русский",
};

export default function LanguageSelector() {
  const currentLocale = useLocale();
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    // Type-safe validation that the value is a valid locale
    if (locales.includes(value as any)) {
      const locale = value as Locale;
      startTransition(() => {
        setUserLocale(locale as any);
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger className="z-50 hidden lg:block cursor-pointer rounded-full">
        <div
          className={cn(
            "w-14 font-semibold z-50 h-14 p-2 bg-[#002869] hover:bg-[#0057b7] hover:text-[#ffd700] hover:font-bold transition-all duration-300 flex items-center justify-center rounded-full text-white text-sm",
            isPending && "pointer-events-none opacity-60"
          )}
        >
          {currentLocale.toUpperCase()}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1 z-50">
        {locales.map((locale) => (
          <button
            key={locale}
            className={cn(
              "w-full text-left px-3 py-2 flex items-center hover:bg-slate-100 rounded-md",
              locale === currentLocale ? "font-bold text-[#0057b7]" : ""
            )}
            onClick={() => onChange(locale)}
            disabled={locale === currentLocale}
          >
            {languageLabels[locale] || locale.toUpperCase()}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
