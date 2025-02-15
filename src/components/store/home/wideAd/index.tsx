import Image from "next/image";
import Link from "next/link";

import styles from "./wideAd.module.scss";
import Button from "@/components/UI/button";

interface IProps {
  imgUrl: string;
  linkText?: string;
  url: string;
  title: string;
  isLightBG?: boolean;
}

const WideAd = ({ imgUrl, title, url = "#" }: IProps) => {
  return (
    <>
      <Link href={url} className={styles.wideAd}>
        <Image
          src={imgUrl}
          fill
          alt={title}
          sizes="(max-width:500px)"
          priority
          objectFit="contain"
        />
      </Link>
    </>
  );
};

export default WideAd;
