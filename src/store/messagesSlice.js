import { createSlice } from '@reduxjs/toolkit';

const messagesSlice = createSlice({
  name: 'messages',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addMessages: (state, action) => {
      state.items = action.payload;
    },
  },

});

export const { addMessages } = messagesSlice.actions;
export default messagesSlice.reducer;
