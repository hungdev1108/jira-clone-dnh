import { Input, Button } from "antd";
import React from "react";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

export default function LoginJira(props) {
  return (
    <form className="container" style={{ height: window.innerHeight }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h2>Login Jira</h2>
        <div className="d-flex mt-2">
          <Input
            name="email"
            size="large"
            placeholder="Enter your email"
            style={{ minWidth: 300 }}
            prefix={<UserOutlined />}
          />
        </div>
        <div className="d-flex mt-3">
          <Input
            name="password"
            size="large"
            placeholder="Enter your password"
            style={{ minWidth: 300 }}
            prefix={<LockOutlined />}
          />
        </div>
        <Button style={{ minWidth: 300 }} size="large" type="primary" className="mt-4">
          Login
        </Button>

        <div className="social mt-5">
          <Button type="primary" shape="circle" size="large" className="mr-3">
            <i class="fa-brands fa-google"></i>
          </Button>
          <Button type="primary" shape="circle" size="large" className="mr-3">
            <i class="fa-brands fa-facebook-f"></i>
          </Button>
          <Button type="primary" shape="circle" size="large">
            <i class="fa-brands fa-twitter"></i>
          </Button>
        </div>
      </div>
    </form>
  );
}
