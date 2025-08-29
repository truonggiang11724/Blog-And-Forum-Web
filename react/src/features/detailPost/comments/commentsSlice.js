import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/axiosInstance";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/comments`;

export const fetchComments = createAsyncThunk('comments/getComments', async ( filter = {}, thunkAPI) => {
    try {
        const res = await axiosInstance.get(API_URL, {params: filter});
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.message || error.message);
    }
});

export const createComment = createAsyncThunk('comments/createComment', async (commentData, thunkAPI) => {
    try {
        const res = await axiosInstance.post(API_URL, commentData);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.message || error.message);
    }
});

export const updateComment = createAsyncThunk('comments/updateComment', async ({ id, commentData }, thunkAPI) => {
    try {                
        const res = await axiosInstance.put(`${API_URL}/${id}`, commentData);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.message || error.message);
    }
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (id, thunkAPI) => {
    try {
        const res = await axiosInstance.delete(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.message || error.message);
    }
});

export const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        listComment: [],
        error: null,
        loading: false,

    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComments.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.listComment = action.payload;
                state.loading = false;
            })
            .addCase(createComment.fulfilled, (state, action) => {                
                state.listComment.data.unshift(action.payload);
                state.loading = false;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                const index = state.listComment.data.findIndex(c => c.id === action.payload.data.id);
                state.listComment.data[index] = action.payload.data;
                state.loading = false;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.listComment.data = state.listComment.data.filter(c => c.id !== action.meta.arg)
                state.loading = false
            })
    }

});