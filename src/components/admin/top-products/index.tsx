import { getAllProductsAction } from "@/actions/product/product";
import {
  createTopProductsAction,
  getDataByIdAction,
  updateTopProductsAction,
} from "@/actions/top-products/topProducts";
import { TProductBoard } from "@/types/product";
import { TDropDown } from "@/types/uiElements";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Flex, Form, Input, message, Modal, Select } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";

type TAddModalProps = {
  show: boolean;
  isEdit?: boolean;
  handleClose: () => void;
  id?: string;
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};

const ModalAddTopProducts = (props: TAddModalProps) => {
  const { show, isEdit = false, handleClose, id = "" } = props;
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(false);
  const [listProducts, setListProducts] = useState<TDropDown[]>([]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      const { productID = [] } = values || {};
      if (productID.length < 1) {
        messageApi.error("Vui lòng chọn 1 sản phẩm!");
        return;
      }
      const response = isEdit
        ? await updateTopProductsAction(id, values)
        : await createTopProductsAction(values);
      if (response.err) {
        messageApi.error(response.err);
      } else {
        messageApi.success("Thành công!");
        handleClose();
      }
    } catch (e) {
      messageApi.error("Lỗi hệ thống");
    } finally {
      setLoading(false);
    }
  };

  const convertProductToDropdownList = (products: TProductBoard[]): any[] => {
    const dropDownData: any[] = [];
    products.forEach((item) => {
      dropDownData.push({
        label: item.name,
        value: item.id,
      });
    });

    return dropDownData;
  };

  const fetchProduct = async () => {
    const response = await getAllProductsAction();
    if (response.res) {
      setListProducts(convertProductToDropdownList(response.res) || []);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const getData = async () => {
    if (isEdit && id) {
      const response = await getDataByIdAction(id);
      if (response.res)
        form.setFieldsValue({
          title: response.res.title,
          productID: response.res.productID,
          linkAll: response.res.linkAll,
        });
    } else {
      handleClose();
    }
  };

  useEffect(() => {
    if (isEdit && id) {
      getData();
    } else {
      form.resetFields();
    }
  }, [isEdit, id]);

  return (
    <Modal
      title={isEdit ? "Cập nhật" : "Top sản phẩm"}
      open={show}
      centered
      width={1000}
      footer={false}
      onCancel={() => handleClose()}
    >
      {contextHolder}
      <Form
        form={form}
        layout="horizontal"
        autoComplete="off"
        style={{ marginTop: 20 }}
        colon={false}
        onFinish={onFinish}
        disabled={loading}
      >
        <Form.Item
          label="Tiêu đề"
          name="title"
          rules={[
            {
              required: true,
              type: "string",
              message: "Vui lòng nhập tiêu đề!",
            },
          ]}
        >
          <Input placeholder="Tiêu đề" allowClear />
        </Form.Item>
        <Form.Item
          label="Xem tất cả"
          name="linkAll"
          rules={[
            {
              required: true,
              type: "string",
              message: "Không được để trống!",
            },
          ]}
        >
          <Input placeholder="/list/laptop/..." allowClear />
        </Form.Item>

        <Form.Item label="Sản phẩm">
          <Form.List name="productID">
            {(fields, { add, remove }, { errors }) => (
              <>
                {fields.map((field, index) => (
                  <Form.Item
                    key={field.key}
                    {...formItemLayout}
                    required={false}
                  >
                    <Form.Item
                      {...field}
                      validateTrigger={["onChange", "onBlur"]}
                      rules={[
                        {
                          required: true,
                          whitespace: true,
                          message: "Vui lòng chọn sản phẩm",
                        },
                      ]}
                      noStyle
                    >
                      <Select
                        options={listProducts}
                        allowClear
                        showSearch
                        autoClearSearchValue
                        placeholder="Chọn sản phẩm"
                        style={{ marginRight: 18, width: "80%" }}
                        filterOption={(input, option: any) =>
                          (option?.label ?? "")
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                      />
                    </Form.Item>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Form.Item>
                ))}

                <Form.Item>
                  {fields.length < 4 && (
                    <Button
                      type="dashed"
                      style={{
                        marginTop: fields.length > 0 ? "20px" : 0,
                      }}
                      onClick={() => {
                        add();
                      }}
                      icon={<PlusOutlined />}
                    >
                      Thêm
                    </Button>
                  )}

                  {errors && <Form.ErrorList errors={errors} />}
                </Form.Item>
              </>
            )}
          </Form.List>
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
};
export default ModalAddTopProducts;
