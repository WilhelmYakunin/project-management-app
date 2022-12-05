import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: 'token',
  initialState: null,
  reducers: {
    setToken(state, { payload }) {
      return payload
    },
    resetToken(state, { payload }) {
      return null
    }
  },
})

export const { setToken, resetToken } = slice.actions
export default slice.reducer
