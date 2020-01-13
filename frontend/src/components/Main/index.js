import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home';
import SignIn from '../../containers/SignIn';
import SignUp from '../SignUp';
import Dashboard from '../../containers/Dashboard';
import NotFound from '../NotFound';
import Afisha from '../Afisha';

const Main = () => {
    return (
        <>
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />
                <Route path='/dashboard' component={Dashboard} />
                <Route path='/afisha' component={Afisha} />
                <Route component={NotFound} />
            </Switch>
        </>
    )
}

export default Main;