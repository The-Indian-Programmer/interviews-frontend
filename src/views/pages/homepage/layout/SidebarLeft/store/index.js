// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


import {API_URL} from "../../../../../../configs/Contants";

axios.defaults.baseURL = API_URL;


export const getUsersList = createAsyncThunk("users/get-users", async (data) => {
  const response = await axios.post("/user/get-users", data);
  return {postData: response.data, page: data.page, perPageItem: data.perPageItem};
});



export const userSlice = createSlice({
  name: "users",
  initialState: {
    allUsers: {data: [], hasMore: false},
    currentPage: 1,
    perPageItem: 100,
    

  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getUsersList.fulfilled, (state, action) => {
      state.allUsers = action.payload.postData.data;
      state.currentPage = action.payload.page;
      state.perPageItem = action.payload.perPageItem;
    });
  }
 
});

export const {} = userSlice.actions;

export default userSlice.reducer;
