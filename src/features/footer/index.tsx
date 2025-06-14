import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Textarea } from "@/shared/ui/kit/textarea";
import { getTranslations } from 'next-intl/server';
import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const t = await getTranslations();

  return (
    <footer className="container relative mx-auto mb-8">
      <div className="h-auto md:h-[calc(100vh-16rem)] flex items-center justify-center py-4">
        <div className="flex flex-col lg:flex-row justify-between gap-12 w-full">
          {/* Ліва колонка (контакти та лого) */}
          <div className="flex flex-col justify-between px-6 md:px-12 grow items-start gap-6 z-10 text-white">
            <div className="space-y-6 ">
              <div className="space-y-2">
                <h3 className="text-2xl font-medium mb-8">
                  {t('footer.questionsTitle')}
                </h3>

                <Link
                  href="mailto:info@wb24.biz"
                  className="flex items-center gap-4 hover:text-blue-200 transition-colors"
                >
                  <Image
                    src="/images/mail.svg"
                    width={24}
                    height={24}
                    alt="Email"
                  />{" "}
                  <span className="text-3xl">info@wb24.biz</span>
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
                  <span className="text-3xl">@wb24_biz_bot</span>
                </Link>
              </div>
            </div>

            <div className=" pt-0">
              {/* Лого та опис */}
              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/images/logo-footer.svg"
                  width={190}
                  height={52}
                  alt="WB24 Logo"
                />
              </div>

              <p className="text-sm md:text-base text-white mb-8 max-w-xs">
                {t('footer.description')}
              </p>

              <div className="text-sm text-white/60">
                {t('footer.rightsReserved')}
              </div>
            </div>
          </div>

          {/* Права колонка (форма та навігація) */}
          <div className="flex flex-col grow-3 items-start px-6 md:px-12 gap-6 z-10 text-white">
            {/* Форма зворотнього зв'язку */}
            <div className="w-full">
              <form className="flex flex-col gap-3">
                <Input
                  type="text"
                  placeholder={t('footer.contactPlaceholder')}
                  className="bg-white border-none rounded-xl text-black placeholder:text-[#6A7281] placeholder:text-base py-6"
                />
                <Textarea
                  placeholder={t('footer.questionPlaceholder')}
                  className="bg-white border-none rounded-xl text-black placeholder:text-[#6A7281] placeholder:text-base h-24"
                />
                <Button
                  type="submit"
                  variant="primaryBlue"
                  size="xl"
                  className="w-[150px] text-base font-semibold"
                >
                  {t('footer.submitButton')}
                </Button>
              </form>
            </div>

            {/* Навігаційні посилання */}
            <div className="grid grid-cols-3 gap-x-12 gap-y-4 w-full mt-8">
              <div>
                <div className="flex flex-col gap-4 text-white/70">
                  <Link
                    href="#service"
                    className="hover:text-white transition-colors"
                  >
                    {t('header.service')}
                  </Link>
                  <Link
                    href="#service"
                    className="hover:text-white transition-colors"
                  >
                    {t('header.functional')}
                  </Link>
                  <Link
                    href="#equipment"
                    className="hover:text-white transition-colors"
                  >
                    {t('header.equipment')}
                  </Link>
                  <Link
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    {t('header.pricing')}
                  </Link>
                  <Link
                    href="#contacts"
                    className="hover:text-white transition-colors"
                  >
                    {t('header.contacts')}
                  </Link>
                </div>
              </div>

              <div>
                <div className="flex flex-col gap-4 text-white/70">
                  <button className="text-left hover:text-white transition-colors">
                    {t('languages.ukrainian')}
                  </button>
                  <button className="text-left hover:text-white transition-colors">
                    {t('languages.russian')}
                  </button>
                  <button className="text-left hover:text-white transition-colors">
                    {t('languages.english')}
                  </button>
                </div>
              </div>
              {/* Соціальні мережі */}
              <div className="flex gap-4">
                <Link href="https://youtube.com">
                  <Image
                    src="/images/youtube.svg"
                    width={40}
                    height={40}
                    alt="YouTube"
                  />
                </Link>
                <Link href="https://facebook.com">
                  <Image
                    src="/images/facebook.svg"
                    width={40}
                    height={40}
                    alt="Facebook"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Фоновий блок */}
        <div className="rounded-3xl bg-[#00235B] absolute inset-x-0 inset-y-2" />
      </div>
      <div className="absolute inset-x-0 top-6 right-0 z-[1]">
        <Image
          src="/images/elements-footer.svg"
          alt="Elements"
          width={1472}
          height={516}
          className="object-contain rounded-3xl"
        />
      </div>
    </footer>
  );
}
