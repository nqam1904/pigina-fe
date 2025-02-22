"use client";
import { dataSlider } from "@/mocks";
import styles from "./styles.module.scss";

import SlickSlider from "@/components/UI/slick-slide";
import Slider from "@/components/UI/slider";
import ItemSlideBlog from "@/components/store/blogs/item-slide-blog";
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
      <div
        className={`${styles.containerContent} ck-content`}
        dangerouslySetInnerHTML={{ __html: data }}
      />
      <div className={`${styles.containerBlog} storeContainer`}>
        <h2>Bài viết liên quan</h2>
        <SlickSlider>
          {dataBlogs.map((item, index) => (
            <ItemSlideBlog {...item} key={index} />
          ))}
        </SlickSlider>
      </div>
    </div>
  );
};

export default BlogsPage;
