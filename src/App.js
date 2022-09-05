import { BrowserRouter, Switch, useHistory } from "react-router-dom";
import "./App.css";
import LoadingComponent from "./components/GolbalSetting/LoadingComponent/LoadingComponent";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Detail from "./pages/Detail/Detail";
import Home from "./pages/Home/Home";
import LoginJira from "./pages/JiraCustom/LoginJira/LoginJira";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Profile from "./pages/Profile/Profile";
import TodoListRCC from "./pages/TodoList/TodoListRCC";
import TodoListRedux from "./pages/TodoList/TodoListRedux";
import TodoListRFC from "./pages/TodoList/TodoListRFC";
import TodoListSaga from "./pages/TodoListSaga/TodoListSaga";
import { HomeTemplate } from "./templates/HomeTemplate/HomeTemplate";
import { UserLoginTemplate } from "./templates/HomeTemplate/UserLoginTemplate";

import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { JiraTemplate } from "./templates/HomeTemplate/JiraTemplate";
import indexJira from "./redux/sagas/JiraSaga/indexJira";
import CreateProject from "./pages/JiraCustom/CreateProject/CreateProject";
import ProjectManagement from "./pages/ProjectManagement/ProjectManagement";
import DrawerJira from "./HOC/JiraHOC/DrawerJira";

function App() {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: "ADD_HISTORY",
      history: history,
    });
  }, []);

  return (
    <>
      {/* <Header /> */}

      <LoadingComponent />
      <DrawerJira />
      <Switch>
        {/* <HomeTemplate path="/home" Component={Home} /> */}
        {/* <HomeTemplate exact path="/contact" Component={Contact} /> */}
        {/* <HomeTemplate exact path="/about" Component={About} /> */}
        {/* <HomeTemplate exact path="/profile" Component={Profile} /> */}
        {/* <HomeTemplate exact path="/detail/:id" Component={Detail} /> */}
        {/* <HomeTemplate exact path="/todolistRCC" Component={TodoListRCC} /> */}
        {/* <HomeTemplate exact path="/todolistRFC" Component={TodoListRFC} /> */}
        {/* <HomeTemplate exact path="/todolistredux" Component={TodoListRedux} /> */}
        {/* <HomeTemplate exact path="/todolistsaga" Component={TodoListSaga} /> */}

        <UserLoginTemplate exact path="/login" Component={LoginJira} />
        <JiraTemplate exact path="/jira" Component={indexJira} />
        <JiraTemplate exact path="/createproject" Component={CreateProject} />
        <JiraTemplate exact path="/projectmanagement" Component={ProjectManagement} />
        <JiraTemplate exact path="/projectdetail/:projectId" Component={indexJira} />

        <UserLoginTemplate exact path="/" Component={LoginJira} />
        <HomeTemplate path="*" Component={PageNotFound} />
      </Switch>
    </>
  );
}

export default App;
