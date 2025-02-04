"use client";

import { deleteUserByIdAction, getListUserAction } from "@/actions/user/users";
import HeaderPageAdmin from "@/components/admin/header-page";
import {
  tableColumns,
  tableProps,
} from "@/components/admin/user/columns/columns";
import UsersForm from "@/components/admin/user/usersForm";
import { TUser } from "@/types/user";
import { Button, Flex, message, Popconfirm, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";

const AdminUserPage = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const [show, setShow] = useState(false);
  const [data, setData] = useState<TUser[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const idUser = useRef("");

  const columnsAction: ColumnsType<TUser> = [
    {
      key: "action",
      title: "Chức năng",
      align: "center",
      width: 100,
      render: (_, record) => {
        return (
          <Space size="middle">
            <Button
              color="primary"
              variant="outlined"
              onClick={() => openModalEdit(record.id)}
            >
              Cập nhật
            </Button>

            <Popconfirm
              title={`Xóa ${record.name} ?`}
              description="Bạn có chắc muốn xóa không?"
              onConfirm={() => deleteUser(record.id)}
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

  const fetchData = async () => {
    try {
      const response = await getListUserAction();
      if (response.res) {
        setData(response.res);
      } else {
        messageApi.open({
          type: "error",
          content: `${JSON.stringify(response.error)}`,
        });
        setData([]);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: `${JSON.stringify(error)}`,
      });
      setData([]);
    }
  };

  const openModalEdit = (id: string) => {
    setIsEdit(true);
    idUser.current = id;
    setShow(true);
  };

  const openModal = () => {
    setIsEdit(false);
    idUser.current = "";
    setShow(true);
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await deleteUserByIdAction(id);
      if (response.err) {
        messageApi.error(JSON.stringify(response.err));
      } else {
        fetchData();
      }
    } catch (error) {
      messageApi.error(JSON.stringify(error));
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const hanldeClose = () => {
    setShow(false);
    setIsEdit(false);
    idUser.current = "";
    fetchData();
  };

  const mergeColumns = [...tableColumns, ...columnsAction];

  return (
    <div className={styles.container}>
      <HeaderPageAdmin />
      {contextHolder}
      <Flex justify="flex-end" align="center" style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={openModal}>
          Thêm
        </Button>
      </Flex>
      <Table
        {...tableProps}
        dataSource={data}
        loading={loading}
        rowKey={(record) => record?.id}
        columns={mergeColumns}
      />
      <UsersForm
        show={show}
        handleClose={hanldeClose}
        id={idUser.current}
        isEdit={isEdit}
      />
    </div>
  );
};
export default AdminUserPage;
