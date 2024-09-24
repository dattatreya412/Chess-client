import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the initial state
const initialState = {
  _id : "",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  country: "",
  bio: "", 
  isLive: false,
  isPlaying : false, 
  token: "", 
  isAuthenticated: false,
  playedGames: [],
  playerMessages: [],
  playerNotes: "", // Initialize as an empty string
  notes: [],
  // playerFriends: "",
  status: "idle",
  error: null,
  puzzles: [],
  userNames : [],
  userNamesForMessages : [],
  messagesList : [],
  liveGames : [],
  news: null,
  latestNews: [],
  boardTheme: 'default',
  iconTheme: 'default'
};
//code here
export const findUserNames= createAsyncThunk(
  "user/findUsername",
  async(searchText, {rejectWithValue})=>{
    try{
      const response = await axios.get('http://localhost:4000/user/findAll/user', {
        params: { searchText }  // Use `params` to pass query parameters
      });
      console.log(JSON.stringify(response.data.usernames))
      return response.data.usernames
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
)

export const findUserNamesForMessages= createAsyncThunk(
  "user/findUsernameForMessages",
  async(searchText, {rejectWithValue})=>{
    try{
      const response = await axios.get('http://localhost:4000/user/findAll/user', {
        params: { searchText }  // Use `params` to pass query parameters
      });
      console.log(JSON.stringify(response.data.usernames))
      return response.data.usernames
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
)

export const sendReport = createAsyncThunk(
  "help/sendReport", 
  async({message, userId},{rejectWithValue})=>{
    try{
      const response = await axios.post('http://localhost:4000/help/send-report', {message, userId}) 
      console.log(response.data)
      return response.data
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
)

export const initMessageList = createAsyncThunk(
  'messagesList/init',
  async(_, {rejectWithValue})=>{
    try{
      const response = await axios.post('http://localhost:4000/messageList/initMessage')
      console.log(response.data.messageId)
      return response.data.messageId
    }catch(err){
      rejectWithValue(err.response.data)
    }
  }
)

export const fetchLiveGames = createAsyncThunk(
  'watch/fetchLiveGames',
  async(_,{rejectWithValue})=>{
    try{
      const response = await axios.get('http://localhost:4000/watch')
      console.log(response.data)
      return response.data.liveGames
    }catch(err){
      rejectWithValue(err.response.data)
    }
  }
)

export const updateStatus = createAsyncThunk(
  "user/updateStatus",
  async({objectId, isLive}, {rejectWithValue})=>{
    try{
      console.log(objectId)
      const response = await axios.put(`http://localhost:4000/user/isLive/${objectId}`, {isLive} )
      return response.data
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
)
// Thunks for asynchronous operations
export const fetchUser = createAsyncThunk(
  "user/fetchUser",

  async (userName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:4000/user/${userName}`);
      // console.log(JSON.stringify(response.data.data))
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "user/deleteNote",
  async ({ notesId, notesIndex }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:4000/notes/${notesId}/${notesIndex}`);
      return { ...response.data, deletedIndex: notesIndex };
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occurred");
    }
  }
);

export const fetchRatedPuzzles = createAsyncThunk(
  "puzzles/fetchRatedPuzzles",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/puzzles");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addNote = createAsyncThunk(
  "user/addNote",
  async ({ notesId, note }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/notes/${notesId}`,
        { note }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occurred");
    }
  }
);

export const fetchNotes = createAsyncThunk(
  "user/fetchNotes",
  async (notesId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/notes/${notesId}`
      );
      return response.data.data.notes;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Unexpected error occurred");
    }
  }
);

export const fetchMessagesList = createAsyncThunk(
  'messagesList/fetchMessagesList',
  async(userId,{rejectWithValue})=>{
    try{
      const response = await axios.get(`http://localhost:4000/messageList/${userId}`)
      console.log(response.data.list)
      return response.data.list[0].messagesList
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
)

export const sendMessage = createAsyncThunk(
  "message/sendMessage",
  async({sentBy, sentTo, message},{rejectWithValue})=>{
    try{
      const response = await axios.post('http://localhost:4000/message/sendMessage',
        {
          sentBy,
          sentTo,
          message
        }
      )
      return response.data
    }catch(err){
      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/news/api/highlights");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching news");
    }
  }
);

export const fetchLatestNews = createAsyncThunk(
  "news/fetchLatestNews",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/news/api/news");
      console.log(response.data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "An error occurred while fetching news");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser", 
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/user/${userData.id}`, userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateChessboardTheme = createAsyncThunk(
  "user/updateChessboardTheme",
  async ({theme, userId}, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/user/${userId}/boardTheme`, { boardTheme: theme });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update chessboard theme");
    }
  }
);

export const updateIconTheme = createAsyncThunk(
  "user/updateIconTheme",
  async ({icon, userId}, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:4000/user/${userId}/iconTheme`, { iconTheme: icon });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update icon theme");
    }
  }
);

// Create the user slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo(state, action) {
      const {
        _id,
        username,
        firstName,
        lastName,
        email,
        country,
        bio,
        isLive,
        isPlaying,
        playedGames,
        playerMessages,
        playerNotes,
        boardTheme,
        iconTheme,
        // playerFriends,
      } = action.payload;
      state._id = _id
      state.username = username;
      state.firstName = firstName;
      state.lastName = lastName;
      state.email = email;
      state.country = country;
      state.bio = bio;
      state.isLive = isLive;
      state.isPlaying = isPlaying;
      state.playedGames = playedGames;
      state.playerMessages = playerMessages;
      state.playerNotes = playerNotes; // playerNotes as a string
      state.boardTheme = boardTheme;
      state.iconTheme = iconTheme;
      // state.playerFriends = playerFriends;
    },
    setAuth(state, action) {
      const { token, isAuthenticated } = action.payload;
      state.token = token;
      state.isAuthenticated = isAuthenticated;
    },
    addPlayedGame(state, action) {
      state.playedGames.push(action.payload);
    },
    addPlayerMessage(state, action) {
      state.playerMessages.push(action.payload);
    },
    // addPlayerFriend(state, action) {
    //   state.playerFriends.push(action.payload);
    // },
    removePlayedGame(state, action) {
      state.playedGames = state.playedGames.filter(
        (gameId) => gameId !== action.payload
      );
    },
    removePlayerMessage(state, action) {
      state.playerMessages = state.playerMessages.filter(
        (messageId) => messageId !== action.payload
      );
    },
    // removePlayerFriend(state, action) {
    //   state.playerFriends = state.playerFriends.filter(
    //     (friendId) => friendId !== action.payload
    //   );
    // },
    clearUser(state) {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const {
          _id,
          username,
          firstName,
          lastName,
          email,
          country,
          bio,
          isLive,
          isPlaying,
          playedGames,
          playerMessages,
          playerNotes,
          boardTheme,
          iconTheme,
          // playerFriends,
        } = action.payload;
        state._id = _id
        state.username = username;
        state.firstName = firstName;
        state.lastName = lastName;
        state.email = email;
        state.country = country;
        state.bio = bio;
        state.isLive = isLive;
        state.isPlaying = isPlaying;
        state.playedGames = playedGames;
        state.playerMessages = playerMessages;
        state.playerNotes = playerNotes; // playerNotes as a string
        state.boardTheme = boardTheme;
        state.iconTheme = iconTheme;
        // state.playerFriends = playerFriends;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const {
          _id,
          username,
          firstName,
          lastName,
          email,
          country,
          bio,
          isLive,
          isPlaying,
          playedGames,
          playerMessages,
          playerNotes,
          boardTheme,
          iconTheme,
          // playerFriends,
        } = action.payload;
        state._id = _id
        state.username = username;
        state.firstName = firstName;
        state.lastName = lastName;
        state.email = email;
        state.country = country;
        state.bio = bio;
        state.isLive = isLive;
        state.isPlaying = isPlaying
        state.playedGames = playedGames;
        state.playerMessages = playerMessages;
        state.playerNotes = playerNotes; // playerNotes as a string
        state.boardTheme = boardTheme;
        state.iconTheme = iconTheme;
        // state.playerFriends = playerFriends;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchNotes.fulfilled, (state, action) => {
        state.notes = action.payload; // Correctly update notes state
      })
      .addCase(fetchRatedPuzzles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchRatedPuzzles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.puzzles = action.payload; // Replace puzzles with fetched data
      })
      .addCase(fetchRatedPuzzles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateStatus.fulfilled,(state, action)=>{
        state.status = "succeeded"
        state.isLive = action.payload
      })
      // .addCase(findUserNames.pending, (state)=>{
      //   state.status = "loading"
      // })
      // .addCase(findUserNames.rejected, (state,action)=>{
      //   state.status = "failed"
      //   state.err = action.payload
      // })
      .addCase(findUserNames.fulfilled,(state, action)=>{
        state.status = "succeeded"
        state.userNames = action.payload
      })
      .addCase(fetchLiveGames.fulfilled, (state, action)=>{
        state.liveGames = action.payload
      })
      .addCase(initMessageList.fulfilled, (state,action )=>{
        state.playerMessages = action.payload
      })
      .addCase(findUserNamesForMessages.fulfilled, (state, action)=>{
        state.userNamesForMessages = action.payload
      })
      .addCase(fetchMessagesList.fulfilled, (state, action)=>{
        state.messagesList = action.payload
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = state.notes.filter((_, index) => index !== action.payload.deletedIndex);
      })
      .addCase(fetchLatestNews.fulfilled, (state, action) => {
        state.latestNews = action.payload;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.news = action.payload;
      })
      .addCase(updateChessboardTheme.fulfilled, (state, action) => {
        state.boardTheme = action.payload.boardTheme;
      })
      .addCase(updateIconTheme.fulfilled, (state, action) => {
        state.iconTheme = action.payload.iconTheme;
      });
  },
});

// Export actions
export const {
  setUserInfo,
  setAuth,
  addPlayedGame,
  addPlayerMessage,
  addPlayerFriend,
  removePlayedGame,
  removePlayerMessage,
  removePlayerFriend,
  clearUser,
} = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
