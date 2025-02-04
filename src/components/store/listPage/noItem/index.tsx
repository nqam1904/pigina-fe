"use client";

import { getAllCategoriesJSON } from "@/actions/category/category";
import { TGroupJSON } from "@/types/categories";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./noItem.module.scss";

interface IProps {
  pageHeader: string;
  isSearchPage?: boolean;
}

const NoItem = ({ pageHeader, isSearchPage }: IProps) => {
  const [categories, setCategories] = useState<TGroupJSON[]>([]);

  useEffect(() => {
    const getCategoriesDB = async () => {
      const result = await getAllCategoriesJSON();
      if (result.res) {
        setCategories(result.res);
      }
    };
    getCategoriesDB();
  }, []);

  return (
    <div
      className={styles.noItemContainer}
      style={isSearchPage ? { marginTop: "20px", gap: "30px" } : {}}
    >
      {isSearchPage ? (
        <span> Không có sản phẩm trong từ khóa {pageHeader}!</span>
      ) : (
        <span> Không có sản phẩm trong mục {pageHeader}!</span>
      )}
      {isSearchPage ? (
        <div>
          <span> Bạn có thể tìm kiếm theo danh mục:</span>
          <div>
            {categories.map((item, index) => (
              <Link href={`/list/${item.group.url}`} key={index}>
                {item.group.name}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NoItem;
