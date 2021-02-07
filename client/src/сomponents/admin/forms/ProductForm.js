import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setForm } from '../../../redux/admin/actions'

export default function ProductForm() {

    const dispatch = useDispatch()

    const { form } = useSelector(state => state.admin.modal)

    const changeFormHandler = event => {
        dispatch(setForm({ ...form, [event.target.name]: event.target.value }))
    }

    return (
        <Form>
            <Form.Group controlId="login">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" onChange={changeFormHandler} value={form.title} />
            </Form.Group>

            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" name="description" onChange={changeFormHandler} value={form.description} />
            </Form.Group>

            <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" name="url" onChange={changeFormHandler} value={form.url} />
            </Form.Group>

            <Form.Row>
                <Form.Group as={Col} controlId="projection">
                    <Form.Label>Projection</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="projection">EPSG:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control aria-describedby="projection" type="text" name="projection" onChange={changeFormHandler} value={form.projection} />
                    </InputGroup>
                </Form.Group>
            </Form.Row>

            <hr />
            <center>Time vars</center>
            <hr />
            <Form.Row>
                <Form.Group as={Col} controlId="k1">
                    <Form.Label>Key</Form.Label>
                    <Form.Control type="text" name="k1" onChange={changeFormHandler} value={form.k1} />
                </Form.Group>

                <Form.Group as={Col} controlId="f1">
                    <Form.Label>Format</Form.Label>
                    <Form.Control type="text" name="f1" onChange={changeFormHandler} value={form.f1} />
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="k2">
                    <Form.Label>Key</Form.Label>
                    <Form.Control type="text" name="k2" onChange={changeFormHandler} value={form.k2} />
                </Form.Group>

                <Form.Group as={Col} controlId="f2">
                    <Form.Label>Format</Form.Label>
                    <Form.Control type="text" name="f2" onChange={changeFormHandler} value={form.f2} />
                </Form.Group>
            </Form.Row>

        </Form>
    )
}
