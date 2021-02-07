import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { hideModal } from '../../redux/admin/actions'


export default function ModalComponent() {

    const dispatch = useDispatch();

    const { visible, form, heading, FormComponent, actionButtonName, actionFunction, id } = useSelector(state => state.admin.modal)

    const hideModalHandler = () => {
        dispatch(hideModal())
    }

    const actionHandler = () => {
        dispatch(actionFunction(form, id))
        hideModalHandler()
    }

    return (
        <Modal show={visible} onHide={hideModalHandler} backdrop="static">
            <Modal.Header closeButton>
                <Modal.Title>{heading}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {FormComponent && <FormComponent />}
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={actionHandler}>{actionButtonName}</Button>
                <Button variant="secondary" onClick={hideModalHandler}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}
