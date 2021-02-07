import TileLayer from 'ol/layer/Tile';
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import { getTopLeft } from 'ol/extent';


export const createTileLayer = (projection, url, extent, resolutions, id) => {
    return new TileLayer({
        source: new XYZ({
            url,
            projection,
            tileGrid: new TileGrid({
                extent,
                resolutions,
                origin: getTopLeft(extent)
            }),
        }),
        id,
        type: 'TILE',
        zIndex: -1
    })
}


export const createImgLayer = (projection, url, sourceParams, layerParams) => {
    return new ImageLayer({
        source: new ImageWMS({
            url,
            params: {
                'VERSION': '1.1.1',
                ...sourceParams
            },
            ratio: 1,
            projection
        }),
        type: 'IMAGE',
        ...layerParams
    })
}
