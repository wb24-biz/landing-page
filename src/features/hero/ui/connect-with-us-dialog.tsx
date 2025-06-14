import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment } from "react";

export function ConnectWithUsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const t = useTranslations("ConnectWithUsDialog");
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <div className="fixed inset-0 bg-[#00235BE5]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[700px] transform overflow-hidden rounded-4xl bg-white p-14 text-left align-middle shadow-xl transition-all relative">
            <DialogTitle className="text-4xl text-[#00235B] font-extrabold text-center mb-2 ">
              {t("title")}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute cursor-pointer top-4 right-6 text-gray-400 hover:text-gray-500 transition-all"
              >
                <span className="sr-only">{t("closeButtonSR")}</span>
                <X className="h-8 w-8" aria-hidden="true" />
              </button>
            </DialogTitle>
            <div className="text-xl text-center mb-8 text-[#00235B]">
              {t("subtitle")}
            </div>
            <form className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  name="registrarName"
                  placeholder={t("contactPlaceholder")}
                  required
                  className="h-12 text-xl placeholder:text-lg col-span-2"
                />
              </div>
              <Textarea
                name="additional"
                placeholder={t("questionPlaceholder")}
                rows={5}
                className="placeholder:text-lg text-xl mb-6 col-span-2"
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="xl"
                  variant="primaryBlue"
                  className="font-bold text-lg"
                >
                  {t("submitButton")}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
