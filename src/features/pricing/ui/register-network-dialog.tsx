import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Field,
  Select,
  Transition,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronDownIcon, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Fragment, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  RegisterNetworkFormData,
  registerNetworkSchema,
} from "../model/register-network-schema";
import { useConnectRegistration } from "../model/use-connect-registration";
import { CountryOption, useFetchCountries } from "../model/use-fetch-countries";
import {
  MachineTypeOption,
  useFetchMachineTypes,
} from "../model/use-fetch-machine-types";
import { TariffOption, useFetchTariffs } from "../model/use-fetch-tariffs";

export function RegisterNetworkDialog({
  open,
  onOpenChange,
  tariff_id,
  setTariffId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tariff_id: number | null;
  setTariffId: (tariff_id: number | null) => void;
}) {
  const t = useTranslations("RegisterNetworkDialog");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
    setValue,
  } = useForm<RegisterNetworkFormData>({
    resolver: zodResolver(registerNetworkSchema),
    defaultValues: {
      registrarName: "",
      email: "",
      phone: "",
      networkName: "",
      networkType: "",
      tariff: String(tariff_id),
      country: "",
      additional: "",
    },
  });

  useEffect(() => {
    if (tariff_id) {
      setValue("tariff", String(tariff_id));
    }
  }, [tariff_id, setValue]);

  const connectRegistrationMutation = useConnectRegistration();
  const {
    data: tariffs,
    isLoading: isLoadingTariffs,
    error: tariffsError,
  } = useFetchTariffs();

  const {
    data: countries,
    isLoading: isLoadingCountries,
    error: countriesError,
  } = useFetchCountries();

  const {
    data: machineTypes,
    isLoading: isLoadingMachineTypes,
    error: machineTypesError,
  } = useFetchMachineTypes();

  const onSubmit: SubmitHandler<RegisterNetworkFormData> = (data) => {
    connectRegistrationMutation.mutate(data, {
      onSuccess: () => {
        toast.success(t("successMessage"));
        console.log("Form submitted successfully!", data);
        reset();
        onOpenChange(false);
      },
      onError: (error: any) => {
        toast.error(
          error.response?.data?.message || error.message || t("errorMessage")
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
        onClose={() => {
          onOpenChange(false);
          setTariffId(null);
          reset();
        }}
      >
        <div className="fixed inset-0 bg-[#00235BE5]" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-[900px] transform overflow-hidden rounded-4xl bg-white px-4 py-6 md:p-14 text-left align-middle shadow-xl transition-all relative">
            <DialogTitle className="text-4xl text-[#00235B] font-extrabold text-center mb-2 ">
              {t("title")}
              <button
                type="button"
                onClick={() => {
                  onOpenChange(false);
                  setTariffId(null);
                  reset();
                }}
                className="absolute cursor-pointer top-4 right-6 text-gray-400 hover:text-gray-500 transition-all"
              >
                <span className="sr-only">{t("closeButtonSR")}</span>
                <X
                  className="h-8 w-8 hover:text-[#136EFF]"
                  aria-hidden="true"
                />
              </button>
            </DialogTitle>
            <div className="text-xl text-center mb-8 text-[#00235B]">
              {t("subtitle")}
            </div>
            <form
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="md:col-span-2">
                  <Input
                    {...register("registrarName")}
                    placeholder={t("registrarNamePlaceholder")}
                    className="h-12 text-xl placeholder:text-lg "
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
                    placeholder={t("emailPlaceholder")}
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
                    placeholder={t("phonePlaceholder")}
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
                    placeholder={t("networkNamePlaceholder")}
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
                  <Controller
                    control={control}
                    name="networkType"
                    render={({ field: networkTypeField }) => (
                      <div className="w-full">
                        <Field>
                          <div className="relative">
                            <Select
                              {...networkTypeField}
                              disabled={
                                isLoadingMachineTypes || !!machineTypesError
                              }
                              className={cn(
                                "h-12 placeholder:text-muted-foreground placeholder:text-lg text-xl border block w-full appearance-none rounded-lg px-3 py-1.5 text-black",
                                "focus:border-[#136EFF] [&:not(:placeholder-shown)]:border-[#136EFF]",
                                "*:text-black",
                                "disabled:opacity-50"
                              )}
                            >
                              <option
                                value=""
                                disabled
                                className="text-muted-foreground"
                              >
                                {t("networkTypePlaceholder")}
                              </option>
                              {isLoadingMachineTypes ? (
                                <option value="loading" disabled>
                                  {t("loadingMachineTypes")}
                                </option>
                              ) : machineTypesError ? (
                                <option value="error" disabled>
                                  {t("errorMachineTypes")}
                                </option>
                              ) : (
                                machineTypes?.map(
                                  (machineType: MachineTypeOption) => (
                                    <option
                                      key={machineType.type_id}
                                      value={String(machineType.type_id)} // Or machineType.description if schema expects name
                                    >
                                      {machineType.description}{" "}
                                      {/* Display description */}
                                    </option>
                                  )
                                )
                              )}
                            </Select>
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4.5 right-2.5 size-4 fill-white/60"
                              aria-hidden="true"
                            />
                          </div>
                        </Field>
                      </div>
                    )}
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
                      <div className="w-full max-w-md">
                        <Field>
                          <div className="relative">
                            <Select
                              value={field.value}
                              onChange={field.onChange}
                              disabled={isLoadingTariffs || !!tariffsError}
                              className={cn(
                                "h-12 placeholder:text-lg text-xl border block w-full appearance-none rounded-lg px-3 py-1.5 text-black",
                                "focus:border-[#136EFF] [&:not(:placeholder-shown)]:border-[#136EFF]",
                                "*:text-black"
                              )}
                            >
                              <option value="" disabled>
                                {t("tariffPlaceholder")}
                              </option>
                              {isLoadingTariffs ? (
                                <div className="px-2 py-1.5 text-gray-500">
                                  {t("loadingTariffs")}
                                </div>
                              ) : tariffsError ? (
                                <div className="px-2 py-1.5 text-red-500">
                                  {t("errorTariffs")}
                                </div>
                              ) : (
                                tariffs?.map((tariff: TariffOption) => (
                                  <option
                                    key={tariff.tariff_id}
                                    value={String(tariff.tariff_id)}
                                    className="text-lg px-2 py-1.5 rounded-md data-[hover]:bg-blue-100 data-[selected]:bg-blue-500 data-[selected]:text-white cursor-pointer"
                                  >
                                    {tariff.name}
                                  </option>
                                ))
                              )}
                            </Select>
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4.5 right-2.5 size-4 fill-white/60"
                              aria-hidden="true"
                            />
                          </div>
                        </Field>
                      </div>
                    )}
                  />
                  {errors.tariff && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.tariff.message}
                    </p>
                  )}
                </div>
                <div className="">
                  <Controller
                    control={control}
                    name="country"
                    render={({ field: countryField }) => (
                      <div className="w-full">
                        <Field>
                          <div className="relative">
                            <Select
                              {...countryField}
                              disabled={isLoadingCountries || !!countriesError}
                              className={cn(
                                "h-12 placeholder:text-lg text-xl border block w-full appearance-none rounded-lg px-3 py-1.5 text-black",
                                "focus:border-[#136EFF] [&:not(:placeholder-shown)]:border-[#136EFF]",
                                "*:text-black",
                                "disabled:opacity-50"
                              )}
                            >
                              <option value="" disabled>
                                {t("countryPlaceholder")}
                              </option>
                              {isLoadingCountries ? (
                                <option value="loading" disabled>
                                  {t("loadingCountries")}
                                </option>
                              ) : countriesError ? (
                                <option value="error" disabled>
                                  {t("errorCountries")}
                                </option>
                              ) : (
                                countries?.map((country: CountryOption) => (
                                  <option
                                    key={country.country_id}
                                    value={String(country.country_id)}
                                  >
                                    {country.name}
                                  </option>
                                ))
                              )}
                            </Select>
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-4.5 right-2.5 size-4 fill-white/60"
                              aria-hidden="true"
                            />
                          </div>
                        </Field>
                      </div>
                    )}
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
                  placeholder={t("additionalInfoPlaceholder")}
                  rows={10}
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
                    ? t("submittingButton")
                    : t("submitButton")}
                </Button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  );
}
