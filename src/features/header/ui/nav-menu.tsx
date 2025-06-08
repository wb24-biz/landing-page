import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/shared/ui/kit/navigation-menu";
import { NavigationMenuProps } from "@radix-ui/react-navigation-menu";
import Link from "next/link";

const menuItems = [
  { label: "Сервіс", href: "#" },
  { label: "Функціонал", href: "#" },
  { label: "Обладнання", href: "#" },
  { label: "Тарифи", href: "#" },
  { label: "Контакти", href: "#" },
];

export const NavMenu = (props: NavigationMenuProps) => {
  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className="gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start">
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.label}>
            <NavigationMenuLink
              className="text-white/80 text-base font-medium hover:bg-none hover:text-[#136EFF] transition-colors"
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
