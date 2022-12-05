import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from './reducers/user';
import localeReducer from '../features/locales/localeSlice';
<<<<<<< HEAD
import modalReducer from '../features/modals/modalsSlice';
=======
import boardsPageReducer from './reducers/boards-page-slice';
import specifiedBoardPageReducer from './reducers/specified-board-page-slice';
>>>>>>> develop

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    locale: localeReducer,
<<<<<<< HEAD
    modal: modalReducer,
=======
    boardsPage: boardsPageReducer,
    specifiedBoardPage: specifiedBoardPageReducer,
>>>>>>> develop
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
