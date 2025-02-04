import SnowTheme from "@/components/store/common/snowTheme";
import HomeCategoryList from "@/components/store/home/categories";
import HomeSlider from "@/components/store/home/slider";
import BrandStore from "@/containers/store/brand";
import PostContainer from "@/containers/store/post";
import SlideSmallContainer from "@/containers/store/slide-small";
import TopProducts from "@/containers/store/top-products";
import styles from "./page.module.scss";

const Home = () => {
  return (
    <>
      {/* <SnowTheme /> */}
      <div className={styles.homePage}>
        <div className="storeContainer flexCol">
          {/* HERO SECTION */}
          <div className={styles.heroContainer}>
            <HomeCategoryList />
            <HomeSlider />
          </div>
          <div className={styles.wideAdContainer}>
            <SlideSmallContainer />
          </div>
          {/* BANNER PRODUCT */}
          <TopProducts />
          {/* POST SECTION */}
          <div className={styles.homeSection}>
            <div className={styles.sectionHeader}>
              <h2>Bài viết</h2>
            </div>
            <PostContainer />
          </div>
          {/* BRAND SECTION */}
          <div className={styles.companiesSection}>
            <h2>Thương hiệu</h2>
            <div>
              <BrandStore />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
