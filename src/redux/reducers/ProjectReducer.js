const initialState = {
  projectEdit: {},
  projectDetail: {},
};

export const ProjectEditReducer = (state = initialState, action) => {
  switch (action.type) {
    case "EDIT_PROJECT": {
      state.projectEdit = action.projectEditModal;
      return { ...state };
    }
    case "PUSH_PROJECT_DETAIL": {
      state.projectDetail = action.projectDetail;
      return { ...state };
    }

    default:
      return state;
  }
};
