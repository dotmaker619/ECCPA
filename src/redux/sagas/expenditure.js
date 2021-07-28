import { takeLatest, put, call, } from "redux-saga/effects";
import * as types from 'actions/actionConstants';
import serviceUtls from '../services/serviceUtils'
import {
    GET_EXPENDITURE_SUCCESS,
    GET_EXPENDITURE_REQUEST,
    CREATE_EXPENDITURE_REQUEST,
    CREATE_EXPENDITURE_FAILED,
    LOADING_END,
    LOADING_START,
    GET_EXPENDITURE_FAILED,
    DELETE_EXPENDITURE_REQUEST,
    DELETE_EXPENDITURE_FAILED,
    DELETE_EXPENDITURE_SUCCESS,
    EDIT_EXPENDITURE_REQUEST,
    EDIT_EXPENDITURE_SUCCESS,
    EDIT_EXPENDITURE_FAILED
} from "actions/actionConstants";
import notify from 'views/utils/notification';

let service = new serviceUtls();

function* getExpenditure() {
    try {
        yield put({ type: LOADING_START })
        yield put({ type: types.GET_TYPES_REQUEST, category: 'expenditure' })
        let data = yield call(service.ApiGET, 'expenditure');
        yield put({ type: GET_EXPENDITURE_SUCCESS, payload: { data: data.result } })
        yield put({ type: LOADING_END });
    } catch (error) {
        yield put({ type: LOADING_END });
        yield put({ type: GET_EXPENDITURE_FAILED, payload: error });
    }
}

function* createExpenditure(expenditure) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiPOST, 'expenditure', expenditure.data)
        yield put({ type: GET_EXPENDITURE_REQUEST })
        notify('success', 'Successfully Added', 'Expenditure')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: CREATE_EXPENDITURE_FAILED, payload: error })
        notify('error', error, 'Adding Expenditure')
    }
}

function* deleteexpenditure(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiDELETE, `expenditure/${payload.id}`)
        yield put({ type: DELETE_EXPENDITURE_SUCCESS });
        yield put({ type: GET_EXPENDITURE_REQUEST });
        notify('success', 'Successfully removed', 'Expenditure')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: DELETE_EXPENDITURE_FAILED, payload: error });
        yield put({ type: GET_EXPENDITURE_REQUEST });
        notify('error', error, 'Deleting Expenditure')
    }
}

function* editexpenditure(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiPUT, `expenditure`, payload.data)
        yield put({ type: EDIT_EXPENDITURE_SUCCESS });
        yield put({ type: GET_EXPENDITURE_REQUEST });
        notify('success', 'Successfully Updated', 'Expenditure')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: EDIT_EXPENDITURE_FAILED, payload: error });
        yield put({ type: GET_EXPENDITURE_REQUEST });
        notify('error', error, 'Editing Expenditure')
    }
}

function* ExpenditureActionWatcher() {
    yield takeLatest(types.GET_EXPENDITURE_REQUEST, getExpenditure)
    yield takeLatest(CREATE_EXPENDITURE_REQUEST, createExpenditure)
    yield takeLatest(DELETE_EXPENDITURE_REQUEST, deleteexpenditure)
    yield takeLatest(EDIT_EXPENDITURE_REQUEST, editexpenditure)
}

export default ExpenditureActionWatcher