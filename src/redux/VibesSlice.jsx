import { createSlice } from "@reduxjs/toolkit";

const vibes = createSlice({
  name: "vibes",
  initialState: [],
  reducers: {
    addYourVibes: (state, action) => action.payload,
    removeYourVibes: () => [],
  },
});

export const { addYourVibes, removeYourVibes } = vibes.actions;
export default vibes.reducer;
