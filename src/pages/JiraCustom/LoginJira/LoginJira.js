import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { withFormik } from "formik";
import React from "react";
import { connect } from "react-redux";
import * as yup from "yup";
import { signinJiraAction } from "../../../redux/actions/JiraAction";

function LoginJira(props) {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit} className="container" style={{ height: window.innerHeight }}>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: window.innerHeight }}
      >
        <h2>Login</h2>
        <div className="d-flex mt-2">
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="email"
            size="large"
            type="text"
            placeholder="Enter your email"
            style={{ minWidth: 300 }}
            prefix={<UserOutlined />}
          />
        </div>
        <div className="text-danger">{errors.email && touched.email && errors.email}</div>
        <div className="d-flex mt-3">
          <Input
            onChange={handleChange}
            onBlur={handleBlur}
            name="password"
            type="password"
            size="large"
            placeholder="Enter your password"
            style={{ minWidth: 300 }}
            prefix={<LockOutlined />}
          />
        </div>
        <div className="text-danger">{errors.password && touched.password && errors.password}</div>
        <Button
          onSubmit={handleSubmit}
          htmlType="submit "
          style={{ minWidth: 300 }}
          size="large"
          type="primary"
          className="mt-4"
        >
          Login
        </Button>

        <div className="social mt-5">
          <Button type="primary" shape="circle" size="large" className="mr-3">
            <i className="fab fa-google"></i>
          </Button>
          <Button type="primary" shape="circle" size="large" className="mr-3">
            <i className="fab fa-facebook-f"></i>
          </Button>
          <Button type="primary" shape="circle" size="large">
            <i className="fab fa-twitter"></i>
          </Button>
        </div>
      </div>
    </form>
  );
}

const LoginJiraWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),

  validationSchema: yup.object().shape({
    email: yup.string().required("*Email is required!").email("*Email is invalid!"),
    password: yup
      .string()
      .required("*Password is required")
      .min(8, "Password must have min 6 characters!")
      .max(16, "Password must have max 16  characters!"),
  }),

  handleSubmit: ({ email, password }, { props, setSubmitting }) => {
    // console.log(action);
    setSubmitting(true);
    props.dispatch(signinJiraAction(email, password));
  },
  displayName: "Login Jira",
})(LoginJira);

export default connect()(LoginJiraWithFormik);
