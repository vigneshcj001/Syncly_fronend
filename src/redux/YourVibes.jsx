import { createSlice } from "@reduxjs/toolkit";

const yourVibes = createSlice({
  name: "yourVibes", 
  initialState: null,
  reducers: {
    addYourVibes: (state, action) => action.payload,
    removeYourVibes: () => null,
  },
});

export const { addYourVibes, removeYourVibes } = yourVibes.actions;
export default yourVibes.reducer;
