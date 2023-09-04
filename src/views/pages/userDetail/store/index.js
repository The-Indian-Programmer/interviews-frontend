// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3500";


export const getUserDetails = createAsyncThunk("user/get-details", async (formData) => {
    const response = await axios.post("/user/get-details", formData);
    return response.data;
})


export const updateProfile = createAsyncThunk("user/update-profile", async (formData) => {
    const response = await axios.post("/user/update-profile", formData);
    return response.data;
});

export const updateFollowStatus = createAsyncThunk("user/update-follow-status", async (formData) => {
    const response = await axios.post("/user/update-follow-status", formData);
    return response.data;
});


export const postSlice = createSlice({
  name: "userdetails",
  initialState: {
    selectedUser: {},
  },
  reducers: {},
  extraReducers: builder => {
    
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.selectedUser = action.payload.data;
    });
  }
 
});

export const {} = postSlice.actions;

export default postSlice.reducer;
