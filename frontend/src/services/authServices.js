import { toast } from 'react-toastify';
import { axiosPrivate, axiosPublic } from './axiosInstance';

export const signUp = async (userData) => {
  try {
    const response = await axiosPublic.post('auth/signup', userData);
    return response.data;
  } catch (error) {
    // Throw the error message so saga can catch it
    toast.error('Registration failed. Please try again.');
    throw error.response?.data?.message || error.message;
  }
};

export const signIn = async (credentials) => {
  try {
    const response = await axiosPublic.post('auth/signin', credentials);
    return response.data;
  } catch (error) {
    toast.error('Login failed. Please check your credentials.');
    throw error.response?.data?.message || error.message;
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const response = await axiosPublic.post('auth/refreshtoken', { refreshToken });
    return response.data;
  } catch (error) {
    toast.error('Failed to refresh token. Please log in again.');
    throw error.response?.data?.message || error.message;
  }
};

