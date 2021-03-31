import { createImgLayer } from "../../map/Layer";
import { ADD_PRODUCT_ON_MAP, FETCH_PRODUCTS, HIDE_CATALOG, INIT_CATALOG, REMOVE_PRODUCT_FROM_MAP, SHOW_CATALOG, UPDATE_SELECTED_PRODUCTS } from "./types";

export function initCatalog() {
    return dispatch => {

        dispatch(fetchProducts())

        dispatch({
            type: INIT_CATALOG
        })
    }
}

export function showCatalog() {
    return {
        type: SHOW_CATALOG
    }
}

export function hideCatalog() {
    return {
        type: HIDE_CATALOG
    }
}

export function fetchProducts() {
    return async dispatch => {

        const responce = await fetch('/api/client/products');
        const data = await responce.json()

        dispatch({
            type: FETCH_PRODUCTS,
            payload: data
        })
    }
}


function timeFormatParser(format, time) {

    return format.split('').map(s => {
        switch (s) {
            case 'Y': return time.year
            case 'm': return time.mouth
            case 'd': return time.day
            case 'h': return time.hour
            case '-': return '-'

            default: return ''
        }
    }).join('');
}


export function addProductOnMap(product, map, projection, zIndex, time) {

    const timeParams = {
        [product.timeFormat[0][0]]: timeFormatParser(product.timeFormat[0][1], time),
        [product.timeFormat[1][0]]: timeFormatParser(product.timeFormat[1][1], time),
        'LAYERS': 'region_project'
    }

    const layer = createImgLayer(projection, product.url, timeParams, { id: product._id, title: product.title, zIndex, timeFormat: product.timeFormat });

    const legendSrc = layer.getSource().getLegendUrl(map.getView().getResolution(), {
        'SLD_VERSION': '1.1.0'
    });

    map.addLayer(layer)

    return {
        type: ADD_PRODUCT_ON_MAP,
        payload: { ...product, legendUrl: legendSrc }
    }
}

export function removeProductFromMap(product, map) {

    map.getLayers().forEach(l => {
        if (l) {
            if (l.getProperties().id === product._id) {
                map.removeLayer(l)
            }
        }


    })

    return {
        type: REMOVE_PRODUCT_FROM_MAP,
        payload: product
    }
}

export function updateSelectedProducts(products) {
    return {
        type: UPDATE_SELECTED_PRODUCTS,
        payload: products
    }
}