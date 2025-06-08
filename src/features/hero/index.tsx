import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import Image from "next/image";
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
  return (
    <div className="container mx-auto">
      <div className="h-[calc(100vh-4rem)]  flex items-center justify-center">
        <div className="grid grid-cols-12 place-items-center ">
          {/* Лівий контент - текст та кнопки */}
          <div className="col-span-6 flex flex-col gap-3 z-10">
            <h1 className="text-white text-[56px] font-extrabold tracking-tight">
              Платформа WB24 —
            </h1>
            <p className="text-white mb-3 text-[24px] font-semibold text-balance tracking-tight">
              програмне забезпечення для керування торговими автоматами
              реал-тайм 24/7
            </p>
            <FeatureList />
            <div className="flex gap-3 mt-10">
              <Button size="xl" variant="orange">
                Підключитися
              </Button>
              <Button size="xl" variant="grayOutline">
                Зв'язатися з нами
              </Button>
            </div>
          </div>

          {/* Правий контент - список обладнання */}
          <div className="col-span-6 grid gap-14 z-10">
            {/* Верхній список обладнання */}
            <div className="row-span-1 relative">
              <ul className="grid grid-cols-4 py-6  px-8 border-1 border-[#fff]/30 rounded-[14px] border-dashed gap-2">
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
              <div className="absolute -bottom-14 left-24 z-[1]">
                <img
                  src="/images/squad-arrows.svg"
                  alt="Elements"
                  className=" h-full w-[450px]"
                />
              </div>
            </div>

            {/* Центральний елемент */}
            <div className="row-span-1 flex items-center justify-center">
              <div className=" p-5 w-full h-full flex items-center justify-center">
                {/* Тут розмістіть центральний контент */}
                <ul className="flex h-full items-center justify-between px-4 w-full">
                  {centerList.map((item) => (
                    <li
                      className={cn(
                        "flex flex-col text-center justify-between h-full items-center gap-3",
                        item.alt === "2" && "justify-center-safe"
                      )}
                      key={item.alt}
                    >
                      <img src={item.src} alt={item.alt} />
                      {item.label !== "" ? (
                        <span className="text-center mt-auto w-2/3 inline-block text-[13px] text-white/60">
                          {item.label}
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ul>
                {/* <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                  <img
                    src="/images/arrows-left-right.svg"
                    alt="Elements"
                    className="h-auto w-auto"
                  />
                </div> */}
              </div>
            </div>

            {/* Нижній список обладнання */}
            <div className="row-span-1 relative py-6 px-3 border-1 border-[#fff]/30 rounded-[14px] border-dashed">
              <div className="absolute -top-14 right-14 z-[1]">
                <img
                  src="/images/machine-arrows.svg"
                  alt="Elements"
                  className=" h-full w-[500px]"
                />
              </div>
              <ul className="grid grid-cols-5  gap-10">
                {machineList.map((item) => (
                  <li
                    className={cn(
                      "flex flex-col h-full w-full justify-between items-center gap-3"
                      // item.alt === "3" && "justify-self-stretch"
                    )}
                    key={item.alt}
                  >
                    <img src={item.src} alt={item.alt} className="h-auto" />
                    <span className="text-center text-wrap text-[13px] text-white/60">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="rounded-3xl bg-[#00235B] absolute inset-x-6 inset-y-5" />
      </div>
      <div className="absolute inset-x-13 bottom-8 z-[1]">
        <Image
          src="/images/elements.svg"
          alt="Elements"
          width={1472}
          height={516}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Hero;
