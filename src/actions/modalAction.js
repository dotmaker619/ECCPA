import * as types from './actionConstants';

export const ToggleModal = (title, data) => ({
    type: types.TOGGLE_MODAL,
    title,
    data
});
