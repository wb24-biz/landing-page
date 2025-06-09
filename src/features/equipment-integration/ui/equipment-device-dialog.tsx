import CarouselWithThumbs from "@/shared/ui/carousel-09";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import {
  ClipboardList,
  Database,
  Network,
  Settings,
  Smartphone,
  X,
} from "lucide-react";
import { Fragment } from "react";

export function EquipmentDeviceDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <div className="fixed inset-0 bg-[#00235BE5]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-6xl transform overflow-hidden rounded-4xl bg-white p-8 px-12 text-left align-middle shadow-xl transition-all">
            <DialogTitle className="text-4xl text-[#00235B] font-extrabold text-center mb-8 relative">
              Телеметрічний контролер KIT BOX MASTER
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute cursor-pointer top-0 right-0 text-gray-400 hover:text-gray-500 transition-all"
              >
                <span className="sr-only">Close</span>
                <X className="h-8 w-8" aria-hidden="true" />
              </button>
            </DialogTitle>
            <div className="w-full grid grid-cols-2">
              <div>
                <CarouselWithThumbs />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex bg-[#F4F8FF] gap-6 mb-3 rounded-2xl">
                  <div className=" px-6 py-4 flex-1">
                    <div className="text-[#6A7281] text-sm">Вартість</div>
                    <div className="text-2xl font-normal text-[#363A41]">
                      8 200 грн.
                    </div>
                  </div>
                  <div className=" px-6 py-4 flex-1">
                    <div className="text-[#6A7281] text-sm">Сервісна плата</div>
                    <div className="text-2xl font-normal text-[#363A41]">
                      251 грн./мес.
                    </div>
                  </div>
                </div>
                <div className="text-[#363A41] leading-[20px] text-base mb-2">
                  Телеметричний контролер Kit Box Master вирішує завдання
                  повного контролю стану та управління торговим автоматом,
                  підключення еквайрингового терміналу та іншого обладнання,
                  хмарної фіскалізації продажів, застосування систем лояльності
                  та акцій.
                </div>
                <div className="text-[#363A41] leading-[20px] text-base mb-2">
                  Підтримує вендингові протоколи MDB, Executive (Price Holding
                  та Standart), DEX/UCS, DDCMP та сумісний з більш ніж 250
                  моделями торгових автоматів та кофемашин.
                </div>
                <div className="grid grid-cols-2 gap-3 text-base text-[#363A41] mt-2">
                  <div className="flex items-center gap-2 text-base">
                    <Settings className="text-blue-600" size={16} /> Master mode
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Smartphone className="text-blue-600" size={16} /> 2G, BT
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Database className="text-blue-600" size={16} /> EXE & MDB
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Network className="text-blue-600" size={16} />{" "}
                    RS-232/UART/USB
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <ClipboardList className="text-blue-600" size={16} />{" "}
                    EVA-DTS
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    {/* <BatteryHalf className="text-blue-600" size={16} />  */}
                    АКБ
                  </div>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
