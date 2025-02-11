import { CONFIG } from "@/config-global";
import { detectLanguage } from "@/locales/server";
import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.scss";

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
    <html lang={lang} suppressHydrationWarning>
      <body suppressHydrationWarning className={roboto.className}>
        {/* <I18nProvider lang={CONFIG.isStaticExport ? undefined : lang}> */}
        {children}
        {/* </I18nProvider> */}
      </body>
    </html>
  );
}
