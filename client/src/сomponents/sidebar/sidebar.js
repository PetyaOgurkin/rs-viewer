import React from 'react'
import { Button, ListGroup } from 'react-bootstrap';
import { Trash } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { ReactSortable } from 'react-sortablejs';
import { removeProductFromMap, updateSelectedProducts } from '../../redux/catalog/actions';

export default function Sidebar() {

    const dispatch = useDispatch();

    const selectedProducts = useSelector(state => state.catalog.selectedProducts);
    const map = useSelector(state => state.map.map)

    const updateHandler = products => {
        dispatch(updateSelectedProducts(products))

    }

    const sortHandler = () => {
        map.getLayers().forEach(l => {
            l.setZIndex(selectedProducts.findIndex(p => p._id === l.getProperties().id));
        })
    }


    return (
        <ListGroup className='layers__list sidebar'>
            <ReactSortable list={selectedProducts} setList={updateHandler} animation={200} delayOnTouchStart={true} delay={5} onEnd={sortHandler}>
                {selectedProducts.map((product, i) => (
                    <ListGroup.Item key={i}>
                        <div className="layer__item">
                            {product.title}
                            <Button variant="outline-dark" size="sm" aria-label="delete" onClick={() => dispatch(removeProductFromMap(product, map))}>
                                <Trash size={12} />
                            </Button>
                        </div>
                    </ListGroup.Item>
                ))}
            </ReactSortable>
        </ListGroup>
    )
}
