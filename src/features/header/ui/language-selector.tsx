"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/ui/kit/popover";
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';

interface LanguageSelectorProps {
  translations: {
    ukrainian: string;
    english: string;
    russian: string;
  };
  currentLocale: string;
}

export default function LanguageSelector({ translations, currentLocale }: LanguageSelectorProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const languages = [
    { code: "ua", label: translations.ukrainian },
    { code: "en", label: translations.english },
    { code: "ru", label: translations.russian },
  ];

  const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const changeLanguage = (newLocale: string) => {
    startTransition(() => {
      // Remove the current locale from the pathname to get the base path
      const pathWithoutLocale = pathname.replace(/^\/[a-z]{2}/, '') || '/';
      router.replace(`/${newLocale}${pathWithoutLocale}`);
    });
  };

  return (
    <Popover>
      <PopoverTrigger className="z-50 cursor-pointer rounded-full">
        <div className="w-14 font-semibold z-50 h-14 p-2 bg-[#002869] hover:bg-[#0057b7] hover:text-[#ffd700] hover:font-bold transition-all duration-300 flex items-center justify-center rounded-full text-white text-sm">
          {currentLanguage?.code.toUpperCase() || 'UA'}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-1 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            disabled={isPending}
            className={`w-full text-left px-3 py-2 flex items-center hover:bg-slate-100 rounded-md transition-colors ${
              currentLocale === lang.code ? 'bg-slate-100 font-medium' : ''
            } ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {lang.label}
          </button>
        ))}
      </PopoverContent>
    </Popover>
  );
}
