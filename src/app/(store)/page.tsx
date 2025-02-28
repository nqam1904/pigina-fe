import { getBanner } from "@/actions/bannerApi";
import { getListCategory } from "@/actions/categoriesApi";
import Banner from "@/components/store/home/banner";
import SliderReview from "@/components/store/home/slider-review";
import { SK_Box } from "@/components/UI/skeleton";
import Slider from "@/components/UI/slider";
import { Metadata } from "next";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Pigina",
};

async function Home() {
  const { payload } = await getBanner();
  const listCate = await getListCategory();
  const dataSlider: any[] = payload?.data || [];
  return (
    <div className={styles.homePage}>
      <div className={styles.heroContainer}>
        {dataSlider.length > 0 ? (
          <Slider data={dataSlider} type="api" />
        ) : (
          <div className={styles.loadingBanner}>
            <SK_Box width="100%" height="500px" />
          </div>
        )}
      </div>
      <section className={styles.thumbnailContainer}>
        {listCate.payload && listCate.payload?.data.length > 0 ? (
          <Banner data={listCate.payload?.data || []} />
        ) : (
          <div className={styles.loaddingSection}>
            <SK_Box width="100%" height="20px" />
          </div>
        )}
      </section>
      <section className={styles.reviewContainer}>
        <h2>Cảm nhận khách hàng</h2>
        <SliderReview />
      </section>
    </div>
  );
}
export default Home;
