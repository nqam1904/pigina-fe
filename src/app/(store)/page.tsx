import Banner from "@/components/store/home/banner";
import SliderReview from "@/components/store/home/slider-review";
import Slider from "@/components/UI/slider";
import { dataSlider } from "@/mocks";
import { Metadata } from "next";
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
      <section className={styles.thumbnailContainer}>
        <Banner />
      </section>
      <section className={styles.reviewContainer}>
        <h2>Cảm nhận khách hàng</h2>
        <SliderReview />
      </section>
    </div>
  );
};
export default Home;
