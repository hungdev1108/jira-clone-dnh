import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/Loading/Loading";

function* createProjectSaga(action) {
  console.log(action);
  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  // gọi API lấy dữ liệu về
  try {
    const { data, status } = yield call(() => jiraService.createProjectAuthorization(action.newProject));
    console.log("Call data saga", data.content);

    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      history.push("/projectmanagement");
    }
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

// ------------ Saga create project form API

export function* followCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}

// ------------ Saga get all project form API
// hungdev1108 - Code: 29/08/2022

function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(() => jiraService.getListProject());
    if (status === STATUS_CODE.SUCCESS) {
      // Sau khi lấy dữ liệu từ API về thành công
      yield put({
        type: "GET_LIST_PROJECT",
        projectList: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* followGetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}
