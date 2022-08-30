import React from "react";
import { Route } from "react-router-dom";
import Header from "../../components/Home/Header/Header";
import ContentMain from "../../components/JiraApp/Main/ContentMain";
import HeaderMain from "../../components/JiraApp/Main/HeaderMain";
import InfoMain from "../../components/JiraApp/Main/InfoMain";
import MenuJira from "../../components/JiraApp/MenuJira";
import ModalJira from "../../components/JiraApp/ModalJira/ModalJira";
import SidebarJira from "../../components/JiraApp/SidebarJira";
import "../../index.css";

export const JiraTemplate = (props) => {
  const { Component, ...resParam } = props;
  return (
    <Route
      {...resParam}
      render={(propsRoute) => {
        return (
          <>
            <div className="jira">
              {/* SIDE BAR  */}
              <SidebarJira />
              {/* MENU  */}
              <MenuJira />
              {/* SEARCH */}
              {/* MAIN  */}
              <Component {...propsRoute} />

              {/* INFO MODAL */}
              <ModalJira />
            </div>
          </>
        );
      }}
    />
  );
};
