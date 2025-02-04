/* eslint-disable react-hooks/exhaustive-deps */
import { dashboardSideMenu } from "@/routes/path";
import {
  LaptopOutlined,
  MenuOutlined,
  PictureOutlined,
  PlaySquareOutlined,
  ProfileOutlined,
  ReadOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function SideMenu() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const [selectedKey, setSelectedKey] = useState([""]);

  const selectSideMenu = () => {
    const getItemMenu = dashboardSideMenu.find((x) => x?.link === pathname);
    if (pathname.startsWith(`${getItemMenu?.link || ""}`)) {
      setSelectedKey([`${getItemMenu?.key}`]);
    }
  };

  useEffect(() => {
    selectSideMenu();
  }, [pathname]);

  const menuSdie: ItemType<MenuItemType>[] = [
    {
      label: <Link href="/admin/categories">Danh mục</Link>,
      key: 1,
      icon: <MenuOutlined />,
    },
    {
      label: <Link href="/admin/brands">Thương hiệu</Link>,
      key: 2,
      icon: <WindowsOutlined />,
    },
    {
      label: <Link href="/admin/products">Sản phẩm</Link>,
      key: 3,
      icon: <LaptopOutlined />,
    },
    {
      label: <Link href="/admin/banners">Banner</Link>,
      key: 4,
      icon: <PictureOutlined />,
    },
    {
      label: <Link href="/admin/slide-small">Slide nhỏ</Link>,
      key: 5,
      icon: <PlaySquareOutlined />,
    },
    {
      label: <Link href="/admin/posts">Bài viết</Link>,
      key: 6,
      icon: <ReadOutlined />,
    },
    {
      label: <Link href="/admin/top-products">Top sản phẩm</Link>,
      key: 7,
      icon: <ProfileOutlined />,
    },
    { type: "divider" },
    {
      label: <Link href="/admin/users">Tài khoản</Link>,
      key: 8,
      icon: <UsergroupAddOutlined />,
    },
    {
      label: <Link href="/admin/settings">Cài đặt</Link>,
      key: 9,
      icon: <SettingOutlined />,
    },
  ];

  const limitedMenuItems = menuSdie.filter((item: any) => item.key <= 7);

  const menuItems =
    session?.user?.role === "admin" ? menuSdie : limitedMenuItems;

  return <Menu mode="inline" items={menuItems} selectedKeys={selectedKey} />;
}

export default SideMenu;
