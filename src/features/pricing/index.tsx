"use client";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import { CheckCircle2 } from "lucide-react";
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

const plans: Plan[] = [
  {
    title: "Тариф Free",
    price: "0$",
    period: "",
    description: [
      "1 автомат",
      "1 користувач",
      "1 каса (ПРРО)",
      "до 100 днів зберігання історії замовлень",
    ],
    buttonLabel: "Підключитися",
    note: "оцініть всі можливості і не платіть жодної копійки",
  },
  {
    title: "Тариф Standard",
    price: "0.12$",
    period: "за один автомат на день",
    description: [
      "від 2 автоматів",
      "до 5 користувачів",
      "до 10 робочих груп",
      "∞ кас (ПРРО)",
      "до 3 еквайринг інтеграцій",
      "до 12 міс. зберігання історії замовлень",
      "інтеграція telegram",
      "календар обслуговування",
    ],
    buttonLabel: "Підключитися",
    highlight: true,
    note: "Бестселлер",
  },
  {
    title: "Тариф Premium",
    price: "3$",
    period: "за один автомат на місяць",
    description: [
      "від 30 автоматів",
      "до 30 користувачів",
      "∞ кас (ПРРО)",
      "∞ еквайринг інтеграцій",
      "∞ час зберігання історії замовлень",
      "інтеграція telegram",
      "календар обслуговування",
    ],
    buttonLabel: "Підключитися",
  },
];

export default function PricingPlans() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section >
        <h2 className="text-3xl font-bold text-center mb-10 text-[#002366]">
          Тарифи
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          {plans.map((plan, idx) => (
            <div
              key={plan.title}
              className={cn(
                "flex-1 bg-white rounded-4xl border transition-all duration-300 flex flex-col items-center px-6 py-8 min-w-[320px] max-w-full",
                plan.highlight
                  ? " bg-[#136EFF1A] relative z-10"
                  : "border-[#D7DDE9]"
              )}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-3xl font-normal">{plan.title}</span>
                {plan.highlight && (
                  <span className="text-xs font-bold mb-2 text-[#FC9433] ml-1">
                    {plan.note}
                  </span>
                )}
              </div>
              <ul className="mt-4 mb-6 space-y-2 w-full">
                {plan.description.map((desc) => (
                  <li
                    key={desc}
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
                  <span className="text-sm text-[#6A7281]">{plan.period}</span>
                  {plan.note && !plan.highlight && (
                    <span className="text-sm text-[#6A7281]">{plan.note}</span>
                  )}
                </div>
                <Button
                  onClick={() => setOpen(true)}
                  className={cn(
                    "w-full py-2 text-base font-semibold rounded-xl",
                    plan.highlight
                      ? "bg-orange-400 hover:bg-orange-500 text-white"
                      : "bg-orange-300 hover:bg-orange-400 text-white"
                  )}
                  size="lg"
                >
                  {plan.buttonLabel}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-base text-[#6A7281]">
          * можливий індивідуальний тариф за домовленістю
        </div>
      </section>

      <RegisterNetworkDialog open={open} onOpenChange={setOpen} />
    </>
  );
}
