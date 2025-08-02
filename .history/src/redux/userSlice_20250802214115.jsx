import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.profile = action.payload;
    },
    removeUser: (state) => {
      state.profile = null;
    },
  },
}