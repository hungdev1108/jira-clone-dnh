const initialState = {
  projectEdit: {},
};

export const ProjectEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PROJECT": {
      state.projectEdit = action.projectEditModal;
      return { ...state };
    }
    default:
      return state;
  }
};
