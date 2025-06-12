"use client";

import { Card } from "@/shared/ui/kit/card";
import Image from "next/image";

type Category = {
  title: string;
  description: string;
  icon: string;
};

const categories: Category[] = [
  {
    title: "Автомати продажу питної води",
    description: "(водомати)",
    icon: "/icons/1.svg",
  },
  {
    title: "Кавові автомати",
    description: "(кавомати)",
    icon: "/icons/2.svg",
  },
  {
    title: "Автомийки самообслуговування",
    description: "(Car Wash)",
    icon: "/icons/3.svg",
  },
  {
    title: "Автомати продажу технічних засобів",
    description: "(технічних рідин, мастила, тосолу тощо)",
    icon: "/icons/4.svg",
  },
  {
    title: "Снекові автомати",
    description: "(напої, їжа, іграшок, кондоматів, квітів тощо)",
    icon: "/icons/5.svg",
  },
  {
    title: "Автомати послуг",
    description: "(квитків, інформаційних, фото, копіювальних тощо)",
    icon: "/icons/6.svg",
  },
  {
    title: "Пральні самообслуговування",
    description: "(ландромат)",
    icon: "/icons/7.svg",
  },
  {
    title: "Атракціони",
    description: "(автомати іграшок, аркадних ігор тощо)",
    icon: "/icons/8.svg",
  },
];

export default function TelemetryCategoriesGrid() {
  return (
    <>
      <h2 className="text-[38px] text-[#00235B] font-bold text-center mb-2">
        Телеметрія та управління
      </h2>
      <p className="text-center text-lg text-[#6A7281] mb-8 max-w-3xl mx-auto">
        Телеметрія та управління вендинговим обладнанням використовується для
        контролю як для єдиного вендингового автомата, так і для великих мереж
        по різним напрямкам
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <Card
            key={cat.title}
            className="flex flex-col rounded-[20px] items-start gap-2 p-6 hover:shadow-lg hover:-translate-y-1 shadow-none transition-all h-full"
          >
            <Image src={cat.icon} alt={cat.title} width={36} height={36} />
            <div>
              <div className="font-bold text-lg text-[#363A41]">
                {cat.title}
              </div>
              <div className="text-sm text-[#6A7281] font-normal">
                {cat.description}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
