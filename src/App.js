import { BrowserRouter, Switch } from "react-router-dom";
import "./App.css";
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

function App() {
  return (
    <BrowserRouter>
      {/* <Header /> */}

      <Switch>
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/contact" Component={Contact} />
        <HomeTemplate exact path="/about" Component={About} />
        <UserLoginTemplate exact path="/login" Component={LoginJira} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/todolistRCC" Component={TodoListRCC} />
        <HomeTemplate exact path="/todolistRFC" Component={TodoListRFC} />
        <HomeTemplate exact path="/todolistredux" Component={TodoListRedux} />
        <HomeTemplate exact path="/todolistsaga" Component={TodoListSaga} />

        <HomeTemplate path="*" Component={PageNotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
