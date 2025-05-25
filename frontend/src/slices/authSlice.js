import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  refreshToken: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Sign Up
    signUpRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signUpSuccess(state, action) {
      state.loading = false;
      state.error = null;
    },
    signUpFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    // Sign In
    signInRequest(state) {
      state.loading = true;
      state.error = null;
    },
    signInSuccess(state, action) {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
      state.error = null;
    },
    signInFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },

    // Refresh Token
    refreshTokenRequest(state) {
      state.loading = true;
      state.error = null;
    },
    refreshTokenSuccess(state, action) {
      state.loading = false;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
    },
    refreshTokenFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.refreshToken = null;
    },

    // Logout
    logout(state) {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  signInRequest,
  signInSuccess,
  signInFailure,
  refreshTokenRequest,
  refreshTokenSuccess,
  refreshTokenFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
