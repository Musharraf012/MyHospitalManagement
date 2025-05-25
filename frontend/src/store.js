// store.js
import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import authSlice from './slices/authSlice'
import rootSaga from './sagas/rootsaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth:authSlice

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
