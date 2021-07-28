import { takeLatest, put, call, } from "redux-saga/effects";
import * as types from 'actions/actionConstants';
import serviceUtls from '../services/serviceUtils'
import {
    GET_ASSETS_SUCCESS,
    GET_ASSETS_REQUEST,
    CREATE_ASSETS_REQUEST,
    CREATE_ASSETS_FAILED,
    LOADING_END,
    LOADING_START,
    GET_ASSETS_FAILED,
    DELETE_ASSETS_REQUEST,
    DELETE_ASSETS_FAILED,
    DELETE_ASSETS_SUCCESS,
    EDIT_ASSETS_REQUEST,
    EDIT_ASSETS_SUCCESS,
    EDIT_ASSETS_FAILED
} from "actions/actionConstants";
import notify from 'views/utils/notification';

let service = new serviceUtls();

function* getAssets() {
    try {
        yield put({ type: LOADING_START })
        let data = yield call(service.ApiGET, 'asset');
        yield put({ type: types.GET_TYPES_REQUEST, category: 'asset' })
        if (data.status === 'success') {
            yield put({ type: GET_ASSETS_SUCCESS, payload: { data: data.result } })
        } else {
            yield put({ type: GET_ASSETS_FAILED, payload: data.showMessage })
        }
        yield put({ type: LOADING_END });
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: GET_ASSETS_FAILED, payload: error })
    }
}

function* createAssets(asset) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiPOST, 'asset', asset.data)
        yield put({ type: GET_ASSETS_REQUEST });
        notify('success', 'Successfully Added', 'Assets');
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: CREATE_ASSETS_FAILED, payload: error })
        notify('error', error, 'ADding Assets')
    }
}

function* deleteAsset(payload) {
    try {
        yield put({ type: LOADING_START });
        yield call(service.ApiDELETE, `asset/${payload.id}`)
        yield put({ type: DELETE_ASSETS_SUCCESS });
        yield put({ type: GET_ASSETS_REQUEST });
        notify('success', 'Successfully removed', 'Assets');
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: DELETE_ASSETS_FAILED, payload: error });
        yield put({ type: GET_ASSETS_REQUEST });
        notify('error', error, 'Deleting Assets')
    }
}

function* editAsset(payload) {
    try {
        yield put({ type: LOADING_START });
        let data = yield call(service.ApiPUT, `asset`, payload.data)
        console.log("function*editAsset -> data", data)
        yield put({ type: EDIT_ASSETS_SUCCESS });
        yield put({ type: GET_ASSETS_REQUEST });
        notify('success', 'Successfully Updated', 'Assets')
    } catch (error) {
        yield put({ type: LOADING_END })
        yield put({ type: EDIT_ASSETS_FAILED, payload: error });
        yield put({ type: GET_ASSETS_REQUEST });
        notify('error', error, 'Editing Assets')
    }
}

function* assetsActionWatcher() {
    yield takeLatest(types.GET_ASSETS_REQUEST, getAssets)
    yield takeLatest(CREATE_ASSETS_REQUEST, createAssets)
    yield takeLatest(DELETE_ASSETS_REQUEST, deleteAsset)
    yield takeLatest(EDIT_ASSETS_REQUEST, editAsset)
}

export default assetsActionWatcher