import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import userPrefarenceReducer from "./userPrefarenceSlice";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    userPrefarence: userPrefarenceReducer,
    user: userReducer,
  },
});

export default store;
