"use client";
import { dataSlider } from "@/mocks";
import styles from "./styles.module.scss";

import { getBlog, getBlogDetail } from "@/actions/blogsApi";
import Breadcrumb from "@/components/UI/breadcrumb";
import { SK_Box } from "@/components/UI/skeleton";
import SlickSlider from "@/components/UI/slick-slide";
import Slider from "@/components/UI/slider";
import ItemSlideBlog from "@/components/store/blogs/item-slide-blog";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BlogsDetailView = () => {
  const { slug } = useParams<any>();
  const [data, setData] = useState<any>(null);
  const [listNews, setListNews] = useState<any[]>([]);

  const fetchNews = async () => {
    try {
      const response = await getBlogDetail(slug);
      const { payload } = await getBlog("news");

      setData(response?.payload?.data || null);
      setListNews(payload?.data || []);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [slug]);

  return (
    <div className={styles.container}>
      <Slider data={dataSlider} />
      {data ? <Breadcrumb slug={data?.[0]?.title} /> : <div />}
      <div
        className={`${styles.containerContent} ck-content`}
        dangerouslySetInnerHTML={{ __html: data?.[0]?.description || "" }}
      />
      <div className={`${styles.containerBlog} storeContainer`}>
        <h2>Bài viết liên quan</h2>
        {listNews.length > 0 ? (
          <SlickSlider>
            {listNews.map((item, index) => (
              <ItemSlideBlog {...item} key={index} />
            ))}
          </SlickSlider>
        ) : (
          <React.Fragment>
            <div className={styles.loading}>
              <SK_Box width="100%" height="16px" />
              <SK_Box width="100%" height="16px" />
              <SK_Box width="100%" height="16px" />
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BlogsDetailView;
