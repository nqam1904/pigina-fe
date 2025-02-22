import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

interface Props {
  slug: string;
}
const Breadcrumb: React.FC<Props> = ({ slug }) => {
  return (
    <div className={styles.breadcrumb}>
      <Link href={"/"}>Trang chủ</Link>
      <p className={styles.linkPost}>{slug}</p>
    </div>
  );
};

export default Breadcrumb;
