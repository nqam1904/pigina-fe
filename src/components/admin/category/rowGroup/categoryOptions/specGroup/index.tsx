"use client";
import styles from "./specGroup.module.scss";

import {
  addSingleSpec,
  deleteSingleSpec,
  deleteSpecGroup,
} from "@/actions/category/categoryOptions";
import { TSingleSpec, TSpecGroup } from "@/types/common";
import { DownOutlined, PlusOutlined, UpOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import { useState } from "react";

interface IProps {
  data: TSpecGroup;
  reloadRequest: () => void;
}

const SpecGroup = ({ data, reloadRequest }: IProps) => {
  const { id, title, specs } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [specToAdd, setSpecToAdd] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const [collapse, setCollapse] = useState(false);

  const toggleCollapse = () => setCollapse(!collapse);

  const handleDeleteSpecGroup = async () => {
    if (!id) return;
    setIsLoading(true);
    const response = await deleteSpecGroup(id);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      reloadRequest();
    }
  };

  const handleAddSingleSpec = async () => {
    if (!id || !specToAdd || specToAdd === "") {
      messageApi.open({
        type: "error",
        content: "Vui lòng nhập tên cấu hình!",
      });
      return;
    }

    setIsLoading(true);
    const data: TSingleSpec = {
      specGroupID: id,
      value: specToAdd,
    };

    const response = await addSingleSpec(data);
    if (response.error) {
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setIsLoading(false);
      setSpecToAdd("");
      reloadRequest();
    }
  };

  const handleDeleteSingleSpec = async (spec: string) => {
    if (!id || !spec || spec === "") return;

    setIsLoading(true);
    const data: TSingleSpec = {
      specGroupID: id,
      value: spec,
    };

    const response = await deleteSingleSpec(data);
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
    <div className={styles.specGroup}>
      {contextHolder}
      {/* header */}
      <div className={styles.header}>
        <div>
          <span>{title}</span>
          <Button
            disabled={isLoading}
            variant="outlined"
            color="danger"
            onClick={handleDeleteSpecGroup}
          >
            Xóa nhóm
          </Button>
        </div>
        <div className={styles.rightHeader}>
          <Input
            disabled={isLoading}
            type="text"
            allowClear
            value={specToAdd}
            style={{ width: "50%" }}
            onChange={(e) => setSpecToAdd(e.currentTarget.value)}
          />
          <Button
            variant="solid"
            color="primary"
            disabled={isLoading}
            onClick={handleAddSingleSpec}
          >
            <PlusOutlined />
          </Button>
        </div>
        <div className={styles.iconContainer}>
          {collapse ? (
            <DownOutlined onClick={toggleCollapse} />
          ) : (
            <UpOutlined onClick={toggleCollapse} />
          )}
        </div>
      </div>
      {/* body */}
      {collapse && specs.length > 0 ? (
        <>
          {specs.map((spec, index) => (
            <div className={styles.specRow} key={index}>
              <span>{spec}</span>
              <Button
                variant="solid"
                color="danger"
                disabled={isLoading}
                onClick={() => handleDeleteSingleSpec(spec)}
              >
                Xóa
              </Button>
            </div>
          ))}
        </>
      ) : collapse ? (
        <div className={styles.specRow}>
          <span>Hiện tại không có cấu hình</span>
        </div>
      ) : (
        <div
          className={styles.specRow}
          style={{ justifyContent: collapse ? "space-between" : "center" }}
        >
          <span onClick={toggleCollapse}>Xem chi tiết</span>
        </div>
      )}
    </div>
  );
};

export default SpecGroup;
