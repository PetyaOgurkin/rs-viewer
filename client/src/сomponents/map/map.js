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
        if (!isInit) {
            dispatch(fetchInitial());
        }

    }, [dispatch, isInit])

    const classList = ['layer__info'];

    useEffect(() => {

        if (!isInit) {

            if (!loading) {

                const initedMap = createMap('map');



                dispatch(initMap(initedMap));

                const initTileData = tiles.find(t => {
                    if (t._id === mapSettings.tile) {
                        return t
                    } else return false
                })

                const projection = createProjection(initTileData.projection, initTileData.extents);

                dispatch(setProjection(projection))

                const initTile = createTileLayer(projection, initTileData.url, initTileData.extents, initTileData.resolutions, initTileData._id)

                dispatch(setTile(initedMap, initTile))

                dispatch(setView(createView(mapSettings.center, mapSettings.zoom, projection, initTileData.extents), initedMap))




                initedMap.on('singleclick', function (evt) {


                    initedMap.forEachLayerAtPixel(evt.pixel, function (feature) {

                        if (feature.get('type') === 'IMAGE') {

                            const layer = feature.getSource();

                            const url = layer.getFeatureInfoUrl(evt.coordinate, initedMap.getView().getResolution(), initTileData.projection,
                                {
                                    'INFO_FORMAT': 'application/vnd.ogc.gml'
                                });



                            if (url) {
                                const parser = new DOMParser();

                                fetch(url)
                                    .then(response => response.text())
                                    .then(xml => {



                                        const data = parser.parseFromString(xml, "text/xml");

                                        const info = data.querySelector('class');
                                        if (info) {
                                            console.log('here');
                                            classList.push('layer__info__open')
                                        }
                                        console.log(data.querySelector('class'));


                                    });
                            }
                        }
                    });
                });
            }



        }
    })


   

    if (loading) {
        return <Spinner animation="grow" />
    }

    console.log(classList);

    return (
        <>
            <div id='map' className='map'></div>
            <div className="tiles">
                <Tiles />
            </div>
            <div className={classList.join(' ')}></div>
        </>
    )
}
