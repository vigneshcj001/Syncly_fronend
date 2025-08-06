import { createSlice } from "@reduxjs/toolkit";

const vibesSlice = createSlice({
  name: "vibes",
  initialState: [],
  reducers: {
    setVibes: (state, action) => action.payload,
  },
});

export const { setVibes } = vibesSlice.actions;
export default vibesSlice.reducer;
