import { FETCH_INITIAL, FETCH_MAP_SETTINGS, FETCH_TILES, FINISH_LOAD, INIT_MAP, REMOVE_TILE, SET_PROJECTION, SET_TILE, SET_VIEW, START_LOAD, DEINIT_MAP, ADD_LAYER, REMOVE_LAYER } from "./types"

export function initMap(map) {
    return dispatch => {
        dispatch({
            type: INIT_MAP,
            payload: map
        })
    }
}

export function deinitMap() {
    return dispatch => {
        dispatch({
            type: DEINIT_MAP
        })
    }
}

export function setProjection(projection) {
    return {
        type: SET_PROJECTION,
        payload: projection
    }
}

export function setTile(map, tile) {
    return dispatch => {

        dispatch(removeTile(map))

        map.addLayer(tile)

        dispatch({
            type: SET_TILE,
            payload: { tile: tile.getProperties().id }
        })
    }
}

export function removeTile(map) {

    const layers = map.getLayers();

    layers.forEach(l => {
        if (l) {
            if (l.getProperties().type === 'TILE') {
                map.removeLayer(l)
            }
        }

    })

    return {
        type: REMOVE_TILE
    }
}


export function setView(view, map) {

    map.setView(view)
    return {
        type: SET_VIEW,
        payload: view
    }
}


export function fetchTiles() {

    return async dispatch => {

        const data = require('../../temporary_db/tiles.json'); //  temporary
        await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');    // temporary plug

        dispatch({
            type: FETCH_TILES,
            payload: data
        })
    }
}


export function fetchMapSettings() {

    return async dispatch => {

        const responce = await fetch('/api/client/map')
        const data = await responce.json()

        dispatch({
            type: FETCH_MAP_SETTINGS,
            payload: data[0]
        })
    }
}


export function fetchInitial() {
    return async dispatch => {
        dispatch({ type: START_LOAD })

        const responce = await fetch('/api/client/init')
        const data = await responce.json()

        dispatch({
            type: FETCH_INITIAL,
            payload: {
                mapSettings: data.mapSettings,
                tiles: data.tiles
            }
        })

        dispatch({ type: FINISH_LOAD })
    }
}


export function addLayer(map, layer) {
    return dispatch => {

        map.addLayer(layer)

        dispatch({
            type: ADD_LAYER
        })
    }
}

export function removeLayer(map, layerId) {
    return dispatch => {

        const layers = map.getLayers();

        layers.forEach(l => {
            if (l) {
                if (l.getProperties().id === layerId) {
                    map.removeLayer(l)
                }

            }
        })

        dispatch({
            type: REMOVE_LAYER
        })
    }
}