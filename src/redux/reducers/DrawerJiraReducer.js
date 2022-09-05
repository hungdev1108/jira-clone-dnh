import React from "react";
const initialState = {
  visible: false,
  title: "",
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
      return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title };
    }

    case "SET_SUBMIT_EDIT_PROJECT": {
      return { ...state, visible: true, callBackSubmit: action.submitFunction };
    }

    case "OPEN_FORM_CREATE_TASK": {
      return { ...state, visible: true, ComponentContentDrawer: action.Component, title: action.title };
    }

    default:
      return state;
  }
};
