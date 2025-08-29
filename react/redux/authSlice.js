import { createAsyncThunk, createSlice, TaskAbortError } from '@reduxjs/toolkit'
import authService from '../src/services/authService';
import { act } from 'react';

const token = localStorage.getItem('ACCESS_TOKEN') || null;
const user = localStorage.getItem('user') === undefined ? JSON.parse(localStorage.getItem('user')) : null;

// actions
export const loginUser = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
    try {
        const data = await authService.login(email, password);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message)
    }
});

export const signupUser = createAsyncThunk('/auth/signup', async ({ name, email, password, password_confirmation }, thunkAPI) => {
    try {
        console.log(password);
        console.log(password_confirmation);
        
        
        const data = await authService.signup(name, email, password, password_confirmation);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const fetchProfile = createAsyncThunk('/auth/profile', async (_, thunkAPI) => {
    try {
        const data = await authService.getProfile();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});

export const logoutUser = createAsyncThunk('/auth/logout', async (_, thunkAPI) => {
    try {
        const data = await authService.logout();
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
});



export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token,
        user,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // login case
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('ACCESS_TOKEN', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                state.error = action.payload;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // signup case
            .addCase(signupUser.fulfilled, (state, action) => {
                state.token = action.payload.token;
                state.user = action.payload.user;
                localStorage.setItem('ACCESS_TOKEN', action.payload.token);
                localStorage.setItem('user', JSON.stringify(action.payload.user));
                state.error = action.payload;
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // profile caser
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                localStorage.setItem('user', JSON.stringify(action.payload))
            })
            // logout case
            .addCase(logoutUser.fulfilled, (state) => {                
                state.token = null;                
                state.user = null;
                localStorage.removeItem('ACCESS_TOKEN');
                localStorage.removeItem('user');
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.error = action.payload;                
            })
    }
})