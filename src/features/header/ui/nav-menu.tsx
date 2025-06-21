"use client";

import { cn } from "@/shared/lib/utils";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { useTranslations } from "next-intl";
import { Link as ScrollLink } from "react-scroll";

export const NavMenu = (
  props: NavigationMenuProps & { classNameList?: string }
) => {
  const t = useTranslations("NavMenu");

  const translatedMenuItems = [
    { label: t("menu.0.label"), to: "service" },
    { label: t("menu.1.label"), to: "functional" },
    { label: t("menu.2.label"), to: "equipment" },
    { label: t("menu.3.label"), to: "pricing" },
    { label: t("menu.4.label"), to: "contacts" },
  ];
  return (
    <nav {...props}>
      <ul
        className={cn(
          "flex items-center gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start",
          props.classNameList
        )}
      >
        {translatedMenuItems.map((item) => (
          <li key={item.label}>
            <ScrollLink
              to={item.to}
              spy={true}
              smooth={true}
              duration={500}
              offset={-20} // Adjust offset as needed to account for fixed headers
              className="text-white/80 text-base font-medium hover:bg-none hover:text-[#136EFF] transition-colors cursor-pointer"
            >
              {item.label}
            </ScrollLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
