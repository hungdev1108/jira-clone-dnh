import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

export default function SidebarJira() {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{ height: "100%" }}>
        <div className="text-center text-white" style={{ fontSize: 24 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => setCollapsed(!collapsed),
          })}
        </div>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <SearchOutlined style={{ fontSize: 18 }} />,
              label: <span style={{ fontSize: 17 }}>Search</span>,
            },
            {
              key: "2",
              icon: <PlusOutlined style={{ fontSize: 18 }} />,
              label: <span style={{ fontSize: 17 }}>Create Issues</span>,
            },
          ]}
        />
      </Sider>
    </>
  );
}
