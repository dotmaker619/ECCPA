import * as types from './actionConstants';

export const getAssets = () => ({
    type: types.GET_ASSETS_REQUEST,
});

export const editAssets = (data) => ({
    type: types.EDIT_ASSETS_REQUEST,
    data
});

export const createAssets = (data) => ({
    type: types.CREATE_ASSETS_REQUEST,
    data
});

export const deleteAssets = (id) => ({
    type: types.DELETE_ASSETS_REQUEST,
    id
})