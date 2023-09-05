// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// ** UseJWT import to get config
import useJwt from '../auth/jwt/useJwt'
const config = useJwt.jwtConfig


axios.defaults.baseURL = "http://localhost:3500";

const initialUser = () => {
  const item = window.localStorage.getItem("userData");
  return item ? JSON.parse(item) : {};
};


export const getUserData = createAsyncThunk("authentication/get-detail", async () => {
  const response = await axios.get("/auth/get-detail");
  return response.data;
});

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: initialUser(),
    otherData: {
      notifications: 0,
    },
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload
      state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
      state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
      localStorage.setItem('userData', JSON.stringify(action.payload))
      localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
      localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
    },
    handleRefresh: (state, action) => {
      state.userData = action.payload
    },
    handleLogout: (state, action) => {
      state.userData = {}
      localStorage.removeItem('userData')
      localStorage.removeItem(config.storageTokenKeyName)
      localStorage.removeItem(config.storageRefreshTokenKeyName)
      state[config.storageTokenKeyName] = null
      state[config.storageRefreshTokenKeyName] = null
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.otherData = action.payload.data;
    });
  }
 
});

export const {handleLogin, handleLogout} = authSlice.actions;

export default authSlice.reducer;
