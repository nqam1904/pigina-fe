"use client";
import { calculateDiscount } from "@/utils/utils";
import Gallery from "../../productPage/gallery";
import styles from "./quickview.module.scss";

import { generateSpecTable } from "@/actions/product/product";
import Button from "@/components/UI/button";
import { SK_Box } from "@/components/UI/skeleton";
import { TProductCard } from "@/types/common";
import { TSpecification } from "@/types/product";
import Link from "next/link";
import { useEffect, useState } from "react";

interface IProps extends TProductCard {}

const QuickView = ({
  name,
  images = [],
  price,
  salePrice = 0,
  url,
  specs,
}: IProps) => {
  const [specifications, setSpecifications] = useState<TSpecification[]>([]);

  const fetchSpecs = async () => {
    try {
      const response: any = await generateSpecTable(specs ?? []);
      if (response && response.length > 0) {
        setSpecifications(response);
      }
    } catch (error) {
      setSpecifications([]);
    }
  };

  useEffect(() => {
    fetchSpecs();
  }, [specs]);

  return (
    <div className={styles.quickviewContainer}>
      <div className={styles.quickview}>
        <Gallery images={images} height="180px" />
        <h2>{name}</h2>
        <h2 className={styles.price}>
          {(salePrice ?? price ?? 0).toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })}
        </h2>
        <div className={styles.salePrice}>
          <span className={styles.dealAmount}>
            {`
            Tiết kiệm
            ${calculateDiscount(price, salePrice)}%`}
          </span>
          <span className={styles.oldPrice}>
            Giá gốc:{" "}
            {price
              ? price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : 0}
          </span>
        </div>
        {specs && specs?.length > 0 ? (
          <div className={styles.specification}>
            <h2>Thông tin kỹ thuật</h2>
            {specifications.length > 0 ? (
              specifications?.map((spec: any, index: number) => (
                <section key={index} className={styles.specGroup}>
                  {spec.specs.map((row: any, index: number) => (
                    <div key={index} className={styles.row}>
                      <div className={styles.leftCol}>
                        <span>{row.name}</span>
                      </div>
                      <div className={styles.rightCol}>
                        <span key={index}>{row.value}</span>
                      </div>
                    </div>
                  ))}
                </section>
              ))
            ) : (
              <>
                <div className={styles.specLoading}>
                  <SK_Box width="200px" height="30px" />
                  <div className={styles.specs}>
                    <SK_Box width="10%" height="20px" />
                    <SK_Box width="40%" height="16px" />
                  </div>
                  <div className={styles.specs}>
                    <SK_Box width="10%" height="20px" />
                    <SK_Box width="40%" height="16px" />
                  </div>
                </div>
                <div className={styles.specLoading}>
                  <SK_Box width="200px" height="30px" />
                  <div className={styles.specs}>
                    <SK_Box width="10%" height="20px" />
                    <SK_Box width="40%" height="16px" />
                  </div>
                  <div className={styles.specs}>
                    <SK_Box width="10%" height="20px" />
                    <SK_Box width="40%" height="16px" />
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <></>
        )}
        <div className={styles.apply}>
          <Link href={url || "#"}>
            <Button text="Chi tiết" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
