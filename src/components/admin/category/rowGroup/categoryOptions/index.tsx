"use client";
import styles from "./categoryOptions.module.scss";

import { useEffect, useState } from "react";

// -------- ACTIONS --------
import {
  getOptionSetByCatID,
  getSpecGroupByCatID,
} from "@/actions/category/categoryOptions";
import { TOptionSet, TSpecGroup } from "@/types/common";
import AddSpecGroup from "./addSpecGroup";
import SpecGroup from "./specGroup";

interface IProps {
  categoryName: string;
  categoryID: string;
}

const CategoryOptions = ({ categoryName, categoryID }: IProps) => {
  const [isOption, setIsOption] = useState(true);
  const [optionSetList, setOptionSetList] = useState<TOptionSet[]>([]);
  const [specGroupList, setSpecGroupList] = useState<TSpecGroup[]>([]);

  const getCategoryOptionSet = async () => {
    if (categoryID) {
      const response = await getOptionSetByCatID(categoryID);
      if (response.res) {
        setOptionSetList(response.res);
      }
    }
  };

  const getCategorySpecGroup = async () => {
    if (categoryID) {
      const response = await getSpecGroupByCatID(categoryID);
      if (response.res) {
        setSpecGroupList(response.res);
      }
    }
  };

  useEffect(() => {
    const getOptionAndSpecs = async () => {
      if (categoryID) {
        const optionsResponse = await getOptionSetByCatID(categoryID);
        const specResponse = await getSpecGroupByCatID(categoryID);
        if (optionsResponse.res) {
          setOptionSetList(optionsResponse.res);
        }
        if (specResponse.res) {
          setSpecGroupList(specResponse.res);
        }
      }
    };
    getOptionAndSpecs();
  }, [categoryID]);

  const handleReloadOptions = async () => {
    getCategoryOptionSet();
  };
  const handleReloadSpecs = async () => {
    getCategorySpecGroup();
  };

  return (
    <div className={styles.optionsWindow}>
      <div className={styles.header}>
        <h2>{categoryName}</h2>
        <div>
          {/* Specifications */}
          <h3 className={styles.active}>Cấu hình</h3>
        </div>
      </div>

      {/*  ------------------ SPECIFICATION SECTION ------------------  */}
      <div className={styles.tabContainer}>
        <AddSpecGroup
          categorySpecGroupID={categoryID}
          reloadRequest={handleReloadSpecs}
        />
        <div className={styles.specGroupList}>
          {specGroupList.length > 0 ? (
            <>
              {specGroupList.map((specGroup) => (
                <SpecGroup
                  key={specGroup.id}
                  data={specGroup}
                  reloadRequest={handleReloadSpecs}
                />
              ))}
            </>
          ) : (
            <div className={styles.addCategoryOption}>
              <span>Hiện tại không có cấu hình nào!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryOptions;
