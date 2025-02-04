"use client";

import HeaderPageAdmin from "@/components/admin/header-page";
import styles from "./slide.module.scss";

import {
  addSlidesSmallAction,
  deleteSlidesSmallAction,
  editSlidesSmallAction,
  getAllSildesSmallAction,
} from "@/actions/slides-small/SlidesSmall";
import { columns } from "@/components/admin/slide-small/columns";
import { messageResponse } from "@/constants/constants";
import { TSlideSmall } from "@/types/common";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";

const tableProps: TableProps<TSlideSmall> = {
  bordered: true,
  size: "large",
  showHeader: true,
};
const SlideSmallPage = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [data, setData] = useState<TSlideSmall[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [imageChange, setImageChange] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const idSlideRef = useRef<string | null>(null);

  //  ---------------------- COLUMNS ----------------------
  const columsAction: TableColumnsType<TSlideSmall> = [
    {
      key: "action",
      title: "Chức năng",
      align: "center",
      width: 60,
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Chỉnh sửa nhanh">
              <Button
                type="default"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsModal(true);
                  handleEdit(record);
                }}
              />
            </Tooltip>

            <Popconfirm
              title="Xóa slide này?"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => handleDelete(record.id)}
              okText="Đồng ý"
              cancelText="Hủy"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const handleEdit = (record: TSlideSmall) => {
    form.setFieldsValue({
      title: record.title,
      url: record.url,
      desc: record.desc,
      order: record.order,
      link: record.link,
    });
    idSlideRef.current = record.id;
    setImageChange(record.url);
    setIsEdit(true);
  };

  const handleDelete = async (slideID: string) => {
    try {
      setLoading(true);
      const response = await deleteSlidesSmallAction(slideID);
      if (response.res) {
        setLoading(false);
        getSlideList();
        messageApi.success(`${messageResponse.successMsg}`);
      } else {
        messageApi.error(`${response.error}`);
      }
    } catch (error) {
      messageApi.error(`${error}`);
    }
  };

  //  ---------------------- GET DATA ----------------------
  const getSlideList = async () => {
    try {
      const response = await getAllSildesSmallAction();
      if (response.res) {
        const sort = response.res.sort(
          (a: TSlideSmall, b: TSlideSmall) => a.order - b.order,
        );
        setData(sort);
      }
    } catch (error) {
      setLoading(false);
      messageApi.error(`${error}`);
    } finally {
      setLoading(false);
    }
  };

  const onFinish = async (data: any) => {
    try {
      const params = {
        ...data,
        alt: data.title ? data.title.toLowerCase().trim() : "",
        id: idSlideRef.current,
      };
      const response = isEdit
        ? await editSlidesSmallAction(params)
        : await addSlidesSmallAction(params);
      if (response.res) {
        setIsModal(false);
        setLoadingAdd(false);
        messageApi.success(`${messageResponse.successMsg}`);
      }
    } catch (error) {
      messageApi.error(`${error}`);
      setLoadingAdd(false);
    }
  };

  const mergerColumn = [...columns, ...columsAction];
  useEffect(() => {
    getSlideList();
  }, []);

  return (
    <div className={styles.container}>
      <HeaderPageAdmin />
      {contextHolder}
      {data.length < 3 ? (
        <Flex justify="flex-end" align="center" style={{ paddingBottom: 20 }}>
          <Button
            type="primary"
            loading={loadingAdd}
            onClick={() => {
              setIsModal(true);
              setLoadingAdd(true);
            }}
          >
            Thêm
          </Button>
        </Flex>
      ) : null}

      <Table
        {...tableProps}
        size="middle"
        rowKey={(record) => record?.id}
        loading={loading}
        columns={mergerColumn}
        dataSource={data}
      />

      {/* Modal  */}

      <Modal
        title="Banner khuyến mãi"
        open={isModal}
        centered
        width={1000}
        footer={false}
        onCancel={() => setIsModal(false)}
        afterClose={() => {
          form.resetFields();
          getSlideList();
          setLoadingAdd(false);
          setImageChange("");
          setIsEdit(false);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          colon={false}
          onFinish={onFinish}
        >
          <Form.Item name="title" label="Tiêu đề">
            <Input placeholder="Nhập tên tiêu đề..." allowClear />
          </Form.Item>

          <Form.Item name="desc" label="Mô tả">
            <Input placeholder="Nhập mô tả" allowClear />
          </Form.Item>

          <Form.Item
            name="link"
            label="Link"
            rules={[
              {
                required: true,
                type: "string",
                message: "Vui lòng nhập link!",
                min: 6,
              },
            ]}
          >
            <Input placeholder="Nhập link: https://..." allowClear />
          </Form.Item>

          <Form.Item
            name="url"
            label="Hình ảnh"
            rules={[
              {
                required: true,
                type: "string",
                message: "Vui lòng nhập link hình!",
                min: 6,
              },
            ]}
          >
            <Input
              placeholder="Nhập link hình: https://res.cloudinary.com/"
              allowClear
              onChange={(e) => setImageChange(e.target.value)}
            />
          </Form.Item>

          <Flex justify="center" align="center" style={{ marginBottom: 20 }}>
            {imageChange && (
              <Image src={imageChange} alt="" preview={false} width="50%" />
            )}
          </Flex>

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
              style={{ width: "100%" }}
              min={0}
              max={3}
              placeholder="Ví dụ vị trí thứ đầu tiên nhập số 1"
            />
          </Form.Item>

          <Flex justify="flex-end" align="center">
            <Form.Item>
              <Button type="primary" htmlType="submit">
                {isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </div>
  );
};
export default SlideSmallPage;
