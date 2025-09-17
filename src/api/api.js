import axios from 'axios';
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || 'http://localhost:3000/api',
  timeout: 15000,
});
const token = localStorage.getItem('token');
if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
api.interceptors.response.use(r => r, err => {
  if (err?.response?.status === 401) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // optionally redirect
  }
  return Promise.reject(err);
});
export default api;
