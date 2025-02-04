import { TUser } from "@/types/user";
import { formatDate } from "@/utils/utils";
import { ColumnsType, TableProps } from "antd/es/table";

// CONFIG TABLE
const tableProps: TableProps<TUser> = {
  bordered: true,
  size: "large",
  showHeader: true,
};
// DATA TABLE SHOW
const tableColumns: ColumnsType<TUser> = [
  {
    key: "name",
    title: "Tên người dùng",
    dataIndex: "name",
    ellipsis: true,
    align: "center",
    width: 150,
  },
  {
    key: "email",
    title: "Email",
    dataIndex: "email",
    align: "center",
    width: 150,
  },
  {
    key: "role",
    title: "Vai trò",
    dataIndex: "role",
    align: "center",
    width: 80,
  },
  {
    key: "createdAt",
    title: "Ngày tạo",
    dataIndex: "createdAt",
    align: "center",
    width: 100,
    render: (_, recode) => <span>{formatDate(recode.createdAt)}</span>,
  },

  {
    key: "updatedAt",
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    align: "center",
    width: 100,
    render: (_, recode) => <span>{formatDate(recode.updatedAt)}</span>,
  },
  // {
  //   key: "avatar",
  //   title: "Avatar",
  //   align: "center",
  //   width: 200,
  //   render: (_, record) => {
  //     const { avatar, name } = record;
  //     return (
  //       <Avatar src={avatar} alt={`avatar_${name}`} onError={() => false} />
  //     );
  //   },
  // },
];

export { tableColumns, tableProps };
