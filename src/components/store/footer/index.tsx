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
        <div className={styles.footerSocial}>
          <div className={styles.wraperLogo}>
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={0}
              height={0}
              sizes="100vw"
              className={styles.logoFooter}
            />
            <div className={styles.listSocial}>
              <Image
                src="/images/icons/facebook-icon.png"
                alt="Logo"
                width={40}
                height={40}
                className={styles.icon}
              />
              <Image
                src="/images/icons/youtube-icon.png"
                alt="Logo"
                width={40}
                height={40}
                className={styles.icon}
              />
              <Image
                src="/images/icons/instagram-icon.png"
                alt="Logo"
                width={40}
                height={40}
                className={styles.icon}
              />
            </div>
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
