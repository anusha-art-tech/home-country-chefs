import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7002/api';
const TOKEN_KEY = 'origin-foods-token';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const getRequestConfig = (payload) => (
  payload instanceof FormData
    ? { headers: { 'Content-Type': 'multipart/form-data' } }
    : undefined
);

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const tokenStorage = {
  get: () => localStorage.getItem(TOKEN_KEY),
  set: (token) => localStorage.setItem(TOKEN_KEY, token),
  clear: () => localStorage.removeItem(TOKEN_KEY),
};

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData, getRequestConfig(userData)),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  updateDetails: (payload) => api.put('/auth/updatedetails', payload),
  updatePassword: (payload) => api.put('/auth/updatepassword', payload),
};

export const chefsAPI = {
  getAll: (params = {}) => api.get('/chefs', { params }),
  getById: (id) => api.get(`/chefs/${id}`),
  getTop: (limit = 4) => api.get('/chefs/top', { params: { limit } }),
  search: (params = {}) => api.get('/chefs/search', { params }),
  updateProfile: (id, payload) => api.put(`/chefs/${id}`, payload, getRequestConfig(payload)),
  getCuisines: (id) => api.get(`/chefs/${id}/cuisines`),
  createCuisine: (id, payload) => api.post(`/chefs/${id}/cuisines`, payload),
  updateCuisine: (id, cuisineId, payload) => api.put(`/chefs/${id}/cuisines/${cuisineId}`, payload),
  deleteCuisine: (id, cuisineId) => api.delete(`/chefs/${id}/cuisines/${cuisineId}`),
};

export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  getChefBookings: () => api.get('/bookings/chef'),
  getById: (id) => api.get(`/bookings/${id}`),
  updateStatus: (id, status) => api.put(`/bookings/${id}/status`, { status }),
  cancel: (id, reason) => api.put(`/bookings/${id}/cancel`, { reason }),
};

export const reviewsAPI = {
  create: (reviewData) => api.post('/reviews', reviewData),
  getByChef: (chefId) => api.get(`/reviews/chef/${chefId}`),
  getMine: () => api.get('/reviews/user'),
  update: (id, payload) => api.put(`/reviews/${id}`, payload),
  remove: (id) => api.delete(`/reviews/${id}`),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (payload) => api.put('/users/profile', payload),
  getBookings: () => api.get('/users/bookings'),
  getReviews: () => api.get('/users/reviews'),
  getFavorites: () => api.get('/users/favorites'),
  addFavorite: (chefId) => api.post(`/users/favorites/${chefId}`),
  removeFavorite: (chefId) => api.delete(`/users/favorites/${chefId}`),
  getStats: () => api.get('/users/stats'),
};

export const adminAPI = {
  getStats: () => api.get('/admin/stats'),
  getUsers: () => api.get('/admin/users'),
  getChefs: () => api.get('/admin/chefs'),
  getBookings: () => api.get('/admin/bookings'),
  updateUserRole: (id, role) => api.put(`/admin/users/${id}/role`, { role }),
  verifyChef: (id) => api.put(`/admin/chefs/${id}/verify`),
};

export default api;
