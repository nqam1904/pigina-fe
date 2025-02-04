"use client";
import { CloseIcon } from "@/components/icons/svgIcons";
import styles from "./gallery.module.scss";

import { SK_Box } from "@/components/UI/skeleton";
import Image from "next/image";
import React, { useState } from "react";

interface IProps {
  images?: string[];
  height?: string;
}

const Gallery: React.FC<IProps> = ({ images = [], height }: IProps) => {
  const [showZoom, setShowZoom] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  return (
    <div className={styles.gallery}>
      <div className={styles.imageList}>
        {images?.length > 0 ? (
          images.map((image: string, index: number) => {
            return (
              <Image
                src={image}
                alt="product_image"
                width={64}
                priority
                height={64}
                key={index}
                className={index === selectedIndex ? styles.active : ""}
                onClick={() => setSelectedIndex(index)}
              />
            );
          })
        ) : (
          <React.Fragment>
            <SK_Box width="64px" height="64px" />
            <SK_Box width="64px" height="64px" />
            <SK_Box width="64px" height="64px" />
          </React.Fragment>
        )}
      </div>
      <div className={styles.imageWrapper} style={{ height }}>
        {images.length > 0 ? (
          <Image
            src={images[selectedIndex]}
            alt={`product_${selectedIndex}`}
            fill
            priority
            sizes="(max-width:700px)"
            onClick={() => setShowZoom(true)}
          />
        ) : (
          <SK_Box width="90%" height="90%" />
        )}
      </div>
      {images.length > 0 && showZoom ? (
        <div className={styles.zoomWindow}>
          <div
            className={styles.background}
            onClick={() => setShowZoom(false)}
          />
          <div className={styles.mainImage}>
            <button onClick={() => setShowZoom(false)}>
              <CloseIcon width={16} />
            </button>
            <Image
              src={images[selectedIndex]}
              alt={`product_${selectedIndex}`}
              fill
              priority
              sizes="(max-width:700px)"
            />
          </div>
          <div className={styles.imageList}>
            {images.map((image: string, index: number) => (
              <Image
                src={image}
                alt={`product_${selectedIndex}`}
                width={64}
                height={64}
                key={index}
                className={index === selectedIndex ? styles.active : ""}
                onClick={() => setSelectedIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Gallery;
