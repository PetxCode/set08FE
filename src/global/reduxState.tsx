import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userState: "",
};

const reduxState = createSlice({
  name: "schoolProject",
  initialState,
  reducers: {
    user: (state, { payload }) => {
      state.userState = payload;
    },
  },
});

export const { user } = reduxState.actions;

export default reduxState.reducer;
