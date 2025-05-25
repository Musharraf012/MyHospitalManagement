import axios from 'axios';

// Public Axios instance (no auth token attached)
export const axiosPublic = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Private Axios instance (adds x-access-token header automatically)
export const axiosPrivate = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to axiosPrivate to attach token
axiosPrivate.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access-token');
    if (token) {
      config.headers['x-access-token'] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
