"use client";
import { useEffect, useState } from "react";
import styles from "./brands.module.scss";

import {
  deleteBrandAction,
  getAllBrandsAction,
  updateBrandAction,
} from "@/actions/brands/brands";
import BrandModal from "@/components/admin/forms/brandModal";
import HeaderPage from "@/components/admin/header-page";
import Popup from "@/components/UI/popup";
import { TBrand } from "@/types/product";
import { EditOutlined } from "@ant-design/icons";
import {
  Button,
  Image,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Space,
  Table,
  TableProps,
  Tooltip,
} from "antd";
import { ColumnsType } from "antd/es/table";
let selectedBrandID = "";

const tableProps: TableProps<TBrand> = {
  bordered: true,
  size: "large",
  showHeader: true,
};
const Brand = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [isListLoading, setIsListLoading] = useState(true);
  const [brandList, setBrandList] = useState<TBrand[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [showEdit, setShowEdit] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const [editLogo, setEditLogo] = useState("");
  const [showDelete, setShowDelete] = useState(false);
  const [order, setOrder] = useState<any>(0);
  const [showModal, setShowModal] = useState(false);

  const columns: ColumnsType<TBrand> = [
    {
      title: "Vị trí",
      dataIndex: "order",
      width: 20,
      align: "center",
    },
    {
      title: "Tên brand",
      dataIndex: "name",
      width: 20,
      align: "center",
    },
    {
      title: "Hình ảnh",
      dataIndex: "imgUrl",
      width: 60,
      align: "center",
      render: (_, record) => {
        const { name, image } = record;
        return (
          <Image
            width={80}
            height={90}
            alt={name}
            style={{ objectFit: "contain" }}
            src={image}
            fallback="https://res.cloudinary.com/dixay3mvg/image/upload/v1729924050/no-image-icon-0_gy9jrn.jpg"
          />
        );
      },
    },

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
                  handleShowEdit(record);
                }}
              />
            </Tooltip>

            <Popconfirm
              title="Xóa brand này?"
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => handleShowDelete(record.id)}
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

  const fetchBrands = async () => {
    const response = await getAllBrandsAction();
    if (response.error) {
      setBrandList([]);
      setIsListLoading(false);
    }
    if (response.res) {
      setIsListLoading(false);
      const sort = response.res.sort(
        (a: TBrand, b: TBrand) => a.order - b.order,
      );
      setBrandList(sort);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const handleShowEdit = (data: TBrand) => {
    selectedBrandID = data.id;
    setEditValue(data.name);
    setEditLogo(data.image || "");
    setOrder(data.order);
    setEditUrl(data.url || "");
    setErrorMsg("");
    setShowEdit(true);
  };

  const handleUpdate = async () => {
    if (selectedBrandID !== "" && editValue !== "" && editLogo) {
      setIsLoading(true);
      const response = await updateBrandAction({
        id: selectedBrandID,
        name: editValue,
        image: editLogo,
        url: editUrl,
        order,
      });
      if (response.error) {
        setIsLoading(false);
        setErrorMsg(response.error);
      }
      if (response.res) {
        setIsLoading(false);
        setShowEdit(false);
        fetchBrands();
        messageApi.success("Cập nhật thành công");
      }
    }
  };

  const handleShowDelete = (id: string) => {
    selectedBrandID = id;
    setShowDelete(true);
  };

  const handleDelete = async () => {
    if (selectedBrandID !== "") {
      setIsLoading(true);
      const response = await deleteBrandAction(selectedBrandID);
      if (response.error) {
        setIsLoading(false);
      }
      if (response.res) {
        setIsLoading(false);
        setShowDelete(false);
        fetchBrands();
        messageApi.success("Thành công");
      }
    }
  };

  return (
    <div className={styles.brands}>
      {contextHolder}
      <HeaderPage
        isShowButton
        onClick={() => setShowModal(true)}
        textCta="Thêm"
      />
      <div className={styles.brandsList}>
        <div className={styles.list}>
          <Table
            {...tableProps}
            size="middle"
            rowKey={(record) => record?.id}
            loading={isListLoading}
            columns={columns}
            dataSource={brandList}
          />
        </div>
      </div>

      {showEdit && (
        <Popup
          width="600px"
          title="Cập nhật"
          content={
            <div className={styles.editSection}>
              <div>
                <span>Tên hãng:</span>
                <Input
                  type="text"
                  value={editValue}
                  placeholder="Nhập tên nhãn hiệu"
                  onChange={(e) => setEditValue(e.currentTarget.value)}
                  allowClear
                />
              </div>
              <div>
                <span>Link:</span>
                <Input
                  type="text"
                  value={editUrl}
                  placeholder="Nhập link: https://lap4all.vn/list/...."
                  onChange={(e) => setEditUrl(e.currentTarget.value)}
                  allowClear
                />
              </div>
              <span>{errorMsg}</span>
              <div>
                <span>Vị trí:</span>
                <InputNumber
                  controls={false}
                  style={{ width: "100%" }}
                  min={0}
                  value={order}
                  onChange={(e) => setOrder(e)}
                  placeholder="Ví dụ vị trí thứ đầu tiên nhập số 1"
                />
              </div>
              <div>
                <span>Link logo:</span>
                <Input
                  type="text"
                  value={editLogo}
                  placeholder="Nhập link logo"
                  onChange={(e) => setEditLogo(e.currentTarget.value)}
                  allowClear
                />
                {editLogo && (
                  <div className={styles.imageContainer}>
                    <Image
                      alt="logo"
                      className={styles.imagePreview}
                      src={editLogo}
                      preview={false}
                    />
                  </div>
                )}
              </div>
            </div>
          }
          isLoading={isLoading}
          onCancel={() => setShowEdit(false)}
          onClose={() => setShowEdit(false)}
          onSubmit={() => handleUpdate()}
          confirmBtnText="Xác nhận"
          cancelBtnText="No"
        />
      )}

      {showDelete && (
        <Popup
          width="300px"
          content={
            <div className={styles.deleteMsg}>Bạn có chắc muốn xóa?</div>
          }
          isLoading={isLoading}
          onCancel={() => setShowDelete(false)}
          onClose={() => setShowDelete(false)}
          onSubmit={() => handleDelete()}
          isDelete
          cancelBtnText="No"
          confirmBtnText="Yes"
        />
      )}
      <BrandModal
        showModal={showModal}
        title="Thêm brand"
        onFinished={fetchBrands}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
};

export default Brand;
