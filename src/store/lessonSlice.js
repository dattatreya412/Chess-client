import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching lessons
export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async () => {
    const response = await axios.get('http://localhost:4000/lesson');
    return response.data;
  }
);

const lessonSlice = createSlice({
  name: 'lessons',
  initialState: {
    lessons: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchLessons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.lessons = action.payload;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default lessonSlice.reducer;



