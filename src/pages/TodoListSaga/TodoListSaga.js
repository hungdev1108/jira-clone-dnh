import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "./TodoList.css";

export default function TodoListSaga(props) {
  // reset
  const inputEl = useRef();

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

  // get TaskList
  const getTaskList = () => {};

  // addTask handleSubmit
  const addTask = (e) => {
    e.preventDefault();

    // reset form
    inputEl.current.value = "";
  };

  // deleteTask
  const deleteTask = (taskName) => {};

  // checkTask
  const checkTask = (taskName) => {};

  // rejectTask
  const rejectTask = (taskName) => {};

  //useEffect
  useEffect(() => {
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
