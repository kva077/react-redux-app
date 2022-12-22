import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actions";
import { initiateStore } from "./store/store";

const store = initiateStore();

const App = (params) => {
  const [state, setState] = useState(store.getState());

  useEffect(() => {
    store.subscribe(() => {
      setState(store.getState());
    });
  }, []);

  const completeTask = (taskId) => {
    store.dispatch(actions.taskCompleted(taskId));
  };

  const changeTitle = (taskId) => {
    store.dispatch(actions.titleChanged(taskId));
  };

  const deleteTask = (taskId) => {
    store.dispatch(actions.taskDeleted(taskId));
  };
  return (
    <>
      <h1>App</h1>
      <ul>
        {state.map((el) => {
          return (
            <li key={el.id}>
              <p>{el.title}</p>
              <p>{`Completed: ${el.completed}`}</p>
              <hr />
              <button onClick={() => completeTask(el.id)}>Complete</button>
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
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
