import { takeLatest, put, call, } from "redux-saga/effects";
import * as types from 'actions/actionConstants';
import serviceUtls from '../services/serviceUtils'
import {
    GET_CREDITOR_SUCCESS,
    GET_CREDITOR_REQUEST,
    CREATE_CREDITOR_REQUEST,
    CREATE_CREDITOR_FAILED,
    LOADING_END,
    LOADING_START,
    GET_CREDITOR_FAILED,
    DELETE_CREDITOR_REQUEST,
    DELETE_CREDITOR_FAILED,
    DELETE_CREDITOR_SUCCESS,
    EDIT_CREDITOR_REQUEST,
    EDIT_CREDITOR_SUCCESS,
    EDIT_CREDITOR_FAILED
} from "actions/actionConstants";
import notify from 'views/utils/notification';

let service = new serviceUtls();

function* getCreditor() {
    try {
        yield put({ type: LOADING_START })
        let data = yield call(service.ApiGET, 'creditor');
        yield put({ type: types.GET_TYPES_REQUEST, category: 'creditor' })
        if (data.status === 'success') {
            yield put({ type: GET_CREDITOR_SUCCESS, payload: { data: data.result } })
        } else {
            yield put({ type: GET_CREDITOR_FAILED, payload: data.showMessage })
        }
        yield put({ type: LOADING_END });
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: GET_CREDITOR_FAILED, payload: error })
    }
}

function* createCreditor(payload) {
    try {
        yield put({ type: LOADING_START });
        let result = yield call(service.ApiPOST, 'creditor', payload.data)
        yield put({ type: GET_CREDITOR_REQUEST });
        if (result.id) {
            notify('success', 'Successfully Added', 'Creditor');
        } else {
            notify('error', result, 'Creditor')
        }
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: CREATE_CREDITOR_FAILED, payload: error })
        notify('error', error, 'ADding Creditor')
    }
}

function* deletecreditor(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiDELETE, `creditor/${payload.id}`)
        yield put({ type: DELETE_CREDITOR_SUCCESS });
        yield put({ type: GET_CREDITOR_REQUEST });
        notify('success', 'Successfully removed', 'Creditor');
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: DELETE_CREDITOR_FAILED, payload: error });
        yield put({ type: GET_CREDITOR_REQUEST });
        notify('error', error, 'Deleting Creditor')
    }
}

function* editcreditor(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiPUT, `creditor`, payload.data)
        yield put({ type: EDIT_CREDITOR_SUCCESS });
        yield put({ type: GET_CREDITOR_REQUEST });
        notify('success', 'Successfully Updated', 'Creditor')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: EDIT_CREDITOR_FAILED, payload: error });
        yield put({ type: GET_CREDITOR_REQUEST });
        notify('error', error, 'Editing Creditor')
    }
}

function* CreditorActionWatcher() {
    yield takeLatest(types.GET_CREDITOR_REQUEST, getCreditor)
    yield takeLatest(CREATE_CREDITOR_REQUEST, createCreditor)
    yield takeLatest(DELETE_CREDITOR_REQUEST, deletecreditor)
    yield takeLatest(EDIT_CREDITOR_REQUEST, editcreditor)
}

export default CreditorActionWatcher