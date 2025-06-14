// Stagewise Toolbar integration for Next.js (App Router)
"use client";
import { ReactPlugin } from "@stagewise-plugins/react";
import { StagewiseToolbar } from "@stagewise/toolbar-next";

export function StagewiseToolbarDevOnly() {
  // Toolbar only renders in development mode; this is handled by the package, but you can override with enabled={process.env.NODE_ENV === 'development'}
  return <StagewiseToolbar config={{ plugins: [ReactPlugin] }} />;
}
