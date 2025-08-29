import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from './authSlice'
import { usersSlice } from '../src/features/users/usersSlice'
import { postsSlice } from "../src/features/posts/postsSlice";
import { categoriesSlice } from "./categorySlice";
import { commentsSlice } from "../src/features/detailPost/comments/commentsSlice";

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        users: usersSlice.reducer,
        posts: postsSlice.reducer,
        categories: categoriesSlice.reducer,
        comments: commentsSlice.reducer,
    }
});