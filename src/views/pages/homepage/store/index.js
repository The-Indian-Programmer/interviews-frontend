// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


import {API_URL} from "../../../../configs/Contants";

axios.defaults.baseURL = API_URL;


export const handleCreateTask = createAsyncThunk("task/create-task", async (formData) => {
    const response = await axios.post("/task/create-task", formData);
    return response.data;
})

export const handleUpdateTask = createAsyncThunk("task/update-task", async (formData) => {
    const response = await axios.post("/task/update-task", formData);
    return response.data;
})

export const handleDeleteTask = createAsyncThunk("task/delete-task", async (formData) => {
    const response = await axios.post("/task/delete-task", formData);
    return response.data;
})

export const handleUpdateTaskStatus = createAsyncThunk("task/update-task-status", async (formData) => {
    const response = await axios.post("/task/update-task-status", formData);
    return response.data;
})

export const handleGetAllTasks = createAsyncThunk("task/get-all-tasks", async (formData) => {
    const response = await axios.post("/task/get-all-tasks", formData);
    return {data: response.data, page: formData.page, perPageItem: formData.perPageItem, searchTerm: formData.searchTerm, filter: formData.filter, order: formData.order, orderBy: formData.orderBy};
});






export const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    allTasks: {data: [], hasMore: false},
    currentPage: 1,
    perPageItem: 5,
    searchTerm: "",
    filter: {
        status: "",
        priority: ""
    },
    order: "desc",
    orderBy: "createdAt",
    selectedTask: null

  },
  reducers: {},
  extraReducers: builder => {
        builder.addCase(handleGetAllTasks.fulfilled, (state, action) => {
            state.allTasks = action.payload.data;
            state.currentPage = action.payload.page;
            state.perPageItem = action.payload.perPageItem;
            state.searchTerm = action.payload.searchTerm;
            state.filter = action.payload.filter;
            state.order = action.payload.order;
            state.orderBy = action.payload.orderBy;
        });
  }
 
});

export const {} = taskSlice.actions;

export default taskSlice.reducer;