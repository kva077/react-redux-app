import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  titleChanged,
  taskDeleted,
  completeTask,
  getTasks,
  loadTasks,
  createTasks,
  getTasksLoadingStatus,
} from "./store/task";
import configureStore from "./store/store";
import { Provider, useDispatch, useSelector } from "react-redux";
import { getError } from "./store/errors";

const store = configureStore();

const App = () => {
  const state = useSelector(getTasks());
  const isLoading = useSelector(getTasksLoadingStatus());
  const error = useSelector(getError());
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadTasks());
  }, []);

  const changeTitle = (taskId) => {
    dispatch(titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    dispatch(taskDeleted(taskId));
  };

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>App</h1>
      <button onClick={() => dispatch(createTasks())}>Create Task</button>

      <ul>
        {state.map((el) => {
          return (
            <li key={el.id}>
              <p>{el.title}</p>
              <p>{`Completed: ${el.completed}`}</p>
              <hr />
              <button onClick={() => dispatch(completeTask(el.id))}>
                Complete
              </button>
              <button onClick={() => changeTitle(el.id)}>Change Title</button>
              <button onClick={() => deleteTask(el.id)}>Delete Title</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
