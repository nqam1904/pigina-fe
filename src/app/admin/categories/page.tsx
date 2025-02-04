"use client";

import {
  TGetAllCategories,
  getAllCategories,
} from "@/actions/category/category";
import AddCategoryGroup from "@/components/admin/category/addCategoryGroup";
import CatGroupRow from "@/components/admin/category/rowGroup";
import HeaderPage from "@/components/admin/header-page";
import { SK_Box } from "@/components/UI/skeleton";
import { Collapse } from "antd";
import { useEffect, useState } from "react";
import styles from "./adminCategories.module.scss";

type ExpandIconPosition = "start" | "end";

const AdminCategories = () => {
  const [allCategories, setAllCategories] = useState<TGetAllCategories[]>([]);
  const [expandIconPosition, setExpandIconPosition] =
    useState<ExpandIconPosition>("start");

  const [showWindow, setShowWindow] = useState<boolean>(false);

  const handleAddCategories = () => setShowWindow(true);

  const getData = async () => {
    const data = await getAllCategories();
    if (data.res) setAllCategories(data.res);
  };

  useEffect(() => {
    getData();
  }, []);

  const groups: TGetAllCategories[] = [];
  const categories: TGetAllCategories[] = [];

  if (allCategories.length > 0) {
    allCategories.forEach((cat) => {
      cat.parentID === null ? groups.push(cat) : categories.push(cat);
    });
  }

  // HANDLE COLLAPSE
  const items: any = groups.map((group) => ({
    key: group.id,
    label: group.name,
    children: (
      <CatGroupRow onReset={getData} data={group} categories={categories} />
    ),
  }));

  const onChange = () => {};

  return (
    <div className={styles.categoryList}>
      <HeaderPage
        textCta="Tạo nhóm danh mục"
        onClick={handleAddCategories}
        isShowButton
      />
      <div className={styles.head}>
        <AddCategoryGroup
          onReset={getData}
          showWindow={showWindow}
          onClose={setShowWindow}
        />
      </div>

      {groups.length ? (
        <Collapse
          className={styles.collapes_container}
          defaultActiveKey={["1"]}
          onChange={onChange}
          expandIconPosition={expandIconPosition}
          items={items}
          size="large"
        />
      ) : (
        <div className={styles.loading}>
          <SK_Box width="100%" height="30px" />
          <SK_Box width="100%" height="30px" />
          <SK_Box width="100%" height="30px" />
          <SK_Box width="100%" height="30px" />
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
