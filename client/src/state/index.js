import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginSuccess } = userSlice.actions;

export default userSlice.reducer;
