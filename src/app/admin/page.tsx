"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.scss";
const AdminHome = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/admin/products");
  }, [router]);

  return <div className={styles.container}></div>;
};

export default AdminHome;
