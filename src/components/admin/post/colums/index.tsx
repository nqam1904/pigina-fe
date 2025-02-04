import { TListPost } from "@/types/post";
import { EyeOutlined } from "@ant-design/icons";
import { Image, Space, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import Link from "next/link";

export const columns: ColumnsType<TListPost> = [
  {
    title: "Tiêu đề",
    dataIndex: "title",
    width: 80,
    align: "center",
  },
  {
    title: "Hình ảnh",
    dataIndex: "imgUrl",
    width: 60,
    align: "center",
    render: (_, record) => {
      const { title, image } = record;
      return (
        <Image
          width={120}
          alt={title}
          src={image}
          fallback="https://res.cloudinary.com/dixay3mvg/image/upload/v1729924050/no-image-icon-0_gy9jrn.jpg"
        />
      );
    },
  },
  {
    title: "Mô tả ngắn",
    dataIndex: "shortDesc",
    width: 100,
    ellipsis: true,
    align: "center",
  },
  // {
  //   title: "Nội dung",
  //   dataIndex: "desc",
  //   width: 100,
  //   ellipsis: true,
  //   align: "center",
  // },

  {
    title: "Link bài viết",
    dataIndex: "link",
    width: 50,
    align: "center",
    render: (_, record) => {
      const { link } = record;
      if (!link?.includes("https")) return null;
      return (
        <Space size="middle">
          <Tooltip title="Link bài gốc">
            <Link href={link} target="_blank">
              <EyeOutlined />
            </Link>
          </Tooltip>
        </Space>
      );
    },
  },
  // {
  //   title: "Thời gian",
  //   dataIndex: "updatedAt",
  //   width: 60,
  //   align: "center",
  //   render: (_, record) => {
  //     const { updatedAt = "" } = record;
  //     return <span>{formatDateTime(updatedAt)}</span>;
  //   },
  // },
];
