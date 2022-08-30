import React from "react";
import { useSelector } from "react-redux";

export default function Home(props) {
  const userLogin = useSelector((state) => state.UserLoginJiraReducer.userLogin);
  return (
    <div>
      <h3>
        {" "}
        Xin chao: {userLogin.name}
        <span>
          {" "}
          <img style={{ width: 40, borderRadius: "50%" }} src={userLogin.avatar} alt="" />
        </span>{" "}
      </h3>
    </div>
  );
}
