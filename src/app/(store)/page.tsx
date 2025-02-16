import SliderReview from "@/components/store/home/slider-review";
import Button from "@/components/UI/button";
import Slider from "@/components/UI/slider";
import { dataSlider, dataThumbnail } from "@/mocks";
import { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Pigina",
};

const Home = () => {
  const renderBanner = (item: any, index: number) => {
    return (
      <div className={styles.wraperBanner} key={index}>
        <div className={styles.textContent}>
          <h4>{item.title}</h4>
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
  return (
    <div className={styles.homePage}>
      <div className={styles.heroContainer}>
        <Slider data={dataSlider} />
      </div>
      <div className={styles.thumbnailContainer}>
        {dataThumbnail.map((item, index) => renderBanner(item, index))}
      </div>
      <div className={styles.reviewContainer}>
        <h2>Cảm nhận khách hàng</h2>
        <SliderReview />
      </div>
    </div>
  );
};
export default Home;
