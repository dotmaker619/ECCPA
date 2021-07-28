import { takeLatest, put, call, } from "redux-saga/effects";
import serviceUtls from '../services/serviceUtils'
import {
    GET_CASH_FLOW_SUCCESS,
    GET_CASH_FLOW_REQUEST,
    GET_CASH_FLOW_FAILED,
    LOADING_START,
    LOADING_END
} from "actions/actionConstants";

let service = new serviceUtls();

function* getCashFlow(payload) {
    let { date } = payload;
    let endpoint = date.start ? `cash-flow?from=${date.start}&to=${date.end}` : `cash-flow`
    try {
        yield put({ type: LOADING_START })
        let data = yield call(service.ApiGET, endpoint);
        yield put({ type: GET_CASH_FLOW_SUCCESS, payload: { data: data.result } })
        yield put({ type: LOADING_END })
    } catch (error) {
        yield put({ type: GET_CASH_FLOW_FAILED, payload: error })
        yield put({ type: LOADING_END })
    }
}


function* CashFlowActionWatcher() {
    yield takeLatest(GET_CASH_FLOW_REQUEST, getCashFlow)
}

export default CashFlowActionWatcher