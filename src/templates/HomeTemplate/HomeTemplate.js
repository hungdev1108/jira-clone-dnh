import React from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Home/Header/Header";

export const HomeTemplate = (props) => {
  const { Component, ...resParam } = props;
  return (
    <Route
      {...resParam}
      render={(propsRoute) => {
        return (
          <>
            {/* <Header /> */}
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
