import { getBlogDetail } from "@/actions/blogsApi";
import BlogsDetailView from "@/containers/store/blog/blog-detail/view";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { payload } = await getBlogDetail(params?.slug);
  if (!payload.data && payload.data?.length === 0) {
    return {
      title: "Không tìm thấy bài viết!",
    };
  }

  return {
    title: `${payload?.data?.[0]?.title}`,
  };
}

async function BlogsDetailPage() {
  return <BlogsDetailView />;
}

export default BlogsDetailPage;
