"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import Image from "next/image";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { ConnectWithUsDialog } from "./ui/connect-with-us-dialog";
import { FeatureList } from "./ui/feature-list";

const squadList = [
  { src: "/images/8.svg", alt: "1", label: "Господар" },
  { src: "/images/9.svg", alt: "2", label: "Менеджер" },
  { src: "/images/10.svg", alt: "3", label: "Диспетчер" },
  { src: "/images/11.svg", alt: "4", label: "Майстер ремонту" },
];

const machineList = [
  { src: "/images/3.svg", alt: "1", label: "Кавовий автомат" },
  { src: "/images/4.svg", alt: "2", label: "Автомат продажу води" },
  { src: "/images/7.svg", alt: "3", label: "Автомийки самообслуговування" },
  { src: "/images/5.svg", alt: "4", label: "Снековий автомат" },
  { src: "/images/6.svg", alt: "5", label: "Вендингові пральні" },
];

const centerList = [
  {
    src: "/images/laptop.svg",
    alt: "1",
    label: "Комп'ютер, планшет, смартфон",
  },
  {
    src: "/images/arrows-left-right.svg",
    alt: "2",
    label: "",
  },
  {
    src: "/images/hero-logo.svg",
    alt: "3",
    label: "Сервіс для керування та моніторингу",
  },
];

const Hero = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="container mx-auto px-4">
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 lg:h-[calc(100vh-4rem)] lg:py-0">
          <div className="grid w-full grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-10">
            {/* Лівий контент - текст та кнопки */}
            <div className="z-10 flex flex-col items-center gap-3 lg:col-span-6 lg:items-start">
              <h1 className="text-center text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-left lg:text-[56px]">
                Платформа WB24 —
              </h1>
              <p className="mb-3 text-balance text-center text-lg font-semibold tracking-tight text-white md:text-xl lg:text-left lg:text-[24px]">
                програмне забезпечення для керування торговими автоматами
                реал-тайм 24/7
              </p>
              <FeatureList />
              <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <ScrollLink
                  to="pricing"
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  className="w-full sm:w-auto"
                >
                  <Button size="xl" variant="orange" className="w-full">
                    Підключитися
                  </Button>
                </ScrollLink>
                <Button
                  onClick={() => setOpen(true)}
                  size="xl"
                  variant="grayOutline"
                  className="w-full sm:w-auto"
                >
                  Зв'язатися з нами
                </Button>
              </div>
            </div>

            {/* Правий контент - список обладнання */}
            <div className="z-10 grid w-full gap-14 lg:col-span-6">
              {/* Верхній список обладнання */}
              <div className="relative row-span-1">
                <ul className="grid grid-cols-2 gap-2 rounded-[14px] border-1 border-dashed border-[#fff]/30 px-8 py-6 sm:grid-cols-4">
                  {squadList.map((item) => (
                    <li
                      className="flex flex-col items-center gap-3"
                      key={item.alt}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={36}
                        height={36}
                      />
                      <span className="text-center text-[13px] text-white/60">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="absolute -bottom-20 left-24 z-[1] hidden h-full w-[450px] lg:block">
                  <img
                    src="/images/squad-arrows.svg"
                    alt="Elements"
                    className="h-full w-full"
                  />
                </div>
              </div>

              {/* Центральний елемент */}
              <div className="row-span-1 flex items-center justify-center">
                <div className="flex h-full w-full items-center justify-center p-5">
                  <ul className="flex w-full flex-col items-center justify-between gap-8 px-4 sm:flex-row sm:gap-4">
                    {centerList.map((item) => (
                      <li
                        className={cn(
                          "flex h-full flex-col items-center justify-between gap-3 text-center",
                          item.alt === "2" && "justify-center-safe"
                        )}
                        key={item.alt}
                      >
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="h-auto w-20 sm:w-auto"
                        />
                        {item.label !== "" ? (
                          <span className="mt-auto inline-block w-2/3 text-center text-[13px] text-white/60">
                            {item.label}
                          </span>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Нижній список обладнання */}
              <div className="relative row-span-1 rounded-[14px] border-1 border-dashed border-[#fff]/30 px-3 py-6">
                <div className="absolute -top-26 left-10 z-[1] hidden h-full w-full lg:block">
                  <img
                    src="/images/machine-arrows.svg"
                    alt="Elements"
                    className="h-full w-[85%]"
                  />
                </div>
                <ul className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5">
                  {machineList.map((item) => (
                    <li
                      className={cn(
                        "flex h-full w-full flex-col items-center justify-between gap-3"
                      )}
                      key={item.alt}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-auto w-16 sm:w-auto"
                      />
                      <span className="text-wrap text-center text-[13px] text-white/60">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-4 inset-y-4 rounded-3xl bg-[#00235B] lg:inset-x-6 lg:inset-y-5" />
        </div>
        <div className="absolute inset-x-13 bottom-8 z-[1] hidden lg:block">
          <Image
            src="/images/elements.svg"
            alt="Elements"
            width={1472}
            height={516}
            className="object-contain"
          />
        </div>
      </div>
      <ConnectWithUsDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export default Hero;
