"use client";
import { MinusIcon } from "@/components/icons/svgIcons";
import { SK_Box } from "@/components/UI/skeleton";
import { calculateDiscount } from "@/utils/utils";
import { Image } from "antd";
import React, { useState } from "react";
import styles from "./styles.module.scss";

type TProductBoardPreview = {
  name: string;
  price: number;
  salePrice: number;
  desc: string;
  specialFeatures: string[];
  warrantyPeriod: string;
  description?: string;
  images: string[];
  specifications: any[];
};

const BoardProductPreview: React.FC<TProductBoardPreview> = ({
  name = "Tên sản phẩm",
  price = 0,
  salePrice = 0,
  desc = "",
  specialFeatures = ["Chống nước", "Chống bụi"],
  warrantyPeriod = "Bao test 7 ngày 1 đổi 1, bảo hành 1 tháng",
  images = [],
  specifications = [],
}: TProductBoardPreview) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className={styles.container}>
      <div className={styles.wrapperTopSection}>
        {/* RIGHT */}
        <div className={styles.boardRight}>
          <div className={styles.gallery}>
            <div className={styles.imageList}>
              {images?.length > 0 ? (
                images.map((image: string, index: number) => {
                  if (image) {
                    return (
                      <Image
                        preview={false}
                        src={image}
                        fallback="https://res.cloudinary.com/dixay3mvg/image/upload/v1729924050/no-image-icon-0_gy9jrn.jpg"
                        alt="product_image"
                        width={64}
                        height={64}
                        key={index}
                        className={index === selectedIndex ? styles.active : ""}
                        onClick={() => setSelectedIndex(index)}
                      />
                    );
                  } else {
                    return null;
                  }
                })
              ) : (
                <React.Fragment>
                  <SK_Box width="64px" height="64px" />
                  <SK_Box width="64px" height="64px" />
                  <SK_Box width="64px" height="64px" />
                </React.Fragment>
              )}
            </div>
            <div className={styles.imageWrapper}>
              {images.length > 0 ? (
                <Image
                  src={images[selectedIndex]}
                  alt={`product_${selectedIndex}`}
                  sizes="(max-width:250px)"
                  fallback="https://res.cloudinary.com/dixay3mvg/image/upload/v1729924050/no-image-icon-0_gy9jrn.jpg"
                  preview={false}
                />
              ) : (
                <SK_Box width="90%" height="90%" />
              )}
            </div>
          </div>
        </div>
        {/* LEFT */}
        <div className={styles.boardLeft}>
          {/* NAME PRODUCT */}
          <h1>{name}</h1>
          {/* PRICE */}
          <h2 className={styles.price}>
            {salePrice
              ? salePrice?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })
              : price?.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
          </h2>
          {salePrice > 0 && (
            <div className={styles.salePrice}>
              <span className={styles.dealAmount}>
                {`
            Tiết kiệm
            ${calculateDiscount(price, salePrice)}
            %`}
              </span>
              {price && (
                <span className={styles.oldPrice}>
                  Giá gốc:{" "}
                  {price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              )}
            </div>
          )}
          {/* SPECIAL FEATURES */}
          <div className={styles.specialFeatures}>
            {specialFeatures &&
              specialFeatures?.map((feature, index) => (
                <span key={index}>{feature}</span>
              ))}
          </div>
          {/* WARRANTY PERIOD */}
          <span className={styles.warrantyPeriod}>{warrantyPeriod}</span>

          <hr />
          {/* SPECIFICATION SECTION */}
          {/* ----------------- SPECIFICATION SECTION ----------------- */}
        </div>
      </div>
      {/* ----------------- SPECIFICATION ----------------- */}
      <div className={styles.specification}>
        {specifications.length > 0 ? (
          <div className={styles.specification}>
            <h2>Thông tin kỹ thuật</h2>
            {specifications?.map((spec: any, index: number) => (
              <section key={index} className={styles.specGroup}>
                <div className={styles.specGroupHead}>
                  <button>
                    <MinusIcon width={12} />
                    <MinusIcon width={12} />
                  </button>
                  <h3>{spec.groupName || ""}</h3>
                </div>
                {spec.specs.map((row: any, index: number) => (
                  <div key={index} className={styles.row}>
                    <div className={styles.leftCol}>
                      <span>{row?.name || ""}</span>
                    </div>
                    <div className={styles.rightCol}>
                      <span>{row?.value || ""}</span>
                    </div>
                  </div>
                ))}
              </section>
            ))}
          </div>
        ) : (
          <SK_Box width="200px" height="30px" />
        )}
      </div>

      {/* ----------------- DESCRIPTION ----------------- */}
      <div className={styles.description}>
        <h2>Nội dung</h2>
        {desc ? (
          <div className="ql-snow">
            <div
              className="ql-editor"
              style={{
                fontSize: "12px",
                // width: "60%",
              }}
              dangerouslySetInnerHTML={{ __html: desc }}
            />
          </div>
        ) : (
          <SK_Box width="200px" height="30px" />
        )}
      </div>
    </div>
  );
};

export default BoardProductPreview;
