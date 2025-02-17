import styles from "./styles.module.scss";

const BlogsPage = () => {
    
  return (
    <section className={`${styles.container} storeContainer`}>
      <div className={styles.news}>
        <h1 className={styles.titleNews}>Tin tức sự kiện</h1>
      </div>
    </section>
  );
};

export default BlogsPage;
