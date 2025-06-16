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
};

const plansStructure = [
  { highlight: false, baseKey: "plans.0" },
  { highlight: true, baseKey: "plans.1" },
  { highlight: false, baseKey: "plans.2" },
];

export default function PricingPlans() {
  const t = useTranslations("PricingPlans");
  const [open, setOpen] = useState(false);

  // Helper function for safe translation fetching with a fallback.
  const safeT = (key: string, fallback: string = "") => {
    try {
      const value = t(key);
      // next-intl returns the key if the translation is not found.
      return value !== key ? value : fallback;
    } catch (e) {
      // Catches if t() is configured to throw on missing keys.
      return fallback;
    }
  };

  const plans: Plan[] = plansStructure.map((planStructure) => {
    let planDescriptions: string[] = [];

    // Attempt to fetch descriptions as an array first.
    try {
      const descriptions = t.raw(`${planStructure.baseKey}.description`);
      if (Array.isArray(descriptions)) {
        // Ensure all items in the array are strings.
        planDescriptions = descriptions.filter(
          (item): item is string => typeof item === "string"
        );
      } else {
        // If the key exists but is not an array, trigger the fallback.
        throw new Error("Descriptions are not in array format.");
      }
    } catch (e) {
      // Fallback: If array fetch fails, try fetching individual keys.
      const MAX_DESCRIPTIONS = 20;
      for (let i = 0; i < MAX_DESCRIPTIONS; i++) {
        const key = `${planStructure.baseKey}.description.${i}`;
        const description = safeT(key);
        if (description) {
          planDescriptions.push(description);
        } else {
          // No more numbered descriptions found.
          break;
        }
      }
    }

    const note = safeT(`${planStructure.baseKey}.note`);

    return {
      title: safeT(
        `${planStructure.baseKey}.title`,
        planStructure.baseKey.split(".").pop() || "Plan"
      ),
      price: safeT(`${planStructure.baseKey}.price`, "$0"),
      period: safeT(`${planStructure.baseKey}.period`, ""),
      buttonLabel: safeT(`${planStructure.baseKey}.buttonLabel`, "Connect"),
      description: planDescriptions,
      highlight: planStructure.highlight,
      note: note || undefined, // Ensure note is string or undefined
    };
  });

  return (
    <>
      <section>
        <h2 className="text-3xl font-bold text-center mb-10 text-[#002366]">
          {safeT("mainTitle", "Pricing Plans")}
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {plans.map((plan, index) => (
            <div
              key={`${plan.title}-${index}`}
              className={cn(
                "flex-1 bg-white rounded-4xl border transition-all duration-300 flex flex-col items-center px-6 py-8 min-w-[320px] max-w-full",
                plan.highlight
                  ? " bg-[#136EFF1A] relative z-10"
                  : "border-[#D7DDE9]"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-normal">{plan.title}</span>
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
                    <span className="text-base">{desc}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col w-full items-center mb-4 mt-auto gap-4">
                <div className="flex gap-2 items-center">
                  <span className="text-3xl font-normal text-black">
                    {plan.price}
                  </span>
                  <span className="text-sm max-w-[150px] text-[#6A7281]">
                    {plan.period}
                  </span>
                  {plan.note && !plan.highlight && (
                    <span className="text-sm max-w-[200px] text-[#6A7281]">
                      {plan.note}
                    </span>
                  )}
                </div>
                <Button
                  onClick={() => setOpen(true)}
                  variant="orange"
                  className={cn(
                    "w-full py-6 text-base font-semibold rounded-xl"
                  )}
                  size="lg"
                >
                  {plan.buttonLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <p className=" text-sm text-gray-600 mt-2">
          {safeT(
            "individualTariffNote",
            "* individual tariff possible by agreement"
          )}
        </p>
      </section>

      <RegisterNetworkDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
