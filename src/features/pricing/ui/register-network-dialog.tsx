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
  const machineTypesT = useTranslations("MachineTypes");
  const countriesT = useTranslations("Countries");
  const tariffOptionsT = useTranslations("PricingPlans.TariffOptions");

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
  } = useFetchTariffs(open);

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
        <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
          <DialogPanel className="max-w-[600px] sm:max-w-[550px] md:max-w-[600px] lg:max-w-[700px] xl:max-w-[750px] transform overflow-hidden rounded-2xl sm:rounded-3xl bg-white px-3 py-4 sm:px-6 sm:py-8 lg:p-14 text-left align-middle shadow-xl transition-all relative">
            <button
              type="button"
              onClick={() => {
                onOpenChange(false);
                setTariffId(null);
                reset();
              }}
              className="absolute cursor-pointer top-4 right-4 text-gray-400 hover:text-gray-500 transition-all z-10"
            >
              <span className="sr-only">{t("closeButtonSR")}</span>
              <X
                className="h-6 w-6 md:h-8 md:w-8 hover:text-[#136EFF]"
                aria-hidden="true"
              />
            </button>
            <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl text-[#00235B] font-extrabold text-center mb-2 ">
              {t("title")}
            </DialogTitle>
            <div className="text-base sm:text-lg lg:text-xl text-center mb-4 sm:mb-6 text-[#00235B]">
              {t("subtitle")}
            </div>
            <form
              className="w-full"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="md:col-span-2">
                  <Input
                    {...register("registrarName")}
                    placeholder={t("registrarNamePlaceholder")}
                    className="h-10 sm:h-12 text-base sm:text-lg lg:text-xl placeholder:text-sm sm:placeholder:text-lg"
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
                    className="h-10 sm:h-12 text-base sm:text-lg lg:text-xl placeholder:text-sm sm:placeholder:text-lg"
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
                    className="h-10 sm:h-12 text-base sm:text-lg lg:text-xl placeholder:text-sm sm:placeholder:text-lg"
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
                    className="h-10 sm:h-12 text-base sm:text-lg lg:text-xl placeholder:text-sm sm:placeholder:text-lg"
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
                                "h-10 sm:h-12 placeholder:text-muted-foreground placeholder:text-sm sm:placeholder:text-lg text-base sm:text-lg lg:text-xl border block w-full appearance-none rounded-lg px-3 py-1.5 text-black",
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
                                  (machineType: MachineTypeOption) => {
                                    // Use translated description if available, fallback to the description from API
                                    const translatedDesc = machineTypesT(
                                      `${machineType.type_id}.description`
                                    );
                                    const displayDesc =
                                      translatedDesc?.includes("MachineTypes.")
                                        ? machineType.description
                                        : translatedDesc ||
                                          machineType.description;

                                    return (
                                      <option
                                        key={machineType.type_id}
                                        value={String(machineType.type_id)}
                                      >
                                        {displayDesc}
                                      </option>
                                    );
                                  }
                                )
                              )}
                            </Select>
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-1/2 -translate-y-1/2 right-2.5 size-4 fill-white/60"
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
                      <div className="w-full max-w-lg">
                        <Field>
                          <div className="relative">
                            <Select
                              value={field.value}
                              onChange={field.onChange}
                              disabled={isLoadingTariffs || !!tariffsError}
                              className={cn(
                                "h-10 sm:h-12 placeholder:text-sm sm:placeholder:text-lg text-base sm:text-lg lg:text-xl border block w-full appearance-none rounded-lg px-3 py-1.5 text-black",
                                "focus:border-[#136EFF] [&:not(:placeholder-shown)]:border-[#136EFF]",
                                "*:text-black"
                              )}
                            >
                              <option value="" disabled>
                                {t("tariffPlaceholder")}
                              </option>
                              {isLoadingTariffs ? (
                                <option value="loading" disabled>
                                  {t("loadingTariffs")}
                                </option>
                              ) : tariffsError ? (
                                <option value="error" disabled>
                                  {t("errorTariffs")}
                                </option>
                              ) : (
                                tariffs?.map((tariff: TariffOption) => {
                                  // Use translated name if available, fallback to the name from API
                                  const translatedName = tariffOptionsT(
                                    `${tariff.tariff_id}.name`
                                  );
                                  const displayName = translatedName?.includes(
                                    "TariffOptions."
                                  )
                                    ? tariff.name
                                    : translatedName || tariff.name;

                                  return (
                                    <option
                                      key={tariff.tariff_id}
                                      value={String(tariff.tariff_id)}
                                      className="text-lg px-2 py-1.5 rounded-md data-[hover]:bg-blue-100 data-[selected]:bg-blue-500 data-[selected]:text-white cursor-pointer"
                                    >
                                      {displayName}
                                    </option>
                                  );
                                })
                              )}
                            </Select>
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-1/2 -translate-y-1/2 right-2.5 size-4 fill-white/60"
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
                                "h-10 sm:h-12 placeholder:text-sm sm:placeholder:text-lg text-base sm:text-lg lg:text-xl border block w-full appearance-none rounded-lg px-3 py-1.5 text-black",
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
                                countries?.map((country: CountryOption) => {
                                  // Use translated name if available, fallback to the name from API
                                  const translatedName = countriesT(
                                    `${country.country_id}.name`
                                  );
                                  const displayName = translatedName?.includes(
                                    "Countries."
                                  )
                                    ? country.name
                                    : translatedName || country.name;

                                  const banner = countriesT(
                                    `${country.country_id}.banner`
                                  );
                                  const displayBanner = banner?.includes(
                                    "Countries."
                                  )
                                    ? ""
                                    : banner;

                                  return (
                                    <option
                                      key={country.country_id}
                                      value={String(country.country_id)}
                                    >
                                      {displayBanner} {displayName}
                                    </option>
                                  );
                                })
                              )}
                            </Select>
                            <ChevronDownIcon
                              className="group pointer-events-none absolute top-1/2 -translate-y-1/2 right-2.5 size-4 fill-white/60"
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
              <div className="mb-4 sm:mb-6">
                <Textarea
                  {...register("additional")}
                  placeholder={t("additionalInfoPlaceholder")}
                  rows={6}
                  className="placeholder:text-sm sm:placeholder:text-lg text-base sm:text-lg lg:text-xl w-full"
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
                  size="lg"
                  variant="primaryBlue"
                  className="font-bold text-base sm:text-lg"
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
