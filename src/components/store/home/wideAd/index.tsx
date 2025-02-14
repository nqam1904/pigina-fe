import Image from "next/image";
import Link from "next/link";

import styles from "./wideAd.module.scss";

interface IProps {
  imgUrl: string;
  linkText?: string;
  url: string;
  title: string;
  isLightBG?: boolean;
}

const WideAd = ({
  imgUrl,
  linkText = "Xem chi tiết",
  title,
  url = "#",
  isLightBG = true,
}: IProps) => {
  return (
    <Link
      href={url}
      className={`${styles.wideAd} ${
        isLightBG ? styles.darkText : styles.lightText
      }`}
    >
      <h3>{title}</h3>
      <Link href={url}>{linkText}</Link>
      <Image
        src={imgUrl}
        fill
        alt={title}
        sizes="(max-width:500px)"
        priority
        objectFit="contain"
      />
    </Link>
  );
};

export default WideAd;
