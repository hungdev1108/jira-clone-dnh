import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./TodoList.css";

export default function TodoListRFC(props) {
  // reset
  const resetFormRef = useRef(null);

  // use STATE
  let [state, setState] = useState({
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  });

  // get TaskList
  const getTaskList = () => {
    let promise = axios({
      url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      //   console.log(result.data);
      setState({
        ...state,
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log(err);
    });
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
    if (state.values.taskName === "") return;
    let promise = axios({
      url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: state.values.taskName,
      },
    });

    promise.then((result) => {
      //   console.log(result.data);
      getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
  //reset form
  const resetForm = () => {
    resetFormRef.current.focus();
  };

  // render Task Todo
  const renderTaskToDo = () => {
    return state.taskList
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
    return state.taskList
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
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };

  // checkTask
  const checkTask = (taskName) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };

  // rejectTask
  const rejectTask = (taskName) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
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
          <button onClick={resetForm} type="reset" style={{ opacity: 0 }}></button>
          <div className="card__content">
            <div className="card__title">
              <h2>To-Do List App</h2>
              <p>August 20, 2022</p>
            </div>
            <div className="card__add">
              <input
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
