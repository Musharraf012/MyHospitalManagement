import { call, put, takeLatest } from 'redux-saga/effects';
import {
    signUpRequest,
    signUpSuccess,
    signUpFailure,
    signInRequest,
    signInSuccess,
    signInFailure,
    refreshTokenRequest,
    refreshTokenSuccess,
    refreshTokenFailure
} from '../slices/authSlice';
import { refreshToken, signIn, signUp } from '../services/authServices';
import { toast } from 'react-toastify';

// Worker Sagas

function* handleSignUp(action) {
    try {
        const response = yield call(signUp, action.payload);
        // Assume response has user, token, refreshToken on success
        if (response.error) {
            throw new Error(response.error);
        }
        yield put(signUpSuccess(response));
        toast.success('Registration successful! Please log in.');
    } catch (error) {
        yield put(signUpFailure(error.message));
    }
}

function* handleSignIn(action) {
    try {
        const response = yield call(signIn, action.payload);
        if (response.error) {
            throw new Error(response.error);
        }
        yield put(signInSuccess(response));
        toast.success('Login successful!');
    } catch (error) {
        yield put(signInFailure(error.message));
    }
}

function* handleRefreshToken(action) {
    try {
        const response = yield call(refreshToken, action.payload);
        if (response.error) {
            throw new Error(response.error);
        }
        yield put(refreshTokenSuccess(response));
    } catch (error) {
        yield put(refreshTokenFailure(error.message));
    }
}

// Watcher Sagas
export function* authSaga() {
    yield takeLatest(signUpRequest.type, handleSignUp);
    yield takeLatest(signInRequest.type, handleSignIn);
    yield takeLatest(refreshTokenRequest.type, handleRefreshToken);
}
