import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('temple_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('temple_token');
      localStorage.removeItem('temple_user');
    }
    return Promise.reject(error);
  }
);

// === Auth ===
export const loginUser = (data) => api.post('/auth/login', data);
export const registerUser = (data) => api.post('/auth/register', data);
export const getMe = () => api.get('/auth/me');

// === Temples ===
export const getTemples = (params) => api.get('/temples', { params });
export const getFeaturedTemples = () => api.get('/temples/featured');
export const getTempleById = (id) => api.get(`/temples/${id}`);
export const getTempleStates = () => api.get('/temples/states');
export const getTempleStats = () => api.get('/temples/stats');

export const createTemple = (formData) =>
  api.post('/temples', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const updateTemple = (id, formData) =>
  api.put(`/temples/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
export const deleteTemple = (id) => api.delete(`/temples/${id}`);

// === Reviews ===
export const getReviews = (templeId) => api.get(`/temples/${templeId}/reviews`);
export const createReview = (templeId, data) => api.post(`/temples/${templeId}/reviews`, data);

export const UPLOADS_URL = import.meta.env.VITE_UPLOADS_URL || 'http://localhost:5000';

export default api;
