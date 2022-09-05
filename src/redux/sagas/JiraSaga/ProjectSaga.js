import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { history } from "../../../util/history";
import { notificationFunction } from "../../../util/notificationJira/notificationJira";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/Loading/Loading";
import { projectService } from "../../../services/ProjectService";

// ------------ Saga create project form API
// hungdev1108 - Code: 27/08/2022
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

// ------------ Saga update project form API
// hungdev1108 - Code: 01/09/2022
function* updateProjectSaga(action) {
  console.log("action111111111", action);

  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  // gọi API lấy dữ liệu về
  try {
    const { data, status } = yield call(() => jiraService.updateProject(action.projectUpdate));

    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      //   history.push("/projectmanagement");
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (error) {
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

// ------------ Saga update project form API
// hungdev1108 - Code: 01/09/2022
function* deleteProjectSaga(action) {
  console.log("delete", action);

  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  // gọi API lấy dữ liệu về
  try {
    const { data, status } = yield call(() => projectService.deleteProject(action.idProject));

    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      //   history.push("/projectmanagement");
      notificationFunction("success", "Delete project successfuly!");
    } else {
      notificationFunction("error", "Delete project fail!");
    }
    yield put({
      type: "GET_LIST_PROJECT_SAGA",
    });
    yield put({
      type: "CLOSE_DRAWER",
    });
  } catch (error) {
    notificationFunction("error", "Delete project fail!");
    console.log(error.response.data);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

// ------------ Saga get project detail form API
// hungdev1108 - Code: 05/09/2022
function* getProjectDetailSaga(action) {
  // Hiển thị loading
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);

  // gọi API lấy dữ liệu về
  try {
    const { data, status } = yield call(() => projectService.getProjectDetail(action.projectId));
    // Lay du lieu thanh cong => dua du lieu len redux
    yield put({
      type: "PUSH_PROJECT_DETAIL",
      projectDetail: data.content,
    });
  } catch (error) {
    console.log("404 not found!");
    history.push("/projectmanagement");
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* followGetProjectDetailSaga() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetailSaga);
}
