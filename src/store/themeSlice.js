import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { value: "dark" },
  reducers: {
    toggle: (state) => {
      if (state.value === "dark") {
        state.value = "light";
      } else {
        state.value = "dark";
      }
    },
  },
});

export const { toggle } = themeSlice.actions;
export default themeSlice.reducer;
