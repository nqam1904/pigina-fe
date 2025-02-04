import { TBlogCard } from "@/types/common";
import Image from "next/image";
import Link from "next/link";

import styles from "./homeBlogCard.module.scss";

const HomeBlogCard = ({ title, imgUrl, shortText, url }: TBlogCard) => {
  return (
    <div className={styles.blogCard}>
      <Link href={url} className={styles.imgWrapper} target="_blank">
        <Image
          src={imgUrl}
          alt={title}
          fill
          sizes="(max-width:500px)"
          priority
        />
      </Link>
      <Link href={url} target="_blank">
        <h2>{title}</h2>
      </Link>
      <span>
        {shortText.length > 180 ? shortText.slice(0, 180) + "..." : shortText}
      </span>
    </div>
  );
};

export default HomeBlogCard;
