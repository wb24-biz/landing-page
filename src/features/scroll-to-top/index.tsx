"use client";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/kit/button";
import { ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const SCROLL_THRESHOLD = 400;

export const ScrollToTop = () => {
  const t = useTranslations("ScrollToTop");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Button
      type="button"
      aria-label={t("ariaLabel")}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={cn(
        "fixed bottom-8 right-8 z-40 hidden lg:flex h-12 w-12 rounded-full p-0 bg-[#002869] text-white hover:bg-[#0057b7] hover:text-[#ffd700] shadow-lg transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <ArrowUp className="size-5" />
    </Button>
  );
};
