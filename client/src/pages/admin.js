import React from 'react'
import { Button, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { setBody } from '../redux/admin/actions';
import { useDispatch, useSelector } from 'react-redux';
import TilesComponent from '../сomponents/admin/TilesComponent';
import ProductsComponent from '../сomponents/admin/ProductsComponent';
import AdminMapSettings from '../сomponents/admin/AdminMapSettings';

export default function AdminPage() {



    const dispatch = useDispatch();

    const body = useSelector(state => state.admin.body)

    const tilesHandler = () => {
        dispatch(setBody(<TilesComponent />))
    }

    const productsHandler = () => {
        dispatch(setBody(<ProductsComponent />))
    }

    const mapHandler = () => {
        dispatch(setBody(<AdminMapSettings />))
    }


    return (
        <>
            <div style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}>
                <NavLink to="/">Back to map</NavLink>
            </div>
            <Container>
                <h1>Admin Page</h1>

                <div className="btn__group">
                    <Button variant="primary" onClick={tilesHandler}>Tiles</Button>
                    <Button variant="primary" onClick={productsHandler}>Products</Button>
                    <Button variant="primary" onClick={mapHandler}>Map</Button>
                </div>

                <div style={{ marginTop: '1rem' }}>
                    {body}
                </div>

            </Container>
        </>
    )
}
