"use client";

import {
  addCategory,
  TGetAllCategories,
  TUpdateCategory,
  updateCategoryAction,
} from "@/actions/category/category";
import { Button, Flex, Form, Image, Input, message } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
interface IProps {
  data: TGetAllCategories;
  onSuccess: () => void;
  isEdit?: boolean;
}
const defaultGroupData: TGetAllCategories = {
  id: "",
  parentID: null,
  name: "",
  url: "",
  iconUrl: "",
};
const GroupCategory = ({ data, isEdit = false, onSuccess }: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id: groupId } = data;
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");
  const [groupCategoryData, setGroupCategoryData] =
    useState<TGetAllCategories>(data);

  const setFieldData = () => {
    form.setFieldValue("name", data.name);
    form.setFieldValue("url", data.url);
    form.setFieldValue("iconUrl", data.iconUrl);
    setIcon(data?.iconUrl || '');
  };

  useEffect(() => {
    setFieldData();
  }, [data]);

  const [form] = useForm();

  const handleUpdateGroup = async (value: any) => {
    let updatedData: TUpdateCategory = { id: groupId };

    groupCategoryData.name !== value?.name
      ? (updatedData.name = value?.name)
      : "";

    if (
      groupCategoryData.iconUrl &&
      groupCategoryData.iconUrl !== value?.iconUrl
    ) {
      updatedData.iconUrl = value.iconUrl;
    }
    const response = await updateCategoryAction(updatedData);
    if (!response.error) {
      setLoading(false);
      onSuccess?.();
      messageApi.success("Cập nhật thành công!");
    } else {
      setLoading(false);
      messageApi.error(JSON.stringify(response.error));
    }
  };
  const onSubmit = async (value: any) => {
    if (isEdit) {
      handleUpdateGroup(value);
    } else {
      try {
        setLoading(true);
        const payload = {
          ...defaultGroupData,
          name: value.name,
          iconUrl: value.iconUrl,
        };
        const result = await addCategory(payload);
        if (result.error) {
          messageApi.open({
            type: "error",
            content: result.error,
          });
        } else {
          messageApi.success("Thành Công!");
          onSuccess();
        }
      } catch (error) {
        messageApi.open({
          type: "error",
          content: `${error}`,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleIconChange = (e: any) => {
    const newIconUrl = e.target.value;
    form
      .validateFields(["iconUrl"])
      .then(() => setIcon(newIconUrl))
      .catch(() => console.error("Icon validation failed"));
  };

  return (
    <Form
      form={form}
      onFinish={onSubmit}
      layout="vertical"
      autoComplete="off"
      style={{ marginTop: 20 }}
    >
      {contextHolder}
      <Form.Item
        name="name"
        label="Nhóm danh mục"
        rules={[
          {
            required: true,
            type: "string",
            message: "Vui lòng nhập tên sản phẩm!",
          },
        ]}
      >
        <Input allowClear placeholder="Nhập tên danh mục..." />
      </Form.Item>
      <Form.Item
        name="iconUrl"
        label="IconUrl"
        rules={[
          {
            required: true,
            type: "string",
            message: "Vui lòng nhập link icon!",
          },
          {
            type: "string",
            pattern: /^https:\/\//,
            message: 'Link icon phải bắt đầu bằng "https://"',
          },
        ]}
      >
        <Input
          allowClear
          placeholder="Nhập link icon danh mục..."
          onChange={handleIconChange}
        />
      </Form.Item>
      {icon && (
        <Image src={icon} width={120} height={120} alt="icon" preview={false} />
      )}
      <Form.Item>
        <Flex justify="flex-end" align="center">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>
          </Form.Item>
        </Flex>
      </Form.Item>
    </Form>
  );
};

export default GroupCategory;
