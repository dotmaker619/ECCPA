import { takeLatest, put, call } from "redux-saga/effects";
import serviceUtls from '../services/serviceUtils'
import {
    GET_DASHBOARD_DATA_SUCCESS,
    GET_DASHBOARD_DATA_REQUEST,
    GET_DASHBOARD_DATA_FAILED,
    LOADING_START,
    LOADING_END
} from "actions/actionConstants";

let service = new serviceUtls();

function* getDashboardData() {
    try {
        yield put({ type: LOADING_START })
        let assets = yield call(service.ApiGET, 'asset');
        let cashFlow = yield call(service.ApiGET, `cash-flow`);
        let creditor = yield call(service.ApiGET, 'creditor');
        let expenditure = yield call(service.ApiGET, 'expenditure');
        let income = yield call(service.ApiGET, 'income');
        let personalNetWorth = yield call(service.ApiGET, `personal-net-worth`);
        yield put({
            type: GET_DASHBOARD_DATA_SUCCESS,
            payload: {
                assets,
                cashFlow,
                creditor,
                expenditure,
                income,
                personalNetWorth
            }
        });
        yield put({ type: LOADING_END })
    } catch (error) {
        yield put({ type: GET_DASHBOARD_DATA_FAILED });
        yield put({ type: LOADING_END })
    }
}


function* DashboardActionWatcher() {
    yield takeLatest(GET_DASHBOARD_DATA_REQUEST, getDashboardData)
}

export default DashboardActionWatcher