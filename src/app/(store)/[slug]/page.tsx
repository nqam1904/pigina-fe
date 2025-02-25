import { getCateogry } from "@/actions/categoriesApi";
import { CONFIG } from "@/config-global";
import CategoryView from "@/containers/store/category/view";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { payload } = await getCateogry(params?.slug);
  if (!payload && payload.data?.length === 0) {
    return {
      title: "Không tìm thấy danh mục!",
    };
  }
  return {
    title: `${payload?.data?.[0]?.title || ""} ${CONFIG.appName}`,
  };
}
function CategoriePage() {
  return <CategoryView />;
}

export default CategoriePage;
