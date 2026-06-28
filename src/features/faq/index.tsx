import { useTranslations } from "next-intl";

// Order of questions rendered on the page and mirrored in the FAQPage schema.
export const FAQ_IDS = [
  "what",
  "machines",
  "rro",
  "payments",
  "offline",
  "price",
  "integration",
  "hardware",
  "alerts",
  "languages",
] as const;

const Faq = () => {
  const t = useTranslations("Faq");

  return (
    <section
      id="faq"
      className="w-full container mx-auto px-2 md:px-4 py-12 lg:py-16"
    >
      <h2 className="text-2xl sm:text-3xl lg:text-[38px] text-[#00235B] font-bold text-center mb-1 sm:mb-2">
        {t("title")}
      </h2>
      <p className="text-center text-base sm:text-lg text-[#6A7281] mb-8 lg:mb-10 max-w-3xl mx-auto">
        {t("description")}
      </p>
      <div className="max-w-3xl mx-auto flex flex-col gap-3">
        {FAQ_IDS.map((id, idx) => (
          <details
            key={id}
            // First item open so the answer text is visible without interaction.
            open={idx === 0}
            className="group rounded-[20px] bg-white border border-[#E6EAF0] px-5 sm:px-6 py-4 transition-all hover:shadow-lg open:shadow-lg"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-base sm:text-lg text-[#363A41]">
              <span>{t(`items.${id}.question`)}</span>
              <span
                aria-hidden
                className="flex-none text-[#136EFF] text-2xl leading-none transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="text-[#6A7281] text-sm sm:text-base leading-relaxed mt-3">
              {t(`items.${id}.answer`)}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
};

export default Faq;
