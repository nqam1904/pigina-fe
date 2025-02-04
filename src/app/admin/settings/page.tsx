"use client";

import { message } from "antd";
import { useRouter } from "next/navigation";
import styles from "./settings.module.scss";

const SettingsPage = () => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  return <div className={styles.container}></div>;
};
export default SettingsPage;
