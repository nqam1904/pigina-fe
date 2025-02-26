import styles from "./page.module.scss";

const Page = () => {
  return (
    <div className={`${styles.container} storeContainer`}>
      <h1>Cam kết bán hàng</h1>
      <p>
        Cam kết bán hàng tại <strong>PIGINA</strong>
      </p>
      <ul>
        <li>
          Luôn cung cấp sản phẩm đúng chất lượng công bố đúng như hình ảnh và
          thông tin đăng tải theo đúng mức giá được niêm yết.
        </li>
        <li>Cam kết tư vấn tận tình chu đáo.</li>
        <li>
          Xử lý các vấn đề phát sinh trên cơ sở đảm bảo quyền lợi tối đa cho
          khách hàng.
        </li>
      </ul>
    </div>
  );
};

export default Page;
