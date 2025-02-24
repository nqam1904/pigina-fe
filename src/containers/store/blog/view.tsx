"use client";

import ItemSlideBlog from "@/components/store/blogs/item-slide-blog";
import Button from "@/components/UI/button";
import SlickSlider from "@/components/UI/slick-slide";
import { dataSection } from "@/mocks/blogs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import styles from "./styles.module.scss";
interface Props {
  dataNews: any[];
}
function BlogsView(props: Props) {
  const { dataNews } = props || {};
  const router = useRouter();

  const renderItem = useCallback(() => {
    return dataSection.map((item, index) => {
      return (
        <div className={styles.leftItem} key={index}>
          <Image
            alt="image"
            width={156}
            height={100}
            priority
            src={item.image}
            className={styles.imgBlog}
          />
          <span className={styles.text}>{item.content}</span>
        </div>
      );
    });
  }, []);

  return (
    <section className={`${styles.container}`}>
      <div className={styles.news}>
        <h1 className={styles.titleNews}>Tin tức sự kiện</h1>
        <SlickSlider>
          {dataNews.map((item, index) => (
            <ItemSlideBlog {...item} key={index} />
          ))}
        </SlickSlider>
        <br />
        {/* <h1 className={styles.titleNews}>KIẾN THỨC SẢN PHẨM</h1>
        <SlickSlider>
          {dataBlogs.map((item, index) => (
            <ItemSlideBlog {...item} key={index} />
          ))}
        </SlickSlider> */}
      </div>
      <div className={styles.section2}>
        <div className={styles.containerSection}>
          <h2 className={styles.titleSection2}>
            PIGINA KOREA <br /> CHẤP CÁNH THĂNG HOA
          </h2>
          <div className={styles.descSection2}>
            <div className={styles.desLeft}>
              {renderItem()}
              <div className={styles.wraperButton}>
                <Button
                  text="Xem thêm"
                  onClick={() => router.push("/danh-cho-nang")}
                />
              </div>
            </div>
            <div className={styles.desRight}>
              <Image
                alt="image"
                width={0}
                height={0}
                sizes="100vw"
                priority
                src={"/images/blog4.png"}
                className={styles.imageSection}
              />
              <span className={styles.content}>
                SỐ 1 HÀN QUỐC VỀ CHĂM SÓC SỨC KHỎE VÀ SẮC ĐẸP VÙNG KÍN
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.formContainer}>
        <h4>
          NHẬN THÊM TƯ VẤN <br />
          TỪ CHUYÊN GIA PIGINA
        </h4>
        <p className={styles.formDescription}>
          Hãy điền thông tin để nhận tư vấn riêng từ chuyên gia của Lactobact
          Intima nàng nhé. Nàng yên tâm mọi thông tin đều là riêng tư và bảo mật
          tuyệt đối.
        </p>

        <form action="#" method="POST">
          <div className={styles.inputGroup}>
            <input type="text" name="name" placeholder="Họ và tên" required />
            <input
              type="tel"
              name="phone"
              placeholder="Số điện thoại"
              required
            />
          </div>

          <textarea
            name="question"
            rows={4}
            placeholder="Câu hỏi"
            required
          ></textarea>
          <Button type="submit" text="Kết nối chuyên gia" />
        </form>
      </div>
    </section>
  );
}

export default BlogsView;
