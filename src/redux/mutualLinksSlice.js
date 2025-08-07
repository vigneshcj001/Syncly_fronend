import { createSlice } from "@reduxjs/toolkit";

const mutualLinksSlice = createSlice({
  name: "mutualLinks",
  initialState: [], 
  reducers: {
    setMutualLinks: (state, action) => action.payload,
    clearMutualLinks: () => [],
  },
});

export const { setMutualLinks, clearMutualLinks } = mutualLinksSlice.actions;
export default mutualLinksSlice.reducer;
