import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import AdminPage from './pages/admin'
import AuthPage from './pages/auth'
import MainPage from './pages/main'

export default function useRoutes(isAuth) {
    if (isAuth) {
        return (
            <Switch>
                <Route path="/admin" exact>
                    <AdminPage />
                </Route>
                <Route path="/" exact>
                    <MainPage />
                </Route>
                <Redirect to="/" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/auth" exact>
                <AuthPage />
            </Route>
            <Route path="/" exact>
                <MainPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}
