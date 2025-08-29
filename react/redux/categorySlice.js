import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../src/services/axiosInstance";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/categories`;

export const getCategories = createAsyncThunk('categories/getCategories', async () => {    
    const res = await axiosInstance.get(API_URL);
    return res.data;
});

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        listCategory: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getCategories.fulfilled, (state, action) => {
            state.listCategory = action.payload;
        })
    }
})