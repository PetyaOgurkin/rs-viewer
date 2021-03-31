import React, { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { login } from '../redux/auth/actions';

export default function AuthPage() {

    const dispatch = useDispatch();

    const [form, setForm] = useState({
        login: '',
        password: ''
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const loginHandler = event => {
        event.preventDefault()
        dispatch(login(form.login, form.password))
    }


    return (
        <>
            <div style={{ marginTop: '0.5rem', marginLeft: '0.5rem' }}>
                <NavLink to="/">Back to map</NavLink>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', }} >
                <Card style={{ minWidth: '25rem', marginTop: '2rem' }} >
                    <Card.Body>
                        <Card.Title className="text-center">Authorization</Card.Title>

                        <Form onSubmit={loginHandler}>
                            <Form.Group controlId="login">
                                <Form.Label>Login</Form.Label>
                                <Form.Control type="text" name="login" onChange={changeHandler} />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" onChange={changeHandler} />
                            </Form.Group>

                            <Button variant="primary" type="submit" >Join</Button>
                        </Form>
                    </Card.Body>
                </Card >
            </div>
        </>
    )
}
