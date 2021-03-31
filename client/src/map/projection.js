import proj4 from 'proj4'
import { register } from 'ol/proj/proj4'
import Projection from 'ol/proj/Projection'

export const createProjection = (code, extent) => {
    proj4.defs(code, "+proj=laea +lat_0=90 +lon_0=90 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");
    // proj4.defs("EPSG:3576","+proj=laea +lat_0=90 +lon_0=90 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs")
    register(proj4);

    const projection = new Projection({
        code: code,
        extent: extent,
        global: false,
        units: 'm'
    });

    return projection
}



