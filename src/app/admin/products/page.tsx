"use client";
import {
  deleteProductAction,
  findProductByNameAction,
  getAllProductsAction,
} from "@/actions/product/product";
import HeaderPageAdmin from "@/components/admin/header-page";
import {
  tableColumns,
  tableProps,
} from "@/components/admin/product/columns/columns";
import { useStyle } from "@/hooks/useStyles";
import { TProductListItem } from "@/types/product";
import { handleError } from "@/utils/logUtils";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Flex, message, Popconfirm, Space, Table, Tooltip } from "antd";
import Search from "antd/es/input/Search";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./adminProducts.module.scss";

const AdminProducts = () => {
  // HOOKS
  const { styles: styleTable } = useStyle();
  const [messageApi, contextHolder] = message.useMessage();
  // STATE
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState<TProductListItem[]>([]);

  const columnsAction: ColumnsType<TProductListItem> = [
    {
      key: "preview",
      title: "Preivew",
      align: "center",
      width: 80,
      render: (_, record) => {
        return (
          <Space size="middle">
            <Tooltip title="Xem nhanh">
              <Link href={`/product/${record.id}`} target="_blank">
                <EyeOutlined />
              </Link>
            </Tooltip>
          </Space>
        );
      },
    },
    {
      key: "action",
      title: "Chức năng",
      align: "center",
      width: 250,
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              color="primary"
              variant="outlined"
              onClick={() =>
                window.open(`/admin/products/${record?.id}`, "_blank")
              }
            >
              Cập nhật
            </Button>

            <Popconfirm
              title="Xóa sản phẩm?"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => handleDelete(record)}
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

  // ---------------------- HANDLE LOGIC ----------------------
  const getProductsList = async () => {
    try {
      const response = await getAllProductsAction();
      if (response.res) setProductsList(response.res?.reverse());
    } catch (error) {
      console.log(error);
      handleError(onSearchProduct, "onSearchProduct", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (data: TProductListItem) => {
    try {
      const response = await deleteProductAction(data.id);
      if (response.error) {
        messageApi.open({
          type: "error",
          content: `Đã có lỗi xảy ra!`,
        });
        setIsLoading(false);
      }
      if (response.res) {
        messageApi.open({
          type: "success",
          content: `Xóa thành công!`,
        });
        setIsLoading(false);
        getProductsList();
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `Đã có lỗi xảy ra!`,
      });
    }
  };

  const addProduct = () => window.open(`/admin/products/addProduct`, "_blank");

  const onSearchProduct = async (value: string) => {
    try {
      setIsLoading(true);
      if (value) {
        const params = {
          specs: true,
          specialFeatures: true,
          desc: true,
          price: true,
          salePrice: true,
          isAvailable: true,
          category: {
            select: {
              id: true,
              parentID: true,
            },
          },
        };
        const response = await findProductByNameAction(value, value, params);
        if (response.res) {
          setProductsList(response.res);
          setIsLoading(false);
        } else {
          setProductsList([]);
        }
      } else {
        getProductsList();
      }
    } catch (error) {
      handleError(onSearchProduct, "onSearchProduct", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------- GET DATA ----------------------
  useEffect(() => {
    getProductsList();
  }, []);

  const mergeColumns = [...tableColumns, ...columnsAction];

  return (
    <div className={styles.adminProducts}>
      {contextHolder}
      <HeaderPageAdmin
        textCta="Thêm sản phẩm"
        onClick={addProduct}
        isShowButton={false}
      />
      <Flex align="center" justify="flex-end" style={{ margin: 10 }}>
        <Button
          onClick={addProduct}
          size="large"
          color="default"
          variant="outlined"
        >
          Thêm sản phẩm
        </Button>
      </Flex>
      <Search
        onClear={getProductsList}
        placeholder="Tìm sản phẩm"
        allowClear
        enterButton="Tìm kiếm"
        size="large"
        onSearch={onSearchProduct}
        style={{ marginBottom: 20 }}
      />
      <Table
        {...tableProps}
        loading={isLoading}
        rowKey={(record) => record?.id}
        sticky={{ offsetHeader: 64 }}
        columns={mergeColumns}
        className={styleTable.customTable}
        dataSource={productsList}
        pagination={{ pageSize: 10 }}
        scroll={{ y: 100 * 5 }}
      />
    </div>
  );
};

export default AdminProducts;
