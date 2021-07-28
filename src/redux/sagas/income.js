import { takeLatest, put, call, } from "redux-saga/effects";
import * as types from 'actions/actionConstants';
import serviceUtls from '../services/serviceUtils'
import {
    GET_INCOME_SUCCESS,
    GET_INCOME_REQUEST,
    CREATE_INCOME_REQUEST,
    CREATE_INCOME_FAILED,
    LOADING_END,
    LOADING_START,
    GET_INCOME_FAILED,
    DELETE_INCOME_REQUEST,
    DELETE_INCOME_FAILED,
    DELETE_INCOME_SUCCESS
} from "actions/actionConstants";
import notify from 'views/utils/notification';
import { EDIT_INCOME_REQUEST } from "actions/actionConstants";
import { EDIT_INCOME_SUCCESS } from "actions/actionConstants";
import { EDIT_INCOME_FAILED } from "actions/actionConstants";

let service = new serviceUtls();

function* getIncomes() {
    try {
        yield put({ type: LOADING_START })
        let data = yield call(service.ApiGET, 'income');
        yield put({ type: types.GET_TYPES_REQUEST, category: 'income' })
        yield put({ type: LOADING_END });
        yield put({ type: GET_INCOME_SUCCESS, payload: { data: data.result } })
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: GET_INCOME_FAILED, payload: error })
    }
}

function* createIncome(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiPOST, 'income', payload.data)
        yield put({ type: GET_INCOME_REQUEST })
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: CREATE_INCOME_FAILED, payload: error })
    }
}

function* deleteIncome(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiDELETE, `income/${payload.id}`)
        yield put({ type: DELETE_INCOME_SUCCESS });
        yield put({ type: GET_INCOME_REQUEST });
        notify('success', 'Successfully removed', 'Incomes')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: DELETE_INCOME_FAILED, payload: error });
        yield put({ type: GET_INCOME_REQUEST });
        notify('error', error, 'Deleting Incomes')
    }
}

function* editIncome(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiPUT, `income`, payload.data)
        yield put({ type: EDIT_INCOME_SUCCESS });
        yield put({ type: GET_INCOME_REQUEST });
        notify('success', 'Successfully Updated', 'Incomes')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: EDIT_INCOME_FAILED, payload: error });
        yield put({ type: GET_INCOME_REQUEST });
        notify('error', error, 'Editing Incomes')
    }
}

function* IncomesActionWatcher() {
    yield takeLatest(types.GET_INCOME_REQUEST, getIncomes)
    yield takeLatest(CREATE_INCOME_REQUEST, createIncome)
    yield takeLatest(DELETE_INCOME_REQUEST, deleteIncome)
    yield takeLatest(EDIT_INCOME_REQUEST, editIncome)
}

export default IncomesActionWatcher