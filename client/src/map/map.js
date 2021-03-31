import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';

export const createMap = (target) => {
    return new Map({ target });
}

export const createView = (center, zoom, projection, extent) => {
    return new View({ center, zoom, projection, extent})
}
