import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskApi,
  checkTaskApi,
  deleteTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "../../redux/actions/ToDoListAction";
import "./TodoList.css";

export default function TodoListRedux(props) {
  // lấy taskList từ redux
  const { taskList } = useSelector((state) => state.TodoListReducer);
  const dispatch = useDispatch();

  // reset
  const inputEl = useRef();

  // use STATE
  let [state, setState] = useState({
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  // get TaskList
  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  // handleChange
  //   console.log(state);
  const handleChange = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);

    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...state.errors };
    let regexString = /^[A-Za-z ]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " Invalid!";
    } else {
      newErrors[name] = "";
    }

    setState({
      ...state,
      values: newValues,
      errors: newErrors,
    });
  };

  // handleSubmit
  const addTask = (e) => {
    e.preventDefault();
    // Xứ lý nhận dữ liệu từ người dùng đăng nhập => gọi action addTaskApi()
    dispatch(addTaskApi(state.values.taskName));
    // reset form
    inputEl.current.value = "";
  };

  // render Task Todo
  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button type="button" className="complete" onClick={() => checkTask(item.taskName)}>
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  // render Task Completed
  const renderTaskCompleted = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                type="button"
                onClick={() => {
                  deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  rejectTask(item.taskName);
                }}
              >
                <i className="far fa-arrow-up" />
                <i className="fas fa-arrow-up" />
              </button>
            </div>
          </li>
        );
      });
  };

  // deleteTask
  const deleteTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };

  // checkTask
  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName));
  };

  // rejectTask
  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  //useEffect
  useEffect(() => {
    getTaskList();

    return () => {};
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card__header">
          <img src={require("./images/X2oObC4.png")} alt="" />
        </div>
        <form className="card__body" onSubmit={addTask}>
          <div className="card__content">
            <div className="card__title">
              <h2>To-Do List App</h2>
              <p>August 20, 2022</p>
            </div>
            <div className="card__add">
              <input
                ref={inputEl}
                name="taskName"
                onChange={handleChange}
                id="newTask"
                type="text"
                placeholder="Enter an activity..."
              />
              <button id="addItem" type="submit" onClick={addTask}>
                <i className="fa fa-plus" />
              </button>
            </div>
            <span className="text text-danger">{state.errors.taskName}</span>
            <div className="card__todo">
              {/* Uncompleted tasks */}
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              {/* Completed tasks */}
              <ul className="todo" id="completed">
                {renderTaskCompleted()}
              </ul>
            </div>
            <span className="text-center d-block copyright">Copyright_DNH © 2022</span>
          </div>
        </form>
      </div>
    </div>
  );
}
