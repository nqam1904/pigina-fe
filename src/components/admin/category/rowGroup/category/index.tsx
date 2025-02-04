"use client";
import styles from "./categoryRow.module.scss";

import { useEffect, useRef, useState } from "react";

import {
  addCategory,
  deleteCategoryAction,
  TGetAllCategories,
  TUpdateCategory,
  updateCategoryAction,
} from "@/actions/category/category";
import Popup from "@/components/UI/popup";
import { Button, Flex, Form, Input, InputRef, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import SubRowGroup from "../subRowGroup";

interface IProps {
  data: TGetAllCategories;
  subCategories: TGetAllCategories[];
  onReset: () => void;
}

const Category = ({ onReset, data, subCategories = [] }: IProps) => {
  const { id: categoryID, name: categoryName } = data;

  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  // STATE MODAL
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  // STATE COMMON
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // REF
  const inputRef = useRef<InputRef>(null);

  // HANDLE ACTION CATEGORY
  const handleCreateModel = async (value: { name: string }) => {
    try {
      setIsLoading(true);
      const params = {
        parentID: categoryID,
        name: value.name,
        iconUrl: null,
      };

      const response = await addCategory(params);
      if (response.error) {
        messageApi.error(response.error);
      } else {
        messageApi.success("Thêm Model thành công!");
        form.resetFields();
        setShowAdd(false);
        onReset();
      }
    } catch (error) {
      messageApi.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (value: { name: string }) => {
    try {
      setIsLoading(true);
      let updatedData: TUpdateCategory = { id: categoryID };
      if (value.name !== categoryName) updatedData.name = value.name;
      const response = await updateCategoryAction(updatedData);
      if (!response.error) {
        setShowEdit(false);
        onReset();
      } else {
        messageApi.error(response.error);
      }
    } catch (error) {
      messageApi.error(`${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteCat = async () => {
    setIsLoading(true);
    const response = await deleteCategoryAction(categoryID);
    if (response.error) {
      setErrorMsg(response.error);
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setErrorMsg("");
      setShowDelete(false);
      setIsLoading(false);
      onReset();
    }
  };

  // --------------- SUB CATEGORY MANAGING SECTION ---------------
  const onSubmit = async (data: { name: string }) => {
    if (showEdit) {
      handleUpdate(data);
    } else {
      handleCreateModel(data);
    }
  };

  // --------------- END SUB CATEGORY ---------------

  const onHandleClose = () => {
    if (showEdit) setShowEdit(false);
    else setShowAdd(false);
  };

  // _________________LIFECYCLE_________________

  useEffect(() => {
    if (showEdit || showAdd) {
      inputRef.current?.focus();
      if (showEdit) {
        form.setFieldsValue({ name: categoryName });
      }
    } else {
      form.resetFields();
    }
  }, [showEdit, showAdd]);

  return (
    <div className={styles.categoryRow}>
      {contextHolder}
      <div className={styles.parentRow}>
        <span>{categoryName}</span>
        <div>
          <Button
            color="geekblue"
            variant="solid"
            onClick={() => setShowAdd(true)}
          >
            Thêm Model
          </Button>
          <Button
            onClick={() => setShowEdit(true)}
            color="gold"
            variant="solid"
          >
            Sửa
          </Button>
          <Button
            color="danger"
            variant="solid"
            onClick={() => setShowDelete(true)}
          >
            Xóa
          </Button>
        </div>
      </div>

      {subCategories !== undefined && subCategories?.length > 0 ? (
        <SubRowGroup
          categoryName={categoryName}
          categoryID={categoryID}
          onReset={onReset}
          subCategories={subCategories}
        />
      ) : null}

      <Modal
        title={
          showEdit
            ? `Cập nhập ${categoryName}`
            : `Thêm Model cho: ${categoryName}`
        }
        open={showEdit || showAdd}
        footer={null}
        onCancel={onHandleClose}
      >
        <Form
          form={form}
          layout="horizontal"
          autoComplete="off"
          style={{ marginTop: 20 }}
          onFinish={onSubmit}
        >
          <Form.Item
            name="name"
            label="Tên Model"
            rules={[
              {
                required: true,
                type: "string",
                message: "Vui lòng nhập tên Model!",
              },
            ]}
          >
            <Input ref={inputRef} allowClear placeholder="Nhập tên Model..." />
          </Form.Item>
          <Form.Item>
            <Flex justify="flex-end">
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>

      {showDelete && (
        <Popup
          width="300px"
          content={
            <div className={styles.deleteText}>
              <span>Bạn có muốn xóa {categoryName}?</span>
              <span style={{ color: "red" }}>{errorMsg}</span>
            </div>
          }
          isLoading={isLoading}
          isDelete
          onCancel={() => {
            setErrorMsg("");
            setShowDelete(false);
          }}
          onClose={() => {
            setErrorMsg("");
            setShowDelete(false);
          }}
          onSubmit={handleDeleteCat}
        />
      )}
    </div>
  );
};

export default Category;
