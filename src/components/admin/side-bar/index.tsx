"use client";

import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import SideMenu from "../side-menu";
import styles from "./side-bar.module.scss";

function SideBar({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout hasSider>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        className={styles.container_side}
      >
        <SideMenu />
      </Sider>
      <Layout style={{ marginLeft: "200px" }}>
        <Content style={{ padding: "16px" }}>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default SideBar;
