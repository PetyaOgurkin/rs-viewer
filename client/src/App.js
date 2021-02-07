import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { verify } from './redux/auth/actions';
import useRoutes from './routes';


export default function App() {

  const dispatch = useDispatch()
  const { token, auth } = useSelector(state => state.auth);

  const [load, setLoad] = useState(!!token && !auth)

  if (!!token && !auth) {
    dispatch(verify()).then(() => setLoad(false))
  }

  const routes = useRoutes(auth);

  return (
    <>
      {load ? <Spinner animation="grow" /> : <Router>{routes}</Router>}
    </>
  )
}

