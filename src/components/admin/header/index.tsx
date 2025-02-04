"use client";
import {
  DownOutlined,
  LockOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, MenuProps, message, Space } from "antd";
import { Header } from "antd/es/layout/layout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CSSProperties, useEffect, useState } from "react";
import ChangePassword from "../forms/changePassword";
import styles from "./header.module.scss";

const defaultAvatar = "/images/avatar.jpg";
interface IHeaderAdmin {
  onPress: () => {};
}
const HeaderAdmin = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModalChangePass, setShowModalChangePass] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: session?.user?.name || "user",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: "Hồ Sơ",
      icon: <UserOutlined />,
    },
    {
      key: "3",
      label: "Đổi mật khẩu",
      icon: <LockOutlined />,
    },
    {
      key: "4",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
    },
  ];

  const styleHeaderScroll: CSSProperties = {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    backdropFilter: "blue(8)",
    boxShadow: "rgba(0, 0, 0, 0.05) 0px 0px 8px 2px",
  };

  const onClick: MenuProps["onClick"] = ({ key }) => {
    switch (key) {
      case "2":
        messageApi.warning("Chức năng đang phát triển");
        break;
      case "3":
        setShowModalChangePass(true);
        break;
      case "4":
        router.replace("/login");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClose = () => {
    setShowModalChangePass(false);
  };

  return (
    <Header
      className={styles.container}
      style={isScrolled ? styleHeaderScroll : { backgroundColor: "white" }}
    >
      {contextHolder}
      <div className={styles.item}>
        <Image
          alt="Logo"
          src={"/images/logo.png"}
          width={170}
          height={60}
          quality={100}
          priority
          style={{ objectFit: "contain" }}
        />
        <span className={styles.title}>
          Xin Chào {session?.user?.name || ""}
        </span>
      </div>
      <Dropdown menu={{ items, onClick }}>
        <Space align="center">
          <div className={styles.item}>
            <Avatar size={36} src={session?.user?.image || defaultAvatar} />
          </div>
          <DownOutlined />
        </Space>
      </Dropdown>
      <ChangePassword showModal={showModalChangePass} onClose={handleClose} />
    </Header>
  );
};

export default HeaderAdmin;
