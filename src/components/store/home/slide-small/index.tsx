"use client";

import WideAd from "@/components/store/home/wideAd";
import { SK_Box } from "@/components/UI/skeleton";
import { dataThumbnail } from "@/mocks";
import { fakeApiCall } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import styles from "./slideSmall.module.scss";

const SlideSmallContainer = () => {
  const [data, setData] = useState<any[]>([]);
  const fetchData = async () => {
    const res = await fakeApiCall(dataThumbnail, true, 2000);
    setData(res.data);
  };

  useEffect(() => {
    fetchData();
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
            title={item.title}
            url={item.link}
          />
        );
      })}
    </React.Fragment>
  );
};
export default SlideSmallContainer;
