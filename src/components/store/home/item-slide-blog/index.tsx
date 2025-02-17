import { DataBlogs } from "@/types";
import Image from "next/image";
import styles from "./styles.module.scss";

interface ItemProps extends DataBlogs {}

const ItemSlideBlog: React.FC<ItemProps> = ({
  title = "",
  slug = "",
  thumbnail = "",
  descirption = "",
  shortDes = "",
  author = "user",
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageItem}>
        <Image
          alt={title}
          width={0}
          height={0}
          priority
          src={thumbnail}
          className={styles.thumbnailItem}
        />
        <p>{shortDes}</p>
        <p>{descirption}</p>
      </div>
    </div>
  );
};
export default ItemSlideBlog;
