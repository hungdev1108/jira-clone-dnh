import React, { useState } from "react";
import { Prompt } from "react-router-dom";

export default function Login(props) {
  const [userLogin, setUserLogin] = useState({
    userName: "",
    passWord: "",
    status: false,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    const newUserLogin = {
      ...userLogin,
      [name]: value,
    };

    let valid = true;
    for (let key in newUserLogin) {
      if (key !== "status") {
        if (newUserLogin[key].trim() === "") {
          valid = false;
        }
      }
    }
    if (!valid) {
      newUserLogin.status = true;
    } else {
      newUserLogin.status = false;
    }

    setUserLogin(newUserLogin);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (userLogin.userName === "admin" && userLogin.passWord === "123") {
      // Dang nhap thanh cong chuyen ve trang truoc do
      //   props.history.goBack();
      // Chuyen den trang chi dinh
      props.history.goBack();
      localStorage.setItem("userLogin", JSON.stringify(userLogin));
    } else {
      alert("Login fail: Username or Password invalid!");
      return;
    }
  };

  return (
    <form className="container" onSubmit={handleLogin}>
      <h3 className="display-4">Login</h3>
      <div className="form-group">
        <p>Username</p>
        <input
          type="text"
          name="userName"
          id="username"
          className="form-control"
          onChange={handleChange}
          placeholder="Enter your username"
        />
      </div>
      <div className="form-group">
        <p>Password</p>
        <input
          type="text"
          name="passWord"
          id="password"
          className="form-control"
          onChange={handleChange}
          placeholder="Enter your password"
        />
      </div>
      <div className="form-group">
        <button className="btn btn-success px-4">Login</button>
      </div>
      <Prompt
        when={userLogin.status}
        message={(location) => {
          console.log(location);
          return "Do you want to leave this page?";
        }}
      ></Prompt>
    </form>
  );
}
