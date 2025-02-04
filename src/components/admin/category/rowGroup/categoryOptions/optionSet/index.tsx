"use client";
import styles from "./optionSet.module.scss";

import { TOptionSet, TSingleOption } from "@/types/common";
import { useState } from "react";

// -------------- ACTIONS --------------
import {
  addSingleOption,
  deleteOptionSet,
  deleteSingleOption,
} from "@/actions/category/categoryOptions";
import { Button } from "antd";

interface IProps {
  data: TOptionSet;
  reloadRequest: () => void;
}

const OptionSet = ({ data, reloadRequest }: IProps) => {
  const { id, name, options, type } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [nameValuePair, setNameValuePair] = useState<[string, string]>([
    "",
    "",
  ]);

  const handleDeleteOptionSet = async () => {
    if (!id) return;
    setIsLoading(true);
    const response = await deleteOptionSet(id);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      reloadRequest();
    }
  };

  const handleAddSingleOption = async () => {
    if (nameValuePair[0] === "" || nameValuePair[1] === "") return;

    const data: TSingleOption = {
      optionSetID: id,
      name: nameValuePair[0],
      value: nameValuePair[1],
    };

    setIsLoading(true);
    const response = await addSingleOption(data);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      setNameValuePair(["", ""]);
      reloadRequest();
    }
  };

  const handleDeleteSingleOption = async (data: TSingleOption) => {
    const { name, value, optionSetID } = data;
    if (
      !name ||
      name === "" ||
      !value ||
      value === "" ||
      !optionSetID ||
      optionSetID === ""
    )
      return;

    setIsLoading(true);
    const response = await deleteSingleOption(data);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      reloadRequest();
    }
  };

  return (
    <div className={styles.optionSet} key={id}>
      <div className={styles.col1}>
        <span>{name}</span>
        <Button disabled={isLoading} onClick={() => handleDeleteOptionSet()}>
          Xóa
        </Button>
      </div>
      <div className={styles.col2}>
        {options.map((singleOption, index) => (
          <div className={styles.singleOption} key={index}>
            <div>
              <span>{singleOption.name}</span>
              <span> -- </span>
              <span>{singleOption.value}</span>
            </div>
            <div>
              <Button
                onClick={() =>
                  handleDeleteSingleOption({
                    name: singleOption.name,
                    value: singleOption.value,
                    optionSetID: id,
                  })
                }
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
        <div className={styles.addSingleOption}>
          <div>
            <input
              type="text"
              value={nameValuePair[0]}
              onChange={(e) =>
                setNameValuePair([e.currentTarget.value, nameValuePair[1]])
              }
            />
            <input
              type="text"
              value={nameValuePair[1]}
              onChange={(e) =>
                setNameValuePair([nameValuePair[0], e.currentTarget.value])
              }
            />
          </div>
          <Button disabled={isLoading} onClick={() => handleAddSingleOption()}>
            Thêm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OptionSet;
