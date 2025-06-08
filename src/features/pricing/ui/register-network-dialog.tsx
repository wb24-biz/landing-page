import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";

export function RegisterNetworkDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onOpenChange}>
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[900px] transform overflow-hidden rounded-4xl bg-white p-14 text-left align-middle shadow-xl transition-all">
            <DialogTitle className="text-4xl text-[#00235B] font-extrabold text-center mb-2">
              Заявка
            </DialogTitle>
            <div className="text-xl text-center mb-8 text-[#00235B]">
              на реєстрацію мережі автоматів
            </div>
            <form className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Input
                  name="registrarName"
                  placeholder="Ім'я реєстратора*"
                  required
                  className="h-12 text-xl placeholder:text-lg col-span-2"
                />
                <Input
                  name="email"
                  placeholder="Електронна адреса*"
                  type="email"
                  required
                  className="h-12 placeholder:text-lg text-xl"
                />
                <Input
                  name="phone"
                  placeholder="Телефон"
                  className="h-12 placeholder:text-lg text-xl"
                />
                <Input
                  name="networkType"
                  placeholder="Тип мережі"
                  className="h-12 placeholder:text-lg text-xl"
                />
                <Input
                  name="networkName"
                  placeholder="Найменування мережі*"
                  required
                  className="h-12 placeholder:text-lg text-xl"
                />
                <Input
                  name="tariff"
                  placeholder="Тариф*"
                  required
                  className="h-12 placeholder:text-lg text-xl"
                />
                <Input
                  name="country"
                  placeholder="Страна*"
                  required
                  className="h-12 placeholder:text-lg text-xl"
                />
              </div>
              <Textarea
                name="additional"
                placeholder="Додаткова інформація"
                rows={5}
                className="placeholder:text-lg text-xl mb-6"
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="xl"
                  variant="primaryBlue"
                  className="font-bold text-lg"
                >
                  Відправити
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
