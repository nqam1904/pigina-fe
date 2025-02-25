"use client";

import { getCateogry } from "@/actions/categoriesApi";
import { getProductByCategory } from "@/actions/productApi";
import SliderReview from "@/components/store/home/slider-review";
import Breadcrumb from "@/components/UI/breadcrumb";
import ItemProduct from "@/components/UI/item-product";
import { SK_Box } from "@/components/UI/skeleton";
import Slider from "@/components/UI/slider";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const CategoryView = () => {
  const { slug } = useParams<any>();
  const [data, setData] = useState<any>(null);
  const [productList, setProductList] = useState<any[]>([]);
  const [banner, setBanner] = useState<any[]>([]);

  const fetchApi = async () => {
    let listBanner: any = [];
    // GET CATEGORY
    const category = await getCateogry(slug);
    setData(category.payload.data[0]);
    if (category.payload.data[0]?.banner) {
      category.payload.data[0]?.banner.map((item: any) => {
        listBanner.push({
          id: item.id,
          image: { url: item.url },
        });
      });
    }
    setBanner(listBanner);

    // GET PRODUCT
    const product = await getProductByCategory(
      category.payload.data[0]?.title || ""
    );
    setProductList(product.payload?.data || []);
  };

  useEffect(() => {
    fetchApi();
  }, [slug]);

  return (
    <div className={`${styles.container}`}>
      {banner.length > 0 ? (
        <Slider data={banner} type="api" />
      ) : (
        <React.Fragment>
          <div className={styles.loadingBanner}>
            <SK_Box width="100%" height="500px" />
          </div>
        </React.Fragment>
      )}
      {data ? <Breadcrumb slug={data?.title} /> : <div />}
      {/* DESCRIPTION */}
      <div className="storeContainer">
        {data ? (
          <div
            className={`${styles.content} ck-content`}
            dangerouslySetInnerHTML={{ __html: data?.description || "" }}
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
      {/* VIDEO */}
      {data?.preview.length > 0 ? (
        <div className={styles.reviewContainer}>
          {data.preview.length === 1 ? (
            <div className={styles.video}>
              {data?.preview?.map?.((item: any, index: number) => (
                <iframe
                  key={index}
                  width="600"
                  height="300"
                  src={item.link}
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
                  src={item.link}
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
      {/* LIST PRODUCT */}
      {productList.length > 0 ? (
        <div className={styles.productContainer}>
          <h2 className={styles.titleProduct}>Chi tiết các sản phẩm</h2>
          <div className={styles.listProduct}>
            {productList.map((item, index) => {
              return <ItemProduct {...item} key={index} />;
            })}
          </div>
        </div>
      ) : (
        <div className="storeContainer">
          <div className={styles.loading}>
            <SK_Box width="100%" height="16px" />
            <SK_Box width="100%" height="16px" />
            <SK_Box width="100%" height="16px" />
          </div>
        </div>
      )}
      {/* CUSTOMER PREVIEW */}
      <section className={styles.reviewContainer}>
        <h2>Cảm nhận khách hàng</h2>
        <SliderReview />
      </section>
    </div>
  );
};

export default CategoryView;
