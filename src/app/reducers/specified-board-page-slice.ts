import { createSlice } from '@reduxjs/toolkit';
import { IColumnsListState } from '../../pages/specified-bard-page/intefaces';

export enum EActionKind {
  setBoardsListState = 'setBoardsListState',
  addBoardToBoardsListState = 'addBoardToBoardsListState',
  removeBoardInBoardsListState = 'removeBoardInBoardsListState',
  editBoardInBoardsListState = 'editBoardInBoardsListState',
}

export interface IAction {
  type: string;
  payload: IColumnsListState | string;
}

export interface IState {
  columnsListState: IColumnsListState;
}

const defaultState: IState = {
  columnsListState: {
    isLoaded: false,
    error: null,
    data: [],
  },
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
  },
});

export const { setColumnsListState } = slice.actions;
export default slice.reducer;
