import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor — Attach JWT token
api.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('marilla_user');
    if (userInfo) {
      const { token } = JSON.parse(userInfo);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor — Handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('marilla_user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/* ═══════════════════════════════════════════════════
   Auth API
   ═══════════════════════════════════════════════════ */

export const loginUser = async (email, password) => {
  const { data } = await api.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await api.post('/auth/register', { name, email, password });
  return data;
};

/* ═══════════════════════════════════════════════════
   Rooms API
   ═══════════════════════════════════════════════════ */

export const getRooms = async (filters = {}) => {
  const params = new URLSearchParams();
  if (filters.type) params.append('type', filters.type);
  if (filters.minPrice) params.append('minPrice', filters.minPrice);
  if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
  if (filters.available !== undefined && filters.available !== '') {
    params.append('available', filters.available);
  }
  const { data } = await api.get(`/rooms?${params.toString()}`);
  return data;
};

export const getRoom = async (id) => {
  const { data } = await api.get(`/rooms/${id}`);
  return data;
};

/* ═══════════════════════════════════════════════════
   Reservations API
   ═══════════════════════════════════════════════════ */

export const createReservation = async (reservationData) => {
  const { data } = await api.post('/reservations', reservationData);
  return data;
};

export const getMyReservations = async () => {
  const { data } = await api.get('/reservations/my');
  return data;
};

export const cancelReservation = async (id) => {
  const { data } = await api.put(`/reservations/${id}/cancel`);
  return data;
};

export const getRoomReservations = async (roomId) => {
  const { data } = await api.get(`/reservations/room/${roomId}`);
  return data;
};

export default api;
