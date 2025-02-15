"use client";

import styles from "./page.module.scss";

const Page = () => {
  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>Chính sách bảo mật thông tin cá nhân</h1>
      <p>Chính Sách Bảo Mật Thông Tin Cá Nhân này bao gồm các nội dung:</p>
      <ul>
        <li>
          Đơn Hàng: để xử lý các vấn đề liên quan đến đơn đặt hàng của bạn.
        </li>
        <li>
          Duy Trì Tài Khoản: để tạo và duy trì tài khoản của bạn với chúng tôi,
          bao gồm cả các chương trình khách hàng thân thiết hoặc các chương
          trình thưởng đi kèm với tài khoản của bạn.
        </li>
        <li>
          Cá Nhân Hóa: Chúng tôi có thể tổ hợp dữ liệu được thu thập để có một
          cái nhìn hoàn chỉnh hơn về một người tiêu dùng và từ đó cho phép chúng
          tôi phục vụ tốt hơn với sự cá nhân hóa mạnh hơn ở các khía cạnh, bao
          gồm nhưng không giới hạn:
        </li>
      </ul>
      <p>
        – Để cải thiện và cá nhân hóa trải nghiệm của bạn trên website pigina.vn
      </p>
      <p>
        – Để cải thiện các tiện ích, dịch vụ, điều chỉnh chúng phù hợp với các
        nhu cầu được cá thể hóa.
      </p>
      <p>
        – Để phục vụ bạn với những giới thiệu, quảng cáo được điều chỉnh phù hợp
        với sự quan tâm của bạn.
      </p>
    </div>
  );
};

export default Page;
