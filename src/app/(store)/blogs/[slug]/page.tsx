"use client";
import { dataSlider } from "@/mocks";
import styles from "./styles.module.scss";

import Slider from "@/components/UI/slider";
import { dataBlogs } from "@/mocks/blogs";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const BlogsPage = () => {
  const { slug } = useParams<any>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const response = dataBlogs.find((item) => item.slug === slug)?.description;
    setData(response || null);
  }, [slug]);

  return (
    <div className={styles.container}>
      <Slider data={dataSlider} />
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default BlogsPage;
