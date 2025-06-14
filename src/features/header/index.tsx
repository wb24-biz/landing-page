import { Button } from "@/shared/ui/kit/button";
import LanguageSelector from "./ui/language-selector";
import { Logo } from "./ui/logo";
import { NavMenu } from "./ui/nav-menu";
import { NavigationSheet } from "./ui/navigation-sheet";
import { useTranslations } from "next-intl";

export const Header = () => {
  const t = useTranslations("Header");
  return (
    <div className="relative z-10 top-12">
      <nav className="h-16">
        <div className="h-full flex items-center justify-between container mx-auto px-4 sm:px-2 lg:px-2 ">
          <div className="flex bg-[#002869] px-6 py-4 rounded-full items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden md:block" />
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Button className="bg-[#002869] hover:bg-[#0057b7] hover:text-[#ffd700] transition-all duration-300 font-bold text-white h-14 px-10 text-base rounded-full">
              {t("loginButton")}
            </Button>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
