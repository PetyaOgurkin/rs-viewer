import { createProjection } from '../../map/projection';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createMap, createView } from '../../map/map'
import { fetchInitial, setTile, setView, initMap, setProjection } from '../../redux/map/actions'
import Tiles from './tiles';
import { createTileLayer } from '../../map/Layer';
import { Spinner } from 'react-bootstrap';

export default function MapComponent() {

    const dispatch = useDispatch();

    const { loading, mapSettings, tiles, isInit } = useSelector(state => state.map);

    useEffect(() => {
        dispatch(fetchInitial());
    }, [dispatch])

    useEffect(() => {

        if (!loading && !isInit) {

            const initedMap = createMap('map');

            dispatch(initMap(initedMap));

            const initTileData = tiles.find(t => {
                if (t._id === mapSettings.tile) {
                    return t
                } else return false
            })

            const projection = createProjection(initTileData.projection);

            dispatch(setProjection(projection))

            const initTile = createTileLayer(projection, initTileData.url, initTileData.extents, initTileData.resolutions, initTileData._id)

            dispatch(setTile(initedMap, initTile))

            dispatch(setView(createView(mapSettings.center, mapSettings.zoom, projection, initTileData.extents), initedMap))

        }
    })



    if (loading) {
        return <Spinner animation="grow" />
    }

    return (
        <>
            <div id='map' className='map'></div>
            <div className="tiles">
                <Tiles />
            </div>

        </>
    )
}
