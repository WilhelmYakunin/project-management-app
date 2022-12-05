import { IColumnData } from '../../features/columns-item/interfaces';
import { ITaskData } from '../../features/tasks-item/interfaces';

export enum EActionKind {
  setBoardsListState = 'setBoardsListState',
  addBoardToBoardsListState = 'addBoardToBoardsListState',
  removeBoardInBoardsListState = 'removeBoardInBoardsListState',
  editBoardInBoardsListState = 'editBoardInBoardsListState',
}

export interface IAction {
  type: string;
  payload: IColumnsListState | ITaskDataState | string;
}

export interface IState {
  columnsListState: IColumnsListState;
  tasksListState: ITasksListState;
}

export interface IColumnsListState {
  isLoaded: boolean;
  data: IColumnData[];
  error: null | string;
}

export interface ITaskDataState {
  columnId: string;
  isLoaded: boolean;
  error: null | string;
  data: ITaskData[];
}

export type ITasksListState = {
  [columnId: string]: ITaskDataState;
};
