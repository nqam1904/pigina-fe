import {
  changeUserPasswordAction,
  TChangePassword,
} from "@/actions/user/users";
import { LockOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Modal } from "antd";
import { useForm } from "antd/es/form/Form";
import { useSession } from "next-auth/react";

import { useState } from "react";
interface IChangePassword {
  showModal: boolean;
  onClose: () => void;
}

export default function ChangePassword({
  showModal,
  onClose,
}: IChangePassword) {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const onCloseModal = () => {
    form.resetFields();
    onClose();
  };

  const onFinish = async (values: TChangePassword) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        id: session?.user?.id,
      };
      const response = await changeUserPasswordAction(payload);
      if (!response.err) {
        message.success("Đổi mật khẩu thành công!");
        onCloseModal();
      } else {
        message.error(response.err);
      }
    } catch (e: any) {
      message.error(e);
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmPassword = ({
    getFieldValue,
  }: {
    getFieldValue: (name: string) => any;
  }) => ({
    validator(_: any, value: any) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Mật khẩu không trùng khớp!"));
    },
  });

  return (
    <Modal
      title="Đổi mật khẩu"
      open={showModal}
      centered
      width={1000}
      footer={false}
      onCancel={onCloseModal}
      afterClose={onCloseModal}
    >
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        colon={false}
        onFinish={onFinish}
      >
        <Form.Item
          name="oldPassword"
          label="Mật khẩu cũ"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập mật khẩu cũ",
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu cũ"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu mới"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập mật khẩu mới!",
            },
            {
              message: "Mật khẩu có ít nhất 4 kí tự!",
              min: 4,
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập mật khẩu"
            allowClear
          />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Nhập lại mật khẩu"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập mật khẩu xác nhận!",
            },
            validateConfirmPassword,
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Nhập link"
            allowClear
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
}
