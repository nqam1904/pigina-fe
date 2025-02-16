import Image from "next/image";
import Link from "next/link";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerInfo}>
          <h3 className={styles.footerTitle}>
            CÔNG TY TNHH THƯƠNG MẠI QUỐC TẾ BẢO UYÊN LINH
          </h3>
          <div className={styles.footerLine} />
          <p>Hotline: +84.969662280</p>
          {/* <p>
            Email:{" "}
            <a href="mailto:cndginseng@gmail.com">cndginseng@gmail.com</a>
          </p> */}
          <p>
            Website:{" "}
            <a href="https://pigina.com.vn" target="_blank">
              https://pigina.com.vn
            </a>
          </p>
          <p>
            Địa chỉ: Số I5-TT10, Khu đô thị sinh thái Xuân Phương, Phường Xuân
            Phương, Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam.
          </p>
          <p>Giấy chứng nhận đăng ký doanh nghiệp số: 0109039277</p>
          <p>
            Do sở kế hoạch và đầu tư TP. Hà Nội cấp lần đầu ngày 03/01/2020,
            đăng ký thay đổi ngày 10/07/2020.
          </p>
          <Image
            src="/images/bo-cong-thuong.png"
            alt="Bộ Công Thương"
            width={150}
            height={60}
            style={{ marginLeft: "-12px" }}
          />
        </div>
        <div className={styles.footerMap}>
          <h3 className={styles.footerTitle}>Địa chỉ</h3>
          <div className={styles.footerLine} />
          <div className={styles.mapResponsive}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29793.265423749035!2d105.744049!3d21.026356!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134548454d7698b%3A0x5109177b4ad9d65f!2zS2h1IMSRw7QgdGjhu4sgU2luaCBUaMOhaSBYdcOibiBQaMawxqFuZw!5e0!3m2!1sen!2sus!4v1739635649822!5m2!1sen!2sus"
              allowFullScreen={true}
              width="500"
              height="200"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
      <div className={styles.bottomFooter}>
        <div className={styles.policies}>
          <Link href="/cam-ket-ban-hang">Cam kết bán hàng</Link> |{" "}
          <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link> |{" "}
          <Link href="/chinh-sach-van-chuyen">Chính sách vận chuyển</Link> |{" "}
          <Link href="/chinh-sach-doi-tra">
            Chính sách đổi trả và hoàn tiền
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
