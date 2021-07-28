import * as types from './actionConstants';

export const getCustomer = () => ({
    type: types.GET_CUSTOMER_REQUEST,
});

export const editCustomer = (data) => ({
    type: types.EDIT_CUSTOMER_REQUEST,
    data
});