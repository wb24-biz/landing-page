"use client";

import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import { Link as ScrollLink } from "react-scroll";

const menuItems = [
  { label: "Сервіс", to: "service" },
  { label: "Функціонал", to: "functional" },
  { label: "Обладнання", to: "equipment" },
  { label: "Тарифи", to: "pricing" },
  { label: "Контакти", to: "contacts" },
];

export const NavMenu = (props: NavigationMenuProps) => {
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
