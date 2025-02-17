import { DataBlogs } from "@/types";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

interface ItemProps extends DataBlogs {}

const ItemSlideBlog: React.FC<ItemProps> = ({
  title = "",
  slug = "",
  thumbnail = "",
  description = "",
  shortDes = "",
  author = "user",
}) => {
  return (
    <Link href={`/blogs/${slug}`}>
      <div className={styles.container}>
        <div className={styles.slideItem}>
          <div className={styles.slideImage}>
            <Image
              alt={title}
              width={0}
              height={0}
              sizes="100vw"
              priority
              src={thumbnail}
              className={styles.thumbnailItem}
            />
            <p className={styles.slideTitle}>{title}</p>
            <p className={styles.slideShort}>{shortDes}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};
export default ItemSlideBlog;
