import * as types from './actionConstants';

export const getCashFlow = (start, end) => ({
    type: types.GET_CASH_FLOW_REQUEST,
    date: { start, end }
});