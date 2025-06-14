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
  const t = useTranslations('Telemetry');
  return (
    <>
      <h2 className="text-[38px] text-[#00235B] font-bold text-center mb-2">
        {t('title')}
      </h2>
      <p className="text-center text-lg text-[#6A7281] mb-8 max-w-3xl mx-auto">
        {t('description')}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <Card
            key={idx}
            className="flex flex-col rounded-[20px] items-start gap-2 p-6 hover:shadow-lg hover:-translate-y-1 shadow-none transition-all h-full"
          >
            <Image src={cat.icon} alt={t(`categories.${idx}.title`)} width={36} height={36} />
            <div>
              <div className="font-bold text-lg text-[#363A41]">
                {t(`categories.${idx}.title`)}
              </div>
              <div className="text-sm text-[#6A7281] font-normal">
                {t(`categories.${idx}.description`)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
