import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";
import LoadingReducer from "./reducers/LoadingReducer";
import { HistoryReducer } from "./reducers/HistoryReducer";

//middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { UserLoginJiraReducer } from "./reducers/UserJiraReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectJiraReducer } from "./reducers/ProjectJiraReducer";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  // Khai bao reducer
  TodoListReducer,
  LoadingReducer,
  HistoryReducer,
  UserLoginJiraReducer,
  ProjectCategoryReducer,
  ProjectJiraReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

// Goi Saga sau store
middleWareSaga.run(rootSaga);

export default store;
