import { InformationIcon } from "@/components/icons/svgIcons";
import { ItemProductProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Button from "../button";
import styles from "./styles.module.scss";

function ItemProduct(props: ItemProductProps) {
  const { image, name, link = "", tooltip, badge } = props || {};
  return (
    <div className={styles.product}>
      <>
        {badge ? (
          <span className={styles.badgeProduct}>{badge}</span>
        ) : (
          <React.Fragment />
        )}

        <div className={styles.wrapperImage}>
          <Image
            alt={name}
            width={0}
            height={0}
            sizes="(max-width:256px)"
            priority
            draggable={false}
            src={image}
            className={styles.productImage}
          />
        </div>
        <div className={styles.wrapperName}>
          <p className={styles.productName}>{name}</p>
          <div className={styles.iconInfo}>
            <InformationIcon width={24} />
            <span className={styles.tooltipText}>{tooltip}</span>
          </div>
        </div>
        <div className={styles.flexRow}></div>
      </>
      <Link href={link} target="_blank">
        <Button text="Tìm hiểu thêm" className={styles.productButton} />
      </Link>
    </div>
  );
}
export default ItemProduct;
