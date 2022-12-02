import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import userReducer from './reducers/user';
import localeReducer from '../features/locales/localeSlice';
import boardsPageReducer from './reducers/boards-page-slice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    locale: localeReducer,
    boardsPage: boardsPageReducer,
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
