import { Card } from "@/shared/ui/kit/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
type FeatureType = {
  id: string;
  icon: string;
};

type FeatureItemProps = {
  feature: FeatureType;
};

export const FunctionalFeatureItem: React.FC<FeatureItemProps> = ({
  feature,
}) => {
  const t = useTranslations("FunctionalFeatures");
  return (
    <Card className="group rounded-[20px] border-none items-start gap-2 px-6 py-4 hover:shadow-lg hover:-translate-y-1 shadow-none transition-all h-full">
      <div className="flex items-start gap-4">
        <div className="flex items-center justify-center size-12">
          <Image
            className="flex-none flex-shrink-0"
            src={feature.icon}
            alt={t(`features.${feature.id}.title`)}
            width={24}
            height={24}
          />
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-[#363A41] text-lg leading-5 group-hover:text-[#136EFF] transition-colors">
            {t(`features.${feature.id}.title`)}
          </h3>
          <p className="text-[#6A7281] text-sm leading-relaxed">
            {t(`features.${feature.id}.description`)}
          </p>
        </div>
      </div>
    </Card>
  );
};
