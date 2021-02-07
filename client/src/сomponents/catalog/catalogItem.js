import React from 'react'
import { ListGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addProductOnMap, removeProductFromMap } from '../../redux/catalog/actions';

export default function CatalogItem({ data }) {

    const dispatch = useDispatch();

    const selectedProducts = useSelector(state => state.catalog.selectedProducts);
    const { map, projection } = useSelector(state => state.map)

    const time = useSelector(state => state.timeLine.time)

    const productPresence = () => selectedProducts.find(e => e._id === data._id);

    const toggleProduct = () => {
        if (!productPresence()) {
            dispatch(addProductOnMap(data, map, projection, selectedProducts.length, time))
        } else {
            dispatch(removeProductFromMap(data, map))
        }
    }

    return (
        <ListGroup.Item onClick={toggleProduct} className={productPresence() && 'active'}>
            {data.title}
        </ListGroup.Item>
    )
}
