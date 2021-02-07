import React from 'react'
import { Col, Form, InputGroup } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setForm } from '../../../redux/admin/actions';

export default function TileForm() {

    const dispatch = useDispatch()

    const { form } = useSelector(state => state.admin.modal)

    const changeFormHandler = event => {
        dispatch(setForm({ ...form, [event.target.name]: event.target.value }))
    }

    const changeExtentsHandler = event => {
        const ext = [...form.extents];
        ext[+event.target.name] = +event.target.value;
        dispatch(setForm({ ...form, extents: ext }))
    }

    return (
        <Form>
            <Form.Group controlId="login">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" name="title" onChange={changeFormHandler} value={form.title} />
            </Form.Group>

            <Form.Group controlId="url">
                <Form.Label>URL</Form.Label>
                <Form.Control type="text" name="url" onChange={changeFormHandler} value={form.url} />
            </Form.Group>

            <Form.Group controlId="startResolution">
                <Form.Label>Start resolution</Form.Label>
                <Form.Control type="number" name="startResolution" step="any" onChange={changeFormHandler} value={form.startResolution} />
            </Form.Group>

            <Form.Group controlId="countOfResolutions">
                <Form.Label>Count of Resolutions</Form.Label>
                <Form.Control type="number" name="countOfResolutions" onChange={changeFormHandler} value={form.countOfResolutions} />
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

            <Form.Row>
                <Form.Group as={Col} controlId="w">
                    <Form.Label>W</Form.Label>
                    <Form.Control type="text" name="0" onChange={changeExtentsHandler} value={form.extents[0]} />
                </Form.Group>

                <Form.Group as={Col} controlId="s">
                    <Form.Label>S</Form.Label>
                    <Form.Control type="text" name="1" onChange={changeExtentsHandler} value={form.extents[1]} />
                </Form.Group>

                <Form.Group as={Col} controlId="e">
                    <Form.Label>E</Form.Label>
                    <Form.Control type="text" name="2" onChange={changeExtentsHandler} value={form.extents[2]} />
                </Form.Group>

                <Form.Group as={Col} controlId="n">
                    <Form.Label>N</Form.Label>
                    <Form.Control type="text" name="3" onChange={changeExtentsHandler} value={form.extents[3]} />
                </Form.Group>
            </Form.Row>
        </Form>
    )
}