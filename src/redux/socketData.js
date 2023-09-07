// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "axios";

// ** UseJWT import to get config
import useJwt from '../auth/jwt/useJwt'
const config = useJwt.jwtConfig


import {API_URL} from "../configs/Contants";

axios.defaults.baseURL = API_URL;


export const initialState = createAsyncThunk("socketData/initiateSocket", async (data) => {
    return data;
});

export const updateOnlineStatus = createAsyncThunk("socketData/updateOnlineStatus", async (data) => {
    return data;
});

export const updateUserSocketId = createAsyncThunk("socketData/updateUserSocketId", async (data) => {
    return data;
});

const socketSlice = createSlice({
    name: "socketData",
    initialState: {
        onlineUsers: [],
        userSocketId: null,
        socket: null,
    },
    extraReducers: (builder) => {
        builder.addCase(initialState.fulfilled, (state, action) => {
            state.socket = action.payload;
        });
        builder.addCase(updateOnlineStatus.fulfilled, (state, action) => {
            console.log(action.payload)

            state.onlineUsers = action.payload;
        });
        builder.addCase(updateUserSocketId.fulfilled, (state, action) => {
            state.userSocketId = action.payload;
        })
    },
});

export const { } = socketSlice.actions;

export default socketSlice.reducer;