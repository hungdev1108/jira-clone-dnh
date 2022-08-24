import axios from "axios";
import { GET_TASK_API } from "../constants/ToDoListConst";

// Action có 2 loại
// Action thực thi ngay làm thay đổi reducer
// Action phải thực hiện xử lý rồi mới gọi action 1 thực thi (async action)

export const getTaskListApi = () => {
  // Tiền xử lý dữ liệu => Xử lý function

  return async (dispatch) => {
    try {
      let { data, status, ...res } = await axios({
        url: "https://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });
      if (status === 200) {
        dispatch({
          type: GET_TASK_API,
          taskList: data,
        });
      }
    } catch (error) {
      console.log(error.response.data);
    }

    // promise.then((result) => {
    //   //   console.log(result.data);
    //   dispatch({
    //     type: GET_TASK_API,
    //     taskList: result.data,
    //   });
    // });
    // promise.catch((err) => {
    //   console.log(err);
    // });
  };
};

export const addTaskApi = (taskName) => {
  // Tiền xử lý dữ liệu => Xử lý function

  return async (dispatch) => {
    try {
      let { data, status, ...res } = await axios({
        url: "https://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: {
          taskName: taskName,
        },
      });

      if (status === 200) {
        dispatch(getTaskListApi());
      }
    } catch (error) {
      console.log(error.response.data);
    }

    // promise.then((result) => {
    //   //   console.log(result.data);
    //   dispatch(getTaskListApi());
    // });
    // promise.catch((errors) => {
    //   alert(errors.response.data);
    // });
  };
};

export const deleteTaskApi = (taskName) => {
  // Tiền xử lý dữ liệu => Xử lý function
  return (dispatch) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };
};

export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = axios({
      url: `https://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });

    promise.then((result) => {
      dispatch(getTaskListApi());
    });
    promise.catch((errors) => {
      console.log(errors.response.data);
    });
  };
};
