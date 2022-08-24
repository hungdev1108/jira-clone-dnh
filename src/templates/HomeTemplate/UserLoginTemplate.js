import { Layout } from "antd";
import React from "react";
import { Route } from "react-router-dom";

// antd
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (propsRote) => {
  let { Component, ...resRoute } = propsRote;

  return (
    <Route
      {...resRoute}
      render={(propsRote) => {
        return (
          <>
            <Layout>
              <Sider
                width={window.innerHeight / 2}
                style={{
                  height: window.innerHeight,
                  backgroundImage:
                    "url(http://static1.squarespace.com/static/5e62cc604a6e705814906995/5e62d4ad1af04748f09d11d3/5fbdddbe6457125654fd47fe/1610691261309/Atlassian+Background.png?format=1500w)",
                  backgroundPosition: "top",
                  //   backgroundRepeat: "no-repeat",
                  objectFit: "cover",
                }}
              ></Sider>
              <Content>
                <Component />
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
};
