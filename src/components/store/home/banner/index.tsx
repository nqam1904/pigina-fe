import Button from "@/components/UI/button";
import { dataThumbnail } from "@/mocks";
import Image from "next/image";
import styles from "./styles.module.scss";

const Banner: React.FC = () => {
  const renderBanner = (item: any, index: number) => {
    return (
      <div className={styles.wraperBanner} key={index}>
        <div className={styles.textContent}>
          <h1>{item.title}</h1>
          <p className={styles.author}>— {item.author}</p>
          <p className={styles.description}>{item.description}</p>
          <Button text={item.button} />
        </div>
        <Image
          src={item.url}
          alt="image"
          width={0}
          height={0}
          sizes="100vw"
          priority
          className={styles.imageBanner}
        />
      </div>
    );
  };
  return <>{dataThumbnail.map((item, index) => renderBanner(item, index))}</>;
};
export default Banner;
