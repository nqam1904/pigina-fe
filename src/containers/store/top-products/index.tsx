"use client";
import { getAllTopProductsAction } from "@/actions/top-products/topProducts";
import ProductCard from "@/components/store/common/productCard";
import { SK_Box } from "@/components/UI/skeleton";
import useIsMobile from "@/hooks/useIsMobile";
import { TTopProducts } from "@/types/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function TopProducts() {
  const [data, setData] = useState<TTopProducts[]>([]);

  const isMobile = useIsMobile();

  const fetchData = async () => {
    try {
      const response = await getAllTopProductsAction();
      if (response.res) {
        setData(response.res);
      } else {
        setData([]);
      }
    } catch (e) {
      setData([]);
      console.log(e);
    } finally {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles.homeSection}>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className={styles.sectionHeader}>
                <h2>{item.title}</h2>
                <Link href={item.linkAll}>Xem tất cả</Link>
              </div>
              <div className={styles.cardsWrapper}>
                {item.productID.map((product, index) => {
                  return (
                    <ProductCard
                      name={product.name}
                      images={[product.images[0], product.images[1]]}
                      price={+product.price}
                      specialFeatures={product.specialFeatures}
                      url={`/product/${product.id}`}
                      key={index}
                      staticWidth={isMobile ? false : true}
                      salePrice={product.salePrice}
                      isFlex={item.productID.length === 1 ? false : true}
                      isAvailable={product.isAvailable}
                    />
                  );
                })}
              </div>
            </React.Fragment>
          );
        })
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

export default TopProducts;
