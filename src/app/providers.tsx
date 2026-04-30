"use client";

import { LocaleProvider } from "@/i18n/client-provider";
import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";

export function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, Record<string, any>>;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialMessages={messages}>{children}</LocaleProvider>
    </QueryClientProvider>
  );
}
