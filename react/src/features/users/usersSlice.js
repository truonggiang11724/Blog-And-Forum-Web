import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../services/axiosInstance";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/users`;

export const fetchUsers = createAsyncThunk(`users/fetchUsers`, async (page) => {
    const res = await axiosInstance.get(`${API_URL}?page=${page}`);
    return res.data;
});

export const getUser = createAsyncThunk('users/getUser', async (id) => {
    const res = await axiosInstance.get(`${API_URL}/${id}`);
    return res.data;
})

export const createUser = createAsyncThunk('users/createUser', async (userData, thunkAPI) => {

    try {
        const res = await axiosInstance.post(API_URL, userData);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
});

export const updateUser = createAsyncThunk('users/updateUser', async ({ id, user }, thunkAPI) => {
    try {
        const res = await axiosInstance.put(`${API_URL}/${id}`, user);
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }

});

export const deleteUser = createAsyncThunk('users/delete', async ( id ) => {
    try {
        const res = await axiosInstance.delete(`${API_URL}/${id}`);
        return id;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }

});

export const usersSlice = createSlice({
    name: 'users',
    initialState: {
        list: [],
        userInfo: {},
        loading: false,
        error: null,
        notification: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // fetch case
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            // get user case
            .addCase(getUser.fulfilled, (state, action) => {
                state.loading = false;
                state.userInfo = action.payload;
            })
            // create case
            .addCase(createUser.fulfilled, (state, action) => {
                state.list.data.push(action.payload.data);
                state.loading = false;
                state.error = null;
                state.notification = 'Thêm người dùng thành công';
            })
            .addCase(createUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.errors;
            })
            // update case
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.list.data.findIndex(u => u.id === action.payload.data.id);
                if (index !== -1) state.list.data[index] = action.payload.data;
                state.loading = false;
                state.error = null;
                state.notification = 'Cập nhật người dùng thành công';
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.errors;
            })
            // delete case
            .addCase(deleteUser.fulfilled, (state, action) => {                
                state.list.data = state.list.data.filter(u => u.id !== action.payload);
                state.notification = 'Xóa người dùng thành công';
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.payload;
            })
    }
});


