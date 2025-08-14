import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    onlineUsers: [],
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    addMessage: (state, action) => {
      // Prevents adding a duplicate message if already present
      if (!state.messages.some((msg) => msg._id === action.payload._id)) {
        state.messages.push(action.payload);
      }
    },
    clearChat: (state) => {
      state.messages = [];
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
  },
});

export const { setMessages, addMessage, clearChat, setOnlineUsers } =
  chatSlice.actions;
export default chatSlice.reducer;
