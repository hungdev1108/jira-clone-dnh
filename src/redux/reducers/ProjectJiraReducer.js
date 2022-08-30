const stateDefault = {
  projectList: [
    {
      id: 1,
      projectName: "admin",
      description: "<p>admin</p>",
    },
  ],
};

export const ProjectJiraReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.projectList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
