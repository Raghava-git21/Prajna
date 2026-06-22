import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('temple_admin_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('temple_admin_token');
      localStorage.removeItem('temple_admin_user');
    }
    return Promise.reject(error);
  }
);

export const loginUser = (data) => api.post('/auth/login', data);
export const getTemples = (params) => api.get('/temples', { params });
export const getTempleById = (id) => api.get(`/temples/${id}`);
export const getTempleStats = () => api.get('/temples/stats');
export const createTemple = (formData) => api.post('/temples', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateTemple = (id, formData) => api.put(`/temples/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteTemple = (id) => api.delete(`/temples/${id}`);

export default api;
