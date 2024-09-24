import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userPrefarenceReducer from "./userPrefarenceSlice";
import userReducer from "./userSlice";
import messagesReducer from "./messagesSlice";
import singleMessageReducer from "./fetchSingleMessage";
import lessonsReducer from "./lessonSlice";
const store = configureStore({
  reducer: {
    theme: themeReducer,
    userPrefarence: userPrefarenceReducer,
    user: userReducer,
    lessons: lessonsReducer,
    messages: messagesReducer,
    singleMessage: singleMessageReducer,
  },
});

export default store;
