import * as types from './actionConstants';

export const login = (user) => ({
    type: types.LOGIN_REQUEST,
    user
});

export const register = (user) => ({
    type: types.REGISTER_REQUEST,
    user
});

export const clearErr = () => ({
    type: types.CLRERR
})

export const logout = () => ({
    type: types.LOGOUT
});

export const resetpwd = (email) => ({
    type: types.RESET_PWD_REQUEST,
    email
})