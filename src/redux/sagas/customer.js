import { takeLatest, put, call, } from "redux-saga/effects";
import serviceUtls from '../services/serviceUtils'
import {
    GET_CUSTOMER_SUCCESS,
    GET_CUSTOMER_REQUEST,
    LOADING_END,
    LOADING_START,
    GET_CUSTOMER_FAILED,
    EDIT_CUSTOMER_REQUEST,
    EDIT_CUSTOMER_SUCCESS,
    EDIT_CUSTOMER_FAILED
} from "actions/actionConstants";
import notify from 'views/utils/notification';

let service = new serviceUtls();

function* getCustomer() {
    try {
        yield put({ type: LOADING_START })
        let data = yield call(service.ApiGET, 'customer/me');
        if (data.status === 'Success') {
            yield put({ type: GET_CUSTOMER_SUCCESS, payload: { data: data.result } })
        } else {
            yield put({ type: GET_CUSTOMER_FAILED, payload: data.showMessage })
        }
        yield put({ type: LOADING_END });
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: GET_CUSTOMER_FAILED, payload: error })
    }
}

function* editCustomer(payload) {
    console.log("function*editCustomer -> payload", payload)
    try {
        yield put({ type: LOADING_START });
        let data = yield call(service.ApiPUT, `customer`, payload.data)
        console.log("function*editCustomer -> data", data)
        yield put({ type: EDIT_CUSTOMER_SUCCESS });
        yield put({ type: GET_CUSTOMER_REQUEST });
        notify('success', 'Successfully Updated', 'Assets')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: EDIT_CUSTOMER_FAILED, payload: error });
        yield put({ type: GET_CUSTOMER_REQUEST });
        notify('error', error, 'Editing Assets')
    }
}

function* customerActionWatcher() {
    yield takeLatest(GET_CUSTOMER_REQUEST, getCustomer)
    yield takeLatest(EDIT_CUSTOMER_REQUEST, editCustomer)
}

export default customerActionWatcher