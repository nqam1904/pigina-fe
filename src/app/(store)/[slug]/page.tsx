"use client";

import { dataPolicy } from "@/mocks/footer";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

const Page = () => {
  const { slug } = useParams<any>();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const response = dataPolicy.find((item) => item.slug === slug)?.description;
    setData(response || null);
  }, [slug]);

  return (
    <div className={`${styles.container} storeContainer`}>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default Page;
