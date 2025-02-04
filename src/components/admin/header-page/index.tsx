"use client";
import { listPath } from "@/routes/path";
import { Button } from "antd";
import { usePathname } from "next/navigation";
import React from "react";
import BreadCrumbAdmin from "../breadcrumb";
import styles from "./header-page.module.scss";
type THeaderPageAdmin = {
  textCta?: string;
  onClick?: () => void;
  isShowButton?: boolean;
};
const HeaderPageAdmin: React.FC<THeaderPageAdmin> = ({
  textCta,
  onClick,
  isShowButton = false,
}) => {
  const pathname = usePathname();
  const title = listPath.find((x) => x.link === pathname)?.title || "";
  return (
    <div className={styles.container}>
      <h4>{title}</h4>
      <BreadCrumbAdmin pathname={pathname} />
      {isShowButton ? (
        <div className={styles.wrapperButton}>
          <Button type="primary" onClick={onClick}>
            {textCta}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default HeaderPageAdmin;
