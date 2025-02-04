"use client";

import HeaderPageAdmin from "@/components/admin/header-page";

import {
  deleteByIdAction,
  getAllTopProductsAction,
} from "@/actions/top-products/topProducts";
import ModalAddTopProducts from "@/components/admin/top-products";
import ProductCard from "@/components/store/common/productCard";
import { SK_Box } from "@/components/UI/skeleton";
import { TTopProducts } from "@/types/common";
import { CloseCircleOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Flex, Popconfirm } from "antd";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const TopProductsPage = () => {
  const [show, setShow] = useState(false);
  const [data, setData] = useState<TTopProducts[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const idTopProduct = useRef("");

  const fetchData = async () => {
    const response = await getAllTopProductsAction();
    if (response.res) {
      setData(response.res);
    } else {
      setData([]);
    }
  };

  const openModalEdit = (id: string) => {
    setIsEdit(true);
    idTopProduct.current = id;
    setShow(true);
  };

  const onpenModalAdd = () => {
    setIsEdit(false);
    idTopProduct.current = "";
    setShow(true);
  };

  const deleteTopProduct = async (id: string) => {
    const response = await deleteByIdAction(id);
    if (response.err) {
      console.log(response.err);
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hanldeClose = () => {
    setShow(false);
    setIsEdit(false);
    idTopProduct.current = "";
    fetchData();
  };

  return (
    <div className={styles.container}>
      <HeaderPageAdmin />
      <Flex justify="flex-end" align="center">
        <Button type="primary" onClick={onpenModalAdd}>
          Thêm
        </Button>
      </Flex>
      {data.length > 0 ? (
        data.map((item, index) => {
          return (
            <div className={styles.wrapperContainer} key={index}>
              {/* TITLE */}
              <div className={styles.headerBanner}>
                <div className={styles.title}>
                  <h2>{item.title || ""}</h2>
                </div>
                <Button
                  type="default"
                  shape="circle"
                  icon={<EditOutlined />}
                  onClick={() => openModalEdit(item.id)}
                />
                <Popconfirm
                  title="Xóa banner?"
                  description="Bạn có chắc muốn xóa không?"
                  onConfirm={() => deleteTopProduct(item.id)}
                  okText="Đồng ý"
                  cancelText="Hủy"
                >
                  <Button
                    type="default"
                    shape="circle"
                    danger
                    icon={<CloseCircleOutlined />}
                  />
                </Popconfirm>
              </div>
              {/* LIST PRODUCT */}
              <div className={styles.cardsWrapper}>
                {item.productID.length > 0 ? (
                  item.productID.map((item, index) => {
                    return (
                      <ProductCard
                        url={"/product/" + item.id}
                        key={index}
                        name={item.name}
                        images={[item.images[0], item.images[1]]}
                        price={+item.price}
                        specialFeatures={item.specialFeatures || []}
                        salePrice={+item.salePrice as any}
                        staticWidth
                        isAvailable={item.isAvailable}
                      />
                    );
                  })
                ) : (
                  <>
                    <SK_Box width="100%" height="120px" />
                    <SK_Box width="100%" height="120px" />
                    <SK_Box width="100%" height="120px" />
                    <SK_Box width="100%" height="120px" />
                  </>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <div>Không có dữ liệu</div>
      )}

      <ModalAddTopProducts
        show={show}
        isEdit={isEdit}
        handleClose={hanldeClose}
        id={idTopProduct.current}
      />
    </div>
  );
};
export default TopProductsPage;
