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
import { useTranslations } from "next-intl";

export function EquipmentDeviceDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("EquipmentDeviceDialog");
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <div className="fixed inset-0 bg-[#00235BE5]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-6xl transform overflow-hidden rounded-4xl bg-white p-8 px-12 text-left align-middle shadow-xl transition-all">
            <DialogTitle className="text-4xl text-[#00235B] font-extrabold text-center mb-8 relative">
              {t("title")}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute cursor-pointer top-0 right-0 text-gray-400 hover:text-gray-500 transition-all"
              >
                <span className="sr-only">{t("close")}</span>
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
                    <div className="text-[#6A7281] text-sm">{t("price")}</div>
                    <div className="text-2xl font-normal text-[#363A41]">
                      {t("price_value")}
                    </div>
                  </div>
                  <div className=" px-6 py-4 flex-1">
                    <div className="text-[#6A7281] text-sm">{t("service_fee")}</div>
                    <div className="text-2xl font-normal text-[#363A41]">
                      {t("service_fee_value")}
                    </div>
                  </div>
                </div>
                <div className="text-[#363A41] leading-[20px] text-base mb-2">
                  {t("desc1")}
                </div>
                <div className="text-[#363A41] leading-[20px] text-base mb-2">
                  {t("desc2")}
                </div>
                <div className="grid grid-cols-2 gap-3 text-base text-[#363A41] mt-2">
                  <div className="flex items-center gap-2 text-base">
                    <Settings className="text-blue-600" size={16} /> {t("features.0")}
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Smartphone className="text-blue-600" size={16} /> {t("features.1")}
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Database className="text-blue-600" size={16} /> {t("features.2")}
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <Network className="text-blue-600" size={16} />{" "}
                    {t("features.3")}
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <ClipboardList className="text-blue-600" size={16} />{" "}
                    {t("features.4")}
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    {/* <BatteryHalf className="text-blue-600" size={16} />  */}
                    {t("features.5")}
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
