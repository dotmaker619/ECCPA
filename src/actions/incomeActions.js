import * as types from './actionConstants';

export const getIncome = () => ({
    type: types.GET_INCOME_REQUEST,
});

export const editIncome = (data) => ({
    type: types.EDIT_INCOME_REQUEST,
    data
});

export const createIncome = (data) => ({
    type: types.CREATE_INCOME_REQUEST,
    data
});

export const deleteIncome = (id) => ({
    type: types.DELETE_INCOME_REQUEST,
    id
})