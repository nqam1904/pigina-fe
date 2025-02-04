import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Metadata } from "next";
import localFont from "next/font/local";

const outfitFont = localFont({
  src: "../../../public/fonts/Outfit-VariableFont.ttf",
  fallback: ["sans-serif", "system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "Đăng nhập",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={outfitFont.className}>
        <AntdRegistry>
          <Layout style={{ margin: 0 }}>{children}</Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
