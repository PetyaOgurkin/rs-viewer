import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { deinitMap } from '../redux/map/actions'
import Catalog from './catalog/catalog'
import MapComponent from './map/map'
import NavComponent from './nav/NavComponent'
import Sidebar from './sidebar/sidebar'
import Timeline from './timeline/timeline'


export default function RootApp() {

    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(deinitMap());
        }
    })

    return (
        <>
            <MapComponent />
            <Sidebar />
            <Catalog />
            <Timeline />
            <NavComponent />
        </>
    )
}
