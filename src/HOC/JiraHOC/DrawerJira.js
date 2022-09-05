import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from "antd";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./DrawerJira.css";

export default function DrawerJira(props) {
  const { visible, ComponentContentDrawer, callBackSubmit, title } = useSelector(
    (state) => state.DrawerJiraReducer
  );

  const dispatch = useDispatch();

  const showDrawer = () => {
    dispatch({
      type: "OPEN_DRAWER",
    });
  };

  const onClose = () => {
    dispatch({
      type: "CLOSE_DRAWER",
    });
  };
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{
          paddingBottom: 80,
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={callBackSubmit} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        {/* render data from input */}
        {ComponentContentDrawer}
      </Drawer>
    </>
  );
}
