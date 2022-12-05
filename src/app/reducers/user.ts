import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'user',
  initialState: { current: null },
  reducers: {
    loginUser(state, { payload }) {
      localStorage.setItem('user', JSON.stringify(payload));
      state.current = payload;
    },
    logOut(state) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_token_exp_date');
      localStorage.removeItem('user');
      state.current = null;
    },
  },
});

export const { loginUser, logOut } = slice.actions;
export default slice.reducer;
