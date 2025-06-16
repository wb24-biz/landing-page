import { FeatureItem } from "./feature-item";

import { useTranslations } from "next-intl";

const featureKeys = ["0", "1", "2", "3", "4", "5"];

export const FeatureList = () => {
  const t = useTranslations("Hero");
  return (
    <ul className="space-y-4 ml-2 md:ml-8 max-w-max">
      {featureKeys.map((key, idx) => (
        <FeatureItem key={idx} text={t(`features.${key}`)} />
      ))}
    </ul>
  );
};
