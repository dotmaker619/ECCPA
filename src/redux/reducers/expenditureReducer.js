import * as types from 'actions/actionConstants';

const initialState = {
    status: false,
    errors: '',
    data: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.GET_EXPENDITURE_SUCCESS:
            return {
                ...state,
                status: true,
                errors: '',
                data: action.payload.data
            }
        case types.GET_EXPENDITURE_FAILED:
            return {
                ...state,
                status: false,
                errors: action.payload,
                isLoading: false,
                data: []
            }
        default:
            return state;
    }
}