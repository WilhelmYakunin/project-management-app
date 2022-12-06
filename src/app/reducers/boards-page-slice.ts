import { createSlice } from '@reduxjs/toolkit';
import { IBoardData } from '../../features/boards-item/interfaces';

export interface IAction {
  type: string;
  payload: IBoardsListState | IBoardData | string;
}

export interface IState {
  boardsListState: IBoardsListState;
}

export interface IBoardsListState {
  isLoaded: boolean;
  data: IBoardData[];
  error: null | string;
}

const defaultState: IState = {
  boardsListState: {
    isLoaded: false,
    error: null,
    data: [],
  },
};

const slice = createSlice({
  name: 'boardsPage',
  initialState: defaultState,
  reducers: {
    setBoardsListState(state: IState, action: IAction) {
      state.boardsListState = action.payload as IBoardsListState;
    },
    addBoardToBoardsListState(state: IState, action: IAction) {
      state.boardsListState.data.push(action.payload as IBoardData);
    },
    removeBoardInBoardsListState(state: IState, action: IAction) {
      const desiredBoard = state.boardsListState.data.find(
        (itemData) => itemData._id === action.payload
      );
      if (!desiredBoard) return;

      const indexOfDesiredBoard = state.boardsListState.data.indexOf(desiredBoard);
      state.boardsListState.data.splice(indexOfDesiredBoard, 1);
    },
    editBoardInBoardsListState(state: IState, action: IAction) {
      const desiredBoard = state.boardsListState.data.find(
        (itemData) => itemData._id === (action.payload as IBoardData)._id
      );
      if (!desiredBoard) return;

      const indexOfDesiredBoard = state.boardsListState.data.indexOf(desiredBoard);
      state.boardsListState.data[indexOfDesiredBoard] = {
        ...state.boardsListState.data[indexOfDesiredBoard],
        ...(action.payload as IBoardData),
      };
    },
  },
});

export const {
  setBoardsListState,
  addBoardToBoardsListState,
  removeBoardInBoardsListState,
  editBoardInBoardsListState,
} = slice.actions;
export default slice.reducer;
