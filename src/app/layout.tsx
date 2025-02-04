import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";
import { CONFIG } from "@/config-global";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lap4all - Gaming LAPTOP Hi-End",
  description: "Laptop, Gaming",
  icons: [
    {
      rel: "icon",
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={roboto.className}>
        {children}
      </body>
    </html>
  );
}
