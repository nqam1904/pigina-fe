"use client";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>Chính sách vận chuyển</h1>

      <h2>GIAO HÀNG</h2>
      <p>
        1. Đơn Đặt Hàng trên PIGINA sẽ được giao trên phạm vi toàn quốc đến địa
        chỉ mà Khách Hàng chỉ định trong phạm vi lãnh thổ Việt Nam. PIGINA sẽ
        thông báo cho Khách Hàng trong trường hợp việc giao hàng không thể thực
        hiện vì bất kỳ lý do gì.
      </p>
      <p>
        2. <b>Dịch vụ giao hàng:</b>
      </p>

      <table>
        <thead>
          <tr>
            <th>Phương thức</th>
            <th>Chi tiết</th>
            <th>Phí giao hàng dự kiến</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <b>Giao hàng hỏa tốc</b> <br /> (Áp dụng trong nội thành thành
              phố)
            </td>
            <td>
              Đơn Đặt Hàng sẽ được giao trong vòng hai (2) giờ kể từ khi chúng
              tôi xác nhận Đơn Đặt Hàng.
            </td>
            <td>
              <b>20.000đ – 50.000đ/đơn hàng</b> <br /> (Tùy thuộc vào khoảng
              cách của khách hàng)
            </td>
          </tr>
          <tr>
            <td>
              <b>Giao hàng tiêu chuẩn</b>
            </td>
            <td>
              Sau khi chúng tôi xác nhận Đơn Đặt Hàng, Đơn Đặt Hàng sẽ được giao
              trong vòng: <br />• Hai (2) ngày đối với địa chỉ giao hàng trong
              phạm vi TP. Hà Nội. <br />• Ba (3) đến năm (5) ngày đối với địa
              chỉ giao hàng ngoài phạm vi TP. Hà Nội.
            </td>
            <td>
              PIGINA hỗ trợ phí giao hàng toàn quốc chỉ còn{" "}
              <b>20.000đ/đơn hàng</b>
            </td>
          </tr>
        </tbody>
      </table>

      <p className={styles.note}>
        <b>* Lưu ý:</b> Phí giao hàng dự kiến nói trên có thể được cập nhật tại
        từng thời điểm.
      </p>
    </div>
  );
};

export default Page;
