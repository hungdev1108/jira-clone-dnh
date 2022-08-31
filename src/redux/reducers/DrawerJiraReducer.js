import React from "react";
const initialState = {
  visible: false,
  ComponentContentDrawer: <p>Default Drawer Content</p>,
  callBackSubmit: (propValue) => {
    alert("Hi!");
  },
};

export const DrawerJiraReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER": {
      return { ...state, visible: true };
    }

    case "CLOSE_DRAWER": {
      return { ...state, visible: false };
    }

    case "OPEN_FORM_EDIT_PROJECT": {
      return { ...state, visible: true, ComponentContentDrawer: action.Component };
    }

    case "SET_SUBMIT_EDIT_PROJECT": {
      return { ...state, visible: true, callBackSubmit: action.submitFunction };
    }
    default:
      return state;
  }
};
