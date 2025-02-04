import HeaderAdmin from "@/components/admin/header";
import SessionWrapper from "@/components/admin/session";
import SideBar from "@/components/admin/side-bar";
import ProgressBar from "@/components/UI/progress-bar";
import { authOptions } from "@/lib/authOptions";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import localFont from "next/font/local";
import { redirect } from "next/navigation";

const outfitFont = localFont({
  src: "../../../public/fonts/Outfit-VariableFont.ttf",
  fallback: ["sans-serif", "system-ui", "arial"],
});
export const metadata: Metadata = {
  title: "Dashboard",
};

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={outfitFont.className}>
          <AntdRegistry>
            <HeaderAdmin />
            <Layout>
              <SideBar>
                <ProgressBar />
                {children}
              </SideBar>
            </Layout>
          </AntdRegistry>
        </body>
      </html>
    </SessionWrapper>
  );
};

export default AdminLayout;
