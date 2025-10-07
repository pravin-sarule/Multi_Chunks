import axios from 'axios';

const API = axios.create({
  baseURL: 'https://multi-chunks-backend-110685455967.asia-south1.run.app', // Adjust if your backend runs on a different port
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export const registerUser = (userData) => API.post('/api/auth/register', userData);
export const loginUser = (credentials) => API.post('/api/auth/login', credentials);

export default API;