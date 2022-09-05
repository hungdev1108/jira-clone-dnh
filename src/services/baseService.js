import axios from "axios";
import { DOMAIN_JIRA, TOKEN } from "../util/constants/settingSystem";

// PUT JSON ve backend
export class baseService {
  //put method
  put = (url, model) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN), // JWT
      },
    });
  };

  // post method
  post = (url, model) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN), // JWT
      },
    });
  };

  // get method
  get = (url) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN), // JWT
      },
    });
  };

  // delete method
  delete = (url, model) => {
    return axios({
      url: `${DOMAIN_JIRA}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN), // JWT
      },
    });
  };
}
