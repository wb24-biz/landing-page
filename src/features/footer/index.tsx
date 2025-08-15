"use client";

import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { Link as ScrollLink } from "react-scroll";
import { useContactForm } from "../hero/model/use-contact-form";
import { useLocaleContext } from "@/i18n/client-provider";
import { locales } from "@/i18n/config";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { setLocale } = useLocaleContext();
  const t = useTranslations("Footer");
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ contact: "", message: "" });
  const contactFormMutation = useContactForm();

  const footerNavItems = [
    { label: t("nav.service"), to: "service" },
    { label: t("nav.functional"), to: "functional" },
    { label: t("nav.equipment"), to: "equipment" },
    { label: t("nav.pricing"), to: "pricing" },
    { label: t("nav.contacts"), to: "contacts" },
  ];


  function onChange(value: string) {
    // Type-safe validation that the value is a valid locale
    if ((locales as readonly string[]).includes(value)) {
      startTransition(() => {
        setLocale(value);
      });
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    contactFormMutation.mutate(formData, {
      onSuccess: () => {
        setFormData({ contact: "", message: "" });
      },
      onError: (error) => {
        console.error("Error submitting form:", error);
      },
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="relative rounded-3xl mx-3 md:mx-4 lg:mx-8 bg-[#00235B] ">
      <footer className="container mx-auto mb-4 z-10 px-2" id="contacts">
        <div className="h-auto md:min-h-[calc(100vh-24rem)] flex items-center justify-center">
          <div
            className="
              flex flex-col 
              lg:flex-row 
              justify-between 
              gap-12 
              w-full
              px-4
              py-8
              md:px-8
              lg:px-0
              md:py-12
              relative
              z-10
            "
          >
            {/* Ліва колонка (контакти та лого) */}
            <div className="flex flex-col justify-between grow items-start gap-6 text-white w-full lg:w-auto">
              <div className="space-y-6 w-full">
                <div className="space-y-2">
                  <h3 className="text-base sm:text-2xl font-medium mb-4 sm:mb-8 leading-snug">
                    {t("title.line1")}
                    <br />
                    {t("title.line2")}
                  </h3>

                  <Link
                    href="mailto:info@wb24.biz"
                    className="flex items-center gap-4 hover:text-blue-200 transition-colors"
                  >
                    <Image
                      src="/images/mail.svg"
                      width={24}
                      height={24}
                      alt="Mail"
                    />
                    <span className="text-lg sm:text-2xl break-all">
                      info@wb24.biz
                    </span>
                  </Link>

                  <Link
                    href="https://t.me/wb24_biz_bot"
                    className="flex items-center gap-4 hover:text-blue-200 transition-colors"
                  >
                    <Image
                      src="/images/telegram.svg"
                      width={24}
                      height={24}
                      alt="Telegram"
                    />
                    <span className="text-lg sm:text-2xl">@wb24_biz_bot</span>
                  </Link>
                </div>
              </div>

              <div className="pt-0 hidden md:block w-full">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/images/logo-footer.svg"
                    width={120}
                    height={32}
                    alt="WB24 Logo"
                    className="w-[120px] h-auto sm:w-[190px]"
                  />
                </div>

                <p className="text-xs sm:text-sm md:text-base text-white mb-4 sm:mb-8 max-w-xs">
                  {t("description")}
                </p>

                <div className="text-xs sm:text-sm text-white/60">
                  {t("copyright")}
                </div>
              </div>
            </div>

            {/* Права колонка (форма та навігація) */}
            <div className="flex flex-col grow-3 items-start gap-6 text-white w-full lg:w-auto">
              {/* Форма */}
              <div className="w-full max-w-none sm:max-w-xs md:max-w-sm lg:max-w-none">
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    placeholder={t("form.contact_placeholder")}
                    required
                    disabled={contactFormMutation.isPending}
                    className="bg-white border-none rounded-xl text-black placeholder:text-[#6A7281] placeholder:text-base h-12"
                  />
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("form.question_placeholder")}
                    required
                    disabled={contactFormMutation.isPending}
                    className="bg-white border-none rounded-xl text-black placeholder:text-[#6A7281] placeholder:text-base h-24"
                  />

                  {contactFormMutation.isSuccess && (
                    <div className="text-green-300 text-sm text-center">
                      {t("form.success_message")}
                    </div>
                  )}

                  {contactFormMutation.isError && (
                    <div className="text-red-300 text-sm text-center">
                      {t("form.error_message")}
                    </div>
                  )}

                  <Button
                    type="submit"
                    variant="primaryBlue"
                    size="xl"
                    disabled={
                      contactFormMutation.isPending ||
                      !formData.contact.trim() ||
                      !formData.message.trim()
                    }
                    className="w-full sm:w-[150px] text-base font-semibold"
                  >
                    {contactFormMutation.isPending
                      ? t("form.submitting_button")
                      : t("form.submit_button")}
                  </Button>
                </form>
              </div>

              {/* Навігаційні посилання, мови, соцмережі (адаптив grid->flex-col) */}
              <div
                className="
                grid grid-cols-2 
                sm:grid-cols-3 
                gap-x-0 
                gap-y-6 
                sm:gap-x-8 
                sm:gap-y-4 
                w-full 
                mt-8
                "
              >
                {/* Навігація */}
                <div className="mb-2 sm:mb-0">
                  <div className="flex flex-col gap-4 text-white/70 items-start">
                    {footerNavItems.map((item) => (
                      <ScrollLink
                        key={item.to}
                        to={item.to}
                        spy={true}
                        smooth={true}
                        duration={800}
                        offset={-80}
                        className="hover:text-white transition-colors cursor-pointer text-base sm:text-base"
                      >
                        {item.label}
                      </ScrollLink>
                    ))}
                  </div>
                </div>

                {/* Мови */}
                <div className="mb-2 sm:mb-0">
                  <div className="flex flex-col gap-4 sm:gap-4">
                    <button
                      onClick={() => onChange("ua")}
                      disabled={currentLocale === "ua"}
                      className={`text-left transition-colors ${
                        currentLocale === "ua"
                          ? "text-white font-bold"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {t("lang.ua")}
                    </button>
                    <button
                      onClick={() => onChange("ru")}
                      disabled={currentLocale === "ru"}
                      className={`text-left transition-colors ${
                        currentLocale === "ru"
                          ? "text-white font-bold"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {t("lang.ru")}
                    </button>
                    <button
                      onClick={() => onChange("en")}
                      disabled={currentLocale === "en"}
                      className={`text-left transition-colors ${
                        currentLocale === "en"
                          ? "text-white font-bold"
                          : "text-white/70 hover:text-white"
                      }`}
                    >
                      {t("lang.en")}
                    </button>

                    <div className="flex md:hidden gap-4 sm:justify-start justify-start">
                      <Link href="https://youtube.com">
                        <Image
                          src="/images/youtube.svg"
                          width={36}
                          height={36}
                          alt="YouTube"
                        />
                      </Link>
                      <Link href="https://facebook.com">
                        <Image
                          src="/images/facebook.svg"
                          width={36}
                          height={36}
                          alt="Facebook"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
                {/* Соцмережі */}
                <div className="hidden md:flex gap-4 sm:justify-start justify-start">
                  <Link href="https://youtube.com">
                    <Image
                      src="/images/youtube.svg"
                      width={36}
                      height={36}
                      alt="YouTube"
                    />
                  </Link>
                  <Link href="https://facebook.com">
                    <Image
                      src="/images/facebook.svg"
                      width={36}
                      height={36}
                      alt="Facebook"
                    />
                  </Link>
                </div>
              </div>

              <div className="pt-0 block md:hidden w-full">
                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/images/logo-footer.svg"
                    width={160}
                    height={32}
                    alt="WB24 Logo"
                    className="w-[160px] h-auto sm:w-[190px]"
                  />
                </div>

                <p className="text-base sm:text-lg  text-white mb-6 sm:mb-8 max-w-xs">
                  {t("description")}
                </p>

                <div className="text-xs sm:text-sm text-white/60">
                  {t("copyright")}
                </div>
              </div>
            </div>
          </div>

          {/* Фоновий блок адаптивний */}
          {/* <div
            className="
            absolute 
            inset-x-2 
            inset-y-0 
            rounded-3xl 
            bg-[#00235B] 
            z-0
            md:inset-x-4 md:inset-y-4 
            lg:inset-x-6 lg:inset-y-0
          "
          /> */}
        </div>
        {/* Фонові SVG елементи (адаптив розміри) */}
        <div className="absolute h-full inset-x-4 md:inset-x-8 lg:inset-x-10 top-0 lg:-bottom-18 z-[1]">
          <Image
            src="/images/elements-footer.svg"
            alt="Elements"
            width={600}
            height={210}
            className="object-contain rounded-3xl w-full h-auto max-h-[200px] sm:max-h-[280px] lg:max-h-[400px] mx-auto"
          />
        </div>
      </footer>
    </div>
  );
}
