import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./globals.scss";

import ProgressBar from "@/components/UI/progress-bar";
import { CONFIG } from "@/config-global";
import { detectLanguage } from "@/locales/server";
import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

const myFont = localFont({
  src: [
    {
      path: "../../public/fonts/Raleway-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/Raleway-Bold.ttf",
      weight: "700",
      style: "bold",
    },
    {
      path: "../../public/fonts/Raleway-Black.ttf",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-Custom",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Pigina Korea",
  description:
    "Địa chỉ: Số I5-TT10, Khu đô thị sinh thái Xuân Phương, Phường Xuân Phương, Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam.",
  icons: [
    {
      rel: "icon",
      url: `${CONFIG.assetsDir}/favicon.ico`,
    },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = CONFIG.isStaticExport ? "en" : await detectLanguage();
  return (
    <html
      lang={lang}
      suppressHydrationWarning={false}
      className={`${myFont.variable}`}
    >
      <body suppressHydrationWarning={false}>
        {/* <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}> */}
        <ProgressBar />
        {children}
        {/* </I18nProvider> */}
      </body>
    </html>
  );
}
