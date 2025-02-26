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
      setCategory(data);
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
        ? `${CONFIG.assetsDir}${item?.cover?.url}`
        : item?.url;

    return (
      <div className={styles.wraperBanner} key={index}>
        <Image
          src={photo}
          alt="banner"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={styles.imageBanner}
        />
        <Link href={`/${item.slug}`}>
          <p
            className={styles.bannerText}
            style={index === 1 ? { color: "#ffe066" } : {}}
          >
            {item.title}
          </p>
        </Link>
      </div>
    );
  };
  return <>{category.map((item, index) => renderBanner(item, index))}</>;
};
export default Banner;
