import React, { useState } from "react";
import { Layout, Menu } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  VideoCameraOutlined,
  SearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { useDispatch } from "react-redux";
import FormCreateTask from "../Forms/FormCreateTask/FormCreateTask";
const { Sider } = Layout;

export default function SidebarJira() {
  const dispatch = useDispatch();
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
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item
            key={1}
            icon={<PlusOutlined style={{ fontSize: 18 }} />}
            onClick={() => {
              dispatch({
                type: "OPEN_FORM_CREATE_TASK",
                title: "Create Task",
                Component: <FormCreateTask />,
              });
            }}
          >
            <span style={{ fontSize: 17 }}>Create Task</span>
          </Menu.Item>
          <Menu.Item key={2} icon={<SearchOutlined style={{ fontSize: 18 }} />}>
            <span style={{ fontSize: 17 }}>Search</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
}
