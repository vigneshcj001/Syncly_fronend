import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import vibesReducer from "./VibesSlice"

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    vibes: vibesReducer,
  },
});

export default appStore;
