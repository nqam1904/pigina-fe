import SlideSmallContainer from "@/components/store/home/slide-small";
import SliderReview from "@/components/store/home/slider-review";
import Slider from "@/components/UI/slider";
import { dataSlider } from "@/mocks";
import { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Pigina - Trang chủ",
};

const Home = () => {
  return (
    <div className={styles.homePage}>
      <div className={styles.heroContainer}>
        <Slider data={dataSlider} />
      </div>
      <div className="storeContainer flexCol">
        <div className={styles.thumbnailContainer}>
          <SlideSmallContainer />
        </div>
        <div>
          <SliderReview />
        </div>
      </div>
    </div>
  );
};
export default Home;
