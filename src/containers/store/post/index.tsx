"use client";

import { getAllPostAction } from "@/actions/post/post";
import HomeBlogCard from "@/components/store/home/blogCard";
import { SK_Box } from "@/components/UI/skeleton";
import { TListPost } from "@/types/post";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function PostContainer() {
  const [listPost, setListPost] = useState<TListPost[]>([]);

  const fetchListPost = async () => {
    const response = await getAllPostAction();
    if (response.res) {
      setListPost(response.res);
    } else {
      setListPost([]);
    }
  };
  useEffect(() => {
    fetchListPost();
  }, []);

  return (
    <div className={styles.blogCardContainer}>
      {listPost.length > 0 ? (
        listPost.map((blog, index) => (
          <HomeBlogCard
            key={index}
            title={blog.title}
            imgUrl={blog.image}
            shortText={blog.shortDesc}
            url={blog.link as string}
          />
        ))
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
  );
}

export default PostContainer;
