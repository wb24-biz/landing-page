import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://wb24.biz"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}