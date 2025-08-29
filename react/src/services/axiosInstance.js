import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`,
    headers: {
        "Content-Type": 'application/json',
    }
})

// Thêm token vào LocalStorage
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('ACCESS_TOKEN');
    if (token) {        
        config.headers.Authorization = `Bearer ${token}`;
    }    
    
    return config;
})

// Xóa token khi đăng xuất
axiosInstance.interceptors.response.use((response) => {
    return response
}, (error) => {
    const {response} = error;
    if (response.status === 401){
        localStorage.removeItem('ACCESS_TOKEN');
        localStorage.removeItem('user');
    } else if (response.status === 404) {
        //Notfound
    }
    throw error
})

export default axiosInstance;