import { createSlice } from '@reduxjs/toolkit';
import {
  IAction,
  IColumnsListState,
  IState,
  ITaskDataState,
} from '../../pages/specified-bard-page/interfaces';

const defaultState: IState = {
  columnsListState: {
    isLoaded: false,
    error: null,
    data: [],
  },
  tasksListState: {},
};

const slice = createSlice({
  name: 'specifiedBoardPage',
  initialState: defaultState,
  reducers: {
    setColumnsListState(state: IState, action: IAction) {
      state.columnsListState = action.payload as IColumnsListState;
    },
    // addBoardToBoardsListState(state: IState, action: IAction) {
    //   state.boardsListState.data.push(action.payload as IBoardData);
    // },
    // removeBoardInBoardsListState(state: IState, action: IAction) {
    //   const desiredBoard = state.boardsListState.data.find(
    //     (itemData) => itemData._id === action.payload
    //   );
    //   if (!desiredBoard) return;

    //   const indexOfDesiredBoard = state.boardsListState.data.indexOf(desiredBoard);
    //   state.boardsListState.data.splice(indexOfDesiredBoard, 1);
    // },
    // editBoardInBoardsListState(state: IState, action: IAction) {
    //   const desiredBoard = state.boardsListState.data.find(
    //     (itemData) => itemData._id === (action.payload as IBoardData)._id
    //   );
    //   if (!desiredBoard) return;

    //   const indexOfDesiredBoard = state.boardsListState.data.indexOf(desiredBoard);
    //   state.boardsListState.data[indexOfDesiredBoard] = {
    //     ...state.boardsListState.data[indexOfDesiredBoard],
    //     ...(action.payload as IBoardData),
    //   };
    // },
    setTasksListState(state: IState, action: IAction) {
      const columnId = (action.payload as ITaskDataState).columnId;
      state.tasksListState[`${columnId}`] = {
        ...(action.payload as ITaskDataState),
      };
    },
  },
});

export const { setColumnsListState, setTasksListState } = slice.actions;
export default slice.reducer;
