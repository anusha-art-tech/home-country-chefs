import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export const chefsAPI = {
  getAll: () => api.get('/chefs'),
  getById: (id) => api.get(`/chefs/${id}`),
  getByCuisine: (cuisine) => api.get(`/chefs/cuisine/${cuisine}`),
};

export const bookingsAPI = {
  create: (bookingData) => api.post('/bookings', bookingData),
  getUserBookings: () => api.get('/bookings/user'),
  getChefBookings: () => api.get('/bookings/chef'),
  updateStatus: (id, status) => api.patch(`/bookings/${id}/status`, { status }),
};

export const reviewsAPI = {
  create: (reviewData) => api.post('/reviews', reviewData),
  getByChef: (chefId) => api.get(`/reviews/chef/${chefId}`),
};

export default api;