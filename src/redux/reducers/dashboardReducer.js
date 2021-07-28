import * as types from 'actions/actionConstants';

const initialState = {
    status: false,
    errors: '',
    data: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_DASHBOARD_DATA_SUCCESS:
            return {
                ...state,
                status: true,
                errors: '',
                data: action.payload
            }
        case types.GET_DASHBOARD_DATA_FAILED:
            return {
                ...state,
                status: false,
                errors: action.payload,
                data: {}
            }
        default:
            return state;
    }
}