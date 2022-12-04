import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import { useAppSelector, useAppDispatch } from './app/hooks';
import './App.css';

import LogOutButton from './features/buttons/logOutButton/logOutButton';
import CreateTaskButton from './features/buttons/createTaskButton/createTaskButton';
import UpdateTaskButton from './features/buttons/updateTaskButton/updateTaskButton';
import DeleteBoardButton from './features/buttons/deleteBoardButton/deleteBoardButton';
import DeleteColumnButton from './features/buttons/deleteColumnButton/deleteColumnButton';
import DeleteTaskButton from './features/buttons/deleteTaskButton/deleteTaskButton';
import ModalForm from './features/modals/modalForm';

import Spinner from './features/spinner/spinner';
import { getInitUsersStatus } from './app/selectors';
import { onInit } from './features/modals/modalsSlice';

function App() {
  const dispatch = useAppDispatch()
  const loadedUsers = useAppSelector(getInitUsersStatus)
  loadedUsers === 'idle' && dispatch(onInit())
  const Blocker = () => loadedUsers === 'idle' ? <Spinner /> : null
  
  return (
    <div className="App">
      <Blocker />
      <LogOutButton />
      <CreateTaskButton boardId='6389948a535518a38f3d0f8e' columnId='638994b1535518a38f3d0f90' userId='0' />
      <UpdateTaskButton boardId='6389948a535518a38f3d0f8e' columnId='638994b1535518a38f3d0f90' userId='0' taskId='63899505535518a38f3d0f93' />
      <DeleteBoardButton boardId='6389948a535518a38f3d0f8e' />
      <DeleteColumnButton boardId='6389948a535518a38f3d0f8e' columnId='638994b1535518a38f3d0f90' />
      <DeleteTaskButton boardId='6389948a535518a38f3d0f8e' columnId='638994b1535518a38f3d0f90' taskId='63899646535518a38f3d0f9b' />
      <ModalForm />
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a
            className="App-link"
            href="https://reactjs.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux
          </a>
          <span>, </span>
          <a
            className="App-link"
            href="https://redux-toolkit.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            React Redux
          </a>
        </span>
      </header>
    </div>
  );
}

export default App;
