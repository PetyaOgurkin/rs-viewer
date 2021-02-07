import React, { useEffect, useState } from 'react'
import { fetchMap, setMap } from '../../redux/admin/actions';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Spinner } from 'react-bootstrap';

export default function AdminMapSettings() {

    const { map, tiles } = useSelector(state => state.admin)

    const dispatch = useDispatch();

    const [settings, setSettings] = useState({})


    const [loader, setLoader] = useState(true)


    useEffect(() => {
        dispatch(fetchMap()).then(() => {
            setLoader(false)
        })
    }, [dispatch])


    useEffect(() => {
        setSettings({ ...map })
    }, [map])

    const changeHandler = e => {
        setSettings({ ...settings, [e.target.name]: e.target.value })
    }

    const changeCenterHandler = e => {
        const center = settings.center ? [...settings.center] : [0, 0];
        center[+e.target.name] = +e.target.value;
        setSettings({ ...settings, center })
    }

    const setMapHandler = () => {
        dispatch(setMap(settings))
    }


    if (loader) {
        return (
            <Spinner animation="grow" />
        )
    }

    return (
        <>
            <h3>Map Settings</h3>
            <Form>
                <Form.Group controlId="tile">
                    <Form.Label>Tile</Form.Label>
                    <Form.Control as="select" name="tile" onChange={changeHandler} value={settings.tile || -1}>
                        {tiles.map((t, i) => <option key={i} value={t._id} >{t.title}</option>)}
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="zoom">
                    <Form.Label>Zoom</Form.Label>
                    <Form.Control type="number" name="zoom" value={settings.zoom} onChange={changeHandler} />
                </Form.Group>

                <Form.Row>
                    <Form.Group as={Col} controlId="long">
                        <Form.Label>Long</Form.Label>
                        <Form.Control type="number" name="0" value={settings.center && settings.center[0]} onChange={changeCenterHandler} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="lat">
                        <Form.Label>Lat</Form.Label>
                        <Form.Control type="number" name="1" value={settings.center && settings.center[1]} onChange={changeCenterHandler} />
                    </Form.Group>
                </Form.Row>

                <Button onClick={setMapHandler}>Apply</Button>
            </Form>
        </>
    )
}
