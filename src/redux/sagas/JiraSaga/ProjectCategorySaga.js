import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { STATUS_CODE } from "../../../util/constants/settingSystem";
import { GET_ALL_PROJECT_CATEGORY, GET_ALL_PROJECT_CATEGORY_SAGA } from "../../constants/Jira/Jira";

function* getAllProjectCategorySaga(action) {
  console.log("acionsaga", action);
  // gọi API lấy dữ liệu về
  try {
    const { data, status } = yield call(() => jiraService.getAllProjectCategory());
    console.log("data1", data.content);

    // Gọi API thành công thì dispatch lên reducer thông qua put
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_PROJECT_CATEGORY,
        data: data.content,
      });
      console.log("data2", data);
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* followGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
