import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Main from './pages/main/Main'
import Details from './pages/details/Details'
import NotFound from './pages/notFound/NotFound'

export const useRoutes = () => {

    return (
        <Switch>
            <Route path='/' exact component={Main} />
            <Route path='/details/:location' exact component={Details}/>
            <Route component={NotFound}/>
        </Switch>
    )
}