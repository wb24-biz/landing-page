import { Button } from "@/shared/ui/kit/button";
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import LanguageSelector from "./ui/language-selector";
import { Logo } from "./ui/logo";
import { NavMenu } from "./ui/nav-menu";
import { NavigationSheet } from "./ui/navigation-sheet";

export const Header = async () => {
  const t = await getTranslations('header');
  const languageT = await getTranslations('languages');
  const locale = await getLocale();

  const navTranslations = {
    service: t('service'),
    functional: t('functional'),
    equipment: t('equipment'),
    pricing: t('pricing'),
    contacts: t('contacts'),
  };

  const languageTranslations = {
    ukrainian: languageT('ukrainian'),
    english: languageT('english'),
    russian: languageT('russian'),
  };

  // Debug logging
  console.log('Header DEBUG - current locale:', locale);
  console.log('Header DEBUG - nav translations:', navTranslations);
  console.log('Header DEBUG - language translations:', languageTranslations);

  return (
    <div className="relative z-10 top-12">
      <nav className="h-16">
        <div className="h-full flex items-center justify-between container mx-auto px-4 sm:px-2 lg:px-2 ">
          <div className="flex bg-[#002869] px-6 py-4 rounded-full items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <NavMenu translations={navTranslations} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <LanguageSelector translations={languageTranslations} currentLocale={locale} />

            {/* Login Button */}
            <Button variant="secondary" size="sm" className="rounded-full bg-white text-[#002869] hover:bg-gray-100">
              {t('login')}
            </Button>

            {/* Mobile Menu Trigger */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
