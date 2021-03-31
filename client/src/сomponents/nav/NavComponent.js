import React from 'react'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/auth/actions';

export default function NavComponent() {

    const dispatch = useDispatch();

    const isAuth = useSelector(state => state.auth.auth);

    const logoutHandler = () => {
        dispatch(logout());
    }


    return (
        <div className="nav">
            {isAuth ? (
                <div className="btn__group">
                    <Button href="/admin">admin</Button>
                    <Button onClick={logoutHandler}>logout</Button>
                </div>
            ) : <Button href="/auth">auth</Button>}
        </div>
    )
}
