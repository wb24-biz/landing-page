import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select"; // Added shadcn/ui Select imports
import { Textarea } from "@/shared/ui/kit/textarea";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { Fragment } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  RegisterNetworkFormData,
  registerNetworkSchema,
} from "../model/register-network-schema";
import { useConnectRegistration } from "../model/use-connect-registration";
import { TariffOption, useFetchTariffs } from "../model/use-fetch-tariffs";

export function RegisterNetworkDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control, // Added control for Controller component
  } = useForm<RegisterNetworkFormData>({
    resolver: zodResolver(registerNetworkSchema),
    defaultValues: {
      registrarName: "",
      email: "",
      phone: "",
      networkName: "",
      networkType: "",
      tariff: "",
      country: "",
      additional: "",
    },
  });

  const connectRegistrationMutation = useConnectRegistration();
  const {
    data: tariffs,
    isLoading: isLoadingTariffs,
    error: tariffsError,
  } = useFetchTariffs();

  const onSubmit: SubmitHandler<RegisterNetworkFormData> = (data) => {
    connectRegistrationMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Заявку успішно відправлено!");
        console.log("Form submitted successfully!", data);
        reset(); // Reset form fields
        onOpenChange(false); // Close dialog
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Сталася помилка. Будь ласка, спробуйте ще раз."
        );
        console.error("Form submission error:", error);
      },
    });
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={() => onOpenChange(false)}
      >
        <div className="fixed inset-0 bg-[#00235BE5]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[900px] transform overflow-hidden rounded-4xl bg-white p-14 text-left align-middle shadow-xl transition-all relative">
            <DialogTitle className="text-4xl text-[#00235B] font-extrabold text-center mb-2 ">
              Заявка
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="absolute cursor-pointer top-4 right-6 text-gray-400 hover:text-gray-500 transition-all"
              >
                <span className="sr-only">Close</span>
                <X className="h-8 w-8" aria-hidden="true" />
              </button>
            </DialogTitle>
            <div className="text-xl text-center mb-8 text-[#00235B]">
              на реєстрацію мережі автоматів
            </div>
            <form
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Input
                    {...register("registrarName")}
                    placeholder="Ім'я реєстратора*"
                    className="h-12 text-xl placeholder:text-lg"
                    aria-invalid={errors.registrarName ? "true" : "false"}
                  />
                  {errors.registrarName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.registrarName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("email")}
                    placeholder="Електронна адреса*"
                    type="email"
                    className="h-12 placeholder:text-lg text-xl"
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("phone")}
                    placeholder="Телефон"
                    className="h-12 placeholder:text-lg text-xl"
                    aria-invalid={errors.phone ? "true" : "false"}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("networkName")}
                    placeholder="Найменування мережі*"
                    className="h-12 placeholder:text-lg text-xl"
                    aria-invalid={errors.networkName ? "true" : "false"}
                  />
                  {errors.networkName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.networkName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    {...register("networkType")}
                    placeholder="Тип мережі"
                    className="h-12 placeholder:text-lg text-xl"
                    aria-invalid={errors.networkType ? "true" : "false"}
                  />
                  {errors.networkType && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.networkType.message}
                    </p>
                  )}
                </div>
                <div>
                  <Controller
                    control={control}
                    name="tariff"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={isLoadingTariffs || !!tariffsError}
                      >
                        <SelectTrigger
                          className="!h-12 w-full text-xl placeholder:text-lg"
                          aria-invalid={errors.tariff ? "true" : "false"}
                        >
                          <SelectValue placeholder="Оберіть тариф*" />
                        </SelectTrigger>
                        <SelectContent>
                          {isLoadingTariffs ? (
                            <SelectItem value="loading" disabled>
                              Завантаження тарифів...
                            </SelectItem>
                          ) : tariffsError ? (
                            <SelectItem value="error" disabled>
                              Помилка завантаження тарифів
                            </SelectItem>
                          ) : (
                            tariffs?.map((tariff: TariffOption) => (
                              <SelectItem
                                key={tariff.tariff_id}
                                value={String(tariff.tariff_id)}
                                className="text-lg"
                              >
                                {tariff.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.tariff && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.tariff.message}
                    </p>
                  )}
                </div>
                <div className="md:col-span-2">
                  {" "}
                  {/* Country input can span full width on medium screens if only one left, or adjust as needed */}
                  <Input
                    {...register("country")}
                    placeholder="Країна"
                    className="h-12 placeholder:text-lg text-xl"
                    aria-invalid={errors.country ? "true" : "false"}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-6">
                <Textarea
                  {...register("additional")}
                  placeholder="Додаткова інформація"
                  rows={5}
                  className="placeholder:text-lg text-xl w-full"
                  aria-invalid={errors.additional ? "true" : "false"}
                />
                {errors.additional && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.additional.message}
                  </p>
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="xl"
                  variant="primaryBlue"
                  className="font-bold text-lg"
                  disabled={
                    isSubmitting || connectRegistrationMutation.isPending
                  }
                >
                  {isSubmitting || connectRegistrationMutation.isPending
                    ? "Відправка..."
                    : "Відправити"}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
