"use client";

import Breadcrumb from "@/components/UI/breadcrumb";
import { SK_Box } from "@/components/UI/skeleton";
import Slider from "@/components/UI/slider";
import { dataSliderSection1, dataSliderSection2 } from "@/mocks";
import { dataSectionHome } from "@/mocks/blogs";
import { fakeApiCall } from "@/utils/utils";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.scss";

const Page = () => {
  const { slug } = useParams<any>();
  const [data, setData] = useState<any>(null);
  const fetchApi = async () => {
    const res = await fakeApiCall(dataSectionHome, true, 2000);
    const response = res.data.find((item: any) => item.slug === slug);
    setData(response || null);
  };

  useEffect(() => {
    fetchApi();
  }, [slug]);

  return (
    <div className={`${styles.container}`}>
      <Slider
        data={slug === "danh-cho-be" ? dataSliderSection2 : dataSliderSection1}
      />
      {data ? <Breadcrumb slug={data?.title} /> : <div />}
      <div className="storeContainer">
        {data ? (
          <div
            className={`${styles.content} ck-content`}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
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
      {data?.preview.length > 0 ? (
        <div className={styles.reviewContainer}>
          {data.preview.length === 1 ? <></> : <h2>Cảm nhận của khác hàng</h2>}
          {data.preview.length === 1 ? (
            <div className={styles.video}>
              {data?.preview?.map?.((item: any, index: number) => (
                <iframe
                  key={index}
                  width="600"
                  height="300"
                  src={item.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                ></iframe>
              ))}
            </div>
          ) : (
            <div className={styles.previewVideo}>
              {data?.preview?.map?.((item: any, index: number) => (
                <iframe
                  key={index}
                  width="600"
                  height="300"
                  src={item.url}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ border: "none" }}
                ></iframe>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default Page;
