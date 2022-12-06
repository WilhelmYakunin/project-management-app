import { createSlice } from '@reduxjs/toolkit';
import { IColumnData } from '../../features/columns-item/interfaces';
import { ITaskData } from '../../features/tasks-item/interfaces';

export interface IAction {
  type: string;
  payload: IColumnsListState | ITasksListState | string | IColumnData;
}

export type TState = {
  [boardId: string]: ISpecifiedBoardPageState;
};

export interface ISpecifiedBoardPageState {
  columnsListState: IColumnsListState;
  tasksListState: TColumnsListWithTasks;
}

export interface IColumnsListState {
  boardId: string;
  isLoaded: boolean;
  data: IColumnData[];
  error: null | string;
}

export type TColumnsListWithTasks = {
  [columnId: string]: ITasksListState;
};

export interface ITasksListState {
  boardId: string;
  columnId: string;
  isLoaded: boolean;
  data: ITaskData[];
  error: null | string;
}

const slice = createSlice({
  name: 'specifiedBoardsPages',
  initialState: {} as TState,
  reducers: {
    setColumnsListState(state: TState, action: IAction) {
      const boardId = (action.payload as IColumnsListState).boardId;
      if (!state[`${boardId}`])
        state[`${boardId}`] = {
          columnsListState: {} as IColumnsListState,
          tasksListState: {} as TColumnsListWithTasks,
        };

      state[`${boardId}`].columnsListState = action.payload as IColumnsListState;
    },
    addColumnToColumnsListState(state: TState, action: IAction) {
      const boardId = (action.payload as IColumnsListState).boardId;
      state[`${boardId}`].columnsListState.data.push(action.payload as IColumnData);
    },
    removeColumnInColumnListState(state: TState, action: IAction) {
      const boardId = (action.payload as IColumnData).boardId;
      const columnId = (action.payload as IColumnData)._id;
      const desiredBoard = state[`${boardId}`].columnsListState.data.find(
        (itemData) => itemData._id === columnId
      );
      if (!desiredBoard) return;

      const indexOfDesiredBoard = state[`${boardId}`].columnsListState.data.indexOf(desiredBoard);
      state[`${boardId}`].columnsListState.data.splice(indexOfDesiredBoard, 1);
    },
    editColumnInColumnsListState(state: TState, action: IAction) {
      const boardId = (action.payload as IColumnData).boardId;
      const columnId = (action.payload as IColumnData)._id;
      const desiredColumn = state[`${boardId}`].columnsListState.data.find(
        (itemData) => itemData._id === columnId
      );
      if (!desiredColumn) return;

      const indexOfDesiredBoard = state[`${boardId}`].columnsListState.data.indexOf(desiredColumn);
      state[`${boardId}`].columnsListState.data[indexOfDesiredBoard] = {
        ...state[`${boardId}`].columnsListState.data[indexOfDesiredBoard],
        ...(action.payload as IColumnData),
      };
    },
    setTasksListInColumn(state: TState, action: IAction) {
      const columnId = (action.payload as ITasksListState).columnId;
      const boardId = (action.payload as ITasksListState).boardId;
      if (!state[`${boardId}`])
        state[`${boardId}`] = {
          columnsListState: {} as IColumnsListState,
          tasksListState: {} as TColumnsListWithTasks,
        };

      state[`${boardId}`].tasksListState[`${columnId}`] = action.payload as ITasksListState;
    },
    addTaskToTasksListState(state: TState, action: IAction) {
      const columnId = (action.payload as ITasksListState).columnId;
      const boardId = (action.payload as ITasksListState).boardId;
      state[`${boardId}`].tasksListState[`${columnId}`].data.push(action.payload as ITaskData);
    },
    removeTaskInTasksListState(state: TState, action: IAction) {
      const boardId = (action.payload as ITaskData).boardId;
      const columnId = (action.payload as ITaskData).columnId;
      const taskId = (action.payload as ITaskData)._id;
      const desiredTask = state[`${boardId}`].tasksListState[`${columnId}`].data.find(
        (itemData) => itemData._id === taskId
      );
      if (!desiredTask) return;

      const indexOfDesiredBoard =
        state[`${boardId}`].tasksListState[`${columnId}`].data.indexOf(desiredTask);
      state[`${boardId}`].tasksListState[`${columnId}`].data.splice(indexOfDesiredBoard, 1);
    },
    editTaskInTasksListState(state: TState, action: IAction) {
      const boardId = (action.payload as ITaskData).boardId;
      const columnId = (action.payload as ITaskData).columnId;
      const taskId = (action.payload as ITaskData)._id;
      const desiredTask = state[`${boardId}`].tasksListState[`${columnId}`].data.find(
        (itemData) => itemData._id === taskId
      );
      if (!desiredTask) return;

      const indexOfDesiredBoard =
        state[`${boardId}`].tasksListState[`${columnId}`].data.indexOf(desiredTask);
      state[`${boardId}`].tasksListState[`${columnId}`].data[indexOfDesiredBoard] = {
        ...state[`${boardId}`].tasksListState[`${columnId}`].data[indexOfDesiredBoard],
        ...(action.payload as ITaskData),
      };
    },
  },
});

export const {
  setColumnsListState,
  addColumnToColumnsListState,
  removeColumnInColumnListState,
  editColumnInColumnsListState,
  setTasksListInColumn,
  addTaskToTasksListState,
  removeTaskInTasksListState,
  editTaskInTasksListState,
} = slice.actions;
export default slice.reducer;
