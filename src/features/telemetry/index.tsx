"use client";

import { Card } from "@/shared/ui/kit/card";
import Image from "next/image";

type Category = {
  icon: string;
};

const categories: Category[] = [
  { icon: "/icons/1.svg" },
  { icon: "/icons/2.svg" },
  { icon: "/icons/3.svg" },
  { icon: "/icons/4.svg" },
  { icon: "/icons/5.svg" },
  { icon: "/icons/6.svg" },
  { icon: "/icons/7.svg" },
  { icon: "/icons/8.svg" },
];

import { useTranslations } from "next-intl";

export default function TelemetryCategoriesGrid() {
  const t = useTranslations("Telemetry");
  return (
    <section
      id="telemetry"
      className="w-full container mx-auto px-0 md:px-4 mt-16 sm:py-6 lg:py-18 lg:pt-10"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-[38px] text-[#00235B] font-bold text-center mb-1 sm:mb-2">
        {t("title")}
      </h2>
      <p className="text-center text-base sm:text-lg text-[#6A7281] mb-4 sm:mb-6 lg:mb-8 max-w-3xl mx-auto">
        {t("description")}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {categories.map((cat, idx) => (
          <Card
            key={idx}
            className="flex flex-col rounded-[20px] items-start gap-2 p-4 sm:p-6 hover:shadow-lg hover:-translate-y-1 shadow-none transition-all h-full"
          >
            <Image
              src={cat.icon}
              alt={t(`categories.${idx}.title`)}
              width={36}
              height={36}
            />
            <div>
              <div className="font-bold text-base sm:text-lg text-[#363A41]">
                {t(`categories.${idx}.title`)}
              </div>
              <div className="text-sm text-[#6A7281] font-normal">
                {t(`categories.${idx}.description`)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
