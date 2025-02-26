import { getBanner } from "@/actions/bannerApi";
import { getListCategory } from "@/actions/categoriesApi";
import Banner from "@/components/store/home/banner";
import SliderReview from "@/components/store/home/slider-review";
import Slider from "@/components/UI/slider";
import { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Pigina",
};

async function Home() {
  const { payload } = await getBanner();
  const listCate = await getListCategory();
  const dataSlider = payload?.data || [];
  return (
    <div className={styles.homePage}>
      <div className={styles.heroContainer}>
        <Slider data={dataSlider} type="api" />
      </div>
      <section className={styles.thumbnailContainer}>
        <Banner data={listCate.payload?.data || []} />
      </section>
      <section className={styles.reviewContainer}>
        <h2>Cảm nhận khách hàng</h2>
        <SliderReview />
      </section>
    </div>
  );
}
export default Home;
