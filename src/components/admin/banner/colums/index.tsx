import { TSlide } from "@/types/common";
import { EyeOutlined } from "@ant-design/icons";
import { Image, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { format } from "date-fns";
import Link from "next/link";

export const columns: ColumnsType<TSlide> = [
  {
    title: "Vị trí",
    dataIndex: "order",
    width: 20,
    align: "center",
  },
  // {
  //   title: "Tiêu đề",
  //   dataIndex: "title",
  //   width: 60,
  //   align: "center",
  // },
  {
    title: "Hình ảnh",
    dataIndex: "imgUrl",
    width: 150,
    align: "center",
    render: (_, record) => {
      const { alt, url } = record;
      return (
        <Image
          width={120}
          alt={alt}
          src={url}
          fallback="https://res.cloudinary.com/dixay3mvg/image/upload/v1729924050/no-image-icon-0_gy9jrn.jpg"
        />
      );
    },
  },

  // {
  //   title: "Mô tả",
  //   dataIndex: "desc",
  //   width: 80,
  //   align: "center",
  // },
  // {
  //   title: "Text Button",
  //   dataIndex: "buttonText",
  //   width: 60,
  //   align: "center",
  // },
  {
    title: "Link",
    dataIndex: "link",
    width: 40,
    align: "center",
    render: (_, record) => {
      return (
        <Space size="middle">
          <Tooltip title="Xem nhanh">
            <Link href={record.link} target="_blank">
              <EyeOutlined />
            </Link>
          </Tooltip>
        </Space>
      );
    },
  },
  {
    title: "Ngày tạo",
    dataIndex: "createdAt",
    width: 60,
    align: "center",
    render: (_, record) => {
      return <span>{format(record.createdAt, "hh:mm:ss dd/MM/yyyy")}</span>;
    },
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updatedAt",
    width: 60,
    align: "center",
    render: (_, record) => {
      return <span>{format(record.updatedAt, "hh:mm:ss dd/MM/yyyy")}</span>;
    },
  },
];
