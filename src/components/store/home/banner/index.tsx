import { dataThumbnail } from "@/mocks";
import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.scss";

const Banner: React.FC = () => {
  const renderBanner = (item: any, index: number) => {
    return (
      <Link href={`/${item.slug}`} className={styles.wraperBanner} key={index}>
        <Image
          src={item.url}
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={styles.imageBanner}
        />
        <p className={styles.bannerText}>{item.button}</p>
      </Link>
    );
  };
  return <>{dataThumbnail.map((item, index) => renderBanner(item, index))}</>;
};
export default Banner;
