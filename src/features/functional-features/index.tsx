import { useTranslations } from "next-intl";
import { FunctionalFeaturesList } from "./ui/functional-features-list";

const FunctionalFeatures = () => {
  const t = useTranslations("FunctionalFeatures");
  return (
    <div className="container mx-auto px-4 md:px-4 ">
      <h2 className="text-[38px] font-bold text-[#00235B] text-center mb-2">
        {t("title")}
      </h2>
      <p className="text-center text-lg text-[#6A7281] mb-12 max-w-3xl mx-auto">
        {t("description")}
      </p>
      <FunctionalFeaturesList />
    </div>
  );
};

export default FunctionalFeatures;
