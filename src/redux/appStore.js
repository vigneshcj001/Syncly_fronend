import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import mutualReducer from "./mutualLinksSlice";
import vibesReducer from "./vibesSlices";
import chatReducer from "./chatSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    mutual: mutualReducer,
    vibes: vibesReducer,
    chat: chatReducer,
  },
});

export default appStore;
