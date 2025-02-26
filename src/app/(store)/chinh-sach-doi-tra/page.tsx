import { Metadata } from "next";
import styles from "./page.module.scss";
export const metadata: Metadata = {
  title: "Chính sách đổi/trả hàng và hoàn tiền",
};
const Page = () => {
  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>Chính sách đổi/trả hàng và hoàn tiền</h1>

      <h2>HỦY ĐƠN ĐẶT HÀNG</h2>

      <p>
        1. Khách Hàng hủy Đơn Đặt Hàng trước khi PIGINA xác nhận chấp thuận Đơn
        Đặt Hàng và Khách Hàng sẽ không phải chịu bất kỳ chi phí nào cho việc
        hủy bỏ này. Nếu Khách Hàng muốn thay đổi Đơn Đặt Hàng, trước khi PIGINA
        xác nhận, Khách Hàng sẽ phải hủy Đơn Đặt Hàng đã đặt và sau đó thay thế
        bằng Đơn Đặt Hàng mới.
      </p>

      <p>
        <b>Thời điểm có thể hủy:</b>
      </p>

      <ul>
        <li>
          Trong vòng <b>30 phút</b> kể từ thời điểm Đơn Đặt Hàng được đặt: áp
          dụng với các Đơn Đặt Hàng giao hỏa tốc.
        </li>
        <li>
          Trước <b>15:00</b> của ngày đặt hàng: áp dụng đối với tất cả các Đơn
          Đặt Hàng khác.
        </li>
      </ul>

      <h3>CHÍNH SÁCH ĐỔI TRẢ</h3>

      <p>
        <b>1. THỜI HẠN ĐỔI TRẢ:</b>
      </p>
      <p>
        Trong vòng <b>7 ngày</b> kể từ khi Khách Hàng nhận hàng (căn cứ trên dấu
        xác nhận của đơn vị vận chuyển).
      </p>

      <p>
        <b>2. CÁCH YÊU CẦU ĐỔI TRẢ:</b>
      </p>
      <p>
        Khách Hàng cần liên hệ PIGINA qua số điện thoại <b>0355.299.994</b>,
        hoặc gửi yêu cầu qua website, hoặc gửi email kèm ảnh sản phẩm để kiểm
        tra điều kiện đổi trả.
      </p>

      <p>
        <b>3. ĐIỀU KIỆN ĐỔI TRẢ:</b>
      </p>
      <ul>
        <li>
          Sản phẩm còn nguyên tem niêm phong của nhà sản xuất hoặc đơn vị vận
          chuyển.
        </li>
        <li>Sản phẩm chưa qua sử dụng.</li>
        <li>Đầy đủ số lượng, bao bì như khi nhận hàng.</li>
      </ul>

      <p className={styles.highlight}>
        Quý khách vui lòng quay lại video khi mở hàng để xác nhận tình trạng sản
        phẩm!
      </p>

      <h3>CHÍNH SÁCH HOÀN TIỀN</h3>

      <ul>
        <li>
          Nếu thanh toán thành công nhưng chưa nhận hàng, PIGINA sẽ hoàn tiền
          100%.
        </li>
        <li>
          Nếu hàng lỗi, hoàn tiền sẽ được xử lý ngay sau khi xác nhận lỗi.
        </li>
        <li>Thời gian nhận lại tiền phụ thuộc vào ngân hàng của quý khách.</li>
      </ul>

      <p className={styles.note}>
        <b>* Lưu ý:</b> Chính sách có thể thay đổi theo từng thời điểm.
      </p>
    </div>
  );
};

export default Page;
