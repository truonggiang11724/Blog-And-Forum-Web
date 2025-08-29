import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";
import { data, redirect } from "react-router-dom";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/posts`;

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (filter = {}, thunkAPI) => {
    try {
        const res = await axiosInstance.get(API_URL, { params: filter });
        return res.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
})

export const fetchPersonalPosts = createAsyncThunk('posts/fetchPersonalPosts', async (filter = {}, thunkAPI) => {
    try {
        const res = await axiosInstance.get(API_URL, { params: filter });
        return res.data;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.response?.data || e.message);
    }
})

export const getPost = createAsyncThunk('posts/getPost', async (id) => {
    const res = await axiosInstance.get(`${API_URL}/${id}`);
    return res.data;
})

export const createPost = createAsyncThunk('posts/createPost', async (postData, thunkAPI) => {
    try {
        // tao form data de gui du lieu anh        
        const formData = new FormData();
        formData.append('user_id', postData.user_id);
        formData.append('category_id', postData.category_id);
        formData.append('title', postData.title);
        formData.append('content', postData.content);
        if (postData.thumbnail) formData.append('thumbnail', postData.thumbnail);
        formData.append('status', postData.status);

        const res = await axiosInstance.post(API_URL, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, form }, thunkAPI) => {

    try {
        const formData = new FormData();
        console.log(form);
        formData.append('_method', 'PUT');
        formData.append('category_id', form.category_id);
        formData.append('title', form.title);
        formData.append('content', form.content);
        if (form.thumbnail) formData.append('thumbnail', form.thumbnail);
        formData.append('status', form.status);

        const res = await axiosInstance.post(`${API_URL}/${id}`, formData, {
            headers: {
                "Content-Type": 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const deletePost = createAsyncThunk('posts/deletePost', async (id, thunkAPI) => {

    try {
        const res = await axiosInstance.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
})

export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        list: [],
        personalList: [],
        loading: false,
        error: null,
        postInfo: {},
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch post case
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                console.log(action);
                
                if (action.payload.meta && action.payload.meta.current_page == 1)
                    state.list = action.payload;
                else state.list.data = [...state.list.data, ...action.payload.data]
                state.loading = false;
            })
            // fetch personalPost case
            .addCase(fetchPersonalPosts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPersonalPosts.fulfilled, (state, action) => {
                if (action.payload.meta && action.payload.meta.current_page == 1)
                    state.personalList = action.payload;
                else state.personalList.data = [...state.personalList.data, ...action.payload.data]
                state.loading = false;
            })
            // get case
            .addCase(getPost.pending, (state) => {
                state.loading = true
            })
            .addCase(getPost.fulfilled, (state, action) => {
                state.postInfo = action.payload;
                state.loading = false;
            })
            // create case
            .addCase(createPost.fulfilled, (state, action) => {
                state.list.data.unshift(action.payload);
                state.loading = false;
            })
            .addCase(createPost.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // update case
            .addCase(updatePost.pending, (state) => {
                state.loading = true
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                console.log(action);

                const index = state.list.data.findIndex(u => u.id === action.payload.data.id);
                if (index !== -1) state.list.data[index] = action.payload.data;
                state.loading = false;
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            // delete case
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.list.data = state.list.data.filter(p => p.id !== action.meta.arg);
                state.loading = false;
            })
    }

})