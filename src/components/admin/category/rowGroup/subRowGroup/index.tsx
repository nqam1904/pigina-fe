import {
  deleteCategory,
  TGetAllCategories,
  TUpdateCategory,
  updateCategoryAction,
} from "@/actions/category/category";
import Popup from "@/components/UI/popup";
import { Button, Flex, Form, Input, InputRef, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import styles from "./subRowGroup.module.scss";

interface IProps {
  // data: TGetAllCategories;
  subCategories: TGetAllCategories[];
  onReset: () => void;
  categoryName: string;
  categoryID: string;
}

type TEditSubCat = {
  id: string;
  name: string;
  url: string;
};

let selectedSubCategory: TEditSubCat = {
  id: "",
  name: "",
  url: "",
};
export const SubRowGroup = ({
  onReset,
  // data,
  subCategories,
  categoryName = "",
  categoryID = "",
}: IProps) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const inputRef = useRef<InputRef>(null);

  // --------------- SUB CATEGORY ---------------
  const [showSubEdit, setShowSubEdit] = useState(false);
  const [showSubDelete, setShowSubDelete] = useState(false);

  const [editSubCatData, setEditSubCatData] = useState<TEditSubCat>({
    id: "",
    name: "",
    url: "",
  });

  const handleShowEditSub = (data: TEditSubCat) => {
    const { name } = data;
    selectedSubCategory = { ...data };
    setEditSubCatData({ ...editSubCatData, name });
    setShowSubEdit(true);
  };

  const handleEditSub = async (value: { name: string }) => {
    let updatedData: TUpdateCategory = {
      id: selectedSubCategory.id,
      name: value.name,
    };

    setIsLoading(true);
    const response = await updateCategoryAction(updatedData);
    if (!response.error) {
      setIsLoading(false);
      setShowSubEdit(false);
      messageApi.success("Thành công!");
      onReset();
    } else {
      messageApi.error(response.error);
      setIsLoading(false);
    }
  };

  const handleShowDeleteSub = (id: string) => {
    selectedSubCategory = { id, name: "", url: "" };
    setErrorMsg("");
    setShowSubDelete(true);
  };

  const handleDeleteSubCat = async () => {
    setIsLoading(true);
    const response = await deleteCategory(selectedSubCategory.id);
    if (response.error) {
      setErrorMsg(response.error);
      setIsLoading(false);
      return;
    }
    if (response.res) {
      setErrorMsg("");
      setIsLoading(false);
      setShowSubDelete(false);
      onReset();
    }
  };

  useEffect(() => {
    if (showSubEdit) {
      form.setFieldValue("name", editSubCatData.name);
    } else {
      form.setFieldValue("name", "");
    }
  }, [showSubEdit, editSubCatData]);

  return (
    <>
      <div className={styles.childRows}>
        {contextHolder}
        {subCategories?.map((subCat) => (
          <div className={styles.row} key={subCat.id}>
            <span>{`${subCat.name}`}</span>
            <div>
              <Button
                color="gold"
                variant="solid"
                onClick={() =>
                  handleShowEditSub({
                    id: subCat.id,
                    name: subCat.name,
                    url: subCat.url,
                  })
                }
              >
                Sửa
              </Button>
              <Button
                color="danger"
                variant="solid"
                onClick={() => handleShowDeleteSub(subCat.id)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={`Cập nhập ${categoryName}`}
        open={showSubEdit}
        footer={null}
        onCancel={() => setShowSubEdit(false)}
      >
        <Form
          form={form}
          layout="horizontal"
          autoComplete="off"
          style={{ marginTop: 20 }}
          onFinish={handleEditSub}
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
      {showSubDelete && (
        <Popup
          width="300px"
          isDelete
          content={
            <div className={styles.deleteText}>
              <span>Bạn có muốn xóa model này?</span>
              {errorMsg ? <span>{errorMsg}</span> : null}
            </div>
          }
          isLoading={isLoading}
          onCancel={() => setShowSubDelete(false)}
          onClose={() => setShowSubDelete(false)}
          onSubmit={() => handleDeleteSubCat()}
        />
      )}
    </>
  );
};

export default SubRowGroup;
