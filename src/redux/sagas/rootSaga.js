import { all } from "redux-saga/effects";
import * as Jira from "./JiraSaga/UserJiraSaga";
import * as ProjectCategorySaga from "./JiraSaga/ProjectCategorySaga";
import * as ProjectSaga from "./JiraSaga/ProjectSaga";

export function* rootSaga() {
  //   yield fork(getTaskApi);
  yield all([
    // Nghiep vu Jira saga
    Jira.followSignin(),
    Jira.followGetUser(),
    Jira.followAddUserProjectSaga(),
    Jira.followRemoveUserFromProjectSaga(),
    ProjectCategorySaga.followGetAllProjectCategory(),
    ProjectSaga.followCreateProjectSaga(),
    ProjectSaga.followGetListProjectSaga(),
    ProjectSaga.followUpdateProjectSaga(),
    ProjectSaga.followDeleteProjectSaga(),
    ProjectSaga.followGetProjectDetailSaga(),
  ]);
}
