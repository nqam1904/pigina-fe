"use client";

import { getAllSildesSmallAction } from "@/actions/slides-small/SlidesSmall";
import WideAd from "@/components/store/home/wideAd";
import { SK_Box } from "@/components/UI/skeleton";
import { TSlideSmall } from "@/types/common";
import React, { useEffect, useState } from "react";
import styles from "./slideSmall.module.scss";

const SlideSmallContainer = () => {
  const [data, setData] = useState<TSlideSmall[]>([]);

  const getData = async () => {
    try {
      const response = await getAllSildesSmallAction();
      if (response.error) {
        setData([]);
        return;
      }
      setData(response.res);
    } catch (error) {
      setData([]);
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (data.length === 0) {
    return (
      <React.Fragment>
        <div className={styles.loading}>
          <SK_Box width="100%" height="16px" />
          <SK_Box width="100%" height="16px" />
          <SK_Box width="100%" height="16px" />
        </div>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {data.map((item, index) => {
        return (
          <WideAd
            key={index}
            imgUrl={item.url}
            smallTitle={item.title}
            title={item.desc}
            url={item.link}
          />
        );
      })}
    </React.Fragment>
  );
};
export default SlideSmallContainer;
