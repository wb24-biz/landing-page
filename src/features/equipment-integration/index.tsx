"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { EquipmentDeviceDialog } from "./ui/equipment-device-dialog";

import type { EquipmentItem } from "./ui/equipment-device-dialog";

function EquipmentIntegration() {
  const t = useTranslations("EquipmentIntegration");
  const tDialog = useTranslations("EquipmentDeviceDialog");

  const equipmentList = [
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
  const [selectedEquipment, setSelectedEquipment] =
    useState<EquipmentItem | null>(null);

  const equipmentButtons = [
    {
      id: "gsm",
      title: t("button_gsm"),
      title_dialog: tDialog("title"),
      description: tDialog("desc1"),
      full_description: tDialog("desc1_full"),
      features: [
        tDialog("features.0"),
        tDialog("features.1"),
        tDialog("features.2"),
        tDialog("features.3"),
        tDialog("features.4"),
        tDialog("features.5"),
        tDialog("features.6"),
        tDialog("features.7"),
        tDialog("features.8"),
      ],
      price_title: tDialog("price"),
      price_value: tDialog("price_value"),
      serviceFee: tDialog("service_fee_value"),
    },
    {
      id: "tft",
      title: tDialog("tft_title"),
      title_dialog: tDialog("tft_title"),
      description: tDialog("tft_desc"),
      full_description: tDialog("tft_full_desc"),
      features: [
        tDialog("features.tft_0"),
        tDialog("features.tft_1"),
        tDialog("features.tft_2"),
        tDialog("features.tft_3"),
        tDialog("features.tft_4"),
        tDialog("features.tft_5"),
      ],
      price_title: tDialog("price"),
      price_value: tDialog("tft_price_value"),
      serviceFee: tDialog("tft_service_fee_value"),
      fullDescription: tDialog("tft_full_desc"),
    },
  ];

  const handleEquipmentClick = (equipment: any) => {
    setSelectedEquipment(equipment);
    setOpen(true);
  };

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
                {equipmentButtons.map((button) => (
                  <div
                    key={button.id}
                    onClick={() => handleEquipmentClick(button)}
                    className="rounded-3xl border border-[#136EFF] px-8 py-4 cursor-pointer hover:bg-[#136EFF]/10 transition-colors"
                  >
                    <h4 className="text-white text-lg font-bold">
                      {button.title}
                    </h4>
                    <p className="text-[#fff]/80 text-sm font-medium">
                      {button.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row w-full">
              <div className="relative">
                <ul className="flex pl-8 pr-0 py-6 border-1 border-[#fff]/30 rounded-[14px] border-dashed flex-col justify-between h-full gap-8">
                  {equipmentList.map((item) => (
                    <li className="flex items-center gap-4" key={item.alt}>
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
      <EquipmentDeviceDialog
        open={open}
        onOpenChange={setOpen}
        equipment={selectedEquipment}
      />
    </>
  );
}

export default EquipmentIntegration;
