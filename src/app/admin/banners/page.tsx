"use client";

import {
  addSlidesAction,
  deleteSlidesAction,
  editSlidesAction,
  getAllSildesAction,
  getOneSlidesAction,
  TAddBanner,
} from "@/actions/slides/slide";
import { columns } from "@/components/admin/banner/colums";
import HeaderPageAdmin from "@/components/admin/header-page";
import { messageResponse } from "@/constants/constants";
import { TSlide } from "@/types/common";
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
import React, { useEffect, useState } from "react";
import styles from "./banners.module.scss";

const BannersPage = () => {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [slideList, setSlideList] = useState<TSlide[]>([]);
  const [isModalSlide, setIsModalSlide] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [imageChange, setImageChange] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const idSlideRef = React.useRef<string | null>(null);

  const tableProps: TableProps<TSlide> = {
    bordered: true,
    size: "large",
    showHeader: true,
  };

  const columsAction: TableColumnsType<TSlide> = [
    {
      key: "action",
      title: "Chức năng",
      align: "center",
      width: 40,
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Chỉnh sửa nhanh">
              <Button
                type="default"
                shape="circle"
                icon={<EditOutlined />}
                onClick={() => {
                  setIsModalSlide(true);
                  handleEdit(record);
                  setIsEdit(true);
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

  //  ---------------------- GET DATA ----------------------
  const getSlideList = async () => {
    try {
      const response = await getAllSildesAction();
      if (response.res) {
        const sort = response.res.sort(
          (a: TSlide, b: TSlide) => a.order - b.order,
        );
        setSlideList(sort);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSlideList();
  }, []);

  const handleEdit = async (data: TSlide) => {
    try {
      setIsModalSlide(true);
      const response = await getOneSlidesAction(data.id);
      if (response.res) {
        form.setFieldsValue(response.res);
        setImageChange(response.res.url || "");
        idSlideRef.current = response.res.id;
      }
    } catch (error) {
      messageApi.error(`${error}`);
      setIsEdit(false);
    }
  };

  // ---------------------- HANDLE SLIDE ----------------------
  const onFinish = async (data: any) => {
    try {
      const params: TAddBanner = {
        ...data,
        alt: data.title ? data.title.toLowerCase().trim() : "banner",
        id: idSlideRef.current,
        desc: "",
        title: "",
        buttonText: "",
      };
      const response = isEdit
        ? await editSlidesAction(params, "")
        : await addSlidesAction(params, "");
      if (response.res) {
        setIsModalSlide(false);
        setLoadingAdd(false);
        messageApi.success(`${messageResponse.successMsg}`);
      }
    } catch (error) {
      messageApi.error(`${error}`);
      setLoadingAdd(false);
    }
  };

  const handleDelete = async (slideID: string) => {
    try {
      setLoading(true);
      const response = await deleteSlidesAction(slideID, "");
      if (response.res) {
        setLoading(false);
        getSlideList();
        messageApi.success(`${messageResponse.successMsg}`);
      } else {
        messageApi.error(`${response.error}`);
      }
    } catch (error) {
      setLoading(false);
      messageApi.error(`${error}`);
    }
  };
  return (
    <div className={styles.container}>
      {contextHolder}
      <HeaderPageAdmin />
      <Flex
        justify="flex-end"
        align="center"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      >
        <Button
          type="primary"
          loading={loadingAdd}
          onClick={() => {
            setIsModalSlide(true);
            setLoadingAdd(true);
          }}
        >
          Thêm
        </Button>
      </Flex>

      <Table
        {...tableProps}
        size="middle"
        rowKey={(record) => record?.id}
        loading={loading}
        columns={[...columns, ...columsAction]}
        dataSource={slideList}
      />

      {/* Modal  */}

      <Modal
        title="Slide"
        open={isModalSlide}
        centered
        width={1000}
        footer={false}
        onCancel={() => setIsModalSlide(false)}
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
          {/* <Form.Item name="title" label="Tiêu đề banner">
            <Input placeholder="Nhập tên tiêu đề..." allowClear />
          </Form.Item> */}
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
            {imageChange && <Image src={imageChange} alt="" preview={false} />}
          </Flex>
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
              max={4}
              placeholder="Ví dụ vị trí thứ đầu tiên nhập số 1"
            />
          </Form.Item>
          {/* <Form.Item name="desc" label="Mô tả">
            <Input placeholder="Nhập mô tả" allowClear />
          </Form.Item>

          <Form.Item name="buttonText" label="Text button">
            <Input placeholder="Nhập text button" allowClear />
          </Form.Item> */}

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
export default BannersPage;
