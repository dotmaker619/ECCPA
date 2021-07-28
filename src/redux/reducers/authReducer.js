import * as types from 'actions/actionConstants';

const initialState = {
    status: false,
    errors: '',
    isLoading: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case types.LOGIN_SUCCESS:
            console.log(action);
            return {
                ...state,
                status: true,
                errors: '',
                isLoading: false
            }
        case types.LOGIN_FAILED:
            return {
                ...state,
                status: false,
                isLoading: false,
                errors: action.payload.message
            }
        case types.REGISTER_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                status: true,
                isLoading: false
            }
        case types.REGISTER_FAILED:
            return {
                ...state,
                status: false,
                errors: action.payload.message,
                isLoading: false
            }
        case types.RESET_PWD_REQUEST:
            return {
                ...state,
                isLoading: true
            }
        case types.RESET_PWD_SUCCESS:
            return {
                ...state,
                status: true,
                message: action.payload.message,
                isLoading: false
            }
        case types.RESET_PWD_FAILED:
            return {
                ...state,
                status: false,
                errors: action.payload.message,
                isLoading: false
            }
        case types.CLRERR:
            return {
                ...state,
                errors: ''
            }
        default:
            return state;
    }
}