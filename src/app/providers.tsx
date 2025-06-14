"use client";

import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";

import type { AbstractIntlMessages } from "next-intl";

export function Providers({ children, locale, messages }: { children: React.ReactNode; locale: string; messages: AbstractIntlMessages }) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </QueryClientProvider>
  );
}
