"use client";

import Image from "next/image";
import { useState } from "react";
import { EquipmentDeviceDialog } from "./ui/equipment-device-dialog";

const equipmentList = [
  { src: "/images/3.svg", alt: "1", label: "Кавовий автомат" },
  { src: "/images/4.svg", alt: "2", label: "Автомат продажу води" },
  { src: "/images/7.svg", alt: "3", label: "Автомийки самообслуговування" },
  { src: "/images/5.svg", alt: "4", label: "Снековий автомат" },
  { src: "/images/6.svg", alt: "5", label: "Вендингові пральні" },
];

const сonnectivityModulesList = [
  {
    src: "/images/logo-white.svg",
    alt: "1",
    label: "Сервіс для керування та моніторингу",
  },
  { src: "/images/2.svg", alt: "2", label: "GSM/wifi модуль" },
  { src: "/images/connect-elements.svg", alt: "3", label: "" },
  { src: "/images/tft.svg", alt: "4", label: "TFT-модуль" },
];

function EquipmentIntegration() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section className="relative overflow-hidden px-12 py-12 container mx-auto rounded-3xl">
        <Image
          src="/images/bg-equipment.svg"
          alt=""
          fill
          className="object-cover object-center z-0 select-none pointer-events-none"
          priority={false}
          draggable={false}
        />
        <div className="relative z-10">
          <div className="grid grid-cols-2 gap-6 ">
            <div className="flex flex-col items-start px-4">
              <h2 className="text-[38px] font-extrabold text-[#fff] mb-2">
                Обладнання
              </h2>
              <p className="text-lg text-[#fff]/80 mb-12 max-w-3xl">
                Ви можете під'єднати своє обладнання та інтегрувати його за АРІ
                або використовувати вже готове рішення, розроблене спеціально
                для сервісу
              </p>
              <div className="flex flex-col gap-4">
                <div
                  onClick={() => setOpen(true)}
                  className="rounded-3xl border border-[#136EFF] px-8 py-4 cursor-pointer"
                >
                  <h4 className="text-white text-lg font-bold">GSM-WB24</h4>
                  <p className="text-[#fff]/80 text-sm font-medium">
                    модуль обміну, управління та передавання даних
                    на&nbsp;сервіс wb24.biz
                  </p>
                </div>
                <div
                  onClick={() => setOpen(true)}
                  className="rounded-3xl border border-[#136EFF] px-8 py-4 cursor-pointer"
                >
                  <h4 className="text-white text-lg font-bold">TFT module</h4>
                  <p className="text-[#fff]/80 text-sm font-medium">
                    безконтактний зчитувач та інформаційно-платіжний термінал
                    для безготівкової оплати з підтримкою NFC/QR, фіскалізації
                    та видачі чеків
                  </p>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="relative">
                <ul className="flex pl-8 pr-0 py-6 border-1 border-[#fff]/30 rounded-[14px] border-dashed flex-col justify-between h-full gap-8">
                  {equipmentList.map((item) => (
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
                  {сonnectivityModulesList.map((item) => (
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
