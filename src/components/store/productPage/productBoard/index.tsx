/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import styles from "./productBoard.module.scss";

import Link from "next/link";
import { useState } from "react";

import { TProductBoard } from "@/types/product";

import { HeartIcon, StarIcon } from "@/components/icons/svgIcons";
import Popup from "@/components/UI/popup";
import { TCartItem } from "@/types/shoppingCart";
import { calculateDiscount } from "@/utils/utils";
import Image from "next/image";

const ic_chat =
  "https://res.cloudinary.com/dgmf2ezwo/image/upload/v1734093583/icon_chat-01_euxzcz.png";

const ProductBoard = ({ boardData }: { boardData: TProductBoard }) => {
  const {
    name,
    id,
    specialFeatures,
    price,
    salePrice,
    defaultQuantity,
    warrantyPeriod,
    path,
  } = boardData;

  let fullPath = "";
  const [quantity, setQuantity] = useState(
    defaultQuantity > 1 ? defaultQuantity : 1,
  );
  const [brand, setBrand] = useState("");
  const [isShowPoup, setIsShowPopup] = useState(false);

  const handleQuantityChange = (isReducing: boolean) => {
    isReducing
      ? quantity === 1
        ? quantity
        : setQuantity(quantity - 1)
      : setQuantity(quantity + 1);
  };

  const cartItemData: TCartItem = {
    productId: id,
    quantity: quantity,
  };

  const generatePath = (index: number) => {
    fullPath += "/" + path[index].url;
    if (index === path.length - 1) {
      return (
        <Link key={index} href={"/list" + fullPath}>
          {path[index].name}
        </Link>
      );
    }
    return <></>;
  };

  return (
    <div className={styles.productBoard}>
      <button className={styles.favorite}>
        <HeartIcon width={22} />
      </button>
      <section>
        <div className={styles.stars}>
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <StarIcon width={15} stroke="#856B0F" fill="#FFD643" />
          <Link href={"#"}>0 Đánh giá của người dùng</Link>
        </div>
      </section>
      <h1>{name}</h1>
      {/* <span className={styles.brandName}>
        {path ? (
          <React.Fragment>
            Danh mục: {path.map((_: any, index: number) => generatePath(index))}
          </React.Fragment>
        ) : (
          <SK_Box width="60%" height="15px" />
        )}
      </span> */}
      <h2 className={styles.price}>
        {(salePrice ? salePrice : price).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </h2>
      {salePrice && (
        <div className={styles.salePrice}>
          <span className={styles.dealAmount}>
            {`
            Tiết kiệm
            ${calculateDiscount(price, salePrice)}
            %`}
          </span>
          <span className={styles.oldPrice}>
            Giá gốc:{" "}
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </span>
        </div>
      )}
      {/* <p className={styles.brandName}>
        Thương hiệu: {brand ? <span>{brand}</span> : null}
      </p> */}

      <div className={styles.specialFeatures}>
        {specialFeatures &&
          specialFeatures?.map((feature, index) => (
            <span key={index}>{feature}</span>
          ))}
      </div>

      <span className={styles.warrantyPeriod}>{warrantyPeriod}</span>

      <hr />

      {/* ----------------- ADD TO CART SECTION ----------------- */}
      {/* <section className={styles.addToCartSection}>
        <Quantity onChange={handleQuantityChange} quantity={quantity} />
        <AddToCartButton cartItemData={cartItemData} disabled={!isAvailable} />
      </section> */}

      <section className={styles.optionsProductSection}>
        <ButtonBuyNow />
        <ButtonOldForNew />
        <ButtonFinance onClick={() => setIsShowPopup(true)} />
        <ButtonInstallmentCredit />
      </section>
      {isShowPoup && (
        <Popup
          isStore
          content={<ContentFinance />}
          onClose={() => setIsShowPopup(false)}
          title={"Trả góp qua công ty tài chính"}
          text="Xác nhận"
        />
      )}
    </div>
  );
};

export default ProductBoard;

function ButtonBuyNow() {
  const url = "tel:0364561756";
  const onPress = () => window.open(url);
  return (
    <div className={styles.buttonBuyNow} onClick={onPress}>
      <span className={styles.titleBuyNow}>Mua ngay</span>
      <span className={styles.descriptionBuyNow}>
        (Ship tận nơi / Nhận tại cửa hàng)
      </span>
      <span className={styles.showPhone}>Gọi 0364561756</span>
    </div>
  );
}

function ButtonOldForNew() {
  const url = "https://www.facebook.com/lap4allvn/";
  const onPress = () => window.open(url, "_blank");
  return (
    <div className={styles.buttonSecondary} onClick={onPress}>
      <div className={styles.flexRow}>
        <Image src={ic_chat} alt="ic_chat" priority width={24} height={24} />
        <span className={styles.titleButton}>Chat với chúng tôi</span>
      </div>
      <span className={styles.descriptionButton}>
        (Tư vấn, Hỗ trợ, Thu cũ đổi mới,...)
      </span>
    </div>
  );
}

function ButtonFinance({ onClick }: any) {
  return (
    <div className={styles.btnInstallment} onClick={onClick}>
      <span className={styles.titleInstallment}>
        Trả góp qua công ty tài chính
      </span>
      <span className={styles.descInstallment}>
        Trả trước chỉ từ 2.589.000đ
      </span>
    </div>
  );
}

function ButtonInstallmentCredit() {
  const url = "https://www.facebook.com/lap4allvn/";
  const onPress = () => window.open(url, "_blank");
  return (
    <div className={styles.btnInstallment} onClick={onPress}>
      <span className={`${styles.titleInstallment} ${styles.titleCreditCard}`}>
        Trả góp 0% qua thẻ
      </span>
    </div>
  );
}

function ContentFinance() {
  return (
    <div className={styles.popupFinance}>
      <h2>
        Vay công ty chính có các ưu điểm nổi bật như: <br />
        Hạn mức vay khá cao, từ vài triệu đến vài trăm triệu Cung cấp đa dạng
        hình thức vay <br />- Thủ tục đơn giản, nhanh chóng và chỉ cần các giấy
        tờ nhân thân như: Chứng minh nhân dân/căn cước công dân, sổ hộ khẩu,… là
        có thể vay được. <br />- Không cần tài sản thế chấp. Thời gian giải ngân
        nhanh chóng Thời gian vay linh hoạt Tuy nhiên, hình thức vay qua công ty
        tài chính cũng tồn tại một số nhược điểm như: Có thể phát sinh thêm các
        phí khác
      </h2>
      <h2>
        Ưu điểm:
        <br />- Thực hiện các giao dịch mua sắm một cách dễ dàng. Đồng thời, so
        với các loại thẻ khác, thẻ tín dụng thường có chương trình ưu đãi trả
        góp thẻ tín dụng, hoàn tiền. - Vay với lãi suất thấp hơn: Đối với thẻ
        tín dụng, khách hàng phải thỏa mãn các yêu cầu của ngân hàng mới được
        phép mở thẻ. Nhược điểm: - Phí thường niên của thẻ tín dụng khá cao -
        Khó kiểm soát chi tiêu: Chỉ cần quẹt thẻ là đã hoàn thành việc mua hàng.
        <br />- Phí rút tiền mặt cao.
      </h2>
    </div>
  );
}
