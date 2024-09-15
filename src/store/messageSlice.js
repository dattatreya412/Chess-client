import {createAsyncThunk, createSlice, isRejectedWithValue} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {

}

import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchMessages = createAsyncThunk(
    'messagess, fetchMessages',
    async(userId,{rejectWithValue})=>{
        try{
            const response = await axios.get('')
            console.log(response.data)
            return response.data
        }catch(err){
            return rejectWithValue(err.response.data)
        }
    }
)

export const sendMessage = createAsyncThunk(
  'message/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:4000/message/sendMessage', message);
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);


const messageSlice = createSlice({
    name : 'message',
    initialState,
    reducers : {

    }
})


export default messageSlice.reducer