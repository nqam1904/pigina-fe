"use client";
import { getProductBySlug } from "@/actions/productApi";
import Gallery from "@/components/store/product/gallery";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

function ProductView() {
  const { slug } = useParams<any>();
  const [product, setProduct] = useState<any>(null);
  console.log(product);

  const fetchApi = async () => {
    try {
      const { payload } = await getProductBySlug(slug);
      if (payload.data.length > 0) {
        setProduct(payload.data[0]);
      }
    } catch (error) {
      console.log(error);
      setProduct(null);
    } finally {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  useEffect(() => {
    fetchApi();
  }, [slug]);
  console.log(product, "product");
  return (
    <div className="storeContainer">
      <div className={styles.productPage}>
        <div className={styles.upperSection}>
          <div className={styles.leftSection}>
            <Gallery images={product?.image} />
          </div>
          <div className={styles.rightSection}></div>
        </div>
      </div>
    </div>
  );
}
export default ProductView;
