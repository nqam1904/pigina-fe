"use client";

import { CONFIG } from "@/config-global";
import { dataThumbnail } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
interface IProps {
  data: any[];
}
const Banner: React.FC<IProps> = (props: IProps) => {
  const { data = [] } = props || {};
  const [category, setCategory] = useState<any[]>([]);

  const handleDataCate = () => {
    if (data.length > 0) {
      setCategory(dataThumbnail);
    } else {
      setCategory(dataThumbnail);
    }
  };

  useEffect(() => {
    handleDataCate();
  }, [data]);

  const renderBanner = (item: any, index: number) => {
    const photo =
      item?.banner?.length > 0
        ? `${CONFIG.assetsDir}${item?.banner?.[0]?.url}`
        : item?.url;

    return (
      <Link href={`/${item.slug}`} className={styles.wraperBanner} key={index}>
        <Image
          src={photo}
          alt="banner"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={styles.imageBanner}
        />
        <p
          className={styles.bannerText}
          style={index === 1 ? { color: "#ffe066" } : {}}
        >
          {item.title}
        </p>
      </Link>
    );
  };
  return <>{category.map((item, index) => renderBanner(item, index))}</>;
};
export default Banner;
