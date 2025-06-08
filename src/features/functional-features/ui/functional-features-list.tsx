"use client";

import { Button } from "@/shared/ui/kit/button";
import React, { useMemo, useState } from "react";
import { FeatureType } from "../types";
import { FunctionalFeatureItem } from "./functional-feature-item";

const features: FeatureType[] = [
  {
    id: "payment",
    icon: "/icons/14.svg",
    title: "Приймайте платежі через систему еквайрингу",
    description:
      "Приймайте платежі через систему еквайрингу всіх доступних видів (Visa, MasterCard, Google Pay, Apple Pay)",
  },
  {
    id: "fiscal",
    icon: "/icons/15.svg",
    title: "Фіскалізуйте продажі для виконання вимог місцевих законів",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "emergency-alerts",
    icon: "/icons/16.svg",
    title: "Отримуйте сповіщення щодо всіх нештатних та аварійних ситуацій",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "service-alerts",
    icon: "/icons/17.svg",
    title:
      "Заздалегідь отримуйте повідомлення про необхідність проведення сервісу та поповнення товару",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "analytics",
    icon: "/icons/18.svg",
    title:
      "Приймайте рішення, ґрунтуючись на аналітиці статистики роботи обладнання та обсягів продажів",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "access-control",
    icon: "/icons/19.svg",
    title:
      "Налаштовуйте та розмежуйте доступ до інформації для партнерів та співробітників на свій розсуд",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "remote-release",
    icon: "/icons/20.svg",
    title: "Дистанційно відпускайте товар у разі збоїв обладнання",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "remote-restart",
    icon: "/icons/21.svg",
    title: "Перезавантажувати обладнання дистанційно у разі збоїв",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "remote-update",
    icon: "/icons/22.svg",
    title: "Оновлення програмного забезпечення дистанційно",
    description: "Сюди нужен описательный текст в две-три строки",
  },
  {
    id: "real-time",
    icon: "/icons/9.svg",
    title: "Відслідковуйте продажі в режимі реального часу",
    description:
      "Будьте в курсі про обсяги продажів в режимі реального часу, щоб оперативно реагувати на зміни попиту",
  },
  {
    id: "inventory",
    icon: "/icons/10.svg",
    title: "Контролюйте наявність товару, розхідників та інгредієнтів",
    description:
      "Своєчасно поповнюйте витратні матеріали та інгредієнти, щоб виключити простої і збільшити продажі",
  },
  {
    id: "alerts",
    icon: "/icons/11.svg",
    title: "Відстежуйте відмови та аварійні ситуації",
    description:
      "Отримуйте своєчасну інформацію про відмови та аварійні ситуації для своєчасного усунення проблем",
  },
  {
    id: "security",
    icon: "/icons/12.svg",
    title: "Оперативно реагуйте на спроби зламу, вандалізму",
    description:
      "Системи безпеки дозволять швидко реагувати на спроби зламу та вандалізму, забезпечуючи захист вашого обладнання",
  },
  {
    id: "remote",
    icon: "/icons/13.svg",
    title: "Змінюйте налаштування обладнання дистанційно",
    description:
      "Змінюйте налаштування обладнання дистанційно, не виїжджаючи на локацію, що економить час та ресурси",
  },
];

const DEFAULT_VISIBLE = 6;

export const FunctionalFeaturesList: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const visibleFeatures = useMemo(
    () => (expanded ? features : features.slice(0, DEFAULT_VISIBLE)),
    [expanded]
  );

  const handleToggle = () => setExpanded((prev) => !prev);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleFeatures.map((feature) => (
          <FunctionalFeatureItem key={feature.id} feature={feature} />
        ))}
      </div>
      {features.length > DEFAULT_VISIBLE && (
        <div className="text-center mt-10">
          <Button
            size="xl"
            variant="outlineBlue"
            onClick={handleToggle}
            aria-label={expanded ? "Сховати список" : "Показати ще"}
          >
            {expanded ? "Сховати" : "Показати ще"}
          </Button>
        </div>
      )}
    </>
  );
};
