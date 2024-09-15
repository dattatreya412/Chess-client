import {createSlice, createAsyncThunk, isRejectedWithValue} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    friends : [],
    pendingFriendRequest : [],
    blockedFriendRequest : []
}
const friendsSlice = createSlice({
    name : 'friends-connection',
    initialState,
    reducers : {

    },
    extraReducers : (builder)=>{
        // builder.addCase(,(state, action)=>{

        // })
    }
})

export const fetchFriends = createAsyncThunk(
    'friends/fetchFriends',
    async(user, {RejectedWithValue})=>{
        try{
            const response = await axios.post('http://localhost:4000/connectFriend', {user})
            return response.data
        }catch(err){
            return RejectedWithValue(err.response.data)
        }  
    }
)

export default friendsSlice.reducer