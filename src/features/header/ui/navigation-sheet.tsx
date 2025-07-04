"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/ui/kit/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shared/ui/kit/sheet";
import { Menu } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import { NavMenu } from "./nav-menu";

export const NavigationSheet = () => {
  const [isOpenSheet, setIsOpenSheet] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const tHeader = useTranslations("Header");
  const tFooter = useTranslations("Footer");

  const handleSelect = (locale: string) => {
    if (locale !== currentLocale) {
      router.replace(pathname, { locale });
    }
  };

  return (
    <Sheet open={isOpenSheet} onOpenChange={setIsOpenSheet}>
      <SheetTrigger asChild>
        <Button
          className="bg-[#002869] rounded-full size-14 p-4 text-white border-0"
          variant="outline"
          size="icon"
          onClick={() => setIsOpenSheet(!isOpenSheet)}
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="p-6">
        <div className="flex flex-col gap-6">
          <svg
            width="96"
            height="26"
            viewBox="0 0 96 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M26.2145 11.7304C27.6169 10.328 29.8908 10.328 31.2933 11.7304C32.6957 13.1328 32.6956 15.4066 31.2933 16.809C30.1733 17.929 28.4976 18.1546 27.1537 17.4857L19.4044 25.235C18.3844 26.255 16.7307 26.255 15.7107 25.235L13.632 23.1563L15.2479 21.5403L16.865 23.1574C17.2475 23.5399 17.8677 23.5399 18.2501 23.1574L25.5378 15.8698C24.869 14.526 25.0945 12.8504 26.2145 11.7304ZM29.6772 13.3463C29.1672 12.8364 28.3404 12.8364 27.8304 13.3463C27.3205 13.8563 27.3205 14.6831 27.8304 15.1931C28.3404 15.7031 29.1672 15.7031 29.6772 15.1931C30.1872 14.6831 30.1872 13.8563 29.6772 13.3463Z"
              fill="#136EFF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M18.7131 2.84394L17.0972 4.45988L15.4799 2.84259C15.0974 2.46011 14.4773 2.46011 14.0948 2.84259L6.80716 10.1302C7.47602 11.4741 7.25061 13.1498 6.13062 14.2698C4.72818 15.6722 2.45428 15.6722 1.05183 14.2698C-0.350611 12.8674 -0.350611 10.5934 1.05183 9.19101C2.17178 8.07106 3.84742 7.84556 5.19122 8.51431L12.9406 0.76497C13.9605 -0.254989 15.6142 -0.254991 16.6342 0.764968L18.7131 2.84394ZM4.51469 10.8069C4.00471 10.297 3.17775 10.297 2.66777 10.8069C2.15779 11.3169 2.15779 12.1439 2.66777 12.6539C3.17775 13.1638 4.00471 13.1638 4.51469 12.6539C5.02466 12.1439 5.02466 11.3169 4.51469 10.8069Z"
              fill="#136EFF"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22.5212 1.57322C23.9236 0.170783 26.1975 0.170782 27.5999 1.57322C29.0023 2.97567 29.0023 5.24948 27.5999 6.65192C26.4799 7.77188 24.8043 7.99737 23.4605 7.32858L10.1548 20.6342C10.8236 21.978 10.5981 23.6537 9.47818 24.7736C8.07574 26.1761 5.80193 26.1761 4.39949 24.7736C2.99705 23.3712 2.99705 21.0974 4.39949 19.6949C5.51945 18.575 7.19507 18.3495 8.53889 19.0183L21.8445 5.71263C21.1757 4.36881 21.4012 2.69319 22.5212 1.57322ZM6.01544 21.3109C5.50546 21.8209 5.50546 22.6477 6.01544 23.1577C6.52542 23.6677 7.35226 23.6677 7.86224 23.1577C8.37221 22.6477 8.37221 21.8209 7.86224 21.3109C7.35226 20.8009 6.52542 20.8009 6.01544 21.3109ZM24.1371 3.18917C23.6272 3.69915 23.6272 4.52599 24.1371 5.03597C24.6471 5.54595 25.474 5.54595 25.9839 5.03597C26.4939 4.52599 26.4939 3.69915 25.9839 3.18917C25.474 2.67919 24.6471 2.6792 24.1371 3.18917Z"
              fill="#FC9433"
            />
            <path
              d="M48.4132 19.5L45.0292 6.72H47.0992L49.5832 16.818L52.0672 6.72H54.0472L56.5312 16.818L58.9972 6.72H61.1032L57.7012 19.5H55.4332L53.0572 10.176L50.6812 19.5H48.4132ZM63.0537 19.5V6.72H67.6437C69.1797 6.72 70.3377 6.996 71.1177 7.548C71.8977 8.1 72.2877 8.976 72.2877 10.176C72.2877 10.716 72.1737 11.19 71.9457 11.598C71.7177 12.006 71.3817 12.33 70.9377 12.57C70.5057 12.798 69.9897 12.918 69.3897 12.93L69.3717 12.858C70.4637 12.882 71.3097 13.182 71.9097 13.758C72.5217 14.322 72.8277 15.066 72.8277 15.99C72.8277 17.154 72.4377 18.03 71.6577 18.618C70.8777 19.206 69.7677 19.5 68.3277 19.5H63.0537ZM64.9977 17.754H68.2737C69.0777 17.754 69.7017 17.592 70.1457 17.268C70.6017 16.932 70.8297 16.446 70.8297 15.81C70.8297 15.186 70.6017 14.7 70.1457 14.352C69.7017 14.004 69.0777 13.83 68.2737 13.83H64.9977V17.754ZM64.9977 12.174H67.6077C68.4597 12.174 69.1197 12.012 69.5877 11.688C70.0557 11.364 70.2897 10.908 70.2897 10.32C70.2897 9.696 70.0617 9.234 69.6057 8.934C69.1617 8.622 68.4957 8.466 67.6077 8.466H64.9977V12.174ZM74.4203 19.5C74.4203 18.54 74.5643 17.682 74.8523 16.926C75.1403 16.17 75.6323 15.468 76.3283 14.82C77.0243 14.172 77.9843 13.524 79.2083 12.876C79.7963 12.576 80.2643 12.3 80.6123 12.048C80.9723 11.784 81.2303 11.514 81.3863 11.238C81.5423 10.962 81.6203 10.626 81.6203 10.23C81.6203 9.822 81.5303 9.474 81.3503 9.186C81.1823 8.886 80.9303 8.652 80.5943 8.484C80.2583 8.304 79.8323 8.214 79.3163 8.214C78.5003 8.214 77.8523 8.436 77.3723 8.88C76.9043 9.312 76.6103 9.936 76.4903 10.752L74.4743 10.626C74.6183 9.342 75.1043 8.322 75.9323 7.566C76.7723 6.81 77.9003 6.432 79.3163 6.432C80.2283 6.432 81.0023 6.594 81.6383 6.918C82.2863 7.23 82.7783 7.668 83.1143 8.232C83.4623 8.796 83.6363 9.45 83.6363 10.194C83.6363 10.842 83.5283 11.4 83.3123 11.868C83.0963 12.336 82.7363 12.774 82.2323 13.182C81.7283 13.578 81.0443 14.004 80.1803 14.46C79.0763 15.048 78.2423 15.63 77.6783 16.206C77.1143 16.77 76.8143 17.274 76.7783 17.718H83.6363V19.5H74.4203ZM90.6647 19.5V16.836H84.2207V15.18L90.4307 6.72H92.6087V15.072H94.1747V16.836H92.6087V19.5H90.6647ZM86.4347 15.072H90.6647V9.42L86.4347 15.072Z"
              fill="white"
            />
          </svg>

          <NavMenu
            classNameList="flex flex-col items-start"
            orientation="vertical"
            className="flex"
            setIsOpenSheet={setIsOpenSheet}
          />
          <div className="mt-10 flex flex-col gap-10 sm:mb-0">
            <div className="flex flex-col gap-4 sm:gap-4">
              <button
                onClick={() => handleSelect("ua")}
                disabled={currentLocale === "ua"}
                className={`text-left transition-colors ${
                  currentLocale === "ua"
                    ? "text-white font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tFooter("lang.ua")}
              </button>
              <button
                onClick={() => handleSelect("ru")}
                disabled={currentLocale === "ru"}
                className={`text-left transition-colors ${
                  currentLocale === "ru"
                    ? "text-white font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tFooter("lang.ru")}
              </button>
              <button
                onClick={() => handleSelect("en")}
                disabled={currentLocale === "en"}
                className={`text-left transition-colors ${
                  currentLocale === "en"
                    ? "text-white font-bold"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {tFooter("lang.en")}
              </button>
            </div>
            <Link
              href="https://my.wb24.biz"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                type="submit"
                variant="primaryBlue"
                size="xl"
                className="w-full text-base font-semibold"
              >
                {tHeader("loginButton")}
              </Button>
            </Link>
          </div>

          <svg
            className="absolute w-full top-1/2 -z-10 px-0 -translate-y-1/2"
            width="360"
            height="668"
            viewBox="0 0 360 668"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M-43 595.223C15.1131 595.223 62.2232 548.113 62.2232 490C62.2232 431.887 15.1132 384.777 -43 384.777C-101.113 384.777 -148.223 431.887 -148.223 490L-221 490C-221 391.693 -141.307 312 -43 312C55.3067 312 135 391.693 135 490C135 588.307 55.3067 668 -43 668C-141.307 668 -221 588.307 -221 490L-148.223 490C-148.223 548.113 -101.113 595.223 -43 595.223Z"
              fill="#002869"
            />
            <path
              d="M473 353.84C567.352 353.84 643.84 277.352 643.84 183C643.84 88.6477 567.352 12.1601 473 12.1601C378.648 12.1601 302.16 88.6477 302.16 183L184 183C184 23.3897 313.39 -106 473 -106C632.61 -106 762 23.3897 762 183C762 342.61 632.61 472 473 472C313.39 472 184 342.61 184 183L302.16 183C302.16 277.352 378.648 353.84 473 353.84Z"
              fill="#002869"
            />
          </svg>
        </div>
      </SheetContent>
    </Sheet>
  );
};
