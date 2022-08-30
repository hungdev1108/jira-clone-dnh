import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import { Route } from "react-router-dom";

// antd
const { Header, Footer, Sider, Content } = Layout;

export const UserLoginTemplate = (propsRote) => {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    window.onresize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
  }, []);

  let { Component, ...resRoute } = propsRote;

  return (
    <Route
      {...resRoute}
      render={(propsRote) => {
        return (
          <>
            <Layout>
              <Sider
                width={size.width / 4}
                style={{
                  height: size.height,
                  backgroundColor: "#0051CC",
                  //   backgroundImage:
                  //     "url(http://static1.squarespace.com/static/5e62cc604a6e705814906995/5e62d4ad1af04748f09d11d3/5fbdddbe6457125654fd47fe/1610691261309/Atlassian+Background.png?format=1500w)",
                  //   backgroundPosition: "top",
                  //   backgroundRepeat: "no-repeat",
                  objectFit: "cover",
                }}
              ></Sider>
              <Content>
                <Component {...propsRote} />
              </Content>
            </Layout>
          </>
        );
      }}
    />
  );
};
