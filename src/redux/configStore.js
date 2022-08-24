import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";

//middleware saga
import createMiddleWareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

const middleWareSaga = createMiddleWareSaga();

const rootReducer = combineReducers({
  // Khai bao reducer
  TodoListReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk, middleWareSaga));

// Goi Saga sau store
middleWareSaga.run(rootSaga);

export default store;
