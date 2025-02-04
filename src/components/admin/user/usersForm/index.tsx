import {
  createUserAction,
  getUserByIdAction,
  updateUserAction,
} from "@/actions/user/users";
import { OptionsRole } from "@/data/options";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useCallback, useEffect, useState } from "react";

type TUsersFormProps = {
  show: boolean;
  isEdit?: boolean;
  handleClose: () => void;
  id?: string;
};

function UsersForm(props: TUsersFormProps) {
  const { show, isEdit = false, handleClose, id = "" } = props;
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const payload = {
        ...values,
        id,
      };
      const response = isEdit
        ? await updateUserAction(payload)
        : await createUserAction(values);
      if (response.err) {
        messageApi.error(response.err);
      } else {
        messageApi.success("Thành công!");
        closeModal();
      }
    } catch (e) {
      messageApi.error("Lỗi hệ thống");
    } finally {
      setLoading(false);
    }
  };

  const fetchUserById = useCallback(async () => {
    {
      try {
        const response = await getUserByIdAction(id);
        if (response.res) {
          const { name, email, role } = response.res || {};
          form.setFieldsValue({ id, name, email, role });
        } else {
          messageApi.error(response.err);
        }
      } catch (error) {
        message.error(`${error}`);
      }
    }
  }, [id, isEdit]);

  useEffect(() => {
    if (id && isEdit) {
      fetchUserById();
    }
  }, [id, isEdit]);

  const closeModal = () => {
    form.resetFields();
    handleClose();
  };

  return (
    <Modal
      title={isEdit ? "Cập nhật" : "Tạo tài khoản"}
      open={show}
      centered
      width={1000}
      footer={false}
      onClose={closeModal}
      onCancel={closeModal}
    >
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        autoComplete="off"
        style={{ marginTop: 20 }}
        colon={false}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item
          label="Tên tài khoản"
          name="name"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input placeholder="Tên tài khoản" allowClear />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "string",
              message: "Email không được để trống!",
            },
            {
              pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input placeholder="Email" allowClear />
        </Form.Item>
        <Form.Item
          label="Vai trò"
          name="role"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng chọn vai trò",
            },
          ]}
        >
          <Select
            options={OptionsRole}
            allowClear
            showSearch
            autoClearSearchValue
            placeholder="Chọn vai trò"
            filterOption={(input, option: any) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
          />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            {
              required: isEdit ? false : true,
              type: "string",
              message: "Password không được để trống!",
            },
          ]}
        >
          <Input.Password
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Flex justify="flex-end">
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
export default UsersForm;
