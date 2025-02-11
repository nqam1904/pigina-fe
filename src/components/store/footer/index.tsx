import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./footer.module.scss";

const imageMap =
  "https://res.cloudinary.com/dgmf2ezwo/image/upload/v1737862971/GGmaps_x2oojy.jpg";
const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  return (
    <footer className={styles.storeFooter}>
      <div className={`${styles.footerWrapper} storeContainer`}>
        <div className={styles.topSection}></div>
        <section className={styles.middle}>
          <div>
            <h3>Điện thoại hỗ trợ:</h3>
            <span>Đặt câu hỏi và tư vấn? Gọi chúng tôi</span>
            <span>
              Gọi mua:{" "}
              {isMobile ? (
                <Link style={{ color: "#007aff" }} href="tel:036 4561756">
                  036 4561756
                </Link>
              ) : (
                "036 4561756"
              )}{" "}
              (9:00 - 21:30)
            </span>
            <span>
              Khiếu nại:{" "}
              {isMobile ? (
                <Link style={{ color: "#007aff" }} href="tel:036 456175">
                  036 456175
                </Link>
              ) : (
                "036 456175"
              )}{" "}
              (10:00 - 21:30)
            </span>
            <span>
              Bảo hành:{" "}
              {isMobile ? (
                <Link style={{ color: "#007aff" }} href="tel:036 456175">
                  036 456175
                </Link>
              ) : (
                "036 456175"
              )}{" "}
              (10:00 - 21:00)
            </span>
          </div>

          <div>
            <h3>Thông tin khác:</h3>
            <ul>
              <li>
                <Link href={""}>Dịch Vụ vệ sinh laptop</Link>
              </li>
              <li>
                <Link href={""}>Tìm hiểu về mua trả góp</Link>
              </li>
              <li>
                <Link href={""}>Chính sách bảo hành</Link>
              </li>
            </ul>
          </div>
          <div className={styles.contact}>
            <h3>Địa chỉ</h3>
            <ul>
              <li>
                <Link
                  href={"https://maps.app.goo.gl/wfKmSRhyNEkwhfWPA"}
                  target="_blank"
                >
                  126E Đ. Phan Đăng Lưu, P3, Q.Phú Nhuận, TP.HCM
                </Link>
              </li>
            </ul>
            <div className={styles.responsiveIframe}>
              <Link
                href={"https://maps.app.goo.gl/wfKmSRhyNEkwhfWPA"}
                target="_blank"
              >
                <Image
                  alt="Laptop Logo"
                  src={imageMap}
                  fill
                  sizes="(max-width:240px)"
                  style={{ objectFit: "cover" }}
                />
              </Link>
            </div>
          </div>
        </section>
      </div>
      <section className={styles.bottom}>
        <div className={`${styles.footerWrapper} storeContainer`}>
          <span>© 2024 Laptop Lap4All Store.</span>

          <div className={styles.social}>
            <Link
              href={"https://www.facebook.com/profile.php?id=100085920692236"}
            ></Link>
            <Link href={"https://www.twitter.com"}></Link>
            <Link href={"https://www.instagram.com"}></Link>
          </div>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
