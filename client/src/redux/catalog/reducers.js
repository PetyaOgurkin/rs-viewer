import { ADD_PRODUCT_ON_MAP, FETCH_PRODUCTS, HIDE_CATALOG, INIT_CATALOG, REMOVE_PRODUCT_FROM_MAP, SHOW_CATALOG, UPDATE_SELECTED_PRODUCTS } from "./types";

const initialState = {
    products: [],
    selectedProducts: [],
    init: false,
    visible: false
}

export const catalogReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case INIT_CATALOG: return { ...state, init: true }
        case SHOW_CATALOG: return { ...state, visible: true }
        case HIDE_CATALOG: return { ...state, visible: false }
        case FETCH_PRODUCTS: return { ...state, products: payload }

        case ADD_PRODUCT_ON_MAP:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, payload]
            }

        case REMOVE_PRODUCT_FROM_MAP:
            return {
                ...state,
                selectedProducts: state.selectedProducts.filter(product => product._id !== payload._id)
            }

        case UPDATE_SELECTED_PRODUCTS: return { ...state, selectedProducts: payload }

        default: return state
    }
}
