import { Button } from "@/shared/ui/kit/button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import LanguageSelector from "./ui/language-selector";
import { Logo } from "./ui/logo";
import { NavMenu } from "./ui/nav-menu";
import { NavigationSheet } from "./ui/navigation-sheet";

export const Header = () => {
  const t = useTranslations("Header");
  return (
    <div className="relative z-10 top-10 md:top-14">
      <nav className="h-4">
        <div className="h-full flex items-center justify-between container mx-auto px-4 sm:px-2 md:px-10 lg:px-2 ">
          <div className="flex md:bg-[#002869] pl-2 md:pl-6 px-6 py-4 rounded-full items-center gap-8">
            <Logo />

            {/* Desktop Menu */}
            <NavMenu className="hidden lg:block" />
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector />
            <Link
              href="https://my.wb24.biz"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:block"
            >
              <Button className="bg-[#002869]  hover:bg-[#0057b7]  hover:text-[#ffd700] transition-all duration-300 font-bold text-white h-14 px-10 text-base rounded-full">
                {t("loginButton")}
              </Button>
            </Link>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
