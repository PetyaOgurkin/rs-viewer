import React from 'react'

import { DropdownButton, Dropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { createTileLayer } from '../../map/Layer';
import { createView } from '../../map/map';
import { setTile, setView } from '../../redux/map/actions';

export default function Tiles() {


    const dispatch = useDispatch();

    const { map, view, tile, tiles, projection, mapSettings } = useSelector(state => state.map);

    const setTileHandler = id => {

        const tileConf = tiles.find(t => t._id === id);

        const newTile = createTileLayer(tileConf.projection, tileConf.url, tileConf.extents, tileConf.resolutions, id)

        dispatch(setTile(map, newTile))

        if (!view) {
            dispatch(setView(createView(mapSettings.center, mapSettings.zoom, projection, tileConf.extents), map))
        }
    }


    return (
        <DropdownButton title="Tile">
            {tiles.map((t, i) => <Dropdown.Item as="button" key={'tilesdropdown' + i} value={t._id} onClick={t._id !== tile && setTileHandler.bind(null, t._id)} className={t._id === tile && 'active'}>{t.title}</Dropdown.Item>)}
        </DropdownButton>
    )
}
