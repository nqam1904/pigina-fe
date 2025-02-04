"use client";
import { addCategory, TAddCategory } from "@/actions/category/category";
import { Button, Flex, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

interface IProps {
  data: TAddCategory;
  isShow: boolean;
  onCancel: () => void;
  groupId?: string;
  onReset?: () => void;
}

const ModalCategory = ({
  isShow,
  data,
  groupId = "",
  onCancel,
  onReset,
}: IProps) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  // STATE
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("Thêm danh mục");

  // title={`Cập nhật nhóm: ${data.name}`}

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const payload: TAddCategory = {
        parentID: groupId,
        iconUrl: null,
        name: data.name,
      };

      const result = await addCategory(payload);

      if (result.error) {
        messageApi.error(result.error);
      }
      if (result.res) {
        form.resetFields();
        onReset?.();
        onCancel?.();
      }
    } catch (error: any) {
      messageApi.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={title}
      open={isShow}
      centered
      footer={false}
      onCancel={onCancel}
    >
      {contextHolder}
      <Form
        form={form}
        layout="horizontal"
        autoComplete="off"
        colon={false}
        onFinish={onSubmit}
        style={{ marginTop: 20 }}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input
            allowClear
            name="name"
            value={data.name}
            type="text"
            placeholder="Nhập tên..."
          />
        </Form.Item>

        <Flex justify="flex-end" align="center">
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Xác nhận
            </Button>
          </Form.Item>
        </Flex>
      </Form>
    </Modal>
  );
};

export default ModalCategory;
