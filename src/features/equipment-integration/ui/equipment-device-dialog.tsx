import CarouselItems from "@/components/commerce-ui/image-carousel-basic-ex-01";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

export interface EquipmentItem {
  id: string;
  title: string;
  title_dialog: string;
  description: string;
  features: string[];
  price_title: string;
  price_value: string;
  serviceFee: string;
  full_description?: string;
  images: {
    title: string;
    url: string;
  }[];
}

export function EquipmentDeviceDialog({
  open,
  onOpenChange,
  equipment,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  equipment: EquipmentItem | null;
}) {
  const t = useTranslations("EquipmentDeviceDialog");
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <div className="fixed inset-0 bg-[#00235BE5]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-6xl transform overflow-hidden rounded-4xl bg-white py-8 px-6 lg:p-8 lg:px-12 text-left align-middle shadow-xl transition-all max-h-[80vh] overflow-y-auto sm:max-h-none sm:overflow-visible">
            <DialogTitle className="text-2xl md:text-4xl text-[#00235B] font-extrabold text-center mb-8 relative">
              {equipment?.title_dialog}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute cursor-pointer -top-4 lg:top-0 right-0 text-gray-400 hover:text-gray-500 transition-all"
              >
                <span className="sr-only">{t("close")}</span>
                <X
                  className="h-8 w-8 hover:text-[#136EFF] transition-colors"
                  aria-hidden="true"
                />
              </button>
            </DialogTitle>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
              <CarouselItems images={equipment?.images || []} />
              {/* <CarouselWithThumbs /> */}
              <div className="flex flex-col gap-5">
                <div className="flex bg-[#F4F8FF] gap-6 mb-3 rounded-2xl">
                  <div className="px-6 py-4 flex-1">
                    <div className="text-[#6A7281] text-sm">{t("price")}</div>
                    <div className="text-2xl font-normal text-[#363A41]">
                      {equipment?.price_value}
                    </div>
                  </div>
                  <div className="px-6 py-4 flex-1">
                    <div className="text-[#6A7281] text-sm">
                      {t("service_fee")}
                    </div>
                    <div className="text-2xl font-normal text-[#363A41]">
                      {equipment?.serviceFee}
                    </div>
                  </div>
                </div>
                <div className="text-[#363A41] leading-[20px] text-base mb-2">
                  {equipment?.full_description}
                </div>
                {equipment?.features && equipment.features.length > 0 && (
                  <div className="grid grid-cols-2 gap-3 text-base text-[#363A41] mt-2">
                    {equipment.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 text-base"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
