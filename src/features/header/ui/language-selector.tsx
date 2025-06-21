"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { useLocale } from "next-intl";

const languageLabels: Record<string, string> = {
  ua: "Українська",
  en: "English",
  ru: "Русский",
};

export default function LanguageSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const languages = routing.locales;

  const handleSelect = (locale: string) => {
    if (locale !== currentLocale) {
      router.replace(pathname, { locale });
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="z-50 hidden lg:block cursor-pointer rounded-full">
        <div className="w-14 font-semibold z-50 h-14 p-2 bg-[#002869] hover:bg-[#0057b7] hover:text-[#ffd700] hover:font-bold transition-all duration-300 flex items-center justify-center rounded-full text-white text-sm">
          {currentLocale.toUpperCase()}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1 z-50">
        {languages.map((locale) => (
          <button
            key={locale}
            className={`w-full text-left px-3 py-2 flex items-center hover:bg-slate-100 rounded-md ${
              locale === currentLocale ? "font-bold text-[#0057b7]" : ""
            }`}
            onClick={() => handleSelect(locale)}
            disabled={locale === currentLocale}
          >
            {languageLabels[locale] || locale.toUpperCase()}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
