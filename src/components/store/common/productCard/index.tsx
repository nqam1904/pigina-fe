import styles from "./productCard.module.scss";

import Image from "next/image";
import Link from "next/link";

import useIsMobile from "@/hooks/useIsMobile";
import { TProductCard } from "@/types/common";
import React from "react";
import useIsTablet from "@/hooks/useIsTablet";

const ProductCard = ({
  name,
  images,
  price,
  salePrice = 0,
  specialFeatures = [],
  url,
  isAvailable = true,
  staticWidth = false,
  isFlex = false,
  isQuickView = false,
  specs,
  onQuickView,
}: TProductCard) => {
  const isMobile = useIsMobile();
  const isTablet = useIsTablet();

  const showQuickView = () => {
    const data = {
      name,
      images,
      price,
      salePrice,
      url,
      specs,
    };
    onQuickView?.(data);
  };
  return (
    <Link
      href={url}
      passHref
      className={`${styles.productCard} ${staticWidth && styles.staticWidth} ${
        isFlex && styles.flex
      }`}
    >
      {!isAvailable && (
        <div className={styles.outOfStock}>
          <span>Hết hàng</span>
        </div>
      )}
      <div className={styles.imageWrapper}>
        <Image
          src={images[0]}
          priority
          alt={name}
          fill
          sizes="(max-width: 240px)"
        />
        <Image
          src={images[1]}
          priority
          alt={name}
          fill
          sizes="(max-width: 240px)"
        />
      </div>
      <div className={styles.wrapperTitle}>
        <span className={styles.title}>{name}</span>
      </div>
      <div className={styles.specWrapper}>
        {specialFeatures.map((feature, index) => (
          <span key={index}>{feature}</span>
        ))}
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.priceWrapper}>
          {salePrice > 0 ? (
            <React.Fragment>
              <div className={styles.oldPrice}>
                <span>
                  -
                  {(100 - (salePrice / price) * 100).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  %
                </span>
                <span>
                  {price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </div>
              <span className={styles.mainPrice}>
                {salePrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </span>
            </React.Fragment>
          ) : (
            <span className={styles.mainPrice}>
              {price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </span>
          )}
        </div>
        <div className={styles.basketWrapper}>
          <button
            onClick={(e) => {
              e.preventDefault();
              showQuickView();
            }}
            className={
              isQuickView && !isMobile && !isTablet
                ? styles.quickView
                : styles.addFavorite
            }
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
