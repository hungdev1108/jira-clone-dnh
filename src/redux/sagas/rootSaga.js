import { fork, take } from "redux-saga/effects";

// Lay danh sach task bang saga
// Redux 2 loại action:
// Loại 1: action => object (action thường)
// Loại 2: action => function (thường dùng để xử lý api hoặc gọi các action khác)

function* getTaskApi() {
  // Theo dõi action => action nào dispatch mới làm các công việc bên dưới
}
export function* rootSaga() {
  yield fork(getTaskApi);
}
