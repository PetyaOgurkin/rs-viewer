import {  LOGIN, LOGOUT, STORAGE_NAME, VERIFY } from "./types"

export function login(login, password) {
    return async dispatch => {
        try {
            const responce = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password })
            })
            const data = await responce.json()

            if (!data.token) {
                throw Error(data.message)
            }

            localStorage.setItem(STORAGE_NAME, JSON.stringify({
                ...data
            }))



            dispatch({
                type: LOGIN,
                payload: data
            })


        } catch (e) {
            console.log('something wrong:', e.message);
        }
    }
}

export function logout() {
    return dispatch => {

        localStorage.removeItem(STORAGE_NAME)

        dispatch({
            type: LOGOUT
        })

    }
}

export function verify() {
    return async dispatch => {
        try {
            const data = JSON.parse(localStorage.getItem(STORAGE_NAME))

            if (!data) {
                throw Error('not auth')
            }

            const responce = await fetch('/api/auth/verify', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })


            const check = await responce.json()
            if (!check.token) {
                throw Error(check.message)
            }

            dispatch({
                type: VERIFY,
                payload: check
            })
        } catch (e) {
            console.log('something wrong:', e.message);
            dispatch(logout())
        }
    }
}
