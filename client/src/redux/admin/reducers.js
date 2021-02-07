import { FETCH_TILES, FETCH_PRODUCTS, FETCH_MAP, ADD_TILE, ADD_PRODUCT, EDIT_TILE, EDIT_PRODUCT, DELETE_TILE, DELETE_PRODUCT, SET_MAP, HIDE_MODAL, SET_BODY, SHOW_MODAL, SET_FORM } from "./types"

const initialState = {
    products: [],
    tiles: [],
    map: {},
    modal: {
        visible: false
    },
    body: null

}

export const adminReducer = (state = initialState, { type, payload }) => {

    switch (type) {

        case FETCH_TILES:
            return { ...state, ...payload }

        case FETCH_PRODUCTS:
            return { ...state, ...payload }

        case FETCH_MAP:
            return { ...state, ...payload }

        case ADD_TILE:
            return { ...state }

        case ADD_PRODUCT:
            return { ...state }

        case EDIT_TILE:
            return { ...state }

        case EDIT_PRODUCT:
            return { ...state }

        case DELETE_TILE:
            return { ...state }

        case DELETE_PRODUCT:
            return { ...state }

        case SET_MAP:
            return { ...state }

        case SHOW_MODAL:
            return { ...state, ...payload }

        case HIDE_MODAL:
            return { ...state, modal: { ...state.modal, visible: false } }

        case SET_BODY:
            return { ...state, ...payload }

        case SET_FORM:
            return { ...state, modal: { ...state.modal, ...payload } }

        default:
            return state
    }
}
