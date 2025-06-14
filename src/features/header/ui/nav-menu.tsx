"use client";

import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link as ScrollLink } from "react-scroll";

interface NavMenuProps extends NavigationMenuProps {
  translations: {
    service: string;
    functional: string;
    equipment: string;
    pricing: string;
    contacts: string;
  };
}

export const NavMenu = ({ translations, ...props }: NavMenuProps) => {
  const menuItems = [
    { label: translations.service, to: "service" },
    { label: translations.functional, to: "functional" },
    { label: translations.equipment, to: "equipment" },
    { label: translations.pricing, to: "pricing" },
    { label: translations.contacts, to: "contacts" },
  ];

  return (
    <nav {...props}>
      <ul className="flex items-center gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {menuItems.map((item) => (
          <li key={item.label}>
            <ScrollLink
              to={item.to}
              spy={true}
              smooth={true}
              duration={800}
              offset={-80} // Adjust offset as needed to account for fixed headers
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
