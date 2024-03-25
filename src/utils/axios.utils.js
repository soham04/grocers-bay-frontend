import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3002', // Replace with your backend API URL
    withCredentials: true, // Include credentials in cross-origin requests
});

export default api;
