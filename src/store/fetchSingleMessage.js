import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching a single message
export const fetchSingleMessage = createAsyncThunk(
  'singleMessage/fetchSingleMessage',
  async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/message/${id}`);
      console.log(response.data.response)
      return response.data.response;
    } catch (error) {
      throw new Error('Failed to fetch message');
    }
  }
);

const singleMessageSlice = createSlice({
  name: 'singleMessage',
  initialState: {
    message: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSingleMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSingleMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload;
      })
      .addCase(fetchSingleMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default singleMessageSlice.reducer;
