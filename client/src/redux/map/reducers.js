import { INIT_MAP, SET_TILE, SET_PROJECTION, SET_VIEW, REMOVE_TILE, FETCH_TILES, FETCH_MAP_SETTINGS, FETCH_INITIAL, START_LOAD, FINISH_LOAD, DEINIT_MAP, ADD_LAYER, REMOVE_LAYER } from "./types"


const initialState = {
    map: null,
    mapSettings: {},
    projection: null,
    tile: null,
    tiles: [],
    view: null,
    layers: [],
    isInit: false,
    loading: true
}

export const mapReducer = (state = initialState, { type, payload }) => {
    switch (type) {

        case INIT_MAP:
            return { ...state, map: payload, isInit: true }

        case DEINIT_MAP:
            return { ...state, map: null, isInit: false, loading: true }

        case SET_PROJECTION:
            return { ...state, projection: payload }

        case SET_VIEW:
            return { ...state, view: payload }

        case SET_TILE:
            return { ...state, ...payload }

        case REMOVE_TILE:
            return { ...state, tile: null }

        case FETCH_MAP_SETTINGS:
            return { ...state, mapSettings: payload }

        case FETCH_TILES:
            return { ...state, tiles: payload }

        case FETCH_INITIAL:
            return { ...state, ...payload }

        case START_LOAD:
            return { ...state, loading: true }

        case FINISH_LOAD:
            return { ...state, loading: false }

        case ADD_LAYER:
            return { ...state }

        case REMOVE_LAYER:
            return { ...state }

        default:
            return state
    }
}
