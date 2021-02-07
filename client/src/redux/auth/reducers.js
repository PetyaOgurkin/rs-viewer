import {  LOGIN, LOGOUT, STORAGE_NAME, VERIFY } from "./types"

const localData = JSON.parse(localStorage.getItem(STORAGE_NAME));

const initialState = {
    userId: localData ? localData.userId : null,
    token: localData ? localData.token : null,
    auth: false,
    loading: false
}

export const authReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case LOGIN:
            return { ...state, ...payload, auth: true }
        case LOGOUT:
            return { ...state, userId: null, token: null, auth: false }
        case VERIFY:
            return { ...state, ...payload, auth: true, loading: false }

        default:
            return state
    }
}
