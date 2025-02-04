"use client";
import styles from "./addSpecGroup.module.scss";

import { useState } from "react";

import { addSpecGroup } from "@/actions/category/categoryOptions";
import { TSpecGroup } from "@/types/common";
import { Button, Input, message } from "antd";

interface IProps {
  categorySpecGroupID: string;
  reloadRequest: () => void;
}

const AddSpecGroup = ({ categorySpecGroupID, reloadRequest }: IProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleAddOption = async () => {
    try {
      setIsLoading(true);
      if (!title || title === "") {
        messageApi.open({
          type: "error",
          content: "Vui lòng nhập tên nhóm cấu hình",
        });
        return;
      }

      const data: TSpecGroup = {
        id: categorySpecGroupID,
        specs: [],
        title,
      };

      const result = await addSpecGroup(data);
      if (result.error) {
        setIsLoading(false);
        return;
      }
      if (result.res) {
        setTitle("");
        reloadRequest();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.addSpecGroup}>
      {contextHolder}
      <div>
        <span>Nhóm:</span>
        <Input
          type="text"
          onChange={(e) => setTitle(e.currentTarget.value)}
          value={title}
          disabled={isLoading}
        />
      </div>
      <Button disabled={isLoading} onClick={() => handleAddOption()}>
        Thêm nhóm cấu hình
      </Button>
    </div>
  );
};

export default AddSpecGroup;
