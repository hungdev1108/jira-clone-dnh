import { call, delay, put, takeLatest, select } from "redux-saga/effects";
import { jiraService } from "../../../services/JiraService";
import { TOKEN, USER_LOGIN } from "../../../util/constants/settingSystem";
import { USER_SINGIN_API, USLOGIN } from "../../constants/Jira/Jira";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/Loading/Loading";
import { history } from "../../../util/history"; // cach 1

// Quan ly cac action saga
function* signinSaga(action) {
  //   console.log(action);

  //call api

  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(1000);
  try {
    const { data, status } = yield call(() => jiraService.signinJira(action.userLogin));

    //Luu vào localstorage khi dang nhap thanh cong
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: USLOGIN,
      userLogin: data.content,
    });

    // cach 1
    // history.push("/home");
    // window.location.reload();

    // cach 2
    // let history = yield select((state) => state.HistoryReducer.history);

    // console.log("Dang nhap thanh cong");
    // cach 3 (version history 4.10.0)
    history.push("/jira");
  } catch (err) {
    console.log(err.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* followSignin() {
  yield takeLatest(USER_SINGIN_API, signinSaga); // Nghe su kien o lan cuoi
}
