import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice";
import mutualReducer from "./mutualLinksSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    mutual: mutualReducer,
  },
});

export default appStore;
