import React from 'react'
import { Button } from 'react-bootstrap'
import { useSelector } from 'react-redux';

export default function NavComponent() {

    const isAuth = useSelector(state => state.auth.auth);

    return (
        <div className="nav">
            {isAuth ? <Button href="/admin">admin</Button> : <Button href="/auth">auth</Button>}
        </div>
    )
}
