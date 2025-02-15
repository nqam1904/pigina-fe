import SliderReview from "@/components/store/home/slider-review";
import Button from "@/components/UI/button";
import Slider from "@/components/UI/slider";
import { dataSlider } from "@/mocks";
import { Metadata } from "next";
import Image from "next/image";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Pigina",
};

const Home = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.heroContainer}>
        <Slider data={dataSlider} />
      </div>
      <div className={styles.thumbnailContainer}>
        <div className={styles.wraperBanner}>
          <Image
            src={"/images/thumbnail_1.png"}
            alt="image"
            width={900}
            height={600}
            priority
          />
          <Button text="Sản phẩm dành cho nàng" />
        </div>
        <div className={styles.wraperBanner}>
          <Image
            src={"/images/thumbnail_2.png"}
            alt="image"
            width={900}
            height={600}
            priority
          />
          <Button
            text="Sản phẩm dành cho bé"
            backgroundColor="#ffe066"
            borderColor="#ffe066"
          />
        </div>
      </div>
      <SliderReview />
    </div>
  );
};
export default Home;
