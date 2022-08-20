import React, { Component } from "react";
import axios from "axios";
import "./TodoList.css";

export default class TodoListRCC extends Component {
  // State task
  state = {
    taskList: [],
    values: {
      taskName: "",
    },
    errors: {
      taskName: "",
    },
  };

  // GET TASK LIST
  getTaskList = () => {
    let promise = axios({
      url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      //   console.log(result.data);
      this.setState({
        taskList: result.data,
      });
    });
    promise.catch((err) => {
      console.log(err);
    });
  };

  // render Task Todo
  renderTaskToDo = () => {
    return this.state.taskList
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
                  this.deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button type="button" className="complete" onClick={() => this.checkTask(item.taskName)}>
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  // render Task Completed
  renderTaskCompleted = () => {
    return this.state.taskList
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
                  this.deleteTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => {
                  this.rejectTask(item.taskName);
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
  deleteTask = (taskName) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      this.getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };

  // checkTask
  checkTask = (taskName) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      this.getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };

  // rejectTask
  rejectTask = (taskName) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      this.getTaskList();
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };

  // Ham se tu dong thuc thi sau khi component taskList duoc render
  componentDidMount() {
    this.getTaskList();
  }

  // handleChangeInput
  handleChangeInput = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);

    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };

    let newErrors = { ...this.state.errors };
    let regexString = /^[A-Za-z ]+$/;

    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " Invalid!";
    } else {
      newErrors[name] = "";
    }

    this.setState({
      ...this.state,
      values: newValues,
      errors: newErrors,
    });
  };

  // addNewTask
  addNewTask = (e) => {
    e.preventDefault();
    if (this.state.values.taskName === "") return;
    let promise = axios({
      url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: {
        taskName: this.state.values.taskName,
      },
    });

    promise.then((result) => {
      //   console.log(result.data);
      this.getTaskList();
    });
    promise.catch((errors) => {
      alert(errors.response.data);
    });

    e.target.reset();
  };

  render() {
    return (
      <form onSubmit={this.addNewTask}>
        <div className="card">
          <div className="card__header">
            <img src={require("./images/X2oObC4.png")} alt="" />
          </div>
          <div className="card__body">
            <div className="card__content">
              <div className="card__title">
                <h2>To-Do List App</h2>
                <p>August 20, 2022</p>
              </div>
              <div className="card__add">
                <input
                  name="taskName"
                  id="newTask"
                  onChange={this.handleChangeInput}
                  type="text"
                  placeholder="Enter an activity..."
                />
                <button type="button" id="addItem" onSubmit={this.addNewTask}>
                  <i className="fa fa-plus" />
                </button>
              </div>
              <span className="text text-danger">{this.state.errors.taskName}</span>
              <div className="card__todo">
                {/* Uncompleted tasks */}
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                {/* Completed tasks */}
                <ul className="todo" id="completed">
                  {this.renderTaskCompleted()}
                </ul>
              </div>
            </div>
          </div>
          <span className="text-center d-block copyright">Copyright_DNH © 2022</span>
        </div>
      </form>
    );
  }
}
