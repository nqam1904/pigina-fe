import { getBanner } from "@/actions/bannerApi";
import { getFaq } from "@/actions/faqApi";
import FaqView from "@/containers/store/faq/view";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Câu hỏi thường gặp",
};

async function Page() {
  const { payload } = await getFaq();
  const banner = await getBanner();
  const dataSlider = banner?.payload?.data || [];

  if (!payload?.data) {
    notFound();
  }

  return <FaqView data={payload?.data || []} banner={dataSlider} />;
}
export default Page;
