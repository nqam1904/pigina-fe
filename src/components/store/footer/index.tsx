import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === "undefined" ? "" : navigator.userAgent;
    const mobile = /iPhone|iPad|iPod|Android/i.test(userAgent);
    setIsMobile(mobile);
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.headFooter}>
        <div className={styles.logo}>
          <Image src="/images/logo.png" alt="logo" width={276} height={86} />
          {/* Social Icons */}
          <div className={styles.socialIcons}>
            <Link href="https://facebook.com" target="_blank">
              <Image
                src="/images/icons/facebook-icon.png"
                alt="Facebook"
                width={30}
                height={30}
              />
            </Link>
            <Link href="https://youtube.com" target="_blank">
              <Image
                src="/images/icons/youtube-icon.png"
                alt="YouTube"
                width={30}
                height={30}
              />
            </Link>
            <Link href="https://instagram.com" target="_blank">
              <Image
                src="/images/icons/instagram-icon.png"
                alt="Instagram"
                width={30}
                height={30}
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Policies */}
      <div className={styles.policies}>
        <Link href="/cam-ket-ban-hang">Cam kết bán hàng</Link> |{" "}
        <Link href="/chinh-sach-bao-mat">Chính sách bảo mật</Link> |{" "}
        <Link href="/chinh-sach-van-chuyen">Chính sách vận chuyển</Link> |{" "}
        <Link href="/chinh-sach-doi-tra">Chính sách đổi trả và hoàn tiền</Link>
      </div>

      {/* Company Info */}
      <div className={styles.companyInfo}>
        <strong>CÔNG TY TNHH THƯƠNG MẠI QUỐC TẾ BẢO UYÊN LINH</strong>
        <p>
          Địa chỉ: Số I5-TT10, Khu đô thị sinh thái Xuân Phương, Phường Xuân
          Phương, Quận Nam Từ Liêm, Thành phố Hà Nội, Việt Nam.
        </p>
        <p>Số điện thoại: +84.969662280</p>
        <p>Giấy chứng nhận đăng ký doanh nghiệp số: 0109039277</p>
        <p>
          Do sở kế hoạch và đầu tư TP. Hà Nội cấp lần đầu ngày 03/01/2020, đăng
          ký thay đổi ngày 10/07/2020.
        </p>
      </div>

      {/* Certification */}
      <div className={styles.certification}>
        <Image
          src="/images/bo-cong-thuong.png"
          alt="Bộ Công Thương"
          width={150}
          height={57}
        />
      </div>
    </footer>
  );
};

export default Footer;
