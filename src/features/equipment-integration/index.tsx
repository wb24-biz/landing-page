"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { EquipmentDeviceDialog } from "./ui/equipment-device-dialog";

function EquipmentIntegration() {
  const t = useTranslations("EquipmentIntegration");

  const translatedEquipmentList = [
    { src: "/images/3.svg", alt: "1", label: t("equipmentList.0.label") },
    { src: "/images/4.svg", alt: "2", label: t("equipmentList.1.label") },
    { src: "/images/7.svg", alt: "3", label: t("equipmentList.2.label") },
    { src: "/images/5.svg", alt: "4", label: t("equipmentList.3.label") },
    { src: "/images/6.svg", alt: "5", label: t("equipmentList.4.label") },
  ];

  const translatedConnectivityModulesList = [
    {
      src: "/images/logo-white.svg",
      alt: "1",
      label: t("modulesList.0.label"),
    },
    { src: "/images/2.svg", alt: "2", label: t("modulesList.1.label") },
    {
      src: "/images/connect-elements.svg",
      alt: "3",
      label: t("modulesList.2.label"),
    },
    { src: "/images/tft.svg", alt: "4", label: t("modulesList.3.label") },
  ];
  const [open, setOpen] = useState(false);
  return (
    <>
      <section
        id="equipment"
        className="relative overflow-hidden px-4 sm:px-12 py-12 container mx-auto rounded-3xl"
      >
        <Image
          src="/images/bg-equipment.svg"
          alt=""
          fill
          className="object-cover object-center z-0 select-none pointer-events-none"
          priority={false}
          draggable={false}
        />
        <div className="relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            <div className="flex flex-col items-center sm:items-start px-4">
              <h2 className="text-[38px] font-extrabold text-[#fff] mb-2">
                {t("title")}
              </h2>
              <p className="text-lg text-center sm:text-left text-[#fff]/80 mb-12 max-w-3xl">
                {t("description")}
              </p>
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => setOpen(true)}
                  className="rounded-3xl border border-[#136EFF] px-8 py-4 cursor-pointer"
                >
                  <h4 className="text-white text-lg font-bold">
                    {t("button_gsm")}
                  </h4>
                  <p className="text-[#fff]/80 text-sm font-medium">
                    {t("gsm_desc")}
                  </p>
                </div>
                <div
                  onClick={() => setOpen(true)}
                  className="rounded-3xl border border-[#136EFF] px-8 py-4 cursor-pointer"
                >
                  <h4 className="text-white text-lg font-bold">
                    {t("button_tft")}
                  </h4>
                  <p className="text-[#fff]/80 text-sm font-medium">
                    {t("tft_desc")}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <div className="relative">
                <ul className="flex pl-8 pr-0 py-6 border-1 border-[#fff]/30 rounded-[14px] border-dashed flex-col justify-between h-full gap-8">
                  {translatedEquipmentList.map((item) => (
                    <li className="flex items-center gap-4 " key={item.alt}>
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={36}
                        height={36}
                      />
                      <span className="inline-block w-1/3 text-sm text-white/60">
                        {item.label}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="absolute -right-24 top-1/2 -translate-y-1/2">
                  <Image
                    src="images/arrows.svg"
                    width={120}
                    height={340}
                    alt="arrows"
                  />
                </div>
              </div>
              <div>
                <ul className="flex pl-12 flex-col items-center justify-between h-full gap-8">
                  {translatedConnectivityModulesList.map((item) => (
                    <li
                      className="flex flex-col text-center items-center gap-2"
                      key={item.alt}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        width={
                          item.alt === "1" ? 130 : item.alt === "3" ? 24 : 42
                        }
                        height={
                          item.alt === "1" ? 62 : item.alt === "3" ? 24 : 42
                        }
                      />
                      {item.label ? (
                        <span className="inline-block w-full text-sm text-white/60">
                          {item.label}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <EquipmentDeviceDialog open={open} onOpenChange={setOpen} />
    </>
  );
}

export default EquipmentIntegration;
