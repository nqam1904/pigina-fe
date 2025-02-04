import { addBrandAction } from "@/actions/brands/brands";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";

interface IBrandModalProps {
  showModal: boolean;
  title: string;
  onFinished: () => void;
  onCancel: () => void;
}

const BrandModal: React.FC<IBrandModalProps> = ({
  showModal,
  title,
  onFinished,
  onCancel,
}) => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [addLogo, setAddLogo] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAdd = async (data: {
    name: string;
    image: string;
    order: number;
    url: string;
  }) => {
    try {
      setIsLoading(true);
      const response = await addBrandAction(data.name, data.image, data.order);
      if (response.res) {
        form.resetFields();
        setAddLogo("");
        onFinished?.();
      } else {
        messageApi.open({
          type: "error",
          content: `${response.res}`,
        });
      }
    } catch (e) {
      messageApi.open({
        type: "error",
        content: `${e}`,
      });
    } finally {
      setIsLoading(false);
      onCancel();
    }
  };
  return (
    <Modal
      width={1000}
      title={title}
      open={showModal}
      footer={false}
      onCancel={onCancel}
    >
      <Form
        form={form}
        autoComplete="off"
        style={{ marginTop: 20 }}
        colon={false}
        onFinish={handleAdd}
      >
        {contextHolder}
        <Form.Item
          name="name"
          label="Tên"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập tên!",
            },
          ]}
        >
          <Input placeholder="Nhập tên nhãn hiệu" allowClear />
        </Form.Item>
        <Form.Item
          name="url"
          label="Link"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập link điều hướng!",
            },
          ]}
        >
          <Input
            placeholder="Nhập link: https://lap4all.vn/list/...."
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="image"
          label="Logo"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập link logo!",
            },
          ]}
        >
          <Input
            value={addLogo}
            placeholder="Nhập link logo"
            onChange={(e) => setAddLogo(e.currentTarget.value)}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name="order"
          label="Vị trí"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập ví trị!",
              type: "number",
            },
          ]}
        >
          <InputNumber
            defaultValue={0}
            controls={false}
            style={{ width: "50%" }}
            min={0}
            placeholder="Ví dụ vị trí thứ đầu tiên nhập số 1"
          />
        </Form.Item>
        {addLogo && (
          <Image
            width={190}
            alt="logo"
            src={addLogo}
            height={160}
            style={{ objectFit: "contain" }}
          />
        )}
        <Flex justify="flex-end">
          <Button
            htmlType="submit"
            disabled={isLoading}
            loading={isLoading}
            type="primary"
          >
            Thêm nhãn hiệu
          </Button>
        </Flex>
      </Form>
    </Modal>
  );
};
export default BrandModal;
