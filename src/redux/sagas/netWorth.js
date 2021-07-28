import { takeLatest, put, call, } from "redux-saga/effects";
import serviceUtls from '../services/serviceUtils'
import {
    GET_NET_WORTH_SUCCESS,
    GET_NET_WORTH_REQUEST,
    GET_NET_WORTH_FAILED,
    LOADING_START,
    LOADING_END
} from "actions/actionConstants";

let service = new serviceUtls();

function* getNetWorth() {
    try {
        yield put({ type: LOADING_START })
        let data = yield call(service.ApiGET, `personal-net-worth`);
        yield put({ type: GET_NET_WORTH_SUCCESS, payload: { data: data.result } })
        yield put({ type: LOADING_END })
    } catch (error) {
        yield put({ type: GET_NET_WORTH_FAILED, payload: error })
        yield put({ type: LOADING_END })
    }
}


function* NetWorthActionWatcher() {
    yield takeLatest(GET_NET_WORTH_REQUEST, getNetWorth)
}

export default NetWorthActionWatcher