import { createSlice } from "@reduxjs/toolkit";
import unknown from "../assets/unkonwn.jpg";

const userPreferenceSlice = createSlice({
  name: "preference",
  initialState: {
    userName: "dattatreya_412",
    time: 10,
    userProfileImg: unknown,
    token: "",
  },
  reducers: {
    setUserName(state, action) {
      state.userName = action.payload;
    },
    setTime(state, action) {
      state.time = action.payload;
    },
    setUserProfileImg(state, action) {
      state.time = action.payload;
    },
    setUserToken(state, action) {
      state.token = action.payload;
    },
  },
});

export const { setUserName, setTime, setUserToken } =
  userPreferenceSlice.actions;
export default userPreferenceSlice.reducer;
