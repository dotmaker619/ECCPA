import { takeLatest, put, call, } from "redux-saga/effects";
import serviceUtls from '../services/serviceUtils'
import {
    GET_TYPES_SUCCESS,
    GET_TYPES_REQUEST,
    GET_TYPES_FAILED,
} from "actions/actionConstants";

let service = new serviceUtls();

function* getTypes(payload) {
    try {
        let data = yield call(service.ApiGET, `type/get/${payload.category}`);
        yield put({ type: GET_TYPES_SUCCESS, payload: { data: data.result } })
    } catch (error) {
        yield put({ type: GET_TYPES_FAILED, payload: error })
    }
}


function* typesActionWatcher() {
    yield takeLatest(GET_TYPES_REQUEST, getTypes)
}

export default typesActionWatcher