"use client";
import Accordion from "@/components/UI/accordion";
import Breadcrumb from "@/components/UI/breadcrumb";
import Slider from "@/components/UI/slider";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

type FaqViewProps = {
  data: any[];
  banner: any[];
};

function FaqView(props: FaqViewProps) {
  const { data, banner } = props || {};
  const [dataFaq, setDataFaq] = useState<any[]>([]);

  const getDataFAQ = () => {
    return dataFaq.map((item, index) => {
      return (
        <Accordion
          key={index}
          title={item?.question || ""}
          content={item?.answer || ""}
        />
      );
    });
  };

  useEffect(() => {
    setDataFaq(data);
  }, []);

  return (
    <div className={styles.container}>
      <Slider data={banner} type="api" />
      <Breadcrumb slug="Câu hỏi thường gặp" />
      <div className={`storeContainer`}>
        <div className={styles.faq}>{getDataFAQ()}</div>
      </div>
    </div>
  );
}
export default FaqView;
