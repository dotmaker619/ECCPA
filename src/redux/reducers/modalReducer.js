import * as types from 'actions/actionConstants';

const initialState = {
    title: '',
    show: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TOGGLE_MODAL:
            return {
                ...state,
            }
        case types.OPEN_MODAL:
            return {
                ...state,
                show: action.payload.show,
                title: action.payload.title,
                data: action.payload.data
            }
        case types.CLOSE_MODAL:
            return {
                ...state,
                show: action.payload.show,
                title: action.payload.title
            }
        default:
            return state;
    }
}