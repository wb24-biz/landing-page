"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import Image from "next/image";
import { useState } from "react";
import { Link as ScrollLink } from "react-scroll";
import { ConnectWithUsDialog } from "./ui/connect-with-us-dialog";
import { FeatureList } from "./ui/feature-list";

import { useTranslations } from "next-intl";

const squadList = [
  { src: "/images/8.svg", alt: "1", key: "owner" },
  { src: "/images/9.svg", alt: "2", key: "manager" },
  { src: "/images/10.svg", alt: "3", key: "dispatcher" },
  { src: "/images/11.svg", alt: "4", key: "repair" },
];

const machineList = [
  { src: "/images/3.svg", alt: "1", key: "coffee" },
  { src: "/images/4.svg", alt: "2", key: "water" },
  { src: "/images/7.svg", alt: "3", key: "carwash" },
  { src: "/images/5.svg", alt: "4", key: "snack" },
  { src: "/images/6.svg", alt: "5", key: "laundry" },
];

const centerList = [
  {
    src: "/images/laptop.svg",
    alt: "1",
    key: "devices",
  },
  {
    src: "/images/arrows-left-right.svg",
    alt: "2",
    key: "",
  },
  {
    src: "/images/hero-logo.svg",
    alt: "3",
    key: "service",
  },
];

const Hero = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("Hero");

  return (
    <div className="rounded-3xl mx-3 md:mx-4 lg:mx-8 relative">
      <div className="container mx-auto px-4 md:px-8 ">
        <div className="flex min-h-[calc(100vh-14rem)] items-center justify-center py-16 lg:h-[calc(100vh-4rem)] lg:py-0">
          <div className="grid w-full grid-cols-1 items-center gap-y-12 lg:grid-cols-12 lg:gap-10">
            {/* Лівий контент - текст та кнопки */}
            <div className="z-10 flex flex-col items-start gap-3 lg:col-span-6 lg:items-start">
              <h1 className=" w-2/3 md:w-full text-4xl font-extrabold tracking-tight text-white md:text-5xl lg:text-left lg:text-[56px]">
                {t("title")}
              </h1>
              <p className="mb-3 text-balance text-[20px] font-semibold tracking-tight text-white md:text-xl lg:text-left lg:text-[24px]">
                {t("subtitle")}
              </p>
              <FeatureList />
              <div className="mt-6 md:mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <ScrollLink
                  to="pricing"
                  spy={true}
                  smooth={true}
                  duration={800}
                  offset={-80}
                  className="w-full sm:w-auto"
                >
                  <Button size="xl" variant="orange" className="w-full">
                    {t("cta_primary")}
                  </Button>
                </ScrollLink>
                <Button
                  onClick={() => setOpen(true)}
                  size="xl"
                  variant="grayOutline"
                  className="w-full sm:w-auto"
                >
                  {t("cta_secondary")}
                </Button>
              </div>
            </div>

            {/* Правий контент - список обладнання */}

            <div className="z-10 hidden lg:grid w-full gap-14 2xl:gap-24 lg:col-span-6 relative">
              {/* Верхній список обладнання */}
              <div className="w-full">
                <ul className="grid relative grid-cols-2 gap-2 sm:grid-cols-4 w-full">
                  {squadList.map((item) => (
                    <li
                      className="flex flex-col items-center gap-3 z-10"
                      key={item.alt}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={36}
                        height={36}
                      />
                      <span className="text-center text-[13px] text-white/60">
                        {t(`squadList.${item.key}`)}
                      </span>
                    </li>
                  ))}
                  <div className="absolute -top-9 2xl:-top-7 w-full h-[200px]">
                    <img
                      src="/images/squad-arrows.svg"
                      alt=""
                      className="w-auto h-full mx-auto" // This will center the SVG and maintain aspect ratio
                      aria-hidden="true"
                    />
                  </div>
                </ul>
              </div>

              {/* Центральний елемент */}
              <div className="flex items-center justify-center">
                <div className="flex h-full w-full items-center justify-center py-5 pb-8">
                  <ul className="flex w-full flex-col items-center justify-around gap-8 px-4 sm:flex-row sm:gap-2">
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
                        {item.key && (
                          <span className="mt-auto inline-block w-2/3 text-center text-[13px] text-white/60">
                            {t(`centerList.${item.key}`)}
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Нижній список обладнання */}
              <div className="">
                <ul className="relative grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-5 w-full ">
                  <div className="absolute -bottom-1 2xl:-bottom-6 w-full h-auto inset-x-0 z-20">
                    <img
                      src="/images/machine-arrows.svg"
                      alt=""
                      className="w-full h-auto object-cover"
                      aria-hidden="true"
                    />
                  </div>
                  {machineList.map((item) => (
                    <li
                      className={cn(
                        "flex h-full w-full flex-col items-center justify-between gap-2"
                      )}
                      key={item.alt}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="h-auto w-16 sm:w-auto"
                      />
                      <span className="text-wrap text-center text-[13px] text-white/60">
                        {t(`machineList.${item.key}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute h-full z-[1] w-full inset-0">
          <Image
            src="/images/bg-hero.svg"
            alt="Elements"
            fill
            className="object-cover rounded-2xl md:rounded-4xl"
          />
        </div>
      </div>
      <ConnectWithUsDialog open={open} onOpenChange={setOpen} />
    </div>
  );
};

export default Hero;
