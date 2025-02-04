"use client";
import {
  addPostAction,
  deletePostAction,
  getAllPostAction,
  updatePostAction,
} from "@/actions/post/post";
import HeaderPage from "@/components/admin/header-page";
import { columns } from "@/components/admin/post/colums";
import { useDebouncedState } from "@/hooks/useDebouncedState";
import { TListPost } from "@/types/post";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Flex,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Space,
  Table,
  TableColumnsType,
  TableProps,
  Tooltip,
} from "antd";
import { FormProps, useForm } from "antd/es/form/Form";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import styles from "./adminPost.module.scss";

const AdminPost = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = useForm();
  const [loading, setLoading] = useState(true);
  const [listPost, setListPost] = useState<TListPost[]>([]);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [imageChange, setImageChange] = useDebouncedState("", 300);
  const [isEdit, setIsEdit] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const idPostRef = useRef<string>("");

  const tableProps: TableProps<TListPost> = {
    bordered: true,
    size: "large",
    showHeader: true,
  };

  const columsAction: TableColumnsType<TListPost> = [
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
              title="Xóa bài viêt này?"
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

  const handleDelete = async (id: string) => {
    try {
      const response = await deletePostAction(id);
      if (!response.err) {
        messageApi.success("Xóa thành công");
        getData();
      }
    } catch (error) {
      message.error("Error");
    }
  };

  const handleEdit = (record: TListPost) => {
    form.setFieldsValue({
      title: record.title,
      image: record.image,
      shortDesc: record.shortDesc,
      link: record.link,
    });
    idPostRef.current = record.id;
    setImageChange(record.image);
    setIsEdit(true);
  };

  const getData = async () => {
    try {
      const response = await getAllPostAction();
      if (response) {
        setLoading(false);
        setListPost(response.res as TListPost[]);
      }
    } catch (error) {
      message.error("Error");
      setListPost([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onFinish: FormProps<any>["onFinish"] = async (values) => {
    try {
      setLoadingSubmit(true);
      const payload = {
        ...values,
        desc: "",
        author: "admin",
      };
      const response = isEdit
        ? await updatePostAction(idPostRef.current, payload)
        : await addPostAction(payload);
      if (!response.err) {
        messageApi.success("Thêm thành công");
        setIsModal(false);
      } else {
        message.error(response.err);
      }
    } catch (error: any) {
      message.error(error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className={styles.container}>
      {contextHolder}
      <HeaderPage />
      <Flex
        justify="flex-end"
        align="center"
        style={{ paddingTop: 20, paddingBottom: 20 }}
      >
        {listPost.length < 4 ? (
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
        ) : null}
      </Flex>

      <Table
        {...tableProps}
        size="middle"
        rowKey={(record) => record?.id}
        loading={loading}
        columns={[...columns, ...columsAction]}
        dataSource={listPost}
      />
      <Modal
        title={isEdit ? "Chỉnh sửa" : "Thêm bài viết"}
        open={isModal}
        centered
        width={1000}
        footer={false}
        onCancel={() => setIsModal(false)}
        afterClose={() => {
          form.resetFields();
          getData();
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
          <Form.Item
            name="title"
            label="Tiêu đề"
            rules={[
              {
                required: true,
                type: "string",
                message: "Vui lòng tiêu đề!",
                min: 3,
              },
            ]}
          >
            <Input placeholder="Nhập tên tiêu đề..." allowClear />
          </Form.Item>

          <Form.Item
            name="image"
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
              <Image
                src={imageChange}
                alt="image"
                preview={false}
                width={"50%"}
                height={250}
                onError={() => setImageChange("")}
              />
            )}
          </Flex>

          <Form.Item
            name="shortDesc"
            label="Mô tả ngắn"
            rules={[
              {
                required: true,
                type: "string",
                message: "Vui lòng mô tả!",
                min: 3,
              },
            ]}
          >
            <TextArea
              placeholder="Nhập mô tả"
              allowClear
              autoSize={{ minRows: 2, maxRows: 6 }}
            />
          </Form.Item>

          <Form.Item name="link" label="Liên kết bài viết">
            <Input placeholder="Nhập link" allowClear />
          </Form.Item>

          <Flex justify="flex-end" align="center">
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loadingSubmit}>
                {isEdit ? "Cập nhật" : "Thêm"}
              </Button>
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminPost;
