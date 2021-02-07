import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addTile, deleteTile, editTile, fetchTiles, showModal } from '../../redux/admin/actions'
import TileForm from './forms/TileForm'
import ListComponent from './ListComponent'
import ModalComponent from './ModalComponent'

export default function TilesComponent() {

    const tiles = useSelector(state => state.admin.tiles)

    const dispatch = useDispatch()

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        dispatch(fetchTiles()).then(() => {
            setLoader(false)
        })
    }, [dispatch])


    const addTileHandler = () => {
        dispatch(showModal({
            form: {
                title: '',
                url: '',
                startResolution: '',
                countOfResolutions: '',
                projection: '',
                extents: ['', '', '', '']
            },
            heading: 'Add a new tile',
            FormComponent: TileForm,
            actionButtonName: 'Add',
            actionFunction: addTile
        }))
    }

    const editTileHandler = (id) => {

        const tile = tiles.find(t => {
            if (t._id === id) {
                return t
            } else return false
        })

        dispatch(showModal({
            form: {
                title: tile.title,
                url: tile.url,
                startResolution: tile.startResolution,
                countOfResolutions: tile.countOfResolutions,
                projection: tile.projection.slice(5, 9),
                extents: tile.extents
            },
            heading: 'Edit the tile',
            FormComponent: TileForm,
            actionButtonName: 'Edit',
            actionFunction: editTile,
            id
        }))
    }

    const deleteTileHandler = (id) => {
        dispatch(deleteTile(id))
    }

    if (loader) {
        return (
            <Spinner animation="grow" />
        )
    }

    return (
        <>
            <ListComponent list={tiles} editFunc={editTileHandler} deleteFunc={deleteTileHandler} />
            <Button onClick={addTileHandler}>Add Tile</Button>

            <ModalComponent list={tiles} />
        </>
    )
}
