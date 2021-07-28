import { all, takeLatest, put, select } from "redux-saga/effects";
import * as types from 'actions/actionConstants';

import authActionWatcher from './auth';
import assetsActionWatcher from './assets';
import incomeActionWatcher from './income';
import expenditureActionWatcher from './expenditure';
import creditorActionWatcher from './creditor';
import typesActionWatcher from './types';
import NetWorthActionWatcher from './netWorth';
import CashFlowActionWatcher from './cashFlow';
import DashboardActionWatcher from './dashboard';
import CustomerActionWatcher from './customer';

function* ToggleModal(payload) {
    let state = yield select();
    if (state.modal.show) {
        yield put({ type: types.CLOSE_MODAL, payload: { title: payload.title, show: false } })
    } else {
        yield put({ type: types.GET_TYPES_REQUEST, category: payload.title.toLowerCase() })
        yield put({ type: types.OPEN_MODAL, payload: { title: payload.title, show: true, data: payload.data } })
    }
}
function* actionWatcher() {
    yield takeLatest(types.TOGGLE_MODAL, ToggleModal);
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
        authActionWatcher(),
        assetsActionWatcher(),
        incomeActionWatcher(),
        expenditureActionWatcher(),
        creditorActionWatcher(),
        typesActionWatcher(),
        NetWorthActionWatcher(),
        CashFlowActionWatcher(),
        DashboardActionWatcher(),
        CustomerActionWatcher()
    ])
}