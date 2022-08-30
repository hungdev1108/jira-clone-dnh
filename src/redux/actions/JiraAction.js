import { USER_SINGIN_API } from "../constants/Jira/Jira";

export const signinJiraAction = (email, password) => {
  return {
    type: USER_SINGIN_API,
    userLogin: {
      email: email,
      password: password,
    },
  };
};
