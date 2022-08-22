import { applyMiddleware, combineReducers, createStore } from "redux";
import TodoListReducer from "./reducers/ToDoListReducer";
import reduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  // Khai bao reducer
  TodoListReducer,
});

const store = createStore(rootReducer, applyMiddleware(reduxThunk));

export default store;
