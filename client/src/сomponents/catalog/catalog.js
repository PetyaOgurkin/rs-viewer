import { Button, ListGroup, Modal } from 'react-bootstrap';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideCatalog, initCatalog, showCatalog } from '../../redux/catalog/actions';
import CatalogItem from './catalogItem';


export default function Catalog() {

    const dispatch = useDispatch();

    const products = useSelector(state => state.catalog.products);
    const init = useSelector(state => state.catalog.init);
    const visible = useSelector(state => state.catalog.visible);

    const showModalHandler = () => {
        !init && dispatch(initCatalog())
        dispatch(showCatalog())
    }

    const hideModalHandler = () => {
        dispatch(hideCatalog())
    }

    return (
        <div className="catalog">
            <Button variant="primary" onClick={showModalHandler}>
                Open Catalog
            </Button>

            <Modal show={visible} onHide={hideModalHandler}>
                <Modal.Header closeButton>
                    <Modal.Title>Catalog</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        {products.map((p, i) => <CatalogItem data={p} key={'catalog' + i} />)}
                    </ListGroup>
                </Modal.Body>
            </Modal>
        </div>
    )
}
