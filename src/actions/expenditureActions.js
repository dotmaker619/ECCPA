import * as types from './actionConstants';

export const getExpenditure = () => ({
    type: types.GET_EXPENDITURE_REQUEST,
});

export const editExpenditure = (data) => ({
    type: types.EDIT_EXPENDITURE_REQUEST,
    data
});

export const createExpenditure = (data) => ({
    type: types.CREATE_EXPENDITURE_REQUEST,
    data
});

export const deleteExpenditure = (id) => ({
    type: types.DELETE_EXPENDITURE_REQUEST,
    id
})