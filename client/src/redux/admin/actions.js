import { FETCH_TILES, FETCH_PRODUCTS, FETCH_MAP, ADD_TILE, ADD_PRODUCT, EDIT_TILE, EDIT_PRODUCT, DELETE_TILE, DELETE_PRODUCT, SET_MAP, SHOW_MODAL, HIDE_MODAL, SET_BODY, SET_FORM } from "./types"


export function fetchTiles() {
    return async dispatch => {
        try {
            const responce = await fetch('/api/admin/tiles')
            const tiles = await responce.json()

            dispatch({
                type: FETCH_TILES,
                payload: { tiles }
            })

        } catch (e) {

        }
    }
}

export function fetchProducts() {
    return async dispatch => {
        try {
            const responce = await fetch('/api/admin/products')
            const products = await responce.json()

            dispatch({
                type: FETCH_PRODUCTS,
                payload: { products }
            })

        } catch (e) {

        }
    }
}

export function fetchMap() {
    return async dispatch => {
        try {
            const responce = await fetch('/api/admin/map')
            const map = await responce.json()

            dispatch({
                type: FETCH_MAP,
                payload: { map: map.map[0] }
            })

            dispatch({
                type: FETCH_TILES,
                payload: { tiles: map.tiles }
            })
        } catch (e) {

        }
    }
}

export function addTile(data) {

    return async dispatch => {

        try {

            const responce = await fetch('/api/admin/add_tile', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            /* const message =  */await responce.json()

            dispatch({
                type: ADD_TILE
            })

            dispatch(fetchTiles())
        } catch (e) {

        }

    }
}

export function addProduct(data) {
    return async dispatch => {

        try {
            const responce = await fetch('/api/admin/add_product', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            /* const message = */ await responce.json()

            dispatch({
                type: ADD_PRODUCT
            })

            dispatch(fetchProducts())
        } catch (e) {

        }

    }
}

export function editTile(data, id) {
    return async dispatch => {

        try {
            const responce = await fetch('/api/admin/edit_tile/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            /* const message =  */await responce.json()


            dispatch({
                type: EDIT_TILE
            })

            dispatch(fetchTiles())
        } catch (e) {

        }

    }
}

export function editProduct(data, id) {
    return async dispatch => {

        try {
            const responce = await fetch('/api/admin/edit_product/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            /* const message = */ await responce.json()

            dispatch({
                type: EDIT_PRODUCT
            })

            dispatch(fetchProducts())
        } catch (e) {

        }

    }
}

export function deleteTile(id) {


    return async dispatch => {

        try {
            const responce = await fetch('/api/admin/delete_tile/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            /* const message =  */await responce.json()


            dispatch({
                type: DELETE_TILE
            })

            dispatch(fetchTiles())
        } catch (e) {

        }

    }
}

export function deleteProduct(id) {
    return async dispatch => {

        try {
            const responce = await fetch('/api/admin/delete_product/' + id, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' }
            })

            /* const message = */ await responce.json()

            dispatch({
                type: DELETE_PRODUCT
            })

            dispatch(fetchProducts())
        } catch (e) {

        }

    }
}

export function setMap(data) {
    return async dispatch => {

        try {
            const responce = await fetch('/api/admin/set_map', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            /* const message = */ await responce.json()

            dispatch({
                type: SET_MAP
            })
        } catch (e) {

        }

    }
}

export function showModal(options) {
    return {
        type: SHOW_MODAL,
        payload: {
            modal: {
                visible: true,
                ...options
            }
        }
    }
}

export function hideModal() {
    return {
        type: HIDE_MODAL
    }
}

export function setBody(body) {
    return {
        type: SET_BODY,
        payload: { body }
    }
}

export function setForm(form) {
    return {
        type: SET_FORM,
        payload: { form }
    }
}


