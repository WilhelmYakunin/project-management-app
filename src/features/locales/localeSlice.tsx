import { createSlice } from '@reduxjs/toolkit';

export interface LocaleState {
    lang: string,
}

const initialState: LocaleState = {
    lang: 'ru',
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (state, action) => {
        state.lang = action.payload
    },
  },
})

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;
