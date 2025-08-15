"use client";

import { queryClient } from "@/shared/api/query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const LocaleProvider = dynamic(() => import("@/i18n/client-provider").then(mod => ({ default: mod.LocaleProvider })), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-white">
      <div className="animate-pulse flex space-x-4 p-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
});

export function Providers({ 
  children, 
  locale, 
  messages 
}: { 
  children: React.ReactNode; 
  locale: string; 
  messages: Record<string, Record<string, any>>; 
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <LocaleProvider initialMessages={messages}>
        {children}
      </LocaleProvider>
    </QueryClientProvider>
  );
}
