import axios from "axios";
import { DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem";

export const jiraService = {
  // user
  signinJira: (userLogin) => {
    return axios({
      url: `${DOMAIN_JIRA}/users/signin`,
      method: "POST",
      data: userLogin,
    });
  },

  // category
  getAllProjectCategory: () => {
    return axios({
      url: `${DOMAIN_JIRA}/ProjectCategory`,
      method: "GET",
    });
  },

  // create project
  createProject: (newProject) => {
    return axios({
      url: `${DOMAIN_JIRA}/Project/createProject`,
      method: "POST",
      data: newProject,
    });
  },

  // create project Authorization
  createProjectAuthorization: (newProject) => {
    return axios({
      url: `${DOMAIN_JIRA}/Project/createProjectAuthorize`,
      method: "POST",
      data: newProject,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN), // JWT
      },
    });
  },

  //  get list project
  getListProject: () => {
    return axios({
      url: `${DOMAIN_JIRA}/Project/getAllProject`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN), // JWT
        // token da dang nhap
      },
    });
  },

  //  update project
  updateProject: (projectUpdate) => {
    return axios({
      url: `${DOMAIN_JIRA}/Project/updateProject?projectId=${projectUpdate.id}`,
      method: "PUT",
      data: projectUpdate,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN), // JWT
        // token da dang nhap
      },
    });
  },
};
