// your/user/slice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    clearUser: () => null,
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUser = (state) => {
  return state.user;
};

export default userSlice.reducer;
