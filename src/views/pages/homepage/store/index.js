// ** Redux Imports
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


axios.defaults.baseURL = "http://localhost:3500";


export const handleCreatePost = createAsyncThunk("post/create-post", async (formData) => {
    const response = await axios.post("/post/create-post", formData);
    return response.data;
})

export const getPostsList = createAsyncThunk("post/get-posts", async (data) => {
  const response = await axios.post("/post/get-posts", data);
  return {postData: response.data, page: data.page, perPageItem: data.perPageItem};
});


export const handlePostDelete = createAsyncThunk("post/delete-post", async (data) => {
  const response = await axios.post("/post/delete-post", data);
  return response.data;
});

export const updatePostLikeDislike = createAsyncThunk("post/update-post-like-dislike", async (data) => {
  const response = await axios.post("/post/update-post-like-dislike", data);
  return response.data;
});

export const getPostById = createAsyncThunk("post/get-post-by-id", async (data) => {
  const response = await axios.post("/post/get-post-by-id", data);
  return response.data;
});

export const updatePostList = createAsyncThunk("post/update-post-list", async (data) => {
  return data;
});


export const postSlice = createSlice({
  name: "posts",
  initialState: {
    creatingPosts: false,
    allPosts: {data: [], hasMore: false},
    currentPage: 1,
    perPageItem: 2,
    searchTerm: "",
    selectedPost: null,

  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(handleCreatePost.pending, (state, action) => {
      state.creatingPosts = true
    })
    builder.addCase(handleCreatePost.fulfilled, (state, action) => {
      state.creatingPosts = false
    });
    builder.addCase(handleCreatePost.rejected, (state, action) => {
      state.creatingPosts = false
    });
    builder.addCase(getPostsList.pending, (state, action) => {
      // console.log("pending")
    });
    builder.addCase(getPostsList.fulfilled, (state, action) => {
      state.allPosts = {data: [...state.allPosts.data, ...action.payload.postData.data.data], hasMore: action.payload.postData.data.hasMore}
      state.currentPage = action.payload.page;
      state.perPageItem = action.payload.perPageItem;
    });
    builder.addCase(getPostsList.rejected, (state, action) => {
      // console.log("rejected")
    });
    builder.addCase(handlePostDelete.pending, (state, action) => {
      // console.log("pending")
    });
    builder.addCase(handlePostDelete.fulfilled, (state, action) => {
      console.log("fulfilled")
    });
    builder.addCase(updatePostList.fulfilled, (state, action) => {
      state.allPosts = {data: action.payload.data, hasMore: action.payload.hasMore}
    });
  }
 
});

export const {} = postSlice.actions;

export default postSlice.reducer;
