"use client";
import { TGetAllCategories } from "@/actions/category/category";
import Popup from "@/components/UI/popup";
import { useState } from "react";
import GroupCategory from "../../forms/groupCategory";
import styles from "./addCategory.module.scss";

interface IProps {
  onReset: () => void;
  showWindow: boolean;
  onClose: (value: boolean) => void;
}

const AddCategoryGroup = ({ onReset, showWindow, onClose }: IProps) => {
  const defaultGroupData: TGetAllCategories = {
    id: "",
    parentID: null,
    name: "",
    url: "",
    iconUrl: "",
  };
  const [groupCategoryData, setGroupCategory] =
    useState<TGetAllCategories>(defaultGroupData);

  const resetForm = () => {
    setGroupCategory(defaultGroupData);
    onClose?.(false);
    onReset?.();
  };

  return (
    <div className={styles.addCategoryGroup}>
      {showWindow && (
        <Popup
          title="Tạo nhóm danh mục"
          onCancel={resetForm}
          onClose={resetForm}
          hideCta
          content={
            <GroupCategory data={groupCategoryData} onSuccess={resetForm} />
          }
        />
      )}
    </div>
  );
};

export default AddCategoryGroup;
