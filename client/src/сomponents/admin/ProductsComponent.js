import React, { useEffect, useState } from 'react'
import { Button, Spinner } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, deleteProduct, editProduct, fetchProducts, showModal } from '../../redux/admin/actions'
import ProductForm from './forms/ProductForm'
import ListComponent from './ListComponent'
import ModalComponent from './ModalComponent'

export default function ProductsComponent() {

    const products = useSelector(state => state.admin.products)

    const dispatch = useDispatch()

    const [loader, setLoader] = useState(true);

    useEffect(() => {
        dispatch(fetchProducts()).then(() => {
            setLoader(false)
        })
    }, [dispatch])


    const addProductHandler = () => {
        dispatch(showModal({
            form: {
                title: '',
                description: '',
                url: '',
                projection: '',
                k1: '',
                k2: '',
                f1: '',
                f2: '',
            },
            heading: 'Add a new product',
            FormComponent: ProductForm,
            actionButtonName: 'Add',
            actionFunction: addProduct
        }))
    }

    const editProductHandler = (id) => {

        const product = products.find(p => {
            if (p._id === id) {
                return p
            } else return false
        })

        dispatch(showModal({
            form: {
                title: product.title,
                description: product.description,
                url: product.url,
                projection: product.projection.slice(5, 9),
                k1: product.timeFormat[0][0],
                k2: product.timeFormat[1][0],
                f1: product.timeFormat[0][1],
                f2: product.timeFormat[1][1]
            },
            heading: 'Edit the product',
            FormComponent: ProductForm,
            actionButtonName: 'Edit',
            actionFunction: editProduct,
            id
        }))
    }

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id))
    }


    if (loader) {
        return (
            <Spinner animation="grow" />
        )
    }

    return (
        <>
            <ListComponent list={products} editFunc={editProductHandler} deleteFunc={deleteProductHandler} />
            <Button onClick={addProductHandler}>Add Product</Button>

            <ModalComponent list={products} />
        </>
    )
}
