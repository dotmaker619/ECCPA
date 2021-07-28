import { takeLatest, put, call, takeEvery } from "redux-saga/effects";
import * as types from 'actions/actionConstants';
import axios from 'axios';
import env from '../services/env';
import { REGISTER_SUCCESS } from "actions/actionConstants";
import { REGISTER_FAILED } from "actions/actionConstants";
import { RESET_PWD_REQUEST } from "actions/actionConstants";
import { RESET_PWD_FAILED } from "actions/actionConstants";
import { RESET_PWD_SUCCESS } from "actions/actionConstants";


function authApi(user, type) {
    let endpoint = ''
    if (type === 'forgotpwd') {
        endpoint = `customer/forgot-password/${user.email}`
    } else {
        endpoint = type === 'login' ? 'auth/login' : 'customer/signup';
    }
    let config = {
        method: 'post',
        url: `${env.BASE_URL}${endpoint}`,
        headers: {
            'X-Requested-With': `XMLHttpRequest`,
            'Content-Type': 'application/json',
        },
        data: type !== 'forgotpwd' ? JSON.stringify(user) : {}
    }
    return axios(config).then((result) => {
        return result.data
    }).catch((err) => {
        throw err
    });
}
function* login(payload) {
    try {
        let token = yield call(authApi, payload.user, 'login');
        localStorage.setItem('token', JSON.stringify(token));
        yield put({ type: types.LOGIN_SUCCESS });
        window.location.href = ('/')
    } catch (error) {
        localStorage.removeItem('token')
        yield put({ type: types.LOGIN_FAILED, payload: { message: 'Invalid Email or Password' } })
        // return false
    }
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/auth/login'
}

function* register(payload) {
    try {
        let response = yield call(authApi, payload.user, 'signup');
        if (response && response.showMessage) {
            yield put({ type: REGISTER_SUCCESS });
            let user = {
                username: payload.user.email,
                password: payload.user.password
            }
            yield put({ type: types.LOGIN_REQUEST, user })
        } else {
            yield put({ type: REGISTER_FAILED, payload: { message: response } })
        }

    } catch (error) {
        yield put({ type: REGISTER_FAILED, payload: { message: error.message } })
    }
}

function* resetpwd(payload) {
    try {
        let { email } = payload;
        let response = yield call(authApi, email, 'forgotpwd')
        if (response.status === 'success') {
            yield put({ type: RESET_PWD_SUCCESS, payload: { message: response.showMessage } })
        } else if (response.status === 'fail') {
            yield put({ type: RESET_PWD_FAILED, payload: { message: response.showMessage } })
        }
    } catch (error) {
        yield put({ type: RESET_PWD_FAILED })
    }
}
function* authActionWatcher() {
    yield takeLatest(types.LOGIN_REQUEST, login)
    yield takeLatest(types.REGISTER_REQUEST, register)
    yield takeLatest(RESET_PWD_REQUEST, resetpwd)
    yield takeEvery(types.LOGOUT, logout);
}

export default authActionWatcher