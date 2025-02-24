import { getBlog } from "@/actions/blogsApi";
import BlogsView from "@/containers/store/blog/view";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Tin tức sự kiện",
};

async function BlogsPage() {
  const { payload } = await getBlog("news");
  if (!payload?.data) {
    notFound();
  }
  return <BlogsView dataNews={payload?.data} />;
}

export default BlogsPage;
