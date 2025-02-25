import { getProductBySlug } from "@/actions/productApi";
import { CONFIG } from "@/config-global";
import ProductView from "@/containers/store/product/view";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { payload } = await getProductBySlug(params?.slug);
  if (!payload && payload.data.length === 0) {
    return {
      title: "Không tìm thấy danh mục!",
    };
  }
  return {
    title: `${payload?.data?.[0]?.name || ""} ${CONFIG.appName}`,
  };
}
async function ProductPage() {
  return <ProductView />;
}

export default ProductPage;
