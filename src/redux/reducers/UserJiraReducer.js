import { USER_LOGIN } from "../../util/constants/settingSystem";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
  userLogin: usLogin,
  userSearch: [],
};

export const UserLoginJiraReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "USLOGIN": {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case "GET_USER_SEARCH": {
      state.userSearch = action.listUserSearch;
      console.log("stateU", state);
      return { ...state };
    }

    default:
      return { ...state };
  }
};
