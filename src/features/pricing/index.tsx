"use client";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import { CheckCircle2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { RegisterNetworkDialog } from "./ui/register-network-dialog";

type Plan = {
  title: string;
  price: string;
  period: string;
  description: string[];
  buttonLabel: string;
  highlight?: boolean;
  note?: string;
  tariff_id: number;
};

const plansStructure = [
  { highlight: false, baseKey: "plans.0", tariff_id: 1 },
  { highlight: true, baseKey: "plans.1", tariff_id: 2 },
  { highlight: false, baseKey: "plans.2", tariff_id: 3 },
];

export default function PricingPlans() {
  const t = useTranslations("PricingPlans");
  const [open, setOpen] = useState(false);
  const [tariff_id, setTariffId] = useState<number | null>(null);

  // Helper function for safe translation fetching with a fallback.
  const safeT = (key: string, fallback: string = "") => {
    try {
      const value = t(key);
      return value !== key ? value : fallback;
    } catch (e) {
      return fallback;
    }
  };

  const plans: Plan[] = plansStructure.map((planStructure) => {
    let planDescriptions: string[] = [];
    try {
      const descriptions = t.raw(`${planStructure.baseKey}.description`);
      if (Array.isArray(descriptions)) {
        planDescriptions = descriptions.filter(
          (item): item is string => typeof item === "string"
        );
      } else {
        throw new Error("Descriptions are not in array format.");
      }
    } catch (e) {
      const MAX_DESCRIPTIONS = 20;
      for (let i = 0; i < MAX_DESCRIPTIONS; i++) {
        const key = `${planStructure.baseKey}.description.${i}`;
        const description = safeT(key);
        if (description) {
          planDescriptions.push(description);
        } else {
          break;
        }
      }
    }
    const note = safeT(`${planStructure.baseKey}.note`);
    return {
      tariff_id: planStructure.tariff_id,
      title: safeT(
        `${planStructure.baseKey}.title`,
        planStructure.baseKey.split(".").pop() || "Plan"
      ),
      price: safeT(`${planStructure.baseKey}.price`, "$0"),
      period: safeT(`${planStructure.baseKey}.period`, ""),
      buttonLabel: safeT(`${planStructure.baseKey}.buttonLabel`, "Connect"),
      description: planDescriptions,
      highlight: planStructure.highlight,
      note: note || undefined,
    };
  });

  return (
    <>
      <h2 className="text-[28px] sm:text-3xl font-bold text-center mb-6 sm:mb-10 text-[#002366]">
        {safeT("mainTitle", "Pricing Plans")}
      </h2>
      {/* Wrapper адаптив: горизонтальний скрол на моб, 1/2/3 колонки */}
      <div
        className="
            flex flex-col 
            lg:flex-row
            gap-4 sm:gap-6
            items-stretch
            justify-center
            w-full
            overflow-x-auto
            sm:overflow-x-visible
            px-2 md:px-4 lg:px-0
          "
      >
        {plans.map((plan, index) => (
          <div
            key={`${plan.title}-${index}`}
            className={cn(
              "flex-1 min-w-[90vw] sm:min-w-[320px] md:min-w-[320px] max-w-full bg-white rounded-3xl border transition-all duration-300 flex flex-col items-center px-6 sm:px-6 py-3 sm:py-8",
              plan.highlight
                ? "bg-[#136EFF1A] relative z-10 border-[#136EFF1A]"
                : "border-[#D7DDE9]"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[32px] sm:text-3xl font-normal">
                {plan.title}
              </span>
              {plan.highlight && plan.note && (
                <span className="text-xs font-bold mb-2 text-[#FC9433] ml-1">
                  {plan.note}
                </span>
              )}
            </div>
            <ul className="mt-4 mb-6 space-y-2 w-full">
              {plan.description.map((desc, i) => (
                <li
                  key={`${plan.title}-desc-${i}`}
                  className="flex items-center gap-2 text-gray-800"
                >
                  <CheckCircle2 className="text-blue-500 w-5 h-5" />
                  <span className="text-sm sm:text-base">{desc}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col w-full items-center mb-4 mt-auto gap-4">
              <div className="flex gap-2 items-center flex-wrap">
                <span className="text-2xl sm:text-3xl font-normal text-black">
                  {plan.price}
                </span>
                <span className="text-xs sm:text-sm max-w-[150px] text-[#6A7281]">
                  {plan.period}
                </span>
                {plan.note && !plan.highlight && (
                  <span className="text-xs sm:text-sm max-w-[200px] text-[#6A7281]">
                    {plan.note}
                  </span>
                )}
              </div>
              <Button
                onClick={() => {
                  setOpen(true);
                  setTariffId(plan.tariff_id);
                }}
                variant="orange"
                className="w-full py-4 sm:py-6 text-base font-semibold rounded-xl"
                size="lg"
              >
                {plan.buttonLabel}
              </Button>
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs sm:text-sm text-gray-600 mt-2 px-4 md:px-4 lg:px-0">
        {safeT(
          "individualTariffNote",
          "* individual tariff possible by agreement"
        )}
      </p>

      <RegisterNetworkDialog
        open={open}
        onOpenChange={setOpen}
        tariff_id={tariff_id}
        setTariffId={setTariffId}
      />
    </>
  );
}
