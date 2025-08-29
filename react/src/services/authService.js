import axiosInstance from "./axiosInstance";

const login = async (email, password) => {
    const res = await axiosInstance.post('/auth/login', {email, password});
    return res.data;
}
const signup = async (name, email, password, password_confirmation) => {
    
    const res = await axiosInstance.post('/auth/signup', {name, email, password, password_confirmation});
    return res.data;
}
const getProfile = async () => {
    const res = await axiosInstance.get('/auth/me');
    return res.data;
}
const logout = async () => {
    const res = await axiosInstance.post('/auth/logout');        
    return res.data;
}

export default {login, signup, getProfile, logout}