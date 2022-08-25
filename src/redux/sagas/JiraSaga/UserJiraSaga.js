import axios from "axios";

import { takeLatest } from "redux-saga/effects";
import { USER_SINGIN_API } from "../../constants/Jira/Jira";

// Quan ly cac action saga
function* signinSaga(action) {
  console.log(action);
}

export function* followSignin() {
  yield takeLatest(USER_SINGIN_API, signinSaga); // Nghe su kien o lan cuoi
}
