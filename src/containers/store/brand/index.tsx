"use client";

import { getAllBrandsAction } from "@/actions/brands/brands";
import HCompanyLogo from "@/components/store/home/companyLogo";
import { SK_Box } from "@/components/UI/skeleton";
import { TBrand } from "@/types/product";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

const BrandStore = () => {
  const [data, setData] = useState<TBrand[] | undefined>([]);

  const getData = async () => {
    try {
      const response = await getAllBrandsAction();
      if (!response.error) {
        const listBrand = response.res
          .sort((a: TBrand, b: TBrand) => a.order - b.order)
          .slice(0, 6);

        setData(listBrand);
      } else {
        setData([]);
      }
    } catch (error) {
      console.log(error);
      setData([]);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = () => {
    return (
      !!data?.length &&
      data.map((item, index) => {
        return (
          <HCompanyLogo
            key={index}
            image={item.image || ""}
            name={item.name}
            url={item.url}
          />
        );
      })
    );
  };

  const showLoading = () => {
    return (
      <div className={styles.loading}>
        <SK_Box width="100%" height="16px" />
        <SK_Box width="100%" height="16px" />
        <SK_Box width="100%" height="16px" />
        <SK_Box width="100%" height="16px" />
      </div>
    );
  };

  return <>{data?.length ? renderItem() : showLoading()}</>;
};
export default BrandStore;
