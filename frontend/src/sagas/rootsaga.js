// rootSaga.js
import { all } from 'redux-saga/effects';
import { authSaga } from './authsaga';

export default function* rootSaga() {
    yield all([
        authSaga()
        // other sagas
    ]);
}
