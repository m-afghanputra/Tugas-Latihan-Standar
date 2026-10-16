import axios, { isAxiosError } from 'axios';
import { useAuthStore } from '../store/authStore';
import { setupMock } from '../mocks/setupMock';

// Membuat instance axios pusat
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor buat menyisipkan token jwt otomatis
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
  if (
    isAxiosError(error)&&
    error.response?.status === 401 &&
    error.config?.url !== '/auth/login'
  ) {
    useAuthStore.getState().logout();
    window.location.hash = '#/login';
  }
  return Promise.reject(error);
  },
);

// Pakai sever palsu kalau VITE_USE_MOCK bernilai 'true'
if (import.meta.env.VITE_USE_MOCK === 'true') {
  setupMock(api);
}

export default api;
