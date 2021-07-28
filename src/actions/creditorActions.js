import * as types from './actionConstants';

export const getCreditor = () => ({
    type: types.GET_CREDITOR_REQUEST,
});

export const editCreditor = (data) => ({
    type: types.EDIT_CREDITOR_REQUEST,
    data
});

export const createCreditor = (data) => ({
    type: types.CREATE_CREDITOR_REQUEST,
    data
});

export const deleteCreditor = (id) => ({
    type: types.DELETE_CREDITOR_REQUEST,
    id
})