import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import localeReducer from '../features/locales/localeSlice';
import modalReducer from '../features/modals/modalsSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    locale: localeReducer,
    modal: modalReducer,
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
